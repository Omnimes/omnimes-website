import React from "react"

// Interfejs z opcjonalnymi propami i domyślnymi wartościami
interface SubtitleProps {
  text: string
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  className?: string
  showUnderline?: boolean
}

// Uniwersalny komponent Subtitle
export const Subtitle: React.FC<SubtitleProps> = ({
  text,
  size = "lg",
  className = "",
  showUnderline = true,
}) => {
  // Mapowanie rozmiarów
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  }

  return (
    <small className={`relative inline-flex ${className}`}>
      <span
        className={`font-caveat text-primary-500 mb-1 font-medium sm:mb-0 ${sizeClasses[size]}`}
      >
        {text}
      </span>
      {showUnderline && (
        <svg
          className="fill-primary-500 absolute bottom-0"
          xmlns="http://www.w3.org/2000/svg"
          width="132"
          height="4"
        >
          <path
            fillOpacity=".4"
            fillRule="evenodd"
            d="M131.014 2.344s-39.52 1.318-64.973 1.593c-25.456.24-65.013-.282-65.013-.282C-.34 3.623-.332 1.732.987 1.656c0 0 39.52-1.32 64.973-1.593 25.455-.24 65.012.282 65.012.282 1.356.184 1.37 1.86.042 1.999"
          />
        </svg>
      )}
    </small>
  )
}

// Komponent SubtitleNormal pozostaje bez zmian
export const SubtitleNormal: React.FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => {
  return (
    <small className={`text-primary-500 text-base font-semibold leading-7 ${className}`}>
      {text}
    </small>
  )
}

// Default export dla kompatybilności
export default Subtitle
