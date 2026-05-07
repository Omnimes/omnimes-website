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
    optimizePackageImports: ["@nextui-org/react", "framer-motion", "react-icons"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
    ],
  },

  async headers() {
    const immutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ]
    return [
      { source: "/videos/:path*", headers: immutable },
      { source: "/images/:path*", headers: immutable },
      { source: "/favicons/:path*", headers: immutable },
      { source: "/screenshots/:path*", headers: immutable },
    ]
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

      // Specific high-traffic DE blog post mappings (data from GSC audit 2026-05-07).
      // Slug-by-slug to keep deep-link equity rather than dumping to /en/blog listing.
      {
        source: "/de/blog/ollama-praktische-anwendung-lokaler-ki-modelle-am-beispiel-des-omnimes-systems",
        destination: "/en/blog/ollama-practical-use-of-local-ai-models-exemplified-by-the-omnimes-system",
        permanent: true,
      },
      {
        source: "/de/blog/von-industrie-4-0-zu-5-0-die-evolution-der-digitalisierung-und-ihre-auswirkungen-auf-moderne-fabriken",
        destination: "/en/blog/from-industry-4-0-to-5-0-the-evolution-of-digitalization-and-its-impact-on-modern-factories",
        permanent: true,
      },
      {
        source: "/de/blog/mqtt-vs-sparkplug-b-vergleich-der-kommunikationsprotokolle-teil-i",
        destination: "/en/blog/mqtt-vs-sparkplug-b-comparison-of-communication-protocols-part-i",
        permanent: true,
      },
      {
        source: "/de/blog/sparkplug-b-protokoll-mit-mes-systemen-ein-moderner-ansatz-zur-ausfallvorhersage-und-energieoptimierung-in-der-industrie",
        destination: "/en/blog/utilization-of-smart-manufacturing-and-failure-prediction-in-mes-with-sparkplug-b-protocol",
        permanent: true,
      },
      {
        source: "/de/blog/wie-die-integration-von-mes-und-iot-die-produktionsqualitat-revolutioniert-und-ausfallzeiten-eliminiert",
        destination: "/en/blog/how-mes-iot-integration-revolutionizes-production-quality-and-eliminates-downtime",
        permanent: true,
      },
      {
        source: "/de/blog/wie-die-integration-von-mes-mit-iot-die-moderne-produktion-transformiert-und-eine-roi-von-uber-25-liefert",
        destination: "/en/blog/how-the-integration-of-mes-with-iot-transforms-modern-manufacturing-and-delivers-roi-above-25",
        permanent: true,
      },
      {
        source: "/de/blog/integration-von-hmi-systemen-mit-simulation-strategisches-fundament-der-ressourcenoptimierung-in-industrie-5-0",
        destination: "/en/blog/integration-of-hmi-systems-with-simulation-a-strategic-foundation-for-resource-optimization-in-industry-5-0",
        permanent: true,
      },
      {
        source: "/de/blog/industrie-5-0-wie-ki-und-fortschrittliche-konnektivitat-die-industrielle-uberwachung-revolutionieren",
        destination: "/en/blog/industry-5-0-how-ai-and-advanced-connectivity-are-revolutionizing-industrial-monitoring",
        permanent: true,
      },
      {
        source: "/de/blog/verwaltung-von-produktionschargen-im-zeitalter-von-industrie-5-0-strategischer-ansatz-zur-digitalen-transformation-der-fertigung",
        destination: "/en/blog/managing-production-batches-in-the-era-of-industry-5-0-a-strategic-approach-to-digital-transformation-in-manufacturing",
        permanent: true,
      },
      {
        source: "/de/blog/praktische-anwendung-eines-ki-assistenten-integration-der-openai-gpt-api-in-eine-webanwendung-fur-datenanalyse",
        destination: "/en/blog/practical-application-of-ai-assistant-integration-of-openai-s-gpt-api-with-a-web-application-for-data-analysis",
        permanent: true,
      },
      {
        source: "/de/blog/praktische-anwendungen-von-ki-im-zeitalter-der-fabrikdigitalisierung-wie-konnen-vektordatenbanken-die-analyse-von-zeitreihendaten-unterstutzen",
        destination: "/en/blog/practical-applications-of-ai-in-the-era-of-factory-digitalization-how-can-vector-databases-support-time-series-analysis",
        permanent: true,
      },
      {
        source: "/de/blog/verwendung-von-pytorch-in-industriedaten",
        destination: "/en/blog/using-pytorch-in-industrial-data",
        permanent: true,
      },
      {
        source: "/de/blog/datenvisualisierung-der-erfolg-der-analyse-redash",
        destination: "/en/blog/data-visualization-the-success-of-analysis-redash",
        permanent: true,
      },

      // Deleted German content with no measurable traffic → redirect to EN listing
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
