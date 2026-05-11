import Link from "next/link"
import { useTranslations } from "next-intl"

import { Company } from "./Company"
import { Heading } from "./ui/Heading"

const Stats = () => {
  const t = useTranslations("Team")
  const items = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
    { value: t("stat4Value"), label: t("stat4Label") },
  ]
  return (
    <div className="mx-auto max-w-screen-lg pt-16">
      <Heading text={t("statsTitle")} />
      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-default-200 bg-white/60 px-4 py-6 text-center shadow-sm backdrop-blur-sm dark:bg-content1/60"
          >
            <div className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              {item.value}
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-base">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CtaBlock = () => {
  const t = useTranslations("Team")
  return (
    <div className="mx-auto mt-16 max-w-screen-lg rounded-2xl border border-default-200 bg-gradient-to-br from-white/40 to-default-100/40 px-6 py-10 text-center dark:from-default-50/40 dark:to-black/40">
      <h3 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
        {t("ctaTitle")}
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
        {t("ctaSubtitle")}
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/implementation"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          {t("ctaImplementations")}
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-default-300 bg-white/80 px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white dark:bg-default-100/60 dark:text-white dark:hover:bg-default-100"
        >
          {t("ctaContact")}
        </Link>
      </div>
    </div>
  )
}

export const Team = () => {
  const t = useTranslations("Team")
  return (
    <div className="mx-auto max-w-screen-xl py-8 text-center lg:py-16">
      <Company />
      <h6 className="inline-flex bg-gradient-to-r  from-gray-500 via-gray-700 to-gray-500 bg-clip-text pb-4 pt-16 text-xl text-transparent  md:text-2xl dark:from-slate-200/60 dark:via-slate-200 dark:to-slate-200/60">
        {t("descriptionCompany")}
      </h6>
      <Stats />
      <CtaBlock />
      {/* Sekcja zespołu wyłączona (2026-05-11) — bez imion i twarzy. Treść zachowana w i18n (descriptionTeam, tilte) i w TeamsData. */}
      {/* <div className="mx-auto mb-8 max-w-screen-lg pt-16 lg:mb-16">
        <Heading text={t("tilte")} />
        <DescriptionPrimary text={t("descriptionTeam")} />
      </div>
      <div className="flex flex-col items-center gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
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
