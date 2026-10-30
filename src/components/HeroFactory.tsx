"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

const chipClass =
  "pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-md border px-2 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur transition-opacity duration-300 sm:text-xs"

const STATIONS = ["stationPress", "stationCnc", "stationRobot", "stationPack"]

export function canAnimate() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !connection?.saveData
}

export const HeroFactory = () => {
  const t = useTranslations("HeroSection")
  const locale = useLocale()
  const canvas = useRef<HTMLCanvasElement>(null)
  const stop = useRef<HTMLDivElement>(null)
  const stopValue = useRef<HTMLSpanElement>(null)
  const resume = useRef<HTMLDivElement>(null)
  const energyValue = useRef<HTMLSpanElement>(null)
  const oeeValue = useRef<HTMLSpanElement>(null)
  const chart = useRef<SVGPolylineElement>(null)
  const rows = useRef<HTMLElement[]>([])
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
          !resume.current ||
          !energyValue.current ||
          !oeeValue.current ||
          !chart.current
        ) {
          return
        }
        const scene = mountHero(
          canvas.current,
          {
            stop: stop.current,
            stopValue: stopValue.current,
            resume: resume.current,
            energyValue: energyValue.current,
            oeeValue: oeeValue.current,
            chart: chart.current,
            rows: STATIONS.map((_, index) => ({
              dot: rows.current[index * 2],
              state: rows.current[index * 2 + 1],
            })),
          },
          { run: t("stateRun"), warn: t("stateWait"), stop: t("stateStop") },
          { compact: window.innerWidth < 768, locale }
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
  }, [t, locale])

  return (
    <div className="relative isolate z-30 aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#05060f] shadow-xl ring-1 ring-white/10">
      <Image
        src="/images/hero/factory-poster.jpg"
        alt={t("animationAlt")}
        fill
        sizes="(max-width: 640px) 100vw, 66vw"
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
      {/* Winieta skupia wzrok na linii produkcyjnej */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,6,15,0.65)_100%)]" />

      <div className={ready ? "contents" : "hidden"} aria-hidden="true">
        {/* Mini panel OmniMES */}
        <div className="pointer-events-none absolute left-2 top-2 z-10 w-36 rounded-lg border border-white/15 bg-black/65 p-2 text-[10px] text-white backdrop-blur sm:left-3 sm:top-3 sm:w-48 sm:p-2.5 sm:text-[11px]">
          <div className="mb-1 flex items-center justify-between font-semibold">
            <span>OmniMES</span>
            <span className="font-normal text-white/60">{t("hudLine")}</span>
          </div>
          <ul className="hidden space-y-0.5 sm:block">
            {STATIONS.map((station, index) => (
              <li key={station} className="flex items-center gap-1.5">
                <span
                  ref={(element) => {
                    if (element) rows.current[index * 2] = element
                  }}
                  className="size-2 rounded-full bg-[#22e58a] transition-colors"
                />
                <span className="grow">{t(station)}</span>
                <span
                  ref={(element) => {
                    if (element) rows.current[index * 2 + 1] = element
                  }}
                  className="text-white/60"
                />
              </li>
            ))}
          </ul>
          <div className="mt-1 flex justify-between border-t border-white/10 pt-1 font-semibold sm:mt-1.5 sm:pt-1.5">
            <span>
              OEE <span ref={oeeValue} className="tabular-nums" />
            </span>
            <span>
              <span ref={energyValue} className="tabular-nums" /> kWh/{t("chipUnit")}
            </span>
          </div>
          <svg viewBox="0 0 117 32" className="mt-1 hidden h-6 w-full sm:block" aria-hidden="true">
            <polyline
              ref={chart}
              fill="none"
              stroke="#7c5cff"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div ref={stop} className={`${chipClass} border-red-400/60 bg-red-600/85`}>
          {t("chipStop")} <span ref={stopValue} className="tabular-nums" />
        </div>
        <div ref={resume} className={`${chipClass} border-emerald-300/60 bg-emerald-600/85`}>
          {t("chipResume")}
        </div>
      </div>

      <p className="absolute bottom-2 right-3 z-10 rounded bg-black/55 px-1.5 py-0.5 text-[10px] text-white/70 sm:text-[11px]">
        {t("animationNote")}
      </p>
    </div>
  )
}
