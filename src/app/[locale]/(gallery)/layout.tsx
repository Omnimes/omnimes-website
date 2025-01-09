import { ReactNode } from "react"
import { setRequestLocale } from "next-intl/server"

import { ComponentSearch } from "@/components/ComponentSearch"
import { Footer } from "@/components/Footer"
import Header from "@/components/Header"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function GalleryLayout({ children, params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <ComponentSearch>
        <Header />
      </ComponentSearch>
      {children}
      <ScrollTopAndComment />
      <Footer />
    </>
  )
}
