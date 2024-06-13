import { genPageMetadata } from '@/app/seo'
import { getLocalePrimaryDialects } from '@/data/locales'
import ListLayout from '@/layouts/ListLayout'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { getDocuments, load } from 'outstatic/server'
import { ExtendedOstDocument } from '../../page'

type Props = {
  params: {
    locale: string
    page: string
  }
}
export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const title = t('blog_title')
  const description = t('blog_desc')
  const keywords = t('blog_keywords')
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

export const generateStaticParams = async ({ params: { locale } }: Props) => {
  const posts = getDocuments('posts', ['lang'])
  if (!posts || posts.length == 0 || posts === undefined) {
    return []
  }
  const localePosts = posts.filter((post) => post.lang == locale)
  const totalPages = Math.ceil(localePosts.length / 10)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
  return paths
}

async function getData(locale: string, page: string) {
  const db = await load()
  const allPosts = await db
    .find<ExtendedOstDocument>({ collection: 'posts', status: 'published', lang: locale }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
      'author',
      'tags',
    ])
    .sort({ publishedAt: -1 })
    .skip((Number(page) - 1) * 20)
    .limit(20)
    .toArray()

    const postsLength = getDocuments('posts', ['lang'])
    .filter(post => post.status == 'published')
    .filter(post => post.lang == locale)
    .length;

  return {
    allPosts,
    postsLength,
  }
}

export default async function BlogPagePage({ params }: { params: { page: string; locale: string } }) {
  unstable_setRequestLocale(params.locale)
  const t = await getTranslations('Blog')
   const { allPosts, postsLength } = await getData(params.locale, params.page);
  if (!allPosts || allPosts.length == 0 || allPosts === undefined) {
    return (
            <p className="mt-10 text-center">
              {t('NotFound')}
            </p>
          )
  }

  const pageNumber = parseInt(params.page as string)

  const pagination = {
      currentPage: pageNumber,
      totalPages: Math.ceil(postsLength / 20),
  }

  return (
    <ListLayout
      posts={allPosts}
      initialDisplayPosts={allPosts}
      pagination={pagination}
      title={t('title')}
    />
  )
}