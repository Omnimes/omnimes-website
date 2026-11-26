"use client"

import { ComponentProps, HTMLAttributes, ImgHTMLAttributes, useMemo } from "react"
import Image from "next/image"
import { getMDXComponent } from "mdx-bundler/client"
import type { MDXComponents } from "mdx/types"

import { CustomCode, Pre } from "./CustomCode"
import CustomLink from "./CustomLink"

// BO-1426: markdown images are often written as ![](image-XXXX.png) — an empty alt
// is replaced with the article title passed by the layout (imageAlt).
const buildComponents = (imageAlt?: string) => ({
  a: CustomLink,
  Image: ({ alt, ...props }: ComponentProps<typeof Image>) => (
    <Image alt={alt || imageAlt || ""} {...props} />
  ),
  img: ({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="w-100 rounded-lg border" alt={alt || imageAlt || ""} {...props} />
  ),
  // BO-1426: the page title is the only <h1>; "# heading" inside an article becomes <h2>
  h1: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props}>{children}</h2>
  ),
  pre: Pre,
  code: CustomCode,
})

type MDXComponentProps = {
  content: string
  components?: MDXComponents
  /** Fallback alt text for images without one (usually the article title). */
  imageAlt?: string
}

export const MDXComponent = ({ content, components = {}, imageAlt }: MDXComponentProps) => {
  const Component = useMemo(() => getMDXComponent(content), [content])
  const baseComponents = useMemo(() => buildComponents(imageAlt), [imageAlt])

  return (
    <Component
      components={
        {
          ...baseComponents,
          ...components,
        } as MDXComponentProps["components"]
      }
    />
  )
}

export default MDXComponent
