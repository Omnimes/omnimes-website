import { ReactNode } from "react";
import SectionContainer from "@/components/SectionContainer";
import { unstable_setRequestLocale } from "next-intl/server";
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { Footer } from "@/components/Footer";
import { ComponentSearch } from "@/components/ComponentSearch";
import Header from "@/components/Header";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function MarketingLayout({ children, params: { locale } }: Props) {
    unstable_setRequestLocale(locale);

    return (
        <>
            <ComponentSearch>
                <Header />
            </ComponentSearch>
            <SectionContainer> 
                {children}
            </SectionContainer> 
            <ScrollTopAndComment />
            <Footer />  
        </>
    )
}