import Link from "next/link"
import { cn } from "@/utils/utils"

import getFormattedDate from "@/lib/getFormattedDate"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-auto md:grid-cols-3 ",
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  slug,
  date,
  locale,
}: {
  slug: string
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  date?: string
  locale?: string
}) => {
  return (
    <Link
      href={slug}
      className={cn(
        "group/bento shadow-input !border-border row-span-1 flex flex-col justify-between space-y-4 rounded-xl border bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {date && locale && (
          <small>
            <time dateTime={date}>{getFormattedDate(date, locale)}</time>
          </small>
        )}
        <div className="my-2 line-clamp-3 font-sans font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="line-clamp-2 font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </Link>
  )
}
