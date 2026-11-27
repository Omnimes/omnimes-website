"use client"

import Image from "next/image"
import NextLink from "next/link"
import { Link } from "@/navigation"
import { useLocale, useTranslations } from "next-intl"
import { FaArrowRight, FaBarcode, FaBolt, FaExchangeAlt, FaTools } from "react-icons/fa"

import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"

type PerLocale = { pl: string; en: string }

// Najnowsze funkcje: obraz, news i (gdy jest) artykuł na blogu - slugi z outstatic/content
const FEATURED: { key: string; image: PerLocale; news: PerLocale; post?: PerLocale }[] = [
  {
    key: "studio",
    image: {
      pl: "/images/blog/studio-aplikacji/cover-film-pl.jpg",
      en: "/images/blog/studio-aplikacji/cover-film-en.jpg",
    },
    news: {
      pl: "studio-aplikacji-w-omnimes-aplikacje-budowane-z-claude",
      en: "app-studio-in-omnimes-apps-built-with-claude",
    },
    post: {
      pl: "studio-aplikacji-w-omnimes-wlasne-narzedzia-produkcyjne-budowane-rozmowa-z-claude",
      en: "app-studio-in-omnimes-build-your-own-shop-floor-tools-by-talking-to-claude",
    },
  },
  {
    key: "hologram",
    image: {
      pl: "/images/omnimes-hologram-cover.jpg",
      en: "/images/omnimes-hologram-cover-en.jpg",
    },
    news: {
      pl: "hologram-w-omnimes-hala-3d-na-zywo",
      en: "hologram-in-omnimes-your-plant-in-live-3d",
    },
  },
]

const linkClass =
  "text-primary-500 hover:text-primary-600 inline-flex items-center gap-2 text-base font-semibold"

export const WhatsNew = () => {
  const t = useTranslations("WhatsNew")
  const locale = useLocale()
  const lang = locale === "pl" ? "pl" : "en"

  const cards = [
    { key: "maintenance", icon: <FaTools /> },
    { key: "erp", icon: <FaExchangeAlt /> },
    { key: "traceability", icon: <FaBarcode /> },
    { key: "energy", icon: <FaBolt /> },
  ]

  return (
    <section id="whats-new" className="mt-20 scroll-mt-20 sm:mt-24">
      <div className="md:text-center">
        <SubtitleNormal text={t("smallSubtitle")} />
        <Heading text={t("heading")} />
        <DescriptionPrimary text={t("description")} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {FEATURED.map(({ key, image, news, post }) => (
          <article
            key={key}
            className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <NextLink
              href={`/${locale}/news/${news[lang]}`}
              className="relative block aspect-video overflow-hidden"
            >
              <Image
                src={image[lang]}
                alt={t(`featured.${key}.imageAlt`)}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </NextLink>
            <div className="flex grow flex-col p-6">
              <span className="w-fit rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700 dark:bg-pink-950/60 dark:text-pink-300">
                {t(`featured.${key}.tag`)}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">
                {t(`featured.${key}.title`)}
              </h3>
              <p className="text-default-500 mt-2 grow text-base">{t(`featured.${key}.body`)}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <NextLink href={`/${locale}/news/${news[lang]}`} className={linkClass}>
                  {t("featured.readNews")}
                  <FaArrowRight className="text-sm" />
                </NextLink>
                {post && (
                  <NextLink href={`/${locale}/blog/${post[lang]}`} className={linkClass}>
                    {t("featured.readArticle")}
                    <FaArrowRight className="text-sm" />
                  </NextLink>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ key, icon }) => (
          <div
            key={key}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-3 text-lg text-pink-500">
                {icon}
              </div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {t(`cards.${key}.tag`)}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t(`cards.${key}.title`)}
            </h3>
            <p className="text-default-500 mt-2 text-base">{t(`cards.${key}.body`)}</p>
          </div>
        ))}
      </div>

      <h3 className="mb-6 mt-12 text-xl font-bold text-gray-900 md:text-center dark:text-white">
        {t("next.title")}
      </h3>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6">
        {["latest"].map((key) => (
          <div
            key={key}
            className="rounded-2xl border border-dashed border-gray-300 p-6 dark:border-gray-600"
          >
            <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700 dark:bg-pink-950/60 dark:text-pink-300">
              {t(`next.${key}.status`)}
            </span>
            <h4 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
              {t(`next.${key}.title`)}
            </h4>
            <p className="text-default-500 mt-2 text-base">{t(`next.${key}.body`)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 md:text-center">
        <Link
          href="/changelog"
          className="text-primary-500 hover:text-primary-600 inline-flex items-center gap-2 text-base font-semibold"
        >
          {t("changelogLink")}
          <FaArrowRight className="text-sm" />
        </Link>
      </div>
    </section>
  )
}
