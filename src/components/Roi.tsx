"use client"

import { useTranslations } from "next-intl"
import { FaCalculator, FaCheckCircle } from "react-icons/fa"

import { Heading } from "./ui/Heading"

export const Roi = () => {
  const t = useTranslations("Roi")

  return (
    <section className="text-default-700 dark:text-default-500 mx-auto my-16 max-w-5xl px-4">
      {/* Tytuł */}
      <div id="roi-mes" className="my-8 scroll-mt-20 sm:mt-0 sm:scroll-mt-8 md:text-center">
        <Heading text={t("title")} />
      </div>

      {/* Wprowadzenie */}
      <p className="mb-6 text-lg leading-relaxed">{t("intro")}</p>

      {/* Wzór */}
      <div className="mb-8 flex items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <FaCalculator className="text-primary-600 dark:text-primary-400 text-3xl" />
        <p className="font-mono text-lg">{t("formula")}</p>
      </div>

      {/* Przykład */}
      <h3 className="mb-4 text-2xl font-semibold">{t("exampleTitle")}</h3>
      <p className="mb-4">{t("exampleIntro")}</p>

      <ul className="mb-4 list-disc space-y-2 pl-8">
        <li>{t("exampleList1")}</li>
        <li>{t("exampleList2")}</li>
        <li>{t("exampleList3")}</li>
        <li>{t("exampleList4")}</li>
      </ul>

      <p className="mb-4">{t("investmentCosts")}</p>

      {/* Szacowane efekty */}
      <p className="mb-2">{t("effectsIntro")}</p>
      <ul className="mb-4 list-disc space-y-2 pl-8">
        <li>{t("effectsList1")}</li>
        <li>{t("effectsList2")}</li>
      </ul>

      <p className="mb-4">{t("annualSavings")}</p>

      {/* Obliczenie ROI */}
      <div className="mb-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <p className="font-mono text-lg">{t("calcFormula")}</p>
      </div>

      <p className="mb-6">{t("roiExplanation")}</p>

      {/* Wniosek */}
      <div className="bg-primary-50 dark:bg-primary-900/20 border-primary-500 flex items-start gap-4 border-l-4 p-4">
        <FaCheckCircle className="text-primary-600 dark:text-primary-400 mt-1 text-2xl" />
        <p>{t("conclusion")}</p>
      </div>
    </section>
  )
}
