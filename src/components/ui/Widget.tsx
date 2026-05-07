"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { useIsClient, useWindowSize } from "usehooks-ts"

export type WidgetItem = {
  kind: "news" | "post"
  label: string
  badge: string
  text: string
  href: string
}

type WidgetProps = {
  items: WidgetItem[]
}

const ROTATION_MS = 7000

export const Widget = ({ items }: WidgetProps) => {
  const isClient = useIsClient()
  const pathname = usePathname()
  const { width = 0 } = useWindowSize()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (items.length <= 1 || paused || reducedMotion) return
    timerRef.current = setTimeout(() => {
      setFading(true)
      setTimeout(() => {
        setIndex((i) => (i + 1) % items.length)
        setFading(false)
      }, 250)
    }, ROTATION_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [index, items.length, paused, reducedMotion])

  if (pathname == null) return null

  const forbiddenPaths = [
    "demo",
    "login",
    "kontakt",
    "contact",
    "register",
    "rejestracja",
    "oferta",
    "offer",
    "angebot",
    "about",
    "ueber-uns",
    "o-nas",
    "gallery",
    "galeria",
    "galerie",
    "verify-email",
    "email-verifizieren",
    "zweryfikuj-email",
    "admin",
    "admin\\/(?:[^\\/]+)",
    "admin\\/(?:[^\\/]+)\\/(?:[^\\/]+)",
    "outstatic",
    "outstatic\\/(?:[^\\/]+)",
    "outstatic\\/(?:[^\\/]+)\\/(?:[^\\/]+)",
    "dashboard",
    "dashboard\\/(?:[^\\/]+)",
    "dashboard\\/(?:[^\\/]+)\\/(?:[^\\/]+)",
    "dokumentacja",
    "dokumentacja\\/(?:[^\\/]+)",
    "dokumentacja\\/(?:[^\\/]+)\\/(?:[^\\/]+)",
    "documentation",
    "documentation\\/(?:[^\\/]+)",
    "documentation\\/(?:[^\\/]+)\\/(?:[^\\/]+)",
  ]
  const forbiddenPathsRegex = forbiddenPaths.join("|")
  const localePrefixRegex = new RegExp(`^\\/(de|pl|en)(\\/(?!${forbiddenPathsRegex}$).*)?$`)
  if (!localePrefixRegex.test(pathname)) return null

  if (!isClient || width <= 690 || items.length === 0) return null

  const current = items[index] ?? items[0]
  const badgeColor =
    current.kind === "news"
      ? "bg-pink-500/10 text-pink-600 dark:bg-pink-400/15 dark:text-pink-300"
      : "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300"

  return (
    <div
      className="border-b-1 border-divider bg-background relative isolate z-50 flex min-h-[44px] items-center justify-center overflow-hidden px-6 py-2 sm:px-3.5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-20 dark:from-[#F54180] dark:to-[#338EF7] dark:opacity-10"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        ></div>
      </div>
      <div
        aria-hidden="true"
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r  from-[#ff80b5] to-[#9089fc] opacity-30 dark:from-[#F54180]  dark:to-[#338EF7] dark:opacity-20"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        ></div>
      </div>
      <div
        className="flex w-full items-center justify-center gap-x-3"
        aria-live="polite"
        aria-atomic="true"
      >
        <a
          key={current.href}
          className={`text-small text-foreground flex items-center gap-2 transition-opacity duration-300 hover:opacity-80 sm:text-[0.93rem] ${
            fading ? "opacity-0" : "opacity-100"
          }`}
          href={current.href}
          rel="noopener noreferrer"
        >
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badgeColor}`}
          >
            {current.badge}
          </span>
          <span className="text-foreground/80 hidden font-medium md:inline">{current.label}</span>
          <span
            className="animate-text-gradient inline-flex bg-[linear-gradient(90deg,#D6009A_0%,#8a56cc_50%,#D6009A_100%)] bg-clip-text font-medium text-transparent dark:bg-[linear-gradient(90deg,#FFEBF9_0%,#8a56cc_50%,#FFEBF9_100%)]"
            style={{
              fontSize: "inherit",
              backgroundSize: "200%",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {current.text}
          </span>
        </a>
      </div>
    </div>
  )
}
