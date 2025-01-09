import { Project } from "@/data/projects"
import { useTranslations } from "next-intl"

import { CustomLink } from "./Link"
import { Image } from "./ui/Image"

export const ProjectCard = ({ title, description, imgSrc, href }: Project) => {
  const t = useTranslations("ProjectCard")
  return (
    <div className="max-w-full p-4 md:w-1/2">
      <div
        className={`card_hover dark:hover:border-primary-600 hover:border-primary-600 border-opacity/60 h-full overflow-hidden rounded-md border-2 border-gray-200 shadow-lg transition-all dark:border-gray-700`}
      >
        <CustomLink
          href={`/project${href}`}
          aria-label={t("linkto", { title: t(title) })}
          className="relative block w-full transition-all"
        >
          <Image
            alt={t(title)}
            src={imgSrc}
            className="w-full object-cover object-center transition-all md:h-36 lg:h-48 xl:h-60 2xl:h-72"
            width={544}
            height={306}
          />
          <h3 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-sans font-bold text-white">
            {t(title)}
          </h3>
        </CustomLink>
        <div className="p-6">
          <h2 className="hover:text-primary-600 mb-3 text-2xl font-bold leading-8 tracking-tight">
            <CustomLink href={`/project${href}`} aria-label={t("linkto", { title: t(title) })}>
              {t(title)}
            </CustomLink>
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{t(description)}</p>
          <CustomLink
            href={`/project${href}`}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base font-medium leading-6"
            aria-label={t("linkto", { title: t(title) })}
          >
            {t("LearnMore")} &rarr;
          </CustomLink>
        </div>
      </div>
    </div>
  )
}
