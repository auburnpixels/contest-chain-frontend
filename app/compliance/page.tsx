import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, ShieldCheck, CheckCircle2, AlertTriangle, Check, Lock, RefreshCw, Server } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "DCMS Compliance for Prize Competitions — Veristiq",
  description: "How Veristiq helps UK operators meet the DCMS voluntary code for prize competitions. Independent verification, audit trails, and regulator-ready evidence.",
  openGraph: {
    title: "DCMS Compliance for Prize Competitions — Veristiq",
    description: "How Veristiq helps operators meet the DCMS voluntary code with independent verification and audit trails.",
  },
};

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
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
                    Supporting Transparency Under the DCMS Voluntary Code
                </h1>

                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                    The DCMS Voluntary Code sets expectations around transparency, fairness, and accountability in prize draws. Veristiq provides independent technical verification and audit evidence that operators can use to support those expectations.
                </p>

                <Link href="/access">
                    <Button className="bg-white text-[var(--veristiq-slate)] hover:bg-gray-100 font-bold px-8 py-6 text-lg h-auto shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl">
                        Get Access
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
                    <div className="animate-in fade-in slide-in-from-left-8 duration-700 delay-100 fill-mode-both flex flex-col gap-6">
                        <h2 className="text-3xl font-bold text-[var(--veristiq-slate)]">
                            The Limitations of Opaque Draw Evidence
                        </h2>
                        <div className="flex flex-col gap-4">
                            <p className="text-[var(--veristiq-slate-light)] leading-relaxed">
                                Many competition draws are executed within private systems. While these systems are effective for operating competitions, they are not designed to produce independent, tamper-evident evidence if a draw outcome is later questioned.
                            </p>
                            <p className="text-[var(--veristiq-slate-light)] leading-relaxed">
                                Methods such as screen recordings or internal logs can show what occurred within an operator's interface, but they do not provide cryptographic proof of what happened at the underlying data level.
                            </p>
                            <p className="text-[var(--veristiq-slate-light)] leading-relaxed">
                                As regulatory expectations evolve, operators are increasingly expected to demonstrate how draw outcomes were generated using verifiable, independent records — not just internal assurances.
                            </p>
                        </div>

                        <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg shadow-sm">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1 animate-pulse" />
                                <div>
                                    <h4 className="font-bold text-orange-800 mb-1">DCMS Context</h4>
                                    <p className="text-sm text-orange-700 italic">
                                        Operators should be able to demonstrate that prize draws are conducted fairly and in accordance with their published terms, using evidence that can be reviewed if required.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[var(--veristiq-snow)] p-8 rounded-2xl border border-gray-200 animate-in fade-in slide-in-from-right-8 duration-700 delay-200 fill-mode-both hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--veristiq-primary-blue)]/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                         
                         <h3 className="font-bold text-xl mb-8 text-[var(--veristiq-slate)] relative z-10">Veristiq's Approach</h3>
                         <ul className="space-y-6 relative z-10">
                             <li className="flex gap-4 group/item">
                                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover/item:scale-110 group-hover/item:bg-blue-200 transition-all duration-300 shadow-sm">
                                     <Check className="w-5 h-5" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-lg mb-1 group-hover/item:text-blue-700 transition-colors">
                                         Independent Draw Verification
                                     </h4>
                                     <p className="text-sm text-gray-600">
                                         A third-party, operator-neutral audit record of each draw, designed to allow outcomes to be independently verified after execution.
                                     </p>
                                 </div>
                             </li>
                             <li className="flex gap-4 group/item">
                                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover/item:scale-110 group-hover/item:bg-blue-200 transition-all duration-300 shadow-sm">
                                     <Lock className="w-5 h-5" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-lg mb-1 group-hover/item:text-blue-700 transition-colors">
                                         Tamper-Evident Audit History
                                     </h4>
                                     <p className="text-sm text-gray-600">
                                         Draw events are recorded in a cryptographically linked sequence, making retroactive changes or selective removal detectable.
                                     </p>
                                 </div>
                             </li>
                             <li className="flex gap-4 group/item">
                                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover/item:scale-110 group-hover/item:bg-blue-200 transition-all duration-300 shadow-sm">
                                     <FileText className="w-5 h-5" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-lg mb-1 group-hover/item:text-blue-700 transition-colors">
                                         Publicly Accessible Evidence
                                     </h4>
                                     <p className="text-sm text-gray-600">
                                         Draw results and supporting audit data can be published to public audit pages, providing visibility beyond internal systems.
                                     </p>
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
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--veristiq-primary-blue)] to-transparent w-1/2 h-full animate-[shimmer_2s_infinite]"></div>
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
            <div className="container mx-auto px-6 max-w-7xl flex flex-col gap-10 ">
                <div className="max-w-3xl mx-auto flex flex-col gap-4">
                    <h2 className="text-3xl font-bold text-center animate-in fade-in slide-in-from-bottom-4 duration-700">Mapping to the Voluntary Code</h2>
                    <p className="text-lg text-center">
                        The following illustrates how Veristiq's technical verification capabilities can support specific transparency and accountability expectations outlined in the DCMS Voluntary Code.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {/* Transparency */}
                    <Card className="border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[var(--veristiq-primary-blue)]/30 transition-all duration-300 group">
                        <CardContent className="flex flex-col gap-4">
                            <CardTitle className="flex items-center gap-3 !text-xl group-hover:text-[var(--veristiq-primary-blue)] transition-colors">
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <FileText className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
                                </div>
                                Transparency
                            </CardTitle>
                            <p className="text-xs text-gray-500">"Operators must record and publish clear draw outcomes..."</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>Public audit pages</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>Winner publication</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>Draw timestamps</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Draw Methodology */}
                    <Card className="border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[var(--veristiq-primary-blue)]/30 transition-all duration-300 group">
                        <CardContent className="flex flex-col gap-4">
                            <CardTitle className="flex items-center gap-3 !text-xl group-hover:text-[var(--veristiq-primary-blue)] transition-colors">
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <RefreshCw className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
                                </div>
                                Methodology
                            </CardTitle>
                            <p className="text-xs text-gray-500">"Draws must be random and verifiable..."</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>Documented and reproducible draw methodology</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>Chain-anchored execution</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>Algorithm inputs logged</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Accountability */}
                    <Card className="border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[var(--veristiq-primary-blue)]/30 transition-all duration-300 group">
                        <CardContent className="flex flex-col gap-4">
                            <CardTitle className="flex items-center gap-3 !text-xl group-hover:text-[var(--veristiq-primary-blue)] transition-colors">
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <ShieldCheck className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
                                </div>
                                Accountability
                            </CardTitle>
                            <p className="text-xs text-gray-500">"Operators must demonstrate fair administration..."</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>Third-party verifiable audit records</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>Tamper-evident logs</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>Paid/Free entry separation</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                     {/* Compliance */}
                     <Card className="border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[var(--veristiq-primary-blue)]/30 transition-all duration-300 group">
                         <CardContent className="flex flex-col gap-4">
                             <CardTitle className="flex items-center gap-3 !text-xl group-hover:text-[var(--veristiq-primary-blue)] transition-colors">
                                 <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                     <Scale className="w-5 h-5 text-[var(--veristiq-primary-blue)]" />
                                 </div>
                                 Compliance
                             </CardTitle>
                            <p className="text-xs text-gray-500">"Robust complaints handling and limits..."</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>Complaint logging</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>Ticket cap enforcement</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <span>Data retention policy</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

         {/* Disclaimer */}
         <section className="pb-12 bg-white">
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
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Understand evolving regulatory expectations</h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                    The Voluntary Code sets a new expectation: operators must be able to demonstrate fairness with evidence. Veristiq makes each draw independently verifiable, with evidence available if required.
                </p>
                <Link href="/access">
                    <Button className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white px-8 py-6 text-lg h-auto shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:scale-105">
                        Get Access
                    </Button>
                </Link>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
