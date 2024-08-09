import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeSwitch from "@/components/ThemeSwitch";
import { UserAccountNavServer } from "@/components/auth/UserAccountNavServer";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { MainNav } from "@/components/dashboard/MainNav";
import { SiteFooter } from "@/components/dashboard/SiteFooter";
import { getMainAdmin, getSubAdmin } from "@/lib/getSubNav";
import { getCurrentUser } from "@/utils/session";
import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Notification } from "@/components/Notification";

type DashboardLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default async function AdminLayout({ children, params: { locale }}: DashboardLayoutProps) {
  unstable_setRequestLocale(locale);
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login")
  }

  const mainNav = getMainAdmin();
  const subNav = getSubAdmin();

  const mobileNav = [...mainNav, ...subNav];

  return (
    <div className="flex min-h-screen flex-col space-y-6">
     
      <header className="flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none inset-x-0 border-b !border-border backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70 navbar sticky top-0 xl:px-0">
        <div className="z-40 flex gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-14 max-w-screen-2xl px-4 py-2 mx-auto">
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
      <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr] max-w-screen-2xl px-4 py-2 mx-auto w-full">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={subNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t !border-border w-full flex justify-center" />
    </div>
  )
}