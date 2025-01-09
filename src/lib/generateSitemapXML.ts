import { locales } from "@/config"
import { OstDocument } from "outstatic"
import { create } from "xmlbuilder2"

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

type TagsPath = {
  [key: string]: string[]
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

export function generateURLObjectsTags(paths: TagsPath, host: string): URLObject[] {
  const urls: URLObject[] = []
  const pathMapping: { [key: string]: string } = {
    pl: "tagi",
    en: "tags",
    de: "stichworte",
  }

  for (const lang in paths) {
    paths[lang].forEach((tag) => {
      const pathTag = pathMapping[lang] || pathMapping["pl"]

      const urlObj: URLObject = {
        url: `${host}${lang ?? "pl"}/${pathTag}/${tag}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }

      urls.push(urlObj)
    })
  }

  return urls
}

export function generateURLObjectsWithoutAlternate(
  paths: OstDocument[],
  host: string,
  collection: string
): URLObject[] {
  const pathMappingNews: { [key: string]: string } = {
    en: "news",
    de: "nachrichten",
    pl: "aktualności",
  }

  if (collection == "news") {
    return paths.map((url) => {
      const lang = (url.lang ?? "pl") as "en" | "de" | "pl"
      return {
        url: `${host}${url.lang ?? "pl"}/${pathMappingNews[lang]}/${url.slug}`,
        lastModified: url.publishedAt || new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      }
    })
  }

  return paths.map((url) => {
    return {
      url: `${host}${url.lang ?? "pl"}/blog/${url.slug}`,
      lastModified: url.publishedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }
  })
}

export function generateURLObjects(
  paths: Paths,
  defaultLocale: string,
  baseURL: string
): URLObject[] {
  const urlObjects: URLObject[] = []
  for (const key in paths) {
    const path = paths[key]

    if (typeof path !== "object" || path === null || !(defaultLocale in path)) {
      continue
    }

    const urlObject: URLObject = {
      url: `${baseURL}${defaultLocale}${path[defaultLocale]}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {},
      },
    }

    for (const lang in path) {
      if (lang !== defaultLocale && urlObject.alternates) {
        urlObject.alternates.languages[lang] =
          `${baseURL}${lang}${path[lang as keyof LanguagePaths]}`
      }
    }
    urlObjects.push(urlObject)
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
