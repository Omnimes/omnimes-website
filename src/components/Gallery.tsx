// BO-1441: gallery rendered on the server — one section per event (newest first).
// Enlarging a photo is handled by the small client component GalleryLightbox.
import Image from "next/image"
import {
  formatEventDate,
  galleryPhotoSrc,
  galleryThumbSrc,
  visibleGalleryEvents,
  type GalleryEvent,
} from "@/data/gallery"
import { getTranslations } from "next-intl/server"

import { GalleryLightbox, type LightboxPhoto } from "./GalleryLightbox"

/** Photos in the first row of the first section load eagerly; the rest lazily. */
const EAGER_PHOTOS = 3

const eventDateTime = (event: GalleryEvent) => event.start

export async function GalleryMES({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Gallery" })

  const lightboxPhotos: Record<string, LightboxPhoto[]> = {}
  for (const event of visibleGalleryEvents) {
    lightboxPhotos[event.slug] = event.photos.map((photo) => ({
      src: galleryPhotoSrc(event, photo),
      width: photo.width,
      height: photo.height,
      alt: t(`photo.${event.slug}.${photo.id}.alt`),
      caption: t(`photo.${event.slug}.${photo.id}.caption`),
    }))
  }

  return (
    <main className="bg-white pb-20 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-screen-xl px-4 pt-12 sm:pt-16">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            {t("kicker")}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-base text-neutral-600 sm:text-lg dark:text-neutral-300">
            {t("intro")}
          </p>
        </header>

        <nav aria-label={t("eventsNav")} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {visibleGalleryEvents.map((event) => (
              <li key={event.slug}>
                <a
                  href={`#${event.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm transition-colors hover:border-violet-400 hover:text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 dark:border-neutral-800 dark:hover:border-violet-500 dark:hover:text-violet-300"
                >
                  <span className="font-medium">{t(`events.${event.slug}.name`)}</span>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {formatEventDate(event, locale)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {visibleGalleryEvents.map((event, eventIndex) => {
          const headingId = `${event.slug}-naglowek`
          return (
            <section
              key={event.slug}
              id={event.slug}
              aria-labelledby={headingId}
              className="mt-14 scroll-mt-24 border-t border-neutral-200 pt-10 dark:border-neutral-800"
            >
              <div className="max-w-3xl">
                <h2 id={headingId} className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {t(`events.${event.slug}.name`)}
                </h2>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <time dateTime={eventDateTime(event)}>{formatEventDate(event, locale)}</time>
                  <span aria-hidden="true"> · </span>
                  <span>{t(`events.${event.slug}.place`)}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{t("photoCount", { count: event.photos.length })}</span>
                </p>
                <p className="mt-3 text-neutral-700 dark:text-neutral-300">
                  {t(`events.${event.slug}.desc`)}
                </p>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {event.photos.map((photo, photoIndex) => {
                  const eager = eventIndex === 0 && photoIndex < EAGER_PHOTOS
                  const alt = t(`photo.${event.slug}.${photo.id}.alt`)
                  const caption = t(`photo.${event.slug}.${photo.id}.caption`)
                  return (
                    <li key={photo.id}>
                      <figure className="group">
                        <a
                          href={galleryPhotoSrc(event, photo)}
                          data-gallery-event={event.slug}
                          data-gallery-index={photoIndex}
                          aria-label={t("openPhoto", { caption })}
                          className="block overflow-hidden rounded-xl bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:bg-neutral-900"
                        >
                          <Image
                            src={galleryThumbSrc(event, photo)}
                            alt={alt}
                            width={photo.thumbWidth}
                            height={photo.thumbHeight}
                            sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            loading={eager ? "eager" : "lazy"}
                            fetchPriority={eager && photoIndex === 0 ? "high" : undefined}
                            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                          />
                        </a>
                        <figcaption className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                          {caption}
                        </figcaption>
                      </figure>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>

      <GalleryLightbox
        photos={lightboxPhotos}
        labels={{
          dialog: t("lightbox.dialog"),
          close: t("lightbox.close"),
          next: t("lightbox.next"),
          prev: t("lightbox.prev"),
          counter: t("lightbox.counter", { index: "{index}", total: "{total}" }),
        }}
      />
    </main>
  )
}
