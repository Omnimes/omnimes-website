"use client"

import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"

import { ExtendedOstDocument } from "@/app/[locale]/(marketing)/blog/page"
import { CustomLink } from "@/components/Link"
import MDXComponent from "@/components/mdx/MdxComponent"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
import Tag from "@/components/Tag"
import getFormattedDate from "@/lib/getFormattedDate"

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
  const { title, publishedAt, content, tags, author, coverImage, description } = post
  const lang = useLocale()

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(title)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank")
  }

  return (
    <>
      <ScrollTopAndComment />

      {/* Hero Section with Cover Image */}
      <div className="relative">
        {/* Cover Image */}
        {coverImage && (
          <div className="relative h-[40vh] overflow-hidden md:h-[50vh] lg:h-[55vh]">
            <Image src={coverImage} alt={title} fill className="object-cover" priority />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Hero Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="mx-auto w-full max-w-5xl px-2 pb-16 sm:px-4 lg:px-6">
                {/* Back Link */}
                {showBackLinks && (
                  <div className="mb-6">
                    <CustomLink
                      href={backPath}
                      className="group inline-flex items-center space-x-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/60 sm:px-4"
                    >
                      <svg
                        className="size-4 transition-transform duration-300 group-hover:-translate-x-1 sm:size-5"
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
                      <span className="text-sm font-medium sm:text-base">{t("back")}</span>
                    </CustomLink>
                  </div>
                )}

                {/* Date Badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center space-x-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-white backdrop-blur-sm sm:px-4">
                    <svg className="size-3 sm:size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <time dateTime={publishedAt} className="text-xs font-medium sm:text-sm">
                      {getFormattedDate(publishedAt, lang)}
                    </time>
                  </div>
                </div>

                {/* Title */}
                <h1 className="mb-4 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                  {title}
                </h1>
              </div>
            </div>
          </div>
        )}

        {/* Fallback Hero (bez obrazka) */}
        {!coverImage && (
          <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-16 sm:py-20 lg:py-24">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative mx-auto max-w-5xl px-2 text-center sm:px-4 lg:px-6">
              {showBackLinks && (
                <div className="mb-6 sm:mb-8">
                  <CustomLink
                    href={backPath}
                    className="group inline-flex items-center space-x-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/60 sm:px-4"
                  >
                    <svg
                      className="size-4 transition-transform duration-300 group-hover:-translate-x-1 sm:size-5"
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
                    <span className="text-sm font-medium sm:text-base">{t("back")}</span>
                  </CustomLink>
                </div>
              )}

              <div className="mb-4 sm:mb-6">
                <div className="inline-flex items-center space-x-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-white backdrop-blur-sm sm:px-4">
                  <svg className="size-3 sm:size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <time dateTime={publishedAt} className="text-xs font-medium sm:text-sm">
                    {getFormattedDate(publishedAt, lang)}
                  </time>
                </div>
              </div>

              <h1 className="text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {title}
              </h1>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <article className="mx-auto max-w-5xl px-2 sm:px-4 lg:px-6">
        {/* Author Card */}
        <div className="relative -mt-8 mb-12 sm:-mt-12 sm:mb-16">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:rounded-2xl sm:p-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <Image
                  src={author?.picture || "/images/avatars/default.png"}
                  width={50}
                  height={50}
                  alt="avatar"
                  className="h-12 w-12 rounded-full ring-2 ring-white dark:ring-gray-800 sm:h-15 sm:w-15 sm:ring-4"
                />
                <div className="absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-white bg-green-400 dark:border-gray-800 sm:size-5"></div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
                    {author?.name}
                  </h3>
                  <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                    Autor
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  {t('publishedOn')} {getFormattedDate(publishedAt, lang)}
                </p>
                
                {/* Tags under publication date */}
                {Array.isArray(tags) && tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag: { value: string; label: string }, index: number) => {
                      return (
                        <div
                          key={tag?.value || index}
                          className="transition-transform duration-200 hover:scale-105"
                        >
                          <Tag text={tag?.label || ""} />
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with Share */}
        <div className="mb-6 rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:mb-8 sm:rounded-2xl">
          {/* Share Section at the top */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:border-gray-700 dark:from-blue-900/20 dark:to-purple-900/20 sm:p-6">
            <div className="flex flex-col items-start justify-between space-y-3 sm:flex-row sm:items-center sm:space-y-0">
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                  Podobał Ci się ten artykuł? Podziel się nim!
                </p>
              </div>
              <div className="flex w-full flex-col space-y-2 sm:w-auto sm:flex-row sm:space-x-3 sm:space-y-0">
                <button
                  onClick={shareOnTwitter}
                  className="w-full rounded-lg bg-blue-500 px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
                >
                  Udostępnij na Twitter
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="w-full rounded-lg bg-blue-700 px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-blue-800 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
                >
                  Udostępnij na LinkedIn
                </button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="prose prose-sm dark:prose-invert max-w-none sm:prose-base lg:prose-lg">
              <MDXComponent content={content} />
            </div>
          </div>
        </div>

        {/* Back to Blog */}
        {showBackLinks && (
          <div className="mb-12 text-center sm:mb-16">
            <CustomLink
              href={backPath}
              className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 sm:rounded-xl sm:px-8 sm:py-4 sm:text-base"
            >
              <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Powrót do bloga</span>
            </CustomLink>
          </div>
        )}
      </article>

      {/* Bottom Spacing */}
      <div className="h-12 sm:h-16"></div>
    </>
  )
}