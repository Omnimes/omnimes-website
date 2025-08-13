import { getLocalePrimaryDialects } from "@/data/locales"
import ListLayout from "@/layouts/ListLayout"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { OstDocument } from "outstatic"
import { getDocuments, load } from "outstatic/server"

import { genPageMetadata } from "@/app/seo"
import { generateSearchJSON } from "@/lib/generateSearchJSON"

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
  const db = await load();
  const AllCourses = await db
    .find<ExtendedOstDocument>(
      { collection: "courses", status: "published" },
      ["title", "slug", "description", "lang", "tags"]
    )
    .sort({ publishedAt: -1 })
    .toArray();

  const docs = AllCourses.map((d) => ({
    ...d,
    tags: "" // Tymczasowo wyłącz tags żeby sprawdzić czy reszta działa
  }));

  await generateSearchJSON(docs);
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
    <ListLayout
      posts={allCourses} // ListLayout może używać nazwy "posts" – struktura ta sama
      initialDisplayPosts={allCourses}
      pagination={pagination}
      title={t("title")} // np. "Kursy" / "Courses"
    />
  )
}
