import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Github, Twitter, Linkedin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-900 bg-black">
      <div className="container px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/20">
                C
              </div>
              <span className="font-bold text-lg text-white">CaaS Platform</span>
            </Link>
            <p className="text-sm text-zinc-400 mb-6 max-w-xs">
              The complete fairness and compliance engine for UK prize competitions. 
              Trust, verified.
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
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/operators" className="hover:text-white transition-colors">For Operators</Link></li>
              <li><Link href="/regulators" className="hover:text-white transition-colors">For Regulators</Link></li>
              <li><Link href="/public" className="hover:text-white transition-colors">Public Verification</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Developers</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/api-reference" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
              <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Guides</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Legal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <span>&copy; 2025 CaaS Platform. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
             <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
