import { slug } from 'github-slugger';
import { pathnames } from '@/config';
import { getDocuments, getCollections } from 'outstatic/server';
import { siteMetadata } from '@/data/siteMetadata';
import { generateURLObjects, 
    generateXML, 
    transformPaths,
    generateURLObjectsWithoutAlternate, 
    URLObject,
    generateURLObjectsTags
} from '@/lib/generateSitemapXML'; 
import { excludePaths, defaultLocale } from '@/middleware';

const host = siteMetadata.siteUrl;

export async function GET() {
  const collections = getCollections();
  const prepareUrls: URLObject[] = [];
  const uniqueTagsByLang: { [key: string]: Set<string> } = {};

  collections.forEach(collection => {
      const date = getDocuments(collection, ['slug', 'lang', 'tags']).filter(entry => entry.status == 'published');
      const results = generateURLObjectsWithoutAlternate(date, host, collection);
      prepareUrls.push(...results);

      date.forEach(article => {
        const lang = article.lang;
        if (Array.isArray(article.tags) && typeof lang == 'string') {
          const tags = article.tags
            .filter((tag): tag is { label: string } => typeof tag === 'object' && tag !== null && 'label' in tag)
            .map(tag => slug(tag.label));
      
          if (!uniqueTagsByLang[lang]) {
            uniqueTagsByLang[lang] = new Set();
          }
          tags.forEach(tag => uniqueTagsByLang[lang].add(tag));
        }
      });
  });

  const result = Object.keys(uniqueTagsByLang).reduce((acc: { [key: string]: string[] }, lang) => {
    acc[lang] = Array.from(uniqueTagsByLang[lang]);
    return acc;
  }, {});

  const xmlFiles = ["feed-news.xml", "feed.xml", "news.json", "posts.json", "rss-news.xml", "rss.xml"];
  const xmlFilesUrls: URLObject[] = []
  xmlFiles.forEach(item => {
    xmlFilesUrls.push({
      url: `${host}${item}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    } as URLObject)
  })
  

  const paths = transformPaths(pathnames, excludePaths);
  const urlObjects = generateURLObjects(paths, defaultLocale, host);
  const urlTags = generateURLObjectsTags(result, host);
  const arrUrlObjects = [...urlObjects, ...prepareUrls, ...urlTags, ...xmlFilesUrls];
  const xml = generateXML(arrUrlObjects);
  return new Response(xml);
  // return new Response(xml, {
  //   headers: {
  //     "Content-Type": "application/xml; charset=UTF-8",
  //   },
  // });
}