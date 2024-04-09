import { getDocuments } from 'outstatic/server'

export async function getTagsMeta(locale: string): Promise<Record<string, number> | undefined> {
  const posts = getDocuments('posts', ['lang', 'tags'])
  if (!posts || posts.length == 0 || posts === undefined) {
    return undefined
  }

  const localePosts = posts.filter((post) => post.lang == locale).map(post => post.tags);
  const tagCounts = {} as Record<string, number>
  
  if (localePosts.length > 0) {
    localePosts.forEach((obj) => {
      if (typeof obj == 'string') {
        const keywordsArray = obj.split(', ');
        keywordsArray.forEach((keyword) => {
          tagCounts[keyword] = (tagCounts[keyword] || 0) + 1
        })
      }
    })
  }

  return tagCounts
}
