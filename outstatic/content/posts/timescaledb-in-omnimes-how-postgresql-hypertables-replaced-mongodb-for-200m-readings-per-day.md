---
title: 'TimescaleDB in OmniMES: how PostgreSQL hypertables replaced MongoDB for 200M readings per day'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'timescaledb-in-omnimes-how-postgresql-hypertables-replaced-mongodb-for-200m-readings-per-day'
description: 'For three years we kept OmniMES sensor time-series data in MongoDB. It worked up to about 50 million readings a day. Then aggregation pipelines started taking 10–15 seconds, and storage was growing by 60 GB per month. In January 2026 we began the migration to TimescaleDB — a PostgreSQL extension with hypertables. Six months later: 3.6 TB on MongoDB → 180 GB on TimescaleDB (95% compression), aggregations from 12 s to 400 ms, zero downtime during the migration. This article walks through what, how and why — plus what we would do differently.'
coverImage: '/images/post-timescaledb-mes/cover-timescaledb-mes.png'
lang: 'en'
tags: [{"value":"timeSeriesData","label":"time-series data"},{"value":"mongoDb","label":"MongoDB"},{"value":"timescaleDb","label":"TimescaleDB"},{"value":"omniMES","label":"OmniMES"}]
publishedAt: '2026-06-16T08:00:00.000Z'
---

In January 2026 the MongoDB instance under OmniMES reached **3.6 TB** of sensor data and was growing at 60 GB per month. The aggregation pipeline for a 30-day OEE report took **12–15 seconds**. Two customer plants reported that the maintenance dashboard "froze" when trying to render the compressor temperature history for the previous quarter. In February we kicked off the migration to TimescaleDB — a PostgreSQL extension designed from the start for time-series compression and fast aggregation on partitioned tables.

Six months later: **200 million readings per day**, **180 GB after compression** (95% reduction), **aggregations 200–800 ms**. The migration ran with zero downtime thanks to a dual-write strategy. This article walks through what it actually looked like — what worked, what went wrong, and why we did not stay on MongoDB even though the [previous OmniMES stack](/blog/redash-in-omnimes-dashboards-on-mongodb-with-sql-and-rest-api) was built on it from the first production release.

## Why MongoDB hit its limit

MongoDB worked well as the first database under OmniMES. Schema-less storage let us add new sensor types without DDL migrations. The aggregation framework was flexible enough for standard reports (OEE, downtime, quality rates). Compound and sparse indexes covered 90% of our query patterns.

The first warning appeared at 80 million readings a day. A `$match → $group → $sort` aggregation pipeline against a 2.4-billion-document collection for a 30-day window took 6 seconds. We added more RAM (from 128 GB to 256 GB) and latency dropped to 4 seconds — for one quarter.

At 150 million per day, aggregations started blocking on working set. The PostgreSQL replica used for OLTP was joined by a dedicated analytical MongoDB replica (an oxymoron, we know). Storage grew at 60 GB per month — quarter over quarter, 1.2 TB per year. The "90 days hot, 2 years cold" retention plan was unrealistic at that growth rate and without native time-series compression.

In January 2026 we ran `mongostat` and observed:
- **avg query latency**: 4.2 s for a typical dashboard request
- **storage utilization**: 78% (3.6 TB of 4.6 TB provisioned)
- **index size**: 280 GB (larger than the entire database after the later migration)
- **working set vs RAM**: 2.1× — the hot data did not fit in memory

These are symptoms you cannot solve by throwing more hardware at the problem. MongoDB was not designed as a specialized time-series database, and we were using it like one. Time to change the architecture.

## What we evaluated against MongoDB

Four realistic options:

**InfluxDB 3 OSS.** Dedicated time-series database, Flux query language (and later InfluxQL), native compression. **Downside**: in November 2024 InfluxData announced that InfluxDB 3 OSS would have limited functionality vs InfluxDB Cloud. Vendor lock-in and licensing-shift risk. We covered this in [our InfluxDB-in-industry article](/blog/using-influxdb-for-industrial-data-collection-and-comparison-with-mongodb).

**ClickHouse.** Excellent benchmarks, columnar storage, MergeTree with ORDER BY (timestamp, sensor). **Downside**: for our workload (90% append, 10% point queries by sensor_id + time range) MergeTree is overkill. Plus a second system to operate alongside PostgreSQL (which we already run for transactional data — production, orders, users).

**QuestDB.** Lightweight, fast, SQL-native. **Downside**: ecosystem smaller than TimescaleDB, fewer external integrations (the Grafana plugin in particular was less mature as of February 2026), and a smaller hiring pool for the technology.

**TimescaleDB (PostgreSQL extension).** Hypertables, native compression, continuous aggregates, the same SQL engine we already run for OmniMES transactional data. **Plus**: one system to learn, one host to operate, the same Auth and RBAC. **Minus**: slightly worse per-node write throughput than dedicated time-series DBs, but not at all relevant at our scale.

The decision went to TimescaleDB. Deciding criteria:
- **stack consolidation** — eliminating MongoDB as a separate database, the same PostgreSQL as OLTP
- **SQL instead of aggregation pipelines** — easier to debug, every senior dev on the team knows SQL
- **continuous aggregates** — pre-computed daily/hourly rollups without hand-written ETL jobs
- **compression** — 90–98% reduction for typical time-series signatures (vibration, temperature, flow rate)
- **low vendor risk** — Timescale is Apache 2.0, parts of the project are community-edition

## What TimescaleDB is and how hypertables work

A hypertable is a virtual PostgreSQL table that, under the hood, is composed of hundreds or thousands of "chunks" — physical partitions by time (and optionally a second dimension). From the application's perspective it is an ordinary table:

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

Each chunk is a separate PostgreSQL table (`_hyper_1_42_chunk`, `_hyper_1_43_chunk`, etc.) with its own indexes and statistics. The query planner knows that `WHERE time > NOW() - INTERVAL '7 days'` should read only the last 7 chunks, not all 365 of the year. This is **chunk exclusion** — a fundamental optimization MongoDB does not have.

Compression in TimescaleDB is segmented by `sensor_id` and sorted by `time`. For typical industrial signals (slow-changing temperatures, pressures, vibrations) the Gorilla + delta-of-delta algorithms produce 90–98% compression. Compressed chunks remain queryable — the query planner reaches into them transparently:

```sql
ALTER TABLE sensor_readings SET (
  timescaledb.compress,
  timescaledb.compress_segmentby = 'sensor_id'
);

SELECT add_compression_policy('sensor_readings', INTERVAL '7 days');
```

Continuous aggregates are materialized views that refresh automatically in the background. Instead of recomputing OEE per sensor on every request, we write minute-level rollups once, and dashboards read the prepared view:

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

These are three fundamental mechanisms MongoDB does not provide natively. You can try to recreate them with date-based sharding and manual caching, but that path leads to building your own time-series engine on top of MongoDB. It is easier to use one that already exists.

## Architecture after the migration

The OmniMES data stack from June 2026:

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
  → Redash (business dashboards — kept from the previous stack)
  → REST / GraphQL API → OmniMES UI
```

Key architectural decision: **same PostgreSQL for OLTP and time-series.** This required confirming the workloads would not crush each other. We separated them with tablespaces:
- OLTP on NVMe SSD (orders, users, authorization)
- Time-series on SATA SSD with larger capacity (sensor_readings and continuous aggregates)
- WAL on a separate disk (classical PostgreSQL optimization)

Three weeks of testing showed that the time-series workload (mostly append-only) did not compete with OLTP (mixed read/write) — as long as the connection pool stayed bounded (pgBouncer, max 200 connections per app).

## The migration: 6 months, dual-write, zero downtime

The migration ran in four phases:

**Phase 1 (February 2026, 4 weeks): set up in parallel.** A new PostgreSQL + TimescaleDB server with PITR replication. Telegraf reconfigured for **dual-write** — every reading written to both MongoDB (legacy) and TimescaleDB (new). Validation: daily comparison of record counts across both databases for 4 weeks. Zero discrepancies after the first 2 weeks once idempotent writers were in place.

**Phase 2 (March 2026, 6 weeks): history backfill.** Exported 18 months of MongoDB into TimescaleDB. The challenge: serializing BSON into relational form. We wrote a Python script (asyncpg + motor) that:
- read MongoDB in 100k-document chunks
- mapped dynamic BSON fields to (time, sensor_id, value, metadata JSONB)
- bulk-inserted into TimescaleDB via `COPY ... FROM STDIN`

The backfill ran at about 6 million readings per hour. 18 months × 30 days × 100 million (averaged historical density) = 54 billion readings. Wall time: 9 weeks of 24/7 at the headline rate, in practice 6 weeks with breaks and optimizations.

**Phase 3 (May 2026, 4 weeks): read traffic switch.** Migration of read traffic from MongoDB to TimescaleDB. We turned it on gradually, dashboard by dashboard:
- Operator dashboard (real-time) — first, lowest risk (last-hour data, easy to verify against PLC)
- Maintenance dashboard (24h–7d) — second
- Monthly reports (30d–90d) — third, required comparison against historical MongoDB reports
- Annual reports (12 months) — last, after the full backfill

Each switch was a per-user feature flag. First two weeks — 5% of users. Then 50%. Then 100%. Zero rollbacks.

**Phase 4 (June 2026, 2 weeks): MongoDB shutdown.** Stop dual-write. MongoDB snapshot in cold storage (for historical inspections). Decommissioning the MongoDB server — saving roughly **EUR 800/month** on hosting plus operations.

Zero downtime across all 6 months. Every OmniMES customer saw the dashboards continuously.

## Numbers before and after

Production metrics, June 2026 averages vs January 2026:

| Metric | MongoDB (Jan 2026) | TimescaleDB (Jun 2026) | Change |
|---|---|---|---|
| Daily readings | 150M | 200M (traffic growth) | +33% volume |
| Storage (raw + indexes) | 3.6 TB | 180 GB | −95% |
| 30-day OEE aggregation | 12.3 s | 380 ms | 32× faster |
| 1-year OEE aggregation | timeout >30 s | 1.8 s | newly possible |
| Real-time chart, 1h, 100 sensors | 1.8 s | 95 ms | 19× faster |
| New report backfill (24 months) | 4–8 h | 18 min | 13–27× faster |
| Hosting cost (monthly) | ~EUR 1,200 | ~EUR 400 (consolidation) | −66% |

The strongest observation: **95% compression** is not marketing. For our signatures (temperatures, vibrations, flow rates, OEE counters) the delta-of-delta and Gorilla algorithms work exceptionally well. The test was fair — we compared total storage footprint (including replicas, backups, indexes), not just the raw dataset.

## What went wrong and what we would do differently

Six things:

**1. We underestimated the backfill duration.** The plan was 4 weeks, the reality was 6. The problem: BSON has types PostgreSQL does not have natively (decimal128, ObjectId). Mapping took longer than expected. Next time — a small POC backfill of 1 month first, then scaling.

**2. Continuous aggregates need planning.** The first version of `oee_5min` was created too late (after the backfill), which required manual `refresh_continuous_aggregate()` over 18 months of history — 14 hours of server work. Next time — define continuous aggregates **before** the backfill, materialization runs as data lands.

**3. Default compression policy.** We enabled `add_compression_policy(..., INTERVAL '7 days')` without tuning. For some signals (alarms, low-frequency events) 7 days is too soon — compression adds cost on every query into fresh data. Better: per-table policy based on signal characteristics (high-frequency continuous: 7 days; sparse events: 90 days).

**4. JSONB in hypertables is a compromise.** Some sensor data has variable structure (metadata channel info, calibration params). We kept it in MongoDB as a natural fit, and in TimescaleDB as JSONB. JSONB is fast on read, but does not compress as well as typed columns. Next time — analyze which JSONB fields are worth promoting to typed columns (with migration).

**5. Connection pool tuning.** The first two weeks after Phase 3 we saw a daily latency spike — it turned out Telegraf was opening a new connection for every insert batch. Switching to pgBouncer with transaction pooling fixed it, but we spent 3 hours debugging beforehand.

**6. Continuous-aggregate monitoring.** Continuous aggregates have background workers that can stop without a loud alert. After a week of operation we noticed `oee_5min` was 6 hours behind — the refresh job had a SQL error, a Postgres restart had stopped it. We added a "last refresh > 30 min ago" alert in Prometheus/Grafana — it should be there from day zero.

## Recommendations for a mid-sized plant

Three pieces of practical advice for a plant considering a similar migration:

**First**, MongoDB up to 50 million readings per day works without issue for most European mid-market plants. Migrating to TimescaleDB makes sense once you cross that threshold, aggregation latency starts exceeding 3–5 seconds, and storage grows faster than 30 GB per month. Below that, do not bother — a 6-month, two-engineer migration costs PLN 50–100k, ROI only materializes at real scale.

**Second**, if you already run PostgreSQL for OLTP, TimescaleDB is the obvious choice. Consolidation onto one SQL engine, the same monitoring stack (pgBadger, pgwatch2), the same knowledge in the team, one database to operate. Dedicated time-series DBs (InfluxDB, ClickHouse) have slightly better write throughput, but every additional system is operational and [audit debt under NIS2](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory).

**Third**, dual-write during migration costs about 30% extra RAM and 20% CPU during the transition, but it eliminates the risk of data loss and enables zero downtime. For a manufacturing plant, where an hour of MES downtime costs EUR 1,000–10,000, dual-write is an obvious decision. Do not attempt a "big bang switch" — that is the recipe for a night shift spent rescuing production.

The stack after the migration is simpler, cheaper, faster, and better integrated with the rest of OmniMES. This is a rare case of a technology swap we do not regret. Next step — experiments with TimescaleDB combined with foundation models, which I covered in the [TSFM article](/blog/time-series-foundation-models-in-mes-are-timesfm-chronos-moirai-already-beating-your-own-xgboost-in-failure-prediction). Early benchmarks suggest that continuous aggregates as input features for TimesFM/Chronos work better than raw sensor data.

---

## Sources

- [TimescaleDB Documentation](https://docs.timescale.com/) — hypertables, compression, continuous aggregates
- [TimescaleDB benchmarks](https://www.timescale.com/blog/timescaledb-vs-influxdb-for-time-series-data/) — performance comparison (note: source biased — TimescaleDB)
- [PostgreSQL 17 release notes](https://www.postgresql.org/docs/17/release-17.html) — partitioning and query planner improvements
- [Gorilla compression paper, Facebook 2015](https://www.vldb.org/pvldb/vol8/p1816-teller.pdf) — compression algorithm for time series
- [pgBouncer documentation](https://www.pgbouncer.org/) — connection pooling for PostgreSQL
- [Redash in OmniMES — Dashboards on MongoDB](/blog/redash-in-omnimes-dashboards-on-mongodb-with-sql-and-rest-api) — previous OmniMES stack
- [Using InfluxDB for industrial data collection](/blog/using-influxdb-for-industrial-data-collection-and-comparison-with-mongodb) — alternative evaluated
- [Time-series Foundation Models in MES](/blog/time-series-foundation-models-in-mes-are-timesfm-chronos-moirai-already-beating-your-own-xgboost-in-failure-prediction) — the next analytical step
- [NIS2 and the Polish KSC2 Act in 2026](/blog/nis2-and-the-polish-ksc2-act-in-2026-how-mes-becomes-cyber-compliance-evidence-for-an-eu-factory) — compliance context for stack consolidation
