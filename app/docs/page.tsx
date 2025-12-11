"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Terminal, Lock, Database, RefreshCw, FileText, Webhook, ChevronRight, Book, Shield, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[var(--veristiq-slate)] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

         <div className="container mx-auto px-6 text-center relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                <Book className="w-8 h-8 text-[var(--veristiq-primary-blue)]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
               Developer Documentation
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
               Integrate fairness in minutes. A simple REST API to handle all your compliance and audit needs. You handle the ticket sales, we handle the proof.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link href="/api-reference">
                   <Button size="lg" className="bg-white text-[var(--veristiq-slate)] hover:bg-gray-100 rounded-lg h-14 px-8 font-semibold shadow-lg hover:-translate-y-0.5 transition-all">
                     <Terminal className="mr-2 h-4 w-4" />
                     API Reference
                   </Button>
               </Link>
               <Link href="https://github.com/veristiq" target="_blank">
                   <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-lg h-14 px-8 font-semibold hover:-translate-y-0.5 transition-all">
                     <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5 fill-current" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
                     SDKs & Libraries
                   </Button>
               </Link>
            </div>
         </div>
      </section>

      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 items-start max-w-7xl">
        
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:block w-64 sticky top-28 shrink-0 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
          <div className="space-y-4">
            <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4 border-l-2 border-transparent">
                Overview
            </h3>
            <ul className="space-y-1 border-l border-gray-200">
              <li><a href="#introduction" className="block pl-4 text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] hover:border-l-2 hover:border-[var(--veristiq-primary-blue)] transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Introduction</a></li>
              <li><a href="#quickstart" className="block pl-4 text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] hover:border-l-2 hover:border-[var(--veristiq-primary-blue)] transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Quickstart</a></li>
              <li><a href="#authentication" className="block pl-4 text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] hover:border-l-2 hover:border-[var(--veristiq-primary-blue)] transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Authentication</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4 border-l-2 border-transparent">
                Core Concepts
            </h3>
            <ul className="space-y-1 border-l border-gray-200">
              <li><a href="#competitions" className="block pl-4 text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] hover:border-l-2 hover:border-[var(--veristiq-primary-blue)] transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Competitions</a></li>
              <li><a href="#entries" className="block pl-4 text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] hover:border-l-2 hover:border-[var(--veristiq-primary-blue)] transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Entries & Hashing</a></li>
              <li><a href="#draws" className="block pl-4 text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] hover:border-l-2 hover:border-[var(--veristiq-primary-blue)] transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">The Draw Process</a></li>
              <li><a href="#audits" className="block pl-4 text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] hover:border-l-2 hover:border-[var(--veristiq-primary-blue)] transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Audit Chain</a></li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h4 className="font-bold text-blue-900 text-sm mb-2">Need help?</h4>
            <p className="text-xs text-blue-700 mb-3">Join our community or contact support for integration assistance.</p>
            <Link href="/contact" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center">
                Contact Support <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] mb-6">Introduction</h2>
                <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed">
                    <p className="text-lg">
                        Veristiq provides a "Fairness-as-a-Service" layer for your gaming or competition platform. 
                        By integrating our API, you delegate the critical task of random winner selection and audit logging to an independent third party.
                    </p>
                    <p className="mt-4">
                        This separation of concerns is crucial for regulatory compliance (like the DCMS Voluntary Code) and builds trust with your user base.
                        You keep your user data and payment logic; we only store anonymized entry hashes and cryptographic proofs.
                    </p>
                </div>
            </section>

            {/* Quickstart */}
            <section id="quickstart" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] mb-8">Quickstart Guide</h2>
                
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-12 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-200">
                        {/* Step 1 */}
                        <div className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-[var(--veristiq-primary-blue)] text-[var(--veristiq-primary-blue)] rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-[var(--veristiq-primary-blue)] group-hover:text-white transition-all z-10">1</div>
                            <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-2">Create a Competition</h3>
                            <p className="text-gray-600 text-sm mb-3">Define your competition parameters. This establishes the "container" for entries and the rules for the draw.</p>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="font-mono text-xs">POST /competitions</Badge>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-[var(--veristiq-primary-blue)] text-[var(--veristiq-primary-blue)] rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-[var(--veristiq-primary-blue)] group-hover:text-white transition-all z-10">2</div>
                            <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-2">Log Entries</h3>
                            <p className="text-gray-600 text-sm mb-3">As users buy tickets, stream them to Veristiq. We verify eligibility and hash them instantly.</p>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="font-mono text-xs">POST /entries</Badge>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-[var(--veristiq-primary-blue)] text-[var(--veristiq-primary-blue)] rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-[var(--veristiq-primary-blue)] group-hover:text-white transition-all z-10">3</div>
                            <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-2">Execute Draw</h3>
                            <p className="text-gray-600 text-sm mb-3">When the timer ends, trigger the draw. Our CSPRNG engine selects a winner from the hashed pool.</p>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="font-mono text-xs">POST /draws/run</Badge>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-green-500 text-green-600 rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-green-500 group-hover:text-white transition-all z-10">4</div>
                            <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-2">Display Proof</h3>
                            <p className="text-gray-600 text-sm mb-3">Get the public audit URL. Embed this link in your "Winner" announcement.</p>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="font-mono text-xs text-green-700 border-green-200 bg-green-50">GET /audits</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[var(--veristiq-slate)] rounded-xl overflow-hidden shadow-2xl border border-[var(--veristiq-slate-light)] sticky top-32">
                        <div className="flex items-center px-4 py-3 bg-black/20 border-b border-white/10">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="ml-4 text-xs text-gray-400 font-mono">workflow.ts</div>
                        </div>
                        <div className="p-6 overflow-x-auto">
<pre className="text-sm font-mono text-gray-300 leading-relaxed">
<span className="text-pink-400">const</span> competition = <span className="text-pink-400">await</span> veristiq.competitions.<span className="text-blue-400">create</span>({`{
  name: "Summer Giveaway",
  max_tickets: 5000,
  draw_at: "2025-08-01T12:00:00Z"
}`});

<span className="text-gray-500">// On ticket sale...</span>
<span className="text-pink-400">await</span> veristiq.entries.<span className="text-blue-400">create</span>({`{
  competition_id: competition.id,
  user_reference: "user_123", 
  ticket_number: 105
}`});

<span className="text-gray-500">// At draw time...</span>
<span className="text-pink-400">const</span> result = <span className="text-pink-400">await</span> veristiq.draws.<span className="text-blue-400">run</span>(competition.id);

console.<span className="text-blue-400">log</span>(result.audit_url);
<span className="text-gray-500">// -&gt; https://veristiq.io/audit/8f92...</span>
</pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-[var(--veristiq-primary-blue)]"><Lock className="h-6 w-6" /></div>
                    <h2 className="text-2xl font-bold text-[var(--veristiq-slate)]">Authentication</h2>
                </div>
                <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                        <p className="text-gray-600 mb-4">
                            All API requests must be authenticated using Bearer tokens. 
                            You can generate API keys in your <Link href="/operator/dashboard" className="text-blue-600 hover:underline">Operator Dashboard</Link>.
                        </p>
                        <div className="bg-gray-100 rounded-md p-4 font-mono text-sm text-gray-800 border border-gray-200">
                            Authorization: Bearer sk_live_8923n98...
                        </div>
                        <div className="mt-6 flex gap-4">
                            <div className="flex-1 p-4 bg-[var(--veristiq-snow)] rounded-lg border border-gray-100">
                                <h4 className="font-bold text-sm mb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-green-600" /> Secret Keys (sk_)</h4>
                                <p className="text-xs text-gray-500">Full access. Keep confidential. Use only on server-side.</p>
                            </div>
                            <div className="flex-1 p-4 bg-[var(--veristiq-snow)] rounded-lg border border-gray-100">
                                <h4 className="font-bold text-sm mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-blue-600" /> Public Keys (pk_)</h4>
                                <p className="text-xs text-gray-500">Read-only access to public audit data. Safe for client-side use.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <hr className="border-gray-100" />

            {/* Core Concepts */}
            <section id="concepts" className="space-y-12">
                
                <div id="entries" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Database className="h-6 w-6" /></div>
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)]">Entries & Hashing</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        We do not store PII (Personally Identifiable Information). When you submit an entry, you provide a `user_reference` (like a User ID or Email). 
                        We immediately generate a SHA-256 hash of this reference combined with the competition salt.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <span className="font-bold block text-gray-800">Privacy First</span>
                                <span className="text-gray-500">Your user data never leaves your system in raw form.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <span className="font-bold block text-gray-800">Immutable Log</span>
                                <span className="text-gray-500">Once hashed and chained, entries cannot be altered or deleted.</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div id="draws" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><RefreshCw className="h-6 w-6" /></div>
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)]">The Draw Process</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Veristiq uses a cryptographically secure pseudo-random number generator (CSPRNG) seeded with high-entropy environmental noise.
                        The draw process is atomic and verifiable.
                    </p>
                    <Card className="border-gray-200">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                                <div className="p-6 text-center">
                                    <div className="text-2xl font-bold text-[var(--veristiq-slate)] mb-1">1. Lock</div>
                                    <p className="text-xs text-gray-500">Entry pool is frozen. Final hash computed.</p>
                                </div>
                                <div className="p-6 text-center">
                                    <div className="text-2xl font-bold text-[var(--veristiq-slate)] mb-1">2. Seed</div>
                                    <p className="text-xs text-gray-500">Entropy is gathered from external sources.</p>
                                </div>
                                <div className="p-6 text-center">
                                    <div className="text-2xl font-bold text-[var(--veristiq-slate)] mb-1">3. Select</div>
                                    <p className="text-xs text-gray-500">Winner index is calculated deterministically.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </section>

            {/* Next Steps */}
            <section className="pt-8">
                <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">Next Steps</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Link href="/api-reference" className="group">
                        <Card className="h-full hover:shadow-lg transition-all border-gray-200 group-hover:border-blue-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                                    <Terminal className="w-5 h-5" /> API Reference
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">Explore endpoints, parameters, and response schemas.</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/compliance" className="group">
                        <Card className="h-full hover:shadow-lg transition-all border-gray-200 group-hover:border-blue-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                                    <Shield className="w-5 h-5" /> Compliance Guide
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">Understand how Veristiq helps meet the DCMS code.</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </section>

        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
