"use client"

import { ImgHTMLAttributes, useMemo } from "react"
import Image from "next/image"
import { getMDXComponent } from "mdx-bundler/client"
import type { MDXComponents } from "mdx/types"

import { CustomCode, Pre } from "./CustomCode"
import CustomLink from "./CustomLink"

const MDXComponentsMap = {
  a: CustomLink,
  Image,
  img: ({ ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img className="w-100 rounded-lg border" {...props} />
  ),
  pre: Pre,
  code: CustomCode,
}

type MDXComponentProps = {
  content: string
  components?: MDXComponents
}

export const MDXComponent = ({ content, components = {} }: MDXComponentProps) => {
  const Component = useMemo(() => getMDXComponent(content), [content])

  return (
    <Component
      components={
        {
          ...MDXComponentsMap,
          ...components,
        } as MDXComponentProps["components"]
      }
    />
  )
}

export default MDXComponent
