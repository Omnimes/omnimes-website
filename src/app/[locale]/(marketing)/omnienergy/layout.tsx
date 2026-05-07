import { ReactNode } from "react"
import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations } from "next-intl/server"

import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const localeShort = getLocalePrimaryDialects(locale)
  return genPageMetadata({
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    localeShort,
    locale,
    path: "/omnienergy",
  })
}

export default function OmniEnergyLayout({ children }: { children: ReactNode }) {
  return children
}
