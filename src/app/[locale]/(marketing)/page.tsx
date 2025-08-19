import { Suspense } from "react"
import { setRequestLocale } from "next-intl/server"
import { OstDocument } from "outstatic"
import { load } from "outstatic/server"

import { Skeleton } from "@/components/ui/Skeleton"
import { BusinessBenefits } from "@/components/BusinessBenefits"
import { ContactTwo } from "@/components/ContactTwo"
import { Feature } from "@/components/Feature"
import { Hero } from "@/components/Hero"
import { HeroImage } from "@/components/HeroImage"
import { InfoEnergyData } from "@/components/InfoEnergyData"
import { InfoOmniCloud } from "@/components/InfoOmniCloud"
import { LastUpdates } from "@/components/LastUpdates"
import { Performance } from "@/components/Performance"
import { Roi } from "@/components/Roi"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
import { Time } from "@/components/Time"
import { Timeline } from "@/components/Timeline"
import { WhatIsOmnimes } from "@/components/WhatIsOmnimes"
import { WhatPeopleSay } from "@/components/WhatPeopleSay"

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

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { allNews, allPosts } = await getData(locale)
  return (
    <>
      <HeroImage />
      <Hero />
      <BusinessBenefits />
      <Roi />
      <WhatIsOmnimes />
      <Feature />
      <InfoEnergyData />
      {/* <ComponentVideo /> */}
      <Time />
      <InfoOmniCloud />
      <Performance />
      <Timeline />
      <ContactTwo />
      <WhatPeopleSay />
      {/* <SocialProf />   */}
      {/* <Cooperation /> */}
      <ScrollTopAndComment />
      <Suspense fallback={<Skeleton className="h-8 w-full" />}>
        <LastUpdates allNews={allNews} allPosts={allPosts} locale={locale} />
      </Suspense>
    </>
  )
}
