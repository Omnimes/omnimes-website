import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/actions/session"
import { setRequestLocale } from "next-intl/server"

import { getMainNav, getSubNav } from "@/lib/getSubNav"
import { UserAccountNavServer } from "@/components/auth/UserAccountNavServer"
import { DashboardNav } from "@/components/dashboard/DashboardNav"
import { MainNav } from "@/components/dashboard/MainNav"
import { SiteFooter } from "@/components/dashboard/SiteFooter"
import LocaleSwitcher from "@/components/LocaleSwitcher"
import { Notification } from "@/components/Notification"
import ThemeSwitch from "@/components/ThemeSwitch"

type DashboardLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) redirect("/login")
  const { locale } = await params
  setRequestLocale(locale)

  const mainNav = getMainNav(user.role)
  const subNav = getSubNav(user.role)
  const mobileNav = [...mainNav, ...subNav]

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="!border-border bg-background/70 navbar sticky inset-x-0 top-0 z-40 flex h-auto w-full items-center justify-center border-b backdrop-blur-lg backdrop-saturate-150 data-[menu-open=true]:border-none data-[menu-open=true]:backdrop-blur-xl xl:px-0">
        <div className="relative z-40 mx-auto flex h-14 w-full max-w-screen-2xl flex-row flex-nowrap items-center justify-between gap-4 px-4 py-2">
          <MainNav items={mainNav} mobileNav={mobileNav} />
          <section className="flex gap-4">
            <LocaleSwitcher />
            <Notification />
            <UserAccountNavServer
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
                role: user.role,
              }}
            />
            <ThemeSwitch />
          </section>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-screen-2xl flex-1 gap-12 px-4 py-2 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={subNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
      <SiteFooter className="!border-border flex w-full justify-center border-t" />
    </div>
  )
}
