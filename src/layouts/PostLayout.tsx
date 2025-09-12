"use client"

import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"

import { ExtendedOstDocument } from "@/app/[locale]/(marketing)/blog/page"
import { CustomLink } from "@/components/Link"
import MDXComponent from "@/components/mdx/MdxComponent"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
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
    const text = encodeURIComponent(`${title} - sprawdź ten artykuł!`)
    // Używamy x.com (nowa domena Twitter)
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    const title_encoded = encodeURIComponent(title)
    const summary = encodeURIComponent(description || `Sprawdź ten interesujący artykuł: ${title}`)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title_encoded}&summary=${summary}`, "_blank")
  }

  return (
    <>
      <ScrollTopAndComment />

      {/* Hero Section with Cover Image */}
      <div className="relative">
        {/* Cover Image */}
        {coverImage && (
          <div className="relative w-full overflow-hidden
                          h-[280px] xs:h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px] xl:h-[580px] 2xl:h-[640px]
                          min-h-[280px] max-h-[80vh]">
            <Image 
              src={coverImage} 
              alt={title} 
              fill 
              className="object-cover object-center w-full h-full" 
              priority 
              sizes="(max-width: 390px) 390px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, 1920px"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%'
              }}
            />
            {/* Gradient Overlay - dostosowany do małych ekranów */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 
                            sm:from-black/80 sm:via-black/40 sm:to-transparent" />

            {/* Hero Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="mx-auto w-full max-w-5xl px-3 pb-8 xs:px-4 sm:px-4 lg:px-6 
                              xs:pb-10 sm:pb-12 md:pb-16">
                {/* Back Link - mniejszy na mobilnych */}
                {showBackLinks && (
                  <div className="mb-4 xs:mb-5 sm:mb-6">
                    <CustomLink
                      href={backPath}
                      className="group inline-flex items-center space-x-1.5 xs:space-x-2 
                                rounded-full border border-white/20 bg-black/50 backdrop-blur-sm
                                px-2.5 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2
                                text-white transition-all duration-300 hover:bg-black/70"
                    >
                      <svg
                        className="size-3.5 xs:size-4 sm:size-5 
                                  transition-transform duration-300 group-hover:-translate-x-1"
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
                      <span className="text-xs xs:text-sm sm:text-base font-medium">{t("back")}</span>
                    </CustomLink>
                  </div>
                )}


                {/* Title - lepsze skalowanie na małych ekranach */}
                <h1 className="mb-4 font-black leading-tight text-white
                              text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                              max-w-4xl">
                  {title}
                </h1>
              </div>
            </div>
          </div>
        )}

        {/* Fallback Hero (bez obrazka) - również poprawiony */}
        {!coverImage && (
          <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 
                          py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative mx-auto max-w-5xl px-3 xs:px-4 sm:px-4 lg:px-6 text-center">
              {showBackLinks && (
                <div className="mb-4 xs:mb-6 sm:mb-8">
                  <CustomLink
                    href={backPath}
                    className="group inline-flex items-center space-x-1.5 xs:space-x-2 
                              rounded-full border border-white/20 bg-black/50 backdrop-blur-sm
                              px-2.5 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2
                              text-white transition-all duration-300 hover:bg-black/70"
                  >
                    <svg
                      className="size-3.5 xs:size-4 sm:size-5 
                                transition-transform duration-300 group-hover:-translate-x-1"
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
                    <span className="text-xs xs:text-sm sm:text-base font-medium">{t("back")}</span>
                  </CustomLink>
                </div>
              )}

              <div className="mb-3 xs:mb-4 sm:mb-6">
                <div className="inline-flex items-center space-x-1.5 xs:space-x-2 
                              rounded-full border border-white/20 bg-black/50 backdrop-blur-sm
                              px-2.5 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2 text-white">
                  <svg
                    className="size-3 xs:size-3.5 sm:size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <time dateTime={publishedAt} className="text-xs xs:text-xs sm:text-sm font-medium">
                    {getFormattedDate(publishedAt, lang)}
                  </time>
                </div>
              </div>

              <h1 className="font-black leading-tight text-white
                            text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                            max-w-4xl mx-auto">
                {title}
              </h1>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <article className="mx-auto max-w-5xl px-3 xs:px-4 sm:px-4 lg:px-6">
        {/* Author Card - lepsze dopasowanie na małych ekranach */}
        <div className="relative -mt-6 xs:-mt-8 sm:-mt-12 
                        mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <div className="rounded-lg xs:rounded-xl sm:rounded-2xl 
                          border border-gray-100 bg-white shadow-xl
                          p-3 xs:p-4 sm:p-6 
                          dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center space-x-2.5 xs:space-x-3 sm:space-x-4">
              <div className="relative flex-shrink-0">
                <Image
                  src={author?.picture || "/images/avatars/default.png"}
                  width={44}
                  height={44}
                  alt="avatar"
                  className="size-10 xs:size-11 sm:size-12 md:size-14 lg:size-16
                            rounded-full ring-2 sm:ring-4 ring-white dark:ring-gray-800"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
                <div className="absolute -bottom-0.5 -right-0.5 xs:-bottom-1 xs:-right-1
                              size-3 xs:size-4 sm:size-5 
                              rounded-full border-2 border-white bg-green-400 dark:border-gray-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {author?.name}
                  </h3>
                  <span className="inline-flex w-fit items-center rounded-full bg-blue-100 
                                  px-1.5 xs:px-2 py-0.5 xs:py-1 
                                  text-xs font-medium text-blue-800 
                                  dark:bg-blue-900/30 dark:text-blue-200">
                    {t("author")}
                  </span>
                </div>
                <p className="mt-0.5 xs:mt-1 text-xs xs:text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {t("publishedOn")} {getFormattedDate(publishedAt, lang)}
                </p>

              </div>
            </div>
          </div>
        </div>

        {/* Main Content with Share - poprawione paddingu */}
        <div className="mb-6 sm:mb-8 rounded-lg xs:rounded-xl sm:rounded-2xl 
                        border border-gray-100 bg-white shadow-lg 
                        dark:border-gray-700 dark:bg-gray-800">
          {/* Share Section */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 
                          p-3 xs:p-4 sm:p-6 
                          dark:border-gray-700 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex flex-col items-start justify-between space-y-3 
                            sm:flex-row sm:items-center sm:space-y-0">
              <div className="flex-1">
                <p className="text-xs xs:text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {t("shareMessage")}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={shareOnTwitter}
                  className="flex items-center justify-center rounded-lg
                            bg-blue-500 hover:bg-blue-600
                            w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12
                            text-white transition-colors duration-200
                            shadow-md hover:shadow-lg"
                  title="Share on Twitter/X"
                  aria-label="Share on Twitter"
                >
                  <svg className="size-5 xs:size-5 sm:size-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="flex items-center justify-center rounded-lg
                            bg-blue-700 hover:bg-blue-800
                            w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12
                            text-white transition-colors duration-200
                            shadow-md hover:shadow-lg"
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="size-5 xs:size-5 sm:size-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-3 xs:p-4 sm:p-6 lg:p-8">
            <div className="prose prose-sm dark:prose-invert 
                            xs:prose-sm sm:prose-base lg:prose-lg 
                            max-w-none">
              <MDXComponent content={content} />
            </div>
          </div>
        </div>

        {/* Back to Blog */}
        {showBackLinks && (
          <div className="mb-8 xs:mb-10 sm:mb-12 md:mb-16 text-center">
            <CustomLink
              href={backPath}
              className="inline-flex items-center space-x-1.5 xs:space-x-2 
                        rounded-lg xs:rounded-xl sm:rounded-xl 
                        bg-gradient-to-r from-blue-500 to-purple-600 
                        hover:from-blue-600 hover:to-purple-700
                        px-4 xs:px-6 sm:px-8 
                        py-2.5 xs:py-3 sm:py-4
                        text-xs xs:text-sm sm:text-base font-medium text-white 
                        shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg
                className="size-3.5 xs:size-4 sm:size-5"
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
      <div className="h-8 xs:h-10 sm:h-12 md:h-16"></div>
    </>
  )
}