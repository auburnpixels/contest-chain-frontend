import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, ShieldCheck, CheckCircle2, AlertTriangle, Check } from "lucide-react";
import Link from "next/link";

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-20 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
            <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                 <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
                    <Scale className="w-8 h-8 text-[var(--veristiq-teal)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Built for DCMS Alignment</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                    The competition landscape is changing. Veristiq helps you meet the upcoming voluntary code standards for transparency and accountability.
                </p>
                <Link href="/operator/register">
                    <Button className="bg-white text-[var(--veristiq-slate)] hover:bg-gray-100 font-bold px-8 py-6 text-lg h-auto shadow-xl transition-all hover:-translate-y-0.5">
                        Start Auditing Draws
                    </Button>
                </Link>
            </div>
        </section>

        {/* The Problem */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-6xl">
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-in fade-in slide-in-from-left-8 duration-700 delay-100 fill-mode-both">
                        <h2 className="text-3xl font-bold mb-6">The "Black Box" Problem</h2>
                        <p className="text-lg text-[var(--veristiq-slate-light)] mb-6 leading-relaxed">
                            Regulators and players are increasingly skeptical of "screen recorded" draws. A video proves nothing about the underlying database. 
                            Did you include all entries? Did you remove anyone unfairly? Was the random generator truly random?
                        </p>
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1 animate-pulse" />
                                <div>
                                    <h4 className="font-bold text-orange-800 mb-1">DCMS Warning</h4>
                                    <p className="text-sm text-orange-700">
                                        "Operators must be able to demonstrate that their draws are conducted fairly and in accordance with their terms."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-right-8 duration-700 delay-200 fill-mode-both hover:shadow-lg transition-all duration-300">
                         <h3 className="font-bold text-xl mb-6">Veristiq's Answer</h3>
                         <ul className="space-y-4">
                             <li className="flex gap-4 group">
                                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 group-hover:scale-110 transition-transform">
                                     <Check className="w-5 h-5" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold">Independent Verification</h4>
                                     <p className="text-sm text-gray-500">Third-party record of every event.</p>
                                 </div>
                             </li>
                             <li className="flex gap-4 group">
                                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 group-hover:scale-110 transition-transform">
                                     <Check className="w-5 h-5" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold">Immutable History</h4>
                                     <p className="text-sm text-gray-500">Cryptographic chain prevents retro-active editing.</p>
                                 </div>
                             </li>
                             <li className="flex gap-4 group">
                                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 group-hover:scale-110 transition-transform">
                                     <Check className="w-5 h-5" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold">Public Accountability</h4>
                                     <p className="text-sm text-gray-500">Winners and draw logic are public by default.</p>
                                 </div>
                             </li>
                         </ul>
                    </div>
                 </div>
            </div>
        </section>

        {/* DCMS Mapping */}
        <section className="py-20 bg-[var(--veristiq-snow)]">
            <div className="container mx-auto px-6 max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">Mapping to the Voluntary Code</h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                     {/* Transparency */}
                    <Card className="border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-6 h-6 text-[var(--veristiq-primary-blue)]" />
                                Transparency
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-500 mb-4">Code Requirement: Clear terms and accessible results.</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span>Public audit pages for every draw</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span>Clear winner publication</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span>Accessible draw timestamps</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Accountability */}
                    <Card className="border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-[var(--veristiq-primary-blue)]" />
                                Accountability
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-500 mb-4">Code Requirement: Proof of fair administration.</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span>Provably fair RNG</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span>Tamper-evident logs</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span>Separation of paid/free entries</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                     {/* Player Protection */}
                     <Card className="border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Scale className="w-6 h-6 text-[var(--veristiq-primary-blue)]" />
                                Compliance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-500 mb-4">Code Requirement: Robust complaints and limits.</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span>Complaint logging system</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span>Ticket cap enforcement</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span>Data retention policies</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

         {/* Example Report */}
         <section className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                 <h2 className="text-3xl font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">Automated Compliance Reporting</h2>
                 <p className="text-[var(--veristiq-slate-light)] mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
                     Generate PDF compliance reports for any competition with one click. Ready for your annual return or regulator requests.
                 </p>
                 <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-2xl mx-auto max-w-2xl relative animate-in fade-in zoom-in-95 duration-700 delay-200 fill-mode-both hover:shadow-3xl transition-shadow">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 rounded-full border border-gray-200 text-xs font-bold shadow-sm uppercase">Example Report</div>
                     <div className="space-y-4 text-left font-mono text-sm text-[var(--veristiq-slate)]">
                         <div className="border-b border-gray-200 pb-2">
                             <div className="font-bold">COMPETITION COMPLIANCE REPORT</div>
                             <div className="text-xs text-gray-500">Generated: 2025-06-12</div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                             <div>Total Entries: 14,203</div>
                             <div>Free Entries: 492 (3.4%)</div>
                             <div>Paid Entries: 13,711</div>
                             <div>Ticket Cap Met: No</div>
                         </div>
                         <div className="pt-2 border-t border-gray-200">
                             <div>Draw Method: Veristiq RNG (SHA-256 Seed)</div>
                             <div>Winner Ticket: #8921</div>
                             <div>Result Verified: YES</div>
                         </div>
                     </div>
                 </div>
            </div>
         </section>

         {/* CTA */}
         <section className="py-24 bg-[var(--veristiq-slate)] text-white text-center">
            <div className="container mx-auto px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay ahead of regulation</h2>
                <p className="text-xl text-gray-300 mb-10">Don't wait for the Gambling Commission to ask for proof.</p>
                <Link href="/operator/register">
                    <Button className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white px-8 py-6 text-lg h-auto shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
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
