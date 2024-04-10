import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from '@/app/seo'
import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { getLocalePrimaryDialects } from '@/data/locales'
import { ExtendedOstDocument } from '../../blog/page'
import { getDocuments, load } from 'outstatic/server'
type Props = {
  params: {
    tag: string
    locale: string
  }
}

export async function generateMetadata({ params: { locale, tag } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Tag' })
  const title = t('title', { tag: decodeURI(tag) })
  const description = t('desc', { tag: tag })
  const keywords = t('keywords', { tag: tag })
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
  let tags = (await getDataTags(locale)) as Record<string, number>
  if (!tags) return []

  return Object.keys(tags).map((tag) => ({
    tag: tag,
    locale: locale,
  }))
}


async function getDataTags(locale: string) {
  const posts = getDocuments('posts', ['lang', 'tags']);
  
  if (!posts || posts.length == 0 || posts === undefined) {
    return undefined
  }
    
    const localePosts = posts.filter((post) => post.lang == locale).map(post => post.tags);
    const tagCounts = {} as Record<string, number>
    
  if (localePosts.length > 0) {
    localePosts.forEach((obj) => {
      if (typeof obj == 'string') {
        const keywordsArray = obj.split(', ');
        keywordsArray.forEach((keyword) => {
          tagCounts[keyword] = (tagCounts[keyword] || 0) + 1
        })
      }
    })
  }
  
  return tagCounts
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
  
    if (!posts) {
        return undefined
  }
  
  const filteredPosts = posts.filter(post => post.tags?.includes(decodeURI(params.tag)))
  
  return filteredPosts
}

export default async function TagPage(params: Props) {
  const { locale, tag } = params.params
  unstable_setRequestLocale(locale)
  const t = await getTranslations('Tag')

    let tags = (await getDataTags(locale)) as Record<string, number>
  if (tags?.length == 0 || !tags) return <p className="mt-10 text-center">{t('notFound')}</p>

  const posts = await getData(params);
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1);
  if (posts?.length == 0 || !posts) return <p className="mt-10 text-center">{t('notFound')}</p>

  return <ListLayout
      posts={posts}
      title={title}
      tags={tags}
      tag={tag}
    />
}