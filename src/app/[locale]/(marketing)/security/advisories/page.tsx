import { getLocalePrimaryDialects } from "@/data/locales"
import { setRequestLocale } from "next-intl/server"

import { genPageMetadata } from "@/app/seo"

import { CONTACT, securityHref, SecurityNav } from "../securityShared"

// BO-1196 / CRA-03: komunikaty bezpieczeństwa (Zał. I cz. II pkt 4 CRA).
// Źródło faktów: sekcje „Bezpieczeństwo” listy zmian 4.7.0 i 4.8.0 oraz audyty z 14.11.2026
// (_biznes/CRA, poza gitem). Opisy bez szczegółów pozwalających wykorzystać podatność.
// CVSS liczbowo tylko tam, gdzie wektor da się rzetelnie wyznaczyć.
// Komunikaty dla poprawek z 4.12.0 czekają na rotację tokenów i aktualizację instalacji
// klientów — gotowe teksty: _biznes/CRA/polityka_podatnosci_i_wsparcia_2026-11-19.md.

type Advisory = {
  id: string
  published: string
  title: string
  affected: string
  fixed: string
  severity: string
  cvss?: string
  description: string
  action: string
}

type Content = {
  meta: { title: string; description: string; keywords: string }
  heading: string
  updated: string
  lead: string[]
  general: string
  labels: {
    published: string
    affected: string
    fixed: string
    severity: string
    description: string
    action: string
  }
  advisories: Advisory[]
  footer: string[]
}

const content: Record<"pl" | "en", Content> = {
  pl: {
    meta: {
      title: "Komunikaty bezpieczeństwa — OmniMES",
      description:
        "Komunikaty bezpieczeństwa OmniMES: opisy usuniętych podatności, wersje, których dotyczą, wersje z poprawką, ocena wagi (CVSS) i zalecane działania.",
      keywords:
        "OmniMES, komunikaty bezpieczeństwa, podatności, CVSS, aktualizacja, CRA, cyberbezpieczeństwo, MES",
    },
    heading: "Komunikaty bezpieczeństwa",
    updated: "Stan na 19 listopada 2026",
    lead: [
      "Publikujemy tu opisy podatności usuniętych z OmniMES: których wersji dotyczą, w której wersji je naprawiliśmy, jak oceniamy ich wagę i co należy zrobić. Opisy nie zawierają szczegółów, które ułatwiłyby wykorzystanie podatności.",
      "Wagę oceniamy w skali CVSS 3.1. Ocenę liczbową z wektorem podajemy, gdy da się ją rzetelnie wyznaczyć. W pozostałych przypadkach podajemy samą wagę.",
    ],
    general:
      "Zalecenie ogólne: korzystaj z najnowszej wersji OmniMES. Instancje w chmurze OmniPlatform aktualizuje producent. Klientów, których dotyczy podatność, informujemy także bezpośrednio.",
    labels: {
      published: "Opublikowano",
      affected: "Dotyczy",
      fixed: "Naprawiono w",
      severity: "Waga",
      description: "Opis",
      action: "Co zrobić",
    },
    advisories: [
      {
        id: "OMNI-SA-2026-001",
        published: "19.11.2026",
        title: "Wykonanie poleceń na serwerze przy generowaniu raportu z szablonu",
        affected: "OmniMES w wersjach wcześniejszych niż 4.8.0.",
        fixed: "4.8.0 (14.11.2026).",
        severity: "wysoka — CVSS 3.1: 8,8",
        cvss: "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
        description:
          "Zalogowany użytkownik, niezależnie od przypisanych mu uprawnień, mógł przy generowaniu raportu z szablonu doprowadzić do wykonania dowolnych poleceń na serwerze aplikacji. Od wersji 4.8.0 wzory w raportach przyjmują wyłącznie liczby, działania arytmetyczne i nawiasy.",
        action:
          "Zaktualizuj OmniMES do wersji 4.8.0 lub nowszej. Do czasu aktualizacji ogranicz dostęp do systemu do zaufanych użytkowników i zaufanej sieci.",
      },
      {
        id: "OMNI-SA-2026-002",
        published: "19.11.2026",
        title: "Uprawnienia ról niesprawdzane przez serwer (API)",
        affected:
          "OmniMES w wersjach wcześniejszych niż 4.8.0 oraz instalacje zaktualizowane do 4.8.0 lub nowszej, w których nie włączono egzekwowania uprawnień.",
        fixed:
          "4.8.0 (14.11.2026). W nowych instalacjach egzekwowanie jest włączone od razu, w zaktualizowanych włącza je administrator.",
        severity:
          "wysoka (bez oceny liczbowej — skutek zależy od ról i danych w konkretnej instalacji)",
        description:
          "Uprawnienia grup z ekranu „Uprawnienia dostępu” ograniczały tylko to, co użytkownik widział w przeglądarce. Zalogowany użytkownik mógł przez API, z pominięciem interfejsu, odczytać i zmienić dane spoza przypisanych mu ekranów, w tym hasła i klucze zapisane w Konfiguracji ogólnej oraz dane innych kont. Od wersji 4.8.0 serwer sprawdza uprawnienia przy odczycie i zapisie, a konta administracyjne i serwisowe może zmienić wyłącznie administrator główny, niezależnie od trybu.",
        action:
          "Zaktualizuj do wersji 4.8.0 lub nowszej. W instalacji zaktualizowanej z wcześniejszej wersji włącz egzekwowanie uprawnień (OMNIMES_RBAC_MODE=enforce) po przejrzeniu raportu odmów — według instrukcji, rozdział „Instalacja”, sekcja „Aktualizacja systemu”. Jeśli do systemu mieli dostęp użytkownicy spoza administracji, zmień też hasła i klucze zapisane w Konfiguracji ogólnej (np. hasło poczty, klucze usług AI).",
      },
      {
        id: "OMNI-SA-2026-003",
        published: "19.11.2026",
        title: "Odczyt danych logowania innych użytkowników",
        affected: "OmniMES w wersjach wcześniejszych niż 4.8.0.",
        fixed: "4.8.0 (14.11.2026).",
        severity: "wysoka (bez oceny liczbowej — skutek zależy od tego, czyje dane odczytano)",
        description:
          "Zalogowany użytkownik mógł odczytać hasło innej osoby, także administratora, a przez moduł kopii zapasowych — tokeny dostępu do API innych kont. Od wersji 4.8.0 hasła nie są dostępne dla innych kont, kopie zapasowe nie zawierają tokenów, a import kopii z kontami użytkowników może wykonać tylko administrator główny.",
        action:
          "Zaktualizuj do wersji 4.8.0 lub nowszej, a potem zmień hasła kont administracyjnych. Jeśli podejrzewasz, że ktoś mógł wykorzystać tę podatność, napisz do nas — pomożemy unieważnić tokeny dostępu.",
      },
      {
        id: "OMNI-SA-2026-004",
        published: "19.11.2026",
        title: "Dane BI dostępne bez uwierzytelnienia",
        affected:
          "OmniMES w wersjach wcześniejszych niż 4.7.0 oraz instalacje od 4.7.0, w których dostęp do danych BI działa w trybie „otwarty” albo „loguj” (domyślnym).",
        fixed: "4.7.0 (13.11.2026). Tryb „wymagaj” włącza administrator.",
        severity:
          "średnia (bez oceny liczbowej — zależy od tego, kto ma dostęp sieciowy do API OmniMES)",
        description:
          "Interfejs, z którego pulpity Redasha pobierają dane produkcyjne, odpowiadał na zapytania bez uwierzytelnienia. Każdy, kto miał dostęp sieciowy do API OmniMES, mógł odczytać te dane. Od wersji 4.7.0 Redash pobiera dane tokenem konta serwisowego, które może je wyłącznie odczytywać, a tryb „wymagaj” odrzuca zapytania bez tokenu.",
        action:
          "Zaktualizuj do wersji 4.7.0 lub nowszej. Sprawdź raportem opisanym w pliku BEZPIECZENSTWO_API.md (w paczce instalacyjnej), czy przez ostatnie 7 dni nie było pobrań bez tokenu, a potem ustaw OMNIMES_DATABI_AUTH=wymagaj.",
      },
    ],
    footer: [
      "Zmiany, które wzmacniają zabezpieczenia, ale nie usuwają konkretnej podatności, opisuje sekcja „Bezpieczeństwo” na liście zmian.",
      `Pytania dotyczące komunikatów: ${CONTACT}.`,
    ],
  },
  en: {
    meta: {
      title: "Security advisories — OmniMES",
      description:
        "OmniMES security advisories: fixed vulnerabilities, affected versions, fixed versions, severity rating (CVSS) and recommended actions.",
      keywords:
        "OmniMES, security advisories, vulnerabilities, CVSS, update, CRA, cybersecurity, MES",
    },
    heading: "Security advisories",
    updated: "As of 19 November 2026",
    lead: [
      "This page describes vulnerabilities fixed in OmniMES: which versions they affect, which version fixes them, how we rate their severity and what you should do. The descriptions leave out details that would make the vulnerabilities easier to exploit.",
      "We rate severity on the CVSS 3.1 scale. We give a numeric score with its vector when it can be determined reliably. Otherwise we give the severity level only.",
    ],
    general:
      "General recommendation: use the latest OmniMES version. Instances on the OmniPlatform cloud are updated by the manufacturer. We also inform affected customers directly.",
    labels: {
      published: "Published",
      affected: "Affects",
      fixed: "Fixed in",
      severity: "Severity",
      description: "Description",
      action: "What to do",
    },
    advisories: [
      {
        id: "OMNI-SA-2026-001",
        published: "2026-11-19",
        title: "Server command execution when generating a report from a template",
        affected: "OmniMES versions earlier than 4.8.0.",
        fixed: "4.8.0 (2026-11-14).",
        severity: "high — CVSS 3.1: 8.8",
        cvss: "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
        description:
          "A logged-in user, regardless of the permissions assigned, could cause arbitrary commands to run on the application server while generating a report from a template. Since version 4.8.0, report formulas accept only numbers, arithmetic operators and parentheses.",
        action:
          "Update OmniMES to version 4.8.0 or later. Until you update, limit access to the system to trusted users and a trusted network.",
      },
      {
        id: "OMNI-SA-2026-002",
        published: "2026-11-19",
        title: "Role permissions not checked by the server (API)",
        affected:
          "OmniMES versions earlier than 4.8.0, and installations upgraded to 4.8.0 or later where permission enforcement has not been enabled.",
        fixed:
          "4.8.0 (2026-11-14). New installations have enforcement enabled from the start; in upgraded installations the administrator enables it.",
        severity:
          "high (no numeric score — the impact depends on the roles and data in a given installation)",
        description:
          "Group permissions from the Access screen only limited what users saw in the browser. A logged-in user could use the API, bypassing the interface, to read and change data outside their assigned screens, including passwords and keys stored in General configuration and other users' accounts. Since version 4.8.0 the server checks permissions on read and write, and administrative and service accounts can be changed only by the main administrator, regardless of the mode.",
        action:
          "Update to version 4.8.0 or later. In an installation upgraded from an earlier version, enable permission enforcement (OMNIMES_RBAC_MODE=enforce) after reviewing the denial report — see the Installation chapter, section “System update”. If users outside the administration team had access to the system, also change the passwords and keys stored in General configuration (e.g. the mail password, AI service keys).",
      },
      {
        id: "OMNI-SA-2026-003",
        published: "2026-11-19",
        title: "Other users' login credentials readable",
        affected: "OmniMES versions earlier than 4.8.0.",
        fixed: "4.8.0 (2026-11-14).",
        severity: "high (no numeric score — the impact depends on whose credentials were read)",
        description:
          "A logged-in user could read another person's password, including an administrator's, and — through the backup module — API access tokens of other accounts. Since version 4.8.0 passwords are not available to other accounts, backups do not contain tokens, and only the main administrator can import a backup containing user accounts.",
        action:
          "Update to version 4.8.0 or later, then change the passwords of administrative accounts. If you suspect the vulnerability may have been exploited, contact us — we will help you revoke access tokens.",
      },
      {
        id: "OMNI-SA-2026-004",
        published: "2026-11-19",
        title: "BI data available without authentication",
        affected:
          "OmniMES versions earlier than 4.7.0, and installations from 4.7.0 on where BI data access runs in the “otwarty” (open) or “loguj” (log, default) mode.",
        fixed: "4.7.0 (2026-11-13). The administrator enables the “wymagaj” (require) mode.",
        severity:
          "medium (no numeric score — it depends on who has network access to the OmniMES API)",
        description:
          "The interface from which Redash dashboards fetch production data answered requests without authentication. Anyone with network access to the OmniMES API could read that data. Since version 4.7.0 Redash fetches the data with the token of a service account that can only read it, and the “wymagaj” mode rejects requests without a token.",
        action:
          "Update to version 4.7.0 or later. Use the report described in BEZPIECZENSTWO_API.md (in the installation package) to check that there were no requests without a token over the last 7 days, then set OMNIMES_DATABI_AUTH=wymagaj.",
      },
    ],
    footer: [
      "Changes that strengthen security without fixing a specific vulnerability are listed in the Security section of the changelog.",
      `Questions about these advisories: ${CONTACT}.`,
    ],
  },
}

function pick(locale: string): Content {
  return locale === "pl" ? content.pl : content.en
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = pick(locale)
  const localeShort = getLocalePrimaryDialects(locale)
  return genPageMetadata({
    title: c.meta.title,
    description: c.meta.description,
    keywords: c.meta.keywords,
    localeShort,
    locale,
    path: "/security/advisories",
  })
}

export default async function SecurityAdvisoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = pick(locale)
  const changelogHref = locale === "pl" ? "/pl/lista-zmian" : "/en/changelog"

  return (
    <main className="flex flex-col gap-4">
      <header className="my-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          {c.heading}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{c.updated}</p>
      </header>

      <SecurityNav locale={locale} current="/security/advisories" />

      <section className="text-sm font-light md:text-base">
        {c.lead.map((p, i) => (
          <p key={i} className="mb-2">
            {p}
          </p>
        ))}
        <p className="mb-2 font-medium">{c.general}</p>
      </section>

      {c.advisories.map((a) => (
        <article
          key={a.id}
          id={a.id}
          className="rounded-lg border border-gray-200 p-4 text-sm font-light md:text-base dark:border-gray-700"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {a.id}
          </p>
          <h2 className="text-primary-500 mb-3 mt-1 text-xl font-bold">{a.title}</h2>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-[10rem_1fr]">
            <dt className="font-medium">{c.labels.published}</dt>
            <dd>{a.published}</dd>
            <dt className="font-medium">{c.labels.affected}</dt>
            <dd>{a.affected}</dd>
            <dt className="font-medium">{c.labels.fixed}</dt>
            <dd>{a.fixed}</dd>
            <dt className="font-medium">{c.labels.severity}</dt>
            <dd>
              {a.severity}
              {a.cvss && (
                <>
                  <br />
                  <code className="break-all text-xs">{a.cvss}</code>
                </>
              )}
            </dd>
            <dt className="font-medium">{c.labels.description}</dt>
            <dd>{a.description}</dd>
            <dt className="font-medium">{c.labels.action}</dt>
            <dd>{a.action}</dd>
          </dl>
        </article>
      ))}

      <footer className="text-sm text-gray-500 dark:text-gray-400">
        <p className="mt-4">
          {c.footer[0]}{" "}
          <a className="text-primary-500 hover:underline" href={changelogHref}>
            {locale === "pl" ? "Lista zmian" : "Changelog"}
          </a>
        </p>
        <p className="mt-2">{c.footer[1]}</p>
        <p className="mt-2">
          <a className="text-primary-500 hover:underline" href={securityHref(locale, "/security")}>
            {locale === "pl" ? "Jak zgłosić podatność" : "How to report a vulnerability"}
          </a>
        </p>
      </footer>
    </main>
  )
}
