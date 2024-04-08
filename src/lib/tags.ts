import { compileMDX } from 'next-mdx-remote/rsc'

export async function getPostByName(fileName: string): Promise<BlogPostTags | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/PiotrSierant/test-blogposts/main/${fileName}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  )

  if (!res.ok) return undefined
  const rawMDX = await res.text()
  if (rawMDX === '404: Not Found') return undefined

  const { frontmatter } = await compileMDX<{ keywords: string }>({
    source: rawMDX,
    options: {
      parseFrontmatter: true,
    },
  })
  const blogPostObj: BlogPostTags = {
    meta: {
      keywords: frontmatter.keywords,
    },
  }

  return blogPostObj
}

export async function getTagsMeta(locale: string): Promise<Record<string, number> | undefined> {
  const res = await fetch(
    'https://api.github.com/repos/PiotrSierant/test-blogposts/git/trees/main?recursive=1',
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  )
  if (!res.ok) return undefined
  const repoFiletree: Filetree = await res.json()
  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter((path) => path.includes(locale))
    .filter((path) => path.endsWith(`${locale}.mdx`))

  const tags: MetaTags[] = []
  const tagCounts = {} as Record<string, number>

  for (const file of filesArray) {
    const post = await getPostByName(file)
    if (post) {
      const { meta } = post
      tags.push(meta)
    }
  }

  tags.forEach((obj) => {
    const keywordsArray = obj.keywords.split(', ')
    keywordsArray.forEach((keyword) => {
      tagCounts[keyword] = (tagCounts[keyword] || 0) + 1
    })
  })

  return tagCounts
}
