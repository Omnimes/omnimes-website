"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { Subtitle, SubtitleNormal } from "./ui/Subtitle"

export const WhatIsOmnimes = () => {
  const t = useTranslations("OmnimesInformation")
  const locale = useLocale()

  const imgSrc = locale === "pl" ? "/images/omnimes-schemat.png" : "/images/omnimes-schemat-en.png"

  const imgAlt =
    locale === "pl"
      ? "Schemat działania systemu OmniMES"
      : locale === "de"
        ? "OmniMES Systemablauf"
        : "OmniMES system flow"

  // Wspólna klasa kafelka
  const cardCls =
    "relative box-border flex flex-col overflow-hidden rounded-large shadow-medium " +
    "bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8] " +
    "transition-transform-background outline-none data-[focus-visible=true]:z-10 " +
    "data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2"

  const cardHeader =
    "z-10 flex w-full shrink-0 items-center justify-start gap-2 p-3 pb-0 subpixel-antialiased"

  const cardBody =
    "relative flex h-auto w-full flex-auto flex-col overflow-y-auto break-words p-3 text-left subpixel-antialiased"

  return (
    <>
      <div id="omnimes" className="mt-8 scroll-mt-20 sm:mt-0 sm:scroll-mt-8 md:text-center">
        <SubtitleNormal text={t("smallSubtitle")} />
        <Heading omnimes text={t("heading")} />
        <DescriptionPrimary text={t("description")} />
      </div>

      {/* LEWA/PRAWA – obraz + kafelki 2×2 */}
      <div className="my-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Lewa kolumna – obraz */}
        <div className="order-1 lg:order-none">
          <div className="mb-8 leading-tight md:text-center">
            {/* Duży, responsywny podtytuł */}
            <Subtitle text={t("subTitle")} />
          </div>

          <Image
            key={imgSrc} // wymusza podmianę po zmianie języka
            src={imgSrc}
            alt={imgAlt}
            width={1200}
            height={800}
            className="h-auto w-full rounded-xl shadow-md"
            priority
          />
        </div>

        {/* Prawa kolumna – 4 kafelki w układzie 2×2 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Card 1 */}
          <div className={cardCls} tabIndex={-1}>
            <div className={cardHeader}>
              <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-2 text-pink-500">
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  className="text-pink-500"
                >
                  <path
                    d="M6.09 13.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-base font-semibold">{t("title1")}</p>
            </div>
            <div className={cardBody}>
              <p className="text-default-500 text-base font-normal">{t("descriptionCard1")}</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className={cardCls} tabIndex={-1}>
            <div className={cardHeader}>
              <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-2 text-pink-500">
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  className="text-pink-500"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path d="M8 2v3"></path>
                    <path d="M16 2v3M7 13h8M7 17h5M16 3.5c3.33.18 5 1.45 5 6.15v6.18c0 4.12-1 6.18-6 6.18H9c-5 0-6-2.06-6-6.18V9.65c0-4.7 1.67-5.96 5-6.15z"></path>
                  </g>
                </svg>
              </div>
              <p className="text-base font-semibold">{t("title2")}</p>
            </div>
            <div className={cardBody}>
              <p className="text-default-500 text-base font-normal">{t("descriptionCard2")}</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className={cardCls} tabIndex={-1}>
            <div className={cardHeader}>
              <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-2 text-pink-500">
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  className="text-pink-500"
                >
                  <path
                    d="M3.5 20.5c.83.83 2.17.83 3 0l13-13c.83-.83.83-2.17 0-3-.83-.83-2.17-.83-3 0l-13 13c-.83.83-.83 2.17 0 3ZM18.01 8.99l-3-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 2.44 10 2l-.44 1.5L10 5l-1.5-.44L7 5l.44-1.5L7 2l1.5.44ZM4.5 8.44 6 8l-.44 1.5L6 11l-1.5-.44L3 11l.44-1.5L3 8l1.5.44ZM19.5 13.44 21 13l-.44 1.5L21 16l-1.5-.44L18 16l.44-1.5L18 13l1.5.44Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-base font-semibold">{t("title3")}</p>
            </div>
            <div className={cardBody}>
              <p className="text-default-500 text-base font-normal">{t("descriptionCard3")}</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className={cardCls} tabIndex={-1}>
            <div className={cardHeader}>
              <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-2 text-pink-500">
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  className="text-pink-500"
                >
                  <path
                    d="M10 16.95H6.21c-3.37 0-4.21-.84-4.21-4.21v-6c0-3.37.84-4.21 4.21-4.21h10.53c3.37 0 4.21.84 4.21 4.21M10 21.47v-4.52M2 12.95h8M6.74 21.47H10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 12.8v5.71c0 2.37-.59 2.96-2.96 2.96h-3.55c-2.37 0-2.96-.59-2.96-2.96V12.8c0-2.37.59-2.96 2.96-2.96h3.55c2.37 0 2.96.59 2.96 2.96Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.244 18.25h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-base font-semibold">{t("title4")}</p>
            </div>
            <div className={cardBody}>
              <p className="text-default-500 text-base font-normal">{t("descriptionCard4")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
