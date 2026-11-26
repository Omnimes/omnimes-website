import { pathnames } from "@/config"
import { siteMetadata } from "@/data/siteMetadata"
import { defaultLocale, excludePaths } from "@/middleware"
import { getCollections, getDocuments } from "outstatic/server"

import {
  generateURLObjects,
  generateURLObjectsWithoutAlternate,
  generateXML,
  transformPaths,
  URLObject,
} from "@/lib/generateSitemapXML"
import { SEO_LOCALES } from "@/lib/seo"

const host = siteMetadata.siteUrl

// BO-1426: the sitemap lists only canonical HTML pages that answer 200:
//  - articles under their real URLs (/pl/news/<slug>, not /pl/aktualności/<slug>),
//    with hreflang between PL and EN versions,
//  - no tag pages (thin listing pages, noindex), no /de (language disabled),
//  - no RSS/JSON feeds (they are announced with <link rel="alternate"> instead).
const SKIPPED_COLLECTIONS = new Set(["courses"]) // moved to YouTube, pages return 404

export async function GET() {
  const articles: URLObject[] = []

  getCollections().forEach((collection) => {
    if (SKIPPED_COLLECTIONS.has(collection)) return
    const docs = getDocuments(collection, ["slug", "lang", "publishedAt", "status"]).filter(
      (entry) =>
        entry.status == "published" &&
        SEO_LOCALES.includes(((entry.lang as string) ?? "pl") as (typeof SEO_LOCALES)[number])
    )
    articles.push(...generateURLObjectsWithoutAlternate(docs, host, collection))
  })

  const paths = transformPaths(pathnames, excludePaths)
  const pages = generateURLObjects(paths, defaultLocale, host)
  const xml = generateXML([...pages, ...articles])
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=UTF-8" },
  })
}
