import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "AnalysisMeta" });
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
export default function AnalysisPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("AnalysisPage");
  const localPath = locale == 'pl' ? 'pl' : 'en';
  return (
      <main>
           <h1
          className="mt-20 animate-fade-up font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] dark:from-white sm:text-4xl md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
          >
            {t("title")}
      </h1>
      <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("subTitle")}</p>
      <h2 className="font-sans text-2xl font-bold tracking-tight sm:text-4xl mt-2">{t("heading1")}</h2>
      <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">{t("p1")}</p>

      <ol className="mt-0 list-decimal">
        <li className="my-3 ml-5 text-lg leading-8 text-gray-500 dark:text-gray-400">
          <p dangerouslySetInnerHTML={{ __html: t.raw('l1') }} className="my-6 text-lg leading-8 text-gray-500 dark:text-gray-400 font-bold" />
          <p dangerouslySetInnerHTML={{ __html: t.raw('l1-p') }} className="mt-3 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
          <Image src={`/images/project/${localPath}/analysis/light.png`} alt={t("altLight")} width={1650} height={656} className="w-full h-auto object-contain dark:hidden rounded-md shadow-md mb-10 mt-10" />
          <Image src={`/images/project/${localPath}/analysis/dark.png`} alt={t("altDark")} width={1650} height={656} className="w-full h-auto object-contain hidden dark:flex rounded-md shadow-md mb-10 mt-10" />
          <p dangerouslySetInnerHTML={{ __html: t.raw('l1-p2') }} className="mt-3 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
          <Image src={`/images/project/${localPath}/analysis/1light.png`} alt={t("altLight1")} width={1650} height={656} className="w-full h-auto object-contain dark:hidden rounded-md shadow-md mb-10 mt-10" />
          <Image src={`/images/project/${localPath}/analysis/1dark.png`} alt={t("altDark1")} width={1650} height={656} className="w-full h-auto object-contain hidden dark:flex rounded-md shadow-md mb-10 mt-10" />
        </li>

        <li className="my-3 ml-5 text-lg leading-8 text-gray-500 dark:text-gray-400">
          <p dangerouslySetInnerHTML={{ __html: t.raw('l2') }} className="my-6 text-lg leading-8 text-gray-500 dark:text-gray-400 font-bold" />
          <p dangerouslySetInnerHTML={{ __html: t.raw('l2-p') }} className="mt-3 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
          <Image src={`/images/project/${localPath}/analysis/2light.png`} alt={t("altLight2")} width={1650} height={656} className="w-full h-auto object-contain dark:hidden rounded-md shadow-md mb-10 mt-10" />
          <Image src={`/images/project/${localPath}/analysis/2dark.png`} alt={t("altDark2")} width={1650} height={656} className="w-full h-auto object-contain hidden dark:flex rounded-md shadow-md mb-10 mt-10" />
          <p dangerouslySetInnerHTML={{ __html: t.raw('l2-p2') }} className="mt-3 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
          <Image src={`/images/project/${localPath}/analysis/3light.png`} alt={t("altLight3")} width={1650} height={656} className="w-full h-auto object-contain dark:hidden rounded-md shadow-md mb-10 mt-10" />
          <Image src={`/images/project/${localPath}/analysis/3dark.png`} alt={t("altDark3")} width={1650} height={656} className="w-full h-auto object-contain hidden dark:flex rounded-md shadow-md mb-10 mt-10" />
        </li>

        <li className="my-3 ml-5 text-lg leading-8 text-gray-500 dark:text-gray-400">
          <p dangerouslySetInnerHTML={{ __html: t.raw('l3') }} className="my-6 text-lg leading-8 text-gray-500 dark:text-gray-400 font-bold" />
          <p dangerouslySetInnerHTML={{ __html: t.raw('l3-p') }} className="mt-3 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
          <Image src={`/images/project/${localPath}/analysis/4light.png`} alt={t("altLight4")} width={1650} height={656} className="w-full h-auto object-contain dark:hidden rounded-md shadow-md mb-10 mt-10" />
          <Image src={`/images/project/${localPath}/analysis/4dark.png`} alt={t("altDark4")} width={1650} height={656} className="w-full h-auto object-contain hidden dark:flex rounded-md shadow-md mb-10 mt-10" />
        </li>
      </ol>
    </main>
  )
}
