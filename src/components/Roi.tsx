"use client"

import { useTranslations } from "next-intl"
import { FaCalculator, FaCheckCircle } from "react-icons/fa"
import { Heading } from "./ui/Heading"

export const Roi = () => {
  const t = useTranslations("Roi")

  return (
    <section className="mx-auto my-16 max-w-5xl px-4 text-default-700 dark:text-default-500">
      {/* Tytuł */}
      <div id="roi-mes" className="my-8 scroll-mt-20 sm:mt-0 sm:scroll-mt-8 md:text-center">
        <Heading text={t("title")} />
      </div>

      {/* Wprowadzenie */}
      <p className="mb-6 text-lg leading-relaxed">{t("intro")}</p>

      {/* Wzór */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8 flex items-center gap-4">
        <FaCalculator className="text-primary-600 dark:text-primary-400 text-3xl" />
        <p className="font-mono text-lg">{t("formula")}</p>
      </div>

      {/* Przykład */}
      <h3 className="text-2xl font-semibold mb-4">{t("exampleTitle")}</h3>
      <p className="mb-4">{t("exampleIntro")}</p>

      <ul className="list-disc pl-8 mb-4 space-y-2">
        <li>{t("exampleList1")}</li>
        <li>{t("exampleList2")}</li>
        <li>{t("exampleList3")}</li>
        <li>{t("exampleList4")}</li>
      </ul>

      <p className="mb-4">{t("investmentCosts")}</p>

      {/* Szacowane efekty */}
      <p className="mb-2">{t("effectsIntro")}</p>
      <ul className="list-disc pl-8 mb-4 space-y-2">
        <li>{t("effectsList1")}</li>
        <li>{t("effectsList2")}</li>
      </ul>

      <p className="mb-4">{t("annualSavings")}</p>

      {/* Obliczenie ROI */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8">
        <p className="font-mono text-lg">{t("calcFormula")}</p>
      </div>

      <p className="mb-6">{t("roiExplanation")}</p>

      {/* Wniosek */}
      <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-4 flex gap-4 items-start">
        <FaCheckCircle className="text-primary-600 dark:text-primary-400 text-2xl mt-1" />
        <p>{t("conclusion")}</p>
      </div>
    </section>
  )
}
