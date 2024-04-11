/** @type {import('next-sitemap').IConfig} */
const excludePaths = [
  '/en/admin', '/pl/admin', '/de/admin',
  '/en/dashboard', '/pl/dashboard', '/de/dashboard'
]
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://omnimes.com/',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.9,
  exclude: excludePaths,
  // Default transformation function
//   transform: async (config, path) => {
//     return {
//       loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
//       changefreq: config.changefreq,
//       priority: config.priority,
//       lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
//     }
//   },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
