"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShieldCheck } from "lucide-react"

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-100 dark:border-zinc-900 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-6 mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cobalt text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="font-display font-bold text-xl text-zinc-900 dark:text-white tracking-tight">Cafaas</span>
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-brand-cobalt hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:bg-zinc-50 dark:focus:bg-zinc-900 focus:text-brand-cobalt">Product</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-brand-navy p-6 no-underline outline-none focus:shadow-md border border-white/5 hover:bg-brand-navy/90"
                            href="/"
                          >
                            <ShieldCheck className="h-6 w-6 text-brand-cobalt" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Core Protocol
                            </div>
                            <p className="text-sm leading-tight text-white/70">
                              The standard for provably fair competitions.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/about" title="About">
                        Why we built Cafaas.
                      </ListItem>
                      <ListItem href="/how-it-works" title="How It Works">
                        Detailed technical breakdown.
                      </ListItem>
                      <ListItem href="/security" title="Security">
                        How we protect integrity.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-brand-cobalt hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:bg-zinc-50 dark:focus:bg-zinc-900 focus:text-brand-cobalt">Use Cases</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                      <ListItem title="For Operators" href="/operators">
                        Prove your draws are fair.
                      </ListItem>
                      <ListItem title="DCMS Compliance" href="/dcms-code">
                        Support for the Voluntary Code.
                      </ListItem>
                      <ListItem title="Example Audit" href="/audit-example">
                        See a live verification page.
                      </ListItem>
                      <ListItem title="FAQ" href="/faq">
                        Common questions answered.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/pricing" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-brand-cobalt hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:bg-zinc-50 dark:focus:bg-zinc-900 focus:text-brand-cobalt")}>
                      Pricing
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/operator/login" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-brand-cobalt transition-colors">
               Sign In
            </Link>
            <Link href="/operator/register">
              <Button size="sm" className="bg-brand-cobalt text-white hover:bg-brand-cobalt/90 font-medium rounded-full px-5 shadow-lg shadow-brand-cobalt/20">
                Get Started
              </Button>
            </Link>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white dark:bg-black border-l border-zinc-200 dark:border-zinc-800 p-0">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-900">
                    <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cobalt text-white">
                        <ShieldCheck className="h-5 w-5" />
                        </div>
                        <span className="font-display font-bold text-xl text-zinc-900 dark:text-white tracking-tight">Cafaas</span>
                    </Link>
                </div>
              <nav className="flex flex-col p-6 gap-6">
                 <div className="space-y-3">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Product</p>
                    <Link href="/about" onClick={() => setIsOpen(false)} className="block text-zinc-600 dark:text-zinc-400 hover:text-brand-cobalt transition-colors">About</Link>
                    <Link href="/how-it-works" onClick={() => setIsOpen(false)} className="block text-zinc-600 dark:text-zinc-400 hover:text-brand-cobalt transition-colors">How It Works</Link>
                    <Link href="/security" onClick={() => setIsOpen(false)} className="block text-zinc-600 dark:text-zinc-400 hover:text-brand-cobalt transition-colors">Security</Link>
                    <Link href="/pricing" onClick={() => setIsOpen(false)} className="block text-zinc-600 dark:text-zinc-400 hover:text-brand-cobalt transition-colors">Pricing</Link>
                 </div>
                 <div className="space-y-3">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Resources</p>
                    <Link href="/operators" onClick={() => setIsOpen(false)} className="block text-zinc-600 dark:text-zinc-400 hover:text-brand-cobalt transition-colors">For Operators</Link>
                    <Link href="/dcms-code" onClick={() => setIsOpen(false)} className="block text-zinc-600 dark:text-zinc-400 hover:text-brand-cobalt transition-colors">DCMS Compliance</Link>
                    <Link href="/audit-example" onClick={() => setIsOpen(false)} className="block text-zinc-600 dark:text-zinc-400 hover:text-brand-cobalt transition-colors">Example Audit</Link>
                    <Link href="/faq" onClick={() => setIsOpen(false)} className="block text-zinc-600 dark:text-zinc-400 hover:text-brand-cobalt transition-colors">FAQ</Link>
                 </div>
                 <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900 space-y-4">
                     <Link href="/operator/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-center border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900">Sign In</Button>
                    </Link>
                    <Link href="/operator/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full justify-center bg-brand-cobalt hover:bg-brand-cobalt/90 text-white">Get Started</Button>
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:bg-zinc-100 dark:focus:bg-zinc-900",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-zinc-900 dark:text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-zinc-500 dark:text-zinc-400 mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
