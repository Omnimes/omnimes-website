import { createRequire } from "module"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const require = createRequire(import.meta.url)
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  serverExternalPackages: ["@prisma/client"],
  productionBrowserSourceMaps: true,
  experimental: {
    authInterrupts: true,
    nextScriptWorkers: true,
    webVitalsAttribution: ["CLS", "LCP"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        // stary, źle zindeksowany adres
        source: "/en/blog/mqtt-vs-sparkplug-b-porownanie-protokolow-komunikacyjnych-cz-i",
        // nowy, prawidłowy angielski URL
        destination: "/en/blog/mqtt-vs-sparkplug-b-comparison-of-communication-protocols-part-i",
        permanent: true, // 301
      },

      // === DE locale removed (2026-05) — 301 redirects to /en preserve SEO equity ===

      // Deleted German content (slugs no longer exist) → redirect to EN listing pages
      { source: "/de/blog/:slug*", destination: "/en/blog", permanent: true },
      { source: "/de/nachrichten/:slug*", destination: "/en/news", permanent: true },
      { source: "/de/implementation/:slug*", destination: "/en/implementation", permanent: true },

      // German-translated static slugs → EN equivalents
      { source: "/de/dokumentation", destination: "/en/documentation", permanent: true },
      {
        source: "/de/dokumentation/:path*",
        destination: "/en/documentation/:path*",
        permanent: true,
      },
      { source: "/de/ueber-uns", destination: "/en/about", permanent: true },
      { source: "/de/angebot", destination: "/en/offer", permanent: true },
      { source: "/de/kontakt", destination: "/en/contact", permanent: true },
      { source: "/de/datenschutzrichtlinie", destination: "/en/privacy-policy", permanent: true },
      { source: "/de/regelwerk", destination: "/en/terms", permanent: true },
      { source: "/de/galerie", destination: "/en/gallery", permanent: true },
      { source: "/de/stichworte", destination: "/en/tags", permanent: true },
      { source: "/de/stichworte/:tag*", destination: "/en/tags/:tag*", permanent: true },
      { source: "/de/projekt", destination: "/en/project", permanent: true },
      {
        source: "/de/project/historische-ereignisse",
        destination: "/en/project/history-events",
        permanent: true,
      },
      { source: "/de/project/zeitplan", destination: "/en/project/schedule", permanent: true },
      { source: "/de/project/analyse", destination: "/en/project/analysis", permanent: true },
      {
        source: "/de/project/berichtsersteller",
        destination: "/en/project/report-creator",
        permanent: true,
      },
      {
        source: "/de/project/konfigurator",
        destination: "/en/project/configurator",
        permanent: true,
      },
      {
        source: "/de/project/verwaltung",
        destination: "/en/project/administration",
        permanent: true,
      },
      {
        source: "/de/project/abonnement",
        destination: "/en/project/subscription",
        permanent: true,
      },
      { source: "/de/email-verifizieren", destination: "/en/verify-email", permanent: true },

      // Catch-all: any remaining /de/* → /en/* (root + paths that share slugs across locales)
      { source: "/de", destination: "/en", permanent: true },
      { source: "/de/:path*", destination: "/en/:path*", permanent: true },
    ]
  },
}

export default withBundleAnalyzer(withNextIntl(nextConfig))
