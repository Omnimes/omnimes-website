import { genPageMetadata } from "@/app/seo";
import { getLocalePrimaryDialects } from "@/data/locales";
import ListLayout from "@/layouts/ListLayout";
import { generateSearchJSON } from "@/lib/generateSearchJSON";
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from "next-intl/server";
import { OstDocument } from "outstatic";
import { getDocuments, load } from 'outstatic/server';

export type ExtendedOstDocument = OstDocument & { tags: { value: string, label: string }[] };
export const revalidate = 3600;

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

async function getData(locale: string) {
  const db = await load();
  const allPosts = await db
    .find<ExtendedOstDocument>({ collection: 'posts', status: 'published', lang: locale }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
      'author',
      'tags'
    ])
    .sort({ publishedAt: -1 })
    .limit(20)
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

async function getDataToSearch(locale: string) {
  const posts = getDocuments('posts', ['slug', 'title', 'description', 'tags', 'lang'])
    .filter(post => post.status == 'published')
    .filter(post => post.lang == locale)

  await generateSearchJSON(posts);
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  await getDataToSearch(locale);
  const { allPosts, postsLength } = await getData(locale);
  const t = await getTranslations('Blog');
  const pageNumber = 1
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
  );
}
