"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { FaCompress, FaExpand, FaPause, FaPlay } from "react-icons/fa"

import { canAnimate } from "./HeroFactory"
import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"
import { useFullscreen } from "./useFullscreen"

const STEPS = ["line", "plc", "gateway", "server", "database", "panels"]
const ROLES = ["roleOperator", "roleMaintenance", "roleManager", "roleEnergy", "roleExecutive"]
const OVERVIEW = STEPS.length

type Scene = {
  setStage: (stage: number) => void
  setPaused: (paused: boolean) => void
  dispose: () => void
}

export const EcosystemFlow = () => {
  const t = useTranslations("Ecosystem")
  const section = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const screen = useFullscreen(frame)
  const canvas = useRef<HTMLCanvasElement>(null)
  const scene = useRef<Scene | null>(null)
  const stations = useRef<HTMLElement[]>([])
  const roles = useRef<HTMLElement[]>([])
  const [ready, setReady] = useState(false)
  const [animated, setAnimated] = useState(false)
  const [stage, setStage] = useState(OVERVIEW)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!section.current) return
    let cancelled = false

    const start = async () => {
      try {
        const { mountEcosystem } = await import("./three/ecosystemScene")
        if (cancelled || !canvas.current) return
        const moving = canAnimate()
        scene.current = mountEcosystem(
          canvas.current,
          {
            gateway: "cMT-G01X",
            panels: [
              { role: t("roleOperator"), kind: "status" },
              { role: t("roleMaintenance"), kind: "alarms" },
              { role: t("roleManager"), kind: "oee" },
              { role: t("roleEnergy"), kind: "energy" },
              { role: t("roleExecutive"), kind: "report" },
            ],
          },
          { stations: stations.current, roles: roles.current },
          { compact: window.innerWidth < 768, still: !moving, onStage: setStage }
        )
        setAnimated(moving)
        setReady(true)
      } catch {
        // Bez WebGL zostaje obraz i lista kroków
      }
    }

    // Three.js ładuje się dopiero, gdy czytelnik zbliża się do sekcji
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          start()
        }
      },
      { rootMargin: "300px" }
    )
    observer.observe(section.current)

    return () => {
      cancelled = true
      observer.disconnect()
      scene.current?.dispose()
      scene.current = null
    }
  }, [t])

  const choose = (index: number) => {
    scene.current?.setStage(index)
    setStage(index)
  }
  const togglePause = () => {
    scene.current?.setPaused(!paused)
    setPaused(!paused)
  }

  // Na ujęciu z góry etykiety są większe, bo obiekty stają się małe
  const wide = stage === OVERVIEW
  const labelClass = `pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-md border border-white/25 bg-[#05060f]/85 px-2 py-0.5 font-semibold text-white shadow-lg backdrop-blur transition-[font-size] duration-500 ${
    screen.active ? "text-lg sm:text-2xl" : wide ? "text-sm sm:text-lg" : "text-xs sm:text-sm"
  }`

  return (
    <section
      ref={section}
      id="jak-to-dziala"
      className="mx-auto mt-16 max-w-7xl scroll-mt-24 px-6 sm:mt-24 sm:px-8"
    >
      <div className="md:text-center">
        <SubtitleNormal text={t("smallSubtitle")} />
        <Heading text={t("title")} />
        <DescriptionPrimary text={t("description")} />
      </div>

      <div
        ref={frame}
        className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#05060f] shadow-xl ring-1 ring-white/10 sm:aspect-[21/9] [&:fullscreen]:mt-0 [&:fullscreen]:aspect-auto [&:fullscreen]:rounded-none"
      >
        <Image
          src="/images/hero/ecosystem-poster.jpg"
          alt={t("animationAlt")}
          fill
          sizes="(max-width: 1280px) 100vw, 1216px"
          loading="lazy"
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
          {[...STEPS, "serverGroup", "robot"].map((step, index) => {
            const extra = index >= STEPS.length
            return (
              <div
                key={step}
                ref={(element) => {
                  if (element) stations.current[index] = element
                }}
                className={`${labelClass} ${
                  extra ? "border-violet-400/70 text-violet-100" : ""
                } ${extra && wide ? "hidden sm:block" : ""}`}
              >
                {/* Na telefonie widok z góry pokazuje numery kroków z listy poniżej */}
                {wide && !extra && <span className="sm:hidden">{index + 1}</span>}
                <span className={wide && !extra ? "hidden sm:inline" : ""}>
                  {t(step === "robot" && wide ? "robotShort" : `${step}Label`)}
                </span>
              </div>
            )
          })}
          {ROLES.map((role, index) => (
            <div
              key={role}
              ref={(element) => {
                if (element) roles.current[index] = element
              }}
              className={`pointer-events-none absolute left-0 top-0 z-10 hidden whitespace-nowrap rounded bg-[#05060f]/85 px-1.5 py-0.5 text-[11px] font-semibold text-white sm:block sm:text-xs ${
                stage === OVERVIEW - 1 || wide ? "" : "!hidden"
              }`}
            >
              {t(role)}
            </div>
          ))}

          {/* Ta sama informacja na każdym etapie drogi */}
          {!wide && (
            <div className="pointer-events-none absolute left-2 top-2 z-20 max-w-[78%] rounded-lg border border-red-400/40 bg-[#05060f]/85 p-2 text-white shadow-lg backdrop-blur sm:left-3 sm:top-3 sm:max-w-md sm:p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-red-300 sm:text-xs">
                {t("dataLabel")}
              </p>
              <p className="mt-0.5 font-mono text-xs sm:text-sm">{t(`${STEPS[stage]}Data`)}</p>
            </div>
          )}
        </div>

        {screen.supported && (
          <button
            type="button"
            onClick={screen.toggle}
            aria-label={screen.active ? t("exitFullscreen") : t("fullscreen")}
            title={screen.active ? t("exitFullscreen") : t("fullscreen")}
            className="absolute right-14 top-3 z-20 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
          >
            {screen.active ? <FaCompress size={13} /> : <FaExpand size={13} />}
          </button>
        )}
        {animated && (
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
        <p className="absolute bottom-2 right-3 z-10 rounded bg-black/55 px-1.5 py-0.5 text-[10px] text-white/70 sm:text-[11px]">
          {t("dataNote")}
        </p>
      </div>

      <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step}>
            <button
              type="button"
              onClick={() => choose(index)}
              aria-current={stage === index ? "step" : undefined}
              className={`size-full rounded-xl border p-4 text-left transition ${
                stage === index
                  ? "border-primary-500 dark:bg-content1 bg-white shadow-md"
                  : "border-default-200 hover:border-primary-300 dark:bg-content1/40 bg-white/60"
              }`}
            >
              <span className="text-primary-500 text-sm font-semibold">
                {index + 1}. {t(`${step}Title`)}
              </span>
              <span className="mt-1 block text-sm text-gray-600 dark:text-gray-400">
                {t(`${step}Text`)}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}
