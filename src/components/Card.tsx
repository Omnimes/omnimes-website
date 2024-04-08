import { Image } from './atoms/Image'
import { CustomLink } from "./Link"
import { Project } from "@/data/projects";
import { useTranslations } from 'next-intl'
export const Card = ({ title, description, imgSrc, href }: Project) => {
    const t = useTranslations('ProjectCard');
    return (
        <div className="max-w-full md:max-w-[544px] p-4 md:w-1/2">
            <div
            className={`shadow-lg card_hover h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700 dark:hover:border-primary-600 hover:border-primary-600 transition-all`}
            >
                <CustomLink href={`/project${href}`} aria-label={t("linkto", { title: t(title) })} className='relative block w-full transition-all'>
                    <Image
                    alt={t(title)}
                    src={imgSrc}
                    className="object-cover object-center md:h-36 lg:h-48 transition-all w-full"
                    width={544}
                    height={306}
                    />
                    <h3 className='font-sans font-bold text-center text-white absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{t(title)}</h3>
                </CustomLink>
            <div className="p-6">
                <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight hover:text-primary-600">
                    <CustomLink href={`/project${href}`} aria-label={t("linkto", {title: t(title)})}>
                    {t(title)}
                    </CustomLink>
                </h2>
                <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{t(description)}</p>
                <CustomLink
                    href={`/project${href}`}
                    className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={t("linkto", {title: t(title)})}
                >
                    {t("LearnMore")} &rarr;
                </CustomLink>
            </div>
            </div>
        </div>
    ) 
}