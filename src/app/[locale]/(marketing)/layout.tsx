import { ReactNode } from "react"
import { setRequestLocale } from "next-intl/server"

import { ComponentSearch } from "@/components/ComponentSearch"
import { Footer } from "@/components/Footer"
import Header from "@/components/Header"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
import SectionContainer from "@/components/SectionContainer"

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function MarketingLayout({ children, params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <ComponentSearch>
        <Header />
      </ComponentSearch>
      <SectionContainer>{children}</SectionContainer>
      <ScrollTopAndComment />
      <Footer />
    </>
  )
}
