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

// typ z listy kursów
import { ExtendedOstDocument } from "../page"

export async function generateStaticParams() {
  const courses = getDocumentSlugs("courses") // ⬅ tu zmiana
  return courses.map((slug) => ({ slug }))
}

async function getData({ params }: { params: { slug: string; locale: string } }) {
  const db = await load()
  const course = await db
    .find<ExtendedOstDocument>(
      { collection: "courses", slug: params.slug, lang: params.locale }, // ⬅ tu zmiana
      [
        "title",
        "publishedAt",
        "description",
        "slug",
        "author",
        "content",
        "coverImage",
        "tags",
        "lang",
      ]
    )
    .first()

  if (!course) {
    return undefined
  }

  const content = await MDXServer(course.content)
  return {
    ...course,
    content,
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const course = await getData({ params: resolvedParams })
  const locale = resolvedParams.locale
  const t = await getTranslations({ locale, namespace: "Metadata" })

  if (!course) {
    return {
      title: t("coursesNotFound"),
    }
  }

  return {
    title: course.title,
    description: course.description,
    alternates: {
      canonical: siteMetadata.siteUrl + "/" + locale + "/courses",
    },
    openGraph: {
      title: course.title,
      description: course.description,
      siteName: siteMetadata.title,
      locale: getLocalePrimaryDialects(locale),
      type: "article",
      publishedTime: new Date(course.publishedAt).toISOString(),
      url: siteMetadata.siteUrl + "/" + locale + "/courses/" + course.slug,
      images: [siteMetadata.socialBanner],
      authors: course.author?.name || "",
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
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

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const resolvedParams = await params
  setRequestLocale(resolvedParams.locale)

  const course = await getData({ params: resolvedParams })
  const t = await getTranslations("PostLayout")

  if (!course) {
    return (
      <article className="mx-auto mt-32 max-w-screen-lg px-4 text-center md:px-0">
        <h1 className="font-heading my-2 inline-block text-4xl leading-tight lg:text-5xl">
          {t("coursesNotFound")}
        </h1>
        <p>{t("coursesNotFoundDesc")}</p>
        <div className="flex justify-center py-6 lg:py-10">
          <Button
            as={Link}
            href="/courses"
            aria-label={t("back")}
            aria-labelledby={t("back")}
            title={t("back")}
            role="button"
            className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
          >
            <LuCircleArrowLeft className="mr-2 size-4" />
            {t("allCourses")}
          </Button>
        </div>
      </article>
    )
  }

  return <PostLayout post={course} />
}
