import "highlight.js/styles/github-dark.css"

import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getLocalePrimaryDialects } from "@/data/locales"
import { siteMetadata } from "@/data/siteMetadata"
import PostLayout from "@/layouts/PostLayout"
import { Button, Link } from "@nextui-org/react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getDocumentSlugs, load } from "outstatic/server"
import { LuCircleArrowLeft } from "react-icons/lu"

import { localizeHref } from "@/lib/localizeHref"
import MDXServer from "@/lib/mdxServer"
import { articleLanguages, metaDescription } from "@/lib/seo"
import { findTranslatedSlugIn, getArticleLanguages } from "@/lib/translationsServer"

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

async function findTranslatedSlug(slug: string, targetLocale: string): Promise<string | null> {
  return findTranslatedSlugIn("posts", slug, targetLocale)
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

  // BO-1426: hreflang to the other language version + x-default
  const languages = articleLanguages(await getArticleLanguages("posts", post.slug, locale), "blog")
  const description = metaDescription(post.description)

  return {
    title: post.title,
    description,
    alternates: {
      canonical: siteMetadata.siteUrl + "/" + locale + "/blog/" + post.slug,
      languages,
    },
    openGraph: {
      title: post.title,
      description,
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
      description,
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

  if (!post) {
    const translatedSlug = await findTranslatedSlug(resolvedParams.slug, resolvedParams.locale)
    if (translatedSlug) {
      redirect(`/${resolvedParams.locale}/blog/${translatedSlug}`)
    }
  }

  if (!post) {
    return (
      <article className="mx-auto mt-32 max-w-screen-lg px-4 text-center md:px-0">
        <h1 className="font-heading my-2 inline-block text-4xl leading-tight lg:text-5xl">
          {t("postNotFound")}
        </h1>
        <p>{t("postNotFoundDesc")}</p>
        <div className="flex justify-center py-6 lg:py-10">
          <Button
            as={Link}
            href={localizeHref("/blog", resolvedParams.locale)}
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

  const cover = post.coverImage?.startsWith("http")
    ? post.coverImage
    : `${siteMetadata.siteUrl}${post.coverImage}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: metaDescription(post.description),
    image: cover,
    datePublished: new Date(post.publishedAt).toISOString(),
    author: {
      "@type": "Person",
      name: post.author?.name || siteMetadata.author,
    },
    publisher: {
      "@type": "Organization",
      name: "OmniMES",
      logo: {
        "@type": "ImageObject",
        url: `${siteMetadata.siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteMetadata.siteUrl}/${resolvedParams.locale}/blog/${post.slug}`,
    },
    inLanguage: resolvedParams.locale,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostLayout post={post} />
    </>
  )
}
