import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
    webVitalsAttribution: ['CLS', 'LCP'],
    nextScriptWorkers: true,
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));