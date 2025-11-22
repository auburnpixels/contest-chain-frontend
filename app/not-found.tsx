import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Compass } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-center text-white font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-20" />
      </div>

      <div className="relative z-10 px-4 space-y-8">
        <div className="mx-auto w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 shadow-2xl shadow-blue-900/20 animate-float">
          <Compass className="h-12 w-12 text-blue-500 animate-spin-slow" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            404
          </h1>
          <h2 className="text-2xl font-medium text-blue-400">Coordinates Not Found</h2>
          <p className="text-muted-foreground max-w-[500px] mx-auto leading-relaxed">
            We've scanned the sector but couldn't locate the page you're looking for. 
            It may have been moved to another quadrant or never existed.
          </p>
        </div>

        <div className="pt-4">
          <Link href="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Base
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}




