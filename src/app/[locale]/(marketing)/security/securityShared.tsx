import { pathnames } from "@/config"

// Wspólne elementy podstron bezpieczeństwa (BO-1196): zgłaszanie podatności,
// komunikaty bezpieczeństwa, okres wsparcia, deklaracja zgodności UE (BO-1355). Linki budujemy z mapy pathnames,
// żeby PL i EN miały własne adresy (/pl/bezpieczenstwo/..., /en/security/...).

export const CONTACT = "support@omnimes.com"

export type SecurityPageKey = "/security" | "/security/advisories" | "/security/support" | "/security/declaration"

export function securityHref(locale: string, key: SecurityPageKey): string {
  const entry = pathnames[key] as { en: string; pl: string }
  const lang = locale === "pl" ? "pl" : "en"
  return `/${lang}${entry[lang]}`
}

const NAV: Record<"pl" | "en", { key: SecurityPageKey; label: string }[]> = {
  pl: [
    { key: "/security", label: "Zgłaszanie podatności" },
    { key: "/security/advisories", label: "Komunikaty bezpieczeństwa" },
    { key: "/security/support", label: "Okres wsparcia i aktualizacje" },
    { key: "/security/declaration", label: "Deklaracja zgodności UE" },
  ],
  en: [
    { key: "/security", label: "Vulnerability disclosure" },
    { key: "/security/advisories", label: "Security advisories" },
    { key: "/security/support", label: "Support period and updates" },
    { key: "/security/declaration", label: "EU declaration of conformity" },
  ],
}

export function SecurityNav({ locale, current }: { locale: string; current: SecurityPageKey }) {
  const items = locale === "pl" ? NAV.pl : NAV.en
  return (
    <nav aria-label={locale === "pl" ? "Bezpieczeństwo" : "Security"} className="mb-2">
      <ul className="flex flex-wrap gap-2 text-sm">
        {items.map((item) => (
          <li key={item.key}>
            {item.key === current ? (
              <span
                aria-current="page"
                className="border-primary-500 text-primary-500 inline-block rounded-full border px-3 py-1 font-medium"
              >
                {item.label}
              </span>
            ) : (
              <a
                href={securityHref(locale, item.key)}
                className="inline-block rounded-full border border-gray-300 px-3 py-1 hover:underline dark:border-gray-600"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
