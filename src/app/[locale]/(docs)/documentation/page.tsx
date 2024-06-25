import { getTranslations } from 'next-intl/server';
import { getLocalePrimaryDialects } from '@/data/locales';
import { genPageMetadata } from '@/app/seo';
import { unstable_setRequestLocale } from "next-intl/server";
import { DocsSidebarNav } from '@/components/docs/SidebarNav';
import { docsConfig } from '@/data/docs';

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

export default function DocsPage({params: { locale }}: {params: { locale: string }}) {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
        <DocsSidebarNav items={docsConfig.sidebarNav} />
      </aside>
    </div>
  )
}
