import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Lock, Database, FileCheck2, Server, ArrowRight } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">
        
        {/* Hero Section */}
        <section className="py-20 bg-[var(--veristiq-snow)] border-b border-gray-100 overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="container mx-auto px-6 max-w-4xl text-center relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--veristiq-slate)]">How Veristiq Works</h1>
                <p className="text-xl text-[var(--veristiq-slate-light)] mb-8 leading-relaxed">
                    A technical deep dive into our tamper-evident audit trail, draw atomicity, and verification engine.
                </p>
            </div>
        </section>

        {/* Problem Explanation */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-3xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
                <h2 className="text-3xl font-semibold mb-6">The Problem: Private Databases = Zero Trust</h2>
                <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed">
                    Most competitions run on standard databases (MySQL, Postgres). An admin with access can easily modify entries, change timestamps, or re-run draws until they get a desired result. 
                    <br/><br/>
                    Screen recordings prove nothing. They only show what happened <i>on screen</i>, not what happened in the database.
                </p>
            </div>
        </section>

        {/* Step-by-Step Technical Explanation */}
        <section className="py-20 bg-[var(--veristiq-snow)]">
             <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
                     <h2 className="text-3xl font-semibold mb-4">The Veristiq Process</h2>
                     <p className="text-[var(--veristiq-slate-light)]">From entry to audit in 3 verifiable steps.</p>
                </div>

                <div className="space-y-24">
                    {/* Step 1 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center group">
                        <div className="order-2 md:order-1 animate-in fade-in slide-in-from-left-8 duration-700 delay-300 fill-mode-both">
                             <div className="w-12 h-12 bg-[var(--veristiq-primary-blue)] text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">1</div>
                             <h3 className="text-2xl font-bold mb-4">Immutable Event Logging</h3>
                             <p className="text-lg text-[var(--veristiq-slate-light)] mb-6">
                                 Operators send entries and competition events (creation, update, pause) to our API. 
                                 Each event is hashed and linked to the previous event's hash, creating an unbroken chain.
                             </p>
                             <ul className="space-y-3">
                                 <li className="flex items-center gap-3">
                                     <Check className="w-5 h-5 text-green-500" />
                                     <span>Cryptographic linking (SHA-256)</span>
                                 </li>
                                 <li className="flex items-center gap-3">
                                     <Check className="w-5 h-5 text-green-500" />
                                     <span>Real-time timestamps</span>
                                 </li>
                                 <li className="flex items-center gap-3">
                                     <Check className="w-5 h-5 text-green-500" />
                                     <span>Tamper-evident structure</span>
                                 </li>
                             </ul>
                        </div>
                        <div className="order-1 md:order-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm font-mono text-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-right-8 duration-700 delay-300 fill-mode-both">
                            <div className="mb-4 text-gray-400">// Example Event Record</div>
                            <div className="space-y-2 text-[var(--veristiq-slate)]">
                                <p><span className="text-purple-600">"event_id"</span>: <span className="text-blue-600">"evt_8921..."</span>,</p>
                                <p><span className="text-purple-600">"type"</span>: <span className="text-green-600">"TICKET_ENTRY"</span>,</p>
                                <p><span className="text-purple-600">"data"</span>: &#123; ... &#125;,</p>
                                <p><span className="text-purple-600">"previous_hash"</span>: <span className="text-orange-500">"a7f3..."</span>,</p>
                                <p><span className="text-purple-600">"hash"</span>: <span className="text-blue-600">"b8c9..."</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center group">
                         <div className="order-1 md:order-2 animate-in fade-in slide-in-from-right-8 duration-700 delay-400 fill-mode-both">
                             <div className="w-12 h-12 bg-[var(--veristiq-primary-blue)] text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">2</div>
                             <h3 className="text-2xl font-bold mb-4">Atomic Draw Execution</h3>
                             <p className="text-lg text-[var(--veristiq-slate-light)] mb-6">
                                 When a draw is triggered, the pool of eligible entries is locked. 
                                 A random seed is generated server-side (provably fair) and combined with the entry pool hash to select a winner deterministically.
                             </p>
                             <ul className="space-y-3">
                                 <li className="flex items-center gap-3">
                                     <Check className="w-5 h-5 text-green-500" />
                                     <span>Pool freezing</span>
                                 </li>
                                 <li className="flex items-center gap-3">
                                     <Check className="w-5 h-5 text-green-500" />
                                     <span>Reproducible selection algorithm</span>
                                 </li>
                                 <li className="flex items-center gap-3">
                                     <Check className="w-5 h-5 text-green-500" />
                                     <span>Instant result locking</span>
                                 </li>
                             </ul>
                        </div>
                        <div className="order-2 md:order-1 bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-left-8 duration-700 delay-400 fill-mode-both">
                            <div className="text-center">
                                <Lock className="w-16 h-16 text-[var(--veristiq-primary-blue)] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                                <h4 className="font-bold text-lg mb-2">Draw Locked</h4>
                                <p className="text-sm text-gray-500">Timestamp: 2025-05-12T14:30:00Z</p>
                                <div className="mt-4 px-4 py-2 bg-gray-50 rounded border border-gray-100 font-mono text-xs">
                                    Hash: 7d9...2a1
                                </div>
                            </div>
                        </div>
                    </div>

                     {/* Step 3 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center group">
                        <div className="order-2 md:order-1 animate-in fade-in slide-in-from-left-8 duration-700 delay-500 fill-mode-both">
                             <div className="w-12 h-12 bg-[var(--veristiq-primary-blue)] text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">3</div>
                             <h3 className="text-2xl font-bold mb-4">Public Verification</h3>
                             <p className="text-lg text-[var(--veristiq-slate-light)] mb-6">
                                 A public audit page is generated immediately. This page displays the winner, the draw time, and the cryptographic proofs. 
                                 Anyone can independently verify the chain integrity.
                             </p>
                             <ul className="space-y-3">
                                 <li className="flex items-center gap-3">
                                     <Check className="w-5 h-5 text-green-500" />
                                     <span>Publicly accessible URL</span>
                                 </li>
                                 <li className="flex items-center gap-3">
                                     <Check className="w-5 h-5 text-green-500" />
                                     <span>Chain integrity status</span>
                                 </li>
                                 <li className="flex items-center gap-3">
                                     <Check className="w-5 h-5 text-green-500" />
                                     <span>Exportable audit data</span>
                                 </li>
                             </ul>
                        </div>
                         <div className="order-1 md:order-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-right-8 duration-700 delay-500 fill-mode-both">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium">Chain Signature Valid</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium">Seed Hash Matches</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium">Winner Selection Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>

        {/* API Integration & Compliance Teaser */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid md:grid-cols-2 gap-16">
                    <div className="group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                            <Server className="w-6 h-6 text-[var(--veristiq-slate)] group-hover:text-[var(--veristiq-primary-blue)] transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">API-First Integration</h3>
                        <p className="text-[var(--veristiq-slate-light)] mb-6">
                            Veristiq is built for developers. Integrate our REST API into your existing raffle platform (WordPress, Laravel, Node.js) in a few hours.
                        </p>
                        <Link href="/docs" className="text-[var(--veristiq-primary-blue)] font-medium hover:underline flex items-center gap-2 group-hover:gap-3 transition-all">
                            Read the API Docs <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
                         <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                            <FileCheck2 className="w-6 h-6 text-[var(--veristiq-slate)] group-hover:text-[var(--veristiq-primary-blue)] transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">DCMS Code Compliance</h3>
                        <p className="text-[var(--veristiq-slate-light)] mb-6">
                            We map every feature directly to the upcoming DCMS voluntary code for competitions. Don't just say you're compliant—prove it.
                        </p>
                        <Link href="/compliance" className="text-[var(--veristiq-primary-blue)] font-medium hover:underline flex items-center gap-2 group-hover:gap-3 transition-all">
                            View Compliance Mapping <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white text-center">
            <div className="container mx-auto px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to verify your draws?</h2>
                <p className="text-xl text-gray-300 mb-10">Get started with our API today.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <Link href="/operator/register">
                        <Button className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white px-8 py-6 text-lg h-auto shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
                        Get Started
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-lg h-auto transition-all hover:-translate-y-0.5">
                        Contact Sales
                        </Button>
                    </Link>
                </div>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
