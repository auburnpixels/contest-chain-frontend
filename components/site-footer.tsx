import Link from "next/link"
import * as React from "react";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white pt-20 pb-10 w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5 mb-16">
          <div className="col-span-2 lg:col-span-2 space-y-6 pr-8">
              <Link href="/" className="flex items-center gap-1 text-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 text-[var(--veristiq-primary-blue)]">
                      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-[var(--veristiq-primary-blue)]">VERISTIQ</span>
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
              <li><Link href="/case-studies" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">Case Studies</Link></li>
              <li><Link href="/testimonials" className="hover:text-[var(--veristiq-primary-blue)] transition-colors">Testimonials</Link></li>
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
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
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
