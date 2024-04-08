import { genPageMetadata } from '@/app/seo';
import { getLocalePrimaryDialects } from '@/data/locales';
import ListLayout from '@/layouts/ListLayout'
import { getPostsMeta } from '@/lib/posts';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

type Props = {
    params: {
        locale: string;
        page: string;
    };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t('blog_title');
  const description = t('blog_desc');
  const keywords = t('blog_keywords');
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

const POSTS_PER_PAGE = 10

export const generateStaticParams = async ({ params: { locale } }: Props) => {
    const posts = await getPostsMeta(locale);
    if (!posts || posts.length == 0 || posts === undefined) {
        return []
    }
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
    const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

    return paths
}

export default async function Page({ params }: { params: { page: string, locale: string } }) {
    unstable_setRequestLocale(params.locale);
    const t = await getTranslations('Blog');
    const posts = await getPostsMeta(params.locale);
    if (!posts || posts.length == 0 || posts === undefined) {
      return <p>{t('NotFound')}</p>
    }
 
  const pageNumber = parseInt(params.page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={t('title')}
    />
  )
}
