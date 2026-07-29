export type ChangeCategory = "added" | "changed" | "fixed" | "security"

export type ChangelogEntry = {
  category: ChangeCategory
  scope: string
  body: string
}

export type Release = {
  version: string
  date: string
  entries: ChangelogEntry[]
}

export type UpcomingFeature = {
  scope: string
  body: string
  eta?: string
}

export const roadmap: Record<"pl" | "en", UpcomingFeature[]> = {
  pl: [
    {
      scope: "Konektor do systemów ERP",
      body: "Dwukierunkowa integracja OmniMES z systemami ERP — zlecenia produkcyjne, indeksy wyrobów i meldunki zwrotne (wykonanie, braki, zużycie surowca) wymieniane automatycznie, bez ręcznego przepisywania danych między ERP a halą produkcyjną. Cel: jedno źródło prawdy o produkcji — plan z ERP trafia na maszyny, a realizacja z hali wraca do ERP w czasie zbliżonym do rzeczywistego.",
    },
    {
      scope: "Uniwersalne wtyczki OmniMES — w tym sterowanie maszynami po MQTT",
      body: "Otwarty mechanizm wtyczek pozwalający rozszerzać OmniMES o własne integracje i funkcje, wraz ze sterowaniem maszynami bezpośrednio po MQTT. Cel: dać mniejszym i średnim przedsiębiorstwom lekką i tanią drogę do dwukierunkowej komunikacji z parkiem maszynowym — nie tylko odczyt stanu, ale i wysyłanie poleceń — bez kosztownej warstwy pośredniej i bez wymiany istniejącej automatyki.",
    },
  ],
  en: [
    {
      scope: "ERP systems connector",
      body: "Two-way integration between OmniMES and ERP systems — production orders, product indexes and feedback reports (output, scrap, material consumption) exchanged automatically, without rekeying data by hand between the ERP and the shop floor. The goal: a single source of truth about production — the plan flows from the ERP to the machines, and execution flows from the floor back to the ERP in near real time.",
    },
    {
      scope: "Universal OmniMES plugins — including machine control over MQTT",
      body: "An open plugin mechanism to extend OmniMES with custom integrations and features, including controlling machines directly over MQTT. The goal: give small and medium enterprises a lightweight, low-cost path to two-way communication with their machine park — not just reading state, but sending commands — without an expensive middleware layer and without replacing existing automation.",
    },
  ],
}

export const changelog: Record<"pl" | "en", Release[]> = {
  pl: [
    {
      version: "4.4.0",
      date: "2026-07-29",
      entries: [
        {
          category: "added",
          scope: "Monitoring — własna kolejność kafelków",
          body: "Kafelki maszyn można ułożyć w dowolnej kolejności w obrębie linii, zamiast wyłącznie alfabetycznie. Ustawienie jest wspólne dla wszystkich użytkowników i zapamiętywane, a wybór sposobu sortowania (A–Z, Z–A, własna) zostaje przy kolejnym wejściu na ekran.",
        },
        {
          category: "added",
          scope: "Monitoring — własna nazwa podstatusu dla pojedynczej maszyny",
          body: "Nazwę wyświetlaną pod kafelkiem można nadpisać dla jednej maszyny bez zmieniania profilu wspólnego dla wszystkich. Wcześniej jedyną drogą było duplikowanie całego profilu.",
        },
        {
          category: "added",
          scope: "OmniEnergy — ręczne wartości WEE za konkretny okres",
          body: "Jeśli licznik lub mianownik wskaźnika nie pochodzi z pomiaru (np. liczba wyprodukowanych sztuk z raportu zmianowego), można podać wartość dla danej migawki, a nie jedną stałą dla wszystkich okresów. Do tej pory ta sama liczba trafiała do każdego okresu, przez co trend potrafił pokazywać odwrotny kierunek niż rzeczywisty.",
        },
        {
          category: "added",
          scope: "OmniEnergy — automatyzacja czekająca na dane",
          body: "Harmonogram może utworzyć migawkę i oznaczyć ją jako oczekującą na wartość, zamiast podstawiać stałą z konfiguracji. Lista migawek pokazuje, ile okresów czeka na uzupełnienie, a wartość można wpisać wprost z listy.",
        },
        {
          category: "added",
          scope: "OmniEnergy — porównywarka okien czasowych ZWE",
          body: "Zestawienie zużycia per maszyna dla wielu wybranych okresów naraz, ze zmianą względem poprzedniego okresu i podsumowaniem od pierwszego do ostatniego. Porównanie okresów o wyraźnie różnej długości jest blokowane, bo dawałoby mylące wyniki.",
        },
        {
          category: "added",
          scope: "Konfigurator statusów — filtr tematu przy wykrywaniu sygnałów",
          body: "Przy automatycznym wykrywaniu sygnałów można zawęzić nasłuch do wybranego tematu MQTT, zamiast przeglądać wszystko, co nadaje broker.",
        },
        {
          category: "changed",
          scope: "Konfigurator statusów — jednolity zapis przyciskiem",
          body: "Profile statusów i lista statusów zapisują się dopiero po kliknięciu „Zapisz”, a nie po każdym opuszczeniu pola. Zmienione wiersze są oznaczane, a zamknięcie okna z niezapisanymi zmianami wymaga potwierdzenia.",
        },
        {
          category: "changed",
          scope: "OmniEnergy — czytelniejsza konfiguracja EnLB",
          body: "Wartość bazowa i wskaźnik dla maszyn są rozdzielone ramkami; pola wartości ręcznych opisane są jednostką z definicji wskaźnika zamiast określeniami „licznik” i „mianownik”.",
        },
        {
          category: "changed",
          scope: "OmniEnergy — ślad audytowy wartości ręcznych",
          body: "Przy każdej wartości podanej ręcznie zapisywane jest, kto i kiedy ją wprowadził. Wartości ręcznych nie da się odtworzyć z pomiarów, więc przy przeglądzie ISO 50001 muszą być identyfikowalne.",
        },
        {
          category: "fixed",
          scope: "Monitoring — brakujące maszyny na liście",
          body: "Ekran pokazywał maksymalnie 30 maszyn na linię; przy większej liczbie część kafelków była niewidoczna bez żadnego ostrzeżenia. Teraz zawsze wyświetlane są wszystkie maszyny z linii.",
        },
        {
          category: "fixed",
          scope: "Konfigurator statusów — limit wykrywanych sygnałów",
          body: "Ustawiony limit był ignorowany i wykrywanie potrafiło zebrać wielokrotnie więcej sygnałów, niż wskazano. Poprawiono też filtry, w których pusta reguła przepuszczała lub blokowała wszystko.",
        },
        {
          category: "fixed",
          scope: "Profile statusów — wartości ułamkowe prędkościomierza",
          body: "Maksymalna wartość zakresu była po cichu zaokrąglana do liczby całkowitej. Kolumna w bazie została doprowadzona do zgodności z modelem, wraz z brakującymi kolumnami raportów.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy — zafałszowane wykresy i wskaźniki",
          body: "Migawki bez kompletu danych trafiały na wykres jako zero, tworząc pozorny spadek; mianownik równy zero dawał wskaźnik równy surowej energii bez żadnego ostrzeżenia. Migawki niekompletne są teraz pomijane na wykresie i blokowane w audytach oraz raportach.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy — wybór godziny w harmonogramie",
          body: "Pole „Następne wykonanie” korzystało z kontrolki przeglądarki, w której w Firefoksie nie dało się wybrać godziny. Wszystkie pola dat w harmonogramie używają teraz tego samego komponentu co reszta systemu.",
        },
        {
          category: "fixed",
          scope: "Konfiguracja — jednostka parametru",
          body: "Po wyborze parametru jednostka uzupełnia się automatycznie, z możliwością ręcznej zmiany.",
        },
      ],
    },
    {
      version: "4.3.0",
      date: "2026-07-23",
      entries: [
        {
          category: "added",
          scope: "MCP (Model Context Protocol) — OmniMES sterowany z dowolnego asystenta AI",
          body: "Dostępne po instalacji: OmniMES wystawia standardowy endpoint MCP na serwerze fabryki. W dowolnym asystencie AI wspierającym MCP (Claude Desktop, ChatGPT, Cursor, Copilot) instalujesz wtyczkę „OmniMES”, wklejasz token dostępu do serwera i gotowe. Z dowolnego komputera w sieci firmowej, w języku naturalnym, budujesz kompletne dashboardy i raporty, konfigurujesz strukturę parku, statusy maszyn, alarmy i harmonogramy, odczytujesz bieżący stan produkcji oraz źródła i punkty pomiarowe OmniEnergy — bez znajomości interfejsu i bez pisania SQL. Przykład z praktyki: jednym poleceniem „zbuduj dashboard z dostępnością, awaryjnością i kosztem energii na sztukę dla parku maszynowego” asystent tworzy kilkanaście zapytań SQL, wizualizacji i gotowy pulpit w Redashu. Model dobierasz świadomie: komercyjny (Claude, GPT, Gemini) — gdy zależy na jakości; darmowy przez OpenRouter (Llama, Qwen, DeepSeek) — gdy zależy na kosztach; lokalny (Ollama, LM Studio) — gdy dane muszą zostać w sieci fabrycznej.",
        },
      ],
    },
    {
      version: "4.2.1",
      date: "2026-07-10",
      entries: [
        {
          category: "changed",
          scope: "Monitoring",
          body: "Liczniki (wskaźniki) układają się teraz obok siebie i zawijają automatycznie zależnie od szerokości karty maszyny. Przy ustawieniu „1 maszyna w wierszu” (szeroka karta) mieści się ich wiele w jednym rzędzie, przy większej liczbie maszyn w wierszu zawijają się same.",
        },
        {
          category: "fixed",
          scope: "Monitoring",
          body: "Usunięto narastające zużycie pamięci i procesora przy przełączaniu serwera / linii / sortowania (poprzednie połączenia z brokerem nie były zamykane). Ekran monitoringu może być teraz otwarty przez długi czas bez zawieszania przeglądarki, także przy dużej liczbie maszyn.",
        },
        {
          category: "security",
          scope: "Monitoring i stream",
          body: "Odporność na błędny zegar bramki lub sterownika PLC. Czas „z przyszłości” (np. +1 h po zmianie czasu letniego lub zła strefa) jest odrzucany na rzecz czasu serwera, więc nie zafałszowuje archiwum ani wyświetlanego stanu maszyny.",
        },
      ],
    },
    {
      version: "4.2.0",
      date: "2026-07-09",
      entries: [
        {
          category: "added",
          scope: "Klasyfikacja stanu pracy maszyny na podstawie pomiaru",
          body: "Zamiast polegać wyłącznie na sygnałach cyfrowych ze sterownika, stan pracy maszyny (praca / praca jałowa / przezbrojenie / postój) można teraz wyznaczać z progu dowolnego pomiaru analogowego — prądu silnika, ciśnienia hydrauliki, obrotów wrzeciona. Przykład: prąd silnika > 12 A → maszyna pracuje; 3–12 A → praca jałowa; < 3 A → wyłączona. Progi konfiguruje się w konfiguratorze statusów, klasyfikacja działa na żywo w Monitoringu i jest zapisywana w historii, dzięki czemu OEE, MTBF i raporty produkcyjne uwzględniają faktyczny stan maszyny bez potrzeby doprowadzania dodatkowych sygnałów binarnych z PLC.",
        },
      ],
    },
    {
      version: "4.1.0",
      date: "2026-07-08",
      entries: [
        {
          category: "changed",
          scope: "Silnik danych: PostgreSQL + TimescaleDB",
          body: "Zamiast MongoDB — szybsze zapytania i wyraźnie mniejsze zużycie miejsca dla telemetrii, przy zachowaniu dotychczasowej funkcjonalności. Przykład: rok telemetrii z ~150 maszyn zajmował w MongoDB ok. 80 GB, po migracji do PostgreSQL + TimescaleDB (z kompresją hypertables) — ok. 7 GB. To ~10× mniej miejsca przy identycznej ilości danych źródłowych i szybszych zapytaniach na oknach czasowych.",
        },
        {
          category: "added",
          scope: "Bezpośrednia obsługa MQTT (obok Sparkplug B)",
          body: "Stream OmniMES może teraz przyjmować pomiary bezpośrednio z topików MQTT — nie tylko z ramek Sparkplug B. Ułatwia to integrację ze sterownikami, bramkami IIoT i urządzeniami publikującymi dane w formacie natywnym (JSON lub prosty payload), bez konieczności dokładania warstwy Sparkplug po stronie źródła.",
        },
        {
          category: "fixed",
          scope: "Monitoring",
          body: "Poprawne przypisywanie statusów po temacie MQTT oraz tagu; naprawiono błędne dopasowania i pobieranie ostatnich zdarzeń.",
        },
      ],
    },
    {
      version: "4.0.0",
      date: "2026-06-17",
      entries: [
        {
          category: "changed",
          scope: "Nowy interfejs użytkownika: Vue 3 + PrimeVue v4 (motyw Sakai)",
          body: "Powiadomienia w formie Toast oraz zapamiętywanie stanu widoków lokalnie w przeglądarce.",
        },
      ],
    },
  ],
  en: [
    {
      version: "4.4.0",
      date: "2026-07-29",
      entries: [
        {
          category: "added",
          scope: "Monitoring — custom tile order",
          body: "Machine tiles can be arranged in any order within a line instead of alphabetically only. The setting is shared by all users and persisted, and the chosen sort mode (A–Z, Z–A, custom) is remembered between visits.",
        },
        {
          category: "added",
          scope: "Monitoring — per-machine sub-status name",
          body: "The name shown under a tile can be overridden for a single machine without changing the profile shared by all of them. Previously the only way was to duplicate the whole profile.",
        },
        {
          category: "added",
          scope: "OmniEnergy — manual EnPI values for a specific period",
          body: "When the numerator or denominator does not come from a measurement (for example the number of units produced, taken from a shift report), the value can be entered for a given snapshot instead of a single constant used for every period. Until now the same figure was applied to every period, which could make the trend point in the opposite direction to reality.",
        },
        {
          category: "added",
          scope: "OmniEnergy — automation that waits for data",
          body: "A schedule can create a snapshot and mark it as awaiting a value instead of substituting the constant from the configuration. The snapshot list shows how many periods await completion, and the value can be entered directly from the list.",
        },
        {
          category: "added",
          scope: "OmniEnergy — SEU time window comparison",
          body: "Per-machine consumption compared across several selected periods at once, with the change versus the previous period and a summary from the first to the last one. Comparing periods of clearly different length is blocked because the result would be misleading.",
        },
        {
          category: "added",
          scope: "Status configurator — topic filter during signal discovery",
          body: "Automatic signal discovery can be narrowed to a selected MQTT topic instead of scanning everything the broker publishes.",
        },
        {
          category: "changed",
          scope: "Status configurator — consistent save button",
          body: "Status profiles and the status list are now saved only after clicking “Save”, not on every field exit. Changed rows are highlighted and closing the dialog with unsaved changes requires confirmation.",
        },
        {
          category: "changed",
          scope: "OmniEnergy — clearer EnB configuration",
          body: "The baseline value and the per-machine indicator are separated into framed sections; manual value fields are labelled with the unit from the indicator definition instead of “numerator” and “denominator”.",
        },
        {
          category: "changed",
          scope: "OmniEnergy — audit trail for manual values",
          body: "Every manually entered value records who entered it and when. Manual values cannot be reconstructed from measurements, so they must be traceable during an ISO 50001 review.",
        },
        {
          category: "fixed",
          scope: "Monitoring — missing machines in the list",
          body: "The screen displayed at most 30 machines per line; with more than that some tiles were invisible without any warning. All machines of a line are now always shown.",
        },
        {
          category: "fixed",
          scope: "Status configurator — signal discovery limit",
          body: "The configured limit was ignored and discovery could collect many times more signals than requested. Filters were also fixed, where an empty rule let everything through or blocked everything.",
        },
        {
          category: "fixed",
          scope: "Status profiles — fractional speedometer values",
          body: "The maximum range value was silently rounded to an integer. The database column was brought in line with the model, together with missing report columns.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy — distorted charts and indicators",
          body: "Snapshots without complete data were plotted as zero, creating an apparent drop; a denominator of zero produced an indicator equal to the raw energy with no warning. Incomplete snapshots are now skipped on the chart and blocked in audits and reports.",
        },
        {
          category: "fixed",
          scope: "OmniEnergy — time selection in the schedule",
          body: "The “Next run” field used a browser control in which Firefox offered no way to pick the time. All date fields in the schedule now use the same component as the rest of the system.",
        },
        {
          category: "fixed",
          scope: "Configuration — parameter unit",
          body: "After choosing a parameter the unit is filled in automatically, with manual override still possible.",
        },
      ],
    },
    {
      version: "4.3.0",
      date: "2026-07-23",
      entries: [
        {
          category: "added",
          scope: "MCP (Model Context Protocol) — control OmniMES from any AI assistant",
          body: "Available right after installation: OmniMES exposes a standard MCP endpoint on the factory server. In any MCP-capable AI assistant (Claude Desktop, ChatGPT, Cursor, Copilot) you install the „OmniMES” plugin, paste an access token to your server, and you're done. From any computer on the company network, in natural language, you build complete dashboards and reports, configure the plant structure, machine statuses, alarms and schedules, and read the live production state as well as OmniEnergy measurement sources and points — without knowing the UI and without writing SQL. A real-world example: a single instruction „build a dashboard with availability, failure rate and energy cost per unit for the machine park” has the assistant create a dozen SQL queries, visualizations and a finished Redash dashboard. Choose the model deliberately: commercial (Claude, GPT, Gemini) — when quality matters; free via OpenRouter (Llama, Qwen, DeepSeek) — when cost matters; local (Ollama, LM Studio) — when data must stay inside the factory network.",
        },
      ],
    },
    {
      version: "4.2.1",
      date: "2026-07-10",
      entries: [
        {
          category: "changed",
          scope: "Monitoring",
          body: "Counters (indicators) now line up next to each other and wrap automatically depending on the width of the machine card. With the “1 machine per row” setting (wide card) many fit in a single row; with more machines per row they wrap on their own.",
        },
        {
          category: "fixed",
          scope: "Monitoring",
          body: "Eliminated the growing memory and CPU usage when switching server / line / sorting (previous broker connections were not being closed). The monitoring screen can now stay open for extended periods without hanging the browser, even with a large number of machines.",
        },
        {
          category: "security",
          scope: "Monitoring and stream",
          body: "Resilience against a wrong clock on the gateway or PLC. Timestamps “from the future” (e.g. +1h after a DST change or a wrong timezone) are rejected in favor of the server time, so they cannot corrupt the archive or the displayed machine state.",
        },
      ],
    },
    {
      version: "4.2.0",
      date: "2026-07-09",
      entries: [
        {
          category: "added",
          scope: "Machine state classification based on measurement",
          body: "Instead of relying solely on digital signals from the controller, the machine's working state (running / idle / changeover / stopped) can now be derived from a threshold on any analog measurement — motor current, hydraulic pressure, spindle RPM. Example: motor current > 12 A → machine running; 3–12 A → idle; < 3 A → stopped. Thresholds are defined in the status configurator; classification runs live in Monitoring and is persisted in history, so OEE, MTBF and production reports reflect the real machine state without wiring additional binary signals from the PLC.",
        },
      ],
    },
    {
      version: "4.1.0",
      date: "2026-07-08",
      entries: [
        {
          category: "changed",
          scope: "Data engine: PostgreSQL + TimescaleDB",
          body: "Replacing MongoDB — faster queries and noticeably lower storage footprint for telemetry, while keeping the existing functionality intact. Example: one year of telemetry from ~150 machines took roughly 80 GB in MongoDB, and roughly 7 GB in PostgreSQL + TimescaleDB (with hypertable compression) — about 10× less storage for the same source data, plus faster time-window queries.",
        },
        {
          category: "added",
          scope: "Native MQTT ingestion (alongside Sparkplug B)",
          body: "The OmniMES stream can now ingest measurements directly from MQTT topics — not only from Sparkplug B frames. This simplifies integration with controllers, IIoT gateways and devices that publish in native formats (JSON or plain payload), without requiring a Sparkplug layer on the source side.",
        },
        {
          category: "fixed",
          scope: "Monitoring",
          body: "Correct status assignment by MQTT topic and tag; fixed incorrect matches and retrieval of the latest events.",
        },
      ],
    },
    {
      version: "4.0.0",
      date: "2026-06-17",
      entries: [
        {
          category: "changed",
          scope: "New user interface: Vue 3 + PrimeVue v4 (Sakai theme)",
          body: "Toast-style notifications and per-view state persistence stored locally in the browser.",
        },
      ],
    },
  ],
}
