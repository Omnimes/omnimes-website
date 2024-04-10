import { genPageMetadata } from "@/app/seo";
import { getLocalePrimaryDialects } from "@/data/locales";
import ListLayout from "@/layouts/ListLayout";
import {getTranslations} from 'next-intl/server';
import { unstable_setRequestLocale } from "next-intl/server";
import { OstDocument } from "outstatic";
import { getDocuments, load } from 'outstatic/server';

export const revalidate = 900;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
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

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  // await generateSearchJSON();
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Blog');
  const { allPosts, postsLength } = await getData(locale);

  const pageNumber = 1

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(postsLength / 10),
  }

  return (
      // <ListLayout
      //   posts={[]}
      //   initialDisplayPosts={[]}
      //   pagination={pagination}
      //   title={t('title')}
    // />
    <>
      Lista postów: 
      {allPosts.map(post => {
        <li key={post.slug}>
              {post.title}
          </li>
        })}
    </>
  );
}

// export type ExtendedOstDocument = OstDocument & { tags?: string };
async function getData(locale: string) {
  const db = await load();
  const allPosts = await db
    .find({ collection: 'posts', status: 'published', lang: locale }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
      'author',
      'tags'
    ])
    .sort({ publishedAt: -1 })
    .limit(10)
    .toArray()
  
  const postsLength = getDocuments('posts', ['lang'])
    .filter(post => post.status == 'published')
    .filter(post => post.lang == locale)
    .length;
  
  return {
    allPosts,
    postsLength
  }
}