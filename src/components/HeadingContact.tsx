import { useTranslations } from 'next-intl'

export const HeadingContact = () => {
  const t = useTranslations('ContactHeading')

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col justify-center overflow-hidden px-4 py-24 text-center md:px-6">
      <h3 className="bg-gradient-to-r from-slate-900 to-slate-900/50 to-50% bg-clip-text text-3xl font-extrabold text-transparent [text-wrap:balance] dark:from-slate-200/60 dark:to-slate-200 md:text-4xl">
        {t('title')}{' '}
        <span className="inline-flex h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] flex-col overflow-hidden text-primary-500 md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))]">
          <ul className="animate-text-slide-5 block text-left leading-tight [&_li]:block">
            <li>{t('message1')}</li>
            <li>{t('message2')}</li>
            <li>{t('message3')}</li>
            <li>{t('message4')}</li>
            <li>{t('message5')}</li>
            <li aria-hidden="true">{t('message6')}</li>
          </ul>
        </span>
      </h3>
    </section>
  )
}
