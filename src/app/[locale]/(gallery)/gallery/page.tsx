import {
  galleryPhotoSrc,
  galleryThumbSrc,
  visibleGalleryEvents,
  type GalleryEvent,
} from "@/data/gallery"
import { getLocalePrimaryDialects } from "@/data/locales"
import { siteMetadata } from "@/data/siteMetadata"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { localizeHref } from "@/lib/localizeHref"
import { GalleryMES } from "@/components/Gallery"
import { genPageMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "GalleryMeta" })
  const title = t("title")
  const description = t("desc")
  const keywords = t("keywords")
  const localeShort = getLocalePrimaryDialects(locale)
  // BO-1441: social preview = first photo of the newest event
  const first = visibleGalleryEvents[0]
  const cover = first?.photos[0]
  const image =
    first && cover ? `${siteMetadata.siteUrl}${galleryPhotoSrc(first, cover)}` : undefined
  const obj = {
    title,
    description,
    keywords,
    localeShort,
    locale,
    path: "/gallery",
    image,
  }
  return genPageMetadata(obj)
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const tMeta = await getTranslations({ locale, namespace: "GalleryMeta" })
  const t = await getTranslations({ locale, namespace: "Gallery" })

  const site = siteMetadata.siteUrl
  const pageUrl = `${site}${localizeHref("/gallery", locale)}`
  const author = { "@type": "Organization", name: "Multiprojekt", url: site }
  const eventLd = (event: GalleryEvent) => ({
    "@type": "Event",
    name: t(`events.${event.slug}.name`),
    startDate: event.start,
    ...(event.end && { endDate: event.end }),
    location: { "@type": "Place", name: t(`events.${event.slug}.place`) },
  })

  // BO-1441: ImageGallery with every photo as ImageObject (event, date, author).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${pageUrl}#galeria`,
    url: pageUrl,
    name: tMeta("title"),
    description: tMeta("desc"),
    inLanguage: locale,
    author,
    publisher: { "@id": `${site}/#organization` },
    associatedMedia: visibleGalleryEvents.flatMap((event) =>
      event.photos.map((photo) => ({
        "@type": "ImageObject",
        contentUrl: `${site}${galleryPhotoSrc(event, photo)}`,
        thumbnailUrl: `${site}${galleryThumbSrc(event, photo)}`,
        width: photo.width,
        height: photo.height,
        name: t(`photo.${event.slug}.${photo.id}.caption`),
        description: t(`photo.${event.slug}.${photo.id}.alt`),
        dateCreated: event.start,
        contentLocation: { "@type": "Place", name: t(`events.${event.slug}.place`) },
        about: eventLd(event),
        author,
        creator: author,
        copyrightHolder: author,
        creditText: "Multiprojekt",
      }))
    ),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <GalleryMES locale={locale} />
    </>
  )
}
