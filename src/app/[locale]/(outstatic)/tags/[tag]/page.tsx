import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from '@/app/seo'
import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { getLocalePrimaryDialects } from '@/data/locales'
import { ExtendedOstDocument } from '../../blog/page'
import { getDocuments, load } from 'outstatic/server'
import { slug } from 'github-slugger'

type Props = {
  params: {
    tag: string
    locale: string
  }
}

export async function generateMetadata({ params: { locale, tag } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tag' })
  const title = t('title', { tag: decodeURIComponent(tag) })
  const description = t('desc', { tag: decodeURIComponent(tag) })
  const keywords = t('keywords', { tag: decodeURIComponent(tag) })
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

export const generateStaticParams = async ({
  params: { locale },
}: {
  params: { locale: string }
}) => {
  let tags = await getDataTags(locale) as { value: string, label: string, count: number }[];
  if (!tags) return []

  const staticParams = tags.map((tag) => ({
    tag: slug(tag.label),
    locale: locale,
  }))

  return staticParams
}


async function getDataTags(locale: string) {
  const posts = getDocuments('posts', ['lang', 'tags']);

  if (!posts || posts.length == 0 || posts === undefined) return undefined

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

async function getData({ params }: Props) {
  const db = await load();
  const posts = await db
    .find<ExtendedOstDocument>({ collection: "posts", lang: params.locale }, [
      "title",
      "publishedAt",
      "description",
      "slug",
      "tags"
    ])
    .sort({ publishedAt: -1 })
    .toArray()

  if (!posts) return undefined
  return posts.filter(post => post.tags.some(tag => slug(tag.label) == slug(decodeURIComponent(params.tag))))
}

export default async function TagPage(params: Props) {
  const { locale, tag } = params.params;
  unstable_setRequestLocale(locale)
  const t = await getTranslations('Tag')

  let tags = await getDataTags(locale) as { value: string, label: string, count: number }[];
  if (tags?.length == 0 || !tags) return <p className="mt-10 text-center">{t('notFound')}</p>

  const posts = await getData(params);
  if (posts?.length == 0 || !posts) return <p className="mt-10 text-center">{t('notFound')}</p>

  return <ListLayout
    posts={posts}
    tags={tags}
    tag={tag}
  />
}