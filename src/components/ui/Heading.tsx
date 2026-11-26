type HeadingProps = {
  text: string
  omnimes?: boolean
  children?: React.ReactNode
  partTwo?: string
  colors?: boolean
  /** Nazwa marki wstawiana zamiast "OmniMES" (opcjonalna). Domyślnie: "OmniMES". */
  brand?: string
  /** BO-1426: "h1" for the main heading of a page (one per page); default "h2". */
  as?: "h1" | "h2"
}

export const Heading = ({
  omnimes,
  text,
  children,
  partTwo,
  colors,
  brand,
  as: Tag = "h2",
}: HeadingProps) => {
  const brandLabel = brand && brand.trim() ? brand.trim() : "OmniMES"

  if (colors) {
    return (
      <Tag className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text font-semibold tracking-tight text-transparent">
          {text}
        </span>
      </Tag>
    )
  }

  if (partTwo) {
    // np. słowo brand (domyślnie OmniMES) kolorowe w środku
    return (
      <Tag className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {text}
        <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text font-semibold tracking-tight text-transparent">
          &nbsp;{brandLabel}&nbsp;
        </span>
        {partTwo}
      </Tag>
    )
  }

  if (children) {
    // np. z kropkami/ikonami przed tekstem
    return (
      <Tag className="mx-auto mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
        {children}
        {text}
      </Tag>
    )
  }

  return (
    <Tag className="mt-2 font-sans text-2xl font-bold tracking-tight sm:text-4xl">
      {omnimes && (
        <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text font-semibold tracking-tight text-transparent">
          {brandLabel}&nbsp;
        </span>
      )}
      {text}
    </Tag>
  )
}

export const HeadingCard = ({ text }: { text: string }) => {
  return (
    <h4 className="relative text-left font-sans text-xl font-bold tracking-tight sm:text-2xl">
      {text}
    </h4>
  )
}
