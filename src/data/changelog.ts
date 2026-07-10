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
          body: "Progi wartości sygnału (np. prąd, ciśnienie) wyznaczają stan pracy maszyny. Konfigurowalne w konfiguratorze statusów, widoczne na żywo w Monitoringu i uwzględniane w historii oraz raportach.",
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
          category: "changed",
          scope: "Broker / stream",
          body: "Parametry połączenia z brokerem MQTT pobierane z ustawień w bazie danych.",
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
          body: "Signal value thresholds (e.g. current, pressure) determine the machine's working state. Configurable in the status configurator, visible live in Monitoring and included in history and reports.",
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
          category: "changed",
          scope: "Broker / stream",
          body: "MQTT broker connection parameters are now sourced from database settings.",
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
