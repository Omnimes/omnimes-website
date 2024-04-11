import { bundleMDX } from 'mdx-bundler'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug'
import remarkCodeTitle from 'remark-code-title'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex';
import rehypeCitation from "rehype-citation";
import rehypeHighlight from "rehype-highlight";
import rehypePrismPlus from 'rehype-prism-plus';
import {
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
            ]
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []), 
                rehypeSlug,
                rehypeKatex,
                rehypeCitation,
                [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
                rehypeHighlight,
                [rehypePrettyCode, { theme: 'dracula' }],
                [rehypeAutolinkHeadings, { behavior: "wrap" }]
            ] as any
            return options
        }
    })

    return result.code
}