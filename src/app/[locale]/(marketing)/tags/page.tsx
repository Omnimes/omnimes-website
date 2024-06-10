import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { CustomLink } from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import { genPageMetadata } from "@/app/seo";
import { getLocalePrimaryDialects } from '@/data/locales'
import { getDocuments } from 'outstatic/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "Tags" });
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

export default async function TagsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Tags');
  let tags = await getData(locale) as { value: string, label: string, count: number }[];
  if (tags == undefined) {
    tags = []
  }
  const sortedTags = tags.sort((a, b) => b.count - a.count);
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            {t("tags")}
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tags.length === 0 &&  t("notfoundTag")}
          {sortedTags.map((tag) => {
            return (
              <div key={tag.value} className="mb-2 mr-5 mt-2">
                <Tag text={tag.label} />
                <CustomLink
                  href={`/tags/${slug(tag.label)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${tag.label}`}
                >
                  {` (${tag.count})`}
                </CustomLink>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
} 


async function getData(locale: string) {
  const posts = getDocuments('posts', ['lang', 'tags']);
  
  if (!posts || posts.length == 0 || posts === undefined) {
    return undefined
  }
    
    const localePosts = posts.filter((post) => post.lang == locale).map(post => post.tags);
  
    const tagCounts = {} as Record<string, { value: string, label: string, count: number }>;
  
    if (localePosts.length > 0) {
      localePosts.forEach(tagsArray => {
        if (Array.isArray(tagsArray)) {
          tagsArray.forEach(tagObj => {
            const keyword = tagObj.value;
            if (tagCounts[keyword]) {
              tagCounts[keyword].count += 1;
            } else {
              tagCounts[keyword] = { value: tagObj.value, label: tagObj.label, count: 1 };
            }
          });
        }
      });
    }
    
    return Object.values(tagCounts);
}