import { notFound } from "next/navigation"
import { dashboardConfig } from "@/data/dashboard"
import { getCurrentUser } from "@/utils/session"
import { MainNav } from "@/components/dashboard/MainNav";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { SiteFooter } from "@/components/dashboard/SiteFooter";
import { UserAccountNavServer } from "@/components/auth/UserAccountNavServer";

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none inset-x-0 border-b border-[#e5e7eb] dark:border-[#1D283A] backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70 navbar sticky top-0 xl:px-0">
        <div className="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-16 max-w-[1024px] py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNavServer
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="grid flex-1 justify-center gap-12 md:grid-cols-[200px_1fr] max-w-[1024px] w-full mx-auto">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t border-[#e5e7eb] dark:border-[#1D283A] w-full flex justify-center" />
    </div>
  )
}