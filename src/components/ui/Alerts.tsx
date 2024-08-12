import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-[#EE4444] bg-[#ef44441a] text-[#EE4444] [&>svg]:text-[#EE4444]",
        success: "border-[#22c55e] bg-[#22c55e1a] text-[#22c55e] [&>svg]:text-[#22c55e]",
        loading: "border-[#3B82F6] bg-[#3b82f61a] text-[#3B82F6] [&>svg]:text-[#3B82F6]",
        primary: "border-[#ec4899]"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"



const DangerAlert = ({ title, text }: { title: string;  text: string | undefined}) => {
  if(text == undefined) return null
  return (
    <div
      className="mb-6 mt-6 rounded-lg bg-danger-50 p-4 text-sm text-danger flex flex-col"
      role="alert"
    >
          <h6 className="font-medium">{title}</h6>
          <p>{text}</p>
    </div>
  )
}

const SuccessAlert = ({ title, text }: { title: string;  text: string | undefined}) => {
  if(text == undefined) return null
  return (
    <div
      className="mb-6 mt-6 rounded-lg bg-success-50 p-4 text-sm text-success flex flex-col"
      role="alert"
    >
          <h6 className="font-medium">{title}</h6>
          <p>{text}</p>
    </div>
  )
}



export { Alert, AlertTitle, AlertDescription, DangerAlert, SuccessAlert }
