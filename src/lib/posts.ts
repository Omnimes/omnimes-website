import { compileMDX } from "next-mdx-remote/rsc";
import Video from "@/components/Video";
import CustomImage from "@/components/CustomImage";
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeSlug from "rehype-slug";
import rehypeKatex from 'rehype-katex';
import rehypeCitation from "rehype-citation";
import rehypeHighlight from "rehype-highlight";
import remarkCodeTitle from 'remark-code-title'
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  } from 'pliny/mdx-plugins/index.js'
import { getAutorsByNick } from "./autors";
type Filetree = {
  tree: [
    {
      path: string;
    }
  ];
};

export async function getPostByName(
  fileName: string
): Promise<BlogPost | undefined> {
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

  const { frontmatter, content } = await compileMDX<{
    path: string;
    title: string;
    date: string;
    keywords: string;
    subtitle: string;
    section: string;
    lang: string;
    authors: string[];
  }>({
    source: rawMDX,
    components: {
      Video,
      CustomImage,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          rehypeKatex,
          rehypeCitation,
          [rehypeAutolinkHeadings, { behavior: "wrap", }],
          [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
          rehypeHighlight,
        ],
        remarkPlugins: [
          remarkGfm,
          remarkMath,
          remarkImgToJsx,
          remarkCodeTitle,
          remarkCodeTitles,
          remarkExtractFrontmatter,
        ]
      },
    },
  });

  const prepare = fileName.split(".");
  const id = prepare[0];
  const author = frontmatter.authors === undefined ? ["default"] : frontmatter.authors;
  const authors = await getAutorsByNick(author);

  const blogPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      keywords: frontmatter.keywords,
      subtitle: frontmatter.subtitle,
      section: frontmatter.section,
      lang: frontmatter.lang,
      authors: authors,
    },
    content,
  };

  return blogPostObj;
}

export async function getPostsMeta(
  locale: string
): Promise<Meta[] | undefined> {
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
    .filter((path) => path.includes(locale))
    .filter((path) => path.endsWith(`${locale}.mdx`));

  const posts: Meta[] = [];

  for (const file of filesArray) {
    const post = await getPostByName(file);
    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
