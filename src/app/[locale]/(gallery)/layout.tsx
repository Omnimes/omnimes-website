import { ReactNode } from "react";
import { ComponentSearch } from "@/components/ComponentSearch";
import Header from "@/components/Header";
import { unstable_setRequestLocale } from "next-intl/server";
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { Footer } from "@/components/Footer";
import { UserAccountNav } from "@/components/UserAccountNav";
import { getCurrentUser } from "@/utils/session";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function GalleryLayout({ children, params: { locale } }: Props) {
    unstable_setRequestLocale(locale);
    // const user = await getCurrentUser();
    return (
        <>
            <ComponentSearch>
            <Header>
                {null}
                {/* <UserAccountNav /> */}
                </Header>
            </ComponentSearch>
                {children}
            <ScrollTopAndComment />
            <Footer />  
        </>
    )
}