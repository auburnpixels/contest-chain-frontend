import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShieldCheck, Search, FileText, Eye } from "lucide-react";
import Link from "next/link";

export default function RegulatorsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600/30 font-sans">
      <SiteHeader />

      {/* Hero */}
      <section className="relative py-24 container mx-auto px-4 text-center">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />
         <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 tracking-tight">
            Standardized Oversight
         </h1>
         <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            A unified portal for monitoring compliance across the prize competition sector. Real-time data, standardized reporting, and proactive alerts.
         </p>
         <Link href="/regulator/login">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 px-8">Access Regulator Portal</Button>
         </Link>
      </section>

      {/* Core Pillars */}
      <section className="container mx-auto px-4 py-16">
         <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-900 hover:border-zinc-700 transition-all hover:shadow-2xl hover:shadow-blue-900/5 group">
               <div className="h-14 w-14 rounded-xl bg-blue-900/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <Eye className="h-7 w-7 text-blue-500" />
               </div>
               <h3 className="text-xl font-bold text-white mb-4">Ecosystem Visibility</h3>
               <p className="text-zinc-400 leading-relaxed">
                  See active operators, live competitions, and volume metrics across the entire platform in a single dashboard.
               </p>
            </div>
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-900 hover:border-zinc-700 transition-all hover:shadow-2xl hover:shadow-blue-900/5 group">
               <div className="h-14 w-14 rounded-xl bg-blue-900/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-7 w-7 text-blue-500" />
               </div>
               <h3 className="text-xl font-bold text-white mb-4">Automated Integrity</h3>
               <p className="text-zinc-400 leading-relaxed">
                  Algorithmic verification of every draw. We flag anomalies (e.g., late entries winning, manual overrides) instantly.
               </p>
            </div>
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-900 hover:border-zinc-700 transition-all hover:shadow-2xl hover:shadow-blue-900/5 group">
               <div className="h-14 w-14 rounded-xl bg-blue-900/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <FileText className="h-7 w-7 text-blue-500" />
               </div>
               <h3 className="text-xl font-bold text-white mb-4">Standardized Audits</h3>
               <p className="text-zinc-400 leading-relaxed">
                  No more spreadsheets. Download standardized JSON/CSV audit logs for any competition that meet evidential standards.
               </p>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24 text-center">
         <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-16 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
            <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Partner with CaaS</h2>
            <p className="text-zinc-400 mb-8 text-lg relative z-10">
               We work directly with regulatory bodies to define digital standards for fairness. Contact our policy team to learn more.
            </p>
            <Link href="/contact" className="relative z-10">
               <Button variant="outline" className="border-zinc-700 hover:bg-white hover:text-black text-white rounded-full h-12 px-8">Contact Policy Team</Button>
            </Link>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}
