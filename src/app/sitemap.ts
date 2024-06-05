import { MetadataRoute } from 'next'
import { pathnames } from "../config"
import { siteMetadata } from "@/data/siteMetadata";
import { getDocuments } from 'outstatic/server';
import { generateURLObjects, generateXML, generateXMLSitemap, transformPaths } from '@/lib/generateSitemapXML';
import fs from "fs/promises"
import { XMLBuilder } from "fast-xml-parser"
// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
const excludePaths = ['/admin', '/dashboard', '/blog/[slug]'];
const defaultLocale = 'en' as const;
const host = siteMetadata.siteUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = getDocuments('posts', ['slug', 'lang'])
        .filter(post => post.status == 'published')

    const paths = transformPaths(pathnames, excludePaths);
    const urlObjects = generateURLObjects(paths, defaultLocale, host);

    // const sitemap = {
    //     urlset: {
    //         "@_xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
    //         "@_xmlns:xhtml": "http://www.w3.org/1999/xhtml",
    //         url: urlObjects.map(url => {
    //             const urlObject = {
    //                 loc: url.url,
    //                 lastmod: url.lastModified,
    //                 changefreq: url.changeFrequency,
    //                 priority: 0.9,
    //                 "xhtml:link": "" as any
    //             };
    
    //             if (url.alternates && url.alternates.languages) {
    //                 urlObject["xhtml:link"] = Object.entries(url.alternates.languages).map(([hreflang, href]) => ({
    //                     "@_rel": "alternate",
    //                     "@_hreflang": hreflang,
    //                     "@_href": href
    //                 }));
    //             }
    
    //             return urlObject;
    //         })
    //     }
    // };
    // const builder = new XMLBuilder({
    //     format: true,  // Umożliwia sformatowanie XML-a
    //     ignoreAttributes: false  // Aby atrybuty zostały uwzględnione
    // });
    // const xmlContent = builder.build(sitemap);


    // try {
    //     await fs.writeFile('public/sitemap.xml', xmlContent);
    // } catch (error) {
    //     console.error('Błąd podczas zapisu pliku search.json:', error);
    // }

    // const xml = generateXML(urlObjects);
    // generateXMLSitemap(xml);

    // zmienić na bibliotekę fast-xml-parser i test :) 
    return [...urlObjects]
}