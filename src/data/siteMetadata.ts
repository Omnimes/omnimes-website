/** @type {import("pliny/config").PlinyConfig } */
export const siteMetadata = {
  title: 'title',
  author: "Piotr Sierant",
  description: 'description',
  keywords: 'keywords',
  headerTitle: "OmniMES",
  theme: "light",
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  socialBanner: '/images/twitter-card.png',
  search: {
    provider: "kbar",
    kbarConfig: {
      searchDocumentsPath: "search.json", // path to load documents to search
    },
  },
};