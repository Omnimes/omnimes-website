"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/utils"
import { useLocale, useTranslations } from "next-intl"
import {
  LuBadgeInfo,
  LuCreditCard,
  LuFileCog,
  LuFileVideo2,
  LuLayoutDashboard,
  LuLayoutGrid,
  LuPencilLine,
  LuSettings,
  LuSparkles,
  LuTv,
  LuUser,
  LuUsers,
  LuVideo,
  LuVote,
} from "react-icons/lu"

import { Separator } from "../ui/Separator"

interface DashboardNavProps {
  items: SidebarNavItem[]
}
const iconMapping: { [key: string]: React.ComponentType<{ className?: string }> } = {
  dashboard: LuLayoutDashboard,
  administrationPanel: LuLayoutGrid,
  webinar: LuFileVideo2,
  billing: LuCreditCard,
  settings: LuSettings,
  demo: LuTv,
  materials: LuSparkles,
  advertising: LuVideo,
  information: LuBadgeInfo,
  manual: LuFileCog,
  users: LuUsers,
  outstatic: LuPencilLine,
  start: LuVote,
  developer: LuUser,
}
export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname()
  const locale = useLocale()
  const t = useTranslations("DashboardNav")

  if (!items?.length) return null

  return (
    <nav className="grid items-start gap-2 overflow-hidden">
      {items.map((item, index) => {
        const IconComponent = item.icon ? iconMapping[item.icon as keyof typeof iconMapping] : null

        if (item.separator) {
          return <Separator key={item.title} />
        }
        if (item.items) {
          return (
            <ul key={item.title}>
              {item.href && (
                <Link href={item.href}>
                  <span
                    className={cn(
                      "hover:bg-accent hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      path === `/${locale}${item.href}` ? "bg-accent" : "transparent",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {IconComponent && <IconComponent className="mr-2 size-4" />}
                    <span>{t(item.title)}</span>
                  </span>
                </Link>
              )}

              {item.items.map((link) => {
                const LinkIconComponent = link.icon
                  ? iconMapping[link.icon as keyof typeof iconMapping]
                  : null
                return (
                  <Link key={link.title} href={link.href}>
                    <span
                      className={cn(
                        "hover:bg-accent hover:text-accent-foreground group ml-6 flex items-center rounded-md px-3 py-2 text-sm font-medium",
                        path === `/${locale}${link.href}` ? "bg-accent" : "transparent"
                      )}
                    >
                      {LinkIconComponent && <LinkIconComponent className="mr-2 size-4" />}
                      <span>{t(link.title)}</span>
                    </span>
                  </Link>
                )
              })}
            </ul>
          )
        }

        return (
          <Link key={index} href={item.disabled ? "/" : item.href} className="overflow-hidden">
            <span
              className={cn(
                "hover:bg-accent hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                path === `/${locale}${item.href}` ? "bg-accent" : "transparent",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {IconComponent && <IconComponent className="mr-2 size-4" />}
              <span>{t(item.title)}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
