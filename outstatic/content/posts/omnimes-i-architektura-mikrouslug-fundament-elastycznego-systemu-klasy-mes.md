---
title: 'OmniMES i architektura mikrousług – fundament elastycznego systemu klasy MES'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/1645307189660-U0NT.jpeg'
slug: 'omnimes-i-architektura-mikrouslug-fundament-elastycznego-systemu-klasy-mes'
description: 'OmniMES to nowoczesny system klasy MES (Manufacturing Execution System) zaprojektowany w oparciu o architekturę mikrousługową. Taki model zapewnia skalowalność, elastyczność oraz możliwość niezależnego rozwoju i wdrażania poszczególnych modułów systemu – od komunikacji z maszynami po analitykę danych i zarządzanie produkcją.'
coverImage: '/images/microservices-vs-monolit-AwNz.png'
lang: 'pl'
tags: [{"value":"omniMES","label":"OmniMES"},{"label":"docker","value":"docker"},{"label":"Micro Services","value":"microServices"}]
publishedAt: '2025-10-06T19:45:59.559Z'
---

\
OmniMES to nowoczesny system klasy **MES (Manufacturing Execution System)** zaprojektowany w oparciu o **architekturę mikrousługową**. Taki model zapewnia skalowalność, elastyczność oraz możliwość niezależnego rozwoju i wdrażania poszczególnych modułów systemu – od komunikacji z maszynami po analitykę danych i zarządzanie produkcją.

---

### 1. Czym są mikrousługi

Architektura mikrousługowa polega na **podziale aplikacji na niezależne komponenty (usługi)**, z których każda odpowiada za konkretną funkcję biznesową.\
Każda mikrousługa:

- działa jako **oddzielny proces** (np. kontener Docker),

- komunikuje się z innymi usługami poprzez **API REST lub MQTT/Sparkplug B**,

- może być wdrażana, skalowana i aktualizowana niezależnie od pozostałych.

W przeciwieństwie do architektury monolitycznej, mikrousługi minimalizują ryzyko awarii całego systemu oraz pozwalają na szybsze wprowadzanie zmian.

---

### 2. Jak OmniMES wykorzystuje mikrousługi

System OmniMES składa się z zestawu odrębnych usług uruchamianych w środowisku kontenerowym **Docker Compose** lub w chmurze (np. DigitalOcean, OVH).\
Przykładowa struktura mikrousług w OmniMES:

| Mikrousługa | Opis | Technologia |
| --- | --- | --- |
| **api** | Centralne REST API oparte na Django REST Framework – zarządzanie użytkownikami, danymi produkcyjnymi, integracjami ERP | Python / Django |
| **stream** | Odbiór danych z maszyn przemysłowych przez MQTT Sparkplug B i zapis do bazy danych | Node.js |
| **simulate** | Symulacja pracy maszyn i generowanie testowych danych produkcyjnych | Node.js / Python |
| **redash** | Analiza i wizualizacja danych produkcyjnych | Python / Flask |
| **mqtt-broker (EMQX)** | Centralny broker komunikacyjny dla urządzeń IIoT | Erlang |
| **nginx** | Serwer webowy  | Server nginx |
| **nginx-proxy** | Reverse proxy i load balancer dla usług HTTPS | Nginx |
| **certbot / ssl** | Automatyczne zarządzanie certyfikatami Let's Encrypt | Python |
| **faiss-index** | Wektoryzacja dokumentacji i obsługa zapytań AI (RAG) | Python / LangChain |

Każda z tych mikrousług pełni ściśle określoną rolę, ale wszystkie współdziałają w spójnym ekosystemie za pośrednictwem wspólnych interfejsów API i kolejek komunikacyjnych.

---

### 3. Zalety architektury mikrousługowej w OmniMES

**1. Skalowalność**\
Każda usługa może być uruchomiona w wielu instancjach – np. zwiększenie mocy obliczeniowej tylko dla `stream`, gdy rośnie liczba sygnałów z maszyn.

**2. Niezależność aktualizacji**\
Aktualizacja `api` lub `simulate` nie wymaga restartu całego systemu – minimalizuje to przestoje.

**3. Odporność na awarie**\
Awaria jednej mikrousługi (np. `grafana`) nie zatrzymuje pracy pozostałych.

**4. Łatwość wdrażania i automatyzacji**\
Dzięki Dockerowi i integracji z systemami CI/CD, wdrożenie nowej wersji usługi jest szybkie i powtarzalne.

**5. Możliwość indywidualnego skalowania i rozwoju**\
Poszczególne mikrousługi mogą być rozwijane przez różne zespoły programistyczne, w różnych technologiach (Python, Node.js, Go), bez wpływu na resztę systemu.

---

### 4. Przykładowy przepływ danych

1. Maszyna wysyła dane w formacie **MQTT Sparkplug B** do brokera EMQX.

2. Mikrousługa `stream` dekoduje wiadomości, analizuje częstotliwość i zapisuje dane do MongoDB lub PostgreSQL.

3. `api` udostępnia dane w postaci REST API dla aplikacji webowych.

4. `redash`  prezentuje dane w postaci raportów i wykresów.

5. `faiss-index` pozwala botowi AI odpowiadać na pytania użytkowników na podstawie dokumentacji systemu (moduł RAG).

---

### 5. Wdrożenie i zarządzanie

OmniMES może działać zarówno:

- **lokalnie (on-premise)** – w zakładzie produkcyjnym z lokalnym serwerem,

- **w chmurze (SaaS)** – na dropletach DigitalOcean lub VPS-ach OVH.

Zarządzanie mikrousługami odbywa się przez:

- **Docker Compose** (środowiska testowe),

- **Docker Swarm / Kubernetes** (środowiska produkcyjne z automatycznym skalowaniem i monitoringiem).

---

### 6. Podsumowanie

Architektura mikrousługowa stanowi serce OmniMES – to dzięki niej system jest:

- **modułowy**,

- **skalowalny**,

- **bezpieczny**,

- **łatwy w integracji z ERP, SCADA i systemami AI**.

Dzięki temu OmniMES nie jest jedynie oprogramowaniem do monitorowania produkcji, ale kompletną platformą **IIoT + MES + AI**, zdolną do adaptacji w dowolnym środowisku przemysłowym.