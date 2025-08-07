"use client"

import { Avatar } from "@nextui-org/react"
import { useTranslations } from "next-intl"
import { LuPhone, LuUser } from "react-icons/lu"

export const DirectContact = () => {
  const t = useTranslations("Form")

  return (
    <div className="mx-auto mt-16 max-w-4xl px-6 text-center">
      <p className="text-xl text-default-500 my-12 font-medium">
        {t("OrContactDirectly") || "Lub skontaktuj się bezpośrednio z:"}
      </p>


      <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-center sm:justify-center">
        {/* Avatar po lewej */}
        <Avatar
          size="lg"
          icon={<LuUser className="text-6xl text-white" />}
          classNames={{
            base: "bg-primary-600 text-white w-32 h-32",
          }}
        />

        {/* Dane kontaktowe po prawej */}
        <div className="text-left sm:text-left">
          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            Szymon Rewilak
          </p>
          <p className="text-lg text-default-500 mt-1 mb-4">
            Project Manager — Specjalista ds. Przemysłu 4.0.
          </p>
          <div className="inline-flex items-center gap-3 text-xl font-medium text-default-700 dark:text-default-500">
            <LuPhone className="text-2xl" />
            <a href="tel:+48730002118" className="hover:underline">
              730 002 118
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
