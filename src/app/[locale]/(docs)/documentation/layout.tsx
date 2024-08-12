import { docsConfig } from "@/data/docs"
import { SiteFooter } from "@/components/dashboard/SiteFooter"
import { getCurrentUser } from "@/actions/session";
import { unstable_setRequestLocale } from "next-intl/server"
import { redirect } from "next/navigation"
import ThemeSwitch from "@/components/ThemeSwitch"
import LocaleSwitcher from "@/components/LocaleSwitcher"
import { UserAccountNavServer } from "@/components/auth/UserAccountNavServer"
import { MainNav } from "@/components/dashboard/MainNav"
import { DocsSidebarNav } from "@/components/docs/SidebarNav"

interface DocsLayoutProps {
  children: React.ReactNode
  params: { locale: string };
}

export default async function DocsLayout({ children, params: { locale } }: DocsLayoutProps) {
  unstable_setRequestLocale(locale);

  const user = await getCurrentUser();
  if (!user) redirect("/login")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none inset-x-0 border-b !border-border backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70 navbar sticky top-0 xl:px-0">
        <div className="z-40 flex gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-14 container px-4 py-2 mx-auto">
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
      <div className="container mx-auto px-8 w-full flex-1">{children}</div>
      <SiteFooter className="border-t !border-border w-full flex justify-center" />
    </div>
  )
}