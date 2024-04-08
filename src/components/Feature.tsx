import { useTranslations } from 'next-intl'
import { FeatureCard } from './atoms/Card'
import {
  AnalyseIcon,
  CreatorIcon,
  EnergyIcon,
  MonitoringIcon,
  PulpitsIcon,
  RaportsIcon,
  ScheduleIcon,
} from './atoms/Icons'
import { SubtitleNormal } from './atoms/Subtitle'
import { Heading } from './atoms/Heading'
import { DescriptionPrimary } from './atoms/Description'
import { Dots } from './decorate/Dots'

export const Feature = () => {
  const t = useTranslations('Feature')
  const feature = ['Monitoring', 'Analyse', 'Schedule']
  const featurePart2 = ['Raports', 'Creator', 'Pulpits']
  return (
    <div className="py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:py-20">
      <div className="mb-10 lg:mx-auto md:mb-12 md:text-center">
        <SubtitleNormal text={t('Feature')} />
        <Heading text={t('title')}>
          <Dots />
        </Heading>
        <DescriptionPrimary text={t('desc')} />
      </div>
      <div className="mx-auto grid max-w-screen-lg space-y-6 lg:grid-cols-2 lg:space-y-0 lg:divide-x">
        <div className="space-y-4 md:px-12">
          {feature.map((item) => {
            let iconComponent

            switch (item) {
              case 'Analyse':
                iconComponent = <AnalyseIcon />
                break
              case 'Monitoring':
                iconComponent = <MonitoringIcon />
                break
              case 'Schedule':
                iconComponent = <ScheduleIcon />
                break
              default:
                iconComponent = <EnergyIcon />
            }
            return (
              <FeatureCard
                title={t(item)}
                key={item}
                desc={t(item + '_desc')}
                icon={iconComponent}
              />
            )
          })}
        </div>
        <div className="space-y-4 md:px-12">
          {featurePart2.map((item) => {
            let iconComponent
            switch (item) {
              case 'Raports':
                iconComponent = <RaportsIcon />
                break
              case 'Creator':
                iconComponent = <CreatorIcon />
                break
              case 'Pulpits':
                iconComponent = <PulpitsIcon />
                break

              default:
                iconComponent = <EnergyIcon />
            }
            return (
              <FeatureCard
                title={t(item)}
                key={item}
                desc={t(item + '_desc')}
                icon={iconComponent}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
