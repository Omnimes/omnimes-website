import { useTranslations } from "next-intl"
import {
  FaArrowRight,
  FaCloudUploadAlt,
  FaExchangeAlt,
  FaIndustry,
  FaRobot,
  FaServer,
  FaShieldAlt,
} from "react-icons/fa"

import Link from "@/components/LocaleLink"

import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"

// BO-1439: jedna sekcja łączy przekaz biznesowy i techniczny — po lewej korzyść dla firmy,
// pod nią „jak to działa” i technologie dla działu IT.

const ITEMS = [
  { key: "machines", icon: <FaIndustry />, chips: ["MQTT", "Sparkplug B", "S7", "Modbus", "OPC UA"] },
  { key: "erp", icon: <FaExchangeAlt />, chips: ["REST / OpenAPI", "OData", "SFTP", "HMAC"] },
  { key: "data", icon: <FaServer />, chips: ["PostgreSQL", "TimescaleDB", "Docker", "offline"] },
  { key: "updates", icon: <FaCloudUploadAlt />, chips: ["rollback", "SFTP / S3", "/health"] },
  { key: "security", icon: <FaShieldAlt />, chips: ["CRA", "SBOM", "TLS", "syslog"] },
  { key: "ai", icon: <FaRobot />, chips: ["MCP", "MCP Apps", "Claude", "Ollama"] },
]

const STANDARDS = ["ISO 22400", "ISO 50001", "ISO 50006", "GS1", "ESRS E1", "CRA"]

export const TechTrust = () => {
  const t = useTranslations("TechTrust")

  return (
    <section className="py-16" aria-labelledby="techtrust-heading">
      <div className="mb-10 md:mb-12 md:text-center lg:mx-auto">
        <SubtitleNormal text={t("smallSubtitle")} />
        <div id="techtrust-heading">
          <Heading text={t("heading")} />
        </div>
        <DescriptionPrimary text={t("description")} />
      </div>

      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(({ key, icon, chips }) => (
          <article
            key={key}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="bg-secondary-100/80 flex size-10 items-center justify-center rounded-full text-lg text-pink-500">
                {icon}
              </div>
              <h3 className="text-lg font-semibold leading-snug text-gray-900 dark:text-white">
                {t(`${key}.business`)}
              </h3>
            </div>
            <p className="text-default-600 dark:text-default-500 text-base">{t(`${key}.value`)}</p>
            <div className="mt-4 border-t border-dashed border-gray-200 pt-4 dark:border-white/10">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-300">
                {t("howLabel")}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t(`${key}.tech`)}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={t("techAria")}>
                {chips.map((c) => (
                  <li
                    key={c}
                    className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-700 dark:bg-white/10 dark:text-gray-300"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
        <ul className="flex flex-wrap justify-center gap-2" aria-label={t("standardsAria")}>
          {STANDARDS.map((s) => (
            <li
              key={s}
              className="rounded-full border border-pink-300/60 px-3 py-1 text-sm font-semibold text-pink-600 dark:border-pink-500/40 dark:text-pink-300"
            >
              {s}
            </li>
          ))}
        </ul>
        <Link
          href="/security"
          className="text-primary-500 hover:text-primary-600 inline-flex items-center gap-2 text-base font-semibold"
        >
          {t("securityLink")}
          <FaArrowRight className="text-sm" />
        </Link>
      </div>
    </section>
  )
}
