// BO-1441: gallery data — events (newest first) and their photos.
// Texts (event name, place, description, photo alt and caption) live in
// messages/*.json under Gallery.events.<slug> and Gallery.photo.<slug>.<id>.
// Files: public/images/gallery/<slug>/<file>.webp (max 1920 px) and <file>-mini.webp (640 px wide).

export type GalleryPhoto = {
  id: string
  file: string
  width: number
  height: number
  thumbWidth: number
  thumbHeight: number
}

export type GalleryEvent = {
  slug: string
  /** ISO date of the first day */
  start: string
  /** ISO date of the last day (multi-day events) */
  end?: string
  /** "month" when only the month is known */
  precision?: "day" | "month"
  photos: GalleryPhoto[]
}

const photo = (
  id: string,
  file: string,
  width: number,
  height: number,
  thumbWidth: number,
  thumbHeight: number
): GalleryPhoto => ({ id, file, width, height, thumbWidth, thumbHeight })

export const galleryEvents: GalleryEvent[] = [
  {
    slug: "targi-wiw-2026",
    start: "2026-11-03",
    end: "2026-11-05",
    photos: [
      photo("01", "targi-wiw-2026-zespol-stoisko-multiprojekt-01", 1920, 1080, 640, 360),
      photo("02", "targi-wiw-2026-zespol-stoisko-weintek-02", 1920, 1080, 640, 360),
      photo("03", "targi-wiw-2026-zespol-stoisko-roboty-rokae-03", 1920, 1080, 640, 360),
      photo("04", "targi-wiw-2026-medal-quality-innovation-04", 1440, 1920, 640, 853),
      photo("05", "targi-wiw-2026-robot-paletyzacja-kartonow-05", 1920, 1440, 640, 480),
      photo("06", "targi-wiw-2026-robot-przekladanie-elementow-06", 1440, 1920, 640, 853),
      photo("07", "targi-wiw-2026-robot-stanowisko-spawalnicze-07", 1440, 1920, 640, 853),
      photo("08", "targi-wiw-2026-rozmowa-panele-hmi-weintek-08", 1440, 1920, 640, 853),
      photo("09", "targi-wiw-2026-rozmowa-stanowisko-linmot-09", 1440, 1920, 640, 853),
      photo("10", "targi-wiw-2026-nagranie-stoisko-fatek-10", 1440, 1920, 640, 853),
      photo("11", "targi-wiw-2026-medal-przy-robocie-11", 1440, 1920, 640, 853),
      photo("12", "targi-wiw-2026-robot-wspolpracujacy-z-medalem-12", 1440, 1920, 640, 853),
    ],
  },
  {
    // Texts are ready; the section shows up once photos are added
    // (SharePoint holds only RAW .ARW files for this lecture).
    slug: "wyklad-wieik-2026",
    start: "2026-10-28",
    photos: [],
  },
  {
    slug: "wyklad-politechnika-krakowska-2024",
    start: "2024-06",
    precision: "month",
    photos: [
      photo("01", "wyklad-politechnika-krakowska-2024-slajd-tytulowy-01", 1920, 863, 640, 288),
      photo("02", "wyklad-politechnika-krakowska-2024-slajd-przemysl-5-0-02", 1920, 863, 640, 288),
      photo("03", "wyklad-politechnika-krakowska-2024-prezentacja-omnimes-03", 1920, 863, 640, 288),
    ],
  },
  {
    slug: "targi-wia-2024",
    start: "2024-05-14",
    end: "2024-05-16",
    photos: [
      photo("01", "targi-wia-2024-stoisko-omnimes-01", 1920, 1281, 640, 427),
      photo("02", "targi-wia-2024-stoisko-omnimes-02", 1920, 1281, 640, 427),
      photo("03", "targi-wia-2024-stoisko-omnimes-03", 1920, 1281, 640, 427),
      photo("04", "targi-wia-2024-stoisko-omnimes-04", 1920, 1281, 640, 427),
      photo("05", "targi-wia-2024-stoisko-omnimes-05", 1920, 1281, 640, 427),
      photo("06", "targi-wia-2024-stoisko-omnimes-06", 1920, 1281, 640, 427),
      photo("07", "targi-wia-2024-stoisko-multiprojekt-07", 1920, 1281, 640, 427),
      photo("08", "targi-wia-2024-stoisko-omnimes-08", 1920, 1281, 640, 427),
      photo("09", "targi-wia-2024-stoisko-omnimes-09", 1920, 1280, 640, 427),
      photo("10", "targi-wia-2024-stoisko-multiprojekt-10", 1920, 1280, 640, 427),
      photo("11", "targi-wia-2024-medal-na-stoisku-omnimes-11", 1920, 1280, 640, 427),
      photo("12", "targi-wia-2024-zespol-z-medalem-12", 1920, 1280, 640, 427),
      photo("13", "targi-wia-2024-medal-quality-innovation-13", 812, 1218, 640, 960),
      photo("14", "targi-wia-2024-stoisko-multiprojekt-14", 1920, 865, 640, 288),
    ],
  },
  {
    slug: "hannover-messe-2024",
    start: "2024-04-22",
    end: "2024-04-26",
    photos: [
      photo("01", "hannover-messe-2024-stoisko-multiprojekt-01", 1920, 1280, 640, 427),
      photo("02", "hannover-messe-2024-stoisko-multiprojekt-02", 1920, 1280, 640, 427),
      photo("03", "hannover-messe-2024-stoisko-multiprojekt-03", 1920, 1280, 640, 427),
      photo("04", "hannover-messe-2024-stoisko-multiprojekt-04", 1920, 1280, 640, 427),
      photo("05", "hannover-messe-2024-stoisko-multiprojekt-05", 1920, 1280, 640, 427),
    ],
  },
]

/** Events that have photos — the only ones rendered on the page. */
export const visibleGalleryEvents = galleryEvents.filter((event) => event.photos.length > 0)

export const galleryPhotoSrc = (event: GalleryEvent, photo: GalleryPhoto) =>
  `/images/gallery/${event.slug}/${photo.file}.webp`

export const galleryThumbSrc = (event: GalleryEvent, photo: GalleryPhoto) =>
  `/images/gallery/${event.slug}/${photo.file}-mini.webp`

/** Date label in the page locale, e.g. "3–5 listopada 2026" or "czerwiec 2024". */
export function formatEventDate(event: GalleryEvent, locale: string): string {
  if (event.precision === "month") {
    const [year, month] = event.start.split("-").map(Number)
    return new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(year, month - 1, 1)))
  }
  const format = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
  const start = new Date(`${event.start}T00:00:00Z`)
  if (!event.end) return format.format(start)
  return format.formatRange(start, new Date(`${event.end}T00:00:00Z`))
}
