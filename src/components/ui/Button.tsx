import * as React from "react"
import { cn } from "@/utils/utils"
import { cva, VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex shadow items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        success:
          "border border-[#16a34a] bg-[#16a34a1a] text-[#16a34a] hover:bg-[#16a34a]/90 hover:text-white [&>svg]:text-[#16a34a] [&>svg]:hover:text-white",
        destructive:
          "shadow-sm border border-[#EE4444] bg-[#ef44441a] text-[#EE4444] hover:bg-[#EE4444]/90 hover:text-white [&>svg]:text-[#EE4444] [&>svg]:hover:text-white",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        primary:
          "shadow-sm border border-foreground-200 bg-black hover:bg-black/80 text-white dark:bg-white dark:hover:bg-white/80 dark:text-black",
      },
      size: {
        default: "h-10 py-1 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 py-2 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
