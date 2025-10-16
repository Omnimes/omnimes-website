"use client"

import { Suspense, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Skeleton } from "@nextui-org/react"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"

import { VideoPlayIcon } from "./ui/Icons"
import { Subtitle } from "./ui/Subtitle"

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export const Hero = () => {
  const t = useTranslations("HeroSection")
  const locale = useLocale()
  const { theme } = useTheme()
  const playerRef = useRef<null | { showPreview: () => void }>(null)

  // Lista funkcji
  const features = ["heroFeature1", "heroFeature3"]

  // Postery
  const pathPoster =
    theme === "dark" ? "/images/poster/poster.dark.pl.png" : "/images/poster/poster.pl.png"
  const pathPosterOther =
    theme === "dark" ? "/images/poster/poster.dark.en.png" : "/images/poster/poster.en.png"

  const poster = locale === "pl" ? pathPoster : pathPosterOther
  const path = locale === "pl" ? "/videos/video.pl.mp4" : "/videos/video.en.mp4"

  useEffect(() => {
    playerRef.current?.showPreview()
  }, [theme, locale])

  return (
    <div className="relative mx-auto mt-12 max-w-7xl px-6 sm:mt-20 sm:px-8">
      <section className="grid grid-cols-1 items-center gap-12 sm:grid-cols-3">
        {/* LEWA STRONA – WIDEO */}
        <div className="sm:col-span-2">
          <div className="dark:bg-content1 relative isolate z-30 overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="text-primary-500 mb-8 text-xl md:text-center">
              <Subtitle text={t("SubTitle3")} />
            </div>
            <div className="aspect-[16/9] w-full">
              <Suspense fallback={<Skeleton className="size-full rounded-xl" />}>
                <ReactPlayer
                  id="hero-player"
                  ref={playerRef as any}
                  className="react-player-fix size-full"
                  url={path}
                  controls
                  width="100%"
                  height="100%"
                  pip
                  light={poster}
                  playIcon={
                    <button
                      aria-label={t("playAria")}
                      title={t("playAria")}
                      className="absolute left-1/2 top-1/2 z-40 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] shadow-lg"
                    >
                      <VideoPlayIcon />
                    </button>
                  }
                />
              </Suspense>
            </div>
          </div>

          {/* eslint-disable-next-line react/no-unknown-property */}
          <style jsx global>{`
            .react-player-fix > .react-player__preview,
            .react-player-fix video {
              border-radius: 0.75rem !important;
              width: 100% !important;
              height: 100% !important;
              object-fit: cover;
              background-color: #ffffff !important;
            }
          `}</style>
        </div>

        {/* PRAWA STRONA – TEKST */}
        <div className="text-left">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white">
            {t("heroTitle")}&nbsp;
            <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent">
              {t("heroTitleHighlight")}
            </span>
          </h1>

          {/* Info badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF1CF7]/10 to-[#b249f8]/10 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FF1CF7] opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-[#FF1CF7]"></span>
            </span>
            {t("newPlatformBadge")}
          </div>

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
            {/* Przyciski w jednej linii z separatorem "lub" */}
            <div className="flex flex-row flex-wrap items-center gap-4">
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

              <span className="text-base font-medium text-gray-500 dark:text-gray-400">
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
