"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { FaCompress, FaExpand, FaPause, FaPlay } from "react-icons/fa"

import { useFullscreen } from "./useFullscreen"

const chipClass =
  "pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-md border px-2 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur transition-opacity duration-300 sm:text-xs"

const STATIONS = ["stationPress", "stationCnc", "stationPack", "stationRobot"]

export type Motion = "full" | "calm" | "none"

/**
 * Ruch scen 3D. Przy „ograniczonym ruchu” (ustawienie systemu, a także każda sesja Pulpitu zdalnego
 * w Windows) sceny dalej żyją, tylko kamera nie lata. Bez ruchu zostaje tylko oszczędzanie danych.
 */
export function motionMode(): Motion {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (connection?.saveData) return "none"
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "calm" : "full"
}

export const HeroFactory = () => {
  const t = useTranslations("HeroSection")
  const locale = useLocale()
  const frame = useRef<HTMLDivElement>(null)
  const screen = useFullscreen(frame)
  const canvas = useRef<HTMLCanvasElement>(null)
  const stop = useRef<HTMLDivElement>(null)
  const stopValue = useRef<HTMLSpanElement>(null)
  const resume = useRef<HTMLDivElement>(null)
  const energyValue = useRef<HTMLSpanElement>(null)
  const oeeValue = useRef<HTMLSpanElement>(null)
  const chart = useRef<SVGPolylineElement>(null)
  const rows = useRef<HTMLElement[]>([])
  const scene = useRef<{ setPaused: (paused: boolean) => void } | null>(null)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const motion = motionMode()
    if (motion === "none") return
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
        const mounted = await mountHero(
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
          {
            compact: window.innerWidth < 768,
            calm: motion === "calm",
            locale,
            // Scena zastępuje obraz startowy dopiero wtedy, gdy rysuje płynnie
            onShown: () => {
              if (!cancelled) setReady(true)
            },
          }
        )
        if (cancelled) {
          mounted.dispose()
        } else {
          dispose = mounted.dispose
          scene.current = mounted
        }
      } catch {
        // Bez WebGL zostaje obraz startowy
      }
    }

    start()
    return () => {
      cancelled = true
      scene.current = null
      dispose?.()
    }
  }, [t, locale])

  const togglePause = () => {
    scene.current?.setPaused(!paused)
    setPaused(!paused)
  }

  return (
    // Cienka ramka w kolorach marki i poświata pod spodem osadzają scenę w tle sekcji
    <div className="relative rounded-2xl bg-gradient-to-br from-[#2f9bff]/55 via-white/10 to-[#FF1CF7]/55 p-px shadow-[0_28px_90px_-30px_rgba(124,92,255,0.6)]">
      <div
        ref={frame}
        className="relative isolate z-30 aspect-[16/9] w-full overflow-hidden rounded-[15px] bg-[#05060f] [&:fullscreen]:aspect-auto [&:fullscreen]:rounded-none"
      >
        {/* Obraz startowy to pierwsza klatka sceny, więc podmiana na animację jest niewidoczna */}
        <Image
          src="/images/hero/factory-poster.jpg"
          alt={t("animationAlt")}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 62vw, 800px"
          className="object-cover"
        />
        <canvas
          ref={canvas}
          role="img"
          aria-label={t("animationAlt")}
          className={`absolute inset-0 size-full transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Winieta skupia wzrok na linii produkcyjnej */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,6,15,0.65)_100%)]" />

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Mini panel OmniMES */}
          <div
            className={`pointer-events-none absolute left-2 top-2 z-10 w-36 rounded-lg border border-white/15 bg-black/65 p-2 text-[10px] text-white backdrop-blur sm:left-3 sm:top-3 sm:w-48 sm:p-2.5 sm:text-[11px] ${
              screen.active ? "origin-top-left scale-150" : ""
            }`}
          >
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
            <svg
              viewBox="0 0 117 32"
              className="mt-1 hidden h-6 w-full sm:block"
              aria-hidden="true"
            >
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

        {screen.supported && (
          <button
            type="button"
            onClick={screen.toggle}
            aria-label={screen.active ? t("exitFullscreen") : t("fullscreen")}
            title={screen.active ? t("exitFullscreen") : t("fullscreen")}
            className={`absolute top-3 z-20 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:bg-black/80 ${
              ready ? "right-14" : "right-3"
            }`}
          >
            {screen.active ? <FaCompress size={13} /> : <FaExpand size={13} />}
          </button>
        )}
        {ready && (
          <button
            type="button"
            onClick={togglePause}
            aria-label={paused ? t("play") : t("pause")}
            title={paused ? t("play") : t("pause")}
            className="absolute right-3 top-3 z-20 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
          >
            {paused ? <FaPlay size={12} /> : <FaPause size={12} />}
          </button>
        )}

        <p className="absolute bottom-2 right-3 z-10 rounded bg-black/45 px-1.5 py-0.5 text-[10px] text-white/60 sm:text-[11px]">
          {t("animationNote")}
        </p>
      </div>
    </div>
  )
}
