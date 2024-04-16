import { genPageMetadata } from '@/app/seo'
import { getLocalePrimaryDialects } from '@/data/locales'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import Image from 'next/image'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'ScheduleMeta' })
  const title = t('title')
  const description = t('desc')
  const keywords = t('keywords')
  const localeShort = getLocalePrimaryDialects(locale)
  const obj = {
    title,
    description,
    keywords,
    localeShort,
  }
  const meta = genPageMetadata(obj)
  return meta
}

export default function SchedulePage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const t = useTranslations('SchedulePage');
  const localPath = locale == 'pl' ? 'pl' : 'en';
  return (
    <main>
      <h1
        className="animate-fade-up font-display mt-20 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] dark:from-white sm:text-4xl md:text-7xl md:leading-[5rem]"
        style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
      >
        {t('title')}
      </h1>
      <Image src={`/images/project/${localPath}/schedule/light.png`} alt={t("altLight")} width={1650} height={656} className="w-full h-auto object-contain dark:hidden rounded-md shadow-md mb-10 mt-10" />
      <Image src={`/images/project/${localPath}/schedule/dark.png`} alt={t("altDark")} width={1650} height={656} className="w-full h-auto object-contain hidden dark:flex rounded-md shadow-md mb-10 mt-10" />
      <p className="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400">
        {t('subTitle')}
      </p>
      <h2 className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {t('heading1')}
      </h2>
      <ul className="mt-0 list-disc">
        <li
          dangerouslySetInnerHTML={{ __html: t.raw('l1') }}
          className="my-3 ml-8 text-lg leading-8 text-gray-500 dark:text-gray-400"
        />
        <li
          dangerouslySetInnerHTML={{ __html: t.raw('l2') }}
          className="my-3 ml-8 text-lg leading-8 text-gray-500 dark:text-gray-400"
        />
        <li
          dangerouslySetInnerHTML={{ __html: t.raw('l3') }}
          className="my-3 ml-8 text-lg leading-8 text-gray-500 dark:text-gray-400"
        />
        <li
          dangerouslySetInnerHTML={{ __html: t.raw('l4') }}
          className="my-3 ml-8 text-lg leading-8 text-gray-500 dark:text-gray-400"
        />
        <li
          dangerouslySetInnerHTML={{ __html: t.raw('l5') }}
          className="my-3 ml-8 pb-7 text-lg leading-8 text-gray-500 dark:text-gray-400"
        />
      </ul>

      <h2 className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {t('heading2')}
      </h2>
      <p className="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400">{t('p1')}</p>
      <h2 className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {t('heading3')}
      </h2>
      <p className="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400">{t('p2')}</p>
    </main>
  )
}
