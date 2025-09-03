"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Input } from "@nextui-org/react"
import { useLocale, useTranslations } from "next-intl"
import { LuSearch } from "react-icons/lu"

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
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            aria-label={t("prev")}
            aria-labelledby={t("prev")}
            title={t("prev")}
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            {t("prev")}
          </button>
        )}
        {prevPage && (
          <CustomLink
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            aria-label={t("prev")}
            aria-labelledby={t("prev")}
            title={t("prev")}
            role="button"
          >
            {t("prev")}
          </CustomLink>
        )}
        <span>
          {currentPage} {t("of")} {totalPages}
        </span>
        {!nextPage && (
          <button
            aria-label={t("next")}
            aria-labelledby={t("next")}
            title={t("next")}
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            {t("next")}
          </button>
        )}
        {nextPage && (
          <CustomLink
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            aria-label={t("next")}
            aria-labelledby={t("next")}
            title={t("next")}
            role="button"
          >
            {t("next")}
          </CustomLink>
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
    <main>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl dark:text-gray-100">
            {title}
          </h1>
          {/* <span className="sr-only">{t('search')}</span> */}
          <Input
            aria-label={t("search")}
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t("search")}
            startContent={<LuSearch />}
            className="focus:border-primary-500 focus:ring-primary-500 block w-full"
          />
        </div>
        <ul>
          {!filteredBlogPosts.length && <p className="mt-10 text-center">{t("NotFound")}</p>}
          {displayPosts.map((post) => {
            const { title, description, tags, publishedAt, slug } = post
            return (
              <li key={slug} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">{t("publishedOn")}</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={publishedAt}>{getFormattedDate(publishedAt, lang)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <CustomLink
                          href={`/${basePath}/${slug}`}
                          rel="noopener noreferrer"
                          target="_self"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {title}
                        </CustomLink>
                      </h3>
                      <div className="flex flex-wrap">
                        {tags && Array.isArray(tags)
                          ? tags.map((tag: any, index: number) => {
                              // Sprawdź różne formaty tagów
                              const tagValue = tag?.value || tag?.label || tag || index
                              const tagLabel = tag?.label || tag?.value || tag || ""

                              return tagLabel ? <Tag key={tagValue} text={tagLabel} /> : null
                            })
                          : null}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {description}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </main>
  )
}
