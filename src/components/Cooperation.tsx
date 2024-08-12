import Image from 'next/image'
import { SubtitleNormal } from './ui/Subtitle'
import { Heading } from './ui/Heading'
import { useTranslations } from 'next-intl'

export const Cooperation = () => {
  const t = useTranslations('Cooperation')

  return (
    <>
      <div className="mx-auto max-w-screen-xl py-8 md:text-center lg:py-16">
        <SubtitleNormal text={t('subtitle')} />
        <Heading text={t('title')} />
        <div className="mt-8 flex flex-row flex-wrap justify-center gap-8 cursor-default">
          <a href="#" className="flex items-center justify-center">
            <Image
              src={'/images/company/saz.png'}
              alt={'logo saz'}
              className="z-1 max-h-[100px] brightness-0 dark:brightness-100"
              width={500}
              height={500}
            />
          </a>
          <a href="#" className="flex items-center justify-center">
            <Image
              src={'/images/company/eldrew.png'}
              alt={'logo eldrew'}
              className="z-1 max-h-[100px] dark:brightness-0 dark:grayscale-0 dark:invert"
              width={500}
              height={500}
            />
          </a>
          <a href="#" className="flex items-center justify-center">
            <Image
              src={'/images/company/tartak.png'}
              alt={'logo tartak'}
              className="z-1 max-h-[100px] dark:brightness-0 dark:grayscale-0 dark:invert"
              width={500}
              height={500}
            />
          </a>
          <a href="#" className="flex items-center justify-center">
            <Image
              src={'/images/company/triwall.png'}
              alt={'logo triwall'}
              className="z-1 max-h-[100px] dark:brightness-0 dark:grayscale-0 dark:invert"
              width={500}
              height={500}
            />
          </a>
        </div>
      </div>
    </>
  )
}