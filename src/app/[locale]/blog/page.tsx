import { genPageMetadata } from "@/app/seo";
import { getLocalePrimaryDialects } from "@/data/locales";
import ListLayout from "@/layouts/ListLayout";
import { generateSearchJSON } from "@/lib/generateSearchJSON";
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from "next-intl/server";
import { OstDocument } from "outstatic";
import { getDocuments, load } from 'outstatic/server';
import { ComponentSearch } from "@/components/ComponentSearch";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { Footer } from "@/components/Footer";
import { getCurrentUser } from "@/utils/session";
import { UserAccountNav } from "@/components/UserAccountNav";

export type ExtendedOstDocument = OstDocument & { tags?: string };
export const POSTS_PER_PAGE = 10;

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
    .limit(POSTS_PER_PAGE)
    .toArray()

  const postsLength = getDocuments('posts', ['lang'])
    .filter(post => post.status == 'published')
    .filter(post => post.lang == locale)
    .length;

    // console.log(postsLength)
    // let allPosts: any = []
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
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Blog');

  // await getDataToSearch(locale);
  const user = await getCurrentUser();

  let { allPosts, postsLength } = await getData(locale);
  allPosts = [];
  postsLength = 0 
  const pageNumber = 1
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(postsLength / POSTS_PER_PAGE),
  }

  return (
    <>
      <ComponentSearch>
        <Header>
          <UserAccountNav user={user} />
        </Header>
      </ComponentSearch>
      <SectionContainer>
        <ListLayout
          posts={allPosts}
          initialDisplayPosts={allPosts}
          pagination={pagination}
          title={t('title')}
        />
      </SectionContainer>
      <ScrollTopAndComment />
      <Footer />
    </>
  );
}