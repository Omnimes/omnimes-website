import { ReactNode } from "react"

import "@/css/tailwind.css"
import "pliny/search/algolia.css"

type Props = {
  children: ReactNode
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children
}
