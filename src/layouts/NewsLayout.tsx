"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { OstDocument } from "outstatic"

import getFormattedDate from "@/lib/getFormattedDate"
import { CustomLink } from "@/components/Link"
import MDXComponent from "@/components/mdx/MdxComponent"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
import Tag from "@/components/Tag"

interface LayoutProps {
  post: OstDocument
  backPath?: string
  showBackLinks?: boolean
}

export default function NewsLayout({
  post,
  backPath = "/news",
  showBackLinks = true,
}: LayoutProps) {
  const t = useTranslations("PostLayout")
  const { title, publishedAt, content, tags, author, coverImage, description } = post
  const lang = useLocale()

  // Dodaje parametr xcache=2 do aktualnego URL
  const getShareUrl = () => {
    const url = new URL(window.location.href)
    url.searchParams.set("xcache", "2") // możesz zmienić np. na "share" albo "v"
    return encodeURIComponent(url.toString())
  }

  const handleTwitterShare = () => {
    const url = getShareUrl()
    const text = encodeURIComponent(`${title} - sprawdź ten artykuł!`)
    const shareUrl = `https://x.com/intent/tweet?text=${text}&url=${url}`
    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }

  const handleLinkedInShare = () => {
    const url = getShareUrl()
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }

  const handleFacebookShare = () => {
    const url = getShareUrl()
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="w-full">
      <ScrollTopAndComment />

      {/* Hero Section with Cover Image */}
      <div className="relative">
        {/* Cover Image */}
        {coverImage && (
          <div
            className="xs:h-[320px] relative h-[280px]
                          max-h-[80vh] min-h-[280px] w-full overflow-hidden sm:h-[400px] md:h-[480px] lg:h-[520px]
                          xl:h-[580px] 2xl:h-[640px]"
          >
            <Image
              src={coverImage}
              alt={title}
              fill
              className="size-full object-cover object-center transition-transform duration-300 hover:scale-105"
              priority
              sizes="(max-width: 390px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            {/* Gradient Overlay - dostosowany do małych ekranów */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 
                            sm:from-black/80 sm:via-black/40 sm:to-transparent"
            />

            {/* Back Link - na górze obrazka */}
            {showBackLinks && (
              <div className="xs:top-6 xs:left-6 absolute left-4 top-4 z-10 sm:left-8 sm:top-8">
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

            {/* Hero Content */}
            <div className="absolute inset-0 flex items-end">
              <div
                className="xs:px-4 xs:pb-10 mx-auto w-full max-w-5xl px-3 pb-8 sm:px-4 
                              sm:pb-12 md:pb-16 lg:px-6"
              >
                {/* Title - lepsze skalowanie na małych ekranach */}
                <h1
                  className="xs:text-2xl mb-4 max-w-4xl text-xl
                              font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl
                              xl:text-6xl"
                >
                  {title}
                </h1>
              </div>
            </div>
          </div>
        )}

        {/* Fallback Hero (bez obrazka) - również poprawiony */}
        {!coverImage && (
          <div
            className="xs:py-14 relative bg-gradient-to-br from-green-900 via-blue-900 
                          to-teal-900 py-12 sm:py-16 md:py-20 lg:py-24"
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="xs:px-4 relative mx-auto max-w-5xl px-3 text-center sm:px-4 lg:px-6">
              {showBackLinks && (
                <div className="xs:top-6 xs:left-6 absolute left-4 top-4 z-10 sm:left-8 sm:top-8">
                  <CustomLink
                    href={backPath}
                    className="xs:space-x-2 xs:rounded-xl xs:px-4 xs:py-2.5 xs:text-sm 
                              group inline-flex items-center space-x-1.5 rounded-lg 
                              bg-gradient-to-r from-green-500
                              to-blue-600 px-3 py-2 text-xs font-medium text-white
                              shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 
                              hover:from-green-600 hover:to-blue-700 sm:px-6 sm:py-3 sm:text-base"
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
                    <span>{t("backToNews")}</span>
                  </CustomLink>
                </div>
              )}

              <div className="xs:mb-4 xs:pt-20 mb-3 pt-16 sm:mb-6 sm:pt-24">
                {/* News Badge */}
                <div
                  className="xs:space-x-2 xs:px-3 xs:py-2 mb-6 inline-flex 
                              items-center space-x-1.5 rounded-full border border-white/30
                              bg-red-600/90 px-2.5 py-1.5 text-white backdrop-blur-sm sm:px-4 sm:py-2"
                >
                  <svg
                    className="xs:size-3.5 size-3 sm:size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <span className="xs:text-xs text-xs font-bold uppercase tracking-wider sm:text-sm">
                    Wiadomości
                  </span>
                </div>

                <div
                  className="xs:space-x-2 xs:px-3 xs:py-2 inline-flex 
                              items-center space-x-1.5 rounded-full border border-white/20
                              bg-black/50 px-2.5 py-1.5 text-white backdrop-blur-sm sm:px-4 sm:py-2"
                >
                  <svg
                    className="xs:size-3.5 size-3 sm:size-4"
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
                  <time
                    dateTime={publishedAt}
                    className="xs:text-xs text-xs font-medium sm:text-sm"
                  >
                    {getFormattedDate(publishedAt, lang)}
                  </time>
                </div>
              </div>

              <h1
                className="xs:text-2xl mx-auto max-w-4xl
                            text-xl font-black leading-tight text-white sm:text-3xl md:text-4xl
                            lg:text-5xl xl:text-6xl"
              >
                {title}
              </h1>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <article className="xs:px-4 mx-auto max-w-5xl px-3 sm:px-4 lg:px-6">
        {/* Author Card - lepsze dopasowanie na małych ekranach */}
        <div
          className="xs:-mt-8 xs:mb-10 relative -mt-6 
                        mb-8 sm:-mt-12 sm:mb-12 md:mb-16"
        >
          <div
            className="xs:rounded-xl xs:p-4 rounded-lg 
                          border border-gray-100 bg-white p-3
                          shadow-xl sm:rounded-2xl sm:p-6 
                          dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="xs:space-x-3 flex items-center space-x-2.5 sm:space-x-4">
              <div className="relative shrink-0">
                <Image
                  src={author?.picture || "/images/avatars/default.png"}
                  width={44}
                  height={44}
                  alt="avatar"
                  className="xs:size-11 size-10 rounded-full ring-2 ring-white
                            sm:size-12 sm:ring-4 md:size-14 lg:size-16 dark:ring-gray-800"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <div
                  className="xs:-bottom-1 xs:-right-1 xs:size-4 absolute -bottom-0.5
                              -right-0.5 size-3 rounded-full 
                              border-2 border-white bg-green-400 sm:size-5 dark:border-gray-800"
                ></div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                  <h3 className="xs:text-base truncate text-sm font-semibold text-gray-900 sm:text-lg dark:text-white">
                    {author?.name}
                  </h3>
                  <span
                    className="xs:px-2 xs:py-1 inline-flex w-fit items-center 
                                  rounded-full bg-blue-100 px-1.5 py-0.5 
                                  text-xs font-medium text-blue-800 
                                  dark:bg-blue-900/30 dark:text-blue-200"
                  >
                    {t("author")}
                  </span>
                </div>
                <p className="xs:mt-1 xs:text-xs mt-0.5 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                  {t("publishedOn")} {getFormattedDate(publishedAt, lang)}
                </p>

                {/* Tags - ukryte na małych urządzeniach */}
                {Array.isArray(tags) && tags.length > 0 && (
                  <div className="xs:mt-3 xs:gap-2 mt-2 hidden flex-wrap gap-1.5 sm:flex">
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

        {/* Main Content with Share - poprawione paddingu */}
        <div
          className="xs:rounded-xl mb-6 rounded-lg border border-gray-100 
                        bg-white shadow-lg sm:mb-8 sm:rounded-2xl 
                        dark:border-gray-700 dark:bg-gray-800"
        >
          {/* Share Section */}
          <div
            className="xs:p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 
                          to-blue-50 p-3 sm:p-6 
                          dark:border-gray-700 dark:from-green-900/20 dark:to-blue-900/20"
          >
            <div
              className="flex flex-col items-start justify-between space-y-3 
                            sm:flex-row sm:items-center sm:space-y-0"
            >
              <div className="flex-1">
                <p className="xs:text-sm text-xs text-gray-600 sm:text-base dark:text-gray-400">
                  {t("shareMessage") || "Podziel się tą wiadomością"}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleTwitterShare}
                  className="xs:size-11 flex size-10 items-center
                            justify-center rounded-lg
                            bg-black text-white shadow-md transition-colors duration-200 hover:bg-gray-800
                            hover:shadow-lg sm:size-12"
                  title="Udostępnij na Twitter/X"
                  aria-label="Udostępnij na Twitter"
                >
                  <svg
                    className="xs:size-5 size-5 sm:size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleLinkedInShare}
                  className="xs:size-11 flex size-10 items-center
                            justify-center rounded-lg
                            bg-blue-700 text-white shadow-md transition-colors duration-200 hover:bg-blue-800
                            hover:shadow-lg sm:size-12"
                  title="Udostępnij na LinkedIn"
                  aria-label="Udostępnij na LinkedIn"
                >
                  <svg
                    className="xs:size-5 size-5 sm:size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleFacebookShare}
                  className="xs:size-11 flex size-10 items-center
                            justify-center rounded-lg
                            bg-blue-600 text-white shadow-md transition-colors duration-200 hover:bg-blue-700
                            hover:shadow-lg sm:size-12"
                  title="Udostępnij na Facebook"
                  aria-label="Udostępnij na Facebook"
                >
                  <svg
                    className="xs:size-5 size-5 sm:size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="xs:p-4 p-3 sm:p-6 lg:p-8">
            <div
              className="prose prose-sm dark:prose-invert 
                            xs:prose-sm sm:prose-base lg:prose-lg 
                            max-w-none"
            >
              <MDXComponent content={content} />
            </div>
          </div>
        </div>

        {/* Back to News */}
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
              <span>{t("backToNews")}</span>
            </CustomLink>
          </div>
        )}
      </article>

      {/* Bottom Spacing */}
      <div className="xs:h-10 h-8 sm:h-12 md:h-16"></div>
    </div>
  )
}
