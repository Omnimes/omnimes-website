import { ReactNode } from "react"
import { Space_Grotesk } from "next/font/google"
import { getLocalePrimaryDialects } from "@/data/locales"
import { siteMetadata } from "@/data/siteMetadata"
// import { Analytics } from "@vercel/analytics/react"
// import { SpeedInsights } from "@vercel/speed-insights/next"
// import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { OstDocument } from "outstatic"
import { load } from "outstatic/server"

import { localizeHref } from "@/lib/localizeHref"
import type { WidgetItem } from "@/components/ui/Widget"

// import { Toaster } from "@/components/ui/Toaster"
// import { Widget } from "@/components/ui/Widget"
// import { NextAuthProviders } from "@/components/providers/nextauth-providers"
// import { NextUIProviders } from "@/components/providers/nextui-providers"
// import { ThemeProviders } from "@/components/providers/theme-providers"
// import { TailwindIndicator } from "@/components/TailwindIndicator"

import { locales } from "../../config"
import { ClientProviders } from "./ClientProviders"

const GTM_ID = "GTM-W8PM5ZPM"

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: t(siteMetadata.title),
    description: t(siteMetadata.description),
    keywords: t(siteMetadata.keywords),
    openGraph: {
      title: t(siteMetadata.title),
      description: t(siteMetadata.description),
      url: "./",
      siteName: t(siteMetadata.title),
      images: [siteMetadata.socialBanner],
      locale,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title: t(siteMetadata.title),
      card: "summary_large_image",
      site: siteMetadata.xHandle,
      images: [siteMetadata.socialBanner],
    },
  }
}

async function getLatestFromCollection(collection: "news" | "posts", locale: string, limit = 1) {
  try {
    const db = await load()
    return await db
      .find<OstDocument>({ collection, status: "published", lang: locale }, ["title", "slug"])
      .sort({ publishedAt: -1 })
      .limit(limit)
      .toArray()
  } catch {
    return []
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()
  const t = await getTranslations("Widget")
  // Pasek nad nagłówkiem: dwa najnowsze newsy (nowość + poprzednia) i najnowszy wpis na blogu
  const [latestNews, latestPosts] = await Promise.all([
    getLatestFromCollection("news", locale, 2),
    getLatestFromCollection("posts", locale),
  ])
  const widgetItems: WidgetItem[] = [
    ...latestNews.map((news) => ({
      kind: "news" as const,
      label: t("latestNews"),
      badge: t("badgeNews"),
      text: news.title,
      href: `/${locale}/news/${news.slug}`,
    })),
    ...latestPosts.map((post) => ({
      kind: "post" as const,
      label: t("latestPost"),
      badge: t("badgeBlog"),
      text: post.title,
      href: `/${locale}/blog/${post.slug}`,
    })),
  ]
  if (widgetItems.length === 0) {
    widgetItems.push({
      kind: "news",
      label: t("latestNews"),
      badge: t("badgeNews"),
      text: t("title"),
      href: localizeHref("/news", locale),
    })
  }
  const site = siteMetadata.siteUrl
  const isPl = locale === "pl"
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${site}/#organization`,
      name: "OmniMES",
      url: site,
      logo: `${site}/images/logo.png`,
      description: isPl
        ? "OmniMES — system klasy MES do zarządzania i realizacji produkcji: monitoring OEE, raporty, integracja z maszynami, moduł energetyczny OmniEnergy."
        : "OmniMES — Manufacturing Execution System for production management: OEE monitoring, reporting, machine integration and the OmniEnergy energy module.",
      sameAs: [
        "https://x.com/OmnimesOfficial",
        "https://www.linkedin.com/showcase/omnimes-smart-mes-system",
        "https://www.youtube.com/@omni-mes",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site}/#website`,
      name: "OmniMES",
      url: `${site}/${locale}`,
      inLanguage: getLocalePrimaryDialects(locale),
      publisher: { "@id": `${site}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${site}/${locale}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "OmniMES",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Linux, Windows",
      description: isPl
        ? "System MES do zarządzania produkcją, monitoringu OEE, raportów zmianowych i efektywności energetycznej (moduł OmniEnergy)."
        : "Manufacturing Execution System (MES) for production management, OEE monitoring, shift reporting and energy efficiency (OmniEnergy module).",
      url: `${site}/${locale}`,
      publisher: { "@id": `${site}/#organization` },
      offers: {
        "@type": "Offer",
        category: "SaaS",
        url: site + localizeHref("/offer", locale),
      },
    },
  ]

  return (
    <html
      lang={getLocalePrimaryDialects(locale)}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Tag Manager */}
        <script
          id="gtm"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* Consent Mode v2 */}
        <script
          id="consent-default"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  personalization_storage: 'denied',
  functionality_storage: 'denied',
  security_storage: 'granted'
});
(function() {
  try {
    var s = localStorage.getItem('cookie-consent');
    if (!s) return;
    var c = JSON.parse(s);
    gtag('consent', 'update', {
      ad_storage: c.ad ? 'granted' : 'denied',
      analytics_storage: c.analytics ? 'granted' : 'denied',
      personalization_storage: c.personalization ? 'granted' : 'denied',
      functionality_storage: c.functional ? 'granted' : 'denied'
    });
  } catch (e) {}
})();`,
          }}
        />
        {/* Schema.org — rendered on the server, so crawlers see it without JS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="author" content={siteMetadata.author} />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        {/* Canonical and hreflang are emitted per-page via generateMetadata.alternates
            (genPageMetadata for static pages, blog/news/implementation [slug] pages).
            Keeping them here would override per-page values and canonicalize every
            page to one URL — the indexing bug from 2026-05-07. */}
        <link
          rel="alternate"
          type="application/rss+xml; charset=utf-8"
          title="RSS POSTS"
          href={`${site}/rss.xml`}
        />
        <link
          rel="alternate"
          type="application/rss+xml; charset=utf-8"
          title="RSS NEWS"
          href={`${site}/rss-news.xml`}
        />
        <link
          rel="alternate"
          type="application/atom+xml; charset=utf-8"
          title="FEED POSTS"
          href={`${site}/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/atom+xml; charset=utf-8"
          title="FEED NEWS"
          href={`${site}/feed-news.xml`}
        />
        <link
          rel="alternate"
          type="application/json; charset=utf-8"
          title="JSON FEED POSTS"
          href={`${site}/posts.json`}
        />
        <link
          rel="alternate"
          type="application/json; charset=utf-8"
          title="JSON FEED NEWS"
          href={`${site}/news.json`}
        />
      </head>
      <body className="relative h-full min-h-screen overflow-x-hidden" suppressHydrationWarning>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <ClientProviders locale={locale} messages={messages} widgetItems={widgetItems}>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
