"use client"

import { Button, Link } from "@nextui-org/react"
import { useTranslations } from "next-intl"
import { Heading } from "./ui/Heading"

export const ContactTwo = () => {
  const t = useTranslations("Timeline") // możesz zostawić ten namespace albo zmienić na dedykowany
  return (
    <div className="my-12 md:text-center">
      <div className="text-500 mb-8 text-xl md:text-center">
        <Heading text={`${t("dontKnowWhereToStart")}?`} />
      </div>
      <Button
        as={Link}
        href="/contact"
        showAnchorIcon
        title={t("contact")}
        role="button"
        className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
      >
        {t("contact")}
      </Button>
    </div>

  )
}
