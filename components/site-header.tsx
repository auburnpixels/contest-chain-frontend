"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShieldCheck } from "lucide-react"

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="container flex h-20 max-w-7xl items-center justify-between px-6 mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--veristiq-primary-blue)] text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="font-sans font-bold text-xl text-[var(--veristiq-slate)] tracking-tight">Veristiq</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-sm font-medium text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] transition-colors">
              Pricing
            </Link>
            <Link href="/compliance" className="text-sm font-medium text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] transition-colors">
              Compliance
            </Link>
            <Link href="/docs" className="text-sm font-medium text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] transition-colors">
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
              <Button size="default" className="bg-[var(--veristiq-primary-blue)] text-white hover:bg-[var(--veristiq-primary-blue-dark)] font-medium rounded-md px-6 shadow-sm transition-all">
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
                    <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--veristiq-primary-blue)] text-white">
                        <ShieldCheck className="h-5 w-5" />
                        </div>
                        <span className="font-sans font-bold text-xl text-[var(--veristiq-slate)] tracking-tight">Veristiq</span>
                    </Link>
                </div>
              <nav className="flex flex-col p-6 gap-6">
                 <div className="space-y-4">
                    <Link href="/how-it-works" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-[var(--veristiq-slate)] hover:text-[var(--veristiq-primary-blue)] transition-colors">How It Works</Link>
                    <Link href="/pricing" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-[var(--veristiq-slate)] hover:text-[var(--veristiq-primary-blue)] transition-colors">Pricing</Link>
                    <Link href="/compliance" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-[var(--veristiq-slate)] hover:text-[var(--veristiq-primary-blue)] transition-colors">Compliance</Link>
                    <Link href="/docs" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-[var(--veristiq-slate)] hover:text-[var(--veristiq-primary-blue)] transition-colors">Docs</Link>
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
