"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="container flex h-20 max-w-7xl items-center justify-between px-6 mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-1 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 text-[var(--veristiq-primary-blue)]">
                  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-[var(--veristiq-primary-blue)]">VERISTIQ</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/how-it-works" 
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/how-it-works") 
                  ? "text-[var(--veristiq-primary-blue)]" 
                  : "text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)]"
              )}
            >
              How It Works
            </Link>
            <Link 
              href="/pricing" 
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/pricing") 
                  ? "text-[var(--veristiq-primary-blue)]" 
                  : "text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)]"
              )}
            >
              Pricing
            </Link>
            <Link 
              href="/compliance" 
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/compliance") 
                  ? "text-[var(--veristiq-primary-blue)]" 
                  : "text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)]"
              )}
            >
              Compliance
            </Link>
            <Link 
              href="/docs" 
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/docs") 
                  ? "text-[var(--veristiq-primary-blue)]" 
                  : "text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)]"
              )}
            >
              Docs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
             <Link href="/operator/login" className="text-sm font-medium text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] transition-colors">
               Sign In
            </Link>
            <Link href="/operator/register">
              <Button size="default" className="bg-[var(--veristiq-primary-blue)] text-white hover:bg-[var(--veristiq-primary-blue-dark)] font-medium rounded-md px-6 shadow-sm transition-all hover:-translate-y-0.5">
                Get Started
              </Button>
            </Link>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-[var(--veristiq-slate)] hover:bg-gray-100">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white border-l border-gray-100 p-0">
                <div className="p-6 border-b border-gray-100">
                    <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 text-[var(--veristiq-primary-blue)]">
                            <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>
                        <span className="font-bold text-[var(--veristiq-primary-blue)]">VERISTIQ</span>
                    </Link>
                </div>
              <nav className="flex flex-col p-6 gap-6">
                 <div className="space-y-4">
                    <Link 
                        href="/how-it-works" 
                        onClick={() => setIsOpen(false)} 
                        className={cn(
                            "block text-lg font-medium transition-colors",
                            isActive("/how-it-works") ? "text-[var(--veristiq-primary-blue)]" : "text-[var(--veristiq-slate)] hover:text-[var(--veristiq-primary-blue)]"
                        )}
                    >
                        How It Works
                    </Link>
                    <Link 
                        href="/pricing" 
                        onClick={() => setIsOpen(false)} 
                        className={cn(
                            "block text-lg font-medium transition-colors",
                            isActive("/pricing") ? "text-[var(--veristiq-primary-blue)]" : "text-[var(--veristiq-slate)] hover:text-[var(--veristiq-primary-blue)]"
                        )}
                    >
                        Pricing
                    </Link>
                    <Link 
                        href="/compliance" 
                        onClick={() => setIsOpen(false)} 
                        className={cn(
                            "block text-lg font-medium transition-colors",
                            isActive("/compliance") ? "text-[var(--veristiq-primary-blue)]" : "text-[var(--veristiq-slate)] hover:text-[var(--veristiq-primary-blue)]"
                        )}
                    >
                        Compliance
                    </Link>
                    <Link 
                        href="/docs" 
                        onClick={() => setIsOpen(false)} 
                        className={cn(
                            "block text-lg font-medium transition-colors",
                            isActive("/docs") ? "text-[var(--veristiq-primary-blue)]" : "text-[var(--veristiq-slate)] hover:text-[var(--veristiq-primary-blue)]"
                        )}
                    >
                        Docs
                    </Link>
                 </div>
                 <div className="pt-6 border-t border-gray-100 space-y-4">
                     <Link href="/operator/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-center border-gray-200 text-[var(--veristiq-slate)] hover:bg-gray-50 bg-transparent">Sign In</Button>
                    </Link>
                    <Link href="/operator/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full justify-center bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white">Get Started</Button>
                    </Link>
                 </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
