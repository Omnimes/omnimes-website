import { useTranslations } from "next-intl"

export const HeadingDemo = () => {
  const t = useTranslations("DemoSection")

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl dark:text-white">
          {t("title")}&nbsp;
          <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent">
            {t("titleHighlight")}
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-600 dark:text-gray-400">
          {t("description")}
        </p>
        <div className="mt-8">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{t("steps")}</p>
          <div className="mt-4 flex flex-col gap-2 text-gray-600 sm:flex-row sm:justify-center sm:gap-8 dark:text-gray-400">
            <span className="flex items-center">
              <span className="mr-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-r from-[#FF1CF7] to-[#b249f8] text-sm font-bold text-white">
                1
              </span>
              {t("step1")}
            </span>
            <span className="flex items-center">
              <span className="mr-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-r from-[#FF1CF7] to-[#b249f8] text-sm font-bold text-white">
                2
              </span>
              {t("step2")}
            </span>
            <span className="flex items-center">
              <span className="mr-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-r from-[#FF1CF7] to-[#b249f8] text-sm font-bold text-white">
                3
              </span>
              {t("step3")}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
