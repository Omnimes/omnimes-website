"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"

import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"

// Prawdziwe referencje z outstatic/content/implementation
const LINKS: Record<string, { eldrew: string; relpol: string }> = {
  pl: {
    eldrew: "/pl/implementation/eldrew-producent-opakowan-drewnianych",
    relpol: "/pl/implementation/relpol-partnerstwo-inteligentna-siec-pomiarow-energii",
  },
  en: {
    eldrew: "/en/implementation/eldrew-manufacturer-of-wooden-packaging",
    relpol: "/en/implementation/relpol-partnership-smart-energy-metering-network",
  },
}

export const ProofStrip = () => {
  const t = useTranslations("ProofStrip")
  const locale = useLocale()
  const links = LINKS[locale] ?? LINKS.en

  const items = [
    { key: "eldrew", href: links.eldrew, external: false },
    { key: "relpol", href: links.relpol, external: false },
    { key: "maker", href: "https://multiprojekt.pl", external: true },
  ]

  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 sm:px-8">
      <div className="md:text-center">
        <SubtitleNormal text={t("smallSubtitle")} />
        <Heading text={t("title")} />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.key}
            className="border-default-200 dark:bg-content1 flex flex-col gap-2 rounded-xl border bg-white p-6 shadow-sm"
          >
            <span className="text-primary-500 text-sm font-semibold">{t(`${item.key}Label`)}</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t(`${item.key}Name`)}
            </h3>
            <p className="grow text-base text-gray-600 dark:text-gray-400">
              {t(`${item.key}Text`)}
            </p>
            <Link
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="text-primary-500 mt-2 text-base font-semibold hover:underline"
            >
              {t(`${item.key}Link`)}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
