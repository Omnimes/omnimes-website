import { TeamsData } from "@/data/team"
import { useTranslations } from "next-intl"

import { Company } from "./Company"
import { CardAuthor } from "./ui/AuthorsCard"
import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"

export const Team = () => {
  const t = useTranslations("Team")
  return (
    <div className="mx-auto max-w-screen-xl py-8 text-center lg:py-16">
      <Company />
      <h6 className="inline-flex bg-gradient-to-r  from-gray-500 via-gray-700 to-gray-500 bg-clip-text pb-4 pt-16 text-xl text-transparent  md:text-2xl dark:from-slate-200/60 dark:via-slate-200 dark:to-slate-200/60">
        {t("descriptionCompany")}
      </h6>
      <div className="mx-auto mb-8 max-w-screen-lg pt-16 lg:mb-16">
        <Heading text={t("tilte")} />
        <DescriptionPrimary text={t("descriptionTeam")} />
      </div>
{/*       <div className="flex flex-col items-center gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
        {TeamsData.map((author: Teams) => {
          const { name, avatar, occupation, github, linkedin } = author
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
      </div> */}
    </div>
  )
}
