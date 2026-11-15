"use client"

import { useEffect, useRef } from "react"

// Krótka pętla z ekranu OmniMES: pobiera się i gra tylko wtedy, gdy jest widoczna
export const ComponentVideo = ({ path }: { path: string }) => {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const element = video.current
    if (!element) return
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!element.getAttribute("src")) element.src = path
          if (still) element.controls = true
          else element.play().catch(() => {})
        } else if (!element.paused) {
          element.pause()
        }
      },
      { rootMargin: "200px" }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [path])

  return (
    <video
      ref={video}
      className="bg-default-100 ml-auto aspect-[1234/744] w-full rounded-lg md:max-w-[450px]"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  )
}
