"use client"

import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { useIsClient, useWindowSize } from "usehooks-ts"

type WidgetProps = {
  text: string
  href?: string
}
export const Widget = ({ text, href }: WidgetProps) => {
  const t = useTranslations("Widget")
  const isClient = useIsClient()
  const pathname = usePathname()
  const { width = 0 } = useWindowSize()

  if (pathname == null) return null
  // nie chcę wyświetlać na stronach:
  // kontakt, oferta, o nas - dodawaj opcjonalnie po | w regexp poniżej
  // const localePrefixRegex =
  // /^\/(de|pl|en)(\/(?!about$|ueber-uns$|o-nas$|kontakt$|contact$|oferta$|offer$|angebot$|demo$|login$|register$|rejestracja$|admin$|admin\/(?:[^\/]+)$|admin\/(?:[^\/]+)\/(?:[^\/]+)$|dashboard$|dashboard\/(?:[^\/]+)$|dashboard\/(?:[^\/]+)\/(?:[^\/]+)$|documentation$|documentation\/(?:[^\/]+)$|documentation\/(?:[^\/]+)\/(?:[^\/]+)$|gallery$|galeria$|galerie$|outstatic$|outstatic\/(?:[^\/]+)$|outstatic\/(?:[^\/]+)\/(?:[^\/]+)$).*)?$/

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
    "admin\/(?:[^\/]+)",
    "admin\/(?:[^\/]+)\/(?:[^\/]+)",
    "outstatic",
    "outstatic\/(?:[^\/]+)",
    "outstatic\/(?:[^\/]+)\/(?:[^\/]+)",
    "dashboard",
    "dashboard\/(?:[^\/]+)",
    "dashboard\/(?:[^\/]+)\/(?:[^\/]+)",
    "dokumentacja",
    "dokumentacja\/(?:[^\/]+)",
    "dokumentacja\/(?:[^\/]+)\/(?:[^\/]+)",
    "documentation",
    "documentation\/(?:[^\/]+)",
    "documentation\/(?:[^\/]+)\/(?:[^\/]+)",
  ]

  const forbiddenPathsRegex = forbiddenPaths.join("|")
  const localePrefixRegex = new RegExp(`^\/(de|pl|en)(\/(?!${forbiddenPathsRegex}$).*)?$`)

  if (!localePrefixRegex.test(pathname)) {
    return null
  }

  return (
    <>
      {isClient && width > 690 ? (
        <div className="border-b-1 border-divider bg-background relative isolate z-50 flex items-center justify-center overflow-hidden px-6 py-2 sm:px-3.5">
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
          <div className="flex w-full items-center justify-center gap-x-3">
            <a
              className="text-small text-foreground flex items-center gap-2 transition-opacity hover:opacity-80 sm:text-[0.93rem]"
              href={href}
              rel="noopener noreferrer"
            >
              <span aria-label="rocket" className="hidden md:block" role="img">
                🚀
              </span>
              <span className="text-foreground/80 font-medium">{t("latestNews")}</span>
              <span
                className="animate-text-gradient inline-flex bg-[linear-gradient(90deg,#D6009A_0%,#8a56cc_50%,#D6009A_100%)] bg-clip-text font-medium text-transparent dark:bg-[linear-gradient(90deg,#FFEBF9_0%,#8a56cc_50%,#FFEBF9_100%)]"
                style={{
                  fontSize: "inherit",
                  backgroundSize: "200%",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {text}
              </span>
            </a>
          </div>
        </div>
      ) : null}
    </>
  )
}
