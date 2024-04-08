import { genPageMetadata } from "@/app/seo";
import { getLocalePrimaryDialects } from "@/data/locales";
import ListLayout from "@/layouts/ListLayout";
import { generateSearchJSON } from "@/lib/generateSearchJSON";
import { getPostsMeta } from "@/lib/posts";
import {getTranslations} from 'next-intl/server';
import { unstable_setRequestLocale } from "next-intl/server";

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
const POSTS_PER_PAGE = 10;

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  await generateSearchJSON();
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const posts = await getPostsMeta(locale);
  const t = await getTranslations('Blog');

  if (posts?.length == 0 || !posts) {
    return <p className="mt-10 text-center">{t("NotFound")}</p>;
  }

  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <main>
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={t('title')}
      />
    </main>
  );
}