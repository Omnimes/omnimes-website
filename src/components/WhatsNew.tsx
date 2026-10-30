"use client"

import { Link } from "@/navigation"
import { useTranslations } from "next-intl"
import { FaArrowRight, FaBolt, FaDatabase, FaEnvelopeOpenText, FaWaveSquare } from "react-icons/fa"

import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"

export const WhatsNew = () => {
  const t = useTranslations("WhatsNew")

  const cards = [
    { key: "energy", icon: <FaBolt /> },
    { key: "reports", icon: <FaEnvelopeOpenText /> },
    { key: "classification", icon: <FaWaveSquare /> },
    { key: "open", icon: <FaDatabase /> },
  ]

  return (
    <section id="whats-new" className="mt-20 scroll-mt-20 sm:mt-24">
      <div className="md:text-center">
        <SubtitleNormal text={t("smallSubtitle")} />
        <Heading text={t("heading")} />
        <DescriptionPrimary text={t("description")} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ key, icon }) => (
          <div
            key={key}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-3 text-lg text-pink-500">
                {icon}
              </div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {t(`cards.${key}.tag`)}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t(`cards.${key}.title`)}
            </h3>
            <p className="text-default-500 mt-2 text-base">{t(`cards.${key}.body`)}</p>
          </div>
        ))}
      </div>

      <h3 className="mb-6 mt-12 text-xl font-bold text-gray-900 md:text-center dark:text-white">
        {t("next.title")}
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {["mcpApps", "erp"].map((key) => (
          <div
            key={key}
            className="rounded-2xl border border-dashed border-gray-300 p-6 dark:border-gray-600"
          >
            <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700 dark:bg-pink-950/60 dark:text-pink-300">
              {t(`next.${key}.status`)}
            </span>
            <h4 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
              {t(`next.${key}.title`)}
            </h4>
            <p className="text-default-500 mt-2 text-base">{t(`next.${key}.body`)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 md:text-center">
        <Link
          href="/changelog"
          className="text-primary-500 hover:text-primary-600 inline-flex items-center gap-2 text-base font-semibold"
        >
          {t("changelogLink")}
          <FaArrowRight className="text-sm" />
        </Link>
      </div>
    </section>
  )
}
