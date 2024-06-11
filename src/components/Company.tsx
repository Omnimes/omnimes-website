import Image from 'next/image'
import { DescriptionPrimary } from './atoms/Description'
import { Heading } from './atoms/Heading'
import { AbstractBackground } from './decorate/AbstractBackground'
import { useTranslations } from 'next-intl'

export const Company = () => {
  const t = useTranslations('Team');

  return (
    <div className="mx-auto max-w-screen-xl items-center gap-16 py-8 lg:grid lg:grid-cols-2 lg:py-16">
        <AbstractBackground />
        <div className="text-left">
          <Heading text={"Multiprojekt"} colors={true} />
          <DescriptionPrimary text={t("company")} />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Image
            className="w-full rounded-lg z-1"
            src="/images/about/company.png"
            alt="office content 1"
            width={300}
            height={400}
          />
          <Image
            className="mt-4 w-full rounded-lg lg:mt-10 z-1"
            src="/images/about/company2.png"
            alt="office content 2"
            width={300}
            height={400}
          />
        </div>
      </div>
  )
}
