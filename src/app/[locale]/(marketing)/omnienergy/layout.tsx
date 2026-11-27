import { ReactNode } from "react"
import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations } from "next-intl/server"

import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const localeShort = getLocalePrimaryDialects(locale)
  // BO-1426: own title and description (was the homepage title — duplicate)
  // BO-1439: title and description from the OmniEnergy namespace (energy per unit, ISO 50006, CO2, ESRS)
  const isPl = locale === "pl"
  const te = await getTranslations({ locale, namespace: "OmniEnergy" })
  return genPageMetadata({
    title: te("meta.title"),
    description: te("meta.description"),
    keywords: isPl
      ? "OmniEnergy, system zarządzania energią, EnMS, ISO 50001, ISO 50006, zużycie energii na sztukę, koszt energii na sztukę, monitoring mediów, linia bazowa energii, wskaźniki WEE, znaczące zużycia energii, ZWE, moc umowna, tg φ, ślad węglowy, CO2, KOBiZE, ESRS E1, audyt energetyczny, OmniMES"
      : "OmniEnergy, energy management system, EnMS, ISO 50001, ISO 50006, energy per unit, energy cost per unit, utility monitoring, energy baseline, EnPI, significant energy use, SEU, contracted capacity, carbon footprint, CO2, ESRS E1, energy audit, OmniMES",
    localeShort,
    locale,
    path: "/omnienergy",
  })
}

export default function OmniEnergyLayout({ children }: { children: ReactNode }) {
  return children
}
