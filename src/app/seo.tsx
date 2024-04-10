import { Metadata } from 'next'
import { siteMetadata } from "@/data/siteMetadata";

interface PageSEOProps {
  title: string;
  description: string;
  keywords: string;
  localeShort: string;
  image?: string;
  [key: string]: any;
}

export function genPageMetadata({ title, description, keywords, image, localeShort, ...rest }: PageSEOProps): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title: title,
      description: description,
      url: './',
      siteName: title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: localeShort,
      type: 'website',
    },
    twitter: {
      title: title,
      card: 'summary_large_image',
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
    ...rest,
  }
}
