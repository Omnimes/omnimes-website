"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { FaPause, FaPlay } from "react-icons/fa"

import { canAnimate } from "./HeroFactory"
import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"

const STEPS = ["line", "plc", "gateway", "server", "database", "panels"]

type Scene = { setStage: (stage: number) => void; setPaused: (paused: boolean) => void; dispose: () => void }

export const EcosystemFlow = () => {
  const t = useTranslations("Ecosystem")
  const section = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const scene = useRef<Scene | null>(null)
  const [ready, setReady] = useState(false)
  const [animated, setAnimated] = useState(false)
  const [stage, setStage] = useState(0)
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
            stations: STEPS.map((step) => t(`${step}Label`)),
            panels: [
              { role: t("roleOperator"), kind: "status" },
              { role: t("roleMaintenance"), kind: "alarms" },
              { role: t("roleManager"), kind: "oee" },
              { role: t("roleEnergy"), kind: "energy" },
              { role: t("roleExecutive"), kind: "report" },
            ],
          },
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

  return (
    <section ref={section} id="jak-to-dziala" className="mx-auto mt-16 max-w-7xl scroll-mt-24 px-6 sm:mt-24 sm:px-8">
      <div className="md:text-center">
        <SubtitleNormal text={t("smallSubtitle")} />
        <Heading text={t("title")} />
        <DescriptionPrimary text={t("description")} />
      </div>

      <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#05060f] shadow-xl ring-1 ring-white/10 sm:aspect-[21/9]">
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
        {animated && (
          <button
            type="button"
            onClick={togglePause}
            aria-label={paused ? t("play") : t("pause")}
            title={paused ? t("play") : t("pause")}
            className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
          >
            {paused ? <FaPlay size={12} /> : <FaPause size={12} />}
          </button>
        )}
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
