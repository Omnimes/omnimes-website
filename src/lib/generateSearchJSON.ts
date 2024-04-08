import { compileMDX } from "next-mdx-remote/rsc";
import fs from 'fs/promises'; 
type Filetree = {
  tree: [
    {
      path: string;
    }
  ];
};

export const generateSearchJSON = async (): Promise<Search[] | undefined> => {
  const res = await fetch(
    "https://api.github.com/repos/PiotrSierant/test-blogposts/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!res.ok) return undefined;

  const repoFiletree: Filetree = await res.json();
  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter((path) => path.endsWith(`.mdx`));

    const posts: Search[] = [];
    
    for (const file of filesArray) {
        const post = await getPostByName(file)
        if (post) {
            const { meta } = post
            posts.push(meta)
        }
    }

  try {
    await fs.writeFile('public/search.json', JSON.stringify(posts, null, 2), 'utf-8');
  } catch (error) {
    console.error('Błąd podczas zapisu pliku search.json:', error);
  }

  return undefined;
};

export async function getPostByName(
  fileName: string
): Promise<SearchSchema | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/PiotrSierant/test-blogposts/main/${fileName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!res.ok) return undefined;

  const rawMDX = await res.text();

  if (rawMDX === "404: Not Found") return undefined;

  const { frontmatter } = await compileMDX<{
    path: string;
    title: string;
    keywords: string;
    subtitle: string;
    section: string;
    lang: string;
  }>({
      source: rawMDX,
      options: {
        parseFrontmatter: true,
      }
  });

  const prepare = fileName.split(".");
  const id = prepare[0];

  const obj: SearchSchema = {
    meta: {
      path: id,
      title: frontmatter.title,
      keywords: frontmatter.keywords,
      subtitle: frontmatter.subtitle,
      section: frontmatter.section,
      lang: frontmatter.lang,
    },
    };

  return obj;
}
