import { getLocalePrimaryDialects } from "@/data/locales"
import ListLayout from "@/layouts/ListLayout"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getDocuments, load } from "outstatic/server"

import { genPageMetadata } from "@/app/seo"

import { ExtendedOstDocument } from "../../page"

export async function generateStaticParams({
  params,
}: {
  params: { locale: string; page: string }
}) {
  const locale = params.locale

  const courses = getDocuments("courses", ["lang"])
  if (!courses || courses.length === 0) {
    return []
  }

  const localeCourses = courses.filter((c) => c.lang === locale)
  const totalPages = Math.ceil(localeCourses.length / 10)

  return Array.from({ length: totalPages }, (_, i) => ({
    locale,
    page: (i + 1).toString(),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const title = t("courses_title") // ⬅ zmiana
  const description = t("courses_desc") // ⬅ zmiana
  const keywords = t("courses_keywords") // ⬅ zmiana
  const localeShort = getLocalePrimaryDialects(locale)

  return genPageMetadata({ title, description, keywords, localeShort })
}

async function getData(locale: string, page: string) {
  const db = await load()
  const allCourses = await db
    .find<ExtendedOstDocument>({ collection: "courses", status: "published", lang: locale }, [
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

  const coursesLength = getDocuments("courses", ["lang"]) // ⬅ zmiana
    .filter((c) => c.status === "published" && c.lang === locale).length

  return { allCourses, coursesLength }
}

export default async function CoursesPagePage({
  params,
}: {
  params: Promise<{ page: string; locale: string }>
}) {
  const resolvedParams = await params
  const { locale, page } = resolvedParams
  setRequestLocale(locale)

  const t = await getTranslations("Courses") // ⬅ zmiana
  const { allCourses, coursesLength } = await getData(locale, page)

  if (!allCourses || allCourses.length === 0)
    return <p className="mt-10 text-center">{t("NotFound")}</p>

  const pageNumber = parseInt(page as string)

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(coursesLength / 20),
  }

  return (
    <ListLayout
      posts={allCourses}
      initialDisplayPosts={allCourses}
      pagination={pagination}
      title={t("title")}
    />
  )
}
