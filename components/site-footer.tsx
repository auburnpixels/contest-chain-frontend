import Link from "next/link"
import { ShieldCheck, Github, Twitter, Linkedin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-black pt-20 pb-10 w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-6 mb-16">
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cobalt text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">Cafaas</span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
              The infrastructure for provably fair competitions.
              Automate compliance, eliminate disputes, and verified integrity.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-6 text-white">Product</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/features" className="hover:text-brand-cobalt transition-colors">Features</Link></li>
              <li><Link href="/operators" className="hover:text-brand-cobalt transition-colors">For Operators</Link></li>
              <li><Link href="/regulators" className="hover:text-brand-cobalt transition-colors">For Regulators</Link></li>
              <li><Link href="/audits" className="hover:text-brand-cobalt transition-colors">Audit Explorer</Link></li>
              <li><Link href="/pricing" className="hover:text-brand-cobalt transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-6 text-white">Trust & Transparency</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/verify" className="hover:text-brand-cobalt transition-colors">Verify Your Ticket</Link></li>
              <li><Link href="/chain-status" className="hover:text-brand-cobalt transition-colors">Chain Integrity</Link></li>
              <li><Link href="/audits" className="hover:text-brand-cobalt transition-colors">View All Audits</Link></li>
              <li><Link href="/how-it-works" className="hover:text-brand-cobalt transition-colors">How It Works</Link></li>
              <li><Link href="/security" className="hover:text-brand-cobalt transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-6 text-white">Developers</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/docs" className="hover:text-brand-cobalt transition-colors">Documentation</Link></li>
              <li><Link href="/api-reference" className="hover:text-brand-cobalt transition-colors">API Reference</Link></li>
              <li><Link href="/sdks" className="hover:text-brand-cobalt transition-colors">SDKs</Link></li>
              <li><Link href="/status" className="hover:text-brand-cobalt transition-colors">Status</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-6 text-white">Company</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/about" className="hover:text-brand-cobalt transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-brand-cobalt transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-brand-cobalt transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-brand-cobalt transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <span>&copy; 2025 Cafaas Platform. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
             <span className="font-mono text-green-500">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
