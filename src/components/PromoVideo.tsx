"use client"

import { useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { VideoPlayIcon } from "./ui/Icons"
import { SubtitleNormal } from "./ui/Subtitle"

// Film promocyjny OmniMES (BO-1221, 1:09 — od BO-1229 bez sceny z monitoringiem) zaraz pod banerem: najpierw całość w skrócie, potem szczegóły.
// Plik pobiera się dopiero po kliknięciu „odtwórz” (preload="none"); do tego czasu widać plakat z dużym przyciskiem.
export const PromoVideo = () => {
  const t = useTranslations("PromoVideo")
  const lang = useLocale() === "pl" ? "pl" : "en"
  const video = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  return (
    <section id="film" className="mt-20 scroll-mt-20 sm:mt-24">
      <div className="md:text-center">
        <SubtitleNormal text={t("smallSubtitle")} />
        <Heading text={t("heading")} />
        <DescriptionPrimary text={t("description")} />
      </div>
      <div className="relative mx-auto max-w-5xl">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- film bez lektora: cały tekst jest na ekranie, w tle tylko muzyka */}
        <video
          ref={video}
          className="aspect-video w-full rounded-2xl border border-gray-200 bg-[#F6F7F9] shadow-xl dark:border-gray-700"
          controls={started}
          playsInline
          preload="none"
          poster={`/videos/omnimes-promo-${lang}.jpg`}
          aria-label={t("aria")}
          onPlay={() => setStarted(true)}
          onEnded={() => {
            // po obejrzeniu wracamy do plakatu (karta tytułowa filmu) z przyciskiem odtwarzania
            setStarted(false)
            video.current?.load()
          }}
        >
          <source src={`/videos/omnimes-promo-${lang}.mp4`} type="video/mp4" />
        </video>
        {!started && (
          <button
            type="button"
            onClick={() => {
              setStarted(true)
              video.current?.play().catch(() => {})
            }}
            className="group absolute inset-0 rounded-2xl"
            aria-label={t("play")}
            title={t("play")}
          >
            {/* Przycisk pod podtytułem karty tytułowej (85% wysokości), żeby nie zasłaniał hasła */}
            <span className="absolute left-1/2 top-[85%] flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] pl-0.5 text-[10px] shadow-lg shadow-fuchsia-600/30 transition duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-fuchsia-600/40 group-hover:brightness-110 sm:size-16 sm:text-xs lg:size-20 lg:pl-1 lg:text-base">
              <VideoPlayIcon />
            </span>
          </button>
        )}
      </div>
    </section>
  )
}
