"use client"

import dynamic from "next/dynamic"
import type { OstDocument } from "outstatic"

import { Skeleton } from "@/components/ui/Skeleton"

const sectionSkeleton = () => <Skeleton className="my-16 h-64 w-full" />

const Time = dynamic(() => import("./Time").then((m) => ({ default: m.Time })), {
  ssr: false,
  loading: sectionSkeleton,
})

const ContactTwo = dynamic(
  () => import("./ContactTwo").then((m) => ({ default: m.ContactTwo })),
  { ssr: false, loading: sectionSkeleton }
)

const WhatPeopleSay = dynamic(
  () => import("./WhatPeopleSay").then((m) => ({ default: m.WhatPeopleSay })),
  { ssr: false, loading: sectionSkeleton }
)

const LastUpdates = dynamic(
  () => import("./LastUpdates").then((m) => ({ default: m.LastUpdates })),
  { ssr: false, loading: sectionSkeleton }
)

type Props = {
  allNews: OstDocument[]
  allPosts: OstDocument[]
  locale: string
}

export default function HomeBelowFold({ allNews, allPosts, locale }: Props) {
  return (
    <>
      <Time />
      <ContactTwo />
      <WhatPeopleSay />
      <LastUpdates allNews={allNews} allPosts={allPosts} locale={locale} />
    </>
  )
}
