---
title: 'Tworzenie wykresów na dashboardach Redash przez Query Results z asystentem AI'
status: 'published'
author:
  name: 'OmniMES'
  picture: 'https://avatars.githubusercontent.com/u/166378457?v=4'
slug: 'tworzenie-wykresow-redash-z-asystentem-ai-w-omnimes'
description: 'OmniMES dostał nowy moduł, który pozwala użytkownikom budować wykresy analityczne bezpośrednio z poziomu aplikacji — bez ręcznego klikania w Redash i bez znajomości SQL. Asystent AI generuje SQL, dobiera typ wykresu i publikuje widget na dashboardzie jednym kliknięciem.'
coverImage: '/images/news-redash-ai/cover-pl.png'
lang: 'pl'
publishedAt: '2026-05-22T09:00:00.000Z'
---

OmniMES dostał nowy moduł, który pozwala użytkownikom budować wykresy analityczne **bezpośrednio z poziomu aplikacji** — bez ręcznego klikania w Redash i bez znajomości SQL. Całość opiera się o trzy elementy: bazowe zapytania JSON, edytor Query Results z silnikiem SQL Redasha oraz asystenta AI, który pomaga na każdym etapie procesu.

<video controls width="100%" preload="metadata" poster="/images/news-redash-ai/cover-pl.png">
  <source src="/videos/qr-ai-pl.mp4" type="video/mp4" />
  Twoja przeglądarka nie obsługuje odtwarzania wideo HTML5.
</video>

## Skąd się wzięła ta funkcjonalność

Do tej pory droga od „chcę zobaczyć wykres pokazujący zużycie energii per maszyna" do działającego widgetu na dashboardzie wymagała:

- ręcznego utworzenia bazowego zapytania w OmniMES,
- przejścia do Redasha,
- napisania SQL-a łączącego wyniki,
- skonfigurowania wizualizacji (typ wykresu, osie X/Y, kolory, agregacje),
- dodania widgetu do właściwego dashboardu.

Każdy z tych kroków był odrębnym, wolnym i błędogennym etapem. Nowy moduł scala je w jeden płynny przepływ realizowany **całkowicie w interfejsie OmniMES**.

## Jak to działa — krok po kroku

### 1. Bazowe zapytanie JSON (źródło danych)

Użytkownik definiuje co i z jakiego okresu chce pobierać z systemu (maszyny, typy zdarzeń, zakres czasowy, agregacje). Kreator generuje konfigurację w postaci URL do API OmniMES, który Redash odpyta przy każdym uruchomieniu zapytania. Tak powstaje **rzetelne, sparametryzowane źródło danych** — gotowe do reużycia.

### 2. Query Results (łączenie i transformacja danych)

Drugi typ zapytania pozwala **napisać SQL nad wynikami bazowych zapytań JSON** — agregować, filtrować, łączyć kilka źródeł po `name_machine`. Edytor SQL oferuje:

- automatyczne podpowiedzi i podświetlanie składni,
- kolumny dostępne z bazowych zapytań jednym kliknięciem wstawiane do SQL-a,
- skróty do typowych konstrukcji (WHERE, GROUP BY, JOIN, COUNT, SUM, CASE WHEN),
- generator szkieletu SQL przy wyborze wielu źródeł,
- walidator wykrywający starą składnię Redash v10 i jednym klikiem migrujący ją do v26 z propagacją parametrów dashboardu,
- przycisk **Sprawdź wykonanie**, który uruchamia zapytanie w Redashu z domyślnym zakresem 30 dni i pokazuje wyniki w tabeli — bez wychodzenia z OmniMES.

### 3. Asystent AI — trzy tryby pomocy

W formularzu Query Results dostępne są trzy przyciski oparte o AI (LLM skonfigurowany w ustawieniach OmniMES):

- **Zbuduj zapytanie** — opisujesz po polsku co chcesz uzyskać („pokaż top 10 maszyn z najwyższym zużyciem energii w ostatnim tygodniu"), AI generuje gotowy SQL dostosowany do kolumn wybranych bazowych zapytań.
- **Zaproponuj zapytania SQL** — AI samodzielnie proponuje kilka sensownych zapytań na podstawie struktury wybranych źródeł danych. Klikasz, wybierasz, gotowe.
- **Stwórz wykres** — najważniejsza nowość. AI analizuje SQL i kolumny wyjściowe, **proponuje optymalny typ wykresu** (słupkowy, liniowy, kołowy, scatter, heatmap), dobiera osie X/Y, agregacje, opcje sortowania i etykiety. Użytkownik może edytować proponowany tytuł, wybrać docelowy dashboard z listy lub utworzyć nowy — i jednym przyciskiem **publikuje wizualizację w Redashu wraz z widgetem na dashboardzie**.

### 4. Propagacja parametrów dashboardu

Stworzone widgety automatycznie są **podłączone do globalnego pickera dat dashboardu** — zmiana zakresu czasowego w pickerze propaguje się do wszystkich zapytań, łącznie z bazowymi JSON-ami. Użytkownik dostaje spójny, interaktywny pulpit bez konieczności ręcznej konfiguracji `parameterMappings`.

## Co to znaczy w praktyce

- **Czas tworzenia dashboardu skraca się z godzin do minut.** Operator produkcji, technolog czy kierownik wydziału — każdy może samodzielnie zbudować wykres analizujący dane produkcyjne, energetyczne czy jakościowe.
- **Niezbędna jest tylko wiedza domenowa.** AI obsługuje konwersję opisu na SQL i decyzję o typie wizualizacji.
- **Wszystko zostaje w ekosystemie OmniMES + Redash.** Stworzone wykresy są pełnoprawnymi obiektami w Redashu — można je dalej edytować, kopiować, osadzać w iframe, alarmować.
- **AI działa lokalnie lub zdalnie.** OmniMES wspiera zarówno własny Ollama (modele uruchamiane on-premise), jak i OpenAI-compatible API — wybór zależy od polityki prywatności danych klienta.

## Dla kogo

- **Operatorzy i kierownicy zmianowi** — szybkie ad-hoc analizy bez czekania na dział IT.
- **Technolodzy i inżynierowie procesu** — eksploracja danych historycznych i porównania efektywności.
- **Audytorzy energetyczni (OmniEnergy)** — budowa raportów zużycia, baselineów i wskaźników EnPI bez interwencji programisty.
- **Zarządy** — ścieżka od „potrzebuję to widzieć" do „widzę to" liczona w minutach.

## Podsumowanie

Nowa funkcjonalność OmniMES wprowadza **demokratyzację analityki produkcyjnej** — każdy użytkownik z dostępem do systemu może stworzyć wartościowy wykres na podstawie realnych danych, korzystając z asystenta AI jako tłumacza między językiem biznesowym a językiem SQL i wizualizacji. To kolejny krok w kierunku **MES, który myśli razem z użytkownikiem** — a nie tylko zbiera dane.
