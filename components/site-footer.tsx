import Link from "next/link"
import { ShieldCheck, Github, Twitter, Linkedin } from "lucide-react"
import * as React from "react";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white pt-20 pb-10 w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5 mb-16">
          <div className="col-span-2 lg:col-span-2 space-y-6 pr-8">
            <Link href="/" className="flex items-center gap-2">
                <img src="/logo.png" className="max-w-[120px]" />
            </Link>
            <p className="text-sm text-[var(--veristiq-slate-light)] max-w-xs leading-relaxed">
              The infrastructure for provably fair competitions.
              Automate compliance, eliminate disputes, and verified integrity.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-[var(--veristiq-slate)]">Product</h4>
            <ul className="space-y-3 text-sm text-[var(--veristiq-slate-light)]">
              <li><Link href="/how-it-works" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">Pricing</Link></li>
              <li><Link href="/compliance" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">Compliance</Link></li>
              <li><Link href="/verify" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">Verify your ticket</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-[var(--veristiq-slate)]">Company</h4>
            <ul className="space-y-3 text-sm text-[var(--veristiq-slate-light)]">
              <li><Link href="/about" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">Contact</Link></li>
              <li><Link href="/security" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">Security</Link></li>
              <li><Link href="/faqs" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-[var(--veristiq-slate)]">Developers</h4>
            <ul className="space-y-3 text-sm text-[var(--veristiq-slate-light)]">
              <li><Link href="/docs" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">Docs</Link></li>
              <li><Link href="/api-reference" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">API Reference</Link></li>
              <li><Link href="/status" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">Status</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--veristiq-slate-light)]">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <span>&copy; 2025 Veristiq. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">Terms of Service</Link>
          </div>
          
          <div className="flex flex-col items-end gap-2">
             <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="font-medium text-[var(--veristiq-slate)]">Systems Normal</span>
             </div>
             <p className="text-[10px] text-gray-400 max-w-[300px] text-right">
                Veristiq is an independent technical service and is not affiliated with the Department for Digital, Culture, Media & Sport.
             </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
