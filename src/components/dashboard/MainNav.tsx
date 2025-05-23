"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import Logo from "@/data/logo.svg"
import { siteMetadata } from "@/data/siteMetadata"
import { cn } from "@/utils/utils"
import { useTranslations } from "next-intl"
import { LuMenu, LuX } from "react-icons/lu"

import { MobileNav } from "@/components/MobileNav"

interface MainNavProps {
  items?: MainNavItem[]
  mobileNav?: MainNavItem[] & SidebarNavItem[]
  children?: React.ReactNode
}

export const MainNav = ({ items, mobileNav, children }: MainNavProps) => {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  const t = useTranslations("DashboardNav")

  const hideMenu = () => {
    setShowMobileMenu(false)
  }
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Image
          src={Logo.src}
          alt={"OmniMES logo"}
          width={32}
          height={32}
          className="mr-2"
          style={{ width: "32px", height: "auto" }}
        />
        <span className="hidden font-bold sm:inline-block">{siteMetadata.headerTitle}</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "hover:text-foreground/80 flex items-center text-lg font-medium transition-colors sm:text-sm",
                item.href.startsWith(`/${segment}`) ? "text-foreground" : "text-foreground/60"
              )}
            >
              {t(item.title)}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        aria-label={t("ariaMenu")}
        aria-labelledby={t("ariaMenu")}
        title={t("ariaMenu")}
        role="menu"
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <LuX /> : <LuMenu />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && (
        <MobileNav items={mobileNav} hideMenu={hideMenu}>
          {children}
        </MobileNav>
      )}
    </div>
  )
}
