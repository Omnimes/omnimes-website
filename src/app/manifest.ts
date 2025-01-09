import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OmniMES - System realizacji produkcji",
    short_name: "OmniMES",
    description:
      "OmniMES to nowoczesny system realizacji produkcji, usprawniający procesy produkcyjne dla lepszej efektywności i kontroli jakości",
    start_url: "/",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        src: "/favicons/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
      {
        src: "/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
