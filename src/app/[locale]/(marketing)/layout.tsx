import { ReactNode } from "react"

import { ComponentSearch } from "@/components/ComponentSearch"
import { Footer } from "@/components/Footer"
import Header from "@/components/Header"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
import SectionContainer from "@/components/SectionContainer"

export default function MarketingLayout({ children }: { children: ReactNode }) {
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
