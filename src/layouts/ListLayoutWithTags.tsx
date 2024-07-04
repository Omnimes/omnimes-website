'use client'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { CustomLink } from '@/components/Link'
import Tag from '@/components/Tag'
import { useLocale, useTranslations } from 'next-intl';
import getFormattedDate from '@/lib/getFormattedDate'
import { ExtendedOstDocument } from '@/app/[locale]/(marketing)/blog/page'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: ExtendedOstDocument[]
  tags: { value: string, label: string, count: number }[]
  tag: string
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const t = useTranslations('Pagination');
  const pathname = usePathname();
  const basePath = pathname?.split('/')[2];
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            aria-label={t('prev')}
            aria-labelledby={t('prev')}
            title={t('prev')}
            role="button"
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}>
            {t('prev')}
          </button>
        )}
        {prevPage && (
          <CustomLink
            aria-label={t('prev')}
            aria-labelledby={t('prev')}
            title={t('prev')}
            role="button"
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
          <button
            aria-label={t('next')}
            aria-labelledby={t('next')}
            title={t('next')}
            role="button"
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            {t('next')}
          </button>
        )}
        {nextPage && (
          <CustomLink aria-label={t('next')}
            aria-labelledby={t('next')}
            title={t('next')}
            role="button" 
            href={`/${basePath}/page/${currentPage + 1}`} 
            rel="next"
          >
            {t('next')}
          </CustomLink>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  tags,
  tag,
  pagination,
}: ListLayoutProps) {
  const t = useTranslations('Tag');
  const pathname = usePathname();
  const lang = useLocale();
  const sortedTags = tags.sort((a, b) => b.count - a.count);

  return (
    <>
      <div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {pathname?.startsWith('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">{t("allPost")}</h3>
              ) : (
                <CustomLink
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  {t("allPost")}
                </CustomLink>
              )}
              <ul>
                {sortedTags.map((tag) => {
                  return (
                    <li key={tag.value} className="my-3">
                      {pathname && decodeURI(pathname.split('/tags/')[1]) === slug(tag.label) ? (
                        <h3 className="inline py-2 text-sm font-bold uppercase text-primary-500">
                          {`${tag.label} (${tag.count})`}
                        </h3>
                      ) : (
                        <CustomLink
                          href={`/tags/${slug(tag.label)}`}
                          className="py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={t("link", { tag: tag.label })}
                        >
                          {`${tag.label} (${tag.count})`}
                        </CustomLink>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {!posts.length && t("displayPostsNotFound", { tag: decodeURIComponent(tag) })}
              {posts.map((post) => {
                const { title, description, tags, publishedAt, slug } = post
                return (
                  <li key={slug} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">{t("publishedOn")}</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={publishedAt}>{getFormattedDate(publishedAt, lang)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <CustomLink href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </CustomLink>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag: { value: string, label: string }) => {
                              return <Tag key={tag.value} text={tag.label} />
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
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}