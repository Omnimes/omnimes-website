import { useTranslations } from "next-intl"

export const HeadingContact = () => {
  const t = useTranslations("ContactHeading")

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col justify-center overflow-hidden px-4 py-24 text-center md:px-6">
      <h3 className="bg-gradient-to-r from-slate-900 to-slate-900/50 to-50% bg-clip-text text-3xl font-extrabold text-transparent [text-wrap:balance] md:text-4xl dark:from-slate-200/60 dark:to-slate-200">
        {t("title")}{" "}
        <span className="text-primary-500 inline-flex h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] flex-col overflow-hidden md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))]">
          <ul className="animate-text-slide-5 block text-left leading-tight [&_li]:block">
            <li>{t("message1")}</li>
            <li>{t("message2")}</li>
            <li>{t("message3")}</li>
            <li>{t("message4")}</li>
            <li>{t("message5")}</li>
            <li aria-hidden="true">{t("message6")}</li>
          </ul>
        </span>
      </h3>

      {/* Alert informacyjny o promocji - pełna szerokość */}
      {/* <div className="mx-auto mt-8 w-full max-w-6xl px-4">
        <div className="border-primary-200 relative overflow-hidden rounded-2xl border-2 bg-white p-6 shadow-lg">
          <div className="bg-primary-200 absolute -right-12 -top-12 size-32 animate-pulse rounded-full opacity-30 blur-2xl"></div>
          <div className="relative flex items-start gap-4">
            <div className="bg-primary-500 flex size-16 shrink-0 items-center justify-center rounded-full shadow-lg">
              <svg
                className="size-9 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-primary-900 mb-2 text-lg font-bold">{t("promotion.title")}</h4>
              <p className="text-primary-800">{t("promotion.description")}</p>
              <div className="text-primary-700 mt-3 flex items-center gap-2 text-sm font-semibold">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {t("promotion.deadline")}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  )
}
