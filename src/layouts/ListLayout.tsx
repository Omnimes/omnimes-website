"use client"

import { Input } from "@nextui-org/react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LuCalendar, LuSearch } from "react-icons/lu"

import { ExtendedOstDocument } from "@/app/[locale]/(marketing)/blog/page"
import { CustomLink } from "@/components/Link"
import Tag from "@/components/Tag"
import getFormattedDate from "@/lib/getFormattedDate"

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: ExtendedOstDocument[]
  title: string
  initialDisplayPosts?: ExtendedOstDocument[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const t = useTranslations("Pagination")
  const pathname = usePathname()
  const basePath = pathname?.split("/")[2]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="flex justify-center items-center space-x-4 py-12">
      <nav className="flex items-center space-x-6">
        {prevPage ? (
          <CustomLink
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 dark:text-gray-200 hover:scale-105"
          >
            ← {t("prev")}
          </CustomLink>
        ) : (
          <div className="px-6 py-3 rounded-xl text-gray-400 cursor-not-allowed">
            ← {t("prev")}
          </div>
        )}
        
        <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium">
          <span>{currentPage}</span>
          <span className="text-blue-100">{t("of")}</span>
          <span>{totalPages}</span>
        </div>

        {nextPage ? (
          <CustomLink
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 dark:text-gray-200 hover:scale-105"
          >
            {t("next")} →
          </CustomLink>
        ) : (
          <div className="px-6 py-3 rounded-xl text-gray-400 cursor-not-allowed">
            {t("next")} →
          </div>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState("")
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.subtitle + post.keywords
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  const t = useTranslations("ListLayout")
  const lang = useLocale()
  const pathname = usePathname()
  const basePath = pathname?.split("/")[2]
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 mb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight mb-6">
            {title}
          </h1>
          
          {/* Modern Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative">
                <Input
                  aria-label={t("search")}
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={t("search")}
                  startContent={<LuSearch className="text-gray-400" />}
                  className="w-full"
                  classNames={{
                    input: "text-lg pl-4",
                    innerWrapper: "bg-white dark:bg-gray-800",
                    inputWrapper: "h-14 bg-white dark:bg-gray-800 shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-300"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {!filteredBlogPosts.length ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
            <LuSearch className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-xl text-gray-500 dark:text-gray-400">{t("NotFound")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {displayPosts.map((post, index) => {
            const { title, description, tags, publishedAt, slug, coverImage } = post
            
            return (
              <article 
                key={slug} 
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Cover Image */}
                <div className="relative overflow-hidden h-56 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
                  {coverImage ? (
                    <CustomLink href={`/${basePath}/${slug}`} className="block h-full">
                      <div className="relative h-full">
                        <img
                          src={coverImage}
                          alt={`Okładka: ${title}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </CustomLink>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-600 dark:to-gray-500 rounded-2xl flex items-center justify-center">
                        <LuSearch className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                  )}
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                      <div className="flex items-center space-x-2 text-sm">
                        <LuCalendar className="w-4 h-4 text-blue-500" />
                        <time dateTime={publishedAt} className="font-medium text-gray-700 dark:text-gray-200">
                          {getFormattedDate(publishedAt, lang)}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Tags */}
                  {tags && Array.isArray(tags) && (
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 3).map((tag: any, tagIndex: number) => {
                        const tagValue = tag?.value || tag?.label || tag || tagIndex
                        const tagLabel = tag?.label || tag?.value || tag || ""
                        const uniqueKey = `${slug}-tag-${tagValue}-${tagIndex}` // Unikatowy klucz
                        
                        return tagLabel ? (
                          <div key={uniqueKey} className="transform hover:scale-105 transition-transform duration-200">
                            <Tag text={tagLabel} />
                          </div>
                        ) : null
                      })}
                      {tags.length > 3 && (
                        <span 
                          key={`${slug}-more-tags`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                        >
                          +{tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    <CustomLink
                      href={`/${basePath}/${slug}`}
                      className="hover:underline decoration-2 underline-offset-4"
                    >
                      {title}
                    </CustomLink>
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                    {description}
                  </p>

                  {/* Read More Link */}
                  <div className="pt-2">
                    <CustomLink
                      href={`/${basePath}/${slug}`}
                      className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300 group/link"
                    >
                      <span>Czytaj więcej</span>
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </CustomLink>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </main>
  )
}