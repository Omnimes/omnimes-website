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
    ]
  },
}

export default withBundleAnalyzer(withNextIntl(nextConfig))
