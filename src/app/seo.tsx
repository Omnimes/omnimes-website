import { Metadata } from "next"
import { pathnames } from "@/config"
import { siteMetadata } from "@/data/siteMetadata"

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
}

function buildCanonical(locale: string, path: string): string {
  const config = (pathnames as Record<string, string | Record<string, string>>)[path]
  let resolvedPath: string
  if (!config) {
    resolvedPath = path
  } else if (typeof config === "string") {
    resolvedPath = config
  } else {
    resolvedPath = config[locale] ?? path
  }
  // Home page has no trailing slash: /pl/ redirects to /pl
  return `${siteMetadata.siteUrl}/${locale}${resolvedPath === "/" ? "" : resolvedPath}`
}

export function genPageMetadata({
  title,
  description,
  keywords,
  image,
  localeShort,
  locale,
  path,
}: PageSEOProps): Metadata {
  const canonical = locale && path ? buildCanonical(locale, path) : undefined
  const images = image
    ? [image]
    : [{ url: siteMetadata.socialBanner, width: 1200, height: 630, type: "image/jpeg", alt: title }]
  return {
    title,
    description,
    keywords,
    ...(canonical && { alternates: { canonical } }),
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
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}
