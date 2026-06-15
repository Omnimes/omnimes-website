---
title: 'TimescaleDB w OmniMES: jak hypertables PostgreSQL obsługują 200 mln pomiarów dziennie'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'timescaledb-w-omnimes-jak-hypertables-postgresql-obsluguja-200-mln-pomiarow-dziennie'
description: 'OmniMES używa TimescaleDB — rozszerzenia PostgreSQL z hypertables, kompresją i continuous aggregates — jako bazę danych dla danych czasowych z czujników przemysłowych. Architektura obsługuje 200 mln pomiarów dziennie, daje 95% kompresji storage i agregacje 200–800 ms. Artykuł opisuje koncept hypertables, architekturę stack''u OmniMES, continuous aggregates i konkretne liczby z produkcji.'
coverImage: '/images/post-timescaledb-mes/cover-timescaledb-mes.png'
lang: 'pl'
tags: [{"value":"timeSeriesData","label":"time-series data"},{"value":"timescaleDb","label":"TimescaleDB"},{"value":"postgres","label":"PostgreSQL"},{"value":"omniMES","label":"OmniMES"}]
publishedAt: '2026-06-16T08:00:00.000Z'
---

OmniMES korzysta z **TimescaleDB** jako bazy danych dla danych czasowych z czujników przemysłowych. To rozszerzenie PostgreSQL z 2017 roku, które dodaje do klasycznej bazy relacyjnej trzy mechanizmy potrzebne każdemu systemowi MES: **hypertables** (automatyczne partycjonowanie po czasie), **native compression** (95% redukcji rozmiaru danych) i **continuous aggregates** (pre-computed rollups bez ręcznych ETL).

W naszych wdrożeniach produkcyjnych ten stack obsługuje **200 mln pomiarów dziennie** z około 50 tys. czujników (PLC, OPC UA, MQTT). Czas typowej agregacji 30-dniowego raportu OEE: **200–800 ms**. Storage dla 18 miesięcy historii: **180 GB** po kompresji. Dashboard real-time dla 100 czujników: **pod 100 ms**.

Niżej rozbieram konkretnie, jak to działa, jaką architekturę zbudowaliśmy i dlaczego PostgreSQL z rozszerzeniem time-series jest dla MES lepszym wyborem niż dedykowane bazy time-series.

## Co to TimescaleDB

TimescaleDB to **rozszerzenie PostgreSQL** (extension), nie osobny silnik. Instaluje się przez `CREATE EXTENSION timescaledb` i odtąd cały stack PostgreSQL — psql, pgAdmin, pgBackRest, replikacja PITR, RBAC, JSONB, pełen SQL — działa jak dotychczas, plus dochodzi specjalizowana warstwa time-series.

To istotne, bo w MES typowo mamy dwa rodzaje danych:
- **transakcyjne** (zlecenia produkcyjne, operatorzy, kontrola jakości, magazyn) — klasyczny OLTP, naturalna dziedzina PostgreSQL
- **czasowe** (sensor readings, alarmy, OEE counters, energy metering) — wymagają innej obsługi: szybkiego appendu, kompresji, agregacji po okresach

Większość systemów MES rozwiązuje to przez **dwa silniki**: PostgreSQL/MS SQL/Oracle dla OLTP, plus InfluxDB/MongoDB/ClickHouse dla danych czasowych. To działa, ale wprowadza koszty: dwa systemy do utrzymania, dwie filozofie query, dwa stacki monitoringu, dwa zespoły wiedzy, dwie kopie zapasowe, dwa wektory audytu dla [NIS2](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki).

TimescaleDB pozwala mieć **jeden silnik** — z dedykowanymi mechanizmami dla time-series tam, gdzie są potrzebne. Konsolidacja stacku jest realnym argumentem operacyjnym, nie tylko estetycznym.

## Hypertables — fundament time-series w PostgreSQL

Hypertable to wirtualna tabela, która pod spodem składa się z setek lub tysięcy „chunks" — fizycznych partycji po wymiarze czasowym (i opcjonalnie dodatkowym). Z perspektywy aplikacji to zwykła tabela:

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

Każdy chunk to oddzielna tabela PostgreSQL (`_hyper_1_42_chunk`, `_hyper_1_43_chunk` itd.), z własnymi indeksami i statystykami. Query planner wie, że `WHERE time > NOW() - INTERVAL '7 days'` powinien czytać tylko 7 ostatnich chunks, nie 365 całorocznych. To **chunk exclusion** — fundament optymalizacji query w czasie stałym, niezależnie od rozmiaru historycznych danych.

Konsekwencja praktyczna: dashboard real-time wyświetlający ostatnią godzinę nie zwalnia, gdy w bazie zbiera się 5 lat historii. PostgreSQL bez TimescaleDB takiej gwarancji nie daje — duża tabela bez partycji wymaga full index scan, który rośnie z rozmiarem danych.

## Native compression — 95% redukcji rozmiaru

Kompresja w TimescaleDB jest **segmentowana** po wybranym wymiarze (typowo `sensor_id`) i **sortowana** po czasie. Dla typowych sygnałów przemysłowych — temperatury, ciśnienia, vibracje, flow rates — algorytmy Gorilla i delta-of-delta dają **90–98% kompresji**. Skompresowane chunks pozostają queryowalne; query planner sięga do nich transparentnie.

```sql
ALTER TABLE sensor_readings SET (
  timescaledb.compress,
  timescaledb.compress_segmentby = 'sensor_id'
);

SELECT add_compression_policy('sensor_readings', INTERVAL '7 days');
```

W naszej produkcji: po policy `compress after 7 days`, dane starsze niż tydzień zajmują średnio **5% oryginalnego rozmiaru**. Dla 18 miesięcy historii sensor data daje to **180 GB zamiast surowych około 3,6 TB**. Storage to nie tylko koszt dysku — to też RAM dla working set, prędkość backupu (45 minut zamiast 6 godzin), pasmo replikacji do disaster recovery site.

Test był uczciwy: porównujemy całkowitą zajętość dysku (włącznie z replikami, backupami, indeksami), nie tylko goły dataset.

## Continuous aggregates — pre-computed rollups w tle

Continuous aggregates to **materialized views**, które TimescaleDB automatycznie aktualizuje w tle. Zamiast obliczać OEE per czujnik co request, zapisujemy minutowe rollups raz, a dashboardy czytają gotowy widok:

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

W praktyce: agregacja 30-dniowego raportu OEE na surowych danych wymagałaby przejrzenia około 6 mld punktów. Na continuous aggregate (5-min bucketach) jest to około 600 tys. wierszy — 4 rzędy wielkości mniej. Stąd typowe 200–800 ms zamiast wielu sekund.

W OmniMES używamy continuous aggregates w trzech rozdzielczościach: 5-minutowej (dashboardy operatorskie), godzinowej (utrzymanie ruchu) i dziennej (raporty zarządcze). Wszystkie odświeżają się automatycznie, bez ręcznego ETL.

## Architektura danych w OmniMES

Pełny stack od czujnika do dashboardu wygląda następująco:

```
PLC / SCADA / OPC UA
  → MQTT broker (Mosquitto, on-prem)
  → Kafka topic per linia produkcyjna
  → Telegraf (parsing, validation)
  → PostgreSQL 17 + TimescaleDB 2.18
       ├── sensor_readings (hypertable, kompresja po 7 dniach)
       ├── oee_5min (continuous aggregate)
       ├── oee_hourly (continuous aggregate)
       ├── alarms (regular table)
       ├── orders, users, ... (OLTP, ten sam host)
  → Grafana (dashboardy operatorów)
  → Redash (dashboardy biznesowe)
  → API REST / GraphQL → OmniMES UI
```

Kluczowa decyzja architektoniczna: **ten sam PostgreSQL dla OLTP i danych czasowych.** To wymagało potwierdzenia, że workloady się nie zatłamszą. Rozdzieliliśmy je przez tablespace'y:
- OLTP na SSD NVMe (zlecenia, użytkownicy, autoryzacja)
- Time-series na SSD SATA z większą pojemnością (sensor_readings i continuous aggregates)
- WAL na osobnym dysku (klasyczna optymalizacja PostgreSQL)

Plus pgBouncer z transaction pooling, maksymalnie 200 połączeń per aplikacja. Trzy tygodnie testów przed produkcyjnym rolloutem pokazały, że workload time-series (głównie append-only) nie konkuruje z OLTP (mix read/write) przy odpowiednim tuningu.

## Wydajność i skala — liczby z produkcji

Mierzone wartości średnie z czerwca 2026:

| Metryka | Wartość |
|---|---|
| Czujniki w bazie | ~50 tys. |
| Liczba pomiarów dziennie | 200 mln |
| Storage (raw + kompresja + indeksy + WAL) | 180 GB |
| Współczynnik kompresji (po 7 dniach) | 95% |
| Agregacja OEE 30 dni | 200–800 ms |
| Agregacja OEE 1 rok | 1,8 s |
| Real-time chart 1h, 100 czujników | pod 100 ms |
| Backfill nowego raportu (24 mies.) | 18 minut |
| Liczba continuous aggregates | 12 (różne wymiary i okresy) |

Hardware: jeden serwer PostgreSQL (32 vCPU, 256 GB RAM, NVMe + SATA SSD) plus replika do failover. To wystarcza na cały zakres workloadu — OLTP i time-series razem.

Najbardziej istotne dla MES: **liniowa skala**. Dodając kolejne 50 tys. czujników nie musimy zmieniać architektury — wystarczy dorzucić storage i zwiększyć chunk_time_interval, jeśli baza chunks staje się zbyt duża. PostgreSQL z TimescaleDB obsługuje pojedynczo do dziesiątek miliardów pomiarów per zakład bez konieczności sharding.

## Dlaczego TimescaleDB to dobry wybór dla MES

Cztery konkretne argumenty:

**1. Jeden silnik dla wszystkiego.** OLTP (zlecenia, operatorzy, jakość, magazyn) i time-series (sensor readings, alarms, OEE) w tym samym PostgreSQL. Brak osobnej bazy do utrzymania, brak osobnej procedury backup, brak osobnego monitoringu, brak osobnych skilli w zespole.

**2. SQL jako lingua franca.** Każdy senior developer i data engineer zna SQL. Aggregation pipelines z NoSQL baz wymagają specyficznej wiedzy i są trudniejsze do debugowania. SQL jest zrozumiały dla audytora compliance, dla data scientista, dla DBA — i dla samego siebie po dwóch latach od napisania query.

**3. Dojrzały ekosystem.** PostgreSQL ma 35 lat na rynku, TimescaleDB 9 lat. Dojrzałe narzędzia: pgBouncer, pgBackRest, pg_stat_statements, pgwatch2, pgBadger, pg_partman. Klientów referencyjnych dla TimescaleDB w produkcji: tysiące, w tym Microsoft, Cisco, Bloomberg, ABB.

**4. Niski vendor risk.** TimescaleDB jest pod **Apache 2.0** dla wersji Community. Komercyjna wersja Enterprise dodaje multi-node sharding i high availability (oba niepotrzebne dla średniego MES). Migracja w razie potrzeby — back to pure PostgreSQL przez `pg_dump` z prostym mapowaniem na partitioned tables. To eliminuje klasyczny problem dedykowanych time-series baz (InfluxDB licensing shifts, ClickHouse w środowisku non-Yandex).

## Kiedy TimescaleDB NIE jest dobrym wyborem

Uczciwa lista — nie wszystko jest dla każdego zakładu:

**Bardzo małe wdrożenia (do 1 mln pomiarów dziennie).** Dla zakładu z 200 czujnikami i raportowaniem dziennym czysty PostgreSQL bez TimescaleDB wystarczy. Hypertables zaczynają mieć sens dopiero gdy chunks zaczynają się liczyć na dziesiątki — typowo od kilkudziesięciu milionów pomiarów dziennie.

**Bardzo wysokie write throughput (powyżej 1 mln per sekundę per node).** ClickHouse w trybie distributed ma lepsze write performance niż PostgreSQL + TimescaleDB. Dla aplikacji typu ad-tech, financial markets — ClickHouse jest właściwym wyborem. Dla MES — limity są zwykle daleko poniżej tego progu.

**Brak SQL skills w zespole.** Jeżeli zespół data engineeringu pracuje wyłącznie z pandas i Spark, dodanie PostgreSQL jako głównej bazy wymaga inwestycji w naukę. Wtedy warto przeanalizować TCO.

**Edge deployment (mała pamięć, mała moc).** PostgreSQL + TimescaleDB to klasyczny serwer 32 vCPU / 256 GB RAM. Dla edge'a (Jetson, Raspberry Pi w gateway hali) lepiej sprawdzą się SQLite z extensions albo specjalizowane embedded time-series bazy (np. RedisTimeSeries dla in-memory).

## Rekomendacje dla zakładu rozważającego architekturę danych

Trzy konkrety:

**Po pierwsze**, jeżeli budujecie nowy MES od zera w 2026, PostgreSQL z TimescaleDB jest dziś defaultem. Konsolidacja stacku na jeden silnik SQL upraszcza operacje i compliance. Dedykowane time-series bazy (InfluxDB, ClickHouse) mają sens tylko w specyficznych scenariuszach (extreme write throughput, custom analytics use cases).

**Po drugie**, jeżeli macie już PostgreSQL dla OLTP, dodanie TimescaleDB jest bezbolesne — to extension, instaluje się przez `CREATE EXTENSION timescaledb`. Nie wymaga to wymiany infrastruktury, dodatkowych licencji, ani osobnego zespołu DBA.

**Po trzecie**, planując storage budget pamiętajcie o kompresji. Naiwne kalkulacje typu „1 czujnik × 1 Hz × 8 bajtów × 31 mln sekund/rok = 250 MB rocznie" są prawdziwe na surowych danych — ale TimescaleDB skompresuje to do około 15 MB rocznie. Dla 50 tys. czujników to różnica między 12 TB a 600 GB rocznie. Realne planowanie capacity musi uwzględniać kompresję od początku.

Stack OmniMES jest świadomie zbudowany na konsolidacji i prostocie — jeden silnik SQL, jasna ścieżka danych od czujnika do dashboardu, minimum vendorów. Następny krok to integracja z [Time-series Foundation Models](/blog/time-series-foundation-models-w-mes-czy-timesfm-chronos-moirai-juz-bija-wlasny-xgboost-w-predykcji-awarii) — continuous aggregates jako input features dla TimesFM/Chronos działają lepiej niż surowe sensor data, co znacznie obniża koszt inferencji w predykcji awarii.

---

## Źródła

- [TimescaleDB Documentation](https://docs.timescale.com/) — hypertables, compression, continuous aggregates
- [PostgreSQL 17 release notes](https://www.postgresql.org/docs/17/release-17.html) — improvements w partycjonowaniu i query planner
- [Gorilla compression paper, Facebook 2015](https://www.vldb.org/pvldb/vol8/p1816-teller.pdf) — algorytm kompresji dla time-series
- [pgBouncer documentation](https://www.pgbouncer.org/) — connection pooling dla PostgreSQL
- [TimescaleDB benchmarks](https://www.timescale.com/blog/timescaledb-vs-influxdb-for-time-series-data/) — porównanie wydajności (source biased — TimescaleDB)
- [Time-series Foundation Models w MES](/blog/time-series-foundation-models-w-mes-czy-timesfm-chronos-moirai-juz-bija-wlasny-xgboost-w-predykcji-awarii) — kolejny krok analityczny
- [NIS2 i KSC2 w 2026](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki) — kontekst compliance dla konsolidacji stacku
- [OmniMES — cyberbezpieczeństwo i zgodność z CRA](https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/cyberbezpieczenstwo-i-zgodnosc-cra-6dbPWZS59e) — dokumentacja produktu
