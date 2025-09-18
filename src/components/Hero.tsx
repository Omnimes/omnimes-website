"use client"

import { Suspense, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { Button, Link, Skeleton } from "@nextui-org/react"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"

import { AnchorIcon, VideoPlayIcon } from "./ui/Icons"
import { Subtitle } from "./ui/Subtitle"

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export const Hero = () => {
  const t = useTranslations("HeroSection")
  const locale = useLocale()
  const { theme } = useTheme()
  const playerRef = useRef<null | { showPreview: () => void }>(null)

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
          {/* nowy stacking context + tło, które zasłania pierścienie */}
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
                  light={poster} // string -> auto-centrowanie play
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

          {/* Styl: obetnij rogi i daj białe tło pod posterem/video */}
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
            {t("title")}&nbsp;
            <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent">
              {t("title2")}
            </span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-400">
            {t("subTitle2")}
          </p>

          <div className="mt-8">
            {/* Pierwsze dwa przyciski w jednej linii */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                as={Link}
                href="/contact"
                showAnchorIcon
                aria-label={t("buttonAria")}
                aria-labelledby={t("buttonAria")}
                title={t("contact")}
                role="button"
                className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
              >
                {t("contact")}
              </Button>

              <Button
                as={Link}
                href="/demo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("demoAria")}
                aria-labelledby={t("demoAria")}
                title={t("demo")}
                role="button"
                className="border-gradient-to-tr border-2 border-[#FF1CF7] bg-transparent text-[#FF1CF7] transition-all duration-300 hover:bg-gradient-to-tr hover:from-[#FF1CF7] hover:to-[#b249f8] hover:text-white dark:border-[#b249f8] dark:text-[#b249f8]"
              >
                {t("demo")}
              </Button>
            </div>

            {/* Trzeci przycisk wyśrodkowany poniżej */}
            <div className="mt-4 flex justify-center sm:justify-start">
              <Button
                as={Link}
                href="#omnimes"
                showAnchorIcon
                anchorIcon={<AnchorIcon />}
                aria-label={t("buttonOmnimes")}
                aria-labelledby={t("buttonOmnimes")}
                title={t("more")}
                className="text-primary-600 dark:text-primary-400 bg-transparent"
              >
                {t("more")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
