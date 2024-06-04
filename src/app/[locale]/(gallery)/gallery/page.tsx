import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { GalleryMES } from '@/components/Gallery';
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "GalleryMeta" });
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
export default function GalleryPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return ( <GalleryMES /> )
}