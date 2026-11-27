"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

// BO-1439: zamiast statycznego schematu PNG (ok. 930 KB) — animowane porównanie jednej zmiany
// „bez OmniMES” i „z OmniMES”. Szerokości pasków i liczby przechodzą płynnie (CSS transition).

type Phase = "before" | "after"

const SEGMENTS = [
  { key: "run", color: "bg-emerald-500", before: 300, after: 372 },
  { key: "micro", color: "bg-amber-400", before: 68, after: 38 },
  { key: "fail", color: "bg-red-500", before: 47, after: 22 },
  { key: "setup", color: "bg-sky-400", before: 40, after: 32 },
  { key: "material", color: "bg-violet-400", before: 25, after: 16 },
] as const

const KPI = [
  { key: "oee", before: "57%", after: "71%", good: "up" },
  { key: "pieces", before: "1 240", after: "1 535", good: "up" },
  { key: "lossCost", before: "4 900", after: "2 650", good: "down" },
  { key: "kwh", before: "0,94", after: "0,79", good: "down" },
] as const

export const ProfitLossVisual = () => {
  const t = useTranslations("ProfitLoss")
  const [phase, setPhase] = useState<Phase>("before")
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("after")
      return
    }
    const id = setInterval(() => setPhase((p) => (p === "before" ? "after" : "before")), 4200)
    return () => clearInterval(id)
  }, [auto])

  const isAfter = phase === "after"
  const pick = (p: Phase) => {
    setAuto(false)
    setPhase(p)
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-md dark:border-white/10 dark:bg-neutral-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {t("title")}
        </span>
        <div
          role="tablist"
          aria-label={t("toggleAria")}
          className="flex rounded-full bg-gray-100 p-1 text-sm dark:bg-white/10"
        >
          {(["before", "after"] as const).map((p) => (
            <button
              key={p}
              role="tab"
              aria-selected={phase === p}
              onClick={() => pick(p)}
              className={`rounded-full px-3 py-1 font-medium transition ${
                phase === p
                  ? p === "after"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow"
                    : "bg-white text-gray-900 shadow dark:bg-neutral-700 dark:text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {t(p)}
            </button>
          ))}
        </div>
      </div>

      {/* Zmiana 480 minut: praca i straty */}
      <p className="mb-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {t("shift")}
      </p>
      <div className="flex h-9 w-full overflow-hidden rounded-lg">
        {SEGMENTS.map((s) => {
          const minutes = isAfter ? s.after : s.before
          const hidden = !isAfter && s.key !== "run"
          return (
            <div
              key={s.key}
              className={`flex items-center justify-center overflow-hidden text-xs font-semibold text-white transition-all duration-1000 ease-in-out ${
                hidden ? "bg-gray-400 dark:bg-gray-600" : s.color
              }`}
              style={{ width: `${(minutes / 480) * 100}%` }}
              title={`${t(`seg.${s.key}`)}: ${minutes} min`}
            >
              {s.key === "run" ? `${minutes} min` : hidden ? "?" : minutes}
            </div>
          )
        })}
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 sm:grid-cols-3 dark:text-gray-400">
        {(isAfter ? SEGMENTS : SEGMENTS.slice(0, 2)).map((s) => (
          <li key={s.key} className="flex items-center gap-1.5">
            <i
              className={`inline-block size-2.5 rounded-sm transition-colors duration-1000 ${
                !isAfter && s.key !== "run" ? "bg-gray-400 dark:bg-gray-600" : s.color
              }`}
            />
            {!isAfter && s.key !== "run" ? t("unknown") : t(`seg.${s.key}`)}
          </li>
        ))}
      </ul>

      <p
        className={`mt-4 rounded-lg px-3 py-2 text-sm transition-colors duration-700 ${
          isAfter
            ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
            : "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300"
        }`}
        aria-live="polite"
      >
        {isAfter ? t("afterNote") : t("beforeNote")}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {KPI.map((k) => (
          <div
            key={k.key}
            className="rounded-xl border border-gray-100 p-3 dark:border-white/10 dark:bg-white/5"
          >
            <dt className="text-xs text-gray-500 dark:text-gray-400">{t(`kpi.${k.key}`)}</dt>
            <dd
              className={`mt-1 font-mono text-lg font-bold tabular-nums transition-colors duration-700 ${
                isAfter ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"
              }`}
            >
              {isAfter ? k.after : k.before}
              {k.key === "lossCost" ? ` ${t("currency")}` : ""}
              {isAfter && (
                <span className="ml-1 text-xs" aria-hidden>
                  {k.good === "up" ? "▲" : "▼"}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <figcaption className="mt-3 text-xs text-gray-500 dark:text-gray-400">{t("note")}</figcaption>
    </figure>
  )
}
