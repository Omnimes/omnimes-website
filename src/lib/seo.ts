import { siteMetadata } from "@/data/siteMetadata"

import { localizeHref } from "@/lib/localizeHref"

// BO-1426: shared SEO helpers (hreflang pairs, description length).

export const SEO_LOCALES = ["pl", "en"] as const
/** Locale used for hreflang="x-default" (international visitors). */
export const X_DEFAULT_LOCALE = "en"

export type TranslatableDoc = {
  slug: string
  lang?: string | null
  publishedAt?: string | null
}

/**
 * Pairs PL/EN versions of the same article. Outstatic has no explicit
 * translation link; versions are written together, so they share a
 * publication time. Exact `publishedAt` match wins; otherwise a pair is made
 * when a day has exactly one unpaired PL and one unpaired EN document.
 * Returns: key `${lang}:${slug}` -> { pl: slug, en: slug }.
 */
export function pairTranslations(docs: TranslatableDoc[]): Map<string, Record<string, string>> {
  const result = new Map<string, Record<string, string>>()
  const usable = docs.filter((d) => d.slug && SEO_LOCALES.includes((d.lang ?? "pl") as "pl"))
  const paired = new Set<string>()
  const keyOf = (d: TranslatableDoc) => `${d.lang ?? "pl"}:${d.slug}`

  const link = (group: TranslatableDoc[]) => {
    const languages: Record<string, string> = {}
    group.forEach((d) => (languages[d.lang ?? "pl"] = d.slug))
    group.forEach((d) => {
      result.set(keyOf(d), languages)
      paired.add(keyOf(d))
    })
  }

  const groupBy = (items: TranslatableDoc[], key: (d: TranslatableDoc) => string) => {
    const map = new Map<string, TranslatableDoc[]>()
    items.forEach((d) => {
      const k = key(d)
      if (!k) return
      map.set(k, [...(map.get(k) ?? []), d])
    })
    return map
  }

  const tryPair = (group: TranslatableDoc[]) => {
    const pl = group.filter((d) => (d.lang ?? "pl") === "pl")
    const en = group.filter((d) => d.lang === "en")
    if (pl.length === 1 && en.length === 1) link([pl[0], en[0]])
  }

  groupBy(usable, (d) => d.publishedAt ?? "").forEach(tryPair)
  groupBy(
    usable.filter((d) => !paired.has(keyOf(d))),
    (d) => (d.publishedAt ?? "").slice(0, 10)
  ).forEach(tryPair)

  usable.forEach((d) => {
    if (!result.has(keyOf(d))) result.set(keyOf(d), { [d.lang ?? "pl"]: d.slug })
  })
  return result
}

/** hreflang map (absolute URLs) for an article, including x-default. */
export function articleLanguages(
  languages: Record<string, string>,
  section: string
): Record<string, string> {
  const out: Record<string, string> = {}
  for (const lang of SEO_LOCALES) {
    if (languages[lang]) out[lang] = `${siteMetadata.siteUrl}/${lang}/${section}/${languages[lang]}`
  }
  const xDefault = out[X_DEFAULT_LOCALE] ?? Object.values(out)[0]
  if (xDefault && Object.keys(out).length > 1) out["x-default"] = xDefault
  return out
}

/** hreflang map (absolute URLs) for a static page key from config pathnames. */
export function pageLanguages(pathKey: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const lang of SEO_LOCALES) out[lang] = siteMetadata.siteUrl + localizeHref(pathKey, lang)
  out["x-default"] = out[X_DEFAULT_LOCALE]
  return out
}

/** Meta description: single line, max ~160 chars, cut on a word boundary. */
export function metaDescription(text: string | undefined | null, max = 160): string | undefined {
  if (!text) return undefined
  const clean = text
    .replace(/[#*_>`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(" ")
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.–—-]+$/, "") + "…"
}
