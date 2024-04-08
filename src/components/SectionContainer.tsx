import { ReactNode } from 'react'

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({ children, className }: Props) {
  if (className) {
    return (
      <section className={`mx-auto max-w-5xl xl:max-w-5xl px-6 xl:px-0 ${className}`}>{children}</section>
    )
  }
  return (
    <section className="mx-auto max-w-5xl xl:max-w-5xl px-6 xl:px-0">{children}</section>
  )
}