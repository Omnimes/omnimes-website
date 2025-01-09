import { bundleMDX } from "mdx-bundler"
import { remarkCodeTitles, remarkImgToJsx } from "pliny/mdx-plugins/index.js"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeCitation from "rehype-citation"
import rehypeHighlight from "rehype-highlight"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"
import rehypePrismPlus from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkCodeTitle from "remark-code-title"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { Pluggable } from "unified"

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
      ] as Pluggable[]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeKatex,
        rehypeCitation,
        [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
        rehypeHighlight,
        [rehypePrettyCode, { theme: "dracula" }],
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ] as Pluggable[]
      return options
    },
  })

  return result.code
}
