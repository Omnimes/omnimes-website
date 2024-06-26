import { getDocuments } from 'outstatic/server';
import { siteMetadata } from '@/data/siteMetadata';
import { OstDocument } from 'outstatic';
import { Feed } from "feed";
const host = siteMetadata.siteUrl;

type ExtendedOstDocument = OstDocument & { tags: { value: string, label: string }[] };

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
  const posts = getDocuments('posts', ['title', 'slug', 'lang', 'description', 'author', 'tags']);

  (posts as ExtendedOstDocument[])
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())  
  .map((item: ExtendedOstDocument) => {
    feed.addItem({
      title: item.title,
      link: `${host}${item.lang}/blog/${item.slug}`,
      description: item.description,
      date: new Date(item.publishedAt),
      published: new Date(item.publishedAt),
      author: [ item.author ?? {} ],
      category: item.tags.map((tag: { value: string, label: string}) => ({name: tag.label}))
    })
  })

  return new Response(feed.json1(), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}