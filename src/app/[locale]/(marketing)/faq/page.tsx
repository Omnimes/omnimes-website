import { DescriptionPrimary } from '@/components/atoms/Description'
import { Heading } from '@/components/atoms/Heading'
import { SubtitleNormal } from '@/components/atoms/Subtitle'
import { AbstractBackgroundSecond } from '@/components/decorate/AbstractBackground'
import { Faq } from '@/components/Faq'
import { useTranslations } from 'next-intl'

import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "FaqMeta" });
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
  const meta = genPageMetadata(obj)
  return meta
}

export default function FaqPage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const t = useTranslations("FAQ")
  
  return (
      <main className="px-0 py-16 md:text-center">
        <AbstractBackgroundSecond />
        <SubtitleNormal text={t("subtitle")} />
        <Heading text={t("heading")} />
        <DescriptionPrimary text={t("desc")} />
        <Faq />
    </main>
  )
}
