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
          "bg-emerald-950/50 border-emerald-900/50",
        yellow:
          "bg-yellow-950/50 border-yellow-900/50",
        blue:
            "bg-blue-950/50 border-blue-900/50",
        red:
          "bg-red-950/50 border-red-900/50",
        white:
          "bg-slate-900/50 border-slate-800",
        gray:
          "bg-slate-900/50 border-slate-800",
        purple:
          "bg-purple-950/50 border-purple-900/50",
        orange:
          "bg-orange-950/50 border-orange-900/50",
      },
    },
    defaultVariants: {
      color: "gray",
    },
  }
)

export interface IndicatorBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indicatorBadgeVariants> {
  text: string
  color?: "green" | "yellow" | "blue" | "red" | "white" | "gray" | "purple" | "orange"
}

function IndicatorBadge({ 
  className, 
  color, 
  text,
  ...props
}: IndicatorBadgeProps) {
  return (
    <div 
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 p-0.5 text-xs text-muted-foreground transition-colors border"
      {...props}
    >
      <div className={cn(indicatorBadgeVariants({ color }), className)} >
      </div>
      <span>{text}</span>
    </div>
  )
}

export { IndicatorBadge, indicatorBadgeVariants }

