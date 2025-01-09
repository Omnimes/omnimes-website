import { useTranslations } from "next-intl"

import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"
import { TimelineItem } from "./ui/TimelineItem"

export const Timeline = () => {
  const t = useTranslations("Timeline")
  return (
    <div className="-my-6 md:text-center">
      <SubtitleNormal text={t("text")} />
      <Heading text={t("textHeading")} />
      <DescriptionPrimary text={t("textDesc")} />
      {[1, 2, 3, 4, 5].map((_, index) => {
        return (
          <TimelineItem
            key={t("step" + (index + 1))}
            step={t("step" + (index + 1))}
            subtitle={t("subtitle" + (index + 1))}
            title={t("title" + (index + 1))}
            description={t("description" + (index + 1))}
          />
        )
      })}
    </div>
  )
}
