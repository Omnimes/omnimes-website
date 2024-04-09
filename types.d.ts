type Meta = {
    id: string,
    title: string,
    date: string,
    keywords: string,
    subtitle: string,
    section: string,
    lang: string,
    authors: AuthorObject,
}

type MetaTags = {
  keywords: string
}

type MetaNews = {
  tags: string
}

type BlogPost = {
    meta: Meta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

type BlogPostTags = {
  meta: {
    keywords: string;
  }
}

type Teams = {
  name: string,
  avatar: string,
  occupation: string,
  github?: string,
  linkedin?: string,
}

type AuthorObject = {
  meta: AuthorMeta,
  content:  ReactElement<any, string | JSXElementConstructor<any>>,
}[]

type Search = {
    path: string,
    title: string,
    keywords: string,
    subtitle: string,
    section: string,
    lang: string,
}

type SearchSchema = {
  meta: Search,
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

declare module 'rehype-citation' {
  const rehypeCitation: any;
  export default rehypeCitation;
}