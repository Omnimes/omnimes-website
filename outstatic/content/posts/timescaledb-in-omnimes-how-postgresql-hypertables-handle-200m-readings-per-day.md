---
title: 'TimescaleDB in OmniMES: how PostgreSQL hypertables handle 200M readings per day'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'timescaledb-in-omnimes-how-postgresql-hypertables-handle-200m-readings-per-day'
description: 'OmniMES uses TimescaleDB — the PostgreSQL extension with hypertables, native compression and continuous aggregates — as its database for industrial sensor time-series. The architecture handles 200 million readings per day, delivers 95% storage compression and 200–800 ms aggregations. This article walks through the hypertables concept, the OmniMES stack architecture, continuous aggregates and concrete production numbers.'
coverImage: '/images/post-timescaledb-mes/cover-timescaledb-mes.png'
lang: 'en'
tags: [{"value":"timeSeriesData","label":"time-series data"},{"value":"timescaleDb","label":"TimescaleDB"},{"value":"postgres","label":"PostgreSQL"},{"value":"omniMES","label":"OmniMES"}]
publishedAt: '2026-06-16T08:00:00.000Z'
---

OmniMES uses **TimescaleDB** as its database for industrial sensor time-series. It is a PostgreSQL extension from 2017 that adds three mechanisms a modern MES needs: **hypertables** (automatic partitioning by time), **native compression** (95% storage reduction) and **continuous aggregates** (pre-computed rollups, no hand-written ETL).

In our production deployments this stack handles **200 million readings per day** from roughly 50,000 sensors (PLC, OPC UA, MQTT). A typical 30-day OEE aggregation runs in **200–800 ms**. Storage for 18 months of history: **180 GB** after compression. Real-time chart of 100 sensors: **under 100 ms**.

This article walks through how it works, the architecture we built, and why PostgreSQL with a time-series extension is a better fit for MES than dedicated time-series databases.

## What TimescaleDB is

TimescaleDB is a **PostgreSQL extension**, not a separate engine. You install it with `CREATE EXTENSION timescaledb`, and from that point the whole PostgreSQL stack — psql, pgAdmin, pgBackRest, PITR replication, RBAC, JSONB, full SQL — keeps working as before, plus a specialized time-series layer is added on top.

This matters because in MES you typically have two kinds of data:
- **Transactional** (production orders, operators, quality control, warehouse) — classic OLTP, PostgreSQL's native domain
- **Time-series** (sensor readings, alarms, OEE counters, energy metering) — requires different handling: fast appends, compression, time-bucket aggregations

Most MES platforms solve this with **two engines**: PostgreSQL/MS SQL/Oracle for OLTP, plus InfluxDB/MongoDB/ClickHouse for time-series. It works, but it has costs: two systems to operate, two query philosophies, two monitoring stacks, two skill pools, two backup procedures, two audit vectors under [NIS2](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory).

TimescaleDB lets you keep **one engine** — with dedicated mechanisms for time-series where they are actually needed. Stack consolidation is a real operational argument, not just an aesthetic one.

## Hypertables — the time-series foundation in PostgreSQL

A hypertable is a virtual table that under the hood is composed of hundreds or thousands of "chunks" — physical partitions across the time dimension (and optionally a second one). From the application's perspective it is an ordinary table:

```sql
CREATE TABLE sensor_readings (
  time        TIMESTAMPTZ NOT NULL,
  sensor_id   TEXT NOT NULL,
  value       DOUBLE PRECISION,
  metadata    JSONB
);

SELECT create_hypertable('sensor_readings', 'time',
                         chunk_time_interval => INTERVAL '1 day');
```

Each chunk is a separate PostgreSQL table (`_hyper_1_42_chunk`, `_hyper_1_43_chunk`, etc.) with its own indexes and statistics. The query planner knows that `WHERE time > NOW() - INTERVAL '7 days'` should read only the last 7 chunks, not 365 across the full year. This is **chunk exclusion** — a foundational optimization that gives constant-time query latency regardless of historical data size.

The practical consequence: a real-time dashboard showing the last hour does not slow down as 5 years of history accumulate in the database. Plain PostgreSQL without TimescaleDB cannot guarantee this — a large unpartitioned table requires a full index scan that grows with the dataset.

## Native compression — 95% size reduction

Compression in TimescaleDB is **segmented** by a chosen dimension (typically `sensor_id`) and **sorted** by time. For typical industrial signals — temperatures, pressures, vibrations, flow rates — the Gorilla and delta-of-delta algorithms deliver **90–98% compression**. Compressed chunks remain queryable; the query planner reaches into them transparently.

```sql
ALTER TABLE sensor_readings SET (
  timescaledb.compress,
  timescaledb.compress_segmentby = 'sensor_id'
);

SELECT add_compression_policy('sensor_readings', INTERVAL '7 days');
```

In our production setup: with `compress after 7 days`, data older than a week takes on average **5% of its original size**. For 18 months of sensor history that means **180 GB instead of roughly 3.6 TB of raw data**. Storage is not just disk cost — it is also RAM for the working set, backup throughput (45 minutes instead of 6 hours) and bandwidth to a disaster recovery site.

The measurement is fair: we compare total on-disk footprint (including replicas, backups and indexes), not just the raw dataset.

## Continuous aggregates — pre-computed rollups in the background

Continuous aggregates are **materialized views** that TimescaleDB refreshes automatically in the background. Instead of recomputing OEE per sensor on every request, you write the minute-level rollups once and dashboards read the prepared view:

```sql
CREATE MATERIALIZED VIEW oee_5min
WITH (timescaledb.continuous) AS
SELECT time_bucket('5 minutes', time) AS bucket,
       sensor_id,
       avg(value) AS avg_value,
       max(value) AS peak_value,
       count(*)   AS sample_count
FROM sensor_readings
GROUP BY bucket, sensor_id;

SELECT add_continuous_aggregate_policy('oee_5min',
  start_offset => INTERVAL '1 month',
  end_offset   => INTERVAL '5 minutes',
  schedule_interval => INTERVAL '5 minutes');
```

In practice: a 30-day OEE aggregation on raw data would scan roughly 6 billion points. On a continuous aggregate (5-minute buckets) it scans about 600,000 rows — four orders of magnitude fewer. That is the source of the typical 200–800 ms instead of multiple seconds.

In OmniMES we run continuous aggregates at three resolutions: 5-minute (operator dashboards), hourly (maintenance), and daily (management reports). All refresh automatically, no hand-written ETL.

## Data architecture in OmniMES

The full stack from sensor to dashboard looks like this:

```
PLC / SCADA / OPC UA
  → MQTT broker (Mosquitto, on-prem)
  → Kafka topic per production line
  → Telegraf (parsing, validation)
  → PostgreSQL 17 + TimescaleDB 2.18
       ├── sensor_readings (hypertable, compression after 7 days)
       ├── oee_5min (continuous aggregate)
       ├── oee_hourly (continuous aggregate)
       ├── alarms (regular table)
       ├── orders, users, ... (OLTP, same host)
  → Grafana (operator dashboards)
  → Redash (business dashboards)
  → REST / GraphQL API → OmniMES UI
```

Key architectural decision: **the same PostgreSQL for OLTP and time-series.** This required validating that the workloads would not crush each other. We separated them with tablespaces:
- OLTP on NVMe SSD (orders, users, authorization)
- Time-series on SATA SSD with larger capacity (sensor_readings and continuous aggregates)
- WAL on a separate disk (classical PostgreSQL optimization)

Plus pgBouncer with transaction pooling, capped at 200 connections per application. Three weeks of testing before production rollout showed that the time-series workload (mostly append-only) does not compete with OLTP (mixed read/write) under proper tuning.

## Performance and scale — production numbers

Measured averages from June 2026:

| Metric | Value |
|---|---|
| Sensors in the database | ~50,000 |
| Daily readings | 200M |
| Storage (raw + compression + indexes + WAL) | 180 GB |
| Compression ratio (after 7 days) | 95% |
| 30-day OEE aggregation | 200–800 ms |
| 1-year OEE aggregation | 1.8 s |
| Real-time chart 1h, 100 sensors | under 100 ms |
| New report backfill (24 months) | 18 minutes |
| Continuous aggregates count | 12 (various dimensions and periods) |

Hardware: a single PostgreSQL server (32 vCPU, 256 GB RAM, NVMe + SATA SSD) plus a failover replica. That covers the full workload — OLTP and time-series combined.

The most important MES property: **linear scaling**. Adding another 50,000 sensors does not require an architectural change — you add storage and, if the chunk catalog grows too large, increase `chunk_time_interval`. PostgreSQL with TimescaleDB handles up to tens of billions of readings per plant on a single node without sharding.

## Why TimescaleDB is a good choice for MES

Four concrete arguments:

**1. One engine for everything.** OLTP (orders, operators, quality, warehouse) and time-series (sensor readings, alarms, OEE) in the same PostgreSQL. No separate database to operate, no separate backup procedure, no separate monitoring, no separate team skills.

**2. SQL as a lingua franca.** Every senior developer and data engineer knows SQL. NoSQL aggregation pipelines require specific knowledge and are harder to debug. SQL is readable for the compliance auditor, the data scientist, the DBA — and for yourself two years after writing the query.

**3. Mature ecosystem.** PostgreSQL has been on the market for 35 years, TimescaleDB for 9. Mature tooling: pgBouncer, pgBackRest, pg_stat_statements, pgwatch2, pgBadger, pg_partman. Production reference customers for TimescaleDB number in the thousands, including Microsoft, Cisco, Bloomberg, ABB.

**4. Low vendor risk.** TimescaleDB Community is **Apache 2.0**. The commercial Enterprise edition adds multi-node sharding and HA (both unnecessary for a mid-sized MES). Migration if ever needed — back to pure PostgreSQL via `pg_dump` with a simple mapping to partitioned tables. That eliminates the classical pain of dedicated time-series databases (InfluxDB licensing shifts, ClickHouse in non-Yandex environments).

## When TimescaleDB is NOT a good choice

An honest list — not everything fits every plant:

**Very small deployments (under 1 million readings per day).** For a plant with 200 sensors and daily reporting, plain PostgreSQL without TimescaleDB will do. Hypertables only start paying off once chunks count in the dozens — typically from tens of millions of readings per day.

**Very high write throughput (over 1 million per second per node).** ClickHouse in distributed mode has better write performance than PostgreSQL + TimescaleDB. For ad-tech, financial markets, similar use cases — ClickHouse is the right pick. For MES, real-world limits sit far below that threshold.

**No SQL skills in the team.** If your data-engineering team works only in pandas and Spark, adding PostgreSQL as the primary store requires a learning investment. Worth a TCO analysis.

**Edge deployment (low memory, low power).** PostgreSQL + TimescaleDB is a classical 32 vCPU / 256 GB RAM server. For the edge (Jetson, Raspberry Pi gateway on the shop floor) SQLite with extensions or specialized embedded time-series databases (e.g. RedisTimeSeries for in-memory) work better.

## Recommendations for a plant evaluating its data architecture

Three concrete points:

**First**, if you are building a new MES from scratch in 2026, PostgreSQL with TimescaleDB is the default today. Stack consolidation on a single SQL engine simplifies operations and compliance. Dedicated time-series databases (InfluxDB, ClickHouse) only make sense for specific scenarios (extreme write throughput, custom analytics use cases).

**Second**, if you already run PostgreSQL for OLTP, adding TimescaleDB is painless — it is an extension, installed via `CREATE EXTENSION timescaledb`. No infrastructure swap, no additional licences, no separate DBA team.

**Third**, when budgeting storage, account for compression. Naive calculations such as "1 sensor × 1 Hz × 8 bytes × 31M seconds/year = 250 MB/year" are correct on raw data — but TimescaleDB will compress that to roughly 15 MB/year. For 50,000 sensors that is the difference between 12 TB and 600 GB per year. Realistic capacity planning has to take compression into account from the start.

The OmniMES stack is deliberately built on consolidation and simplicity — one SQL engine, a clear data path from sensor to dashboard, a minimal vendor footprint. The next step is integration with [Time-series Foundation Models](/blog/time-series-foundation-models-in-mes-are-timesfm-chronos-moirai-already-beating-your-own-xgboost-in-failure-prediction) — continuous aggregates as input features for TimesFM/Chronos work better than raw sensor data, which substantially lowers the inference cost of failure prediction.

---

## Sources

- [TimescaleDB Documentation](https://docs.timescale.com/) — hypertables, compression, continuous aggregates
- [PostgreSQL 17 release notes](https://www.postgresql.org/docs/17/release-17.html) — partitioning and query planner improvements
- [Gorilla compression paper, Facebook 2015](https://www.vldb.org/pvldb/vol8/p1816-teller.pdf) — compression algorithm for time series
- [pgBouncer documentation](https://www.pgbouncer.org/) — connection pooling for PostgreSQL
- [TimescaleDB benchmarks](https://www.timescale.com/blog/timescaledb-vs-influxdb-for-time-series-data/) — performance comparison (note: source biased — TimescaleDB)
- [Time-series Foundation Models in MES](/blog/time-series-foundation-models-in-mes-are-timesfm-chronos-moirai-already-beating-your-own-xgboost-in-failure-prediction) — the next analytical step
- [NIS2 and the Polish KSC2 Act in 2026](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory) — compliance context for stack consolidation
- [OmniMES — cybersecurity and CRA compliance](https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/cybersecurity-compliance-cra-pPJBcC6sBf) — product documentation
