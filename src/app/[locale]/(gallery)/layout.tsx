import { ReactNode } from "react";
import { ComponentSearch } from "@/components/ComponentSearch";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import { unstable_setRequestLocale } from "next-intl/server";
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { Footer } from "@/components/Footer";
// import UserAccountNav from "@/components/UserNav";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function GalleryLayout({ children, params: { locale } }: Props) {
    unstable_setRequestLocale(locale);
    
    return (
        <>
            <ComponentSearch>
                <Header />
                    {/* <UserAccountNav /> */}
            </ComponentSearch>
                {children}
            <ScrollTopAndComment />
            <Footer />  
        </>
    )
}