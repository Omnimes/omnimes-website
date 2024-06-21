'use client'
import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { KBarSearchProvider } from 'pliny/search/KBar.js'
import { usePathname, useRouter } from 'next/navigation'

export const ComponentSearch = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const lang = pathname?.split('/')[1]
  const t = useTranslations('HeaderLinks')
  return (
      <KBarSearchProvider
        kbarConfig={{
          searchDocumentsPath: 'search/search.json',
          defaultActions: [
            // Sekcja MAin
            {
              id: 'homepage',
              name: t('home'),
              shortcut: ['h'],
              keywords: t('home'),
              section: t('main'),
              perform: () => router.push('/'),
            },
            {
              id: 'blog',
              name: t('blog'),
              shortcut: ['b'],
              keywords: t('blog'),
              section: t('main'),
              perform: () => router.push('/blog'),
            },
            {
              id: 'about',
              name: t('about'),
              shortcut: ['a'],
              keywords: t('about'),
              section: t('main'),
              perform: () => router.push('/about'),
            },
            {
              id: 'contact',
              name: t('contact'),
              keywords: t('contact'),
              shortcut: ['c'],
              section: t('main'),
              perform: () => router.push('/contact'),
            },
            // Sekcja MES
            {
              id: 'offer',
              name: t('offer'),
              shortcut: ['o'],
              keywords: t('offer'),
              subtitle: t('searchSubtitle'),
              section: 'OmniMES',
              perform: () => router.push('/offer'),
            },
            {
              id: 'project',
              name: t('project'),
              shortcut: ['p'],
              keywords: t('project'),
              subtitle: t('searchSubtitle2'),
              section: 'OmniMES',
              perform: () => router.push('/project'),
            },
            {
              id: 'news',
              name: t('news'),
              shortcut: ['r'],
              keywords: t('news'),
              subtitle: t('searchSubtitle4'),
              section: 'OmniMES',
              perform: () => router.push('/news'),
            },
            {
              id: 'faq',
              name: t('faq'),
              shortcut: ['f'],
              keywords: t('faq'),
              subtitle: t('searchSubtitle3'),
              section: 'OmniMES',
              perform: () => router.push('/faq'),
            },
            {
              id: 'gallery',
              name: t('gallery'),
              shortcut: ['g'],
              keywords: t('gallery'),
              subtitle: t('searchSubtitle5'),
              section: t("titleSectionDropDown4"),
              perform: () => router.push('/gallery'),
            },
          ],
          onSearchDocumentsLoad(json) {
            return json
              .filter((post: BlogPost) => post.lang === lang)
              .map((post: BlogPost) => ({
                id: post.slug,
                name: post.title,
                keywords: post.tags || "",
                section: 'Blog',
                subtitle: post.description || "",
                perform: () => router.push('/blog/' + post.slug),
              }))
          },
        }}
      >
        {children}
      </KBarSearchProvider>
  )
}
