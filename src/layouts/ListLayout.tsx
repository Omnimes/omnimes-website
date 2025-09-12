"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Input } from "@nextui-org/react"
import { useLocale, useTranslations } from "next-intl"
import { LuCalendar, LuSearch } from "react-icons/lu"

import getFormattedDate from "@/lib/getFormattedDate"
import { CustomLink } from "@/components/Link"
import Tag from "@/components/Tag"
import { ExtendedOstDocument } from "@/app/[locale]/(marketing)/blog/page"

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
    <div className="flex items-center justify-center space-x-4 py-12">
      <nav className="flex items-center space-x-6">
        {prevPage ? (
          <CustomLink
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="rounded-xl bg-white px-6 py-3 text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-gray-800 dark:text-gray-200"
          >
            ← {t("prev")}
          </CustomLink>
        ) : (
          <div className="cursor-not-allowed rounded-xl px-6 py-3 text-gray-400">← {t("prev")}</div>
        )}

        <div className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white">
          <span>{currentPage}</span>
          <span className="text-blue-100">{t("of")}</span>
          <span>{totalPages}</span>
        </div>

        {nextPage ? (
          <CustomLink
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="rounded-xl bg-white px-6 py-3 text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-gray-800 dark:text-gray-200"
          >
            {t("next")} →
          </CustomLink>
        ) : (
          <div className="cursor-not-allowed rounded-xl px-6 py-3 text-gray-400">{t("next")} →</div>
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
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="-mx-4 mb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 text-center sm:-mx-6 lg:-mx-8 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-4xl px-4">
          {/* <h1 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-5xl font-black leading-tight text-transparent md:text-6xl lg:text-7xl dark:from-white dark:via-blue-200 dark:to-purple-200">
            {title}
          </h1> */}

          {/* Modern Search */}
          <div className="mx-auto max-w-2xl">
            <div className="group relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-25 blur transition duration-1000 group-hover:opacity-40"></div>
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
                    inputWrapper:
                      "h-14 bg-white dark:bg-gray-800 shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-300",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {!filteredBlogPosts.length ? (
        <div className="py-20 text-center">
          <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
            <LuSearch className="size-10 text-gray-400" />
          </div>
          <p className="text-xl text-gray-500 dark:text-gray-400">{t("NotFound")}</p>
        </div>
      ) : (
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {displayPosts.map((post, index) => {
            const { title, description, tags, publishedAt, slug, coverImage } = post

            return (
              <article
                key={slug}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Cover Image */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
                  {coverImage ? (
                    <CustomLink href={`/${basePath}/${slug}`} className="block h-full">
                      <div className="relative h-full">
                        <img
                          src={coverImage}
                          alt={`Okładka: ${title}`}
                          className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                      </div>
                    </CustomLink>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-600 dark:to-gray-500">
                        <LuSearch className="size-8 text-gray-400" />
                      </div>
                    </div>
                  )}

                  {/* Date Badge */}
                  <div className="absolute left-4 top-4">
                    <div className="rounded-xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm dark:bg-gray-800/90">
                      <div className="flex items-center space-x-2 text-sm">
                        <LuCalendar className="size-4 text-blue-500" />
                        <time
                          dateTime={publishedAt}
                          className="font-medium text-gray-700 dark:text-gray-200"
                        >
                          {getFormattedDate(publishedAt, lang)}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 p-6">
                  {/* Tags */}
                  {tags && Array.isArray(tags) && (
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 3).map((tag: any, tagIndex: number) => {
                        const tagValue = tag?.value || tag?.label || tag || tagIndex
                        const tagLabel = tag?.label || tag?.value || tag || ""
                        const uniqueKey = `${slug}-tag-${tagValue}-${tagIndex}` // Unikatowy klucz

                        return tagLabel ? (
                          <div
                            key={uniqueKey}
                            className="transition-transform duration-200 hover:scale-105"
                          >
                            <Tag text={tagLabel} />
                          </div>
                        ) : null
                      })}
                      {tags.length > 3 && (
                        <span
                          key={`${slug}-more-tags`}
                          className="inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                          +{tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    <CustomLink
                      href={`/${basePath}/${slug}`}
                      className="decoration-2 underline-offset-4 hover:underline"
                    >
                      {title}
                    </CustomLink>
                  </h2>

                  {/* Description */}
                  <p className="line-clamp-3 leading-relaxed text-gray-600 dark:text-gray-300">
                    {description}
                  </p>

                  {/* Read More Link */}
                  <div className="pt-2">
                    <CustomLink
                      href={`/${basePath}/${slug}`}
                      className="group/link inline-flex items-center space-x-2 font-medium text-blue-600 transition-colors duration-300 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <span>Czytaj więcej</span>
                      <svg
                        className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
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
