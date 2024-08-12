import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
// import { Skeleton } from '@/components/ui/Skeleton';
import { load } from 'outstatic/server';
import { OstDocument } from 'outstatic';
import Image from 'next/image';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "NewsMeta" });
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

async function getData(locale: string) {
  const db = await load();
  const allNews = await db
    .find<OstDocument>({ collection: 'news', status: 'published', lang: locale }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
    ])
    .sort({ publishedAt: -1 })
    .limit(20)
    .toArray();

  return allNews
}

export default async function NewsPage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const allNews = await getData(locale);
  // const t = await getTranslations('News');

  return (
      <main className='py-24'>
        <BentoGrid className="max-w-4xl mx-auto">
        {allNews.map((item, i) => (
          <BentoGridItem
            key={i}
            slug={'/news/'+item.slug}
            title={item.title}
            description={item.description}
            header={<Skeleton src={item.coverImage} />}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
        </BentoGrid>
    </main>
  )
}

const Skeleton = ({src}: {src: string | undefined}) => {
  if(src == undefined || src == '') {
    return (<div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>)
  } else {
    return (<div className="relative flex overflow-hidden flex-1 w-full h-full min-h-[10rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
        <Image src={src} alt={"News photo"} width={1096} height={282} className='w-full h-auto object-cover object-center max-h-[300px]' />      
    </div>)
  }
}