import Image from "next/image"
import { useTranslations } from "next-intl"
import { FaArrowRight } from "react-icons/fa"

import Link from "@/components/LocaleLink"

// BO-1439: „Zaufali nam” zamiast „Nie wiesz od czego zacząć?”. Loga przesuwają się w pętli
// (CSS, bez JS); przy najechaniu pętla staje, przy prefers-reduced-motion loga stoją.
const LOGOS = [
  { src: "/images/clients/chp-group.webp", alt: "CHP Group", w: 302, h: 120 },
  { src: "/images/clients/relpol.webp", alt: "Relpol", w: 280, h: 120 },
  { src: "/images/clients/eldrew.webp", alt: "Eldrew", w: 161, h: 160 },
]

// BO-1444: każde logo raz na „taśmę”, a miejsce na logo (.trusted-slot) jest tak szerokie, że
// taśma jest dłuższa niż widoczny pasek — to samo logo nigdy nie pojawia się dwa razy naraz.
// Druga taśma to kopia pierwszej, dzięki czemu przesunięcie o -50% daje płynną pętlę.
const STRIP = LOGOS

export const TrustedBy = () => {
  const t = useTranslations("TrustedBy")

  return (
    <section aria-labelledby="trusted-heading">
      <h2
        id="trusted-heading"
        className="mb-8 text-center font-sans text-2xl font-bold tracking-tight sm:text-4xl"
      >
        {t("heading")}
      </h2>
      <div className="trusted-mask relative overflow-hidden">
        <ul className="trusted-track flex w-max" aria-label={t("aria")}>
          {[...STRIP, ...STRIP].map((l, i) => (
            <li
              key={i}
              aria-hidden={i >= LOGOS.length ? true : undefined}
              className="trusted-slot flex shrink-0 justify-center"
            >
              <div className="flex h-28 w-72 items-center justify-center rounded-2xl border border-white/10 bg-neutral-900 px-8">
                <Image
                  src={l.src}
                  alt={i < LOGOS.length ? l.alt : ""}
                  width={l.w}
                  height={l.h}
                  sizes="180px"
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/implementation"
          className="text-primary-500 hover:text-primary-600 inline-flex items-center gap-2 text-base font-semibold"
        >
          {t("cta")}
          <FaArrowRight className="text-sm" />
        </Link>
      </div>
    </section>
  )
}
