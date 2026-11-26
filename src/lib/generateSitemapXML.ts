import { locales } from "@/config"
import { OstDocument } from "outstatic"
import { create } from "xmlbuilder2"

import {
  articleLanguages,
  pairTranslations,
  SEO_LOCALES,
  TranslatableDoc,
  X_DEFAULT_LOCALE,
} from "@/lib/seo"

export type changeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"

type LanguagePaths = {
  [key: string]: string
}

type Paths = {
  [key: string]: string | LanguagePaths
}

export type URLObject = {
  url: string
  lastModified?: string | Date
  changeFrequency?: changeFrequency
  priority?: number
  alternates?: {
    languages: {
      [key: string]: string
    }
  }
}

export function transformPaths(paths: Paths, excludePaths: string[]): Paths {
  const transformedPaths: Paths = {}

  for (const key in paths) {
    if (excludePaths.includes(key)) {
      continue // Skip the paths that are in the exclude list
    }

    if (typeof paths[key] === "string") {
      transformedPaths[key] = locales.reduce((acc, lang) => {
        acc[lang] = paths[key] as string
        return acc
      }, {} as LanguagePaths)
    } else {
      transformedPaths[key] = paths[key]
    }
  }

  return transformedPaths
}

export function generateURLObjectsWithoutAlternate(
  docs: OstDocument[],
  host: string,
  collection: string
): URLObject[] {
  // Map outstatic collection name -> URL path segment. Article pages of every
  // collection live under the same segment in both languages (BO-1426: news
  // articles are /pl/news/<slug>; /pl/aktualności is only the list page).
  // Add new collections here when adding them to outstatic.
  const collectionPathSegment: Record<string, string> = {
    posts: "blog",
    news: "news",
    courses: "courses",
    implementation: "implementation",
  }
  const segment = collectionPathSegment[collection] ?? collection
  const translations = pairTranslations(docs as TranslatableDoc[])

  return docs.map((doc) => {
    const lang = (doc.lang as string) ?? "pl"
    const languages = translations.get(`${lang}:${doc.slug}`) ?? { [lang]: doc.slug }
    const alternates = articleLanguages(languages, segment)
    return {
      url: `${host}/${lang}/${segment}/${doc.slug}`,
      lastModified: doc.publishedAt || undefined,
      changeFrequency: "weekly",
      priority: 0.8,
      ...(Object.keys(alternates).length > 1 && { alternates: { languages: alternates } }),
    }
  })
}

export function generateURLObjects(
  paths: Paths,
  defaultLocale: string,
  baseURL: string
): URLObject[] {
  const urlObjects: URLObject[] = []
  // Homepage is keyed as "/" in pathnames; emitting `${baseURL}/${locale}/`
  // produces a trailing slash that Vercel/Next.js then redirects away. Strip "/".
  const stripRoot = (p: string) => (p === "/" ? "" : p)

  for (const key in paths) {
    const path = paths[key]
    if (typeof path !== "object" || path === null || !(defaultLocale in path)) {
      continue
    }
    // BO-1426: one <url> per language, each listing every language version
    // (itself included) and x-default, as Google expects for hreflang in sitemaps.
    const languages: Record<string, string> = {}
    for (const lang of SEO_LOCALES) {
      const localized = (path as LanguagePaths)[lang]
      if (localized !== undefined) languages[lang] = `${baseURL}/${lang}${stripRoot(localized)}`
    }
    if (languages[X_DEFAULT_LOCALE]) languages["x-default"] = languages[X_DEFAULT_LOCALE]

    for (const lang of SEO_LOCALES) {
      if (!languages[lang]) continue
      urlObjects.push({
        url: languages[lang],
        changeFrequency: "weekly",
        priority: key === "/" ? 1 : 0.9,
        alternates: { languages },
      })
    }
  }

  return urlObjects
}

export function generateXML(urlObjects: URLObject[]): string {
  const root = create().ele("urlset", {
    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
    "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
    "xmlns:mobile": "http://www.google.com/schemas/sitemap-mobile/1.0",
    "xmlns:news": "http://www.google.com/schemas/sitemap-news/0.9",
    "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
    "xmlns:video": "http://www.google.com/schemas/sitemap-video/1.1",
  })
  // http://www.w3.org/TR/xhtml11/xhtml11_schema.html
  urlObjects.forEach((obj) => {
    const urlElement = root.ele("url")
    urlElement.ele("loc").txt(obj.url)
    if (obj.lastModified) {
      const lastModifiedValue =
        typeof obj.lastModified === "string" ? obj.lastModified : obj.lastModified.toISOString()

      urlElement.ele("lastmod").txt(lastModifiedValue)
    }

    if (obj.changeFrequency) urlElement.ele("changefreq").txt(obj.changeFrequency)
    if (obj.priority) urlElement.ele("priority").txt(String(obj.priority))

    if (obj.alternates) {
      for (const lang in obj.alternates.languages) {
        urlElement
          .ele("xhtml:link", {
            rel: "alternate",
            hreflang: lang,
            href: obj.alternates.languages[lang],
          })
          .up()
      }
    }
  })

  return root.end({ prettyPrint: true })
}
