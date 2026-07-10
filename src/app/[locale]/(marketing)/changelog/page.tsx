import { changelog, type ChangeCategory } from "@/data/changelog"
import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"

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

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("ChangelogPage")
  const releases = changelog[locale === "en" ? "en" : "pl"]
  const latest = releases[0]

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-14">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-pink-600 dark:text-pink-400">
          {t("eyebrow")}
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-50">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400">
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

      <ol className="relative space-y-14 border-l border-neutral-200 pl-6 sm:pl-10 dark:border-neutral-800">
        {releases.map((release, i) => (
          <li key={release.version} className="relative">
            <span
              aria-hidden
              className="absolute -left-[calc(0.75rem+1px)] top-1 flex size-6 items-center justify-center rounded-full border-4 border-white bg-neutral-900 sm:-left-[calc(1.25rem+1px)] dark:border-neutral-950 dark:bg-neutral-100"
            >
              <span className="size-2 rounded-full bg-white dark:bg-neutral-900" />
            </span>

            <div className="mb-5 flex flex-wrap items-baseline gap-3">
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                v{release.version}
              </h2>
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

      <footer className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-400">
        <p className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100">
          {t("footerTitle")}
        </p>
        <p className="leading-relaxed">{t("footerText")}</p>
      </footer>
    </main>
  )
}
