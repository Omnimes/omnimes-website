import * as React from 'react'
import { siteMetadata } from '@/data/siteMetadata'
import { cn } from '@/utils/utils'
import Link from 'next/link'
import Image from 'next/image'
import ThemeSwitch from '../ThemeSwitch'
import Logo from '@/data/logo.svg'
export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="flex w-full max-w-[1024px] flex-col items-center justify-between gap-4 py-10 md:h-16 md:flex-row md:py-0 px-6">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="items-center space-x-2 flex">
            <Image
              src={Logo.src}
              alt={'OmniMES logo'}
              width={44}
              height={36}
              priority
              className="mr-2"
              style={{ width: '44px', height: 'auto' }}
            />
            <span className="hidden font-bold sm:inline-block">{siteMetadata.headerTitle}</span>
          </Link>
          <p className="text-center text-sm leading-loose md:text-left">
            <span className='hidden sm:inline-block mr-2'>-</span>System Realizacji Produkcji.
          </p>
        {/* <a
              href={'/'}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              OmniMES
            </a> */}
        </div>
        <ThemeSwitch />
      </div>
    </footer>
  )
}
