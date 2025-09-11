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
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  return (
    <>
      <ScrollTopAndComment />
      
      {/* Hero Section with Cover Image */}
      <div className="relative">
        {/* Cover Image */}
        {coverImage && (
          <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Hero Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {/* Back Link */}
                {showBackLinks && (
                  <div className="mb-6">
                    <CustomLink
                      href={backPath}
                      className="inline-flex items-center space-x-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-all duration-300 group border border-white/20"
                    >
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="font-medium">{t("back")}</span>
                    </CustomLink>
                  </div>
                )}
                
                {/* Date Badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 text-white border border-white/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time dateTime={publishedAt} className="text-sm font-medium">
                      {getFormattedDate(publishedAt, lang)}
                    </time>
                  </div>
                </div>
                
                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-4">
                  {title}
                </h1>
                
                {/* Description */}
                {description && (
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Fallback Hero (bez obrazka) */}
        {!coverImage && (
          <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-24">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {showBackLinks && (
                <div className="mb-8">
                  <CustomLink
                    href={backPath}
                    className="inline-flex items-center space-x-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-all duration-300 group border border-white/20"
                  >
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-medium">{t("back")}</span>
                  </CustomLink>
                </div>
              )}
              
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 text-white border border-white/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={publishedAt} className="text-sm font-medium">
                    {getFormattedDate(publishedAt, lang)}
                  </time>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
                {title}
              </h1>
              
              {description && (
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Author Card */}
        <div className="relative -mt-12 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={author?.picture || "/images/avatars/default.png"}
                  width={60}
                  height={60}
                  alt="avatar"
                  className="w-15 h-15 rounded-full ring-4 ring-white dark:ring-gray-800"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {author?.name}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                    Autor
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Opublikowano {getFormattedDate(publishedAt, lang)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tags and Share Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Tags */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {t("tags")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(tags) &&
                tags.map((tag: { value: string; label: string }, index: number) => {
                  return (
                    <div key={tag?.value || index} className="transform hover:scale-105 transition-transform duration-200">
                      <Tag text={tag?.label || ""} />
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Share Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Udostępnij
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Podobał Ci się ten artykuł? Podziel się nim!
            </p>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={shareOnTwitter}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
              >
                Udostępnij na Twitter
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
              >
                Udostępnij na LinkedIn
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXComponent content={content} />
          </div>
        </div>

        {/* Back to Blog */}
        {showBackLinks && (
          <div className="text-center mb-16">
            <CustomLink
              href={backPath}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Powrót do bloga</span>
            </CustomLink>
          </div>
        )}
      </article>

      {/* Bottom Spacing */}
      <div className="h-16"></div>
    </>
  )
}