type Teams = {
  name: string,
  avatar: string,
  occupation: string,
  github?: string,
  linkedin?: string,
}

type BlogPost = {
  slug: string
  title: string
  tags: string
  description: string
  lang: string
}

type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

type MainNavItem = NavItem

type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

type ImageGallery = {
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  caption: string;
  tags: stirng[];
  date: string;
}

declare module 'rehype-citation' {
  const rehypeCitation: any;
  export default rehypeCitation;
}