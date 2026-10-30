"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { FaArrowRight, FaCogs, FaLock, FaPlug, FaTachometerAlt } from "react-icons/fa"

import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"

const NEWS_SLUG: Record<string, string> = {
  pl: "mcp-w-omnimes-sterowanie-z-asystenta-ai",
  en: "mcp-in-omnimes-control-from-any-ai-assistant",
}

// Prawdziwe nazwy narzędzi serwera MCP (omnimes_system/devs/mcp/server.py)
const TOOLS = ["create_redash_query", "create_redash_visualization", "create_redash_dashboard"]

export const McpSpotlight = () => {
  const t = useTranslations("McpSpotlight")
  const locale = useLocale()

  const points = [
    { key: "connect", icon: <FaPlug /> },
    { key: "dashboards", icon: <FaTachometerAlt /> },
    { key: "config", icon: <FaCogs /> },
    { key: "control", icon: <FaLock /> },
  ]

  return (
    <section id="mcp" className="mt-20 scroll-mt-20 sm:mt-24">
      <div className="md:text-center">
        <span className="mb-3 inline-block rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-700 dark:bg-pink-950/60 dark:text-pink-300">
          {t("badge")}
        </span>
        <div>
          <SubtitleNormal text={t("smallSubtitle")} />
        </div>
        <Heading text={t("heading")} />
        <DescriptionPrimary text={t("description")} />
      </div>

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {points.map(({ key, icon }) => (
            <div key={key} className="flex items-start gap-4">
              <div className="bg-secondary-100/80 flex shrink-0 items-center justify-center rounded-full p-3 text-lg text-pink-500">
                {icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {t(`points.${key}.title`)}
                </h3>
                <p className="text-default-500 mt-1 text-base">{t(`points.${key}.body`)}</p>
              </div>
            </div>
          ))}
        </div>

        <figure className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:p-6 dark:border-gray-700 dark:bg-gray-900">
          <figcaption className="mb-5 text-sm font-medium text-gray-500 dark:text-gray-400">
            {t("chat.caption")}
          </figcaption>
          <p className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-sm bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] px-4 py-3 text-base text-white">
            {t("chat.user")}
          </p>
          <ul className="my-4 flex flex-col gap-2">
            {TOOLS.map((tool) => (
              <li
                key={tool}
                className="flex min-w-0 items-center gap-2 font-mono text-xs text-gray-500 sm:text-sm dark:text-gray-400"
              >
                <span aria-hidden className="size-2 shrink-0 rounded-full bg-green-500" />
                <span className="truncate">{tool}</span>
              </li>
            ))}
          </ul>
          <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 text-base text-gray-800 dark:bg-gray-800 dark:text-gray-100">
            {t("chat.assistant")}
          </p>
        </figure>
      </div>

      <div className="mt-10 md:text-center">
        <Link
          href={`/${locale}/news/${NEWS_SLUG[locale] ?? NEWS_SLUG.en}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          {t("cta")}
          <FaArrowRight className="text-sm" />
        </Link>
      </div>
    </section>
  )
}
