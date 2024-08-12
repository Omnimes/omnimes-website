import ComponentSpline from './ComponentSpline'
import { useTranslations } from 'next-intl'
import { SubtitleNormal } from './ui/Subtitle'
import { Heading } from './ui/Heading'
import { DescriptionPrimary, DescriptionSecondary } from './ui/Description'

export const Time = () => {
  const t = useTranslations('Time')

  return (
    <div className="py-16">
      <div className="mb-10 md:mb-12 md:text-center lg:mx-auto">
        <SubtitleNormal text={t('smallSubtitle')} />
        <Heading text={t('heading')} partTwo={t('heading_part2')} />
        <DescriptionPrimary text={t('description')} />
      </div>
      <div className="relative grid grid-cols-6 content-between gap-3">
        <div className="relative col-span-full md:col-span-3 order-1 md:order-2">
          <ComponentSpline url={'https://draft.spline.design/zJtjPyynUKn-paEo/scene.splinecode'} />
        </div>
        <div className="relative col-span-full ml-auto rounded-xl md:col-span-3 order-2 md:order-1">
          <DescriptionSecondary text={t('text')} />
        </div>
      </div>
    </div>
  )
}
