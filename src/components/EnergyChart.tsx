import { useTranslations } from "next-intl"

// BO-1439: zamiast zrzutu wykresu punktowego — lekki wykres SVG „energia na sztukę według
// stanów maszyny”, czytelny w obu motywach. Dane przykładowe.

const ROWS = [
  { key: "press", run: 1820, idle: 410, stop: 120, perUnit: "0,42" },
  { key: "cnc", run: 1340, idle: 520, stop: 90, perUnit: "1,18" },
  { key: "molding", run: 2310, idle: 260, stop: 140, perUnit: "0,31" },
  { key: "compressor", run: 1460, idle: 690, stop: 60, perUnit: "—" },
  { key: "paint", run: 980, idle: 180, stop: 210, perUnit: "0,74" },
]

const MAX = 3300
const W = 640
const LABEL = 132
const BAR_W = 380
const ROW_H = 46

export const EnergyChart = () => {
  const t = useTranslations("EnergyChart")
  const scale = (v: number) => (v / MAX) * BAR_W
  const h = ROWS.length * ROW_H + 40

  return (
    <figure className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md dark:border-white/10 dark:bg-neutral-900">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <figcaption className="text-sm font-semibold text-gray-900 dark:text-white">
          {t("title")}
        </figcaption>
        <span className="text-xs text-gray-500 dark:text-gray-400">{t("period")}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${h}`} className="h-auto w-full" role="img" aria-label={t("aria")}>
        <text x={LABEL + BAR_W + 20} y={14} className="fill-gray-500 text-[11px]" fontSize="11">
          {t("perUnit")}
        </text>
        {ROWS.map((r, i) => {
          const y = 26 + i * ROW_H
          const wRun = scale(r.run)
          const wIdle = scale(r.idle)
          const wStop = scale(r.stop)
          return (
            <g key={r.key}>
              <text x={0} y={y + 18} fontSize="13" className="fill-gray-700 dark:fill-gray-300">
                {t(`m.${r.key}`)}
              </text>
              <g className="energy-bar" style={{ animationDelay: `${i * 0.12}s` }}>
                <rect
                  x={LABEL}
                  y={y + 4}
                  width={wRun}
                  height={20}
                  rx={3}
                  className="fill-emerald-500"
                />
                <rect
                  x={LABEL + wRun}
                  y={y + 4}
                  width={wIdle}
                  height={20}
                  className="fill-amber-400"
                />
                <rect
                  x={LABEL + wRun + wIdle}
                  y={y + 4}
                  width={wStop}
                  height={20}
                  rx={3}
                  className="fill-gray-400 dark:fill-gray-500"
                />
              </g>
              <text
                x={LABEL + wRun + wIdle + wStop + 6}
                y={y + 19}
                fontSize="11"
                className="fill-gray-500 dark:fill-gray-400"
              >
                {(r.run + r.idle + r.stop).toLocaleString("pl-PL")} kWh
              </text>
              <text
                x={LABEL + BAR_W + 20}
                y={y + 19}
                fontSize="14"
                fontWeight="700"
                className="fill-gray-900 dark:fill-white"
              >
                {r.perUnit}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <i className="inline-block size-2.5 rounded-sm bg-emerald-500" /> {t("run")}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block size-2.5 rounded-sm bg-amber-400" /> {t("idle")}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block size-2.5 rounded-sm bg-gray-400" /> {t("stop")}
        </span>
      </div>
      <p className="mt-4 rounded-lg border-l-4 border-amber-400 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
        {t("insight")}
      </p>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{t("note")}</p>
    </figure>
  )
}
