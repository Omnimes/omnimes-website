import { getLocalePrimaryDialects } from "@/data/locales"
import { projectsData } from "@/data/projects"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { ProjectCard } from "@/components/ProjectCard"
import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "ProjectMeta" })
  const title = t("title")
  const description = t("desc")
  const keywords = t("keywords")
  const localeShort = getLocalePrimaryDialects(locale)
  const obj = {
    title,
    description,
    keywords,
    localeShort,
  }
  return genPageMetadata(obj)
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Project")

  return (
    <main className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl dark:text-gray-100">
          {t("project")}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t("projectDesc")}</p>
      </div>
      <section className="mx-auto max-w-screen-xl px-0 py-12 xl:max-w-screen-xl">
        <div className="-m-4 flex flex-wrap">
          {projectsData.map((d) => (
            <ProjectCard
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
