import { IconType } from "react-icons/lib"
import { LuAtom, LuCable, LuCombine, LuGalleryHorizontalEnd, LuSignature } from "react-icons/lu"

export const headerNavLinks: NavLink[] = [
  { href: "/", title: "home" },
  // { href: "/omnienergy", title: "omniEnergy" },
  { href: "https://www.youtube.com/@omni-mes", title: "courses", external: true },
  { href: "/implementation", title: "implementation" },
  { href: "/blog", title: "blog" },
  { href: "/about", title: "about" },
  { href: "/contact", title: "contact" },
]

export const headerNavLinksDropDown: NavLinkDrop[] = [
  // Oferta wyłączona (2026-05-08) — wpis zachowany do potencjalnego przywrócenia.
  // {
  //   href: "/offer",
  //   title: "offer",
  //   desc: "offerDesc",
  //   icon: LuSignature,
  //   color: "#9455d3",
  // },
  // Funkcje (project) wyłączone (2026-05-11) — wpis zachowany do przywrócenia.
  // { href: "/project", title: "project", desc: "projectDesc", icon: LuAtom, color: "#0070f0" },
  // { href: '/demo', title: 'demo', desc: 'demoDesc', icon: LuMonitorStop , color: '#c7861f' },
  {
    href: "/news",
    title: "news",
    desc: "NewsDesc",
    icon: LuCombine,
    color: "#18c964",
  },
  {
    href: "/faq",
    hrefByLocale: {
      en: "https://docs.omnimes.com/s/cb8b19e0-ec6d-4e1a-8690-b0ddd67ad1cd/doc/faq-IFQjCNYt1Q",
      pl: "https://docs.omnimes.com/s/1c357062-fcc1-4fbe-a88e-09285cda6e02/doc/faq-XN4QKuFPZL",
    },
    title: "faq",
    desc: "faqDesc",
    icon: LuCable,
    color: "#f31260",
    external: true,
  },
  {
    href: "/gallery",
    title: "gallery",
    desc: "galleryDesc",
    icon: LuGalleryHorizontalEnd,
    color: "#c7861f",
  },
]

type NavLink = {
  href: string
  title: string
  external?: boolean
}

type NavLinkDrop = {
  href: string
  /** When set, overrides `href` based on active locale (used for external locale-specific docs). */
  hrefByLocale?: { en: string; pl: string }
  title: string
  icon: IconType
  desc: string
  color: string
  external?: boolean
}
