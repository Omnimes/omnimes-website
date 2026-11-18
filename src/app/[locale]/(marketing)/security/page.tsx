import { getLocalePrimaryDialects } from "@/data/locales"
import { setRequestLocale } from "next-intl/server"

import { genPageMetadata } from "@/app/seo"

// Treść przygotowana w karcie BO-1196 (kanał zgłaszania podatności, CRA art. 14).
// Punkt kontaktowy opiera się o istniejący support: support@omnimes.com.
// Treść dwujęzyczna jest wpisana w komponencie, żeby nie rozbudowywać dużych
// plików messages/pl.json i messages/en.json — do decyzji właściciela przed publikacją.

const SECURITY_TXT = "https://www.omnimes.com/.well-known/security.txt"
const CONTACT = "support@omnimes.com"

type Section = {
  heading: string
  intro?: string[]
  list?: string[]
  after?: string[]
}

type Content = {
  meta: { title: string; description: string; keywords: string }
  heading: string
  updated: string
  lead: string
  sections: Section[]
  note: string
}

const content: Record<"pl" | "en", Content> = {
  pl: {
    meta: {
      title: "Zgłaszanie podatności — OmniMES",
      description:
        "Punkt kontaktowy OmniMES do zgłaszania podatności: jak i gdzie zgłosić problem bezpieczeństwa (support@omnimes.com), czego oczekujemy i deklaracja braku działań prawnych wobec zgłaszających w dobrej wierze.",
      keywords:
        "OmniMES, zgłaszanie podatności, bezpieczeństwo, security.txt, RFC 9116, CRA, cyberbezpieczeństwo, MES",
    },
    heading: "Zgłaszanie podatności",
    updated: "Data aktualizacji: 18 listopada 2026",
    lead: "W OmniMES bezpieczeństwo traktujemy jako część jakości produktu. Jeśli znalazłeś podatność w którymkolwiek z naszych systemów lub na tej stronie, prosimy o kontakt. Poniżej opisujemy, jak zgłosić problem i czego możesz od nas oczekiwać.",
    sections: [
      {
        heading: "Jak zgłosić podatność",
        intro: [
          `Zgłoszenia przyjmujemy pod adresem ${CONTACT}. To ten sam kanał, z którego korzysta nasze wsparcie, obsługiwany przez zespół OmniMES.`,
          "Prosimy dołączyć możliwie dużo szczegółów — pomoże nam to szybciej potwierdzić i naprawić problem:",
        ],
        list: [
          "opis podatności i jej potencjalny wpływ,",
          "kroki pozwalające odtworzyć problem (minimalny przykład wystarczy),",
          "wersję systemu lub adres, którego dotyczy zgłoszenie,",
          "Twoje dane kontaktowe, jeśli chcesz, abyśmy informowali Cię o postępach.",
        ],
        after: [
          `Aktualny punkt kontaktowy publikujemy też w pliku security.txt (RFC 9116) pod adresem ${SECURITY_TXT}.`,
        ],
      },
      {
        heading: "Czego od Ciebie oczekujemy",
        intro: ["Stosujemy model skoordynowanego ujawniania podatności. Prosimy, abyś:"],
        list: [
          "dał nam rozsądny czas na przygotowanie i udostępnienie poprawki, zanim ujawnisz podatność publicznie,",
          "ograniczył się do działań niezbędnych do wykazania problemu i nie wykorzystywał luki poza minimalnym dowodem,",
          "nie uzyskiwał dostępu do danych innych użytkowników, nie modyfikował ani nie usuwał danych i nie zakłócał działania usług,",
          "nie stosował metod takich jak ataki socjotechniczne, phishing czy ataki na dostępność (DoS).",
        ],
      },
      {
        heading: "Co zapewniamy z naszej strony",
        intro: ["Z naszej strony zobowiązujemy się, że:"],
        list: [
          "potwierdzimy otrzymanie zgłoszenia i ocenimy je w rozsądnym czasie,",
          "będziemy informować Cię o postępie prac nad poprawką,",
          "nie podejmiemy kroków prawnych wobec osób, które zgłaszają podatności w dobrej wierze i zgodnie z tą polityką, ani nie będziemy ich za takie zgłoszenie pozywać czy zgłaszać organom,",
          "na życzenie wymienimy Cię jako osobę, która pomogła nam poprawić bezpieczeństwo produktu.",
        ],
        after: [
          "Deklaracja braku działań prawnych dotyczy badań prowadzonych w dobrej wierze: bez naruszania prywatności innych osób, bez niszczenia danych i bez zakłócania usług. Nie obejmuje działań niezgodnych z prawem ani wykraczających poza tę politykę.",
        ],
      },
      {
        heading: "Zakres",
        intro: ["Polityka obejmuje produkty i usługi OmniMES, w szczególności:"],
        list: [
          "system OmniMES i moduł OmniEnergy (wdrożenia lokalne i w chmurze),",
          "platformę chmurową OmniPlatform (cloud.omnimes.com),",
          "stronę www.omnimes.com i powiązane z nią usługi.",
        ],
        after: [
          "Jeśli nie masz pewności, czy coś mieści się w zakresie, napisz do nas — chętnie pomożemy.",
        ],
      },
      {
        heading: "Preferowane języki",
        intro: ["Zgłoszenia przyjmujemy po polsku i po angielsku."],
      },
    ],
    note: "OmniMES rozwija firma Multiprojekt. Ten punkt kontaktowy jest zgodny z dobrymi praktykami zgłaszania podatności i odpowiada na oczekiwany od grudnia 2027 wymóg jednego punktu kontaktowego do zgłaszania podatności, o którym mówi Akt o cyberodporności (CRA).",
  },
  en: {
    meta: {
      title: "Vulnerability disclosure — OmniMES",
      description:
        "OmniMES security contact for reporting vulnerabilities: how and where to report a security issue (support@omnimes.com), what we expect and our commitment not to pursue good-faith researchers.",
      keywords:
        "OmniMES, vulnerability disclosure, security, security.txt, RFC 9116, CRA, cybersecurity, MES",
    },
    heading: "Vulnerability disclosure",
    updated: "Last updated: 18 November 2026",
    lead: "At OmniMES we treat security as part of product quality. If you have found a vulnerability in any of our systems or on this website, please let us know. Below we explain how to report it and what you can expect from us.",
    sections: [
      {
        heading: "How to report a vulnerability",
        intro: [
          `We accept reports at ${CONTACT}. This is the same channel our support team uses, operated by the OmniMES team.`,
          "Please include as much detail as you can — it helps us confirm and fix the issue faster:",
        ],
        list: [
          "a description of the vulnerability and its potential impact,",
          "steps to reproduce the issue (a minimal proof of concept is enough),",
          "the system version or the address the report concerns,",
          "your contact details, if you would like us to keep you updated.",
        ],
        after: [
          `We also publish the current contact point in a security.txt file (RFC 9116) at ${SECURITY_TXT}.`,
        ],
      },
      {
        heading: "What we ask of you",
        intro: ["We follow a coordinated vulnerability disclosure model. We ask that you:"],
        list: [
          "give us a reasonable amount of time to prepare and ship a fix before you disclose the vulnerability publicly,",
          "limit your actions to what is necessary to demonstrate the issue, and do not exploit it beyond a minimal proof of concept,",
          "do not access other users' data, do not modify or delete data, and do not disrupt our services,",
          "do not use techniques such as social engineering, phishing or denial-of-service (DoS) attacks.",
        ],
      },
      {
        heading: "What we commit to",
        intro: ["On our side, we commit to:"],
        list: [
          "acknowledging your report and assessing it within a reasonable time,",
          "keeping you informed about the progress of the fix,",
          "not taking legal action against people who report vulnerabilities in good faith and in line with this policy, and not suing or reporting them to authorities for that disclosure,",
          "crediting you, on request, as someone who helped us improve the product's security.",
        ],
        after: [
          "This no-legal-action commitment applies to good-faith research: without violating others' privacy, destroying data or disrupting services. It does not cover unlawful activity or actions outside this policy.",
        ],
      },
      {
        heading: "Scope",
        intro: ["This policy covers OmniMES products and services, in particular:"],
        list: [
          "the OmniMES system and the OmniEnergy module (on-premise and cloud deployments),",
          "the OmniPlatform cloud (cloud.omnimes.com),",
          "the www.omnimes.com website and its related services.",
        ],
        after: ["If you are unsure whether something is in scope, contact us — we are happy to help."],
      },
      {
        heading: "Preferred languages",
        intro: ["We accept reports in Polish and English."],
      },
    ],
    note: "OmniMES is developed by Multiprojekt. This contact point follows good vulnerability-disclosure practice and addresses the single point of contact for vulnerability reporting expected under the EU Cyber Resilience Act (CRA) from December 2027.",
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
    path: "/security",
  })
}

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <section className="text-sm font-light md:text-base">
        <p className="mb-2">{c.lead}</p>
        <p className="mb-2">
          <a className="text-primary-500 font-medium hover:underline" href={`mailto:${CONTACT}`}>
            {CONTACT}
          </a>
        </p>
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
          {s.after?.map((p, i) => (
            <p key={i} className="mb-2">
              {p}
            </p>
          ))}
        </section>
      ))}

      <footer>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{c.note}</p>
      </footer>
    </main>
  )
}
