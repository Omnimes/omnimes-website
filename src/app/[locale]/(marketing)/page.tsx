import { getLocalePrimaryDialects } from "@/data/locales"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { OstDocument } from "outstatic"
import { load } from "outstatic/server"

import { BusinessBenefits } from "@/components/BusinessBenefits"
import { DowntimeCost } from "@/components/DowntimeCost"
import { EcosystemFlow } from "@/components/EcosystemFlow"
import { Feature } from "@/components/Feature"
import { Hero } from "@/components/Hero"
import HomeBelowFold from "@/components/HomeBelowFold"
import { HomeFaq } from "@/components/HomeFaq"
import { InfoEnergyData } from "@/components/InfoEnergyData"
import { InfoOmniCloud } from "@/components/InfoOmniCloud"
import { McpSpotlight } from "@/components/McpSpotlight"
import { OmniProductsShowcase } from "@/components/OmniProductsShowcase"
import { Performance } from "@/components/Performance"
import { PromoVideo } from "@/components/PromoVideo"
import { Roi } from "@/components/Roi"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
import { TechTrust } from "@/components/TechTrust"
import { Timeline } from "@/components/Timeline"
import { WhatIsOmnimes } from "@/components/WhatIsOmnimes"
import { WhatsNew } from "@/components/WhatsNew"
import { genPageMetadata } from "@/app/seo"

async function getData(locale: string) {
  const db = await load()
  const allNews = await db
    .find<OstDocument>({ collection: "news", status: "published", lang: locale }, [
      "title",
      "publishedAt",
      "slug",
      "coverImage",
      "coverPosition",
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
      "coverPosition",
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
      <Hero />
      <PromoVideo />
      {/* BO-1439: kolejność pod sprzedaż — co to jest i co daje, ile kosztują straty,
          co nowego, potem technika dla IT, zwrot z inwestycji i pytania */}
      <WhatIsOmnimes />
      <OmniProductsShowcase />
      <Feature />
      <DowntimeCost />
      <BusinessBenefits />
      <WhatsNew />
      <McpSpotlight />
      <InfoEnergyData />
      <EcosystemFlow />
      <TechTrust />
      <Performance />
      <InfoOmniCloud />
      <Roi />
      <Timeline />
      <HomeFaq />
      <ScrollTopAndComment />
      <HomeBelowFold allNews={allNews} allPosts={allPosts} locale={locale} />
    </>
  )
}
