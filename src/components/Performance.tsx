import { ComponentVideo } from './atoms/ComponentVideo'
import { DescriptionPrimary, DescriptionSecondary } from './atoms/Description'
import { Heading, HeadingCard } from './atoms/Heading'
import { SubtitleNormal, Subtitle } from './atoms/Subtitle'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
export const Performance = () => {
  const t = useTranslations('Performance')
  return (
    <div className="py-16">
      <div className="mb-10 md:mb-12 md:text-center lg:mx-auto">
        <SubtitleNormal text={t('subtitle')} />
        <Heading text={t('title')} />
        <DescriptionPrimary text={t('desc')} />
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="relative flex flex-col gap-12">
          <div className="relative grid grid-cols-6 gap-3">
            <div className="relative col-span-full overflow-hidden md:col-span-3">
              <Image
                src={'/images/home/1.png'}
                alt={t('alt1')}
                width={875}
                height={528}
                className="w-full max-w-full rounded-lg object-cover md:max-w-[450px]"
              />
            </div>
            <div className="relative col-span-full overflow-hidden rounded-xl md:col-span-3">
              <HeadingCard text={t('heading')} />
            </div>
          </div>

          <div className="relative grid grid-cols-6 content-between gap-3">
            <div className="relative order-2 col-span-full flex flex-col gap-2 overflow-hidden md:order-1 md:col-span-3">
              <HeadingCard text={t('heading1')} />
              <Subtitle text={t('s1')} />
              <DescriptionSecondary text={t('desc1')} />
            </div>
            <div className="relative order-1 col-span-full ml-auto w-full overflow-hidden rounded-xl md:order-2 md:col-span-3">
              <ComponentVideo path={'/videos/4.mp4'} />
            </div>
          </div>

          <div className="relative grid grid-cols-6 content-between gap-3">
            <div className="relative order-1 col-span-full overflow-hidden md:col-span-3 ">
              <Image
                src={'/images/home/2.png'}
                alt={t('alt2')}
                width={875}
                height={528}
                className="w-full max-w-full rounded-lg object-cover md:max-w-[450px]"
              />
            </div>
            <div className="relative order-2 col-span-full ml-auto overflow-hidden rounded-xl md:col-span-3 ">
              <HeadingCard text={t('heading2')} />
              <Subtitle text={t('s2')} />
              <DescriptionSecondary text={t('desc2')} />
            </div>
          </div>

          <div className="relative grid grid-cols-6 content-between gap-3">
            <div className="relative order-2 col-span-full overflow-hidden md:order-1 md:col-span-3">
              <HeadingCard text={t('heading3')} />
              <Subtitle text={t('s3')} />
              <DescriptionSecondary text={t('desc3')} />
            </div>
            <div className="relative order-1 col-span-full ml-auto w-full overflow-hidden rounded-xl md:order-2 md:col-span-3">
              <ComponentVideo path={'/videos/3.mp4'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
