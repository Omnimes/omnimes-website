"use client"

import dynamic from "next/dynamic"
import type { OstDocument } from "outstatic"

import { Skeleton } from "@/components/ui/Skeleton"
import { TrustedBy } from "@/components/TrustedBy"

const sectionSkeleton = () => <Skeleton className="my-16 h-64 w-full" />

const LastUpdates = dynamic(
  () => import("./LastUpdates").then((m) => ({ default: m.LastUpdates })),
  { ssr: false, loading: sectionSkeleton }
)

type Props = {
  allNews: OstDocument[]
  allPosts: OstDocument[]
  locale: string
}

// BO-1444: „Co o nas mówią” usunięte. Każda sekcja w .home-section — ten sam odstęp co wyżej.
export default function HomeBelowFold({ allNews, allPosts, locale }: Props) {
  return (
    <>
      <div className="home-section">
        <TrustedBy />
      </div>
      <div className="home-section">
        <LastUpdates allNews={allNews} allPosts={allPosts} locale={locale} />
      </div>
    </>
  )
}
