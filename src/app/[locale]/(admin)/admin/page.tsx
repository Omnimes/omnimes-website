import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
//   const t = await getTranslations({ locale, namespace: "Admin" });
//   const title = t('title');
//   const description = t('desc');
//   const keywords = t('keywords');
//   const localeShort = getLocalePrimaryDialects(locale);
//   const obj = {
//     title,
//     description,
//     keywords,
//     localeShort,
//   }
//   const meta = genPageMetadata(obj)
//   return meta
// }

export default function AdminPage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  return (
    <main>
      Admin
    </main>
  );
}