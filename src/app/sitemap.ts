import { pathnames } from '@/config';
import { getDocuments } from 'outstatic/server';
import { siteMetadata } from '@/data/siteMetadata';
import { generateURLObjects, generateXML, generateXMLSitemap, transformPaths } from '@/lib/generateSitemapXML';

const excludePaths = ['/admin', '/dashboard', '/blog/[slug]'];
const defaultLocale = 'en' as const;
const host = siteMetadata.siteUrl;

export default async function sitemap() {
    const posts = getDocuments('posts', ['slug', 'lang'])
        .filter(post => post.status == 'published')

    const paths = transformPaths(pathnames, excludePaths);
    const urlObjects = generateURLObjects(paths, defaultLocale, host);

    const xml = generateXML(urlObjects);

    // console.log(xml)
    // generateXMLSitemap(xml);

    return `${xml}`
}