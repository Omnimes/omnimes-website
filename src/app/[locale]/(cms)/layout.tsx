import { ReactNode } from "react"

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function OutstaticLayout({ children, params: { locale } }: Props) {
  return (
    <main>
      {children}
    </main>
  )
}