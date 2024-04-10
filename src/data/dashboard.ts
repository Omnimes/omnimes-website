
export const dashboardConfig: DashboardConfig = {
    mainNav: [
    {
      title: "Strona Główna",
      href: "/",
    },
    {
      title: "Documentation",
      href: "/docs",
      disabled: true,
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Webinary",
      href: "/dashboard",
      icon: "webinar",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
      disabled: true
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
      disabled: true
    },
  ],
}