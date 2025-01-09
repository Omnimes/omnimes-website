import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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
    webVitalsAttribution: ['CLS', 'LCP'],
    // optimizePackageImports: ['package-name'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
    ]
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));