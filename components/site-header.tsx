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
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-brand-navy/80 backdrop-blur-xl">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-6 mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">CAAS</span>
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-slate-300 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white">Product</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-brand-slate border-white/10">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-brand-navy p-6 no-underline outline-none focus:shadow-md border border-white/5 hover:bg-brand-navy/50"
                            href="/"
                          >
                            <ShieldCheck className="h-6 w-6 text-brand-blue" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Core Protocol
                            </div>
                            <p className="text-sm leading-tight text-slate-400">
                              The standard for provably fair competitions.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/features" title="Features">
                        Full capability breakdown.
                      </ListItem>
                      <ListItem href="/integrations" title="Integrations">
                         Connect with your stack.
                      </ListItem>
                      <ListItem href="/security" title="Security">
                        How we protect integrity.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-slate-300 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white">Developers</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-brand-slate border-white/10">
                      <ListItem title="Documentation" href="/docs">
                        Start building today.
                      </ListItem>
                      <ListItem title="API Reference" href="/api-reference">
                        Endpoints and schemas.
                      </ListItem>
                      <ListItem title="Status" href="/status">
                        System uptime.
                      </ListItem>
                      <ListItem title="Changelog" href="/changelog">
                        Latest releases.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/pricing" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-slate-300 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white")}>
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
            <Link href="/operator/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
               Sign In
            </Link>
            <Link href="/operator/register">
              <Button size="sm" className="bg-white text-brand-navy hover:bg-slate-200 font-medium rounded-full px-5">
                Start Building
              </Button>
            </Link>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-brand-slate border-l border-white/10 p-0">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white">
                        <ShieldCheck className="h-5 w-5" />
                        </div>
                        <span className="font-display font-bold text-xl text-white tracking-tight">CAAS</span>
                    </Link>
                </div>
              <nav className="flex flex-col p-6 gap-6">
                 <div className="space-y-3">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Platform</p>
                    <Link href="/features" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white transition-colors">Features</Link>
                    <Link href="/pricing" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white transition-colors">Pricing</Link>
                    <Link href="/docs" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white transition-colors">Documentation</Link>
                 </div>
                 <div className="pt-6 border-t border-white/5 space-y-4">
                     <Link href="/operator/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-center border-white/10 text-white hover:bg-white/5 bg-transparent">Sign In</Button>
                    </Link>
                    <Link href="/operator/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full justify-center bg-brand-blue hover:bg-brand-blue/90 text-white">Get Started</Button>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5 hover:text-accent-foreground focus:bg-white/5 focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-400 mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
