"use client"

import Image from "next/image"
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
    <section className="relative left-1/2 isolate mt-16 w-screen -translate-x-1/2 overflow-hidden py-16 text-white sm:mt-24 sm:py-20">
      {/* Baner jako lekko rozmyte tło na pełną szerokość */}
      <Image
        src="/images/hero/omnimes-banner.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 scale-105 object-cover blur-[5px]"
      />
      <div className="absolute inset-0 -z-10 bg-[#05060f]/65" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="md:text-center">
          <SubtitleNormal text={t("smallSubtitle")} />
          <Heading text={t("title")} />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex flex-col gap-2 rounded-xl border border-white/15 bg-[#05060f]/55 p-6 backdrop-blur-md"
            >
              <span className="text-sm font-semibold text-pink-400">{t(`${item.key}Label`)}</span>
              <h3 className="text-xl font-bold text-white">{t(`${item.key}Name`)}</h3>
              <p className="grow text-base text-white/80">{t(`${item.key}Text`)}</p>
              <Link
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="mt-2 text-base font-semibold text-pink-400 hover:underline"
              >
                {t(`${item.key}Link`)}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
