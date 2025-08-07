// import { Button, Link } from "@nextui-org/react"
// import { useTranslations } from "next-intl"

// import { AnchorIcon } from "./ui/Icons"

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

"use client"

import { Button, Link } from "@nextui-org/react"
import { useTranslations } from "next-intl"

import Image from "next/image"
import { AnchorIcon } from "./ui/Icons"

export const Hero = () => {
  const t = useTranslations("HeroSection")

  return (
    <div className="relative mx-auto mt-12 max-w-7xl px-6 sm:mt-20 sm:px-8">
      <section className="grid grid-cols-1 items-center gap-12 sm:grid-cols-3">
        {/* LEWA STRONA – ZDJĘCIE */}
        <div className="sm:col-span-2">
          <Image
            src="/images/omnimes-schemat.png" // Podmień na rzeczywisty plik!
            alt="Schemat działania systemu OmniMES"
            width={1200}
            height={800}
            className="w-full h-auto rounded-xl shadow-md"
            priority
          />
        </div>

        {/* PRAWA STRONA – TEKST */}
        <div className="text-left">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl">
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
              className="bg-transparent text-primary-600 dark:text-primary-400"
            >
              {t("more")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
