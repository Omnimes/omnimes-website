import { genPageMetadata } from "@/app/seo";
import { UserVerifyEmail } from "@/components/auth/UserVerifyEmail";
import { getLocalePrimaryDialects } from "@/data/locales";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from 'react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "VerifyEmail" });
    const title = t('title');
    const description = t('desc');
    const keywords = t('keywords');
    const localeShort = getLocalePrimaryDialects(locale);
    const obj = {
      title,
      description,
      keywords,
      localeShort,
    }
    return genPageMetadata(obj)
}

export default function VerifyEmailPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
      <Suspense>
        <UserVerifyEmail />
      </Suspense>
    )
}