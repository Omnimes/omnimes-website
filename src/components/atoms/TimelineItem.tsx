import { Chip } from '@nextui-org/react'
import { Subtitle } from './Subtitle'
import { DescriptionSecondary } from './Description'

type Props = {
  step: string
  subtitle: string
  title: string
  description: string
}
export const TimelineItem = ({ step, subtitle, title, description }: Props) => {
  return (
    <div className="group relative py-6 pl-8 sm:pl-32 last-of-type:mb-16 text-left">
      <Subtitle text={subtitle} />
      <div className="flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3  before:self-start before:bg-slate-300 before:px-px after:absolute after:left-2 after:box-content after:h-2 after:w-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-slate-200 dark:after:border-slate-50 after:bg-primary-500 group-last:before:hidden sm:flex-row sm:before:left-0 sm:before:ml-[6.5rem] sm:after:left-0 sm:after:ml-[6.5rem]">
        <Chip
          variant="shadow"
          classNames={{
            base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small text-emerald-600 border-white/50 shadow-pink-500/30 left-0 mb-3 text-center sm:inline-flex h-6 min-w-[85px] translate-y-0.5 items-center justify-center rounded-full  text-xs font-semibold uppercase text-emerald-600 sm:absolute sm:mb-0 hidden',
            content: 'drop-shadow shadow-black text-white',
          }}
        >
          {step}
        </Chip>
        <h5 className="mb-3 pt-1 text-md md:text-xl font-bold leading-5">
          {title}
        </h5>
      </div>
      <DescriptionSecondary text={description} />
    </div>
  )
}
