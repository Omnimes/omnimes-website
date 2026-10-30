"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

export const Hero = () => {
  const t = useTranslations("HeroSection")

  // Lista funkcji
  const features = ["heroFeature1", "heroFeature2", "heroFeature3"]

  return (
    <div className="relative mx-auto mt-12 max-w-7xl px-6 sm:mt-20 sm:px-8">
      <section className="grid grid-cols-1 items-center gap-12 sm:grid-cols-3">
        {/* LEWA STRONA – BANER */}
        <div className="sm:col-span-2">
          <div className="relative isolate z-30 aspect-[16/9] w-full overflow-hidden rounded-xl bg-black shadow-xl">
            <Image
              src="/images/hero/omnimes-hero.jpg"
              alt={t("heroImageAlt")}
              fill
              sizes="(max-width: 640px) 100vw, 66vw"
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* PRAWA STRONA – TEKST */}
        <div className="text-left">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">
            {t("heroTitle")}&nbsp;
            <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent">
              {t("heroTitleHighlight")}
            </span>
          </h1>

          <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-400">
            {t("heroSubtitle")}
          </p>

          {/* Features List */}
          <div className="mt-6 space-y-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <svg
                  className="mt-1 size-5 shrink-0 text-[#FF1CF7]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base text-gray-700 dark:text-gray-300">{t(feature)}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            {/* Przyciski w pionie z separatorem "lub" pomiędzy */}
            <div className="flex flex-col items-start gap-3">
              <Link
                href="https://cloud.omnimes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                aria-label={t("contactSalesAria")}
                title={t("contactSales")}
              >
                {t("contactSales")}
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>

              <span className="px-1 text-base font-medium text-gray-500 dark:text-gray-400">
                {t("or")}
              </span>

              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                aria-label={t("tryDemoAria")}
                title={t("tryDemo")}
              >
                {t("tryDemo")}
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
