"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { Subtitle, SubtitleNormal } from "./ui/Subtitle"

export const InfoEnergyData = () => {
  const t = useTranslations("EnergyInfo")
  const locale = useLocale()

  const imgAlt =
    locale === "pl"
      ? "Wykresy zużycia energii w OmniMES"
      : locale === "de"
        ? "Energieverbrauchs-Diagramme in OmniMES"
        : "Energy consumption charts in OmniMES"

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
      {/* Nagłówek sekcji */}
      <div id="energy" className="mt-12 scroll-mt-20 sm:mt-8 md:text-center">
        <SubtitleNormal text={t("smallSubtitle")} />
        <Heading omnimes text={t("heading")} />
        <DescriptionPrimary text={t("description")} />
      </div>

      {/* Layout: obraz + kafelki */}
      <div className="my-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Lewa kolumna – obraz */}
        <div className="order-1 lg:order-none">
          <div className="mb-8 leading-tight md:text-center">
            <Subtitle text={t("collectionTitle")} size="3xl" />
          </div>
          <div className="overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/images/chartsEnergy.png"
              alt={imgAlt}
              width={1600}
              height={900}
              priority
              className="h-auto w-full object-cover"
              style={{ clipPath: "inset(14px round 12px)" }}
            />
          </div>
        </div>

        {/* Prawa kolumna – kafelki */}
        <div className="grid grid-cols-1 gap-4">
          {/* Kafelek 1 */}
          <div className={cardCls} tabIndex={-1}>
            <div className={cardHeader}>
              <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-2 text-pink-500">
                {/* Ikona oszczędności */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  className="text-pink-500"
                >
                  <path
                    d="M4 12h16M4 16h10M4 8h14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-base font-semibold">{t("card1.title")}</p>
            </div>
            <div className={cardBody}>
              <p className="text-default-500 text-base font-normal">{t("card1.body")}</p>
            </div>
          </div>

          {/* Kafelek 2 */}
          <div className={cardCls} tabIndex={-1}>
            <div className={cardHeader}>
              <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-2 text-pink-500">
                {/* Ikona strat */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  className="text-pink-500"
                >
                  <path
                    d="M6 18L18 6M14 6h4v4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-base font-semibold">{t("card2.title")}</p>
            </div>
            <div className={cardBody}>
              <p className="text-default-500 text-base font-normal">{t("card2.body")}</p>
            </div>
          </div>

          {/* Kafelek 3 */}
          <div className={cardCls} tabIndex={-1}>
            <div className={cardHeader}>
              <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-2 text-pink-500">
                {/* Ikona procesu */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  className="text-pink-500"
                >
                  <path
                    d="M4 7h6v6H4zM14 11h6v6h-6zM10 10l4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-base font-semibold">{t("card3.title")}</p>
            </div>
            <div className={cardBody}>
              <p className="text-default-500 text-base font-normal">{t("card3.body")}</p>
            </div>
          </div>
        </div>
      </div>
      {/* ISO / Info box */}
      <div className="flex w-full items-start gap-3 rounded-xl border-l-4 border-pink-500 bg-pink-50 p-4 dark:bg-pink-950/40">
        <div className="shrink-0 text-pink-500">
          {/* Ikona info */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            className="text-pink-500"
          >
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20Zm.75 15h-1.5v-6h1.5v6Zm0-8h-1.5V7h1.5v2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-pink-700 dark:text-pink-300">{t("iso.badge")}</p>
          <p className="text-default-600 dark:text-default-200 mt-1 text-base">{t("iso.text")}</p>
        </div>
      </div>
    </>
  )
}
