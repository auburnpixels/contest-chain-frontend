import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, ShieldCheck, CheckCircle2, AlertTriangle, Check, Lock, RefreshCw, Server } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

            <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                 <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                    <Scale className="w-8 h-8 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">Built for the DCMS Voluntary Code on Prize Draws and Competitions</h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                    The competition landscape is changing. Operators must demonstrate transparency, fairness, and public accountability. Veristiq provides the independent audit layer required to meet the DCMS Voluntary Code with confidence.
                </p>
                <Link href="/operator/register">
                    <Button className="bg-white text-[var(--veristiq-slate)] hover:bg-gray-100 font-bold px-8 py-6 text-lg h-auto shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl">
                        Start Auditing Draws
                    </Button>
                </Link>
            </div>
        </section>

        {/* Explainer Block */}
        <section className="py-12 bg-gray-50 border-b border-gray-100">
            <div className="container mx-auto px-6 max-w-3xl text-center">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--veristiq-slate-light)] mb-4">What is the DCMS Voluntary Code?</h3>
                <p className="text-[var(--veristiq-slate)] leading-relaxed text-lg">
                    The DCMS Voluntary Code establishes expectations for transparency, fairness, and accountability in prize competitions and free draws. It sets out guidelines for how operators must log, verify, and publish draw outcomes to protect consumers and ensure fair play.
                </p>
            </div>
        </section>

        {/* The Problem */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-6xl">
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-in fade-in slide-in-from-left-8 duration-700 delay-100 fill-mode-both">
                        <h2 className="text-3xl font-bold mb-6 text-[var(--veristiq-slate)]">The "Black Box" Problem</h2>
                        <p className="text-lg text-[var(--veristiq-slate-light)] mb-8 leading-relaxed">
                            Regulators and players are increasingly skeptical of "screen recorded" draws. A video proves nothing about the underlying database. 
                            Did you include all entries? Did you remove anyone unfairly? <span className="font-bold text-[var(--veristiq-slate)]">Could you prove it if asked?</span>
                            <br /><br />
                            A screen recording is not evidence. Regulators need a verifiable audit trail.
                        </p>
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg shadow-sm">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1 animate-pulse" />
                                <div>
                                    <h4 className="font-bold text-orange-800 mb-1">DCMS Warning</h4>
                                    <p className="text-sm text-orange-700 italic">
                                        "Operators must be able to demonstrate that their draws are conducted fairly and in accordance with their terms."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[var(--veristiq-snow)] p-8 rounded-2xl border border-gray-200 animate-in fade-in slide-in-from-right-8 duration-700 delay-200 fill-mode-both hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--veristiq-primary-blue)]/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                         
                         <h3 className="font-bold text-xl mb-8 text-[var(--veristiq-slate)] relative z-10">Veristiq's Answer</h3>
                         <ul className="space-y-6 relative z-10">
                             <li className="flex gap-4 group/item">
                                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 group-hover/item:scale-110 group-hover/item:bg-green-200 transition-all duration-300 shadow-sm">
                                     <Check className="w-5 h-5" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-lg mb-1 group-hover/item:text-green-700 transition-colors">Independent Verification</h4>
                                     <p className="text-sm text-gray-600">A third-party, operator-neutral, cryptographically verifiable record of every draw.</p>
                                 </div>
                             </li>
                             <li className="flex gap-4 group/item">
                                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 group-hover/item:scale-110 group-hover/item:bg-green-200 transition-all duration-300 shadow-sm">
                                     <Lock className="w-5 h-5" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-lg mb-1 group-hover/item:text-green-700 transition-colors">Immutable History</h4>
                                     <p className="text-sm text-gray-600">A tamper-evident chain prevents retroactive changes or selective deletions.</p>
                                 </div>
                             </li>
                             <li className="flex gap-4 group/item">
                                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 group-hover/item:scale-110 group-hover/item:bg-green-200 transition-all duration-300 shadow-sm">
                                     <FileText className="w-5 h-5" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-lg mb-1 group-hover/item:text-green-700 transition-colors">Public Accountability</h4>
                                     <p className="text-sm text-gray-600">Winners and draw evidence are publicly accessible — not hidden inside your CMS.</p>
                                 </div>
                             </li>
                         </ul>
                    </div>
                 </div>
            </div>
        </section>

        {/* Technical Flow Diagram */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white border-y border-gray-800 overflow-hidden relative">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-10"></div>
             
             <div className="container mx-auto px-6 max-w-5xl relative z-10">
                 <h2 className="text-2xl font-bold text-center mb-16">Verifiable Draw Pipeline</h2>
                 
                 <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative perspective-1000">
                     {/* Connecting Line (Desktop) with Animation */}
                     <div className="hidden md:block absolute top-1/2 left-20 right-20 h-0.5 bg-gray-700 -z-10 -translate-y-1/2 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--veristiq-teal)] to-transparent w-1/2 h-full animate-[shimmer_2s_infinite]"></div>
                     </div>

                     <div className="group flex flex-col items-center text-center bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg w-48 relative z-10 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300">
                         <div className="w-12 h-12 bg-blue-500/20 text-[var(--veristiq-primary-blue)] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                             <Server className="w-6 h-6 text-blue-400" />
                         </div>
                         <h4 className="font-bold">Entries</h4>
                         <p className="text-xs text-gray-400 mt-2">Logged & Hashed</p>
                     </div>

                     <div className="group flex flex-col items-center text-center bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg w-48 relative z-10 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300">
                         <div className="w-12 h-12 bg-blue-500/20 text-[var(--veristiq-primary-blue)] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                             <RefreshCw className="w-6 h-6 text-blue-400" />
                         </div>
                         <h4 className="font-bold">Draw Event</h4>
                         <p className="text-xs text-gray-400 mt-2">Atomic Selection</p>
                     </div>

                     <div className="group flex flex-col items-center text-center bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg w-48 relative z-10 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300">
                         <div className="w-12 h-12 bg-blue-500/20 text-[var(--veristiq-primary-blue)] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                             <Lock className="w-6 h-6 text-blue-400" />
                         </div>
                         <h4 className="font-bold">Chain Hash</h4>
                         <p className="text-xs text-gray-400 mt-2">Cryptographic Link</p>
                     </div>

                     <div className="group flex flex-col items-center text-center bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg w-48 relative z-10 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300">
                         <div className="w-12 h-12 bg-blue-500/20 text-[var(--veristiq-primary-blue)] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                             <CheckCircle2 className="w-6 h-6 text-blue-400" />
                         </div>
                         <h4 className="font-bold">Public Audit</h4>
                         <p className="text-xs text-gray-400 mt-2">Consumer Proof</p>
                     </div>
                 </div>
             </div>
        </section>

        {/* DCMS Mapping */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-3xl font-bold text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">Mapping to the Voluntary Code</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {/* Transparency */}
                    <Card className="border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[var(--veristiq-primary-blue)]/30 transition-all duration-300 group">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 !text-xl group-hover:text-[var(--veristiq-primary-blue)] transition-colors">
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <FileText className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
                                </div>
                                Transparency
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-xs text-gray-500 mb-2 italic">"Operators must record and publish clear draw outcomes..."</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Public audit pages</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Winner publication</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Draw timestamps</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Draw Methodology */}
                    <Card className="border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[var(--veristiq-primary-blue)]/30 transition-all duration-300 group">
                        <CardHeader>
                             <CardTitle className="flex items-center gap-3 !text-xl group-hover:text-[var(--veristiq-primary-blue)] transition-colors">
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <RefreshCw className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
                                </div>
                                Methodology
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-xs text-gray-500 mb-2 italic">"Draws must be random and verifiable..."</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Provably-fair RNG</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Chain-anchored execution</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Algorithm inputs logged</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Accountability */}
                    <Card className="border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[var(--veristiq-primary-blue)]/30 transition-all duration-300 group">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 !text-xl group-hover:text-[var(--veristiq-primary-blue)] transition-colors">
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <ShieldCheck className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
                                </div>
                                Accountability
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-xs text-gray-500 mb-2 italic">"Operators must demonstrate fair administration..."</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Independent verification</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Tamper-evident logs</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Paid/Free entry separation</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                     {/* Compliance */}
                     <Card className="border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[var(--veristiq-primary-blue)]/30 transition-all duration-300 group">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 !text-xl group-hover:text-[var(--veristiq-primary-blue)] transition-colors">
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <Scale className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
                                </div>
                                Compliance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-xs text-gray-500 mb-2 italic">"Robust complaints handling and limits..."</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Complaint logging</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Ticket cap enforcement</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Data retention policy</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

         {/* Example Report */}
         <section className="py-24 bg-[var(--veristiq-snow)] overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                 <h2 className="text-3xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">Automated Compliance Reporting</h2>
                 <p className="text-[var(--veristiq-slate-light)] mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both max-w-2xl mx-auto text-lg">
                     Generate PDF compliance reports for any competition with one click. Designed to support annual compliance reviews and regulator inquiries with reliable evidence.
                     <br /><br />
                     <span className="text-sm font-medium">Includes all required draw metadata: method, hashes, timestamps, and verification state.</span>
                 </p>
                 
                 <div className="relative group perspective-1000 max-w-2xl mx-auto">
                    {/* Glow behind */}
                    <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full transform scale-90 group-hover:scale-110 transition-transform duration-700"></div>
                    
                    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-700 delay-200 fill-mode-both transform transition-all duration-500 hover:rotate-x-2 hover:scale-[1.01] hover:shadow-3xl preserve-3d">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--veristiq-slate)] text-white px-4 py-1.5 rounded-full border-4 border-white text-xs font-bold shadow-md uppercase tracking-wider z-20">Example Report</div>
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>
                        
                        <div className="space-y-6 text-left font-mono text-sm text-[var(--veristiq-slate)] relative z-0">
                            <div className="border-b border-gray-100 pb-4 flex justify-between items-end">
                                <div>
                                    <div className="font-bold text-lg mb-1">COMPETITION COMPLIANCE REPORT</div>
                                    <div className="text-xs text-gray-400">ID: CMP-2025-8921-X</div>
                                </div>
                                <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-md border border-gray-100">Generated: 2025-06-12</div>
                            </div>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                <div className="flex justify-between border-b border-gray-50 pb-1">
                                    <span className="text-gray-500">Total Entries:</span>
                                    <span className="font-semibold">14,203</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-50 pb-1">
                                    <span className="text-gray-500">Free Entries:</span>
                                    <span className="font-semibold">492 (3.4%)</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-50 pb-1">
                                    <span className="text-gray-500">Paid Entries:</span>
                                    <span className="font-semibold">13,711</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-50 pb-1">
                                    <span className="text-gray-500">Ticket Cap Met:</span>
                                    <span className="font-semibold text-green-600">No</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-xs uppercase">Draw Method</span>
                                    <span className="font-semibold">Veristiq RNG (SHA-256 Seed)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-xs uppercase">Winner Ticket</span>
                                    <span className="font-semibold bg-yellow-100 px-2 rounded text-yellow-800">#8921</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                                    <span className="text-gray-500 text-xs uppercase">Verification</span>
                                    <div className="flex items-center gap-1.5 text-green-600 font-bold">
                                        <CheckCircle2 className="w-4 h-4" />
                                        PASSED
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
         </section>

         {/* Disclaimer */}
         <section className="py-12 bg-white border-t border-gray-100">
             <div className="container mx-auto px-6 max-w-3xl">
                 <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100 text-sm text-blue-900 leading-relaxed flex gap-4">
                     <AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                     <div>
                        <strong>Important Note:</strong> Veristiq supports — but does not replace — operator obligations under relevant regulations. Veristiq is a third-party, operator-neutral verification service. Operators remain responsible for eligibility checks, age verification, and consumer protection measures.
                     </div>
                 </div>
             </div>
         </section>

         {/* CTA */}
         <section className="py-24 bg-[var(--veristiq-slate)] text-white text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>
            <div className="container mx-auto px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay ahead of regulation</h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                    The Voluntary Code sets a new expectation: operators must be able to demonstrate fairness with evidence. Veristiq ensures every draw is independently verifiable — before anyone asks.
                </p>
                <Link href="/operator/register">
                    <Button className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white px-8 py-6 text-lg h-auto shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:scale-105">
                        Get Compliant Today
                    </Button>
                </Link>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
