"use client"

import React, { Suspense } from "react"
import { Skeleton } from "@nextui-org/react"

const Spline = React.lazy(() => import("@splinetool/react-spline"))

export default function ComponentSpline({ url }: { url: string }) {
  return (
    <Suspense
      fallback={<Skeleton className="spline flex aspect-video min-h-2 justify-center rounded-lg" />}
    >
      <Spline scene={url} className="spline" />
    </Suspense>
  )
}
