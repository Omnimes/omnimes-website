/** @type {import("pliny/config").PlinyConfig } */
export const siteMetadata = {
  title: "title",
  author: "Piotr Sierant i Martin Szerment",
  description: "description",
  keywords: "keywords",
  headerTitle: "Omnimes",
  theme: "light",
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  socialBanner: "/images/meta/twitter-card.png",
  search: {
    provider: "kbar",
    kbarConfig: {
      searchDocumentsPath: "search.json", // path to load documents to search
    },
  },
  links: {
    github: "https://github.com/PiotrSierant",
  },
}
