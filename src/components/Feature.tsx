import { useTranslations } from "next-intl"
import { FaBarcode, FaBell, FaRobot, FaTabletAlt, FaTools } from "react-icons/fa"

import { DescriptionPrimary } from "./ui/Description"
import { FeatureCard } from "./ui/FeatureCard"
import { Heading } from "./ui/Heading"
import { MonitoringIcon, RaportsIcon, ScheduleIcon } from "./ui/Icons"
import { SubtitleNormal } from "./ui/Subtitle"

// BO-1439: osiem modułów OmniMES 5.x (wcześniej sześć funkcji z 2024 r.)
const ICON_CLS = "size-6 p-0.5"

export const Feature = () => {
  const t = useTranslations("Feature")
  const columns: { key: string; icon: React.ReactNode }[][] = [
    [
      { key: "Monitoring", icon: <MonitoringIcon /> },
      { key: "Orders", icon: <ScheduleIcon /> },
      { key: "Maintenance", icon: <FaTools className={ICON_CLS} /> },
      { key: "Quality", icon: <FaBarcode className={ICON_CLS} /> },
    ],
    [
      { key: "Operator", icon: <FaTabletAlt className={ICON_CLS} /> },
      { key: "Alarms", icon: <FaBell className={ICON_CLS} /> },
      { key: "Raports", icon: <RaportsIcon /> },
      { key: "Ai", icon: <FaRobot className={ICON_CLS} /> },
    ],
  ]

  return (
    <div
      id="funkcje"
      className="mx-auto scroll-mt-20 py-16 sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:py-20"
    >
      <div className="mb-10 md:mb-12 md:text-center lg:mx-auto">
        <SubtitleNormal text={t("Feature")} />
        <Heading text={t("title")} />
        <DescriptionPrimary text={t("desc")} />
      </div>
      <div className="mx-auto grid max-w-screen-lg space-y-6 lg:grid-cols-2 lg:space-y-0 lg:divide-x">
        {columns.map((col, i) => (
          <div key={i} className="space-y-4 md:px-12">
            {col.map(({ key, icon }) => (
              <FeatureCard key={key} title={t(key)} desc={t(key + "_desc")} icon={icon} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
