import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default async function OutstaticLayout({ children }: Props) {
  return <main>{children}</main>
}
