"use client"
import Link from "next/link"
import { siteMetadata } from "@/data/siteMetadata"
import { cn } from "@/utils/utils"
import { MobileNav } from "@/components/MobileNav"
import { LuX, LuMenu } from "react-icons/lu";
import { useSelectedLayoutSegment } from "next/navigation"
import { useState } from "react";
import Image from "next/image";
import Logo from "@/data/logo.svg";
import { useTranslations } from "next-intl"

interface MainNavProps {
  items?: MainNavItem[];
  mobileNav?: MainNavItem[] & SidebarNavItem[];
  children?: React.ReactNode
}

export const MainNav = ({ items, mobileNav, children }: MainNavProps) => {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const t = useTranslations("DashboardNav");

  const hideMenu = () => {
    setShowMobileMenu(false);
  }
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Image
          src={Logo.src}
          alt={'OmniMES logo'}
          width={32}
          height={32}
          priority
          className="mr-2"
          style={{ width: '32px', height: 'auto' }}
        />
        <span className="hidden font-bold sm:inline-block">
          {siteMetadata.headerTitle}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              {t(item.title)}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <LuX /> : <LuMenu />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && mobileNav && (
        <MobileNav items={mobileNav} hideMenu={hideMenu} >{children}</MobileNav>
      )}
    </div>
  )
}