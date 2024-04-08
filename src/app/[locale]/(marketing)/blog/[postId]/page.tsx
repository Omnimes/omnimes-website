import { getPostsMeta, getPostByName } from "@/lib/posts";
import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import siteMetadata from "@/data/siteMetadata";
import PostLayout from "@/layouts/PostLayout";
import { getTranslations } from "next-intl/server";
import { getLocalePrimaryDialects } from "@/data/locales";

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
  const posts = await getPostsMeta(locale);
  if (!posts) return [];

  return posts.map((post) => ({
    postId: post.id,
    locale: locale,
  }));
}

export async function generateMetadata({ params: { postId, locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const post = await getPostByName(`${postId}.${locale}.mdx`);
  if (!post) {
    return {
      title: t("postNotFound"),
    };
  }

  const { title, subtitle, date, authors } = post.meta;
  const stringAuthor = authors.map((item: { meta: { name: string; }; }) => {
    return item.meta.name
  })

  return {
    title,
    description: subtitle,
    openGraph: {
      title,
      description: subtitle,
      siteName: siteMetadata.title,
      locale: getLocalePrimaryDialects(locale),
      type: "article",
      publishedTime: new Date(date).toISOString(),
      url: siteMetadata.siteUrl + "/" + locale + "/blog/" + postId,
      images: [siteMetadata.socialBanner],
      authors: stringAuthor.join(', ')
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: subtitle,
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

export default async function Post({ params: { postId, locale }}: Props) {
  const post = await getPostByName(`${postId}.${locale}.mdx`);
  if (!post || post == undefined) notFound();
  const { meta, content } = post;

  return (
    <PostLayout
      content={content}
      meta={meta}
      locale={locale}
      authors={meta.authors}
    />
  );
}
