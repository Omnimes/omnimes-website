/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://your-domain.com',
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
}