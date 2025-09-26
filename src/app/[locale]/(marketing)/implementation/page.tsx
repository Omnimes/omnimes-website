import { getLocalePrimaryDialects } from "@/data/locales"
import ListImplementation from "@/layouts/ListImplementation"
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
  const title = t("implementation_title") // <-- dodaj te klucze w i18n
  const description = t("implementation_desc")
  const keywords = t("implementation_keywords")
  const localeShort = getLocalePrimaryDialects(locale)

  return genPageMetadata({ title, description, keywords, localeShort })
}

/** DB: lista kursów dla danego języka */
async function getData(locale: string) {
  const db = await load()
  const allimplementation = await db
    .find<ExtendedOstDocument>(
      { collection: "implementation", status: "published", lang: locale },
      ["title", "publishedAt", "slug", "description", "author", "tags", "coverImage"]
    )
    .sort({ publishedAt: -1 })
    .limit(20)
    .toArray()

  const total = getDocuments("implementation", ["lang"]).filter(
    (doc) => doc.status === "published" && doc.lang === locale
  ).length

  return { allimplementation, total }
}

/** Search JSON (jeśli używasz wewnętrznego searcha) */
/** Search JSON (jeśli używasz wewnętrznego searcha) */
async function getDataToSearch() {
  const db = await load()
  const Allimplementation = await db
    .find<ExtendedOstDocument>({ collection: "implementation", status: "published" }, [
      "title",
      "slug",
      "description",
      "lang",
      "tags",
      "coverImage"
    ])
    .sort({ publishedAt: -1 })
    .toArray()

  const docs = Allimplementation.map((d) => ({
    ...d,
    tags: "", // Tymczasowo wyłącz tags żeby sprawdzić czy reszta działa
  }))

  await generateSearchJSON(docs)
}

/** Strona listy kursów */
export default async function implementationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  await getDataToSearch()
  const { allimplementation, total } = await getData(locale)

  const t = await getTranslations("Implementation") // <-- dodaj namespace "implementation" w i18n
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(total / 20),
  }

  return (
    <ListImplementation
      posts={allimplementation} // ListImplementation może używać nazwy "posts" – struktura ta sama
      initialDisplayPosts={allimplementation}
      pagination={pagination}
      title={t("title")} // np. "Kursy" / "implementation"
    />
  )
}
