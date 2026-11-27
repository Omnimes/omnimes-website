import { useTranslations } from "next-intl"
import { FaArrowRight, FaChevronDown } from "react-icons/fa"

import Link from "@/components/LocaleLink"

import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"

// BO-1439: najczęstsze pytania na stronie głównej — widoczne dla czytelnika i opisane
// danymi strukturalnymi FAQPage (renderowane na serwerze, więc roboty widzą je bez JS).
const COUNT = 7

export const HomeFaq = () => {
  const t = useTranslations("HomeFaq")
  const items = Array.from({ length: COUNT }, (_, i) => ({
    q: t(`q${i + 1}`),
    a: t(`a${i + 1}`),
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }

  return (
    <section
      id="faq"
      className="mx-auto max-w-4xl scroll-mt-20 py-16"
      aria-labelledby="faq-heading"
    >
      <div className="mb-8 md:text-center">
        <SubtitleNormal text={t("smallSubtitle")} />
        <div id="faq-heading">
          <Heading text={t("heading")} />
        </div>
      </div>
      <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
        {items.map(({ q, a }) => (
          <details key={q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-gray-900 dark:text-white">
              <h3>{q}</h3>
              <FaChevronDown className="shrink-0 text-sm text-pink-500 transition group-open:rotate-180" />
            </summary>
            <p className="text-default-600 dark:text-default-500 mt-3 text-base leading-relaxed">
              {a}
            </p>
          </details>
        ))}
      </div>
      <div className="mt-6 md:text-center">
        <Link
          href="/faq"
          className="text-primary-500 hover:text-primary-600 inline-flex items-center gap-2 text-base font-semibold"
        >
          {t("more")}
          <FaArrowRight className="text-sm" />
        </Link>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  )
}
