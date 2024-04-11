import Tag from '@/components/Tag'
import { CustomLink } from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Image from "next/image"
import { useLocale, useTranslations } from 'next-intl'
import getFormattedDate from '@/lib/getFormattedDate'
import MDXComponent from '@/components/mdx/MdxComponent'
import Default from "../../public/images/default.png"
import { ExtendedOstDocument } from '@/app/[locale]/(marketing)/blog/page'
interface LayoutProps {
  post: ExtendedOstDocument;
}

export default function PostLayout({ post }: LayoutProps) {
  const t = useTranslations('PostLayout');
  const { title, publishedAt, content, tags, author } = post;
  const lang = useLocale();
  return (
    <>
      <article>
        <ScrollTopAndComment />
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">{t('publishedOn')}</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={publishedAt}>{getFormattedDate(publishedAt, lang)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">{t('authors')}</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                     <li className="flex items-center space-x-2" key={author?.name}>
                        <Image
                          src={author?.picture || Default.src}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">{t('name')}</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author?.name}</dd>
                      </dl>
                    </li>
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
                <MDXComponent content={content} />
              </div>
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {t('tags')}
                    </h2>
                    <div className="flex flex-wrap">
                     {tags?.split(',').map((tag: string) => {
                          const data = tag.replace(' ', '')
                          return <Tag key={data} text={data} />
                        })}
                    </div>
                  </div>
              </div>
              <div className="pt-4 xl:pt-8">
                <CustomLink
                  href={`/blog`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label={t('back')}
                >
                  &larr; {t('back')}
                </CustomLink>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  )
}
