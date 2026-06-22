---
title: 'Industrial data lake with Apache Iceberg + DuckDB + TimescaleDB: how a modern MES bridges hot, warm and cold storage'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'industrial-data-lake-with-apache-iceberg-duckdb-and-timescaledb-how-a-modern-mes-bridges-hot-warm-and-cold-storage'
description: 'TimescaleDB handles time-series from the last 1–90 days (hot) excellently, but at 5+ years of history the cost of PostgreSQL SSD and RAM grows faster than the business value. Apache Iceberg (a table format for the data lake) plus DuckDB (a local SQL engine) deliver a cheaper warm tier (90–730 days) and cold tier (>2 years) on S3 or MinIO. A 3-tier architecture cuts storage cost by 80–95% while keeping data queryable. This article shows how to build it for MES, where the limits are, what it costs, and how to migrate from a monolithic TimescaleDB.'
coverImage: '/images/post-industrial-data-lake/cover-industrial-data-lake.png'
lang: 'en'
tags: [{"value":"timeSeriesData","label":"time-series data"},{"value":"timescaleDb","label":"TimescaleDB"},{"value":"iceberg","label":"Apache Iceberg"},{"value":"omniMES","label":"OmniMES"}]
publishedAt: '2026-06-16T08:00:00.000Z'
---

[TimescaleDB in OmniMES](/blog/timescaledb-in-omnimes-how-postgresql-hypertables-handle-200m-readings-per-day) handles 200 million readings per day with sub-400 ms aggregations — for data from the last quarter. For data older than a year an economic problem appears: enterprise PostgreSQL SSD storage (including replicas, backups, indexes) costs around **EUR 0.30–0.60 per GB per month**, while S3 or MinIO (object storage) costs **EUR 0.01–0.025 per GB**. For 5 years of sensor history after TimescaleDB compression (180 GB per year) that is **EUR 6 vs EUR 90 per month** on storage alone. Not a crisis, but with 20+ customer plants the numbers start to matter.

A second question: does queryability of 2022 data need to match 2026 data? A shop-floor operator does not need a 4-year-old compressor temperature chart in 100 ms. A compliance auditor ([CBAM 1.08.2026](/blog/cbam-for-steel-aluminium-cement-exporters-first-definitive-period-report-by-1-august-2026-what-mes-ems-must-measure), [DPP 2027](/blog/digital-product-passport-dpp-enters-the-factory-espr-and-battery-regulation-2027-what-mes-must-deliver-by-february)) needs the data to be available and immutable — but 5–30 s latency is acceptable.

A **3-tier data-lake architecture** for MES addresses both. **Hot** (1–90 days) on TimescaleDB. **Warm** (90–730 days) on Apache Iceberg on object storage. **Cold** (>730 days) on Iceberg with strong compression. All queryable through a single SQL endpoint thanks to DuckDB. Below: how it works today and whether it makes sense for a mid-sized European plant.

## What Apache Iceberg is

[Apache Iceberg](https://iceberg.apache.org/) (donated to Apache by Netflix in 2018, matured in 2024) is a **table format for data lakes** — a metadata layer over Parquet files in object storage. It delivers what raw Parquet does not:

- **ACID transactions** — inserts, updates, deletes are atomic, no partial-write problems
- **Schema evolution** — add/remove columns without rewriting history
- **Time travel** — query the table state at a past date
- **Hidden partitioning** — partition by date/sensor_id without forcing queries to reference it explicitly
- **Compaction** — automatic merging of small files for query performance

Iceberg is **Apache 2.0**, supported by all major vendors (AWS Athena, Snowflake, Databricks, Cloudera, Trino, Spark, DuckDB). Important for MES: data files stay in **Parquet** (open columnar format with compression), so there is no vendor lock-in — if needed, any tool that reads Parquet can open them, no Iceberg required.

The Q1 2026 Iceberg v1.6 release finalized **rolling deletes** — critical for MES, where the oldest data is regularly purged (5-year retention for most sensor data, 2 years for logs).

## What DuckDB is

[DuckDB](https://duckdb.org/) (Q4 2024, matured at v1.x in 2026) is an **in-process analytical SQL engine**. Analogous to SQLite, but for analytical queries instead of OLTP. A single binary, no server, no configuration — startup takes milliseconds.

DuckDB has native Iceberg support from v0.9 (June 2024). That means you can run `SELECT * FROM iceberg_scan('s3://bucket/sensor-readings') WHERE time > '2024-01-01'` from the command line, from a Jupyter notebook, from a Python microservice, from a Node.js app — the same engine, the same results everywhere.

In MES context: DuckDB is the **query engine for the warm and cold tier**. It does not replace TimescaleDB (which handles hot — append-heavy, real-time queries). It replaces a dedicated query cluster for old data (Trino or Presto), which for a mid-sized plant would be overkill.

The architecture we use: a single backend service (Python or Go) decides **transparently** which storage tier a query hits:

- `time > NOW() - INTERVAL '90 days'` → PostgreSQL with TimescaleDB (hot)
- `time BETWEEN '2024-01-01' AND '2026-03-01'` → DuckDB reading Iceberg (warm)
- Old audits, historical compliance reports → DuckDB on cold tier (Iceberg compressed)

From the application perspective it is one REST endpoint. From operations it is three storage tiers at different cost/performance points.

## Data flow architecture

The full stack for a 3-tier MES data lake:

```
PLC / SCADA / OPC UA
  → MQTT broker (Mosquitto)
  → Kafka topic per production line
  → Telegraf (parsing, validation)
  → PostgreSQL 17 + TimescaleDB 2.18  [HOT — 90 days]
       └── sensor_readings (hypertable, compression after 7 days)
  → Nightly job: tier-down from hot to warm
       ├── Export chunks older than 90 days to Parquet
       ├── Append to Iceberg table on S3/MinIO
       └── Drop chunks from PostgreSQL after successful tier-down
  → Iceberg table on S3 / MinIO  [WARM — 90–730 days]
       ├── Partitioning: month + sensor_group
       ├── Compaction: daily
       └── Compression: ZSTD-3 (default)
  → Monthly job: tier-down from warm to cold
       └── Re-write with aggressive compression (ZSTD-9)
  → Iceberg table with deeper compression  [COLD — >730 days]
  → Query Layer (Go / Python service)
       ├── Time-based routing: <90d → Postgres, <730d → Iceberg warm, ... → Iceberg cold
       ├── DuckDB pool for Iceberg reads
       └── REST API / GraphQL → MES UI, Grafana, Redash
```

Three important architectural decisions:

**1. Tier-down is a batch job**, not streaming. At 03:00 daily a cron checks PostgreSQL chunks older than 90 days, exports to Parquet, appends to the Iceberg table on S3, verifies (checksum comparison), drops from PostgreSQL. About 10–20 minutes of server time at our scale.

**2. Iceberg compaction is a separate job**, not inline with writes. Iceberg writes are small (a few MB each), because appends are frequent. The daily compaction job merges them into 256 MB–1 GB files, drastically improving query throughput. Without compaction queries degrade exponentially.

**3. Schema evolution must be tested.** Adding a column to `sensor_readings` (e.g. a new sensor type with metadata) requires updating both the PostgreSQL DDL and the Iceberg schema. Mismatches lead to query errors or data loss. In practice: always migrate the Iceberg schema first, then PostgreSQL, then deploy the app that uses the new field.

## Numbers: cost and performance

Real values from our POC (50,000 sensors, 200 million readings per day, 5-year retention):

| Tier | Period | Storage | p95 latency | Cost EUR/month |
|---|---|---|---|---|
| Hot (TimescaleDB) | 0–90 days | 180 GB | under 100 ms | 60 |
| Warm (Iceberg) | 90–730 days | 1.8 TB (compressed) | 800 ms – 3 s | 25 |
| Cold (Iceberg + ZSTD-9) | 730+ days | 4.2 TB (compressed) | 5–15 s | 50 |
| **Total** | **5 years** | **6.2 TB** | — | **135** |

For comparison: a monolithic TimescaleDB holding the full 5-year history is **~12 TB of storage** (including replicas and backups) at **~EUR 480 per month** in classical enterprise hosting. **3.5× more expensive** than the 3-tier architecture.

Performance: hot tier queries unchanged (PostgreSQL + TimescaleDB as before). Warm queries for typical MES use cases (monthly report from 6 months ago, year-on-year trend validation) — 800 ms – 3 s, acceptable for batch reporting. Cold queries (audits, regulatory reports 3–5 years back) — 5–15 s, acceptable for occasional requests.

## Object storage: S3, MinIO, or on-prem

Three realistic options for warm/cold tier:

**AWS S3 / Azure Blob / GCP Cloud Storage.** Cheapest per GB in absolute terms, but **egress fees** (charge per GB pulled out of the cloud — USD 0.08–0.12/GB) can exceed storage savings. For MES with active history querying (CBAM/DPP reports) — do the math carefully.

**MinIO on-prem.** Self-hosted S3-compatible storage. Gives control over data sovereignty (critical under [NIS2](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory) and GDPR), zero egress fees, but requires cluster operations (typically 3–6 nodes, EUR 12–25k CapEx + 0.2 FTE DevOps). For plants with an in-house data center it makes sense.

**On-prem NAS with S3 gateway.** Cheaper CapEx (Synology / QNAP enterprise with S3 gateway ~EUR 5–10k), but slower and less scalable. Works for plants up to 5 TB cold data, poorly for 50+ TB.

In practice we pick MinIO on-prem for OmniMES deployments where production data cannot leave the plant, and AWS S3 for SaaS-subscribed plants with mixed data.

## Migration: from a monolithic TimescaleDB

A realistic plan for a plant that already runs TimescaleDB with 2+ years of history:

**Week 1–2: infrastructure setup.** Stand up MinIO (or configure an S3 bucket) with an Iceberg catalog ([Apache Polaris](https://polaris.apache.org/) or [Nessie](https://projectnessie.org/)). Add DuckDB as a dependency in the existing backend. Smoke tests: write test Iceberg, query test.

**Week 3–4: dual-write configuration.** All new readings land in both TimescaleDB and Iceberg (via the daily tier-down job). Validation: daily comparison of record counts and sampled checksum.

**Week 5–8: history backfill.** A migration job that moves chunks older than 90 days into Iceberg. At our scale (5 years × 60 TB raw → 6 TB compressed) — about 4 weeks of background server time, with no production interruption.

**Week 9–10: query routing.** Enable storage-tier routing in the app (timestamp under 90 days → Postgres, older → DuckDB+Iceberg). Feature flag per query type — real-time dashboard first, monthly reports second, annual reports last.

**Week 11–12: drop chunks from TimescaleDB.** After Iceberg queries are confirmed working, drop chunks older than 90 days from Postgres. Storage savings become visible immediately.

Realistic deployment time for a plant with a healthy TimescaleDB: **2–3 months**, project cost around EUR 20–40k (2 engineers + DevOps part-time). Realistic storage ROI: typically 12–18 months.

## Limits — an honest list

Five things worth knowing before migration:

**1. Iceberg compaction needs attention.** If you do not configure a daily compaction job, the table fragments (10,000 small files instead of 100 large ones) and queries become 50× slower. It is not automatic. Standard: cron job with Apache Spark or the Iceberg REST API.

**2. Schema evolution is a minefield.** Apache Iceberg supports adding/removing columns, but some operations (changing int to bigint, dropping a required column) require a full table rewrite. For a 5-year archive that is hours of server work. Plan the schema with a 5–10 year horizon in mind.

**3. Time travel costs storage.** Every Iceberg transaction creates a new snapshot. Without a snapshot retention policy, the table grows 10–20% per month even without new data. Configuration: `expire_snapshots` every 30 days for warm, 365 days for cold.

**4. S3 egress fees are a surprise.** AWS bills for every GB pulled out of the cloud. For active history querying (e.g. frequent annual reports) the bill can rise 3–5× over the original plan. That is why we prefer MinIO on-prem for MES with heavy querying.

**5. DuckDB does not scale to multi-node.** DuckDB is a single-node engine. For mid-sized MES that is a plus (simplicity), but as a plant grows to 500k+ sensors and full ML analytics, you migrate to Trino/Spark/Athena. Not a blocking issue today, but matters for a 5-year trajectory.

## Recommendations for a plant

Three concrete points:

**First**, the 3-tier architecture makes sense when data history exceeds **one year** and storage cost exceeds **EUR 100 per month**. Below those thresholds a monolithic TimescaleDB is simpler and sufficient — the operational overhead (compaction, schema management, dual-tier routing) outweighs the savings.

**Second**, the simplest adoption path for a plant in 2026: start with **Iceberg + MinIO on-prem** as a warm tier with DuckDB as the query engine. That is one new technology plus one server (or a 3-node MinIO cluster). The hot tier (TimescaleDB) stays untouched. After six months consider a cold tier with ZSTD-9 compression if storage savings justify the extra complexity.

**Third**, this stack is a solid foundation for integrating with [Time-series Foundation Models](/blog/time-series-foundation-models-in-mes-are-timesfm-chronos-moirai-already-beating-your-own-xgboost-in-failure-prediction). Training a failure-prediction model on 5 years of history requires access to the full archive — Iceberg in the warm/cold tier provides that natively, with no need to copy data into a dedicated ML layer. DuckDB can read Iceberg into PyTorch/numpy without conversion, which cuts the training pipeline by 2–3 stages.

An industrial data lake is not a fashion item — it is **real storage economics for MES with 5+ years of operation**. The TimescaleDB + Iceberg + DuckDB stack today is mature, open (Apache 2.0 and MIT) and requires one MinIO cluster plus 2–3 months of project time. Storage ROI typically 12–18 months, plus architectural flexibility for ML and AI integration down the road.

---

## Sources

- [Apache Iceberg](https://iceberg.apache.org/) — documentation, spec, ecosystem
- [DuckDB](https://duckdb.org/) — SQL engine, documentation, Iceberg integration
- [Apache Polaris](https://polaris.apache.org/) — Iceberg catalog (Snowflake donation 2024)
- [Project Nessie](https://projectnessie.org/) — Iceberg catalog with git-like branching
- [MinIO](https://min.io/) — S3-compatible object storage, self-hosted
- [Iceberg v1.6 release notes](https://github.com/apache/iceberg/releases/tag/apache-iceberg-1.6.0) — rolling deletes, schema improvements
- [TimescaleDB in OmniMES](/blog/timescaledb-in-omnimes-how-postgresql-hypertables-handle-200m-readings-per-day) — hot tier foundation
- [CBAM for steel/aluminium/cement exporters](/blog/cbam-for-steel-aluminium-cement-exporters-first-definitive-period-report-by-1-august-2026-what-mes-ems-must-measure) — compliance retention requirements
- [DPP / Battery Regulation 2027](/blog/digital-product-passport-dpp-enters-the-factory-espr-and-battery-regulation-2027-what-mes-must-deliver-by-february) — 10-year DPP retention for battery data
- [NIS2 and the Polish KSC2 Act](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory) — audit log retention requirements
- [Time-series Foundation Models](/blog/time-series-foundation-models-in-mes-are-timesfm-chronos-moirai-already-beating-your-own-xgboost-in-failure-prediction) — next analytical step on 5-year data
