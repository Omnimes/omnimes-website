import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { DescriptionPrimary } from "@/components/ui/Description"
import { Heading } from "@/components/ui/Heading"
import { SubtitleNormal } from "@/components/ui/Subtitle"
import { Faq } from "@/components/Faq"
import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "FaqMeta" })
  const title = t("title")
  const description = t("desc")
  const keywords = t("keywords")
  const localeShort = getLocalePrimaryDialects(locale)
  const obj = {
    title,
    description,
    keywords,
    localeShort,
  }
  return genPageMetadata(obj)
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("FAQ")

  return (
    <main className="px-0 py-16 md:text-center">
      <AbstractBackgroundSecond />
      <SubtitleNormal text={t("subtitle")} />
      <Heading text={t("heading")} />
      <DescriptionPrimary text={t("desc")} />
      <Faq />
    </main>
  )
}

const AbstractBackgroundSecond = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-[-1] grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
    >
      <div className="from-primary h-56 bg-gradient-to-br to-purple-400 blur-[106px] dark:from-fuchsia-700"></div>
      <div className="h-32 bg-gradient-to-r from-fuchsia-700 to-pink-200 blur-[106px] dark:from-red-300 dark:to-purple-400 "></div>
    </div>
  )
}
