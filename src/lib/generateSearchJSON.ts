import fs from 'fs/promises'; 
// import { ExtendedOstDocument } from "@/app/[locale]/(marketing)/blog/page";
import { load } from "outstatic/server";

export const generateSearchJSON = async (): Promise<Search[] | undefined> => {
  const db = await load();
  // get all posts. Example of fetching a specific collection
  const allPosts = await db
    .find({ collection: 'posts', status: 'published' }, [
      'title',
      'slug',
      'description',
      'lang',
      'tags'
    ])
    .sort({ publishedAt: -1 })
    .toArray()
  
  if (!allPosts) return undefined;

  const results = allPosts.map(post => {
    return {
      title: post.title,
      path: post.slug,
      keywords: post.tags,
      subtitle: post.description,
      lang: post.lang,
      section: "Blog"
    }
  })

  try {
    await fs.writeFile('public/search.json', JSON.stringify(results, null, 2), 'utf-8');
  } catch (error) {
    console.error('Błąd podczas zapisu pliku search.json:', error);
  }

  return undefined;
};