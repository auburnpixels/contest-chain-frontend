"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Terminal, Lock, Shield, Zap, CheckCircle2, ArrowRight, Book, Trophy, Hash, GitBranch, FileCheck, Copy, Check, Users, Code } from "lucide-react";
import { useState } from "react";

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
              <li><a href="#operator-overview" className="block pl-4 text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] hover:border-l-2 hover:border-[var(--veristiq-primary-blue)] transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Operator Overview</a></li>
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

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
            <h4 className="font-bold text-blue-900 text-sm mb-2">Need help?</h4>
            <p className="text-xs text-blue-700 mb-3">Join our community or contact support for integration assistance.</p>
            <Link href="/contact" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center">
                Contact Support <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">

            {/* Role Switch Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                <a href="#operator-overview">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                        <Users className="w-4 h-4 mr-2" />
                        I&apos;m an Operator
                    </Button>
                </a>
                <a href="#quickstart">
                    <Button size="lg" className="w-full sm:w-auto bg-[var(--veristiq-primary-blue)] hover:bg-blue-700">
                        <Code className="w-4 h-4 mr-2" />
                        I&apos;m a Developer
                    </Button>
                </a>
            </div>

            {/* For Operators Block */}
            <section className="scroll-mt-32">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-200">
                    <CardContent className="p-6 sm:p-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-3">For Operators (non-technical)</h3>
                                <p className="text-gray-600 mb-4">
                                    You do not need to understand or manage the cryptography or draw mechanics shown below.
                                </p>
                                <p className="text-gray-600 mb-4">
                                    Veristiq operates independently of your platform. Your team (or agency) sends us draw inputs, and we:
                                </p>
                                <ul className="space-y-2 mb-4">
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                                        execute the draw independently
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                                        record immutable proof of what happened
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                                        publish a public verification page
                                    </li>
                                </ul>
                                <p className="text-gray-600 mb-4">
                                    <strong>Your responsibility</strong> remains ticket sales, competition rules, and prize fulfilment.<br />
                                    <strong>Veristiq&apos;s responsibility</strong> is verification and evidence.
                                </p>
                                <p className="text-sm text-gray-500">
                                    If you&apos;d like to discuss suitability rather than integration, <Link href="/contact" className="text-blue-600 hover:underline font-medium">contact us</Link>.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Operator Overview */}
            <section id="operator-overview" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] mb-6">Operator Overview</h2>
                
                <Card className="bg-amber-50/50 border-amber-200 mb-6">
                    <CardContent className="p-4">
                        <p className="text-amber-800 font-medium text-sm">
                            Veristiq is not a competition platform, marketplace, or operator tool — it exists solely to verify and evidence draws independently.
                        </p>
                    </CardContent>
                </Card>

                <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed">
                    <p className="text-lg mb-4">
                        Veristiq is an independent verification layer — not a competition platform, marketplace, or operator tool.
                    </p>
                    <p className="text-lg mb-6">
                        It is designed to solve a specific problem: <strong>providing third-party, tamper-evident evidence that a draw was conducted fairly.</strong>
                    </p>
                    <p className="mb-4">In practice:</p>
                    <ul className="space-y-2 mb-6">
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></div>
                            Veristiq does not sell tickets
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></div>
                            Veristiq does not control competition rules
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></div>
                            Veristiq cannot alter outcomes
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></div>
                            Veristiq cannot retroactively modify records
                        </li>
                    </ul>
                    <p className="mb-4">
                        All draw data is recorded immutably and can be independently verified by anyone using the public audit page for that draw.
                    </p>
                    <p className="text-gray-500 italic">
                        Most operators integrate Veristiq via their existing developer or agency.
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section id="introduction" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] mb-6">Technical Introduction</h2>
                <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed">
                    <p className="text-lg">
                        Veristiq provides a &quot;Fairness-as-a-Service&quot; layer for your gaming or competition platform. 
                        By integrating our API, you delegate random winner selection and audit logging to an independent third party.
                    </p>
                    <p className="mt-4">
                        Draws are executed using a cryptographically secure random process, producing verifiable proof that cannot be altered after the fact.
                        This separation of concerns is crucial for regulatory compliance (like the DCMS Voluntary Code) and builds trust with your user base.
                    </p>
                    <p className="mt-4">
                        You keep your user data and payment logic; we only store anonymized references and cryptographic proofs.
                    </p>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl border border-slate-200/60">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                            <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-[var(--veristiq-slate)] mb-1">Privacy First</h4>
                        <p className="text-sm text-gray-500">No personal data stored. Only anonymized references.</p>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl border border-slate-200/60">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                            <Lock className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-[var(--veristiq-slate)] mb-1">Cryptographically Secure</h4>
                        <p className="text-sm text-gray-500">Tamper-proof random selection.</p>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl border border-slate-200/60">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                            <FileCheck className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-[var(--veristiq-slate)] mb-1">Fully Auditable</h4>
                        <p className="text-sm text-gray-500">Public verification for every draw.</p>
                    </div>
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
                            <p className="text-gray-600 text-sm mb-3">Define your competition parameters. This establishes the &quot;container&quot; for entries and the rules for the draw.</p>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="font-mono text-xs bg-blue-50 text-blue-700 border-blue-200">POST /competitions</Badge>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-[var(--veristiq-primary-blue)] text-[var(--veristiq-primary-blue)] rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-[var(--veristiq-primary-blue)] group-hover:text-white transition-all z-10">2</div>
                            <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-2">Log Entries</h3>
                            <p className="text-gray-600 text-sm mb-3">As users buy tickets, stream them to Veristiq. We verify eligibility and hash them instantly.</p>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="font-mono text-xs bg-blue-50 text-blue-700 border-blue-200">POST /competitions/{'{id}'}/entries</Badge>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-[var(--veristiq-primary-blue)] text-[var(--veristiq-primary-blue)] rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-[var(--veristiq-primary-blue)] group-hover:text-white transition-all z-10">3</div>
                            <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-2">Execute Draw</h3>
                            <p className="text-gray-600 text-sm mb-3">When the timer ends, trigger the draw. Our CSPRNG engine selects a winner from the hashed pool.</p>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="font-mono text-xs bg-blue-50 text-blue-700 border-blue-200">POST /competitions/{'{id}'}/draws/run</Badge>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-[var(--veristiq-primary-blue)] text-[var(--veristiq-primary-blue)] rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-[var(--veristiq-primary-blue)] group-hover:text-white transition-all z-10">4</div>
                            <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-2">Display Proof</h3>
                            <p className="text-gray-600 text-sm mb-3">Get the public audit URL. Embed this link in your &quot;Winner&quot; announcement.</p>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="font-mono text-xs text-blue-700 border-blue-200 bg-blue-50">GET /competitions/{'{id}'}/audits</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[var(--veristiq-slate)] rounded-xl overflow-hidden shadow-2xl border border-[var(--veristiq-slate-light)] sticky top-32">
                        <div className="flex items-center px-4 py-3 bg-black/20 border-b border-white/10">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                            </div>
                            <div className="ml-4 text-xs text-gray-400 font-mono">workflow.ts</div>
                        </div>
                        <div className="p-6 overflow-x-auto">
<pre className="text-sm font-mono leading-relaxed">
<span className="text-gray-500">// Step 1: Create competition</span>
{'\n'}<span className="text-blue-400">const</span> <span className="text-gray-300">competition</span> <span className="text-gray-400">=</span> <span className="text-blue-400">await</span> <span className="text-gray-300">veristiq.</span><span className="text-blue-400">post</span><span className="text-gray-400">(</span><span className="text-emerald-400">&quot;/competitions&quot;</span><span className="text-gray-400">,</span> <span className="text-gray-400">&#123;</span>
{'\n'}  <span className="text-blue-400">external_id</span><span className="text-gray-400">:</span> <span className="text-emerald-400">&quot;COMP_001&quot;</span><span className="text-gray-400">,</span>
{'\n'}  <span className="text-blue-400">name</span><span className="text-gray-400">:</span> <span className="text-emerald-400">&quot;Summer Giveaway&quot;</span><span className="text-gray-400">,</span>
{'\n'}  <span className="text-blue-400">max_tickets</span><span className="text-gray-400">:</span> <span className="text-amber-400">5000</span>
{'\n'}<span className="text-gray-400">&#125;);</span>
{'\n'}
{'\n'}<span className="text-gray-500">// Step 2: On ticket sale...</span>
{'\n'}<span className="text-blue-400">await</span> <span className="text-gray-300">veristiq.</span><span className="text-blue-400">post</span><span className="text-gray-400">(</span><span className="text-emerald-400">`/competitions/$&#123;competition.id&#125;/entries`</span><span className="text-gray-400">,</span> <span className="text-gray-400">&#123;</span>
{'\n'}  <span className="text-blue-400">external_id</span><span className="text-gray-400">:</span> <span className="text-emerald-400">&quot;TXN_12345&quot;</span><span className="text-gray-400">,</span>
{'\n'}  <span className="text-blue-400">user_reference</span><span className="text-gray-400">:</span> <span className="text-emerald-400">&quot;USER_789&quot;</span><span className="text-gray-400">,</span>
{'\n'}  <span className="text-blue-400">eligible</span><span className="text-gray-400">:</span> <span className="text-purple-400">true</span>
{'\n'}<span className="text-gray-400">&#125;);</span>
{'\n'}
{'\n'}<span className="text-gray-500">// Step 3: At draw time...</span>
{'\n'}<span className="text-blue-400">const</span> <span className="text-gray-300">result</span> <span className="text-gray-400">=</span> <span className="text-blue-400">await</span> <span className="text-gray-300">veristiq.</span><span className="text-blue-400">post</span><span className="text-gray-400">(</span><span className="text-emerald-400">`/competitions/$&#123;competition.id&#125;/draws/run`</span><span className="text-gray-400">);</span>
{'\n'}
{'\n'}<span className="text-gray-500">// Step 4: Get audit URL</span>
{'\n'}<span className="text-gray-300">console.</span><span className="text-blue-400">log</span><span className="text-gray-400">(</span><span className="text-gray-300">result.audit_url</span><span className="text-gray-400">);</span>
{'\n'}<span className="text-gray-500">// → https://veristiq.com/audit/8f92...</span>
</pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-[var(--veristiq-slate)]">Authentication</h2>
                </div>
                <Card className="bg-white border-gray-200 shadow-sm">
                    <CardContent className="p-6 space-y-6">
                        <p className="text-gray-600">
                            All API requests must be authenticated using Bearer tokens. 
                            You can generate API keys in your <Link href="/operator/dashboard" className="text-blue-600 hover:underline font-medium">Operator Dashboard</Link>.
                        </p>
                        <CodeBlock code={`Authorization: Bearer your_api_key
Content-Type: application/json`} />
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-lg border border-slate-200/60">
                                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                        <Shield className="w-3.5 h-3.5 text-blue-600" />
                                    </div>
                                    Live Keys
                                </h4>
                                <p className="text-xs text-gray-500">Full access to production. Keep confidential. Server-side only.</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-lg border border-slate-200/60">
                                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                        <Zap className="w-3.5 h-3.5 text-blue-600" />
                                    </div>
                                    Test Keys
                                </h4>
                                <p className="text-xs text-gray-500">Sandbox environment for development. No real draws processed.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <hr className="border-gray-100" />

            {/* Core Concepts */}
            <section id="concepts" className="space-y-16">
                
                {/* Competitions */}
                <div id="competitions" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)]">Competitions</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        A Competition is the core container for your raffle or giveaway. It defines the rules, ticket limits, 
                        prize structure, and scheduled draw time. Each competition has a unique <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">external_id</code> that you control.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <span className="font-bold block text-gray-800">Your IDs, Your Control</span>
                                <span className="text-gray-500">Use your own external_id to link competitions to your system.</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <span className="font-bold block text-gray-800">Multi-Prize Support</span>
                                <span className="text-gray-500">Create competitions with multiple prizes drawn sequentially.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Entries */}
                <div id="entries" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Hash className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)]">Entries & Hashing</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        We do not store PII (Personally Identifiable Information). When you submit an entry, you provide a reference (like an order ID or user ID). 
                        We immediately hash this reference so the original value cannot be recovered.
                    </p>

                    {/* Privacy Example */}
                    <Card className="bg-emerald-50/50 border-emerald-200 mb-6">
                        <CardContent className="p-5">
                            <h4 className="font-bold text-emerald-800 text-sm mb-3">Example</h4>
                            <p className="text-sm text-emerald-700 mb-3">Instead of submitting personal data, you provide a reference such as:</p>
                            <div className="bg-[var(--veristiq-slate)] rounded-lg p-4 overflow-x-auto">
<pre className="text-sm font-mono">
<span className="text-gray-400">&#123;</span>
{'\n'}  <span className="text-blue-400">&quot;external_id&quot;</span><span className="text-gray-400">:</span> <span className="text-emerald-400">&quot;order_847392&quot;</span><span className="text-gray-400">,</span>
{'\n'}  <span className="text-blue-400">&quot;user_reference&quot;</span><span className="text-gray-400">:</span> <span className="text-emerald-400">&quot;user_12345&quot;</span><span className="text-gray-400">,</span>
{'\n'}  <span className="text-blue-400">&quot;eligible&quot;</span><span className="text-gray-400">:</span> <span className="text-purple-400">true</span>
{'\n'}<span className="text-gray-400">&#125;</span>
</pre>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <span className="font-bold block text-gray-800">Privacy First</span>
                                <span className="text-gray-500">Your user data never leaves your system in raw form.</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <span className="font-bold block text-gray-800">Immutable Log</span>
                                <span className="text-gray-500">Once hashed and chained, entries cannot be altered or deleted.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Draws */}
                <div id="draws" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)]">The Draw Process</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Veristiq uses a cryptographically secure pseudo-random number generator (CSPRNG) seeded with high-entropy environmental noise.
                        The draw process is atomic and verifiable.
                    </p>
                    <Card className="border-gray-200 shadow-sm overflow-hidden">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                                <div className="p-6 text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Lock className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="text-lg font-bold text-[var(--veristiq-slate)] mb-1">1. Lock</div>
                                    <p className="text-sm text-gray-500">Entry pool is frozen. Final hash computed.</p>
                                </div>
                                <div className="p-6 text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Hash className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="text-lg font-bold text-[var(--veristiq-slate)] mb-1">2. Seed</div>
                                    <p className="text-sm text-gray-500">Entropy is gathered from external sources.</p>
                                </div>
                                <div className="p-6 text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="text-lg font-bold text-[var(--veristiq-slate)] mb-1">3. Select</div>
                                    <p className="text-sm text-gray-500">Winner index is calculated deterministically.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Audit Chain */}
                <div id="audits" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <GitBranch className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)]">Audit Chain</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Each draw produces a cryptographic audit record:
                    </p>
                    <ol className="space-y-3 mb-6 ml-1">
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-700 font-bold text-sm">1</span>
                            <span className="text-gray-600">Draw inputs and outcome are signed and hashed</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-700 font-bold text-sm">2</span>
                            <span className="text-gray-600">The record is linked to the previous draw</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-700 font-bold text-sm">3</span>
                            <span className="text-gray-600">The full chain is publicly verifiable</span>
                        </li>
                    </ol>
                    <p className="text-gray-600 leading-relaxed">
                        This makes outcomes <strong>tamper-evident</strong> and prevents retroactive modification.
                    </p>
                </div>

            </section>

            {/* Next Steps */}
            <section className="pt-8">
                <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6">Next Steps</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Link href="/api-reference" className="group">
                        <Card className="h-full hover:shadow-lg transition-all border-gray-200 group-hover:border-blue-200">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-3 group-hover:text-blue-600 transition-colors !text-lg">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                        <Terminal className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    API Reference
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">Explore endpoints, parameters, and response schemas for full integration.</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/compliance" className="group">
                        <Card className="h-full hover:shadow-lg transition-all border-gray-200 group-hover:border-blue-200">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-3 group-hover:text-blue-600 transition-colors !text-lg">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                        <Shield className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    Compliance Guide
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">Understand how Veristiq helps meet DCMS code requirements.</p>
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

// Code Block Component
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for non-JSON
  const highlightCode = (str: string) => {
    return '<span class="text-gray-300">' + str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(Authorization|Content-Type):/g, '</span><span class="text-blue-400">$1</span><span class="text-gray-400">:</span><span class="text-gray-300">')
      .replace(/\b(Bearer)\b/g, '</span><span class="text-blue-400">$1</span><span class="text-gray-300">')
      + '</span>';
  };

  return (
    <div className="bg-[var(--veristiq-slate)] rounded-lg p-5 overflow-x-auto shadow-inner relative group">
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <button 
          onClick={onCopy} 
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white"
        >
          {copied ? <Check className="w-4 h-4 text-blue-400" /> : <Copy className="w-4 h-4" />}
        </button>
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
        </div>
      </div>
      <pre className="text-sm font-mono leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
    </div>
  );
}
