"use client"

import { useTranslations } from "next-intl"
import { FaBoxOpen, FaChartLine, FaCogs, FaSearch, FaTachometerAlt, FaUserCog } from "react-icons/fa"
import { Heading } from "./ui/Heading"

export const BusinessBenefits = () => {
  const t = useTranslations("Benefits")

  const benefits = [
    {
      icon: <FaChartLine className="text-4xl text-primary-600 dark:text-primary-400" />,
      text: t("increasedProductivity"),
    },
    {
      icon: <FaTachometerAlt className="text-4xl text-primary-600 dark:text-primary-400" />,
      text: t("fasterReaction"),
    },
    {
      icon: <FaCogs className="text-4xl text-primary-600 dark:text-primary-400" />,
      text: t("shorterCycle"),
    },
    {
      icon: <FaBoxOpen className="text-4xl text-primary-600 dark:text-primary-400" />,
      text: t("betterQuality"),
    },
    {
      icon: <FaSearch className="text-4xl text-primary-600 dark:text-primary-400" />,
      text: t("dataAnalysis"),
    },
    {
      icon: <FaUserCog className="text-4xl text-primary-600 dark:text-primary-400" />,
      text: t("fasterOnboarding"),
    },
  ]

  return (
    <section className="mx-auto my-16 max-w-7xl px-6 text-center">
        <div id="omnimes" className="mt-8 mb-8 scroll-mt-20 sm:mt-0 sm:scroll-mt-8 md:text-center">
            <Heading text={t("title")} />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {benefits.map((item, idx) => (
          <div key={idx} className="flex items-start gap-6 text-left">
            <div className="flex-shrink-0">{item.icon}</div>
            <p className="text-xl text-default-700 dark:text-default-500 leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
