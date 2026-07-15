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
      scope: "MCP (Model Context Protocol) — OmniMES pod dowolny model AI",
      body: "Otwarty serwer MCP dla OmniMES pozwoli podłączyć system do dowolnego dużego modelu językowego — komercyjnego (Claude, GPT, Gemini) oraz darmowego przez OpenRouter (Llama, Qwen, DeepSeek i inne). Konfiguracja alarmów, harmonogramów, statusów maszyn oraz odczyt bieżącego stanu produkcji będą dostępne z poziomu asystenta AI, w języku naturalnym — bez klikania w interfejsie. Model dobierany świadomie: lokalny gdy zależy na prywatności, chmurowy gdy zależy na jakości.",
      eta: "2026 Q3",
    },
  ],
  en: [
    {
      scope: "MCP (Model Context Protocol) — OmniMES for any AI model",
      body: "An open MCP server for OmniMES will let you connect the system to any large language model — commercial (Claude, GPT, Gemini) or free via OpenRouter (Llama, Qwen, DeepSeek and others). Configuring alarms, schedules and machine statuses, as well as reading live production state, will be available from an AI assistant in natural language — without clicking through the UI. Choose the model deliberately: local when privacy matters, cloud when quality matters.",
      eta: "2026 Q3",
    },
  ],
}

export const changelog: Record<"pl" | "en", Release[]> = {
  pl: [
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
          body: "Zamiast MongoDB — szybsze zapytania i wyraźnie mniejsze zużycie miejsca dla telemetrii, przy zachowaniu dotychczasowej funkcjonalności.",
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
          body: "Replacing MongoDB — faster queries and noticeably lower storage footprint for telemetry, while keeping the existing functionality intact.",
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
