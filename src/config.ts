import { Pathnames } from "next-intl/routing"

export const locales = ["en", "pl"] as const

export const pathnames = {
  "/": "/",
  "/admin": "/admin",
  "/admin/users": "/admin/users",
  "/documentation": {
    en: "/documentation",
    pl: "/dokumentacja",
  },
  "/dashboard": "/dashboard",
  "/dashboard/become-developer": {
    en: "/dashboard/become-developer",
    pl: "/dashboard/zostan-developerem",
  },
  "/dashboard/billing": {
    en: "/dashboard/billing",
    pl: "/dashboard/rozliczenia",
  },
  "/dashboard/demo": "/dashboard/demo",
  "/dashboard/materials": {
    en: "/dashboard/materials",
    pl: "/dashboard/materialy",
  },
  "/dashboard/materials/advertising": {
    en: "/dashboard/materials/advertising",
    pl: "/dashboard/materialy/reklama",
  },
  "/dashboard/materials/information": {
    en: "/dashboard/materials/information",
    pl: "/dashboard/materialy/informacja",
  },
  "/dashboard/materials/manual": {
    en: "/dashboard/materials/manual",
    pl: "/dashboard/materialy/instrukcja",
  },
  "/dashboard/settings": {
    en: "/dashboard/settings",
    pl: "/dashboard/ustawienia",
  },
  "/dashboard/support": {
    en: "/dashboard/support",
    pl: "/dashboard/wsparcie",
  },
  "/dashboard/webinars": {
    en: "/dashboard/webinars",
    pl: "/dashboard/webinaria",
  },
  "/faq": "/faq",
  "/blog": "/blog",
  "/courses": "/courses",
  "/demo": "/demo",
  "/login": "/login",
  "/register": {
    en: "/register",
    pl: "/rejestracja",
  },
  "/verify-email": {
    en: "/verify-email",
    pl: "/zweryfikuj-email",
  },

  "/blog/[slug]": {
    en: "/blog/[slug]",
    pl: "/blog/[slug]",
  },
  "/courses/[slug]": {
    en: "/courses/[slug]",
    pl: "/courses/[slug]",
  },
  "/about": {
    en: "/about",
    pl: "/o-nas",
  },
  "/project": {
    en: "/project",
    pl: "/projekt",
  },
  "/project/monitoring": "/project/monitoring",
  "/project/dashboard": "/project/dashboard",
  "/project/gpt-assistant": "/project/gpt-assistant",
  "/project/planogram": "/project/planogram",
  "/project/history-events": {
    en: "/project/history-events",
    pl: "/project/historia-zdarzen",
  },
  "/project/schedule": {
    en: "/project/schedule",
    pl: "/project/harmonogram",
  },
  "/project/analysis": {
    en: "/project/analysis",
    pl: "/project/analiza",
  },
  "/project/report-creator": {
    en: "/project/report-creator",
    pl: "/project/kreator-raportow",
  },
  "/project/configurator": {
    en: "/project/configurator",
    pl: "/project/konfigurator",
  },
  "/project/administration": {
    en: "/project/administration",
    pl: "/project/administracja",
  },
  "/project/installation": {
    en: "/project/installation",
    pl: "/project/instalacja",
  },
  "/project/subscription": {
    en: "/project/subscription",
    pl: "/project/subskrypcja",
  },
  "/offer": {
    en: "/offer",
    pl: "/oferta",
  },
  "/contact": {
    en: "/contact",
    pl: "/kontakt",
  },
  "/privacy-policy": {
    en: "/privacy-policy",
    pl: "/polityka-prywatnosci",
  },
  "/tags": {
    en: "/tags",
    pl: "/tagi",
  },
  "/tags/[tag]": {
    en: "/tags/[tag]",
    pl: "/tagi/[tag]",
  },
  "/terms": {
    en: "/terms",
    pl: "/regulamin",
  },
  "/news": {
    en: "/news",
    pl: "/aktualności",
  },
  "/gallery": {
    en: "/gallery",
    pl: "/galeria",
  },
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = `always`
export const localeDetection = true

export type AppPathnames = keyof typeof pathnames
