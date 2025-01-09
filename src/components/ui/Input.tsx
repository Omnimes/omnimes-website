import * as React from "react"
import { cn } from "@/utils/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "!border-border placeholder:text-muted-foreground focus-visible:ring-ring border-w-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm ring-offset-[#50d71e] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
