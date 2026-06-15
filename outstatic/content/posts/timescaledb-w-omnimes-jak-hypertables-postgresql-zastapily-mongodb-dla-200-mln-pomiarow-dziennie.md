---
title: 'TimescaleDB w OmniMES: jak hypertables PostgreSQL zastąpiły MongoDB dla 200 mln pomiarów dziennie'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'timescaledb-w-omnimes-jak-hypertables-postgresql-zastapily-mongodb-dla-200-mln-pomiarow-dziennie'
description: 'Przez trzy lata trzymaliśmy dane czasowe z czujników OmniMES w MongoDB. Zadziałało do skali 50 mln pomiarów dziennie, potem aggregation pipelines zaczęły zajmować 10–15 sekund, a storage rósł 60 GB miesięcznie. W styczniu 2026 zaczęliśmy migrację na TimescaleDB — rozszerzenie PostgreSQL z hypertables. Po sześciu miesiącach: 3,6 TB MongoDB → 180 GB TimescaleDB (95% kompresji), agregacje z 12 s do 400 ms, zero downtime w trakcie migracji. Artykuł opisuje konkretnie co, jak i dlaczego — plus co byśmy zrobili inaczej.'
coverImage: '/images/post-timescaledb-mes/cover-timescaledb-mes.png'
lang: 'pl'
tags: [{"value":"timeSeriesData","label":"time-series data"},{"value":"mongoDb","label":"MongoDB"},{"value":"timescaleDb","label":"TimescaleDB"},{"value":"omniMES","label":"OmniMES"}]
publishedAt: '2026-06-16T08:00:00.000Z'
---

W styczniu 2026 baza MongoDB pod OmniMES osiągnęła **3,6 TB** danych z czujników i rosła w tempie 60 GB miesięcznie. Aggregation pipeline dla raportu OEE z ostatnich 30 dni zajmował **12–15 sekund**. Dwa zakłady klienckie zgłosiły, że dashboard utrzymania ruchu „zamarł" przy próbie wyświetlenia historii temperatury kompresora z ostatniego kwartału. W lutym zaczęliśmy migrację na TimescaleDB — rozszerzenie PostgreSQL projektowane od początku do czasowej kompresji i szybkich agregacji na partycjonowanych tabelach.

Sześć miesięcy później: **200 mln pomiarów dziennie**, **180 GB po kompresji** (95% redukcji), **agregacje 200–800 ms**. Migracja przebiegła bez downtime'u dzięki strategii dual-write. W tym artykule rozbieram konkretnie, jak to wyglądało — co zadziałało, co poszło źle, i dlaczego nie zostaliśmy na MongoDB, mimo że [poprzedni stack OmniMES](/blog/redash-w-omnimes-dashboardy-na-mongodb-przez-sql-i-rest-api) był na nim oparty od pierwszej wersji produkcyjnej.

## Dlaczego MongoDB osiągnęło limit

MongoDB świetnie zadziałało jako pierwsza baza pod OmniMES. Schema-less storage pozwalał dodawać nowe typy czujników bez migracji DDL. Aggregation framework był wystarczająco elastyczny do typowych raportów (OEE, downtime, quality rates). Indeksy compound i sparse pokrywały 90% naszych query patterns.

Pierwsze ostrzeżenie pojawiło się przy 80 mln pomiarów dziennie. Aggregation pipeline z `$match → $group → $sort` dla 30-dniowego okna potrzebował 6 sekund na zbiorze 2,4 mld dokumentów. Dodaliśmy więcej RAM (z 128 GB do 256 GB), latency spadła do 4 sekund — przez kwartał.

Przy 150 mln dziennie agregacje zaczęły blokować się o working set. PostgreSQL replica do OLTP została doposażona w dedykowany analytical replicas MongoDB (oxymoron, wiemy). Storage rósł 60 GB miesięcznie — w tempie kwartał-do-kwartału w sumie 1,2 TB rocznie. Plan retencji „90 dni hot, 2 lata cold" nie był realistyczny przy tej szybkości wzrostu i bez natywnej kompresji time-series.

W styczniu 2026 użyliśmy `mongostat` i obserwowaliśmy:
- **avg query latency**: 4,2 s dla typowego dashboard request
- **storage utilization**: 78% (3,6 TB z 4,6 TB rezerwowanego)
- **index size**: 280 GB (większy niż cała baza po późniejszej migracji)
- **working set vs RAM**: 2,1× — dane gorące nie mieściły się w pamięci

To są objawy, których nie da się rozwiązać przez „dorzucenie hardware'u". MongoDB nie był projektowany jako specjalistyczna baza time-series, a my używaliśmy go jak takiej. Czas na zmianę architektury.

## Co rozpatrywaliśmy zamiast MongoDB

Cztery realne opcje:

**InfluxDB 3 OSS.** Dedykowana baza time-series, query language Flux (potem InfluxQL), natywna kompresja. **Minus**: w listopadzie 2024 InfluxData ogłosił że InfluxDB 3 OSS będzie miał ograniczoną funkcjonalność vs InfluxDB Cloud. Ryzyko vendor lock-in i licencyjne przesunięcia. Pisaliśmy o tym w [artykule o InfluxDB w przemyśle](/blog/zastosowanie-influxdb-w-zbieraniu-danych-przemyslowych-i-porownanie-z-mongodb).

**ClickHouse.** Świetne benchmarki, columnar storage, wsparcie dla MergeTree z ORDER BY (timestamp, sensor). **Minus**: dla naszego workloadu (90% append, 10% point queries po sensor_id + time range) MergeTree jest overkill. Plus drugi system do utrzymania obok PostgreSQL (już mamy do danych transakcyjnych — produkcja, zlecenia, użytkownicy).

**QuestDB.** Lekka, szybka, SQL-native. **Minus**: ekosystem mniejszy niż TimescaleDB, mniej zewnętrznych integracji (m.in. Grafana plugin gorzej dojrzały na luty 2026), mniej dostępnych developerów do hire.

**TimescaleDB (rozszerzenie PostgreSQL).** Hypertables, native compression, continuous aggregates, ten sam silnik SQL co dla danych transakcyjnych OmniMES. **Plus**: jeden system do nauki, jeden host do utrzymania, ten sam Auth i RBAC. **Minus**: trochę gorsze write throughput per node niż dedykowane time-series DB, ale dla naszej skali bez znaczenia.

Wybór padł na TimescaleDB. Decydujące kryteria:
- **konsolidacja stacku** — eliminacja MongoDB jako oddzielnej bazy, ten sam PostgreSQL co OLTP
- **SQL zamiast aggregation pipelines** — łatwiejsze do debugowania, każdy senior dev w zespole zna SQL
- **continuous aggregates** — pre-computed daily/hourly rollups bez ręcznych ETL jobs
- **compression** — 90–98% redukcji dla typowych time-series sygnatur (vibration, temperature, flow rate)
- **vendor risk niski** — Timescale jest pod Apache 2.0, część projektu jest też community edition

## Co to TimescaleDB i jak działają hypertables

Hypertable to wirtualna tabela w PostgreSQL, która pod spodem składa się z setek lub tysięcy „chunks" — fizycznych partycji po dimensji czasowej (i opcjonalnie dodatkowej). Z perspektywy aplikacji to zwykła tabela:

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

Każdy chunk to oddzielna tabela PostgreSQL (`_hyper_1_42_chunk`, `_hyper_1_43_chunk` itd.), z własnymi indeksami i statystykami. Query planner wie, że `WHERE time > NOW() - INTERVAL '7 days'` powinien czytać tylko 7 ostatnich chunks, nie 365 całorocznych. To **chunk exclusion** — fundamentalna optymalizacja, której nie ma w MongoDB.

Kompresja w TimescaleDB jest segmentowana po `sensor_id` i sortowana po `time`. Dla typowych sygnałów przemysłowych (powolnie zmieniające się temperatury, ciśnienia, vibracje) algorytmy Gorilla + delta-of-delta dają 90–98% kompresji. Skompresowane chunks pozostają queryowalne — query planner sięga do nich transparentnie:

```sql
ALTER TABLE sensor_readings SET (
  timescaledb.compress,
  timescaledb.compress_segmentby = 'sensor_id'
);

SELECT add_compression_policy('sensor_readings', INTERVAL '7 days');
```

Continuous aggregates to materialized views, które automatycznie aktualizują się w tle. Zamiast obliczać OEE od czujnika co request, zapisujemy minutowe rollups raz, a dashboard czyta gotowy widok:

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

To trzy fundamentalne mechanizmy, których MongoDB nie ma natywnie. Można je próbować odtworzyć przez sharding po dacie + manualnym caching, ale to ścieżka prowadząca do własnego time-series engine na MongoDB. Łatwiej wziąć gotowy.

## Architektura po migracji

Stack OmniMES dla danych po czerwcu 2026:

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
  → Redash (dashboardy biznesowe — pozostawiony z poprzedniego stacku)
  → API REST / GraphQL → OmniMES UI
```

Kluczowa decyzja architektoniczna: **ten sam PostgreSQL dla OLTP i danych czasowych.** Wymagało to upewnienia się, że workloady się nie zatłamszą. Rozdzieliliśmy je przez tablespace'y:
- OLTP na SSD NVMe (zlecenia, użytkownicy, autoryzacja)
- Time-series na SSD SATA z większą pojemnością (sensor_readings i continuous aggregates)
- WAL na osobnym dysku (klasyczna optymalizacja PostgreSQL)

Trzy tygodnie testowania pokazały, że workload time-series (głównie append-only) nie konkuruje z OLTP (mix read/write) — dopóki connection pool jest dobrze ograniczony (pgBouncer, max 200 połączeń per app).

## Migration story: 6 miesięcy, dual-write, zero downtime

Migracja przebiegła w czterech fazach:

**Faza 1 (luty 2026, 4 tygodnie): setup równolegle.** Nowy serwer PostgreSQL + TimescaleDB z replikacją PITR. Telegraf rekonfigurowany na **dual-write** — każdy pomiar zapisywany do MongoDB (legacy) i TimescaleDB (new). Walidacja: codziennie porównywaliśmy liczbę rekordów w obu bazach przez 4 tygodnie. Zero rozbieżności po 2 tygodniach od konfiguracji idempotentnych writers.

**Faza 2 (marzec 2026, 6 tygodni): backfill historii.** Eksport 18 miesięcy MongoDB do TimescaleDB. Wyzwanie: serializacja BSON → relational. Napisaliśmy skrypt w Pythonie (asyncpg + motor), który:
- czytał MongoDB w chunkach po 100k dokumentów
- mapował dynamiczne pola BSON na (time, sensor_id, value, metadata JSONB)
- bulk-inserted do TimescaleDB przez `COPY ... FROM STDIN`

Backfill przebiegał z prędkością ~6 mln pomiarów na godzinę. 18 miesięcy × 30 dni × 100 mln (uśredniona historyczna gęstość) = 54 mld pomiarów. Czas: 9 tygodni 24/7, ale w praktyce z przerwami i optymalizacjami — 6 tygodni.

**Faza 3 (maj 2026, 4 tygodnie): read traffic switch.** Migracja read traffic z MongoDB na TimescaleDB. Włączaliśmy stopniowo, dashboard po dashboardzie:
- Operatorski dashboard (real-time) — pierwszy, najmniejsze ryzyko (dane z ostatniej godziny, łatwo zweryfikować vs PLC)
- Dashboard utrzymania ruchu (24h–7d) — drugi
- Raporty miesięczne (30d–90d) — trzeci, wymagał porównania z historycznymi raportami z MongoDB
- Raporty roczne (12 mies.) — ostatni, po pełnym backfill

Każdy switch był feature-flagiem per użytkownik. Pierwsze dwa tygodnie — 5% użytkowników. Potem 50%. Potem 100%. Zero rollbacków.

**Faza 4 (czerwiec 2026, 2 tygodnie): wyłączenie MongoDB.** Stop dual-write. Snapshot MongoDB w cold storage (na wypadek inspekcji historycznych). Decommissioning serwera MongoDB — oszczędność około **800 EUR/miesiąc** na hostingu + utrzymaniu.

Zero downtime'u przez całe 6 miesięcy. Każda klientka z OmniMES widziała dashboardy nieprzerwanie.

## Liczby przed i po

Mierzone wartości produkcyjne, średnie z czerwca 2026 vs styczeń 2026:

| Metryka | MongoDB (styczeń 2026) | TimescaleDB (czerwiec 2026) | Zmiana |
|---|---|---|---|
| Liczba pomiarów dziennie | 150 mln | 200 mln (wzrost ruchu) | +33% wolumenu |
| Storage (raw + indexes) | 3,6 TB | 180 GB | −95% |
| Aggregation OEE 30 dni | 12,3 s | 380 ms | 32× szybciej |
| Aggregation OEE 1 rok | timeout >30 s | 1,8 s | szybsze |
| Real-time chart 1h, 100 sensors | 1,8 s | 95 ms | 19× szybciej |
| Backfill nowego raportu (24 mies.) | 4–8 h | 18 min | 13–27× szybciej |
| Hosting cost (per miesiąc) | ~1 200 EUR | ~400 EUR (consolidacja) | −66% |

Najmocniejsza obserwacja: **kompresja 95%** to nie marketing. Dla naszych sygnatur (temperatury, vibracje, flow rates, OEE counters) algorytmy delta-of-delta i Gorilla pracują wyjątkowo dobrze. Test był uczciwy — porównywaliśmy całkowitą zajętość storage (włącznie z replikami, backupami, indeksami), nie tylko goły dataset.

## Co poszło źle i co byśmy zrobili inaczej

Sześć rzeczy:

**1. Niedoszacowaliśmy czas backfill.** Plan był 4 tygodnie, realnie 6 tygodni. Problem: BSON ma typy, których PostgreSQL nie ma natywnie (decimal128, ObjectId). Mapping trwał dłużej niż liczyliśmy. Następnym razem — najpierw mały POC backfill 1 miesiąc, potem skalowanie.

**2. Continuous aggregates wymagają planowania.** Pierwsza wersja `oee_5min` była tworzona za późno (po backfill), co wymagało ręcznego `refresh_continuous_aggregate()` na 18 miesięcy historii — 14 godzin pracy serwera. Następnym razem — definicje continuous aggregates **przed** backfillem, materializacja idzie w trakcie ładowania.

**3. Compression policy default. Włączyliśmy** `add_compression_policy(..., INTERVAL '7 days')` bez tuningu. Dla niektórych sygnałów (alarms, events o niskiej częstotliwości) 7 dni jest za szybko — kompresja narzuca koszt przy każdym query do świeżych danych. Lepiej: per-table policy bazująca na charakterystyce sygnału (high-frequency continuous: 7 dni; sparse events: 90 dni).

**4. JSONB w hypertables to compromise.** Niektóre dane sensoryczne mają zmienną strukturę (metadata channel info, calibration params). Trzymaliśmy je w MongoDB jako natural fit, w TimescaleDB jako JSONB. JSONB jest szybki dla read, ale nie kompresuje się tak dobrze jak typed columns. Następnym razem — analiza, które pola JSONB warto wyciągnąć do typowanych kolumn (z migracją).

**5. Connection pool tuning.** Pierwsze 2 tygodnie po Faza 3 mieliśmy peaki latency raz dziennie — okazało się, że Telegraf otwiera nowe połączenia na każdy batch insert. Switch na pgBouncer z transaction pooling rozwiązał problem, ale wcześniej zrobiliśmy 3 godziny debug session na nic.

**6. Monitoring continuous aggregates.** Continuous aggregates mają background workers, które potrafią się zatrzymać bez głośnego alertu. Po tygodniu pracy zauważyliśmy, że `oee_5min` jest opóźniony o 6 godzin — refresh job miał błąd w SQL, restart Postgresa go zatrzymał. Dodaliśmy alert „last refresh > 30 min ago" do Prometheus/Grafana — powinien być od dnia 0.

## Rekomendacje dla średniego zakładu

Trzy konkrety dla zakładu rozważającego podobną migrację:

**Po pierwsze**, MongoDB do 50 mln pomiarów dziennie dla większości polskich zakładów wystarczy bez problemów. Migracja na TimescaleDB ma sens przy przekroczeniu progu, gdy aggregation latency zaczyna przekraczać 3–5 sekund i storage rośnie szybciej niż 30 GB/miesiąc. Poniżej tych progów nie warto — koszt migracji 6 mies./2 inżynierów to ~50–100 tys. zł, ROI tylko przy realnej skali.

**Po drugie**, jeśli macie już PostgreSQL dla OLTP, TimescaleDB jest oczywistym wyborem. Konsolidacja na jeden silnik SQL, ten sam stack monitoring (pgBadger, pgwatch2), ta sama wiedza w zespole, jedna baza do utrzymania. Dedykowane time-series DB (InfluxDB, ClickHouse) mają lekko lepsze write throughput, ale każdy dodatkowy system to oddzielny dług operacyjny i [audytowy pod NIS2](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki).

**Po trzecie**, dual-write podczas migracji jest droższy o ~30% RAM i 20% CPU przez okres przejściowy, ale eliminuje ryzyko utraty danych i pozwala na zero downtime. Dla zakładu produkcyjnego, gdzie 1 godzina downtime'u MES kosztuje 5–50 tys. zł, dual-write to oczywista decyzja. Nie próbujcie „big bang switch" — to przepis na nocną zmianę z ratowaniem produkcji.

Stack po migracji jest prostszy, tańszy, szybszy i lepiej zintegrowany z resztą OmniMES. To rzadki przypadek wymiany technologii, gdzie nie żałujemy. Następny krok — eksperymenty z TimescaleDB w połączeniu z foundation models, o których pisałem w [artykule o TSFM](/blog/time-series-foundation-models-w-mes-czy-timesfm-chronos-moirai-juz-bija-wlasny-xgboost-w-predykcji-awarii). Wstępne benchmarki sugerują, że continuous aggregates jako input feature dla TimesFM/Chronos działa lepiej niż surowe sensor data.

---

## Źródła

- [TimescaleDB Documentation](https://docs.timescale.com/) — hypertables, compression, continuous aggregates
- [TimescaleDB benchmarks](https://www.timescale.com/blog/timescaledb-vs-influxdb-for-time-series-data/) — porównanie wydajności (uwaga: source biased — TimescaleDB)
- [PostgreSQL 17 release notes](https://www.postgresql.org/docs/17/release-17.html) — improvements w partycjonowaniu i query planner
- [Gorilla compression paper, Facebook 2015](https://www.vldb.org/pvldb/vol8/p1816-teller.pdf) — algorytm kompresji dla time-series
- [pgBouncer documentation](https://www.pgbouncer.org/) — connection pooling dla PostgreSQL
- [Redash w OmniMES — Dashboardy na MongoDB](/blog/redash-w-omnimes-dashboardy-na-mongodb-przez-sql-i-rest-api) — poprzedni stack OmniMES
- [Zastosowanie InfluxDB w zbieraniu danych przemysłowych](/blog/zastosowanie-influxdb-w-zbieraniu-danych-przemyslowych-i-porownanie-z-mongodb) — alternatywa rozważana
- [Time-series Foundation Models w MES](/blog/time-series-foundation-models-w-mes-czy-timesfm-chronos-moirai-juz-bija-wlasny-xgboost-w-predykcji-awarii) — kolejny krok analityczny
- [NIS2 i KSC2 w 2026](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki) — kontekst compliance dla konsolidacji stacku
