import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "ReportMeta" });
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

export default function ReportCreatorPage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const t = useTranslations("CreatorPage");
  const localPath = locale == 'pl' ? 'pl' : 'en';
  return (
      <main>
           <h1
          className="mt-20 animate-fade-up font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] dark:from-white sm:text-4xl md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
          >
            {t("title")}
      </h1>
      <p dangerouslySetInnerHTML={{ __html: t.raw('subTitle') }} className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
      <p dangerouslySetInnerHTML={{ __html: t.raw('p1') }} className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
      <h2 className="font-sans text-2xl font-bold tracking-tight sm:text-4xl mt-2">{t("heading1")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.raw('p2') }} className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
     
      <Image src={`/images/project/${localPath}/report/light.png`} alt={t("altLight")} width={1650} height={656} className="w-full h-auto object-contain dark:hidden rounded-md shadow-md mb-10 mt-10" />
      <Image src={`/images/project/${localPath}/report/dark.png`} alt={t("altDark")} width={1650} height={656} className="w-full h-auto object-contain hidden dark:flex rounded-md shadow-md mb-10 mt-10" />
      
      <p dangerouslySetInnerHTML={{ __html: t.raw('p3') }} className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
      <h2 className="font-sans text-2xl font-bold tracking-tight sm:text-4xl mt-2">{t("heading2")}</h2>
      <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("p4")}</p>
      
      <Image src={`/images/project/${localPath}/report/1light.png`} alt={t("altLight1")} width={1650} height={656} className="w-full h-auto object-contain dark:hidden rounded-md shadow-md mb-10 mt-10" />
      <Image src={`/images/project/${localPath}/report/1dark.png`} alt={t("altDark1")} width={1650} height={656} className="w-full h-auto object-contain hidden dark:flex rounded-md shadow-md mb-10 mt-10" />
      
      <h2 className="font-sans text-2xl font-bold tracking-tight sm:text-4xl mt-2">{t("heading3")}</h2>
      <ul className="list-disc mt-0">
        <li dangerouslySetInnerHTML={{ __html: t.raw('l1') }} className="ml-8 mt-6 mb-3 text-lg leading-8 text-gray-500 dark:text-gray-400" />
        <li dangerouslySetInnerHTML={{ __html: t.raw('l2') }} className="ml-8 my-3 text-lg leading-8 text-gray-500 dark:text-gray-400" />
        <li dangerouslySetInnerHTML={{ __html: t.raw('l3') }} className="ml-8 my-3 pb-7 text-lg leading-8 text-gray-500 dark:text-gray-400" />
      </ul>
      <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("p5")}</p>
    </main>
  )
}
