import { ReactNode } from "react"
import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations } from "next-intl/server"

import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const localeShort = getLocalePrimaryDialects(locale)
  // BO-1426: own title and description (was the homepage title — duplicate)
  const isPl = locale === "pl"
  return genPageMetadata({
    title: isPl
      ? "OmniEnergy — zarządzanie energią zgodne z ISO 50001 | OmniMES"
      : "OmniEnergy — ISO 50001 energy management | OmniMES",
    description: isPl
      ? "OmniEnergy, moduł energetyczny OmniMES: pomiary zużycia mediów, analizy, alarmy i raporty energetyczne dla zakładów produkcyjnych zgodnie z ISO 50001."
      : "OmniEnergy, the OmniMES energy module: utility consumption metering, analysis, alarms and energy reports for manufacturing plants in line with ISO 50001.",
    keywords: t("keywords"),
    localeShort,
    locale,
    path: "/omnienergy",
  })
}

export default function OmniEnergyLayout({ children }: { children: ReactNode }) {
  return children
}
