"use client"

import { ComponentProps, forwardRef } from "react"
import NextLink from "next/link"
import { useLocale } from "next-intl"

import { localizeHref } from "@/lib/localizeHref"

// BO-1426: drop-in replacement for next/link. App paths ("/blog", "/tags/x")
// get the locale prefix and localized segment, so internal links point straight
// at the final URL instead of a 307 redirect.
const LocaleLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(
  function LocaleLink({ href, ...rest }, ref) {
    const locale = useLocale()
    return <NextLink ref={ref} href={localizeHref(href, locale)} {...rest} />
  }
)

export default LocaleLink
