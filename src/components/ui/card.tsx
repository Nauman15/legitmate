
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    variant?: 'default' | 'document' | 'legal' | 'contract'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const cardVariants = {
    default: "rounded-lg border bg-card text-card-foreground shadow-sm",
    document: "card-document rounded-lg border bg-card text-card-foreground shadow-document",
    legal: "rounded-lg border-2 border-accent/20 bg-gradient-card text-card-foreground shadow-elegant relative overflow-hidden",
    contract: "rounded-md border bg-card text-card-foreground shadow-professional font-contract text-sm"
  }
  
  return (
    <div
      ref={ref}
      className={cn(cardVariants[variant], className)}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'legal'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const headerVariants = {
    default: "flex flex-col space-y-1.5 p-6",
    legal: "flex flex-col space-y-2 p-6 border-b border-border/50 bg-gradient-subtle"
  }
  
  return (
    <div
      ref={ref}
      className={cn(headerVariants[variant], className)}
      {...props}
    />
  )
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    variant?: 'default' | 'legal' | 'contract'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const titleVariants = {
    default: "text-2xl font-semibold leading-none tracking-tight",
    legal: "text-2xl font-legal font-semibold leading-none tracking-tight text-accent",
    contract: "text-lg font-contract font-medium leading-tight tracking-wide text-foreground"
  }
  
  return (
    <h3
      ref={ref}
      className={cn(titleVariants[variant], className)}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    variant?: 'default' | 'legal'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const descriptionVariants = {
    default: "text-sm text-muted-foreground",
    legal: "text-sm text-muted-foreground font-legal italic"
  }
  
  return (
    <p
      ref={ref}
      className={cn(descriptionVariants[variant], className)}
      {...props}
    />
  )
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'legal'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const footerVariants = {
    default: "flex items-center p-6 pt-0",
    legal: "flex items-center justify-between p-6 pt-4 border-t border-border/30 bg-muted/20"
  }
  
  return (
    <div
      ref={ref}
      className={cn(footerVariants[variant], className)}
      {...props}
    />
  )
})
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
