import { load } from "outstatic/server"

import { pairTranslations, TranslatableDoc } from "@/lib/seo"

// BO-1426: language versions of an article (slug per locale), shared by
// hreflang metadata, the language switcher and the sitemap.
export async function getArticleLanguages(
  collection: string,
  slug: string,
  lang: string
): Promise<Record<string, string>> {
  const db = await load()
  const docs = await db
    .find<TranslatableDoc>({ collection, status: "published" }, ["slug", "lang", "publishedAt"])
    .toArray()
  return pairTranslations(docs).get(`${lang}:${slug}`) ?? { [lang]: slug }
}

/** Slug of the same article in `targetLocale`, or null when there is no translation. */
export async function findTranslatedSlugIn(
  collection: string,
  slug: string,
  targetLocale: string
): Promise<string | null> {
  const db = await load()
  const source = await db.find<TranslatableDoc>({ collection, slug }, ["lang"]).first()
  if (!source || (source.lang ?? "pl") === targetLocale) return null
  const languages = await getArticleLanguages(collection, slug, source.lang ?? "pl")
  return languages[targetLocale] ?? null
}
