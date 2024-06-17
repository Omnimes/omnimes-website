import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/utils/session'
import { getTranslations } from 'next-intl/server';
import { getLocalePrimaryDialects } from '@/data/locales';
import { genPageMetadata } from '@/app/seo';
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "WebinarsPage" });
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

export default async function WebinarsPage({params: { locale }}: {params: { locale: string }}) {
  unstable_setRequestLocale(locale);
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login')
  }

  return (
    <main>
      już wkrótce...
    </main>
  )
}
