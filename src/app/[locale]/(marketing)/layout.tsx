import { ReactNode } from "react";
import SectionContainer from "@/components/SectionContainer";
import { unstable_setRequestLocale } from "next-intl/server";
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { Footer } from "@/components/Footer";

type Props = {
  children: ReactNode;
  navbar: ReactNode,
  params: { locale: string };
};

export default function MarketingLayout({ children, navbar, params: { locale } }: Props) {
    unstable_setRequestLocale(locale);
    return (
        <>
            {navbar}
            <SectionContainer> 
                {children}
            </SectionContainer> 
            <ScrollTopAndComment />
            <Footer />  
        </>
    )
}