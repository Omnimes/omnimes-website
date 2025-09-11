import { getLocalePrimaryDialects } from "@/data/locales"
import ListLayout from "@/layouts/ListLayout"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { OstDocument } from "outstatic"
import { getDocuments, load } from "outstatic/server"

import { genPageMetadata } from "@/app/seo"
import { generateSearchJSON } from "@/lib/generateSearchJSON"

export type ExtendedOstDocument = OstDocument & { tags: { value: string; label: string }[] }
export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const title = t("blog_title")
  const description = t("blog_desc")
  const keywords = t("blog_keywords")
  const localeShort = getLocalePrimaryDialects(locale)
  const obj = {
    title,
    description,
    keywords,
    localeShort,
  }
  return genPageMetadata(obj)
}

async function getData(locale: string) {
  const db = await load()
  const allPosts = await db
    .find<ExtendedOstDocument>({ collection: "posts", status: "published", lang: locale }, [
      "title",
      "publishedAt",
      "slug",
      "description",
      "author",
      "tags",
      "coverImage",
    ])
    .sort({ publishedAt: -1 })
    .limit(21)
    .toArray()

  const postsLength = getDocuments("posts", ["lang"])
    .filter((post) => post.status == "published")
    .filter((post) => post.lang == locale).length

  return {
    allPosts,
    postsLength,
  }
}

async function getDataToSearch() {
  const db = await load()
  const AllPosts = await db
    .find<ExtendedOstDocument>({ collection: "posts", status: "published" }, [
      "title",
      "slug",
      "description",
      "lang",
      "tags",
    ])
    .sort({ publishedAt: -1 })
    .toArray()

  const posts = AllPosts.map((post) => ({
    ...post,
    tags: post.tags.map((tag) => tag.label).join(", "),
  }))

  await generateSearchJSON(posts)
  return
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  setRequestLocale(resolvedParams.locale)
  await getDataToSearch()
  const { allPosts, postsLength } = await getData(resolvedParams.locale)
  const t = await getTranslations("Blog")
  const pageNumber = 1
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(postsLength / 21),
  }
  return (
    <ListLayout
      posts={allPosts}
      initialDisplayPosts={allPosts}
      pagination={pagination}
      title={t("title")}
    />
  )
}
