export const dashboardConfig: DashboardConfig = {
    mainNav: [
    {
      title: "home",
      href: "/",
    },
    {
      title: "docs",
      href: "/docs",
      disabled: true,
    },
    {
      title: "support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "webinars",
      href: "/dashboard/webinars",
      icon: "webinar",
    },
    {
      title: "billing",
      href: "/dashboard/billing",
      icon: "billing",
      disabled: true
    },
    {
      title: "settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}