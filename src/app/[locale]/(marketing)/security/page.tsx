import { getLocalePrimaryDialects } from "@/data/locales"
import { setRequestLocale } from "next-intl/server"

import { genPageMetadata } from "@/app/seo"

import { CONTACT, securityHref, SecurityNav, type SecurityPageKey } from "./securityShared"

// Treść przygotowana w karcie BO-1196 (kanał zgłaszania podatności, CRA art. 13 i 14).
// Punkt kontaktowy opiera się o istniejący support: support@omnimes.com.
// Terminy usuwania podatności (CRA-03) i odnośniki do komunikatów oraz okresu wsparcia
// (CRA-04) dodane 19.11.2026. Wewnętrzna procedura: _biznes/CRA (poza gitem).

const SECURITY_TXT = "https://www.omnimes.com/.well-known/security.txt"

type Section = {
  heading: string
  intro?: string[]
  list?: string[]
  after?: string[]
  links?: { key: SecurityPageKey; label: string; desc: string }[]
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
        "Punkt kontaktowy OmniMES do zgłaszania podatności (support@omnimes.com): jak zgłosić problem bezpieczeństwa, jak obsługujemy zgłoszenia, terminy usuwania podatności i deklaracja braku działań prawnych wobec zgłaszających w dobrej wierze.",
      keywords:
        "OmniMES, zgłaszanie podatności, bezpieczeństwo, security.txt, RFC 9116, CRA, cyberbezpieczeństwo, MES, CVSS",
    },
    heading: "Zgłaszanie podatności",
    updated: "Data aktualizacji: 19 listopada 2026",
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
        heading: "Jak obsługujemy zgłoszenie",
        intro: ["Każde zgłoszenie trafia do naszego rejestru zgłoszeń bezpieczeństwa. Dalej:"],
        list: [
          "potwierdzamy otrzymanie zgłoszenia w ciągu 5 dni roboczych,",
          "sprawdzamy, czy podatność występuje, i oceniamy jej wagę w skali CVSS 3.1 (krytyczna, wysoka, średnia, niska),",
          "przygotowujemy poprawkę i wydajemy ją w najnowszej wersji OmniMES w terminach podanych niżej,",
          "po udostępnieniu poprawki publikujemy komunikat bezpieczeństwa i informujemy klientów, których podatność dotyczy.",
        ],
      },
      {
        heading: "Terminy usuwania podatności",
        intro: ["Termin liczymy od dnia, w którym potwierdzimy podatność:"],
        list: [
          "krytyczna (CVSS 9,0–10,0) — do 14 dni,",
          "wysoka (CVSS 7,0–8,9) — do 30 dni,",
          "średnia (CVSS 4,0–6,9) — do 90 dni,",
          "niska — w jednym z kolejnych planowych wydań.",
        ],
        after: [
          "Jeśli poprawka wymaga więcej czasu, na przykład zmiany komponentu innego producenta, w tym terminie przekażemy klientom sposób ograniczenia ryzyka do czasu wydania poprawki. Podatności znalezione w komponentach innych producentów zgłaszamy ich opiekunom.",
        ],
      },
      {
        heading: "Podatności wykorzystywane w atakach",
        intro: [
          "Jeśli dowiemy się, że podatność w OmniMES jest aktywnie wykorzystywana, albo wystąpi poważny incydent wpływający na bezpieczeństwo produktu, zgłaszamy to zgodnie z art. 14 Aktu o cyberodporności (CRA) — przez platformę zgłoszeń ENISA do CSIRT NASK (CERT Polska). Klientów, których to dotyczy, informujemy bez zbędnej zwłoki i przekazujemy im zalecane działania.",
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
          "potwierdzimy otrzymanie zgłoszenia i ocenimy je w terminach opisanych wyżej,",
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
      {
        heading: "Komunikaty bezpieczeństwa i okres wsparcia",
        links: [
          {
            key: "/security/advisories",
            label: "Komunikaty bezpieczeństwa",
            desc: "naprawione podatności: których wersji dotyczą, w której wersji je usunęliśmy i co należy zrobić.",
          },
          {
            key: "/security/support",
            label: "Okres wsparcia i aktualizacje",
            desc: "jak długo dostarczamy poprawki bezpieczeństwa i do kiedy wspierana jest każda wersja.",
          },
        ],
      },
    ],
    note: "OmniMES rozwija firma Multiprojekt Automatyka Sp. z o.o. Ten punkt kontaktowy jest zgodny z dobrymi praktykami zgłaszania podatności i odpowiada na wymóg jednego punktu kontaktowego do zgłaszania podatności z Aktu o cyberodporności (CRA).",
  },
  en: {
    meta: {
      title: "Vulnerability disclosure — OmniMES",
      description:
        "OmniMES security contact for reporting vulnerabilities (support@omnimes.com): how to report a security issue, how we handle reports, our remediation timelines and our commitment not to pursue good-faith researchers.",
      keywords:
        "OmniMES, vulnerability disclosure, security, security.txt, RFC 9116, CRA, cybersecurity, MES, CVSS",
    },
    heading: "Vulnerability disclosure",
    updated: "Last updated: 19 November 2026",
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
        heading: "How we handle a report",
        intro: ["Every report is entered in our security report register. Then we:"],
        list: [
          "acknowledge receipt within 5 business days,",
          "verify the vulnerability and rate its severity on the CVSS 3.1 scale (critical, high, medium, low),",
          "prepare a fix and ship it in the latest OmniMES version within the timelines below,",
          "once the fix is available, publish a security advisory and inform the customers affected.",
        ],
      },
      {
        heading: "Remediation timelines",
        intro: ["Timelines run from the day we confirm the vulnerability:"],
        list: [
          "critical (CVSS 9.0–10.0) — within 14 days,",
          "high (CVSS 7.0–8.9) — within 30 days,",
          "medium (CVSS 4.0–6.9) — within 90 days,",
          "low — in one of the next scheduled releases.",
        ],
        after: [
          "If a fix needs more time, for example because a third-party component must change, we will give customers a way to reduce the risk within that timeline, until the fix is released. Vulnerabilities we find in third-party components are reported to their maintainers.",
        ],
      },
      {
        heading: "Vulnerabilities exploited in attacks",
        intro: [
          "If we become aware that a vulnerability in OmniMES is being actively exploited, or of a severe incident affecting the security of the product, we notify it under Article 14 of the EU Cyber Resilience Act (CRA) — through the ENISA Single Reporting Platform to CSIRT NASK (CERT Polska). We inform the affected customers without undue delay and tell them what to do.",
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
          "acknowledging and assessing your report within the timelines described above,",
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
        after: [
          "If you are unsure whether something is in scope, contact us — we are happy to help.",
        ],
      },
      {
        heading: "Preferred languages",
        intro: ["We accept reports in Polish and English."],
      },
      {
        heading: "Security advisories and support period",
        links: [
          {
            key: "/security/advisories",
            label: "Security advisories",
            desc: "fixed vulnerabilities: which versions they affect, which version fixes them and what to do.",
          },
          {
            key: "/security/support",
            label: "Support period and updates",
            desc: "how long we deliver security fixes and until when each version is supported.",
          },
        ],
      },
    ],
    note: "OmniMES is developed by Multiprojekt Automatyka Sp. z o.o. This contact point follows good vulnerability-disclosure practice and addresses the single point of contact for vulnerability reporting required by the EU Cyber Resilience Act (CRA).",
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

      <SecurityNav locale={locale} current="/security" />

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
          {s.links && (
            <ul className="mb-2 list-disc text-left">
              {s.links.map((l) => (
                <li key={l.key} className="mb-1 ml-5 sm:ml-7">
                  <a
                    className="text-primary-500 font-medium hover:underline"
                    href={securityHref(locale, l.key)}
                  >
                    {l.label}
                  </a>{" "}
                  — {l.desc}
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
