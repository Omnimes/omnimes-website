// src/app/[locale]/(marketing)/omnienergy/page.tsx
// BO-1439: server component — the page HTML comes from the server, only the
// screenshot zoom (ZoomableImage) runs in the browser.
import { siteMetadata } from "@/data/siteMetadata"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { localizeHref } from "@/lib/localizeHref"
import Link from "@/components/LocaleLink"

import ZoomableImage from "./ZoomableImage"

type T = Awaited<ReturnType<typeof getTranslations>>

type Benefit = {
  title: string
  description: string
  how: string
  value: string
  label: string
}
type NewsItem = { version: string; title: string; body: string }
type Requirement = { number: string; title: string; description: string }
type TechItem = { title: string; body: string }

const ICONS = {
  chart:
    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  bolt: "M13 10V3L4 14h7v7l9-11h-7z",
  trend: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  target:
    "M12 21a9 9 0 100-18 9 9 0 000 18zm0-4a5 5 0 100-10 5 5 0 000 10zm0-4a1 1 0 100-2 1 1 0 000 2z",
  doc: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  calendar:
    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  money:
    "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  leaf: "M5 19c8 0 14-6 14-14C11 5 5 11 5 19zm0 0l7-7",
  layers: "M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5m-18 4l9 5 9-5",
  factory: "M3 21V10l6 3V10l6 3V6l6 3v12H3zm4-4h2m4 0h2",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
} as const

function Icon({ d, className = "size-6" }: { d: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    </svg>
  )
}

function CheckList({ items, small }: { items: string[]; small?: boolean }) {
  return (
    <ul className={small ? "mt-auto space-y-2" : "space-y-3"}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <Icon
            d="M5 13l4 4L19 7"
            className="mt-0.5 size-5 shrink-0 text-emerald-500 dark:text-emerald-400"
          />
          <span className={`${small ? "text-sm" : ""} text-gray-700 dark:text-neutral-300`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

function SectionHead({
  title,
  description,
  badge,
}: {
  title: string
  description: string
  badge?: string
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      {badge && (
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm font-medium text-emerald-700 dark:border-emerald-800/60 dark:bg-neutral-900 dark:text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          {badge}
        </p>
      )}
      <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-neutral-50">
        {title}
      </h2>
      <p className="text-lg text-gray-600 md:text-xl dark:text-neutral-400">{description}</p>
    </div>
  )
}

const FEATURE_KEYS: { key: string; icon: string }[] = [
  { key: "dashboard", icon: ICONS.chart },
  { key: "sources", icon: ICONS.layers },
  { key: "analysis", icon: ICONS.search },
  { key: "enpi", icon: ICONS.trend },
  { key: "enb", icon: ICONS.calendar },
  { key: "goals", icon: ICONS.target },
  { key: "seu", icon: ICONS.bolt },
  { key: "tariffs", icon: ICONS.money },
  { key: "emissions", icon: ICONS.leaf },
  { key: "production", icon: ICONS.factory },
  { key: "audits", icon: ICONS.check },
  { key: "documentation", icon: ICONS.doc },
]

const BENEFIT_ICONS = [
  ICONS.money,
  ICONS.factory,
  ICONS.search,
  ICONS.check,
  ICONS.leaf,
  ICONS.trend,
]

const SCREENS = [
  { key: "sources", src: "/screenshots/omnienergy-details.webp", w: 1437, h: 891 },
  { key: "report", src: "/screenshots/omnienergy-report.webp", w: 1267, h: 897 },
  { key: "summary", src: "/screenshots/omnienergy-summary.webp", w: 1238, h: 548 },
  { key: "timeComparison", src: "", w: 1446, h: 903, badge: true },
]

export default async function OmniEnergyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "OmniEnergy" })

  const pageUrl = `${siteMetadata.siteUrl}${localizeHref("/omnienergy", locale)}`
  const homeUrl = `${siteMetadata.siteUrl}${localizeHref("/", locale)}`
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "OmniEnergy",
      alternateName: "OmniMES OmniEnergy",
      applicationCategory: "BusinessApplication",
      applicationSubCategory:
        locale === "pl" ? "System zarządzania energią (EnMS)" : "Energy management system (EnMS)",
      operatingSystem: "Web, Linux, Windows",
      softwareVersion: "5.1",
      description: t("intro"),
      url: pageUrl,
      image: `${siteMetadata.siteUrl}/screenshots/omnienergy-dashboard.webp`,
      inLanguage: locale,
      isPartOf: { "@type": "SoftwareApplication", name: "OmniMES", url: homeUrl },
      featureList: FEATURE_KEYS.map(({ key }) => t(`features.${key}.title`)).join(", "),
      publisher: { "@id": `${siteMetadata.siteUrl}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t("breadcrumbHome"), item: homeUrl },
        { "@type": "ListItem", position: 2, name: "OmniEnergy", item: pageUrl },
      ],
    },
  ]

  const timeComparisonSrc =
    locale === "en"
      ? "/screenshots/omnienergy-time-comparison-en.webp"
      : "/screenshots/omnienergy-time-comparison-pl.webp"

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="relative mx-4 my-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-16 md:py-20 dark:from-emerald-950/40 dark:via-green-950/30 dark:to-teal-950/40">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 dark:border-emerald-800/60 dark:bg-neutral-900/60">
                <span className="size-2 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none" />
                <span className="font-medium text-emerald-700 dark:text-emerald-300">
                  {t("hero.badge")}
                </span>
              </p>

              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                <span className="text-gray-900 dark:text-neutral-50">{t("hero.title")}</span>{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
                  {t("hero.titleHighlight")}
                </span>
              </h1>

              <p className="text-lg leading-relaxed text-gray-600 md:text-xl dark:text-neutral-300">
                {t("hero.description")}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-4 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  {t("hero.ctaPrimary")}
                  <Icon d="M17 8l4 4m0 0l-4 4m4-4H3" className="size-5" />
                </Link>
                <a
                  href="#korzysci"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-200 bg-white px-8 py-4 font-semibold text-emerald-700 transition-colors duration-300 hover:border-emerald-400 dark:border-emerald-800/60 dark:bg-neutral-900 dark:text-emerald-300 dark:hover:border-emerald-500"
                >
                  {t("hero.ctaSecondary")}
                </a>
              </div>

              <ul className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
                {[t("hero.features.iso"), t("hero.features.reduction")].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 font-medium text-gray-700 dark:text-neutral-300"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300">
                      <Icon d="M5 13l4 4L19 7" className="size-5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border-4 border-white shadow-2xl dark:border-neutral-800">
                <ZoomableImage
                  src="/screenshots/omnienergy-dashboard.webp"
                  alt={t("hero.imageAlt")}
                  width={1618}
                  height={813}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  zoomLabel={t("screens.zoom")}
                  closeLabel={t("screens.close")}
                  priority
                />
              </div>
              <dl className="grid grid-cols-3 gap-3">
                {(["monitoring", "savings", "enpi"] as const).map((k) => (
                  <div
                    key={k}
                    className="rounded-2xl border border-emerald-100 bg-white/80 p-4 dark:border-emerald-800/60 dark:bg-neutral-900/60"
                  >
                    <dt className="text-xs leading-snug text-gray-600 dark:text-neutral-400">
                      {t(`hero.stats.${k}.label`)}
                    </dt>
                    <dd className="mt-1 text-xl font-bold text-emerald-600 md:text-2xl dark:text-emerald-300">
                      {t(`hero.stats.${k}.value`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Business benefits first, technology in one line each */}
      <section id="korzysci" className="scroll-mt-24 py-20">
        <div className="container mx-auto px-4">
          <SectionHead
            title={t("benefits.sectionTitle")}
            description={t("benefits.sectionDescription")}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(t.raw("benefits.items") as Benefit[]).map((b, i) => (
              <article
                key={b.title}
                className="flex flex-col rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-7 dark:border-emerald-800/60 dark:from-emerald-950/40 dark:to-green-950/40"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-300">
                    <Icon d={BENEFIT_ICONS[i % BENEFIT_ICONS.length]} />
                  </span>
                  <span className="text-right">
                    <span className="block text-xl font-bold text-emerald-600 dark:text-emerald-300">
                      {b.value}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-neutral-400">
                      {b.label}
                    </span>
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-neutral-100">
                  {b.title}
                </h3>
                <p className="mb-4 text-gray-600 dark:text-neutral-300">{b.description}</p>
                <p className="mt-auto border-t border-emerald-200/70 pt-3 text-sm text-gray-600 dark:border-emerald-800/50 dark:text-neutral-400">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                    {t("benefits.howLabel")}:{" "}
                  </span>
                  {b.how}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What's new */}
      <section className="mx-4 my-8 rounded-3xl bg-gradient-to-br from-emerald-50/60 to-teal-50/60 py-20 dark:from-emerald-950/30 dark:to-teal-950/30">
        <div className="container mx-auto px-4">
          <SectionHead
            badge={t("news.badge")}
            title={t("news.sectionTitle")}
            description={t("news.sectionDescription")}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(t.raw("news.items") as NewsItem[]).map((n) => (
              <article
                key={n.title}
                className="rounded-2xl border border-emerald-100 bg-white p-5 dark:border-emerald-800/50 dark:bg-neutral-900/70"
              >
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  {locale === "pl" ? "Wersja" : "Version"} {n.version}
                </p>
                <h3 className="mb-2 font-bold text-gray-900 dark:text-neutral-100">{n.title}</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">{n.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link
              href="/changelog"
              className="font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-300"
            >
              {t("news.changelogLink")} →
            </Link>
          </p>
        </div>
      </section>

      {/* All modules */}
      <section id="features" className="scroll-mt-24 py-20">
        <div className="container mx-auto px-4">
          <SectionHead
            title={t("features.sectionTitle")}
            description={t("features.sectionDescription")}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURE_KEYS.map(({ key, icon }) => (
              <article
                key={key}
                className="flex flex-col rounded-3xl border border-gray-200 bg-white p-7 transition-shadow hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/60"
              >
                <span className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-300">
                  <Icon d={icon} className="size-7" />
                </span>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-neutral-100">
                  {t(`features.${key}.title`)}
                </h3>
                <p className="mb-4 text-gray-600 dark:text-neutral-400">
                  {t(`features.${key}.description`)}
                </p>
                <CheckList small items={t.raw(`features.${key}.items`) as string[]} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ISO 50001 */}
      <section className="mx-4 my-8 rounded-3xl bg-gradient-to-br from-emerald-50/60 to-green-50/60 py-20 dark:from-emerald-950/30 dark:to-green-950/30">
        <div className="container mx-auto px-4">
          <SectionHead
            badge={t("iso50001.badge")}
            title={t("iso50001.sectionTitle")}
            description={t("iso50001.sectionDescription")}
          />
          <ol className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(t.raw("iso50001.requirements") as Requirement[]).map((r) => (
              <li
                key={r.number}
                className="rounded-2xl border border-emerald-100 bg-white p-6 dark:border-emerald-800/50 dark:bg-neutral-900/70"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 font-bold text-white">
                    {r.number}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-neutral-100">
                    {r.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-neutral-400">{r.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Screenshots */}
      <section id="demo" className="scroll-mt-24 py-20">
        <div className="container mx-auto px-4">
          <SectionHead
            title={t("screens.sectionTitle")}
            description={t("screens.sectionDescription")}
          />
          <div className="space-y-20">
            {SCREENS.map((s, i) => {
              const textFirst = i % 2 === 0
              const name = t(`modules.${s.key}.name`)
              return (
                <div key={s.key} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                  <div className={textFirst ? "order-2 lg:order-1" : "order-2"}>
                    <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-8 dark:border-emerald-800/60 dark:from-emerald-950/40 dark:to-green-950/40">
                      {s.badge && (
                        <p className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          {t(`modules.${s.key}.badge`)}
                        </p>
                      )}
                      <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-neutral-100">
                        {name}
                      </h3>
                      <p className="mb-6 text-gray-600 dark:text-neutral-300">
                        {t(`modules.${s.key}.description`)}
                      </p>
                      <CheckList items={t.raw(`modules.${s.key}.features`) as string[]} />
                    </div>
                  </div>
                  <div className={textFirst ? "order-1 lg:order-2" : "order-1"}>
                    <div className="overflow-hidden rounded-3xl border-4 border-emerald-100 shadow-2xl dark:border-emerald-800/60">
                      <ZoomableImage
                        src={s.src || timeComparisonSrc}
                        alt={`${name} — ${t(`modules.${s.key}.description`)}`}
                        width={s.w}
                        height={s.h}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        zoomLabel={t("screens.zoom")}
                        closeLabel={t("screens.close")}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technology in brief */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHead title={t("tech.sectionTitle")} description={t("tech.sectionDescription")} />
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {(t.raw("tech.items") as TechItem[]).map((it) => (
              <article
                key={it.title}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/60"
              >
                <h3 className="mb-2 font-bold text-gray-900 dark:text-neutral-100">{it.title}</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">{it.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RoiSection t={t} />

      {/* CTA */}
      <section className="mx-4 my-8 rounded-3xl bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">{t("cta.title")}</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-emerald-50 md:text-xl">
              {t("cta.description")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-lg font-bold text-emerald-700 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {t("cta.ctaPrimary")}
                <Icon d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 bg-white/10 px-10 py-5 text-lg font-bold text-white transition-transform duration-300 hover:scale-105 hover:border-white hover:bg-white/20"
              >
                {t("cta.ctaDemo")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function RoiSection({ t }: { t: T }) {
  return (
    <section className="mx-4 my-8 rounded-3xl bg-gradient-to-br from-emerald-50/60 to-green-50/60 py-20 dark:from-emerald-950/30 dark:to-green-950/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={t("roi.title")} description={t("roi.description")} />

          <div className="mb-8 rounded-2xl border border-emerald-100 bg-white p-5 text-center dark:border-emerald-800/50 dark:bg-neutral-900/70">
            <span className="mr-2 font-semibold text-gray-700 dark:text-neutral-300">
              {t("roi.formula.label")}:
            </span>
            <code className="font-mono text-emerald-700 dark:text-emerald-300">
              {t("roi.formula.text")}
            </code>
          </div>

          <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-neutral-100">
            {t("roi.example.title")}
          </h3>

          <div className="grid gap-6 md:grid-cols-3">
            {(["investment", "savings"] as const).map((k) => (
              <div
                key={k}
                className="rounded-2xl border border-emerald-100 bg-white p-6 dark:border-emerald-800/50 dark:bg-neutral-900/70"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-neutral-400">
                  {t(`roi.example.${k}.label`)}
                </p>
                <p className="mb-4 text-3xl font-bold text-gray-900 dark:text-neutral-50">
                  {t(`roi.example.${k}.value`)}
                </p>
                <CheckList small items={t.raw(`roi.example.${k}.items`) as string[]} />
              </div>
            ))}
            <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 p-6 text-white">
              <p className="text-sm font-medium text-emerald-50">{t("roi.example.result.label")}</p>
              <p className="mb-3 text-6xl font-bold">{t("roi.example.result.value")}</p>
              <p className="text-sm text-emerald-50">{t("roi.example.result.description")}</p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-neutral-400">
            {t("roi.disclaimer")}
          </p>
        </div>
      </div>
    </section>
  )
}
