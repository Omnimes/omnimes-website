'use client'
import Tag from '@/components/Tag'
import { CustomLink } from '@/components/Link'
import getFormattedDate from '@/lib/getFormattedDate'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
// import { ExtendedOstDocument } from '@/app/[locale]/blog/page'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  // posts: ExtendedOstDocument[]
  posts: any[]
  title: string
  // initialDisplayPosts?: ExtendedOstDocument[]
  initialDisplayPosts?: any[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const t = useTranslations('Pagination')
  const pathname = usePathname()
  const basePath = pathname?.split('/')[2]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {t('prev')}
          </button>
        )}
        {prevPage && (
          <CustomLink
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            {t('prev')}
          </CustomLink>
        )}
        <span>
          {currentPage} {t('of')} {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {t('next')}
          </button>
        )}
        {nextPage && (
          <CustomLink href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            {t('next')}
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
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.subtitle + post.keywords
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  const t = useTranslations('ListLayout')
  const lang = useLocale()
  const pathname = usePathname()
  const basePath = pathname?.split('/')[2]
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <main>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">{t('search')}</span>
              <input
                aria-label={t('search')}
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={t('search')}
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
            </label>
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && (
            <p className="mt-10 text-center">
              {t('NotFound')}
            </p>
          )}
          {displayPosts.map((post) => {
            const { title, description, tags, publishedAt, slug } = post
            return (
              <li key={slug} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">{t('publishedOn')}</dt>
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
                        {tags?.split(',').map((tag: string) => {
                          const data = tag.replace(' ', '')
                          return <Tag key={data} text={data} />
                        })}
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
