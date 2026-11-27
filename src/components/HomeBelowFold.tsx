"use client"

import dynamic from "next/dynamic"
import type { OstDocument } from "outstatic"

import { Skeleton } from "@/components/ui/Skeleton"
import { TrustedBy } from "@/components/TrustedBy"

const sectionSkeleton = () => <Skeleton className="my-16 h-64 w-full" />

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
      <TrustedBy />
      <WhatPeopleSay />
      <LastUpdates allNews={allNews} allPosts={allPosts} locale={locale} />
    </>
  )
}
