"use client"

import { useEffect, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { FaArrowRight, FaBell, FaMicrochip, FaSearchPlus } from "react-icons/fa"

import Link from "@/components/LocaleLink"

import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"

// BO-1439: zamiast zegara Spline (silnik ok. 2 MB) — kalkulator kosztu mikroprzestojów
// z animowaną osią zmiany. Czysty React + CSS, bez bibliotek.

const WORKDAYS = 250

// Oś jednej zmiany (480 min): przerwy w pracy maszyny, w minutach od początku zmiany
const STOPS: { at: number; len: number; kind: "micro" | "fail" | "setup" }[] = [
  { at: 34, len: 4, kind: "micro" },
  { at: 71, len: 6, kind: "micro" },
  { at: 102, len: 22, kind: "fail" },
  { at: 150, len: 3, kind: "micro" },
  { at: 188, len: 5, kind: "micro" },
  { at: 236, len: 28, kind: "setup" },
  { at: 291, len: 4, kind: "micro" },
  { at: 330, len: 7, kind: "micro" },
  { at: 372, len: 3, kind: "micro" },
  { at: 401, len: 14, kind: "fail" },
  { at: 446, len: 5, kind: "micro" },
]

const STOP_COLOR = { micro: "bg-amber-400", fail: "bg-red-500", setup: "bg-sky-400" }

function useCountUp(value: number, ms = 600) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setShown(value)
      from.current = value
      return
    }
    const start = performance.now()
    const a = from.current
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms)
      const eased = 1 - Math.pow(1 - p, 3)
      setShown(a + (value - a) * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else from.current = value
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      from.current = value
    }
  }, [value, ms])
  return shown
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="shrink-0 whitespace-nowrap font-mono text-sm font-semibold tabular-nums text-gray-900 dark:text-white">
          {value.toLocaleString("pl-PL")} {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-pink-500 dark:bg-gray-700"
      />
    </div>
  )
}

export const DowntimeCost = () => {
  const t = useTranslations("Time")
  const locale = useLocale()
  const [machines, setMachines] = useState(12)
  const [cost, setCost] = useState(600)
  const [minutes, setMinutes] = useState(25)
  const [shifts, setShifts] = useState(2)
  const [recover, setRecover] = useState(30)

  const yearlyHours = (machines * minutes * shifts * WORKDAYS) / 60
  const loss = Math.round(yearlyHours * cost)
  const gain = Math.round((loss * recover) / 100)
  const shownLoss = useCountUp(loss)
  const shownGain = useCountUp(gain)
  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === "pl" ? "pl-PL" : "en-GB", {
      maximumFractionDigits: 0,
    }).format(Math.round(n))
  const currency = locale === "pl" ? "zł" : "PLN"

  const how = [
    { icon: <FaMicrochip />, title: t("how1Title"), body: t("how1") },
    { icon: <FaSearchPlus />, title: t("how2Title"), body: t("how2") },
    { icon: <FaBell />, title: t("how3Title"), body: t("how3") },
  ]

  return (
    <section id="koszt-postoju" className="scroll-mt-20 py-16" aria-labelledby="downtime-heading">
      <div className="mb-10 md:mb-12 md:text-center lg:mx-auto">
        <SubtitleNormal text={t("smallSubtitle")} />
        <div id="downtime-heading">
          <Heading text={t("heading")} />
        </div>
        <DescriptionPrimary text={t("description")} />
      </div>

      {/* Oś zmiany: skaner przesuwa się po zmianie i „łapie” każdy przestój */}
      <figure className="mx-auto mb-10 max-w-5xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-gray-900 dark:text-white">{t("timelineTitle")}</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <i className="inline-block size-2.5 rounded-sm bg-emerald-500" /> {t("legendRun")}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="inline-block size-2.5 rounded-sm bg-amber-400" /> {t("legendMicro")}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="inline-block size-2.5 rounded-sm bg-red-500" /> {t("legendFail")}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="inline-block size-2.5 rounded-sm bg-sky-400" /> {t("legendSetup")}
            </span>
          </span>
        </div>
        <div className="downtime-track relative h-10 overflow-hidden rounded-lg bg-emerald-500/90">
          {STOPS.map((s, i) => (
            <span
              key={i}
              className={`downtime-stop absolute inset-y-0 ${STOP_COLOR[s.kind]}`}
              style={{
                left: `${(s.at / 480) * 100}%`,
                width: `${Math.max(0.6, (s.len / 480) * 100)}%`,
                animationDelay: `${(s.at / 480) * 6}s`,
              }}
            />
          ))}
          <span className="downtime-scan absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.6)]" />
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-xs text-gray-500">
          <span>06:00</span>
          <span>10:00</span>
          <span>14:00</span>
        </div>
        <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {t("timelineCaption")}
        </figcaption>
      </figure>

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-5">
        <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-3 dark:border-white/10 dark:bg-white/5">
          <p className="text-base font-semibold text-gray-900 dark:text-white">{t("calcTitle")}</p>
          <Slider
            id="dc-machines"
            label={t("machines")}
            value={machines}
            min={1}
            max={100}
            step={1}
            unit={t("unitMachines")}
            onChange={setMachines}
          />
          <Slider
            id="dc-minutes"
            label={t("minutes")}
            value={minutes}
            min={5}
            max={90}
            step={5}
            unit="min"
            onChange={setMinutes}
          />
          <Slider
            id="dc-shifts"
            label={t("shifts")}
            value={shifts}
            min={1}
            max={3}
            step={1}
            unit=""
            onChange={setShifts}
          />
          <Slider
            id="dc-cost"
            label={t("cost")}
            value={cost}
            min={100}
            max={3000}
            step={50}
            unit={`${currency}/h`}
            onChange={setCost}
          />
          <Slider
            id="dc-recover"
            label={t("recover")}
            value={recover}
            min={10}
            max={60}
            step={5}
            unit="%"
            onChange={setRecover}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">{t("assumptions")}</p>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-br from-pink-600 to-purple-700 p-6 text-white shadow-xl lg:col-span-2">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/80">{t("lossLabel")}</p>
            <p className="mt-1 font-mono text-4xl font-bold tabular-nums" aria-live="polite">
              {fmt(shownLoss)} {currency}
            </p>
            <p className="mt-1 text-sm text-white/80">
              {t("lossHours", { hours: fmt(yearlyHours) })}
            </p>
          </div>
          <div className="rounded-xl bg-white/15 p-4">
            <p className="text-sm text-white/85">{t("gainLabel", { pct: recover })}</p>
            <p className="mt-1 font-mono text-3xl font-bold tabular-nums">
              +{fmt(shownGain)} {currency}
            </p>
          </div>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-purple-700 transition hover:bg-pink-50"
          >
            {t("cta")}
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
        {how.map((h) => (
          <div key={h.title} className="flex gap-4">
            <div className="bg-secondary-100/80 flex size-10 shrink-0 items-center justify-center rounded-full text-pink-500">
              {h.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{h.title}</h3>
              <p className="text-default-500 mt-1 text-base">{h.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
