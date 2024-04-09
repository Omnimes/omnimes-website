import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from '@/app/seo'
import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { getTagsMeta } from '@/lib/tags'
import { getLocalePrimaryDialects } from '@/data/locales'
import { getPostsMeta } from '@/lib/posts'
import { slug } from 'github-slugger'
type Props = {
  params: {
    tag: string
    locale: string
  }
}
export const revalidate = 900;
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
  let tags = (await getTagsMeta(locale)) as Record<string, number>
  if (!tags) return []

  return Object.keys(tags).map((tag) => ({
    tag: tag,
    locale: locale,
  }))
}
// const POSTS_PER_PAGE = 2;
export default async function TagPage({ params: { tag, locale } }: Props) {
  unstable_setRequestLocale(locale)
  const t = await getTranslations('Tag')

  let tags = (await getTagsMeta(locale)) as Record<string, number>
  if (tags?.length == 0 || !tags) return <p className="mt-10 text-center">{t('notFound')}</p>

  const posts = await getPostsMeta(locale)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
    if (posts?.length == 0 || !posts) return <p className="mt-10 text-center">{t('notFound')}</p>
    
//     const pageNumber = 1
//   const initialDisplayPosts = posts.slice(
//     POSTS_PER_PAGE * (pageNumber - 1),
//     POSTS_PER_PAGE * pageNumber
//   )
//   const pagination = {
//     currentPage: pageNumber,
//     totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
//   }

  const filteredPosts = posts.filter(
    (post) =>
      post.keywords &&
      post.keywords
        .split(', ')
        .map((t: string) => slug(t))
        .includes(decodeURI(tag))
  )

    return <ListLayout
        posts={filteredPosts}
        // initialDisplayPosts={initialDisplayPosts}
        // pagination={pagination}
        title={title}
        tags={tags}
        tag={tag}
    />
}