import { useTranslations } from "next-intl"

import { DescriptionPrimary } from "./ui/Description"
import { FeatureCard } from "./ui/FeatureCard"
import { Heading } from "./ui/Heading"
import {
  AnalyseIcon,
  CreatorIcon,
  EnergyIcon,
  MonitoringIcon,
  PulpitsIcon,
  RaportsIcon,
  ScheduleIcon,
} from "./ui/Icons"
import { SubtitleNormal } from "./ui/Subtitle"

export const Feature = () => {
  const t = useTranslations("Feature")
  const feature = ["Monitoring", "Analyse", "Schedule"]
  const featurePart2 = ["Raports", "Creator", "Pulpits"]
  return (
    <div className="mx-auto py-16 sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:py-20">
      <div className="mb-10 md:mb-12 md:text-center lg:mx-auto">
        <SubtitleNormal text={t("Feature")} />
        <Heading text={t("title")}>
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="text-blue-gray-100 text-primary-500 absolute left-0 top-0 z-0 -ml-20 -mt-8 w-32 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
            >
              <defs>
                <pattern
                  id="07690130-d013-42bc-83f4-90de7ac68f76"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect fill="url(#07690130-d013-42bc-83f4-90de7ac68f76)" width="52" height="24" />
            </svg>
          </span>
        </Heading>
        <DescriptionPrimary text={t("desc")} />
      </div>
      <div className="mx-auto grid max-w-screen-lg space-y-6 lg:grid-cols-2 lg:space-y-0 lg:divide-x">
        <div className="space-y-4 md:px-12">
          {feature.map((item) => {
            let iconComponent

            switch (item) {
              case "Analyse":
                iconComponent = <AnalyseIcon />
                break
              case "Monitoring":
                iconComponent = <MonitoringIcon />
                break
              case "Schedule":
                iconComponent = <ScheduleIcon />
                break
              default:
                iconComponent = <EnergyIcon />
            }
            return (
              <FeatureCard
                title={t(item)}
                key={item}
                desc={t(item + "_desc")}
                icon={iconComponent}
              />
            )
          })}
        </div>
        <div className="space-y-4 md:px-12">
          {featurePart2.map((item) => {
            let iconComponent
            switch (item) {
              case "Raports":
                iconComponent = <RaportsIcon />
                break
              case "Creator":
                iconComponent = <CreatorIcon />
                break
              case "Pulpits":
                iconComponent = <PulpitsIcon />
                break

              default:
                iconComponent = <EnergyIcon />
            }
            return (
              <FeatureCard
                title={t(item)}
                key={item}
                desc={t(item + "_desc")}
                icon={iconComponent}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
