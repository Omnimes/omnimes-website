// import { Button, Link } from "@nextui-org/react"
// import { useTranslations } from "next-intl"

// import { Skeleton } from "@nextui-org/react"
// import { Suspense } from "react"
// import { AnchorIcon, VideoPlayIcon } from "./ui/Icons"

// export const Hero = () => {
//   const t = useTranslations("HeroSection")
//   return (
//     <div className="h-100 relative flex min-h-96 w-full flex-col justify-start sm:-mt-8 sm:mb-0 sm:h-[calc(100svh-65px)] sm:justify-center">
//       <section className="h-100 mt-8 flex flex-col justify-between gap-6">
//         <div>
//           <h1
//             className="animate-fade-up font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] sm:text-4xl md:text-7xl md:leading-[5rem] dark:from-white"
//             style={{ animationDelay: "0", animationFillMode: "forwards" }}
//           >
//             {t("title")}&nbsp;
//             <span className="inline bg-gradient-to-b  from-[#FF1CF7] to-[#b249f8] bg-clip-text tracking-tight text-transparent">
//               {t("title2")}
//             </span>
//           </h1>
//           <p
//             className="animate-fade-up mt-6 text-center text-lg leading-8 text-gray-500 opacity-0 [text-wrap:balance] dark:text-gray-400"
//             style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
//           >
//             {t("subTitle")}
//           </p>
//         </div>

//         <div
//           className="animate-fade-up mx-auto mt-6 flex items-center justify-center space-x-5 opacity-0"
//           style={{ animationDelay: "0.10s", animationFillMode: "forwards" }}
//         >
//           <Button
//             as={Link}
//             href="/contact"
//             showAnchorIcon
//             aria-label={t("buttonAria")}
//             aria-labelledby={t("buttonAria")}
//             title={t("contact")}
//             role="button"
//             className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
//           >
//             {t("contact")}
//           </Button>
//           <Button
//             as={Link}
//             href="#omnimes"
//             showAnchorIcon
//             anchorIcon={<AnchorIcon />}
//             aria-label={t("buttonOmnimes")}
//             aria-labelledby={t("buttonOmnimes")}
//             title={t("more")}
//             className="bg-transparent"
//           >
//             {t("more")}
//           </Button>
//         </div>
//       </section>
//     </div>
//   )
// }

// "use client"

// import { Button, Link } from "@nextui-org/react"
// import { useTranslations } from "next-intl"

// import Image from "next/image"
// import { AnchorIcon } from "./ui/Icons"

// export const Hero = () => {
//   const t = useTranslations("HeroSection")

//   return (
//     <div className="relative mx-auto mt-12 max-w-7xl px-6 sm:mt-20 sm:px-8">
//       <section className="grid grid-cols-1 items-center gap-12 sm:grid-cols-3">
//         {/* LEWA STRONA – ZDJĘCIE */}
//         <div className="sm:col-span-2">
//           <Image
//             src="/images/omnimes-schemat.png" // Podmień na rzeczywisty plik!
//             alt="Schemat działania systemu OmniMES"
//             width={1200}
//             height={800}
//             className="w-full h-auto rounded-xl shadow-md"
//             priority
//           />
//         </div>

//         {/* PRAWA STRONA – TEKST */}
//         <div className="text-left">
//           <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl">
//             {t("title")}&nbsp;
//             <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent">
//               {t("title2")}
//             </span>
//           </h1>
//           <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-400">
//             {t("subTitle2")}
//           </p>

//           <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
//             <Button
//               as={Link}
//               href="/contact"
//               showAnchorIcon
//               aria-label={t("buttonAria")}
//               aria-labelledby={t("buttonAria")}
//               title={t("contact")}
//               role="button"
//               className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
//             >
//               {t("contact")}
//             </Button>
//             <Button
//               as={Link}
//               href="#omnimes"
//               showAnchorIcon
//               anchorIcon={<AnchorIcon />}
//               aria-label={t("buttonOmnimes")}
//               aria-labelledby={t("buttonOmnimes")}
//               title={t("more")}
//               className="bg-transparent text-primary-600 dark:text-primary-400"
//             >
//               {t("more")}
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

"use client"

import { Suspense, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { Button, Link, Skeleton } from "@nextui-org/react"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"

import { AnchorIcon, VideoPlayIcon } from "./ui/Icons"
import { Subtitle } from "./ui/Subtitle"

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export const Hero = () => {
  const t = useTranslations("HeroSection")
  const locale = useLocale()
  const { theme } = useTheme()
  const playerRef = useRef<null | { showPreview: () => void }>(null)

  // Postery
  const pathPoster =
    theme === "dark" ? "/images/poster/poster.dark.pl.png" : "/images/poster/poster.pl.png"
  const pathPosterOther =
    theme === "dark" ? "/images/poster/poster.dark.en.png" : "/images/poster/poster.en.png"

  const poster = locale === "pl" ? pathPoster : pathPosterOther
  const path = locale === "pl" ? "/videos/video.pl.mp4" : "/videos/video.en.mp4"

  useEffect(() => {
    playerRef.current?.showPreview()
  }, [theme, locale])

  return (
    <div className="relative mx-auto mt-12 max-w-7xl px-6 sm:mt-20 sm:px-8">
      <section className="grid grid-cols-1 items-center gap-12 sm:grid-cols-3">
        {/* LEWA STRONA – WIDEO */}
        <div className="sm:col-span-2">
          {/* nowy stacking context + tło, które zasłania pierścienie */}
          <div className="dark:bg-content1 relative isolate z-30 overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="text-primary-500 mb-8 text-xl md:text-center">
              <Subtitle text={t("SubTitle3")} />
            </div>
            <div className="aspect-[16/9] w-full">
              <Suspense fallback={<Skeleton className="size-full rounded-xl" />}>
                <ReactPlayer
                  id="hero-player"
                  ref={playerRef as any}
                  className="react-player-fix size-full"
                  url={path}
                  controls
                  width="100%"
                  height="100%"
                  pip
                  light={poster} // string -> auto-centrowanie play
                  playIcon={
                    <button
                      aria-label={t("playAria")}
                      title={t("playAria")}
                      className="absolute left-1/2 top-1/2 z-40 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] shadow-lg"
                    >
                      <VideoPlayIcon />
                    </button>
                  }
                />
              </Suspense>
            </div>
          </div>

          {/* Styl: obetnij rogi i daj białe tło pod posterem/video */}
          {/* eslint-disable-next-line react/no-unknown-property */}
          <style jsx global>{`
            .react-player-fix > .react-player__preview,
            .react-player-fix video {
              border-radius: 0.75rem !important;
              width: 100% !important;
              height: 100% !important;
              object-fit: cover;
              background-color: #ffffff !important;
            }
          `}</style>
        </div>

        {/* PRAWA STRONA – TEKST */}
        <div className="text-left">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white">
            {t("title")}&nbsp;
            <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent">
              {t("title2")}
            </span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-400">
            {t("subTitle2")}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              as={Link}
              href="/contact"
              showAnchorIcon
              aria-label={t("buttonAria")}
              aria-labelledby={t("buttonAria")}
              title={t("contact")}
              role="button"
              className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
            >
              {t("contact")}
            </Button>
            <Button
              as={Link}
              href="#omnimes"
              showAnchorIcon
              anchorIcon={<AnchorIcon />}
              aria-label={t("buttonOmnimes")}
              aria-labelledby={t("buttonOmnimes")}
              title={t("more")}
              className="text-primary-600 dark:text-primary-400 bg-transparent"
            >
              {t("more")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
