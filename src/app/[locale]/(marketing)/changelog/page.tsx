import { changelog, roadmap, type ChangeCategory } from "@/data/changelog"
import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { LuFlaskConical } from "react-icons/lu"

import { genPageMetadata } from "@/app/seo"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "ChangelogMeta" })
  const title = t("title")
  const description = t("desc")
  const keywords = t("keywords")
  const localeShort = getLocalePrimaryDialects(locale)
  return genPageMetadata({
    title,
    description,
    keywords,
    localeShort,
    locale,
    path: "/changelog",
  })
}

const CATEGORY_STYLES: Record<ChangeCategory, { badge: string; dot: string }> = {
  added: {
    badge: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  changed: {
    badge: "bg-sky-500/10 text-sky-700 border-sky-500/30 dark:text-sky-300",
    dot: "bg-sky-500",
  },
  fixed: {
    badge: "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  security: {
    badge: "bg-rose-500/10 text-rose-700 border-rose-500/30 dark:text-rose-300",
    dot: "bg-rose-500",
  },
}

function formatDate(iso: string, locale: string) {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  } catch {
    return iso
  }
}

const DOCS_URL: Record<"pl" | "en", string> = {
  pl: "https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/wstep-XMdRkBsh9c",
  en: "https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/introduction-98dAKUj3hP",
}

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("ChangelogPage")
  const lang: "pl" | "en" = locale === "en" ? "en" : "pl"
  const releases = changelog[lang]
  const upcoming = roadmap[lang]
  const latest = releases[0]
  const docsUrl = DOCS_URL[lang]

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-14">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-pink-600 dark:text-pink-400">
          {t("eyebrow")}
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-50">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400">
          {t("subtitle")}
        </p>
        {latest && (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono text-xs dark:border-neutral-800 dark:bg-neutral-900">
              <span className="size-2 rounded-full bg-emerald-500" />
              {t("current")}: v{latest.version}
            </span>
            <span className="font-mono text-xs">{formatDate(latest.date, locale)}</span>
          </div>
        )}
      </header>

      <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
        {/* LEFT COLUMN — released timeline */}
        <section className="lg:col-span-2">
          <div className="mb-6 flex items-baseline justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
              {t("releasedTitle")}
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {t("releasedBadge")}
            </span>
          </div>

          <ol className="relative space-y-14 border-l-2 border-neutral-200 pl-8 sm:pl-12 dark:border-neutral-800">
            {releases.map((release, i) => (
              <li key={release.version} className="relative">
                <span
                  aria-hidden
                  className="absolute left-0 top-2 -ml-8 flex size-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-pink-500 sm:-ml-12 dark:border-neutral-950"
                />

                <div className="mb-5 flex flex-wrap items-baseline gap-3">
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                    v{release.version}
                  </h3>
                  <time
                    dateTime={release.date}
                    className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                  >
                    {formatDate(release.date, locale)}
                  </time>
                  {i === 0 && (
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      {t("latest")}
                    </span>
                  )}
                </div>

                <ul className="space-y-4">
                  {release.entries.map((entry, j) => {
                    const styles = CATEGORY_STYLES[entry.category]
                    return (
                      <li
                        key={j}
                        className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-neutral-700"
                      >
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${styles.badge}`}
                          >
                            <span className={`size-1.5 rounded-full ${styles.dot}`} />
                            {t(`category.${entry.category}`)}
                          </span>
                          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {entry.scope}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                          {entry.body}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* RIGHT COLUMN — roadmap / upcoming */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <div className="mb-6 flex items-baseline justify-between border-b border-dashed border-violet-300 pb-3 dark:border-violet-700/60">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">
                {t("roadmapTitle")}
              </h2>
              <span className="rounded-full bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-violet-700 dark:text-violet-300">
                {t("roadmapBadge")}
              </span>
            </div>

            <p className="mb-5 text-xs italic leading-relaxed text-neutral-500 dark:text-neutral-400">
              {t("roadmapDisclaimer")}
            </p>

            {upcoming.length === 0 ? (
              <p className="rounded-xl border border-dashed border-neutral-300 p-5 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                {t("roadmapEmpty")}
              </p>
            ) : (
              <ul className="space-y-4">
                {upcoming.map((item, i) => (
                  <li
                    key={i}
                    className="relative overflow-hidden rounded-xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5 shadow-sm dark:border-violet-800/60 dark:from-violet-950/40 dark:to-neutral-900/40"
                  >
                    <div className="mb-3 flex items-start gap-2">
                      <LuFlaskConical
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 text-violet-600 dark:text-violet-400"
                      />
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {item.scope}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {item.body}
                    </p>
                    {item.eta && (
                      <div className="mt-4 border-t border-violet-200/60 pt-3 dark:border-violet-800/40">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-violet-700 dark:text-violet-300">
                          {t("roadmapEta")}: {item.eta}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      <footer className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-400">
        <p className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100">
          {t("footerTitle")}
        </p>
        <p className="leading-relaxed">{t("footerText")}</p>
        <p className="mt-3 leading-relaxed">
          {t("footerDocsPrompt")}{" "}
          <a
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-pink-600 underline decoration-pink-300/60 underline-offset-4 transition-colors hover:text-pink-500 hover:decoration-pink-500 dark:text-pink-400 dark:decoration-pink-400/40 dark:hover:decoration-pink-300"
          >
            {t("footerDocsLabel")}
          </a>
          .
        </p>
      </footer>
    </main>
  )
}
