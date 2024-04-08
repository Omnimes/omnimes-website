import { Image } from '@nextui-org/react'
import Logo from '@/data/logo.svg'
import { DescriptionSecondary } from './atoms/Description'
import SectionContainer from './SectionContainer'
import { useTranslations } from 'next-intl'
export const Footer = () => {
  const t = useTranslations('Footer')
  const tl = useTranslations('HeaderLinks')
  const links = [
    'blog',
    'about',
    'project',
    'contact',
    'faq',
    'offer',
    'privacy-policy',
    'tags',
    'terms',
    'resources',
  ]
  return (
    <SectionContainer>
      <footer className="mx-auto max-w-screen-xl pb-4 text-center md:p-8 lg:p-10">
        <a
          href="/"
          className="my-6 flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            disableSkeleton
            src={Logo.src}
            alt={'OmniMES logo'}
            width={44}
            height={36}
            className="z-1 mr-2"
            style={{ width: '44px', height: 'auto' }}
          />
          <span>OmniMES</span>
        </a>
        <DescriptionSecondary text={t('title')} />
        <ul className="my-6 flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
          <li><a href={"/"} className="mr-4 hover:underline md:mr-6">{tl('home')}</a></li>
          {links.map(link => (
            <li key={link}>
              <a href={link} className="mr-4 hover:underline md:mr-6">
                {tl(link)}
              </a>
            </li>
          ))}
        </ul>
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2023-2024{' '}
          <a href="/" className="hover:underline">
            OmniMES™
          </a>
          . {t("rights")} 
        </span>
      </footer>
    </SectionContainer>
  )
}
