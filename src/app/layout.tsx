// app/layout.tsx
// BO-1426: <html lang> is rendered by app/[locale]/layout.tsx. A second <html lang="pl">
// here produced two <html> tags on every page, so English pages were announced as Polish.
// GTM, consent mode and JSON-LD moved to the locale layout <head>.
import { ReactNode } from "react"

import "@/css/tailwind.css"
import "pliny/search/algolia.css"

type Props = { children: ReactNode }

export default function RootLayout({ children }: Props) {
  return children
}
