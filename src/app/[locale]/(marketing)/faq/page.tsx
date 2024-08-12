import { DescriptionPrimary } from '@/components/ui/Description'
import { Heading } from '@/components/ui/Heading'
import { SubtitleNormal } from '@/components/ui/Subtitle'
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
  return genPageMetadata(obj)
}

export default function FaqPage({ params: { locale } }: { params: { locale: string } }) {
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

const AbstractBackgroundSecond = () => {
  return (
    <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 z-[-1]">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-fuchsia-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-fuchsia-700 dark:from-red-300 to-pink-200 dark:to-purple-400 "></div>
    </div>
  )
}