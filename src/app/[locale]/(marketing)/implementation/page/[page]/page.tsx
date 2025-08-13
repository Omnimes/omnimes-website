import { getLocalePrimaryDialects } from "@/data/locales"
import ListLayout from "@/layouts/ListLayout"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getDocuments, load } from "outstatic/server"

import { genPageMetadata } from "@/app/seo"

import { ExtendedOstDocument } from "../../page"

export const generateStaticParams = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const implementation = getDocuments("implementation", ["lang"]) // ⬅ zmiana
  if (!implementation || implementation.length === 0) {
    return []
  }
  const localeimplementation = implementation.filter((c) => c.lang === locale)
  const totalPages = Math.ceil(localeimplementation.length / 10)
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const title = t("implementation_title") // ⬅ zmiana
  const description = t("implementation_desc") // ⬅ zmiana
  const keywords = t("implementation_keywords") // ⬅ zmiana
  const localeShort = getLocalePrimaryDialects(locale)

  return genPageMetadata({ title, description, keywords, localeShort })
}

async function getData(locale: string, page: string) {
  const db = await load()
  const allimplementation = await db
    .find<ExtendedOstDocument>(
      { collection: "implementation", status: "published", lang: locale },
      ["title", "publishedAt", "slug", "coverImage", "description", "author", "tags"]
    )
    .sort({ publishedAt: -1 })
    .skip((Number(page) - 1) * 20)
    .limit(20)
    .toArray()

  const implementationLength = getDocuments("implementation", ["lang"]) // ⬅ zmiana
    .filter((c) => c.status === "published" && c.lang === locale).length

  return { allimplementation, implementationLength }
}

export default async function implementationPagePage({
  params,
}: {
  params: Promise<{ page: string; locale: string }>
}) {
  const resolvedParams = await params
  const { locale, page } = resolvedParams
  setRequestLocale(locale)

  const t = await getTranslations("implementation") // ⬅ zmiana
  const { allimplementation, implementationLength } = await getData(locale, page)

  if (!allimplementation || allimplementation.length === 0)
    return <p className="mt-10 text-center">{t("NotFound")}</p>

  const pageNumber = parseInt(page as string)

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(implementationLength / 20),
  }

  return (
    <ListLayout
      posts={allimplementation}
      initialDisplayPosts={allimplementation}
      pagination={pagination}
      title={t("title")}
    />
  )
}
