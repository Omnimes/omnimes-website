import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { OstDocument } from "outstatic"
import { load } from "outstatic/server"

import { BusinessBenefits } from "@/components/BusinessBenefits"
import { Feature } from "@/components/Feature"
import { Hero } from "@/components/Hero"
import { HeroImage } from "@/components/HeroImage"
import HomeBelowFold from "@/components/HomeBelowFold"
import { InfoEnergyData } from "@/components/InfoEnergyData"
import { InfoOmniCloud } from "@/components/InfoOmniCloud"
import { OmniProductsShowcase } from "@/components/OmniProductsShowcase"
import { Performance } from "@/components/Performance"
import { Roi } from "@/components/Roi"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
import { Timeline } from "@/components/Timeline"
import { WhatIsOmnimes } from "@/components/WhatIsOmnimes"
import { genPageMetadata } from "@/app/seo"

async function getData(locale: string) {
  const db = await load()
  const allNews = await db
    .find<OstDocument>({ collection: "news", status: "published", lang: locale }, [
      "title",
      "publishedAt",
      "slug",
      "coverImage",
      "description",
    ])
    .sort({ publishedAt: -1 })
    .limit(3)
    .toArray()

  const allPosts = await db
    .find<OstDocument>({ collection: "posts", status: "published", lang: locale }, [
      "title",
      "publishedAt",
      "slug",
      "coverImage",
      "description",
    ])
    .sort({ publishedAt: -1 })
    .limit(5)
    .toArray()

  return {
    allNews,
    allPosts,
  }
}

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
    path: "/",
  })
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { allNews, allPosts } = await getData(locale)
  return (
    <>
      <HeroImage />
      <Hero />
      <OmniProductsShowcase />
      <BusinessBenefits />
      <Roi />
      <WhatIsOmnimes />
      <Feature />
      <InfoEnergyData />
      <InfoOmniCloud />
      <Performance />
      <Timeline />
      <ScrollTopAndComment />
      <HomeBelowFold allNews={allNews} allPosts={allPosts} locale={locale} />
    </>
  )
}
