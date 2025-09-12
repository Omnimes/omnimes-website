import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

export default function SectionContainer({ children, className }: Props) {
  if (className)
    return (
      <section className={`mx-auto max-w-screen-xl px-0 xl:px-0 ${className}`}>{children}</section>
    )
  return <section className="mx-auto max-w-screen-xl px-0 xl:px-0">{children}</section>
}
