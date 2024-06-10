import { ReactNode } from "react";
import { ComponentSearch } from "@/components/ComponentSearch";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import { unstable_setRequestLocale } from "next-intl/server";
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { Footer } from "@/components/Footer";
// import { getCurrentUser } from "@/utils/session";
import { UserAccountNav } from "@/components/UserAccountNav";

type Props = {
  children: ReactNode;
  params: { locale: string };
};
// async
export default function MarketingLayout({ children, params: { locale } }: Props) {
    unstable_setRequestLocale(locale);
    // const user = await getCurrentUser();
    return (
        <>
            <ComponentSearch>
                <Header>
                    <UserAccountNav user={undefined} />
                </Header>
            </ComponentSearch>
            <SectionContainer> 
                {children}
            </SectionContainer> 
            <ScrollTopAndComment />
            <Footer />  
        </>
    )
}