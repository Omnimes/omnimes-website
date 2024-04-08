import { useLocale } from 'next-intl'
import { CardAuthor } from './atoms/AuthorsCard'
import { getAuthors } from '@/lib/autors'
import { Company } from './Company'
import { DescriptionPrimary } from './atoms/Description'
import { Heading } from './atoms/Heading'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
export const Team = async () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Team');
  const authors = await getAuthors()
  return (
    <>
      <div className="mx-auto max-w-screen-xl py-8 text-center lg:py-16">
        <Company />
        <h6 className="pt-16 inline-flex  text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-gray-700 to-gray-500  dark:from-slate-200/60 dark:via-slate-200 dark:to-slate-200/60 pb-4">
        {t("descriptionCompany")}
        </h6>
        <div className="mx-auto mb-8 max-w-screen-lg lg:mb-16 pt-16">
          <Heading text={t("tilte")} />
          <DescriptionPrimary text={t("descriptionTeam")} />
        </div>
        <div className="flex flex-col items-center gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
          {authors && (
            <>
              {authors.map((author: { meta: AuthorMeta }) => {
                const { meta } = author;
                const { name, avatar, occupation, github, linkedin } = meta;
                return (
                  <CardAuthor
                    key={name}
                    image={avatar}
                    name={name}
                    occupation={occupation}
                    github={github}
                    linkedin={linkedin}
                  />
                )
              })}
            </>
          )}
        </div>
      </div>
    </>
  )
}
