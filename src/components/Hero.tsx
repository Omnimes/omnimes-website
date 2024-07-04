import { Link, Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { AnchorIcon } from './atoms/Icons'

export const Hero = () => {
  const t = useTranslations('HeroSection')
  return (
    // mb-5 mt-8
    <div className="h-100 relative flex min-h-96 w-full flex-col justify-start sm:-mt-8 sm:mb-0 sm:h-[calc(100svh-65px)] sm:justify-center">
      <section className="h-100 mt-8 flex flex-col justify-between gap-6">
        <div>
          <h1
            className="animate-fade-up font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] dark:from-white sm:text-4xl md:text-7xl md:leading-[5rem]"
            style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
          >
            {t('title')}&nbsp;
            <span className="inline bg-gradient-to-b  from-[#FF1CF7] to-[#b249f8] bg-clip-text tracking-tight text-transparent">
              {t('title2')}
            </span>
          </h1>
          <p
            className="animate-fade-up mt-6 text-center text-lg leading-8 text-gray-500 opacity-0 [text-wrap:balance] dark:text-gray-400"
            style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
          >
            {t('subTitle')}
          </p>
        </div>

        <div
          className="animate-fade-up mx-auto mt-6 flex items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
        >
          <Button
            as={Link}
            href="/contact"
            showAnchorIcon
            aria-label={t('buttonAria')}
            aria-labelledby={t('buttonAria')}
            title={t('contact')}
            role="button"
            className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
          >
            {t('contact')}
          </Button>
          <Button
            as={Link}
            href="#omnimes"
            showAnchorIcon
            anchorIcon={<AnchorIcon />}
            aria-label={t('buttonOmnimes')}
            aria-labelledby={t('buttonOmnimes')}
            title={t('more')}
            className="bg-transparent"
          >
            {t('more')}
          </Button>
        </div>
      </section>
    </div>
  )
}
