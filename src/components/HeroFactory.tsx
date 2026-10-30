"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"

const chipClass =
  "pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-md border border-white/15 bg-black/70 px-2 py-1 text-[11px] font-medium text-white backdrop-blur transition-opacity duration-300 sm:text-xs"

export function canAnimate() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !connection?.saveData
}

export const HeroFactory = () => {
  const t = useTranslations("HeroSection")
  const canvas = useRef<HTMLCanvasElement>(null)
  const stop = useRef<HTMLDivElement>(null)
  const stopValue = useRef<HTMLSpanElement>(null)
  const energy = useRef<HTMLDivElement>(null)
  const energyValue = useRef<HTMLSpanElement>(null)
  const oee = useRef<HTMLDivElement>(null)
  const oeeValue = useRef<HTMLSpanElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!canAnimate()) return
    let cancelled = false
    let dispose: (() => void) | undefined

    const start = async () => {
      try {
        const { mountHero } = await import("./three/heroScene")
        if (
          cancelled ||
          !canvas.current ||
          !stop.current ||
          !stopValue.current ||
          !energy.current ||
          !energyValue.current ||
          !oee.current ||
          !oeeValue.current ||
          !ring.current
        ) {
          return
        }
        const scene = mountHero(
          canvas.current,
          {
            stop: stop.current,
            stopValue: stopValue.current,
            energy: energy.current,
            energyValue: energyValue.current,
            oee: oee.current,
            oeeValue: oeeValue.current,
            ring: ring.current,
          },
          { compact: window.innerWidth < 768 }
        )
        dispose = scene.dispose
        setReady(true)
      } catch {
        // Bez WebGL zostaje obraz startowy
      }
    }

    const timer = window.setTimeout(start, 300)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      dispose?.()
    }
  }, [])

  return (
    <div className="relative isolate z-30 aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#05060f] shadow-xl ring-1 ring-white/10">
      <Image
        src="/images/hero/factory-poster.jpg"
        alt={t("animationAlt")}
        fill
        sizes="(max-width: 640px) 100vw, 66vw"
        priority
        className="object-cover"
      />
      <canvas
        ref={canvas}
        role="img"
        aria-label={t("animationAlt")}
        className={`absolute inset-0 size-full transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className={ready ? "contents" : "hidden"} aria-hidden="true">
        <div ref={ring} className={`${chipClass} hidden sm:block`}>
          OmniMES
        </div>
        <div ref={oee} className={`${chipClass} hidden sm:block`}>
          OEE <span ref={oeeValue} className="tabular-nums" />
        </div>
        <div ref={energy} className={chipClass}>
          kWh / {t("chipUnit")} <span ref={energyValue} className="tabular-nums" />
        </div>
        <div ref={stop} className={`${chipClass} border-red-400/60 bg-red-600/80 opacity-0`}>
          {t("chipStop")} <span ref={stopValue} className="tabular-nums" />
        </div>
      </div>
      <p className="absolute bottom-2 right-3 z-10 rounded bg-black/55 px-1.5 py-0.5 text-[10px] text-white/70 sm:text-[11px]">
        {t("animationNote")}
      </p>
    </div>
  )
}
