'use client'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { CustomLink } from '@/components/Link'
import Tag from '@/components/Tag'
import { useLocale, useTranslations } from 'next-intl';
import getFormattedDate from '@/lib/getFormattedDate'
// import { ExtendedOstDocument } from '@/app/[locale]/blog/page'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  // posts: ExtendedOstDocument[]
  posts: any[]
  title: string
  tags: Record<string, number>
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

export default function ListLayoutWithTags({
  posts,
  title,
  tags,
  tag,
  pagination,
}: ListLayoutProps) {
  const t = useTranslations('Tag');
  const pathname = usePathname()
  const lang = useLocale();
  const tagKeys = Object.keys(tags)
  const sortedTags = tagKeys.sort((a, b) => tags[b] - tags[a])

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
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
                {sortedTags.map((ta) => {
                  return (
                    <li key={ta} className="my-3">
                      {pathname && decodeURI(pathname.split('/tags/')[1]) === slug(ta) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                          {`${ta} (${tags[ta]})`}
                        </h3>
                      ) : (
                        <CustomLink
                          href={`/tags/${slug(ta)}`}
                          className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={t("link", { tag: tag })}
                        >
                          {`${ta} (${tags[ta]})`}
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
              {!posts.length && t("displayPostsNotFound", { tag: decodeURI(tag) })}
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
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
