
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-card transition-all duration-200",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-card",
        outline:
          "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:shadow-glow",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-professional",
        ghost: "text-foreground hover:bg-muted hover:text-foreground transition-all duration-200",
        link: "text-primary underline-offset-4 hover:underline transition-colors duration-200",
        hero: "bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow transition-all duration-300 hover:scale-105 font-semibold",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-card",
        professional: "bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant transition-all duration-300",
        legal: "bg-gradient-legal text-accent-foreground hover:opacity-90 shadow-document transition-all duration-300 font-legal",
        stamp: "btn-stamp bg-accent text-accent-foreground hover:bg-accent/90 shadow-stamp transition-stamp font-semibold rounded-lg",
        seal: "btn-stamp bg-gradient-accent text-accent-foreground hover:opacity-95 shadow-document animate-seal-glow font-legal rounded-full",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
        seal: "h-12 w-12 p-0",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === 'stamp' || variant === 'seal') {
        e.currentTarget.classList.add('animate-stamp')
        setTimeout(() => {
          e.currentTarget.classList.remove('animate-stamp')
        }, 300)
      }
      onClick?.(e)
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
