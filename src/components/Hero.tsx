"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

import { HeroFactory } from "./HeroFactory"

export const Hero = () => {
  const t = useTranslations("HeroSection")

  // Lista funkcji
  const features = ["heroFeature1", "heroFeature2", "heroFeature3"]

  return (
    <section className="relative left-1/2 isolate w-screen -translate-x-1/2 overflow-hidden text-white">
      {/* Tło rysowane w CSS: ostre w każdej rozdzielczości i bez pobierania obrazu */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[#05060f] bg-[radial-gradient(ellipse_55%_60%_at_28%_30%,rgba(47,155,255,0.17),transparent_70%),radial-gradient(ellipse_45%_65%_at_88%_70%,rgba(178,73,248,0.17),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(148,170,255,0.13)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_40%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-8 sm:grid-cols-3 sm:gap-12 sm:px-8 sm:py-12">
        {/* LEWA STRONA – DUŻE LOGO I ANIMACJA */}
        <div className="flex flex-col gap-6 sm:col-span-2 sm:gap-8">
          <Image
            src="/images/hero/omnimes-wordmark.svg"
            alt="OmniMES"
            width={2595}
            height={510}
            unoptimized
            className="h-auto w-full drop-shadow-[0_0_28px_rgba(47,155,255,0.55)]"
          />
          <HeroFactory />
        </div>

        {/* PRAWA STRONA – TEKST */}
        <div className="text-left">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
            {t("heroTitle")}&nbsp;
            <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent">
              {t("heroTitleHighlight")}
            </span>
          </h1>

          <p className="mt-6 text-xl leading-8 text-gray-200">{t("heroSubtitle")}</p>

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
                <span className="text-base text-gray-100">{t(feature)}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-sm">
            {/* Przyciski w pionie, tej samej szerokości, z separatorem "lub" pomiędzy */}
            <div className="flex flex-col gap-3">
              <Link
                href="https://cloud.omnimes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-fuchsia-600/30 transition duration-300 hover:shadow-xl hover:shadow-fuchsia-600/40 hover:brightness-110"
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

              <span className="flex items-center gap-3 text-sm font-medium text-gray-400">
                <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
                {t("or")}
                <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
              </span>

              <Link
                href="/demo"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition duration-300 hover:border-white/50 hover:bg-white/10"
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
      </div>
    </section>
  )
}
