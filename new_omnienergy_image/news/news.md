# Tworzenie wykresow na dashboardach Redash przez Query Results z asystentem AI

OmniMES dostal nowy modul, ktory pozwala uzytkownikom budowac wykresy analityczne **bezposrednio z poziomu aplikacji** — bez recznego klikania w Redash i bez znajomosci SQL. Calosc opiera sie o trzy elementy: bazowe zapytania JSON, edytor Query Results z silnikiem SQL Redasha oraz asystenta AI, ktory pomaga na kazdym etapie procesu.

## Skad sie wziela ta funkcjonalnosc

Do tej pory droga od "chce zobaczyc wykres pokazujacy zuzycie energii per maszyna" do dzialajacego widgetu na dashboardzie wymagala:

- recznego utworzenia bazowego zapytania w OmniMES,
- przejscia do Redasha,
- napisania SQL-a laczacego wyniki,
- skonfigurowania wizualizacji (typ wykresu, osie X/Y, kolory, agregacje),
- dodania widgetu do wlasciwego dashboardu.

Kazdy z tych krokow byl odrebnym, wolnym i bledogenerujacym etapem. Nowy modul scala je w jeden plynny przeplyw realizowany **calkowicie w interfejsie OmniMES**.

## Jak to dziala — krok po kroku

### 1. Bazowe zapytanie JSON (zrodlo danych)

Uzytkownik definiuje co i z jakiego okresu chce pobierac z systemu (maszyny, typy zdarzen, zakres czasowy, agregacje). Kreator generuje konfiguracje w postaci URL do API OmniMES, ktory Redash odpyta przy kazdym uruchomieniu zapytania. Tak powstaje **rzetelne, sparametryzowane zrodlo danych** — gotowe do reuzycia.

### 2. Query Results (laczenie i transformacja danych)

Drugi typ zapytania pozwala **napisac SQL nad wynikami bazowych zapytan JSON** — agregowac, filtrowac, laczyc kilka zrodel po `name_machine`. Edytor SQL oferuje:

- automatyczne podpowiedzi i podswietlanie skladni,
- kolumny dostepne z bazowych zapytan jednym klikniciem wstawiane do SQL-a,
- skroty do typowych konstrukcji (WHERE, GROUP BY, JOIN, COUNT, SUM, CASE WHEN),
- generator szkieletu SQL przy wyborze wielu zrodel,
- walidator wykrywajacy stara skladnie Redash v10 i jednym klikiem migrujacy ja do v26 z propagacja parametrow dashboardu,
- przycisk **Sprawdz wykonanie**, ktory uruchamia zapytanie w Redashu z domyslnym zakresem 30 dni i pokazuje wyniki w tabeli — bez wychodzenia z OmniMES.

### 3. Asystent AI — trzy tryby pomocy

W formularzu Query Results dostepne sa trzy przyciski oparte o AI (LLM skonfigurowany w ustawieniach OmniMES):

- **Zbuduj zapytanie** — opisujesz po polsku co chcesz uzyskac ("pokaz top 10 maszyn z najwyzszym zuzyciem energii w ostatnim tygodniu"), AI generuje gotowy SQL dostosowany do kolumn wybranych bazowych zapytan.
- **Zaproponuj zapytania SQL** — AI samodzielnie proponuje kilka sensownych zapytan na podstawie struktury wybranych zrodel danych. Klikasz, wybierasz, gotowe.
- **Stworz wykres** — najwazniejsza nowosc. AI analizuje SQL i kolumny wyjsciowe, **proponuje optymalny typ wykresu** (slupkowy, liniowy, kolowy, scatter, heatmap), dobiera osie X/Y, agregacje, opcje sortowania i etykiety. Uzytkownik moze edytowac proponowany tytul, wybrac docelowy dashboard z listy lub utworzyc nowy — i jednym przyciskiem **publikuje wizualizacje w Redashu wraz z widgetem na dashboardzie**.

### 4. Propagacja parametrow dashboardu

Stworzone widgety automatycznie sa **podlaczone do globalnego pickera dat dashboardu** — zmiana zakresu czasowego w pickerze propaguje sie do wszystkich zapytan, lacznie z bazowymi JSON-ami. Uzytkownik dostaje spojny, interaktywny pulpit bez koniecznosci recznej konfiguracji `parameterMappings`.

## Co to znaczy w praktyce

- **Czas tworzenia dashboardu skraca sie z godzin do minut.** Operator produkcji, technolog czy kierownik wydzialu — kazdy moze samodzielnie zbudowac wykres analizujacy dane produkcyjne, energetyczne czy jakosciowe.
- **Niezbedna jest tylko wiedza domenowa.** AI obsluguje konwersje opisu w SQL i decyzje o typie wizualizacji.
- **Wszystko zostaje w ekosystemie OmniMES + Redash.** Stworzone wykresy sa pelnoprawnymi obiektami w Redashu — mozna je dalej edytowac, kopiowac, osadzac w iframe, alarmowac.
- **AI dziala lokalnie lub zdalnie.** OmniMES wspiera zarowno wlasny Ollama (modele uruchamiane on-premise), jak i OpenAI-compatible API — wybor zalezy od polityki prywatnosci danych klienta.

## Dla kogo

- **Operatorzy i kierownicy zmianowi** — szybkie ad-hoc analizy bez czekania na dzial IT.
- **Technolodzy i inzynierowie procesu** — eksploracja danych historycznych i porownania efektywnosci.
- **Audytorzy energetyczni (OmniEnergy)** — budowa raportow zuzycia, baselineow i wskaznikow EnPI bez interwencji programisty.
- **Zarzady** — sciezka od "potrzebuje to widziec" do "widze to" liczona w minutach.

## Podsumowanie

Nowa funkcjonalnosc OmniMES wprowadza **demokratyzacje analityki produkcyjnej** — kazdy uzytkownik z dostepem do systemu moze stworzyc wartosciowy wykres na podstawie realnych danych, korzystajac z asystenta AI jako tlumacza miedzy jezykiem biznesowym a jezykiem SQL i wizualizacji. To kolejny krok w kierunku **MES, ktory mysli razem z uzytkownikiem** — a nie tylko zbiera dane.
