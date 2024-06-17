import * as React from 'react'
import { siteMetadata } from '@/data/siteMetadata'
import { cn } from '@/utils/utils'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/data/logo.svg'
import { useTranslations } from 'next-intl'
export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("DashboardFooter")
  return (
    <footer className={cn(className)}>
      <div className="flex w-full max-w-[1024px] flex-col items-center justify-between gap-4 md:h-16 md:flex-row md:py-0 py-2 px-6 md:px-2 lg:px-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="items-center space-x-2 flex">
            <Image
              src={Logo.src}
              alt={'OmniMES logo'}
              width={32}
              height={32}
              priority
              className="mr-2"
              style={{ width: '32px', height: 'auto' }}
            />
            <span className="hidden font-bold sm:inline-block">{siteMetadata.headerTitle}</span>
          </Link>
          <p className="text-center text-sm leading-loose md:text-left">
            <span className='hidden sm:inline-block mr-2'>-</span>{t("footer")}
          </p>
        </div>
      </div>
    </footer>
  )
}
