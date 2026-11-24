import { getLocalePrimaryDialects } from "@/data/locales"
import { setRequestLocale } from "next-intl/server"

import { genPageMetadata } from "@/app/seo"

import { CONTACT, securityHref, SecurityNav } from "../securityShared"

// BO-1355 / CRA-10: deklaracja zgodności UE (rozporządzenie (UE) 2024/2847, załącznik V).
// Decyzja Martina 24.11.2026: oświadczenie producenta opublikowane na stronie produktu, bez podpisu;
// ocena zgodności modułem A (kontrola wewnętrzna), oznakowanie CE umieszcza producent.

export const revalidate = 3600

const VERSION_FROM = "5.0.2"
const ISSUED = { pl: "Kraków, 24.11.2026", en: "Kraków, 24 November 2026" }

type Row = { label: string; value: string[] }

type Content = {
  meta: { title: string; description: string; keywords: string }
  heading: string
  updated: string
  lead: string
  rows: Row[]
  ce: { heading: string; text: string[] }
}

const MANUFACTURER = [
  "Multiprojekt Automatyka Sp. z o.o.",
  "ul. Pilotów 2E, 31-462 Kraków, Polska",
  "NIP: 675-144-15-70, REGON: 121401320",
]

const content: Record<"pl" | "en", Content> = {
  pl: {
    meta: {
      title: "Deklaracja zgodności UE — OmniMES",
      description:
        "Deklaracja zgodności UE systemu OmniMES z rozporządzeniem (UE) 2024/2847 (Cyber Resilience Act): producent, przedmiot deklaracji, procedura oceny zgodności i oznakowanie CE.",
      keywords: "OmniMES, deklaracja zgodności UE, CRA, Cyber Resilience Act, 2024/2847, oznakowanie CE",
    },
    heading: "Deklaracja zgodności UE",
    updated: "Data wystawienia: 24 listopada 2026",
    lead: "Deklaracja zgodności produktu z elementami cyfrowymi z rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2024/2847 (akt o cyberodporności, CRA), sporządzona według załącznika V do rozporządzenia.",
    rows: [
      {
        label: "1. Produkt",
        value: [
          `OmniMES — system do monitorowania produkcji i zarządzania energią (MES/EMS) z modułem OmniEnergy, w wersji ${VERSION_FROM} i nowszych.`,
          "Wersję identyfikuje numer w stopce aplikacji, plik VERSION w paczce instalacyjnej i znacznik wydania na liście zmian.",
        ],
      },
      { label: "2. Producent", value: [...MANUFACTURER, `Kontakt w sprawach bezpieczeństwa: ${CONTACT}`] },
      {
        label: "3. Odpowiedzialność",
        value: ["Niniejszą deklarację zgodności wydaje się na wyłączną odpowiedzialność producenta."],
      },
      {
        label: "4. Przedmiot deklaracji",
        value: [
          "Oprogramowanie OmniMES w instalacji lokalnej (on-premise) oraz w instancjach uruchamianych przez platformę OmniPlatform (cloud.omnimes.com), razem z serwerem licencji, z którego korzysta.",
        ],
      },
      {
        label: "5. Zgodność",
        value: [
          "Opisany wyżej przedmiot deklaracji jest zgodny z rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2024/2847 z dnia 23 października 2024 r. w sprawie horyzontalnych wymogów cyberbezpieczeństwa w odniesieniu do produktów z elementami cyfrowymi.",
        ],
      },
      {
        label: "6. Normy i specyfikacje",
        value: [
          "Normy zharmonizowane do rozporządzenia (UE) 2024/2847 nie zostały jeszcze opublikowane w Dzienniku Urzędowym UE. Zasadnicze wymagania spełniono rozwiązaniami opisanymi w dokumentacji technicznej producenta; normy IEC 62443 oraz ISO/IEC 29147 i ISO/IEC 30111 posłużyły jako punkt odniesienia.",
        ],
      },
      {
        label: "7. Ocena zgodności",
        value: [
          "Procedura kontroli wewnętrznej (moduł A, załącznik VIII część I rozporządzenia), bez udziału jednostki notyfikowanej.",
        ],
      },
      {
        label: "8. Informacje dodatkowe",
        value: [
          "Okres wsparcia: co najmniej 5 lat od wydania każdej wersji — zakładka „Okres wsparcia i aktualizacje”.",
          "Zgłaszanie podatności: zakładka „Zgłaszanie podatności”.",
          `Miejsce i data wystawienia: ${ISSUED.pl}. W imieniu producenta: Martin Szerment.`,
        ],
      },
    ],
    ce: {
      heading: "Oznakowanie CE",
      text: [
        "Na podstawie tej deklaracji producent umieszcza oznakowanie CE w dokumentacji produktu i na tej stronie. Oznakowanie dotyczy wymagań rozporządzenia (UE) 2024/2847.",
      ],
    },
  },
  en: {
    meta: {
      title: "EU declaration of conformity — OmniMES",
      description:
        "EU declaration of conformity of OmniMES with Regulation (EU) 2024/2847 (Cyber Resilience Act): manufacturer, object of the declaration, conformity assessment procedure and CE marking.",
      keywords: "OmniMES, EU declaration of conformity, CRA, Cyber Resilience Act, 2024/2847, CE marking",
    },
    heading: "EU declaration of conformity",
    updated: "Date of issue: 24 November 2026",
    lead: "Declaration of conformity of a product with digital elements with Regulation (EU) 2024/2847 of the European Parliament and of the Council (Cyber Resilience Act, CRA), drawn up in accordance with Annex V to the Regulation.",
    rows: [
      {
        label: "1. Product",
        value: [
          `OmniMES — production monitoring and energy management system (MES/EMS) with the OmniEnergy module, version ${VERSION_FROM} and later.`,
          "The version is identified by the number in the application footer, the VERSION file in the installation package and the release tag in the changelog.",
        ],
      },
      { label: "2. Manufacturer", value: [...MANUFACTURER, `Security contact: ${CONTACT}`] },
      {
        label: "3. Responsibility",
        value: ["This declaration of conformity is issued under the sole responsibility of the manufacturer."],
      },
      {
        label: "4. Object of the declaration",
        value: [
          "OmniMES software installed on-premise and in instances launched by the OmniPlatform (cloud.omnimes.com), together with the licence server it uses.",
        ],
      },
      {
        label: "5. Conformity",
        value: [
          "The object of the declaration described above is in conformity with Regulation (EU) 2024/2847 of the European Parliament and of the Council of 23 October 2024 on horizontal cybersecurity requirements for products with digital elements.",
        ],
      },
      {
        label: "6. Standards and specifications",
        value: [
          "Harmonised standards for Regulation (EU) 2024/2847 have not yet been published in the Official Journal of the EU. The essential requirements are met by the solutions described in the manufacturer's technical documentation; IEC 62443 and ISO/IEC 29147 and ISO/IEC 30111 served as a reference.",
        ],
      },
      {
        label: "7. Conformity assessment",
        value: [
          "Internal control procedure (module A, Annex VIII Part I of the Regulation), without the involvement of a notified body.",
        ],
      },
      {
        label: "8. Additional information",
        value: [
          "Support period: at least 5 years from the release of each version — see “Support period and updates”.",
          "Vulnerability reporting: see “Vulnerability disclosure”.",
          `Place and date of issue: ${ISSUED.en}. On behalf of the manufacturer: Martin Szerment.`,
        ],
      },
    ],
    ce: {
      heading: "CE marking",
      text: [
        "On the basis of this declaration, the manufacturer affixes the CE marking to the product documentation and to this page. The marking refers to the requirements of Regulation (EU) 2024/2847.",
      ],
    },
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
    path: "/security/declaration",
  })
}

export default async function SecurityDeclarationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = pick(locale)

  return (
    <main className="flex flex-col gap-4">
      <header className="my-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          {c.heading}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{c.updated}</p>
      </header>

      <SecurityNav locale={locale} current="/security/declaration" />

      <section className="text-sm font-light md:text-base">
        <p className="mb-2">{c.lead}</p>
      </section>

      <section className="text-sm font-light md:text-base">
        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
          {c.rows.map((r) => (
            <div key={r.label} className="py-3 sm:grid sm:grid-cols-4 sm:gap-4">
              <dt className="font-medium">{r.label}</dt>
              <dd className="mt-1 sm:col-span-3 sm:mt-0">
                {r.value.map((v, i) => (
                  <p key={i} className="mb-1">
                    {v}
                  </p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="text-sm font-light md:text-base">
        <h2 className="text-primary-500 mb-3 mt-5 text-xl font-bold md:text-xl">{c.ce.heading}</h2>
        <div className="mb-3 flex items-center gap-4">
          <span
            aria-label="CE"
            className="inline-flex h-14 w-20 items-center justify-center rounded border border-gray-300 font-serif text-4xl font-bold tracking-tight dark:border-gray-600"
          >
            CE
          </span>
        </div>
        {c.ce.text.map((p, i) => (
          <p key={i} className="mb-2">
            {p}
          </p>
        ))}
        <p className="mb-2">
          <a className="text-primary-500 hover:underline" href={securityHref(locale, "/security/support")}>
            {locale === "pl" ? "Okres wsparcia i aktualizacje" : "Support period and updates"}
          </a>
          {" · "}
          <a className="text-primary-500 hover:underline" href={securityHref(locale, "/security")}>
            {locale === "pl" ? "Zgłaszanie podatności" : "Vulnerability disclosure"}
          </a>
        </p>
      </section>
    </main>
  )
}
