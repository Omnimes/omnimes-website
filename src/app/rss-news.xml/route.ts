import { getDocuments } from 'outstatic/server';
import { siteMetadata } from '@/data/siteMetadata';
import RSS from "rss";
const host = siteMetadata.siteUrl;

export async function GET() {
  const feedOptions = {
    id: host,
    title: "OmniMES News",
    favicon: `${host}/favicon.ico`,
    description: "Latest updates and news from OmniMES.",
    site_url: host,
    feed_url: `${host}/rss-news.xml`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    generator: 'Feed for Node.js',
  };

  const feed = new RSS(feedOptions);
  const news = getDocuments('news', ['title', 'slug', 'lang', 'description', 'author'])

  const pathMappingNews: { [key: string]: string } = {
    en: 'news',
    de: 'nachrichten',
    pl: 'aktualności',
  };

  news.map((post) => {
    const lang = (post.lang ?? 'pl') as 'en' | 'de' | 'pl'; 

    feed.item({
      title: post.title,
      guid: `${host}${post.lang}/${pathMappingNews[lang]}/${post.slug}`,
      url: `${host}${post.lang}/${pathMappingNews[lang]}/${post.slug}`,
      date: new Date(post.publishedAt),
      description: post.description ?? "",
      author: post.author?.name,
      });
  });
   
   return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}