import { locales, pathnames } from "@/config"

// BO-1426: internal links like "/blog" or "/tags/mes" used to be rendered
// without a locale prefix. Every such link answered 307 (next-intl redirect),
// which crawlers report as "internal link to redirect". This helper turns an
// app path into the final public URL for the given locale, e.g.
//   ("/contact", "pl")   -> "/pl/kontakt"
//   ("/tags/mes", "pl")  -> "/pl/tagi/mes"
//   ("/news/x", "pl")    -> "/pl/news/x"   (news detail has no localized segment)
// Hrefs that are external, already localized or point to files are returned as is.

const DEFAULT_LOCALE = "pl"
const PATHNAMES = pathnames as Record<string, string | Record<string, string>>

const dynamicKeys = Object.keys(PATHNAMES)
  .filter((key) => key.includes("["))
  .map((key) => ({
    key,
    regex: new RegExp("^" + key.replace(/\[[^\]]+\]/g, "([^/]+)") + "$"),
  }))

function resolve(config: string | Record<string, string>, locale: string): string {
  return typeof config === "string" ? config : (config[locale] ?? config[DEFAULT_LOCALE])
}

export function localizePath(path: string, locale: string): string {
  const exact = PATHNAMES[path]
  if (exact) return resolve(exact, locale)
  for (const { key, regex } of dynamicKeys) {
    const match = path.match(regex)
    if (match) {
      let i = 1
      return resolve(PATHNAMES[key], locale).replace(/\[[^\]]+\]/g, () => match[i++])
    }
  }
  return path
}

export function localizeHref<T>(href: T, locale: string | undefined): T {
  if (typeof href !== "string" || !href.startsWith("/") || href.startsWith("//")) return href
  const loc = (locales as readonly string[]).includes(locale ?? "")
    ? (locale as string)
    : DEFAULT_LOCALE

  const hashIndex = href.indexOf("#")
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : ""
  const beforeHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href
  const queryIndex = beforeHash.indexOf("?")
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex) : ""
  const path = (queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash) || "/"

  const first = path.split("/")[1] ?? ""
  if ((locales as readonly string[]).includes(first)) return href
  if (/^\/(api|_next|images|static|favicons|videos?)\//.test(path)) return href
  if (/\.[a-z0-9]{2,5}$/i.test(path)) return href

  const localized = localizePath(path.length > 1 ? path.replace(/\/+$/, "") : path, loc)
  return `/${loc}${localized === "/" ? "" : localized}${query}${hash}` as T
}
