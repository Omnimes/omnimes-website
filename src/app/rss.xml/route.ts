import { getDocuments } from 'outstatic/server';
import { siteMetadata } from '@/data/siteMetadata';
import RSS from "rss";
const host = siteMetadata.siteUrl;

export async function GET() {
  const feedOptions = {
    id: host,
    title: "OmniMES Blog Posts",
    favicon: `${host}/favicon.ico`,
    description: "Latest posts from OmniMES Blog.",
    site_url: host,
    feed_url: `${host}/rss.xml`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    generator: 'Feed for Node.js',
  };

  const feed = new RSS(feedOptions);
  const posts = getDocuments('posts', ['title', 'slug', 'lang', 'description', 'author'])

  posts.map((post) => {
    feed.item({
      title: post.title,
      guid: `${host}${post.lang}/blog/${post.slug}`,
      url: `${host}${post.lang}/blog/${post.slug}`,
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