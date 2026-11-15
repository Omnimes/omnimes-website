"use client"

import React, { Component, ReactNode, Suspense } from "react"
import { Skeleton } from "@nextui-org/react"

const Spline = React.lazy(() => import("@splinetool/react-spline"))

// Blad sceny 3D (np. nieudane pobranie pliku) ukrywa tylko ten element, a nie cala strone
class SplineBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error("Scena Spline nie zaladowala sie", error)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function ComponentSpline({ url }: { url: string }) {
  return (
    <SplineBoundary>
      <Suspense
        fallback={
          <Skeleton className="spline flex aspect-video min-h-2 justify-center rounded-lg" />
        }
      >
        <Spline scene={url} className="spline" />
      </Suspense>
    </SplineBoundary>
  )
}
