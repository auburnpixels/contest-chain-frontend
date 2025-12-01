"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const indicatorBadgeVariants = cva(
  "h-[12px] w-[12px] rounded-full flex items-center justify-center border",
  {
    variants: {
      color: {
        green:
          "bg-emerald-500 border-emerald-500",
        yellow:
          "bg-yellow-500 border-yellow-500",
        blue:
            "bg-blue-500 border-blue-500",
        red:
          "bg-red-500 border-red-500",
        white:
          "bg-slate-500 border-slate-800",
        gray:
          "bg-slate-500 border-slate-800",
        purple:
          "bg-purple-500 border-purple-500",
        orange:
          "bg-orange-500 border-orange-500",
      },
    },
    defaultVariants: {
      color: "gray",
    },
  }
)

const indicatorBadgeSizes = cva(
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs text-muted-foreground transition-colors border",
    {
        variants: {
            size: {
                xs: "text-xs",
                lg: "text-lg",
                xl: "text-xl",
            }
        },
        defaultVariants: {
            size: "xs",
        },

    }
)

export interface IndicatorBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indicatorBadgeVariants> {
  text: string
  color?: "green" | "yellow" | "blue" | "red" | "white" | "gray" | "purple" | "orange"
    size: 'xs' | 'lg' | 'xl'
}

function IndicatorBadge({ 
  className, 
  color, 
  text,
  size = 'xs',
  ...props
}: IndicatorBadgeProps) {
  return (
    <div 
      className={cn(indicatorBadgeSizes({ size }))}
      {...props}
    >
      <div className={cn(indicatorBadgeVariants({ color }), className)} >
      </div>
      <span>{text}</span>
    </div>
  )
}

export { IndicatorBadge, indicatorBadgeVariants }



