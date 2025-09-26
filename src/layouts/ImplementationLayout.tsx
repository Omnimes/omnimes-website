"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

import { CustomLink } from "@/components/Link"
import MDXComponent from "@/components/mdx/MdxComponent"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
import { ExtendedOstDocument } from "@/app/[locale]/(marketing)/blog/page"

interface LayoutProps {
  post: ExtendedOstDocument
  backPath?: string
  showBackLinks?: boolean
}

export default function PostLayout({
  post,
  backPath = "/blog",
  showBackLinks = true,
}: LayoutProps) {
  const t = useTranslations("PostLayout")
  const { title, content, coverImage } = post
  const lang = useLocale()

  return (
    <div className="w-full">
      <ScrollTopAndComment />

      {/* Main Content */}
      <article className="xs:px-4 mx-auto max-w-5xl px-3 sm:px-4 lg:px-6">
        {/* Header Section - Przycisk powrotu i Tytuł */}
        <div className="xs:py-8 py-6 sm:py-10 md:py-12">
          {showBackLinks && (
            <div className="mb-6">
              <CustomLink
                href={backPath}
                className="xs:space-x-2 xs:rounded-xl xs:px-4 xs:py-2.5 xs:text-sm 
                          group inline-flex items-center space-x-1.5 rounded-lg 
                          bg-gradient-to-r from-blue-500
                          to-purple-600 px-3 py-2 text-xs font-medium text-white
                          shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 
                          hover:from-blue-600 hover:to-purple-700 sm:px-6 sm:py-3 sm:text-base"
              >
                <svg
                  className="xs:size-4 size-3.5 transition-transform 
                            duration-300 group-hover:-translate-x-1 sm:size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>{t("back")}</span>
              </CustomLink>
            </div>
          )}

          <h1
            className="xs:text-2xl mb-6 text-xl
                        font-black leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl
                        xl:text-6xl dark:text-white"
          >
            {title}
          </h1>
        </div>

        {/* Main Content z obrazkiem obok */}
        <div
          className="xs:rounded-xl mb-6 rounded-lg border border-gray-100 
                        bg-white shadow-lg sm:mb-8 sm:rounded-2xl 
                        dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex flex-col md:flex-row">
            {/* Cover Image - responsywny */}
            {coverImage && (
              <div className="relative mx-auto mb-6 size-48 shrink-0 md:mx-0 md:mb-0 md:mr-6 md:size-64 lg:size-72 xl:size-80">
                <div className="relative m-4 h-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
                  <Image
                    src={coverImage}
                    alt={title}
                    fill
                    className="size-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 320px, 384px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Article Content */}
            <div
              className={`flex-1 ${coverImage ? "xs:p-4 p-3 sm:p-6 lg:p-8" : "xs:p-4 p-3 sm:p-6 lg:p-8"}`}
            >
              <div
                className="prose prose-sm dark:prose-invert 
                              xs:prose-sm sm:prose-base lg:prose-lg 
                              max-w-none"
              >
                <MDXComponent content={content} />
              </div>
            </div>
          </div>
        </div>

        {/* Back to Blog */}
        {showBackLinks && (
          <div className="xs:mb-10 mb-8 text-center sm:mb-12 md:mb-16">
            <CustomLink
              href={backPath}
              className="xs:space-x-2 xs:rounded-xl xs:px-6 xs:py-3 
                        xs:text-sm inline-flex items-center 
                        space-x-1.5 rounded-lg bg-gradient-to-r 
                        from-blue-500 to-purple-600
                        px-4 py-2.5 text-xs 
                        font-medium text-white shadow-lg
                        transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 
                        sm:rounded-xl sm:px-8 sm:py-4 sm:text-base"
            >
              <svg
                className="xs:size-4 size-3.5 sm:size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>{t("backToBlog")}</span>
            </CustomLink>
          </div>
        )}
      </article>

      {/* Bottom Spacing */}
      <div className="xs:h-10 h-8 sm:h-12 md:h-16"></div>
    </div>
  )
}
