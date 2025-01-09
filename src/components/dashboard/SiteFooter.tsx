import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Logo from "@/data/logo.svg"
import { siteMetadata } from "@/data/siteMetadata"
import { cn } from "@/utils/utils"
import { useTranslations } from "next-intl"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("DashboardFooter")
  return (
    <footer className={cn(className)}>
      <div className="container mx-auto flex w-full flex-col items-center justify-between gap-4 px-4 py-2 md:h-16 md:flex-row md:px-8 md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
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
          <p className="text-center text-sm leading-loose md:text-left">
            <span className="mr-2 hidden sm:inline-block">-</span>
            {t("footer")}
          </p>
        </div>
      </div>
    </footer>
  )
}
