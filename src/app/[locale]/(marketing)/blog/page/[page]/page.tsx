import { getLocalePrimaryDialects } from "@/data/locales"
import ListLayout from "@/layouts/ListLayout"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getDocuments, load } from "outstatic/server"

import { genPageMetadata } from "@/app/seo"

import { ExtendedOstDocument } from "../../page"

export const generateStaticParams = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const posts = getDocuments("posts", ["lang"])
  if (!posts || posts.length == 0 || posts === undefined) {
    return []
  }
  const localePosts = posts.filter((post) => post.lang == locale)
  const totalPages = Math.ceil(localePosts.length / 10)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
  return paths
}

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

async function getData(locale: string, page: string) {
  const db = await load()
  const allPosts = await db
    .find<ExtendedOstDocument>({ collection: "posts", status: "published", lang: locale }, [
      "title",
      "publishedAt",
      "slug",
      "coverImage",
      "description",
      "author",
      "tags",
    ])
    .sort({ publishedAt: -1 })
    .skip((Number(page) - 1) * 20)
    .limit(20)
    .toArray()

  const postsLength = getDocuments("posts", ["lang"])
    .filter((post) => post.status == "published")
    .filter((post) => post.lang == locale).length

  return {
    allPosts,
    postsLength,
  }
}

export default async function BlogPagePage({
  params,
}: {
  params: Promise<{ page: string; locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const page = resolvedParams.page
  setRequestLocale(locale)
  const t = await getTranslations("Blog")
  const { allPosts, postsLength } = await getData(locale, page)

  if (!allPosts || allPosts.length == 0 || allPosts === undefined)
    return <p className="mt-10 text-center">{t("NotFound")}</p>

  const pageNumber = parseInt(page as string)

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(postsLength / 20),
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
