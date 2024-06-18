export const dashboardConfigBasic: DashboardConfig = {
  mainNav: [
  {
    title: "home",
    href: "/",
  },
],
sidebarNav: [
  {
    title: "dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    title: "demo",
    href: "/dashboard/demo",
    icon: "demo",
  },
  {
    title: "settings",
    href: "/dashboard/settings",
    icon: "settings",
  },
],
}

export const dashboardConfigDeveloper: DashboardConfig = {
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
      title: "dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "webinars",
      href: "/dashboard/webinars",
      icon: "webinar",
    },
    {
      title: "materials",
      href: "/dashboard/materials",
      icon: "materials",
      external: true,
      items: [
        {
          title: "advertising",
          href: "/dashboard/materials/advertising",
          icon: "advertising",
        },
        {
          title: "information",
          href: "/dashboard/materials/information",
          icon: "information",
        },
        {
          title: "manual",
          href: "/dashboard/materials/manual",
          icon: "manual",
        },
      ]
    },
    {
      title: "billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}