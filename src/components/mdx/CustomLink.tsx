import { LinkProps } from "next/link"

import Link from "@/components/LocaleLink"

export type CustomLinkProps = {
  href: string
  children: React.ReactNode
  openNewTab?: boolean
  className?: string
} & React.ComponentPropsWithoutRef<"a"> &
  LinkProps

export default function CustomLink({
  children,
  href,
  openNewTab,
  className,
  ...rest
}: CustomLinkProps) {
  // BO-1426: "www.omnimes.com/..." without a scheme was resolved as a relative path (500)
  if (href && /^(www\.)?omnimes\.com(\/|$)/i.test(href)) href = `https://${href}`
  const isNewTab =
    openNewTab !== undefined ? openNewTab : href && !href.startsWith("/") && !href.startsWith("#")

  if (!isNewTab) {
    return (
      <Link href={href} {...rest} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
    </a>
  )
}
