import { bundleMDX } from 'mdx-bundler'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export default async function MDXServer(code: string) {
    const result = await bundleMDX({
        source: code,
        mdxOptions(options) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []), 
                remarkGfm
            ]
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []), 
                rehypeSlug,
                [
                    rehypePrettyCode,
                    {
                      theme: 'dracula'
                      // The rest of the rehypePrettyCode config
                    }
                  ],
                  [
                    rehypeAutolinkHeadings,
                    {
                      properties: {
                        className: ['hash-anchor']
                      }
                    }
                  ]
            ] as any
            return options
        }
    })

    return result.code
}