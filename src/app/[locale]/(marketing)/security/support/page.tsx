import { changelog } from "@/data/changelog"
import { getLocalePrimaryDialects } from "@/data/locales"
import { setRequestLocale } from "next-intl/server"

import { genPageMetadata } from "@/app/seo"

import { CONTACT, securityHref, SecurityNav } from "../securityShared"

// BO-1196 / CRA-04: polityka wsparcia (art. 13 ust. 8, 10 i 19 CRA).
// Poprawki bezpieczeństwa wydajemy w najnowszej wersji; aktualizacja jest bezpłatna dla klientów
// z ważną licencją. Każda wersja: wsparcie co najmniej 5 lat od wydania (miesiąc i rok).
// Tabela liczy się sama z src/data/changelog.ts (synchronizowanego przy każdym wydaniu).

export const revalidate = 3600

const SUPPORT_YEARS = 5
const DOCS_UPDATE = "https://docs.omnimes.com/doc/instalacja-wersja-on-premise-2tAS575nLs"
const MONTHS_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function monthYear(isoDate: string, addYears: number, locale: string): string {
  const [y, m] = isoDate.split("-").map((v) => parseInt(v, 10))
  const year = y + addYears
  if (locale === "pl") return `${String(m).padStart(2, "0")}.${year}`
  return `${MONTHS_EN[m - 1]} ${year}`
}

type Section = { heading: string; intro?: string[]; list?: string[]; after?: string[] }

type Content = {
  meta: { title: string; description: string; keywords: string }
  heading: string
  updated: string
  lead: string
  sections: Section[]
  table: {
    heading: string
    intro: string
    version: string
    released: string
    end: string
    status: string
    latest: string
    supported: string
    notes: string[]
  }
  note: string
}

const content: Record<"pl" | "en", Content> = {
  pl: {
    meta: {
      title: "Okres wsparcia i aktualizacje — OmniMES",
      description:
        "Okres wsparcia bezpieczeństwa OmniMES: poprawki w najnowszej wersji, bezpłatna aktualizacja dla klientów z ważną licencją, co najmniej 5 lat wsparcia od wydania każdej wersji i tabela dat końca wsparcia.",
      keywords:
        "OmniMES, okres wsparcia, aktualizacje bezpieczeństwa, koniec wsparcia, wersje, CRA, MES",
    },
    heading: "Okres wsparcia i aktualizacje",
    updated: "Data aktualizacji: 19 listopada 2026",
    lead: "Opisujemy, jak długo dostarczamy poprawki bezpieczeństwa dla systemu OmniMES z modułem OmniEnergy — w instalacjach lokalnych i w chmurze OmniPlatform — oraz jak je otrzymać.",
    sections: [
      {
        heading: "Zasady",
        list: [
          "OmniMES rozwijamy w jednej linii wersji. Poprawki bezpieczeństwa wydajemy w najnowszej wersji.",
          "Aktualizacja do najnowszej wersji jest bezpłatna dla każdego klienta z ważną licencją OmniMES, także wtedy, gdy korzysta ze starszej wersji.",
          `Każda wersja ma okres wsparcia co najmniej ${SUPPORT_YEARS} lat od daty jej wydania. Do końca tego okresu poprawki bezpieczeństwa są dla niej dostępne jako aktualizacja do najnowszej wersji.`,
          "Każda nowsza wersja ma własną, późniejszą datę końca wsparcia — regularna aktualizacja wydłuża więc wsparcie Twojej instalacji.",
          "Przed końcem okresu wsparcia wersji poinformujemy klientów, którzy z niej korzystają.",
        ],
      },
      {
        heading: "Jak otrzymać aktualizację",
        list: [
          "Instalacja lokalna: aktualizacje nie instalują się automatycznie. W zakładzie produkcyjnym termin zmiany wybiera administrator, na przykład w oknie serwisowym. Sposób aktualizacji opisuje instrukcja: rozdział „Instalacja”, sekcja „Aktualizacja systemu”.",
          "Chmura OmniPlatform: instancje aktualizuje producent.",
          "O nowych wersjach informuje lista zmian, a o usuniętych podatnościach — komunikaty bezpieczeństwa.",
        ],
      },
    ],
    table: {
      heading: "Wersje i daty końca wsparcia",
      intro: "Daty podajemy z dokładnością do miesiąca.",
      version: "Wersja",
      released: "Wydana",
      end: "Koniec wsparcia",
      status: "Status",
      latest: "najnowsza — w niej wydajemy poprawki",
      supported: "wspierana — poprawki przez aktualizację do najnowszej wersji",
      notes: [
        `Instalacje w wersjach starszych niż 4.0.0 prosimy zaktualizować. Napisz do nas: ${CONTACT}.`,
      ],
    },
    note: "Zasady opisane na tej stronie dotyczą okresu wsparcia wymaganego przez Akt o cyberodporności (CRA).",
  },
  en: {
    meta: {
      title: "Support period and updates — OmniMES",
      description:
        "OmniMES security support period: fixes in the latest version, free update for customers with a valid licence, at least 5 years of support from the release of each version, and a table of end-of-support dates.",
      keywords: "OmniMES, support period, security updates, end of support, versions, CRA, MES",
    },
    heading: "Support period and updates",
    updated: "Last updated: 19 November 2026",
    lead: "This page explains how long we deliver security fixes for OmniMES with the OmniEnergy module — on-premise and on the OmniPlatform cloud — and how to get them.",
    sections: [
      {
        heading: "Principles",
        list: [
          "OmniMES is developed in a single line of versions. We ship security fixes in the latest version.",
          "Updating to the latest version is free of charge for every customer with a valid OmniMES licence, including customers running an older version.",
          `Each version has a support period of at least ${SUPPORT_YEARS} years from its release date. Until the end of that period, security fixes are available for it as an update to the latest version.`,
          "Each newer version has its own, later end-of-support date — so regular updates extend the support of your installation.",
          "Before a version reaches the end of its support period, we will inform the customers who use it.",
        ],
      },
      {
        heading: "How to get updates",
        list: [
          "On-premise: updates are not installed automatically. In a production plant the administrator chooses when to make the change, for example during a maintenance window. The update procedure is described in the manual: Installation chapter, section “System update”.",
          "OmniPlatform cloud: instances are updated by the manufacturer.",
          "New versions are announced in the changelog, and fixed vulnerabilities in the security advisories.",
        ],
      },
    ],
    table: {
      heading: "Versions and end-of-support dates",
      intro: "Dates are given to the month.",
      version: "Version",
      released: "Released",
      end: "End of support",
      status: "Status",
      latest: "latest — security fixes are shipped here",
      supported: "supported — fixes via update to the latest version",
      notes: [
        `Please update installations running versions older than 4.0.0. Contact us: ${CONTACT}.`,
      ],
    },
    note: "The principles on this page cover the support period required by the EU Cyber Resilience Act (CRA).",
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
    path: "/security/support",
  })
}

export default async function SecuritySupportPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = pick(locale)
  const releases = (locale === "pl" ? changelog.pl : changelog.en).filter((r) =>
    /^\d+\.\d+\.\d+$/.test(r.version)
  )
  const changelogHref = locale === "pl" ? "/pl/lista-zmian" : "/en/changelog"

  return (
    <main className="flex flex-col gap-4">
      <header className="my-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          {c.heading}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{c.updated}</p>
      </header>

      <SecurityNav locale={locale} current="/security/support" />

      <section className="text-sm font-light md:text-base">
        <p className="mb-2">{c.lead}</p>
      </section>

      {c.sections.map((s) => (
        <section key={s.heading} className="text-sm font-light md:text-base">
          <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">{s.heading}</h2>
          {s.intro?.map((p, i) => (
            <p key={i} className="mb-2">
              {p}
            </p>
          ))}
          {s.list && (
            <ul className="mb-2 list-disc text-left">
              {s.list.map((item, i) => (
                <li key={i} className="mb-1 ml-5 sm:ml-7">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className="text-sm font-light md:text-base">
        <p className="mb-2">
          <a className="text-primary-500 hover:underline" href={DOCS_UPDATE} rel="noopener">
            {locale === "pl"
              ? "Instrukcja instalacji i aktualizacji"
              : "Installation and update manual"}
          </a>
          {" · "}
          <a className="text-primary-500 hover:underline" href={changelogHref}>
            {locale === "pl" ? "Lista zmian" : "Changelog"}
          </a>
          {" · "}
          <a
            className="text-primary-500 hover:underline"
            href={securityHref(locale, "/security/advisories")}
          >
            {locale === "pl" ? "Komunikaty bezpieczeństwa" : "Security advisories"}
          </a>
        </p>
      </section>

      <section className="text-sm font-light md:text-base">
        <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">
          {c.table.heading}
        </h2>
        <p className="mb-2">{c.table.intro}</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="py-2 pr-4 font-medium">{c.table.version}</th>
                <th className="py-2 pr-4 font-medium">{c.table.released}</th>
                <th className="py-2 pr-4 font-medium">{c.table.end}</th>
                <th className="py-2 font-medium">{c.table.status}</th>
              </tr>
            </thead>
            <tbody>
              {releases.map((r, i) => (
                <tr key={r.version} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 pr-4 font-medium">{r.version}</td>
                  <td className="py-2 pr-4">{monthYear(r.date, 0, locale)}</td>
                  <td className="py-2 pr-4">{monthYear(r.date, SUPPORT_YEARS, locale)}</td>
                  <td className="py-2">{i === 0 ? c.table.latest : c.table.supported}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {c.table.notes.map((n, i) => (
          <p key={i} className="mt-2">
            {n}
          </p>
        ))}
      </section>

      <footer>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{c.note}</p>
      </footer>
    </main>
  )
}
