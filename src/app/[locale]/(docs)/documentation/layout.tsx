import { redirect } from "next/navigation"
import { getCurrentUser } from "@/actions/session"
import { docsConfig } from "@/data/docs"
import { setRequestLocale } from "next-intl/server"

import { UserAccountNavServer } from "@/components/auth/UserAccountNavServer"
import { MainNav } from "@/components/dashboard/MainNav"
import { SiteFooter } from "@/components/dashboard/SiteFooter"
import { DocsSidebarNav } from "@/components/docs/SidebarNav"
import LocaleSwitcher from "@/components/LocaleSwitcher"
import ThemeSwitch from "@/components/ThemeSwitch"

interface DocsLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function DocsLayout({ children, params }: DocsLayoutProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const user = await getCurrentUser()
  if (!user) redirect("/login")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="!border-border bg-background/70 navbar sticky inset-x-0 top-0 z-40 flex h-auto w-full items-center justify-center border-b backdrop-blur-lg backdrop-saturate-150 data-[menu-open=true]:border-none data-[menu-open=true]:backdrop-blur-xl xl:px-0">
        <div className="container relative z-40 mx-auto flex h-14 w-full flex-row flex-nowrap items-center justify-between gap-4 px-4 py-2">
          <MainNav items={docsConfig.mainNav}>
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </MainNav>
          <section className="flex gap-4">
            <LocaleSwitcher />
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
      <div className="container mx-auto w-full flex-1 px-8">{children}</div>
      <SiteFooter className="!border-border flex w-full justify-center border-t" />
    </div>
  )
}
