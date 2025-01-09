import { Metadata } from "next"
import { siteMetadata } from "@/data/siteMetadata"

interface PageSEOProps {
  title: string
  description: string
  keywords: string
  localeShort: string
  image?: string
}

export function genPageMetadata({
  title,
  description,
  keywords,
  image,
  localeShort,
}: PageSEOProps): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: "./",
      siteName: title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: localeShort,
      type: "website",
    },
    twitter: {
      title,
      card: "summary_large_image",
      images: image ? [image] : [siteMetadata.socialBanner],
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
