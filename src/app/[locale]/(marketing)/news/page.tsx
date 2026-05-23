import { getLocalePrimaryDialects } from "@/data/locales"
import ListLayout from "@/layouts/ListLayout"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { OstDocument } from "outstatic"
import { load } from "outstatic/server"

import { genPageMetadata } from "@/app/seo"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "NewsMeta" })
  const title = t("title")
  const description = t("desc")
  const keywords = t("keywords")
  const localeShort = getLocalePrimaryDialects(locale)
  const obj = {
    title,
    description,
    keywords,
    localeShort,
    locale,
    path: "/news",
  }
  return genPageMetadata(obj)
}

async function getData(locale: string) {
  const db = await load()
  const allNews = await db
    .find<OstDocument>({ collection: "news", status: "published", lang: locale }, [
      "title",
      "publishedAt",
      "slug",
      "coverImage",
      "description",
      "author",
    ])
    .sort({ publishedAt: -1 })
    .limit(21)
    .toArray()

  return allNews
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const allNews = await getData(locale)
  const t = await getTranslations({ locale, namespace: "NewsMeta" })

  return (
    <ListLayout
      posts={allNews}
      initialDisplayPosts={allNews}
      title={t("title")}
    />
  )
}
