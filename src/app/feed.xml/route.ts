import { getDocuments } from 'outstatic/server';
import { siteMetadata } from '@/data/siteMetadata';
import { Feed } from "feed";
const host = siteMetadata.siteUrl;

export async function GET() {
  const feedOptions = {
    id: host,
    title: "OmniMES Blog Posts",
    favicon: `${host}/favicon.ico`,
    description: "Latest posts from OmniMES Blog.",
    link: host,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    generator: 'Feed for Node.js',
    feedLinks: {
      json: `${host}posts.json`,
      atom: `${host}feed.xml`,
      rss2: `${host}rss.xml`
    },
    author: {
      name: "OmniMes",
      email: "kontakt@omnimes.pl",
      link: host
    }
  };

  const feed = new Feed(feedOptions);
  const posts = getDocuments('posts', ['title', 'slug', 'lang', 'description', 'author'])

  posts.forEach(item => {
    feed.addItem({
      title: item.title,
      id: `${host}${item.lang}/blog/${item.slug}`,
      link: `${host}${item.lang}/blog/${item.slug}`,
      description: item.description,
      content: item.content,
      date: new Date(item.publishedAt),
      author: [
        item.author ?? {}
      ]
    });
  });

   return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}