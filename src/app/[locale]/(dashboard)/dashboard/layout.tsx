import { redirect } from "next/navigation"
import { dashboardConfigBasic, dashboardConfigDeveloper } from "@/data/dashboard"
import { getCurrentUser } from "@/utils/session"
import { MainNav } from "@/components/dashboard/MainNav";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { SiteFooter } from "@/components/dashboard/SiteFooter";
import { UserAccountNavServer } from "@/components/auth/UserAccountNavServer";
import ThemeSwitch from "@/components/ThemeSwitch";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { unstable_setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default async function DashboardLayout({ children, params: { locale }}: DashboardLayoutProps) {
  unstable_setRequestLocale(locale);
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none inset-x-0 border-b border-border backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70 navbar sticky top-0 xl:px-0">
        <div className="z-40 flex gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-14 max-w-[1024px] py-2 px-6 md:px-2 lg:px-0">
          <MainNav items={dashboardConfigBasic.mainNav} />
          <section className="flex gap-4">
            <LocaleSwitcher />
            <UserAccountNavServer
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
            <ThemeSwitch />
          </section>
        </div>
      </header>
      <div className="grid flex-1 justify-center gap-12 md:grid-cols-[200px_1fr] max-w-[1024px] w-full mx-auto">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfigDeveloper.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden px-4 md:px-2 lg:px-0">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t border-border w-full flex justify-center" />
    </div>
  )
}