import "highlight.js/styles/github-dark.css";
import siteMetadata from "@/data/siteMetadata";
import PostLayout from "@/layouts/PostLayout";
import MDXServer from "@/lib/mdx-server";
import { getLocalePrimaryDialects } from "@/data/locales";
import { getDocumentSlugs, load } from "outstatic/server";
import { ExtendedOstDocument } from "../page";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 900;
type Props = {
  params: {
    postId: string;
    locale: string;
  };
};

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const posts = getDocumentSlugs("posts");
  if (!posts) return [];

  return posts.map((post) => ({
    postId: post,
    locale: locale,
  }));
}

async function getData({ params }: Props) {
    const db = await load();

    const post = await db
        .find<ExtendedOstDocument>({ collection: "posts", slug: params.postId, lang: params.locale }, [
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
