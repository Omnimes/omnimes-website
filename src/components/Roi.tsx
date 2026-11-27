import { useTranslations } from "next-intl"
import { FaCalculator, FaCheckCircle } from "react-icons/fa"

import { Heading } from "./ui/Heading"

// BO-1439: przykład ROI w czytelnym układzie (koszt vs oszczędności, ROI 25%, zwrot w miesiącach).
// Wcześniej wynik był podany jako „0,25”.
export const Roi = () => {
  const t = useTranslations("Roi")

  return (
    <section className="text-default-700 dark:text-default-500 mx-auto my-16 max-w-6xl px-4">
      <div id="roi-mes" className="my-8 scroll-mt-20 sm:mt-0 sm:scroll-mt-8 md:text-center">
        <Heading text={t("title")} />
      </div>
      <p className="mx-auto mb-8 max-w-4xl text-lg leading-relaxed md:text-center">{t("intro")}</p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <FaCalculator className="text-primary-600 dark:text-primary-400 shrink-0 text-3xl" />
            <p className="font-mono text-base sm:text-lg">{t("formula")}</p>
          </div>
          <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
            {t("exampleTitle")}
          </h3>
          <p className="mb-3">{t("exampleIntro")}</p>
          <ul className="mb-4 list-disc space-y-1.5 pl-8">
            <li>{t("exampleList1")}</li>
            <li>{t("exampleList2")}</li>
            <li>{t("exampleList3")}</li>
            <li>{t("exampleList4")}</li>
          </ul>
          <p className="mb-3">{t("effectsIntro")}</p>
          <ul className="list-disc space-y-1.5 pl-8">
            <li>{t("effectsList1")}</li>
            <li>{t("effectsList2")}</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-white/10 dark:bg-white/5">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>{t("costLabel")}</span>
              <span className="font-mono font-semibold text-gray-900 dark:text-white">
                {t("costValue")}
              </span>
            </div>
            <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-white/10">
              <div className="h-4 w-4/5 rounded-full bg-gray-400" />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>{t("savingsLabel")}</span>
              <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {t("savingsValue")}
              </span>
            </div>
            <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-white/10">
              <div className="h-4 w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl bg-gradient-to-br from-pink-600 to-purple-700 p-4 text-white">
              <p className="text-sm text-white/80">{t("roiLabel")}</p>
              <p className="font-mono text-4xl font-bold">25%</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/10">
              <p className="text-sm">{t("paybackLabel")}</p>
              <p className="font-mono text-4xl font-bold text-gray-900 dark:text-white">
                {t("paybackValue")}
              </p>
            </div>
          </div>
          <p className="rounded-lg bg-gray-50 p-3 font-mono text-sm dark:bg-gray-800">
            {t("calcFormula")}
          </p>
          <p className="text-sm">{t("roiExplanation")}</p>
        </div>
      </div>

      <div className="bg-primary-50 dark:bg-primary-900/20 border-primary-500 mt-8 flex items-start gap-4 border-l-4 p-4">
        <FaCheckCircle className="text-primary-600 dark:text-primary-400 mt-1 shrink-0 text-2xl" />
        <p>{t("conclusion")}</p>
      </div>
    </section>
  )
}
