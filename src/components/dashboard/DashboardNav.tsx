'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/utils'
import { LuFileVideo2, LuCreditCard, LuSettings, LuSparkles, LuBadgeInfo, LuVideo, LuFileCog2, LuLayoutDashboard, LuTv2 } from 'react-icons/lu'
import { useLocale, useTranslations } from 'next-intl'
import { Separator } from '../atoms/Separator'
interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();
  const locale = useLocale();
  const t = useTranslations("DashboardNav");

  if (!items?.length) return null

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        if(item.separator) {
          return (
            <Separator key={item.title} />
          )
        }
        if (item.items) {
          return (
            <ul key={item.title}>
              {item.href && (<Link href={item.href}>
                <span
                  className={cn(
                    'hover:bg-accent hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                    path === `/${locale}${item.href}` ? 'bg-accent' : 'transparent',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.icon == 'materials' && <LuSparkles className="mr-2 h-4 w-4" />}
                  <span>{t(item.title)}</span>
                </span>
              </Link>)}

              {item.items.map(link => {
                return (
                  <Link key={link.title} href={link.href}>
                    <span
                      className={cn(
                        'hover:bg-accent hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium ml-6',
                        path === `/${locale}${link.href}` ? 'bg-accent' : 'transparent',
                        link.disabled && 'cursor-not-allowed opacity-80'
                      )}
                    >
                      {link.icon == 'advertising' && <LuVideo className="mr-2 h-4 w-4" />}
                      {link.icon == 'information' && <LuBadgeInfo className="mr-2 h-4 w-4" />}
                      {link.icon == 'manual' && <LuFileCog2 className="mr-2 h-4 w-4" />}
                      <span>{t(link.title)}</span>
                    </span>
                  </Link>
                )
              })}
            </ul>
          )
        }

        return (
          <Link key={index} href={item.disabled ? '/' : item.href}>
            <span
              className={cn(
                'hover:bg-accent hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                path === `/${locale}${item.href}` ? 'bg-accent' : 'transparent',
                item.disabled && 'cursor-not-allowed opacity-80'
              )}
            >
              {item.icon == 'dashboard' && <LuLayoutDashboard className="mr-2 h-4 w-4" />}
              {item.icon == 'webinar' && <LuFileVideo2 className="mr-2 h-4 w-4" />}
              {item.icon == 'billing' && <LuCreditCard className="mr-2 h-4 w-4" />}
              {item.icon == 'settings' && <LuSettings className="mr-2 h-4 w-4" />}
              {item.icon == 'demo' && <LuTv2 className="mr-2 h-4 w-4" />}
              <span>{t(item.title)}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
