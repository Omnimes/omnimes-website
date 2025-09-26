"use client"

import { Input } from "@nextui-org/react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LuSearch } from "react-icons/lu"

import { ExtendedOstDocument } from "@/app/[locale]/(marketing)/blog/page"
import { CustomLink } from "@/components/Link"

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
    <div className="flex items-center justify-center space-x-2 py-6 sm:space-x-4 sm:py-8">
      <nav className="flex items-center space-x-2 sm:space-x-6">
        {prevPage ? (
          <CustomLink
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:rounded-xl sm:px-6 sm:py-3 sm:text-base dark:bg-gray-800 dark:text-gray-200"
          >
            ← {t("prev")}
          </CustomLink>
        ) : (
          <div className="cursor-not-allowed rounded-lg px-3 py-2 text-sm text-gray-400 sm:rounded-xl sm:px-6 sm:py-3 sm:text-base">
            ← {t("prev")}
          </div>
        )}

        <div className="flex items-center space-x-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-1 text-xs font-medium text-white sm:space-x-2 sm:px-4 sm:py-2 sm:text-sm">
          <span>{currentPage}</span>
          <span className="text-blue-100">{t("of")}</span>
          <span>{totalPages}</span>
        </div>

        {nextPage ? (
          <CustomLink
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:rounded-xl sm:px-6 sm:py-3 sm:text-base dark:bg-gray-800 dark:text-gray-200"
          >
            {t("next")} →
          </CustomLink>
        ) : (
          <div className="cursor-not-allowed rounded-lg px-3 py-2 text-sm text-gray-400 sm:rounded-xl sm:px-6 sm:py-3 sm:text-base">
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
  const t = useTranslations("Implementation")
  const lang = useLocale()
  const pathname = usePathname()
  const basePath = pathname?.split("/")[2]
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="mb-6 mt-5 sm:mb-8">
        <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
          {title}
        </h1>
      </div>

      {/* Search Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="mx-auto mt-3 max-w-2xl">
          <Input
            aria-label={t("search")}
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t("search")}
            startContent={<LuSearch className="text-gray-400" />}
            className="w-full"
            classNames={{
              input: "text-base sm:text-lg pl-3 sm:pl-4",
              innerWrapper: "bg-white dark:bg-gray-800",
              inputWrapper:
                "h-11 sm:h-12 bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-lg focus-within:shadow-lg transition-all duration-300",
            }}
          />
        </div>
      </div>

      {/* Posts List - Horizontal Layout */}
      {!filteredBlogPosts.length ? (
        <div className="py-12 text-center sm:py-16">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 sm:mb-6 sm:size-20 dark:from-gray-700 dark:to-gray-800">
            <LuSearch className="size-6 text-gray-400 sm:size-8" />
          </div>
          <p className="text-lg text-gray-500 sm:text-xl dark:text-gray-400">{t("NotFound")}</p>
        </div>
      ) : (
        <div className="mb-8 space-y-6 sm:mb-12 sm:space-y-8">
          {displayPosts.map((post, index) => {
            const { title, description, publishedAt, slug, coverImage } = post

            return (
              <article
                key={slug}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl sm:rounded-3xl dark:border-gray-700 dark:bg-gray-800"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="relative h-48 w-full md:h-auto md:w-80 lg:w-96">
                    <div className="relative h-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
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
                          <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-200 to-purple-200 sm:size-16 sm:rounded-2xl lg:size-20 dark:from-gray-600 dark:to-gray-500">
                            <LuSearch className="size-6 text-gray-400 sm:size-7 lg:size-8" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-1 flex-col justify-center space-y-3 p-6 sm:space-y-4 sm:p-8 lg:p-10">
                    {/* Title */}
                    <h2 className="text-xl font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-600 sm:text-2xl lg:text-3xl dark:text-white dark:group-hover:text-blue-400">
                      <CustomLink
                        href={`/${basePath}/${slug}`}
                        className="decoration-2 underline-offset-4 hover:underline"
                      >
                        {title}
                      </CustomLink>
                    </h2>

                    {/* Description */}
                    <p className="line-clamp-3 text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl dark:text-gray-300">
                      {description}
                    </p>

                    {/* Read More Link */}
                    <div className="pt-2">
                      <CustomLink
                        href={`/${basePath}/${slug}`}
                        className="group/link inline-flex items-center space-x-2 text-base font-medium text-blue-600 transition-colors duration-300 hover:text-blue-700 sm:text-lg dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <span>Czytaj więcej</span>
                        <svg
                          className="size-4 transition-transform duration-300 group-hover/link:translate-x-1 sm:size-5"
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
