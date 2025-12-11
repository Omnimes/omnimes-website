import "highlight.js/styles/github-dark.css"

import { Metadata } from "next"
import { getLocalePrimaryDialects } from "@/data/locales"
import { siteMetadata } from "@/data/siteMetadata"
import PostLayout from "@/layouts/PostLayout"
import { Button, Link } from "@nextui-org/react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getDocumentSlugs, load } from "outstatic/server"
import { LuCircleArrowLeft } from "react-icons/lu"

import MDXServer from "@/lib/mdxServer"

import { ExtendedOstDocument } from "../page"

export async function generateStaticParams() {
  const posts = getDocumentSlugs("posts")
  return posts.map((slug) => ({ slug }))
}

async function getData({ params }: { params: { slug: string; locale: string } }) {
  const db = await load()
  const post = await db
    .find<ExtendedOstDocument>({ collection: "posts", slug: params.slug, lang: params.locale }, [
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

  if (!post) {
    return undefined
  }

  const content = await MDXServer(post.content)
  return {
    ...post,
    content,
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getData({ params: resolvedParams })
  const locale = resolvedParams.locale
  const t = await getTranslations({ locale, namespace: "Metadata" })

  if (!post) {
    return {
      title: t("postNotFound"),
    }
  }

  const cover = post.coverImage?.startsWith("http")
    ? post.coverImage
    : `${siteMetadata.siteUrl}${post.coverImage}`

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: siteMetadata.siteUrl + "/" + locale + "/blog/" + post.slug,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      siteName: siteMetadata.title,
      locale: getLocalePrimaryDialects(locale),
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      url: siteMetadata.siteUrl + "/" + locale + "/blog/" + post.slug,
      images: [
        {
          url: cover,
          width: 1200,
          height: 630,
        },
      ],
      authors: post.author?.name || "",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [cover],
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

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const resolvedParams = await params
  setRequestLocale(resolvedParams.locale)

  const post = await getData({ params: resolvedParams })
  const t = await getTranslations("PostLayout")

  if (!post || post == undefined) {
    return (
      <article className="mx-auto mt-32 max-w-screen-lg px-4 text-center md:px-0">
        <h1 className="font-heading my-2 inline-block text-4xl leading-tight lg:text-5xl">
          {t("postNotFound")}
        </h1>
        <p>{t("postNotFoundDesc")}</p>
        <div className="flex justify-center py-6 lg:py-10">
          <Button
            as={Link}
            href="/blog"
            aria-label={t("back")}
            aria-labelledby={t("back")}
            title={t("back")}
            role="button"
            className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
          >
            <LuCircleArrowLeft className="mr-2 size-4" />
            {t("allPost")}
          </Button>
        </div>
      </article>
    )
  }

  return <PostLayout post={post} />
}
