"use client"

import React, { Component, ReactNode, Suspense, useEffect, useRef, useState } from "react"
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

const placeholder = (
  <Skeleton className="spline flex aspect-video min-h-2 justify-center rounded-lg" />
)

export default function ComponentSpline({ url }: { url: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  // Silnik Spline (ok. 2 MB) pobiera sie dopiero, gdy czytelnik zbliza sie do sceny
  useEffect(() => {
    if (!box.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          setNear(true)
        }
      },
      { rootMargin: "600px" }
    )
    observer.observe(box.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={box}>
      {near ? (
        <SplineBoundary>
          <Suspense fallback={placeholder}>
            <Spline scene={url} className="spline" />
          </Suspense>
        </SplineBoundary>
      ) : (
        placeholder
      )}
    </div>
  )
}
