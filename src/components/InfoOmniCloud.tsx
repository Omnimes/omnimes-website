"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { Subtitle, SubtitleNormal } from "./ui/Subtitle"

export const InfoOmniCloud = () => {
  const t = useTranslations("CloudInfo")
  const locale = useLocale()

  const imgSrc = "/images/omnicloud.png"
  const imgAlt =
    locale === "pl"
      ? "OmniPlatforma – zarządzanie serwerami OmniMES w chmurze"
      : locale === "de"
        ? "OmniPlatform – Verwaltung von OmniMES-Servern in der Cloud"
        : "OmniPlatform – manage OmniMES servers in the cloud"

  return (
    <>
      <div id="cloud" className="mt-12 scroll-mt-20 sm:mt-8 md:text-center">
        <SubtitleNormal text={t("smallSubtitle")} />
        <Heading omnimes brand="OmniPlatform" text={t("heading")} />
        <DescriptionPrimary text={t("tagline")} />
      </div>

      {/* LEWA / PRAWA */}
      <div className="my-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Lewa kolumna – obraz + CTA */}
        <div className="order-1 lg:order-none">
          <div className="mb-8 leading-tight md:text-center">
            <Subtitle text={t("subTitle")} size="3xl" />
          </div>

          <div className="overflow-hidden rounded-xl shadow-lg">
            <Image
              src={imgSrc}
              alt={imgAlt}
              width={1200}
              height={800}
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href="https://cloud.omnimes.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              {t("cta")}
            </a>
          </div>
        </div>

        {/* Prawa kolumna – treść */}
        <div className="grid grid-cols-1 gap-4">
          <div
            className={
              "relative box-border flex flex-col overflow-hidden rounded-large shadow-medium " +
              "bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8] " +
              "transition-transform-background outline-none"
            }
            tabIndex={-1}
          >
            <div className="z-10 flex w-full items-center gap-2 p-3 pb-0 subpixel-antialiased">
              <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-2 text-pink-500">
                {/* Ikona chmury/serwera */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  className="text-pink-500"
                >
                  <path
                    d="M7 7a5 5 0 1 1 9.58 2H17a4 4 0 1 1 0 8H8a5 5 0 1 1-1-10h0Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-base font-semibold">{t("blockTitle")}</p>
            </div>

            <div className="relative flex w-full flex-col break-words p-3 text-left subpixel-antialiased">
              <p className="text-default-500 text-base font-normal">{t("p1")}</p>
              <p className="text-default-500 mt-3 text-base font-normal">{t("p2")}</p>
              <p className="text-default-500 mt-3 text-base font-normal">{t("p3")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
