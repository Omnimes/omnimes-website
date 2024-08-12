import { projectsData } from "@/data/projects";
import { ProjectCard } from '@/components/ProjectCard';
import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from "next-intl";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "ProjectMeta" });
  const title = t('title');
  const description = t('desc');
  const keywords = t('keywords');
  const localeShort = getLocalePrimaryDialects(locale);
  const obj = {
    title,
    description,
    keywords,
    localeShort,
  }
  return genPageMetadata(obj)
}

export default function ProjectPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Project');

  return (
      <main className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t("project")}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {t("projectDesc")}
          </p>
        </div>
      <section className="mx-auto max-w-5xl xl:max-w-5xl px-0 py-12">
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
