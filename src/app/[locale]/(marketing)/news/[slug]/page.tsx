import "highlight.js/styles/github-dark.css"

import { Metadata } from "next"
import { getLocalePrimaryDialects } from "@/data/locales"
import { siteMetadata } from "@/data/siteMetadata"
import NewsLayout from "@/layouts/NewsLayout"
import { Button, Link } from "@nextui-org/react"
import { getTranslations } from "next-intl/server"
import { OstDocument } from "outstatic"
import { getDocumentSlugs, load } from "outstatic/server"
import { LuCircleArrowLeft } from "react-icons/lu"

import MDXServer from "@/lib/mdxServer"

export async function generateStaticParams() {
  const news = getDocumentSlugs("news")
  return news.map((slug) => ({ slug }))
}

async function getData(locale: string, slug: string) {
  const db = await load()
  const news = await db
    .find<OstDocument>({ collection: "news", slug, lang: locale }, [
      "title",
      "publishedAt",
      "description",
      "slug",
      "author",
      "content",
      "coverImage",
      "tags",
      "lang",
    ])
    .first()

  if (!news) {
    return undefined
  }

  const content = await MDXServer(news.content)
  return {
    ...news,
    content,
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const news = await getData(locale, slug)
  const t = await getTranslations({ locale, namespace: "NewsData" })

  if (!news) {
    return {
      title: t("newsNotFound"),
    }
  }

  return {
    title: news.title,
    description: news.description,
    alternates: {
      canonical: siteMetadata.siteUrl + "/" + locale + "/news",
    },
    openGraph: {
      title: news.title,
      description: news.description,
      siteName: siteMetadata.title,
      locale: getLocalePrimaryDialects(locale),
      type: "article",
      publishedTime: new Date(news.publishedAt).toISOString(),
      url: siteMetadata.siteUrl + "/" + locale + "/news/" + news.slug,
      images: [siteMetadata.socialBanner],
      authors: news.author?.name || "",
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.description,
      images: [siteMetadata.socialBanner],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function NewsPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const news = await getData(locale, slug)
  const t = await getTranslations("NewsData")

  if (!news || news == undefined) {
    return (
      <article className="mx-auto mt-32 max-w-screen-lg px-4 text-center md:px-0">
        <h1 className="font-heading my-2 inline-block text-4xl leading-tight lg:text-5xl">
          {t("newsNotFound")}
        </h1>
        <p>{t("newsNotFoundDesc")}</p>
        <div className="flex justify-center py-6 lg:py-10">
          <Button
            as={Link}
            href="/news"
            aria-label={t("backToNews")}
            aria-labelledby={t("backToNews")}
            title={t("backToNews")}
            role="button"
            className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
          >
            <LuCircleArrowLeft className="mr-2 size-4" />
            {t("allnews")}
          </Button>
        </div>
      </article>
    )
  }

  return <NewsLayout post={news} />
}
