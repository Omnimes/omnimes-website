import { pathnames } from '@/config';
import { getDocuments, getCollections } from 'outstatic/server';
import { siteMetadata } from '@/data/siteMetadata';
import { generateURLObjects, 
    generateXML, 
    transformPaths,
    generateURLObjectsWithoutAlternate, 
    URLObject
} from '@/lib/generateSitemapXML'; 
import { excludePaths, defaultLocale } from '@/middleware';

const host = siteMetadata.siteUrl;

export async function GET() {
    const collections = getCollections();
    const prepareUrls: URLObject[] = [];

    collections.forEach(collection => {
        const date = getDocuments(collection, ['slug', 'lang']).filter(entry => entry.status == 'published');
        const results = generateURLObjectsWithoutAlternate(date, host);
        prepareUrls.push(...results);
    })

    const paths = transformPaths(pathnames, excludePaths);
    const urlObjects = generateURLObjects(paths, defaultLocale, host);
    const arrUrlObjects = [...urlObjects, ...prepareUrls]
    
    const xml = generateXML(arrUrlObjects);

  return new Response(xml, {
    headers: {
      "content-type": "application/xml;charset=UTF-8",
    },
  });
}