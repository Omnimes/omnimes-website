type HeadingProps = {
  text: string
  omnimes?: boolean
  children?: React.ReactNode
  partTwo?: string
  colors?: boolean
}

export const Heading = ({ omnimes, text, children, partTwo, colors }: HeadingProps) => {
  if (colors) {
    return (
      <h2 className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text font-semibold tracking-tight text-transparent">
          {text}
        </span>
      </h2>
    )
  }
  if (partTwo) {
    // np. słowo omnimes kolorowe w srodku
    return (
      <h2 className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {text}
        <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text font-semibold tracking-tight text-transparent">
          &nbsp;OmniMES&nbsp;
        </span>
        {partTwo}
      </h2>
    )
  }
  if (children) {
    // np z kropkami
    return (
      <h2 className="mx-auto mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {children}
        {text}
      </h2>
    )
  }
  return (
    <h2 className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
      {omnimes && (
        <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text font-semibold tracking-tight text-transparent">
          OmniMES&nbsp;
        </span>
      )}
      {text}
    </h2>
  )
}

export const HeadingCard = ({ text }: { text: string }) => {
  return (
    <h4 className="relative text-left font-sans text-xl font-bold tracking-tight sm:text-2xl">
      {text}
    </h4>
  )
}
