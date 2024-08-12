import Header from "@/components/Header";
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { Footer } from "@/components/Footer";
import { ReactNode } from "react";
import { ComponentSearch } from "@/components/ComponentSearch";
import { unstable_setRequestLocale } from "next-intl/server";

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
            </ComponentSearch>
            {children}
            <ScrollTopAndComment />
            <Footer />
        </>
    )
}