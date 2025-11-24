import { getLocalePrimaryDialects } from "@/data/locales"
import ListLayout from "@/layouts/ListLayout"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { OstDocument } from "outstatic"
import { getDocuments, load } from "outstatic/server"

import { generateSearchJSON } from "@/lib/generateSearchJSON"
import { DirectContact } from "@/components/DirectContact"
import { genPageMetadata } from "@/app/seo"

export type ExtendedOstDocument = OstDocument & {
  tags: { value: string; label: string }[]
}

export const revalidate = 3600

/** SEO */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const title = t("courses_title") // <-- dodaj te klucze w i18n
  const description = t("courses_desc")
  const keywords = t("courses_keywords")
  const localeShort = getLocalePrimaryDialects(locale)

  return genPageMetadata({ title, description, keywords, localeShort })
}

/** DB: lista kursów dla danego języka */
async function getData(locale: string) {
  const db = await load()
  const allCourses = await db
    .find<ExtendedOstDocument>({ collection: "courses", status: "published", lang: locale }, [
      "title",
      "publishedAt",
      "slug",
      "description",
      "author",
      "tags",
      "coverImage",
    ])
    .sort({ publishedAt: -1 })
    .limit(20)
    .toArray()

  const total = getDocuments("courses", ["lang"]).filter(
    (doc) => doc.status === "published" && doc.lang === locale
  ).length

  return { allCourses, total }
}

/** Search JSON (jeśli używasz wewnętrznego searcha) */
/** Search JSON (jeśli używasz wewnętrznego searcha) */
async function getDataToSearch() {
  const db = await load()
  const AllCourses = await db
    .find<ExtendedOstDocument>({ collection: "courses", status: "published" }, [
      "title",
      "slug",
      "description",
      "lang",
      "tags",
      "coverImage",
    ])
    .sort({ publishedAt: -1 })
    .toArray()

  const docs = AllCourses.map((d) => ({
    ...d,
    tags: "", // Tymczasowo wyłącz tags żeby sprawdzić czy reszta działa
  }))

  await generateSearchJSON(docs)
}

/** Strona listy kursów */
export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  await getDataToSearch()
  const { allCourses, total } = await getData(locale)

  const t = await getTranslations("Courses") // <-- dodaj namespace "Courses" w i18n
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(total / 20),
  }

  return (
    <>
      {/* GÓRA: lista kursów / DirectContact */}
      {allCourses.length === 0 ? (
        <DirectContact />
      ) : (
        <ListLayout
          posts={allCourses}
          initialDisplayPosts={allCourses}
          pagination={pagination}
          title={t("title")}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <div className="mb-12 mt-5 rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"> */}
        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t("intro_title")}
        </h2>
        <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {t("intro_description")}
        </p>
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="mb-4 flex items-center gap-2">
              <svg
                className="size-5 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {t("upcoming_dates")}
              </h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-blue-600 dark:text-blue-400">•</span>
                <span>{t("date_1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-blue-600 dark:text-blue-400">•</span>
                <span>{t("date_2")}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="mb-4 flex items-center gap-2">
              <svg
                className="size-5 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {t("duration_label")}
              </h3>
            </div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {t("duration_value")}
            </p>
          </div>
        </div>
        <div className="mb-6 flex justify-center">
          <a
            href="https://forms.gle/DYJgiaAbv6bvmoaP6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            {t("registration_link")}
          </a>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
            {t("scope_title")}:
          </h3>
          <ul className="grid gap-2 md:grid-cols-2">
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="mt-1 text-blue-600 dark:text-blue-400">✓</span>
              <span>{t("scope_1")}</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="mt-1 text-blue-600 dark:text-blue-400">✓</span>
              <span>{t("scope_2")}</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="mt-1 text-blue-600 dark:text-blue-400">✓</span>
              <span>{t("scope_3")}</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="mt-1 text-blue-600 dark:text-blue-400">✓</span>
              <span>{t("scope_4")}</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="mt-1 text-blue-600 dark:text-blue-400">✓</span>
              <span>{t("scope_5")}</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="mt-1 text-blue-600 dark:text-blue-400">✓</span>
              <span>{t("scope_6")}</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="mt-1 text-blue-600 dark:text-blue-400">✓</span>
              <span>{t("scope_7")}</span>
            </li>
          </ul>
        </div>
        <div className="mt-6 rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4 dark:border-blue-400 dark:bg-gray-800">
          <div className="flex items-start gap-3">
            <svg
              className="mt-1 size-5 shrink-0 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {t("no_date_title")}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{t("no_date_description")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
