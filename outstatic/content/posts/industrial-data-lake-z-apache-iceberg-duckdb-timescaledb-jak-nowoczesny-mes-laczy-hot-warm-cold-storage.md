---
title: 'Industrial data lake z Apache Iceberg + DuckDB + TimescaleDB: jak nowoczesny MES łączy hot, warm i cold storage'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-I1OD.jpg'
slug: 'industrial-data-lake-z-apache-iceberg-duckdb-timescaledb-jak-nowoczesny-mes-laczy-hot-warm-cold-storage'
description: 'TimescaleDB świetnie obsługuje dane czasowe z ostatnich 1–90 dni (hot), ale przy 5+ latach historii koszt SSD i RAM PostgreSQL rośnie szybciej niż wartość biznesowa. Apache Iceberg (table format dla data lake) plus DuckDB (lokalny silnik SQL) dają tańszą warstwę warm (90–730 dni) i cold (>2 lata) na S3 lub MinIO. Architektura 3-warstwowa redukuje koszt storage o 80–95% przy zachowaniu queryowalności. Artykuł pokazuje konkretnie jak to zbudować dla MES, gdzie są bariery, ile to kosztuje i jak migrować z monolitycznego TimescaleDB.'
coverImage: '/images/post-industrial-data-lake/cover-industrial-data-lake.png'
lang: 'pl'
tags: [{"value":"timeSeriesData","label":"time-series data"},{"value":"timescaleDb","label":"TimescaleDB"},{"value":"iceberg","label":"Apache Iceberg"},{"value":"omniMES","label":"OmniMES"}]
publishedAt: '2026-06-16T08:00:00.000Z'
---

[TimescaleDB w OmniMES](/blog/timescaledb-w-omnimes-jak-hypertables-postgresql-obsluguja-200-mln-pomiarow-dziennie) obsługuje 200 mln pomiarów dziennie z agregacjami pod 400 ms — dla danych z ostatniego kwartału. Dla danych starszych niż rok pojawia się problem ekonomiczny: PostgreSQL SSD storage w wersji enterprise (z replikami, backupami, indeksami) kosztuje rzędu **0,30–0,60 EUR/GB miesięcznie**, podczas gdy S3 lub MinIO (object storage) — **0,01–0,025 EUR/GB**. Dla 5-letniej historii sensor data po kompresji TimescaleDB (180 GB rocznie) różnica to **6 vs 90 EUR miesięcznie** na storage. To nie kryzys, ale przy 20+ zakładach klienckich liczby zaczynają mieć znaczenie.

Drugie pytanie: czy queryowalność danych z 2022 musi być taka sama jak z 2026? Operator hali nie potrzebuje wykresu temperatury kompresora sprzed 4 lat w 100 ms. Audytor compliance ([CBAM 1.08.2026](/blog/cbam-dla-eksporterow-stali-aluminium-cementu-pierwszy-raport-1-sierpnia-2026-co-mes-ems-musi-liczyc), [DPP 2027](/blog/digital-product-passport-dpp-wchodzi-do-fabryki-espr-i-battery-regulation-2027-co-mes-musi-umiec-do-lutego)) potrzebuje, żeby dane były dostępne i niezmieniliwe — ale 5–30 sekundowa latencja jest akceptowalna.

Architektura **3-warstwowego data lake** dla MES rozwiązuje obie kwestie. **Hot** (1–90 dni) w TimescaleDB. **Warm** (90–730 dni) w Apache Iceberg na object storage. **Cold** (>730 dni) w Iceberg z silną kompresją. Wszystko queryowalne przez jeden SQL endpoint dzięki DuckDB. Niżej rozbieram, jak to dziś działa i czy ma sens dla średniego polskiego zakładu.

## Co to Apache Iceberg

[Apache Iceberg](https://iceberg.apache.org/) (donated do Apache przez Netflix w 2018, dojrzały w 2024) to **table format dla data lake** — warstwa metadanych nad plikami Parquet w object storage. Daje funkcjonalność, której goły Parquet nie ma:

- **ACID transactions** — wstawki, update'y, delete'y są atomic, bez problemów z partial writes
- **Schema evolution** — dodawanie/usuwanie kolumn bez przepisywania historii
- **Time travel** — query stanu tabeli na konkretną datę w przeszłości
- **Hidden partitioning** — partycjonowanie po dacie/sensor_id bez wymagania, by query je explicit'nie referencjował
- **Compaction** — automatyczne łączenie małych plików dla wydajności query

Iceberg jest pod **Apache 2.0**, wspierany przez wszystkich dużych vendorów (AWS Athena, Snowflake, Databricks, Cloudera, Trino, Spark, DuckDB). Co istotne dla MES: pliki danych są w **Parquet** (otwarty format kolumnowy z kompresją), więc nie ma vendor lock-in — w razie potrzeby można otworzyć je dowolnym narzędziem czytającym Parquet, bez Iceberga.

Q1 2026 update Iceberg v1.6 sfinalizował **rolling deletes** — kluczowe dla MES, gdzie regularnie usuwamy najstarsze dane (retention 5 lat dla większości sensor data, 2 lata dla logów).

## Co to DuckDB

[DuckDB](https://duckdb.org/) (Q4 2024, dojrzałe v1.x w 2026) to **in-process analytical SQL engine**. Analog do SQLite, ale dla zapytań analitycznych zamiast OLTP. Pojedynczy binarny plik, brak serwera, brak konfiguracji — uruchomienie zajmuje milisekundy.

DuckDB potrafi czytać Iceberg natywnie od v0.9 (czerwiec 2024). To znaczy: można uruchomić `SELECT * FROM iceberg_scan('s3://bucket/sensor-readings') WHERE time > '2024-01-01'` z linii poleceń, z notebooka Jupyter, z mikroserwisu Pythona, z aplikacji Node.js — wszędzie ten sam silnik, te same wyniki.

W kontekście MES: DuckDB jest **query engine dla warm i cold tier**. Nie zastępuje TimescaleDB (który obsługuje hot — append-heavy, real-time queries). Zastępuje dedykowany query cluster dla starych danych (np. Trino lub Presto), który dla średniego zakładu byłby przerostem formy nad treścią.

Architektura jak my ją widzimy: jeden serwis backend (Python lub Go) decyduje **transparentnie** które storage tier query trafia:

- `time > NOW() - INTERVAL '90 days'` → PostgreSQL z TimescaleDB (hot)
- `time BETWEEN '2024-01-01' AND '2026-03-01'` → DuckDB czytający Iceberg (warm)
- Stare audyty, raporty historyczne → DuckDB z cold tier (Iceberg compressed)

Z perspektywy aplikacji to jeden REST endpoint. Z perspektywy operacji to trzy storage tiers o różnej cenie i wydajności.

## Architektura przepływu danych

Pełny stack dla 3-warstwowego data lake MES:

```
PLC / SCADA / OPC UA
  → MQTT broker (Mosquitto)
  → Kafka topic per linia produkcyjna
  → Telegraf (parsing, validation)
  → PostgreSQL 17 + TimescaleDB 2.18  [HOT — 90 dni]
       └── sensor_readings (hypertable, kompresja po 7 dniach)
  → Job nocny: tier-down z hot do warm
       ├── Eksport chunks starszych niż 90 dni do Parquet
       ├── Append do Iceberg table na S3/MinIO
       └── Drop chunks z PostgreSQL po pomyślnym tier-down
  → Iceberg table na S3 / MinIO  [WARM — 90–730 dni]
       ├── Partitioning: month + sensor_group
       ├── Compaction: codziennie
       └── Compression: ZSTD-3 (default)
  → Job miesięczny: tier-down z warm do cold
       └── Re-write z aggressive compression (ZSTD-9)
  → Iceberg table z deeper compression  [COLD — >730 dni]
  → Query Layer (Go / Python service)
       ├── Time-based routing: <90d → Postgres, <730d → Iceberg warm, ... → Iceberg cold
       ├── DuckDB pool for Iceberg reads
       └── REST API / GraphQL → MES UI, Grafana, Redash
```

Trzy istotne decyzje architektoniczne:

**1. Tier-down jest job-em batchowym**, nie strumieniem. Codziennie o 03:00 cron sprawdza chunks w PostgreSQL starsze niż 90 dni, eksportuje do Parquet, appenduje do Iceberg table na S3, weryfikuje (porównanie checksum), drop'uje z PostgreSQL. To 10–20 minut pracy serwera dla naszej skali.

**2. Compaction Iceberg jest oddzielnym jobem**, nie inline w writes. Iceberg writes są drobne (kilka MB każdy), bo append jest częsty. Codzienny compaction łączy je w pliki 256 MB–1 GB, co znacznie poprawia query throughput. Bez compaction queries spowalniają wykładniczo.

**3. Schema evolution musi być testowana.** Dodanie kolumny do `sensor_readings` (np. nowy typ sensora z metadata) wymaga zaktualizowania zarówno PostgreSQL DDL jak i Iceberg schema. Niezgodności prowadzą do błędów query lub utraty danych. W praktyce: zawsze najpierw schema migration w Iceberg, potem w PostgreSQL, potem deployment aplikacji która używa nowego pola.

## Liczby: koszty i wydajność

Realne wartości z naszego POC (50 tys. czujników, 200 mln pomiarów dziennie, retention 5 lat):

| Warstwa | Okres | Storage | Latency p95 | Koszt EUR/miesiąc |
|---|---|---|---|---|
| Hot (TimescaleDB) | 0–90 dni | 180 GB | poniżej 100 ms | 60 |
| Warm (Iceberg) | 90–730 dni | 1,8 TB (skompresowany) | 800 ms – 3 s | 25 |
| Cold (Iceberg + ZSTD-9) | 730+ dni | 4,2 TB (skompresowany) | 5–15 s | 50 |
| **Razem** | **5 lat** | **6,2 TB** | — | **135** |

Dla porównania: monolityczny TimescaleDB z całą 5-letnią historią to **~12 TB storage** (włącznie z replikami i backupami) za **~480 EUR/miesiąc** w klasycznym hostingu enterprise. **3,5× drożej** niż 3-warstwowa architektura.

Wydajność: hot tier queries niezmienione (PostgreSQL + TimescaleDB jak wcześniej). Warm queries dla typowych use case'ów MES (raport miesięczny 6 miesięcy wstecz, walidacja trendu rok do roku) — 800 ms – 3 s, akceptowalne dla raportowania batch. Cold queries (audyty, raporty regulacyjne 3–5 lat wstecz) — 5–15 s, akceptowalne dla rzadkich requestów.

## Object storage: S3, MinIO, czy on-prem

Trzy realne opcje dla warm/cold tier:

**AWS S3 / Azure Blob / GCP Cloud Storage.** Najtaniej cenowo per GB, ale **egress fees** (płatność za każdy GB wyjęty z chmury — 0,08–0,12 USD/GB) potrafią przewyższyć storage savings. Dla MES z aktywnym querying historii (raporty CBAM/DPP) — przelicz dokładnie.

**MinIO on-prem.** Self-hosted S3-compatible storage. Daje kontrolę nad data sovereignty (kluczowe pod [NIS2](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki) i RODO), zero egress fees, ale wymaga utrzymania klastra (typowo 3–6 nodes, ~50–100 tys. zł CapEx + 0,2 etatu DevOps). Dla zakładów z dedykowanym data center sense.

**On-prem NAS z S3 gateway.** Tańsze CapEx (Synology / QNAP enterprise z gateway S3 ~20–40 tys. zł), ale wolniejsze i mniej skalowalne. Działa dla zakładów do 5 TB cold data, słabo dla 50+ TB.

W praktyce wybieramy MinIO on-prem dla wdrożeń OmniMES gdzie dane produkcyjne nie mogą opuścić zakładu, AWS S3 dla zakładów z SaaS subscription i mieszanymi danymi.

## Migration: jak przejść z monolitycznego TimescaleDB

Realny plan dla zakładu, który ma już TimescaleDB z 2+ latami historii:

**Tydzień 1–2: setup infrastruktury.** Postawienie MinIO (lub konfiguracja S3 bucket) z Iceberg catalogiem ([Apache Polaris](https://polaris.apache.org/) lub [Nessie](https://projectnessie.org/)). DuckDB jako dependency w istniejącej aplikacji backend. Smoke testy: zapis testowy Iceberg, query testowy.

**Tydzień 3–4: dual-write configuration.** Wszystkie nowe pomiary trafiają zarówno do TimescaleDB jak i do Iceberg (przez tier-down job co 24h). Walidacja: codzienne porównywanie liczby rekordów i sampled checksum.

**Tydzień 5–8: backfill historii.** Job migration, który przenosi chunks starsze niż 90 dni do Iceberg. Dla naszej skali (5 lat × 60 TB raw → 6 TB compressed) — ~4 tygodnie pracy serwera w tle, bez przerwy w produkcji.

**Tydzień 9–10: query routing.** Włączenie storage tier routing w aplikacji (jeśli query timestamp poniżej 90 dni → Postgres, jeśli starszy → DuckDB+Iceberg). Feature flag per query type — dashboard real-time pierwszy, raporty miesięczne drugi, raporty roczne ostatnie.

**Tydzień 11–12: drop chunks z TimescaleDB.** Po potwierdzeniu, że Iceberg query działa, drop chunks z Postgres starsze niż 90 dni. Storage savings staje się widoczne natychmiast.

Realny czas wdrożenia dla zakładu ze świeżym TimescaleDB: **2–3 miesiące**, koszt projektu ~80–150 tys. zł (2 inżynierów + DevOps part-time). Realny ROI w storage: zwykle 12–18 miesięcy.

## Bariery — uczciwa lista

Pięć rzeczy, które warto wiedzieć przed migracją:

**1. Compaction Iceberg wymaga uwagi.** Jeśli nie skonfigurujesz daily compaction job, table się rozdrabnia (10 tys. małych plików zamiast 100 dużych), query staje się 50× wolniejsze. To nie automat. Standard: cron job z Apache Spark lub Iceberg REST API.

**2. Schema evolution to mine field.** Apache Iceberg wspiera dodawanie/usuwanie kolumn, ale niektóre operacje (zmiana typu z int na bigint, drop required column) wymagają rewrite całej tabeli. Dla 5-letniego archiwum to godziny pracy serwera. Zaplanuj schema z perspektywy 5–10 lat naprzód.

**3. Time travel kosztuje storage.** Każda transakcja Iceberg tworzy nowy snapshot. Bez polityki retention snapshots, tabela rośnie 10–20% miesięcznie bez nowych danych. Konfiguracja: `expire_snapshots` co 30 dni dla warm, 365 dni dla cold.

**4. Egress fees w S3 są zaskoczeniem.** AWS bills za każdy GB wyjęty z chmury. Dla aktywnego querying historii (np. częste raporty roczne) bill może wzrosnąć 3–5× w porównaniu do planowanego. Stąd nasze preferencje dla MinIO on-prem dla MES z dużym querying.

**5. DuckDB nie skaluje się do multi-node.** DuckDB to single-node engine. Dla MES średniej wielkości to plus (prostota), ale gdy zakład rośnie do 500 tys.+ czujników i pełnowymiarowych analytics ML, trzeba przejść na Trino/Spark/Athena. To nie blocking issue dziś, ale ważne dla 5-letniej trajektorii.

## Rekomendacje dla zakładu

Trzy konkrety:

**Po pierwsze**, 3-warstwowa architektura ma sens, gdy historia danych przekracza **1 rok** i storage cost przekroczył **100 EUR/miesiąc**. Poniżej tych progów monolityczny TimescaleDB jest prostszy i wystarczający — narzut operacyjny (compaction, schema management, dual-tier routing) przewyższa korzyści.

**Po drugie**, najprostsza ścieżka adopcji dla zakładu w 2026: zacznij od **Iceberg + MinIO on-prem** jako warm tier z DuckDB jako query engine. To pojedyncza nowa technologia plus jeden serwer (lub 3-node klastra MinIO). Hot tier (TimescaleDB) zostawiasz nietknięty. Po sześciu miesiącach możesz rozważyć cold tier z ZSTD-9 compression, jeśli storage savings są warte komplikacji.

**Po trzecie**, ten stack jest dobrym fundamentem dla integracji z [Time-series Foundation Models](/blog/time-series-foundation-models-w-mes-czy-timesfm-chronos-moirai-juz-bija-wlasny-xgboost-w-predykcji-awarii). Trening modelu predykcji awarii na 5-letniej historii wymaga dostępu do całego archiwum — Iceberg w warm/cold tier daje to natywnie, bez konieczności kopiowania danych do dedykowanej warstwy ML. DuckDB potrafi czytać Iceberg do PyTorch/numpy bez konwersji, co skraca pipeline treningu o 2–3 etapy.

Industrial data lake to nie jest moda — to **realna ekonomia storage dla MES z 5+ lat operacji**. Stack TimescaleDB + Iceberg + DuckDB dziś jest dojrzały, otwarty (Apache 2.0 i MIT), i wymaga jednego klastra MinIO plus 2–3 miesięcy projektu. ROI w storage zwykle 12–18 miesięcy, plus elastyczność architektoniczna dla integracji ML i AI w przyszłości.

---

## Źródła

- [Apache Iceberg](https://iceberg.apache.org/) — dokumentacja, spec, ekosystem
- [DuckDB](https://duckdb.org/) — silnik SQL, dokumentacja, Iceberg integration
- [Apache Polaris](https://polaris.apache.org/) — Iceberg catalog (Snowflake donation 2024)
- [Project Nessie](https://projectnessie.org/) — Iceberg catalog z git-like branching
- [MinIO](https://min.io/) — S3-compatible object storage, self-hosted
- [Iceberg v1.6 release notes](https://github.com/apache/iceberg/releases/tag/apache-iceberg-1.6.0) — rolling deletes, schema improvements
- [TimescaleDB w OmniMES](/blog/timescaledb-w-omnimes-jak-hypertables-postgresql-obsluguja-200-mln-pomiarow-dziennie) — fundament hot tier
- [CBAM dla eksporterów](/blog/cbam-dla-eksporterow-stali-aluminium-cementu-pierwszy-raport-1-sierpnia-2026-co-mes-ems-musi-liczyc) — wymagania compliance dla retention historii
- [DPP / Battery Regulation 2027](/blog/digital-product-passport-dpp-wchodzi-do-fabryki-espr-i-battery-regulation-2027-co-mes-musi-umiec-do-lutego) — retention 10 lat dla DPP danych baterii
- [NIS2 i KSC2](/blog/nis2-i-ksc2-w-2026-jak-mes-staje-sie-elementem-cyber-compliance-polskiej-fabryki) — wymagania na audit log retention
- [Time-series Foundation Models](/blog/time-series-foundation-models-w-mes-czy-timesfm-chronos-moirai-juz-bija-wlasny-xgboost-w-predykcji-awarii) — następny krok analityczny na 5-letnich danych
