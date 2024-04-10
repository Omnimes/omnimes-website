import "highlight.js/styles/github-dark.css";
import PostLayout from "@/layouts/PostLayout";
import MDXServer from "@/lib/mdx-server";
import { getLocalePrimaryDialects } from "@/data/locales";
import { getDocumentSlugs, load } from "outstatic/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteMetadata } from "@/data/siteMetadata";
import { ExtendedOstDocument } from "../page";

type Props = {
  params: {
    slug: string;
    locale: string;
  };
};

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const db = await load()
  const posts = await db
    .find({
      collection: 'posts'
    })
    .project(['slug', 'lang'])
    .toArray()
  
  const filteredPosts = posts.filter(post => post.lang == locale).map((post) => ({
    slug: post.slug,
  }));

  return filteredPosts
}

async function getData({ params }: Props) {
    const db = await load();

    const post = await db
        .find<ExtendedOstDocument>({ collection: "posts", slug: params.slug, lang: params.locale }, [
            "title",
            "publishedAt",
            "description",
            "slug",
            "author",
            "content",
            "coverImage",
            "tags",
            "lang"
        ])
        .first();


    if (!post) {
        return undefined
    }

    const content = await MDXServer(post.content);

    return {
        ...post,
        content,
    };
}

export async function generateMetadata( params: Props): Promise<Metadata> {
  const post = await getData(params)
  const { params: { locale } } = params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  
  if (!post) {
    return {
      title: t("postNotFound"),
    };
  }
 
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      siteName: siteMetadata.title,
      locale: getLocalePrimaryDialects(locale),
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      url: siteMetadata.siteUrl + "/" + locale + "/blog/" + post.slug,
      images: [siteMetadata.socialBanner],
      authors: post.author?.name || ""
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [siteMetadata.socialBanner],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Post(params: Props) {
  const post = await getData(params);
  if (!post || post == undefined) notFound();

  return (
    <PostLayout post={post} />
  );
}
