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
import { Menu, Shield } from "lucide-react"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Features",
    href: "/features",
    description: "Explore the core capabilities of the CaaS platform.",
  },
  {
    title: "Operators",
    href: "/operators",
    description: "Solutions designed for prize competition operators.",
  },
  {
    title: "Regulators",
    href: "/regulators",
    description: "Oversight and compliance tools for regulatory bodies.",
  },
  {
    title: "Public",
    href: "/public",
    description: "Transparency and verification for the general public.",
  },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/80">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/20">
              C
            </div>
            <span className="hidden font-bold sm:inline-block text-white">CaaS Platform</span>
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-zinc-900 p-6 no-underline outline-none focus:shadow-md border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                            href="/"
                          >
                            <Shield className="h-6 w-6 text-white" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              CaaS Platform
                            </div>
                            <p className="text-sm leading-tight text-zinc-400">
                              Fairness & Compliance Engine for UK Prize Competitions.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      <ListItem title="Documentation" href="/docs">
                        Comprehensive guides for integration.
                      </ListItem>
                      <ListItem title="API Reference" href="/api-reference">
                        Detailed endpoint documentation.
                      </ListItem>
                      <ListItem title="Status" href="/status">
                        Real-time system status and uptime.
                      </ListItem>
                      <ListItem title="Changelog" href="/changelog">
                        Latest updates and releases.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      <ListItem title="About" href="/about">
                        Our mission and vision.
                      </ListItem>
                      <ListItem title="Security" href="/security">
                        How we protect your data.
                      </ListItem>
                      <ListItem title="Compliance" href="/compliance">
                        UK regulatory alignment.
                      </ListItem>
                      <ListItem title="Pricing" href="/pricing">
                         Plans for every stage.
                      </ListItem>
                      <ListItem title="Testimonials" href="/testimonials">
                        What operators are saying.
                      </ListItem>
                      <ListItem title="Contact" href="/contact">
                        Get in touch with us.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/pricing" className={navigationMenuTriggerStyle()}>
                      Pricing
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Link href="/operator/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/operator/register">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 border-0">
                Get Started
              </Button>
            </Link>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-xl">
              <nav className="flex flex-col gap-4 mt-6">
                <div className="flex flex-col gap-2">
                    <h4 className="font-medium text-muted-foreground px-2 text-xs uppercase tracking-wider">Product</h4>
                    <Link href="/features" onClick={() => setIsOpen(false)} className="px-2 py-1 hover:bg-accent rounded-md">Features</Link>
                    <Link href="/operators" onClick={() => setIsOpen(false)} className="px-2 py-1 hover:bg-accent rounded-md">Operators</Link>
                    <Link href="/regulators" onClick={() => setIsOpen(false)} className="px-2 py-1 hover:bg-accent rounded-md">Regulators</Link>
                    <Link href="/public" onClick={() => setIsOpen(false)} className="px-2 py-1 hover:bg-accent rounded-md">Public Verification</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="font-medium text-muted-foreground px-2 text-xs uppercase tracking-wider">Developers</h4>
                    <Link href="/docs" onClick={() => setIsOpen(false)} className="px-2 py-1 hover:bg-accent rounded-md">Documentation</Link>
                    <Link href="/api-reference" onClick={() => setIsOpen(false)} className="px-2 py-1 hover:bg-accent rounded-md">API Reference</Link>
                    <Link href="/status" onClick={() => setIsOpen(false)} className="px-2 py-1 hover:bg-accent rounded-md">Status</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="font-medium text-muted-foreground px-2 text-xs uppercase tracking-wider">Company</h4>
                    <Link href="/pricing" onClick={() => setIsOpen(false)} className="px-2 py-1 hover:bg-accent rounded-md">Pricing</Link>
                    <Link href="/testimonials" onClick={() => setIsOpen(false)} className="px-2 py-1 hover:bg-accent rounded-md">Testimonials</Link>
                    <Link href="/about" onClick={() => setIsOpen(false)} className="px-2 py-1 hover:bg-accent rounded-md">About</Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)} className="px-2 py-1 hover:bg-accent rounded-md">Contact</Link>
                </div>
                 <div className="flex flex-col gap-2 mt-4 border-t pt-4 border-border/50">
                    <Link href="/operator/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-center">Sign In</Button>
                    </Link>
                    <Link href="/operator/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full justify-center bg-blue-600 hover:bg-blue-500">Get Started</Button>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

