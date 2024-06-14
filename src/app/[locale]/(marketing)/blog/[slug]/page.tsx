import "highlight.js/styles/github-dark.css";
import PostLayout from "@/layouts/PostLayout";
import MDXServer from "@/lib/mdxServer";
import { getLocalePrimaryDialects } from "@/data/locales";
import { getDocumentSlugs, load } from "outstatic/server";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { siteMetadata } from "@/data/siteMetadata";
import { ExtendedOstDocument } from "../page";
import { Button, Link } from '@nextui-org/react';
import { LucideChevronLeft } from "lucide-react";
type Props = {
  params: {
    slug: string;
    locale: string;
  };
};

export async function generateStaticParams() {
  const posts = getDocumentSlugs("posts");
  return posts.map((slug) => ({ slug }));
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

export default async function BlogPost(params: Props) {
  const post = await getData(params);
  const t = await getTranslations('PostLayout');

  if (!post || post == undefined) {
    return (
      <article className="mx-auto mt-32 max-w-screen-lg px-4 text-center md:px-0">
          <h1 className="font-heading my-2 inline-block text-4xl leading-tight lg:text-5xl">
              {t("postNotFound")}
          </h1>
          <p>
              {t("postNotFoundDesc")}
          </p>
          <div className="flex justify-center py-6 lg:py-10">
          <Button
            as={Link}
            href="/blog"
            className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
          >
            <LucideChevronLeft className="mr-2 size-4" />
            {t("allPost")}
          </Button>
          </div>
      </article>
    )
  }

  return (
    <PostLayout post={post} />
  );
}