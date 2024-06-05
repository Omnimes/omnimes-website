import fs from 'fs/promises'; 
import { locales } from "@/config"
import { create } from 'xmlbuilder2';

type changeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

type LanguagePaths = {
  [key: string]: string
};

type Paths = {
  [key: string]: string | LanguagePaths;
};

type URLObject = {
    url: string;
    lastModified: Date;
    changeFrequency: changeFrequency,
    alternates: {
      languages: {
        [key: string]: string;
      };
    };
  };
  
export function transformPaths(paths: Paths, excludePaths: string[]): Paths {
  const transformedPaths: Paths = {};
  
  for (const key in paths) {
    if (excludePaths.includes(key)) {
      continue; // Skip the paths that are in the exclude list
    }

    if (typeof paths[key] === 'string') {
      transformedPaths[key] = locales.reduce((acc, lang) => {
        acc[lang] = paths[key] as string;
        return acc;
      }, {} as LanguagePaths);
    } else {
      transformedPaths[key] = paths[key];
    }
  }

  return transformedPaths;
}

export function generateURLObjects(paths: Paths, defaultLocale: string, baseURL: string): URLObject[] {
  const urlObjects: URLObject[] = [];
  for (const key in paths) {
    const path = paths[key];
    
    if (typeof path !== 'object' || path === null || !(defaultLocale in path)) {
      continue;
    }

    const urlObject: URLObject = {
      url: `${baseURL}${defaultLocale}${path[defaultLocale]}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      alternates: {
        languages: {}
      }
    };

    for (const lang in path) {
      if (lang !== defaultLocale) {
        urlObject.alternates.languages[lang] = `${baseURL}${lang}${path[lang as keyof LanguagePaths]}`;
      }
    }
    urlObjects.push(urlObject);
  }

  return urlObjects;
}

export function generateXML(urlObjects: URLObject[]): string {
    const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('urlset', { 
        'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9', 
        'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
        'xmlns:mobile': 'http://www.google.com/schemas/sitemap-mobile/1.0',
        'xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9'
      });
  
    urlObjects.forEach(obj => {
      const urlElement = root.ele('url');
      urlElement.ele('loc').txt(obj.url);
      urlElement.ele('changefreq').txt(obj.changeFrequency);
      urlElement.ele('lastmod').txt(obj.lastModified.toISOString());
  
      for (const lang in obj.alternates.languages) {
        urlElement.ele('xhtml:link', {
          rel: 'alternate',
          hreflang: lang,
          href: obj.alternates.languages[lang]
        }).up();
      }
    });
  
    return root.end({ prettyPrint: true });
  }

export const generateXMLSitemap = async (xmlDoc: any) => {
    try {
        await fs.writeFile('public/sitemap.xml', xmlDoc);
    } catch (error) {
        console.error('Błąd podczas zapisu pliku search.json:', error);
    }
}