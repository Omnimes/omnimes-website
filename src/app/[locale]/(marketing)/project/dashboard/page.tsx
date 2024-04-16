import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "DashboardMeta" });
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

export default function DashboardPage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const t = useTranslations("DashboardPage");
  const localPath = locale == 'pl' ? 'pl' : 'en';
  return (
      <main>
        <h1
          className="mt-20 animate-fade-up font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] dark:from-white sm:text-4xl md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
          >
            {t("title")}
        </h1>
        <p dangerouslySetInnerHTML={{ __html: t.raw('p1') }} className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
        <p dangerouslySetInnerHTML={{ __html: t.raw('p2') }} className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
        <p dangerouslySetInnerHTML={{ __html: t.raw('p3') }} className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
        <Image src={`/images/project/${localPath}/dashboard/redash.png`} alt={t("altRedash")} width={1650} height={656} className="w-full h-auto object-contain rounded-md shadow-md mb-10" />
        <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("p4")}</p>
        <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("p5")}</p>
        <Image src={`/images/project/dashboard.png`} alt={t("altRedashAdding")} width={1650} height={656} className="w-full h-auto object-contain rounded-md shadow-md mb-10" />
      </main>
  )
}
