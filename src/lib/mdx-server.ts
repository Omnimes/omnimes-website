import { bundleMDX } from 'mdx-bundler'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeCitation from "rehype-citation";
import rehypeHighlight from "rehype-highlight";
import remarkCodeTitle from 'remark-code-title'
import rehypePrismPlus from 'rehype-prism-plus';
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
} from 'pliny/mdx-plugins/index.js'
  
export default async function MDXServer(code: string) {
    const result = await bundleMDX({
        source: code,
        mdxOptions(options) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []), 
                remarkGfm,
                remarkMath,
                remarkImgToJsx,
                remarkCodeTitle,
                remarkCodeTitles,
                remarkExtractFrontmatter,
            ]
            options.rehypePlugins = [
              ...(options.rehypePlugins ?? []),
                rehypeSlug,
                rehypeKatex,
                rehypeCitation,
                [rehypeAutolinkHeadings, { behavior: "wrap", }],
                [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
                rehypeHighlight,
                [
                    rehypePrettyCode,
                    {
                      theme: 'dracula'
                      // The rest of the rehypePrettyCode config
                    }
                ],
            ] as any
            return options
        }
    })

    return result.code
}