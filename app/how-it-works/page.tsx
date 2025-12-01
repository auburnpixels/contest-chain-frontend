import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqBlock } from "@/components/marketing/FaqBlock";
import { Badge } from "@/components/ui/badge";
import { PenTool, Database, RefreshCw, FileCheck2, Check, Link as LinkIcon, ShieldCheck, Globe, Lock } from "lucide-react";

export default function HowItWorksPage() {
  const faqs = [
    {
      question: "Do I need to understand cryptography to use CAFAAS?",
      answer: "No. You just integrate the API and use the dashboard. The chain and hashing are handled internally — they’re there to protect you, not to give you extra work."
    },
    {
      question: "Can I see which entries were included in the draw?",
      answer: "Yes. CAFAAS keeps a clear record of total entries and eligible entries when the draw was run. You can cross-check that against your own system."
    },
    {
      question: "What happens if my system sends duplicate entries?",
      answer: "That’s up to your integration logic. CAFAAS will record whatever entries you send. We recommend you enforce uniqueness on your side using your external entry IDs."
    }
  ];

  const steps = [
      {
          title: "1. Create your competition",
          desc: "You register your competition and prizes with CAFAAS via the API or dashboard.",
          icon: PenTool
      },
      {
          title: "2. Submit entries",
          desc: "Paid and free entries are recorded in CAFAAS with eligibility markers.",
          icon: Database
      },
      {
          title: "3. Run the draw",
          desc: "When you trigger a draw, CAFAAS selects the winner based on a deterministic random process and logs every step.",
          icon: RefreshCw
      },
      {
          title: "4. Publish the audit",
          desc: "A public audit page is created with all the key details so anyone can verify the draw.",
          icon: FileCheck2
      }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      <main>
        <PageHero 
          title="How CAFAAS Works"
          headline="Under the hood: how CAFAAS keeps draws fair and verifiable."
          subheadline="Here’s a clear, operator-friendly explanation of what happens from the moment you create a competition to the moment a player checks the audit page."
        />

        {/* Section 1: High-level overview */}
        <section className="py-24 bg-zinc-900/30 border-y border-white/5">
            <div className="container px-4 md:px-6 mx-auto">
                <h2 className="text-3xl font-bold text-center text-white mb-16">Four simple stages</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="bg-black/40 p-6 rounded-2xl border border-white/10 shadow-sm hover:border-brand-cobalt/30 transition-colors flex flex-col items-center text-center group">
                            <div className="h-16 w-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 text-brand-cobalt border border-white/5 group-hover:scale-110 transition-transform">
                                <step.icon className="h-7 w-7" />
                            </div>
                            <h3 className="font-bold text-lg text-white mb-3">{step.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Section 2: Entries & eligibility */}
        <section className="py-24 bg-black">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                     <div className="flex-1">
                         <h2 className="text-3xl font-bold text-white mb-6">1. Recording entries and eligibility</h2>
                         <p className="text-zinc-400 mb-4">When a player enters your competition, you:</p>
                         <ul className="space-y-4 text-zinc-300 mb-8">
                             <li className="flex gap-3">
                                <div className="h-6 w-6 rounded-full bg-brand-cobalt/20 text-brand-cobalt flex items-center justify-center shrink-0 mt-0.5">1</div>
                                <span>create a ticket/entry in your own system</span>
                             </li>
                             <li className="flex gap-3">
                                <div className="h-6 w-6 rounded-full bg-brand-cobalt/20 text-brand-cobalt flex items-center justify-center shrink-0 mt-0.5">2</div>
                                <div>
                                    send a record to CAFAAS with:
                                    <ul className="pl-4 mt-2 space-y-2 text-sm text-zinc-500 border-l-2 border-zinc-800">
                                        <li>• your external entry ID</li>
                                        <li>• whether it was paid or free</li>
                                        <li>• whether the eligibility question was answered correctly</li>
                                        <li>• (optional) a user reference</li>
                                    </ul>
                                </div>
                             </li>
                         </ul>
                     </div>
                     <div className="flex-1 bg-zinc-900/50 p-8 rounded-2xl border border-white/10">
                         <h3 className="font-bold text-white mb-4">CAFAAS records:</h3>
                         <ul className="space-y-3 text-zinc-400 mb-8 text-sm">
                             <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-brand-cobalt" /> entry time</li>
                             <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-brand-cobalt" /> whether it is eligible for the draw</li>
                             <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-brand-cobalt" /> the internal ticket number used for selection</li>
                             <li className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-brand-cobalt" /> links to the competition and operator</li>
                         </ul>
                         <div className="bg-brand-cobalt/5 p-5 rounded-xl border border-brand-cobalt/20">
                             <h4 className="font-bold text-brand-cobalt mb-3 text-xs uppercase tracking-wider">This gives you:</h4>
                             <ul className="space-y-2 text-sm text-zinc-300">
                                 <li>• a clear list of all entries</li>
                                 <li>• a clear separation between eligible and ineligible entries</li>
                                 <li>• a fair pool to draw from when the competition closes</li>
                             </ul>
                         </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Section 3: The draw process */}
        <section className="py-24 bg-zinc-900/30 border-y border-white/5">
             <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                 <h2 className="text-3xl font-bold text-white mb-12 text-center">2. How the draw itself works</h2>
                 
                 <div className="grid gap-4">
                     {[
                         { title: "1. The eligible pool is locked", desc: "CAFAAS takes a snapshot of all the eligible entries at that moment." },
                         { title: "2. The entry pool is hashed", desc: "CAFAAS creates a hash of the entries pool so any later change would be detectable." },
                         { title: "3. A random seed is generated", desc: "CAFAAS generates a random seed, records it, and stores the hash of that seed." },
                         { title: "4. The winner is selected", desc: "Using the seed and the entries list, CAFAAS deterministically chooses a winning entry." },
                         { title: "5. An audit record is created", desc: "The result, seed hash, entry pool hash, and metadata are stored as a new event in the chain." },
                         { title: "6. The audit page is published", desc: "A public URL shows the details in a clean, human-readable format." }
                     ].map((item, i) => (
                         <div key={i} className="flex gap-6 p-6 bg-black/40 rounded-xl border border-white/10 items-center">
                             <div className="shrink-0 h-10 w-10 bg-zinc-900 rounded-full flex items-center justify-center font-bold text-zinc-500 text-sm border border-white/5">
                                 {i + 1}
                             </div>
                             <div>
                                 <h3 className="font-bold text-white mb-1">{item.title}</h3>
                                 <p className="text-zinc-400 text-sm">{item.desc}</p>
                             </div>
                         </div>
                     ))}
                 </div>

                 <div className="mt-12 text-center">
                     <p className="text-xl font-bold text-white">
                        You don’t see a black box. <br/>
                        <span className="text-brand-cobalt">You see a repeatable, auditable process.</span>
                     </p>
                 </div>
             </div>
        </section>

        {/* Section 4: The hash chain */}
        <section className="py-24 bg-black">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                 <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <div className="h-14 w-14 bg-brand-cobalt/10 rounded-2xl flex items-center justify-center mb-8 text-brand-cobalt border border-brand-cobalt/20">
                            <LinkIcon className="h-7 w-7" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6">3. What the “hash chain” actually means</h2>
                        <p className="text-zinc-400 mb-6 leading-relaxed">
                            Every significant event in a competition’s lifecycle (and draw lifecycle) is turned into a JSON-like record and:
                        </p>
                        <ul className="space-y-3 text-zinc-300 mb-8">
                            <li className="flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-brand-cobalt" />
                                Hashed using a cryptographic function (e.g. SHA-256)
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-brand-cobalt" />
                                Linked to the hash of the previous event
                            </li>
                        </ul>
                        <p className="text-zinc-400 mb-6 leading-relaxed">
                            So each event contains:
                        </p>
                        <ul className="space-y-2 text-zinc-500 text-sm font-mono bg-zinc-900/50 p-4 rounded-lg border border-white/5">
                            <li>&#123;</li>
                            <li className="pl-4">"data": &#123; ... &#125;,</li>
                            <li className="pl-4">"previous_hash": "a1b2...",</li>
                            <li className="pl-4">"hash": "c3d4..."</li>
                            <li>&#125;</li>
                        </ul>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-zinc-900 to-black text-white p-8 rounded-2xl border border-white/10 shadow-2xl">
                        <h3 className="font-mono text-lg text-brand-cobalt mb-4">Integrity Check</h3>
                        <p className="font-mono text-sm text-zinc-400 mb-8 leading-relaxed">
                            This creates a chain. If any event in the middle is modified later, all subsequent hashes no longer match — the chain breaks and the integrity check fails.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm bg-black/40 p-3 rounded-lg border border-white/5">
                                <ShieldCheck className="h-5 w-5 text-green-500" />
                                <span className="text-zinc-300">draws can’t quietly be rewritten</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm bg-black/40 p-3 rounded-lg border border-white/5">
                                <ShieldCheck className="h-5 w-5 text-green-500" />
                                <span className="text-zinc-300">entries can’t silently disappear</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm bg-black/40 p-3 rounded-lg border border-white/5">
                                <ShieldCheck className="h-5 w-5 text-green-500" />
                                <span className="text-zinc-300">audits can’t be edited after the fact</span>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </section>

        {/* Section 5: Public audit pages */}
        <section className="py-24 bg-zinc-900/30 border-y border-white/5">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center text-white mb-12">4. What players and regulators actually see</h2>
                <div className="grid md:grid-cols-2 gap-8">
                     <div className="bg-black/40 p-8 rounded-2xl border border-white/10 hover:border-brand-cobalt/30 transition-colors">
                         <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
                            <FileCheck2 className="h-5 w-5 text-brand-cobalt" />
                            Audit Data Points
                         </h3>
                         <ul className="space-y-3 text-zinc-400 text-sm">
                             <li className="border-b border-white/5 pb-2">Competition & Prize Details</li>
                             <li className="border-b border-white/5 pb-2">Operator Identity</li>
                             <li className="border-b border-white/5 pb-2">Total & Eligible Entry Counts</li>
                             <li className="border-b border-white/5 pb-2">Winner Entry ID + Ticket Number</li>
                             <li className="border-b border-white/5 pb-2">Exact Timestamp (UTC)</li>
                             <li className="border-b border-white/5 pb-2 font-mono text-xs">Seed Hash (SHA-256)</li>
                             <li className="border-b border-white/5 pb-2 font-mono text-xs">Entry Pool Hash (SHA-256)</li>
                             <li className="font-mono text-xs text-brand-cobalt">Chain Signature Hash</li>
                         </ul>
                     </div>
                     <div className="bg-black/40 p-8 rounded-2xl border border-white/10 hover:border-brand-cobalt/30 transition-colors">
                         <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-green-500" />
                            Plain English Verification
                         </h3>
                         <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 text-green-500">
                                    <Check className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">When did you run the draw?</p>
                                    <p className="text-xs text-zinc-500 mt-1">Confirmed by timestamp</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 text-green-500">
                                    <Check className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">Was the pool frozen?</p>
                                    <p className="text-xs text-zinc-500 mt-1">Confirmed by pool hash</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 text-green-500">
                                    <Check className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">Was it truly random?</p>
                                    <p className="text-xs text-zinc-500 mt-1">Confirmed by seed generation</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 text-green-500">
                                    <Check className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">Is the chain intact?</p>
                                    <p className="text-xs text-zinc-500 mt-1">Confirmed by signature links</p>
                                </div>
                            </div>
                         </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Section 6: Chain verification */}
        <section className="py-24 bg-black">
             <div className="container px-4 md:px-6 mx-auto max-w-3xl text-center">
                 <div className="h-20 w-20 bg-brand-cobalt/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-cobalt/20">
                     <Lock className="h-8 w-8 text-brand-cobalt" />
                 </div>
                 <h2 className="text-3xl font-bold text-white mb-6">5. Chain verification</h2>
                 <p className="text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                     CAFAAS can run integrity checks that walk through each event in the chain, re-calculate hashes, and confirm that nothing has been altered.
                     In future, this can be exposed to regulators, trusted third parties, and possibly operators themselves.
                 </p>
                 <div className="bg-zinc-900/50 p-10 rounded-2xl border border-white/10 inline-block">
                     <h3 className="font-bold text-xl text-white mb-2">The key idea:</h3>
                     <p className="text-zinc-300 text-lg">
                         Your fairness doesn’t live in a private log file. <br/>
                         <span className="text-brand-cobalt">It lives in a chain of events designed to show tampering.</span>
                     </p>
                 </div>
             </div>
        </section>

        <FaqBlock faqs={faqs} title="How it works – mini FAQ" />
      </main>
      <SiteFooter />
    </div>
  );
}
