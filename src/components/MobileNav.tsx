import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Logo from "@/data/logo.svg"
import { siteMetadata } from "@/data/siteMetadata"
import { cn } from "@/utils/utils"
import { useTranslations } from "next-intl"

import { useLockBody } from "@/hooks/useLockBody"

import { Separator } from "./ui/Separator"

interface MobileNavProps {
  items: (MainNavItem[] & SidebarNavItem[]) | undefined
  hideMenu: () => void
  children?: React.ReactNode
}

export function MobileNav({ items, hideMenu, children }: MobileNavProps) {
  useLockBody()
  const t = useTranslations("DashboardNav")
  return (
    <div
      className={cn(
        "z-60 animate-in slide-in-from-bottom-80 fixed inset-0 top-16 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-white/80 p-4 pb-32 md:hidden dark:bg-black/80"
      )}
    >
      <div className="border-foreground-200 z-60 bg-background/90 relative grid gap-6 rounded-md border p-4 shadow-lg backdrop-blur-xl backdrop-saturate-150">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={Logo.src}
            alt={"OmniMES logo"}
            width={44}
            height={44}
            className="mr-2"
            style={{ width: "44px", height: "auto" }}
          />
          <span className="font-bold">{siteMetadata.headerTitle}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items?.map((item, index) => {
            if (item.separator) {
              return <Separator key={item.title} />
            }
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                )}
                onClick={hideMenu}
              >
                {t(item.title)}
              </Link>
            )
          })}
          {children}
        </nav>
      </div>
    </div>
  )
}
