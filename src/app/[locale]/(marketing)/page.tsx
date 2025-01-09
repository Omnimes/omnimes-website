import { Suspense } from "react"
import { setRequestLocale } from "next-intl/server"
import { OstDocument } from "outstatic"
import { load } from "outstatic/server"

import { Skeleton } from "@/components/ui/Skeleton"
import { ComponentVideo } from "@/components/ComponentVideo"
import { Feature } from "@/components/Feature"
import { Hero } from "@/components/Hero"
import { HeroImage } from "@/components/HeroImage"
import { LastUpdates } from "@/components/LastUpdates"
import { Performance } from "@/components/Performance"
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
      <LastUpdates allNews={allNews} allPosts={allPosts} locale={locale} />
      <WhatIsOmnimes />
      <Feature />
      <ComponentVideo />
      <Time />
      <Performance />
      <Timeline />
      <WhatPeopleSay />
      {/* <SocialProf />   */}
      {/* <Cooperation /> */}
      <ScrollTopAndComment />
    </>
  )
}
