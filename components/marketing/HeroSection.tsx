import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-28 bg-[var(--veristiq-snow)] border-b border-gray-100 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          <h1 className="text-5xl md:text-6xl font-semibold text-[var(--veristiq-slate)] mb-6 leading-tight">
            Independent Fairness Verification for Competitions
          </h1>
          <p className="text-lg text-[var(--veristiq-slate-light)] mb-8 leading-relaxed max-w-lg">
            A tamper-evident audit trail for prize draws. Prove every draw is fair. Build trust. Stay compliant.
          </p>
          <div className="flex gap-4">
            <Link href="/operator/register">
              <Button className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white px-8 py-6 text-lg h-auto rounded-md shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
                Get Started
              </Button>
            </Link>
            <Link href="/audit-example">
              <Button variant="outline" className="border-[var(--veristiq-slate)] text-[var(--veristiq-slate)] hover:bg-gray-50 px-8 py-6 text-lg h-auto rounded-md transition-all hover:-translate-y-0.5">
                View Live Audit
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 fill-mode-both">
          {/* Visual: stylized block-chain / event chain graphic */}
          <div className="bg-white rounded-lg shadow-2xl shadow-blue-900/5 border border-gray-200 p-6 md:p-8 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--veristiq-primary-blue)]">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
            </div>
            
            <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-100 opacity-60">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <div className="text-[var(--veristiq-slate-light)]">Event #102: Ticket Purchased</div>
                    <div className="ml-auto text-xs text-gray-400">09:41:22</div>
                </div>
                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-100 opacity-80">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <div className="text-[var(--veristiq-slate-light)]">Event #103: Entry Pool Closed</div>
                    <div className="ml-auto text-xs text-gray-400">09:42:05</div>
                </div>
                 <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded border border-blue-100 ring-2 ring-blue-100 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[200%] -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    <div className="w-2 h-2 rounded-full bg-[var(--veristiq-primary-blue)] animate-pulse"></div>
                    <div className="relative">
                        <div className="font-semibold text-[var(--veristiq-slate)]">Event #104: Draw Executed</div>
                        <div className="text-xs text-gray-500 mt-1 break-all">Hash: 8f4b2e1a...9d3c</div>
                    </div>
                    <div className="ml-auto text-xs text-[var(--veristiq-primary-blue)] font-medium relative">LOCKED</div>
                </div>
                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-100 opacity-60">
                     <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                     <div className="text-gray-400">Pending Block #105...</div>
                 </div>
            </div>
          </div>
          
          {/* Decor */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/30 blur-3xl rounded-full animate-pulse-slow"></div>
        </div>
      </div>
    </section>
  );
}
