import { Metadata } from "next"
import { pathnames } from "@/config"
import { siteMetadata } from "@/data/siteMetadata"

import { localizeHref } from "@/lib/localizeHref"
import { metaDescription, pageLanguages } from "@/lib/seo"

interface PageSEOProps {
  title: string
  description: string
  keywords: string
  localeShort: string
  image?: string
  /** Locale of the current request, e.g. "pl" or "en". Required for canonical. */
  locale?: string
  /** App path key from src/config.ts pathnames map (e.g. "/about", "/blog"),
   *  or a raw path. Helper resolves it to the localized URL. Required for canonical. */
  path?: string
  /** true for thin listing pages (e.g. tags): keep out of the index, follow links. */
  noindex?: boolean
}

function buildCanonical(locale: string, path: string): string {
  // Resolves static keys ("/about" -> /pl/o-nas) and dynamic ones ("/tags/x" -> /pl/tagi/x).
  // Home page has no trailing slash: /pl/ redirects to /pl
  return `${siteMetadata.siteUrl}${localizeHref(path, locale)}`
}

export function genPageMetadata({
  title,
  description,
  keywords,
  image,
  localeShort,
  locale,
  path,
  noindex = false,
}: PageSEOProps): Metadata {
  const canonical = locale && path ? buildCanonical(locale, path) : undefined
  // BO-1426: hreflang pl/en/x-default for every static page that has a pathnames key
  const languages =
    path && (pathnames as Record<string, unknown>)[path] ? pageLanguages(path) : undefined
  description = metaDescription(description) ?? description
  const images = image
    ? [image]
    : [{ url: siteMetadata.socialBanner, width: 1200, height: 630, type: "image/jpeg", alt: title }]
  return {
    title,
    description,
    keywords,
    ...(canonical && { alternates: { canonical, ...(languages && { languages }) } }),
    openGraph: {
      title,
      description,
      url: canonical ?? "./",
      siteName: title,
      images,
      locale: localeShort.replace("-", "_"),
      type: "website",
    },
    twitter: {
      title,
      card: "summary_large_image",
      site: siteMetadata.xHandle,
      images,
    },
    robots: {
      index: !noindex,
      follow: true,
      googleBot: {
        index: !noindex,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}
