'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/utils'
import { LuFileVideo2, LuCreditCard, LuSettings } from 'react-icons/lu'
import { useLocale } from 'next-intl'

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname()
  const locale = useLocale()
  if (!items?.length) {
    return null
  }
  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        return (
          item.href && (
            <Link key={index} href={item.disabled ? '/' : item.href}>
              <span
                className={cn(
                  'hover:bg-accent hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                  path === `/${locale}${item.href}` ? 'bg-accent' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80'
                )}
              >
                {item.icon == 'webinar' && <LuFileVideo2 className="mr-2 h-4 w-4" />}
                {item.icon == 'billing' && <LuCreditCard className="mr-2 h-4 w-4" />}
                {item.icon == 'settings' && <LuSettings className="mr-2 h-4 w-4" />}
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
