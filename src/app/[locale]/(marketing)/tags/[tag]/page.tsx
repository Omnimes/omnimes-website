import { Metadata } from "next"
import { getLocalePrimaryDialects } from "@/data/locales"
import ListLayout from "@/layouts/ListLayoutWithTags"
import { slug } from "github-slugger"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getDocuments, load } from "outstatic/server"

import { genPageMetadata } from "@/app/seo"

import { ExtendedOstDocument } from "../../blog/page"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}): Promise<Metadata> {
  const { locale, tag } = await params
  const t = await getTranslations({ locale, namespace: "Tag" })
  const title = t("title", { tag: decodeURIComponent(tag) })
  const description = t("desc", { tag: decodeURIComponent(tag) })
  const keywords = t("keywords", { tag: decodeURIComponent(tag) })
  const localeShort = getLocalePrimaryDialects(locale)
  const obj = {
    title,
    description,
    keywords,
    localeShort,
  }
  return genPageMetadata(obj)
}

export const generateStaticParams = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  const tags = (await getDataTags(locale)) as { value: string; label: string; count: number }[]
  if (!tags) return []

  const staticParams = tags.map((tag) => ({
    tag: slug(tag.label),
    locale,
  }))

  return staticParams
}

async function getDataTags(locale: string) {
  const posts = getDocuments("posts", ["lang", "tags"])

  if (!posts || posts.length == 0 || posts === undefined) return undefined

  const localePosts = posts.filter((post) => post.lang == locale).map((post) => post.tags)
  const tagCounts = {} as Record<string, { value: string; label: string; count: number }>

  if (localePosts.length > 0) {
    localePosts.forEach((tagsArray) => {
      if (Array.isArray(tagsArray)) {
        tagsArray.forEach((tagObj) => {
          const keyword = tagObj.value
          if (tagCounts[keyword]) {
            tagCounts[keyword].count += 1
          } else {
            tagCounts[keyword] = { value: tagObj.value, label: tagObj.label, count: 1 }
          }
        })
      }
    })
  }

  return Object.values(tagCounts)
}

async function getData(locale: string, tagParams: string) {
  const db = await load()
  const posts = await db
    .find<ExtendedOstDocument>({ collection: "posts", lang: locale }, [
      "title",
      "publishedAt",
      "description",
      "slug",
      "tags",
    ])
    .sort({ publishedAt: -1 })
    .toArray()

  if (!posts) return undefined
  return posts.filter((post) =>
    post.tags.some((tag) => slug(tag.label) == slug(decodeURIComponent(tagParams)))
  )
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}) {
  const { locale, tag } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Tag")
  const tags = (await getDataTags(locale)) as { value: string; label: string; count: number }[]
  if (tags?.length == 0 || !tags) return <p className="mt-10 text-center">{t("notFound")}</p>
  const posts = await getData(locale, tag)
  if (posts?.length == 0 || !posts) return <p className="mt-10 text-center">{t("notFound")}</p>

  return <ListLayout posts={posts} tags={tags} tag={tag} />
}
