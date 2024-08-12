import Image from 'next/image'
import { DescriptionPrimary } from './ui/Description'
import { Heading } from './ui/Heading'
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

const AbstractBackground = ()  => {
  return (
      <div
      className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      aria-hidden="true"
    >
      <div
        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      ></div>
    </div>
  )
}
