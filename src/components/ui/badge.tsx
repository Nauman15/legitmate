
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary shadow-sm text-white hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary shadow-sm text-white hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive shadow-sm text-white hover:bg-destructive/90",
        outline: 
          "border-primary bg-background shadow-sm text-primary hover:bg-primary hover:text-white",
        success:
          "border-transparent bg-success shadow-sm text-white hover:bg-success/90",
        warning:
          "border-transparent bg-warning shadow-sm text-white hover:bg-warning/90",
        setup:
          "border-transparent bg-gradient-to-r from-primary to-accent shadow-sm text-white hover:from-primary/90 hover:to-accent/90",
        interactive:
          "border-primary bg-primary/10 shadow-sm text-primary hover:bg-primary hover:text-white cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
