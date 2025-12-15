"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface VerifyWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hero"
}

export function VerifyWidget({ className, variant = "default", ...props }: VerifyWidgetProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    // Simulate network delay for effect
    setTimeout(() => {
      // Route to the verify search page
      router.push(`/verify`)
    }, 400)
  }

  return (
    <div className={cn("relative w-full max-w-xl mx-auto", className)} {...props}>
      <form onSubmit={handleVerify} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity" />
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-5 w-5 text-slate-500 z-10" />
          <Input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Ticket ID or Competition UUID..." 
            className={cn(
              "h-12 pl-11 pr-32 bg-slate-950/80 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-blue-500/50 transition-all",
              variant === "hero" && "h-14 text-lg shadow-2xl shadow-blue-900/20"
            )}
          />
          <div className="absolute right-1.5 top-1.5 bottom-1.5">
             <Button 
               type="submit" 
               size={variant === "hero" ? "lg" : "default"}
               disabled={isLoading || !query.trim()}
               className={cn(
                 "bg-blue-600 hover:bg-blue-500 h-full font-medium transition-all",
                 isLoading && "opacity-90"
               )}
             >
               {isLoading ? (
                 <>
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   Verifying
                 </>
               ) : (
                 <>
                   Verify
                   <ArrowRight className="ml-2 h-4 w-4" />
                 </>
               )}
             </Button>
          </div>
        </div>
      </form>
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
           <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
           Live Mainnet
        </span>
        <span className="flex items-center gap-1.5">
           <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
           2.4M Entries Verified
        </span>
      </div>
    </div>
  )
}






