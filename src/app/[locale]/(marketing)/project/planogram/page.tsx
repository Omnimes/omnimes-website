import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "PlanogramMeta" });
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
export default function PlanogramPage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const t = useTranslations("PlanogramPage");
  return (
      <main>
         <h1
          className="mt-20 animate-fade-up font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] dark:from-white sm:text-4xl md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
          >
            {t("title")}
      </h1>
      <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("subTitle")}</p>
      {/* img */}
      <h2 className="font-sans text-2xl font-bold tracking-tight sm:text-4xl mt-2">{t("heading1")}</h2>
      <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("p1")}</p>
      <p dangerouslySetInnerHTML={{ __html: t.raw('p2') }} className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
      <h2 className="font-sans text-2xl font-bold tracking-tight sm:text-4xl mt-2">{t("heading2")}</h2>
      <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("p3")}</p>
      <h2 className="font-sans text-2xl font-bold tracking-tight sm:text-4xl mt-2">{t("heading3")}</h2>
      <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("p4")}</p>
    </main>
  )
}
