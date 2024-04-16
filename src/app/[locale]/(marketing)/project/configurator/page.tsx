import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "ConfiguratorMeta" });
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

export default function ConfiguratorPage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const t = useTranslations("ConfigurationPage");
  const localPath = locale == 'pl' ? 'pl' : 'en';
  return (
      <main>
        <h1
          className="mt-20 animate-fade-up font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] dark:from-white sm:text-4xl md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
          >
            {t("title")}
        </h1>
        <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">{t('subTitle')}</p>
        <h2 className="font-sans text-2xl font-bold tracking-tight sm:text-4xl mt-2">{t("heading1")}</h2>
        <p dangerouslySetInnerHTML={{ __html: t.raw('p1') }} className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
        <Image src={`/images/project/${localPath}/configuration/tree.png`} alt={t("altTree")} width={1650} height={656} className="w-full h-auto object-contain rounded-md shadow-md mb-10" />
        <h2 className="font-sans text-2xl font-bold tracking-tight sm:text-4xl mt-2">{t("heading2")}</h2>
        <p dangerouslySetInnerHTML={{ __html: t.raw('p2') }} className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
        <Image src={`/images/project/${localPath}/configuration/light.png`} alt={t("altLight1")} width={1650} height={656} className="w-full h-auto object-contain dark:hidden rounded-md shadow-md mb-10" />
        <Image src={`/images/project/${localPath}/configuration/dark.png`} alt={t("altDark1")} width={1650} height={656} className="w-full h-auto object-contain hidden dark:flex rounded-md shadow-md mb-10" />
        <h2 className="font-sans text-2xl font-bold tracking-tight sm:text-4xl mt-2">{t("heading3")}</h2>
        <p dangerouslySetInnerHTML={{ __html: t.raw('p3') }} className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400" />
        <h2 className="font-sans text-2xl font-bold tracking-tight sm:text-4xl mt-2">{t("heading4")}</h2>
        <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">{t('p4')}</p>
        <Image src={`/images/project/${localPath}/configuration/2light.png`} alt={t("altLight2")} width={1650} height={656} className="w-full h-auto object-contain dark:hidden rounded-md shadow-md mb-10" />
        <Image src={`/images/project/${localPath}/configuration/2dark.png`} alt={t("altDark2")} width={1650} height={656} className="w-full h-auto object-contain hidden dark:flex rounded-md shadow-md mb-10" />
      </main>
  )
}
