import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqBlock } from "@/components/marketing/FaqBlock";
import { Check, ExternalLink, Calendar, Hash, ShieldCheck, UserCheck, Eye } from "lucide-react";

export default function AuditExamplePage() {
  const faqs = [
    {
      question: "Can I customise the look of the audit page?",
      answer: "Yes. Higher-tier plans allow you to add your logo, colours and eventually host audit pages on your own subdomain."
    },
    {
      question: "Will players see any personal data?",
      answer: "No. CAFAAS focuses on ticket IDs, entry counts and high-level draw details. Personal data about players stays in your system."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      <main>
        <PageHero 
          title="Example Audit"
          headline="See what a CAFAAS audit page looks like."
          subheadline="This is the kind of page your players, partners and regulators will see when you run a draw using CAFAAS. Clean, transparent, and focused on the facts."
        />

        {/* Section: Annotated layout / Mockup */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
             <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                 <div className="flex flex-col lg:flex-row gap-16 items-start">
                     {/* Left: Key Info */}
                     <div className="flex-1 space-y-12">
                         <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Key information at a glance</h2>
                         
                         <div className="space-y-8">
                             {[
                                 { title: "Competition details", desc: "Name, operator, prize information and draw status." },
                                 { title: "Entries overview", desc: "Total entries, total eligible entries, breakdown of paid and free entries." },
                                 { title: "Winner details", desc: "The winning ticket number and your external entry ID, plus timestamp." },
                                 { title: "Draw metadata", desc: "Draw run time, seed hash, entry pool hash and signature hash." },
                                 { title: "Integrity status", desc: "A simple “Pass / Fail” style indicator showing whether the chain for this draw is intact." }
                             ].map((item, idx) => (
                                 <div key={idx} className="flex gap-4">
                                     <div className="h-6 w-6 mt-1 rounded-full bg-brand-cobalt/10 flex items-center justify-center text-brand-cobalt shrink-0">
                                         <Check className="h-3.5 w-3.5" />
                                     </div>
                                     <div>
                                         <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">{item.title}</h3>
                                         <p className="text-zinc-600 dark:text-zinc-400 text-sm">{item.desc}</p>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>

                     {/* Right: Mockup */}
                     <div className="flex-1 w-full lg:max-w-xl">
                        <div className="relative bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                             {/* Mockup Header */}
                             <div className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between">
                                 <div className="flex items-center gap-2">
                                     <div className="h-3 w-3 rounded-full bg-red-400" />
                                     <div className="h-3 w-3 rounded-full bg-amber-400" />
                                     <div className="h-3 w-3 rounded-full bg-green-400" />
                                 </div>
                                 <div className="text-xs text-zinc-400 font-mono">veristiq.com</div>
                             </div>

                             {/* Mockup Body */}
                             <div className="p-8 space-y-6">
                                 <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6">
                                     <div>
                                         <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Competition</span>
                                         <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Rolex Submariner Date</h3>
                                         <p className="text-sm text-zinc-500">Draw #8291 • Operated by Raffaly</p>
                                     </div>
                                     <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                         <ShieldCheck className="h-3 w-3" /> Verified
                                     </div>
                                 </div>

                                 <div className="grid grid-cols-2 gap-4">
                                     <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                                         <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><UserCheck className="h-3 w-3"/> Winner</div>
                                         <div className="font-mono font-bold text-lg text-brand-cobalt">#4821</div>
                                         <div className="text-xs text-zinc-400 truncate">Ref: 9f82...1b</div>
                                     </div>
                                     <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                                         <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><Calendar className="h-3 w-3"/> Drawn At</div>
                                         <div className="font-mono font-bold text-lg text-zinc-900 dark:text-white">14:30:05</div>
                                         <div className="text-xs text-zinc-400">Nov 26, 2025 UTC</div>
                                     </div>
                                 </div>

                                 <div className="space-y-3 pt-2">
                                     <div className="flex justify-between text-sm">
                                         <span className="text-zinc-500">Total Entries</span>
                                         <span className="font-mono font-medium">12,500</span>
                                     </div>
                                     <div className="flex justify-between text-sm">
                                         <span className="text-zinc-500">Eligible Pool</span>
                                         <span className="font-mono font-medium">11,942</span>
                                     </div>
                                 </div>

                                 <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                     <div className="text-xs uppercase text-zinc-400 mb-2 font-semibold">Cryptographic Proof</div>
                                     <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded font-mono text-[10px] text-zinc-500 break-all">
                                         <span className="text-zinc-400 block mb-1">SEED HASH</span>
                                         e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                                     </div>
                                 </div>
                             </div>
                        </div>
                     </div>
                 </div>
             </div>
        </section>

        {/* Section: How players use it */}
        <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                 <div className="flex flex-col md:flex-row gap-12 items-center">
                     <div className="flex-1">
                         <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6 text-zinc-600 dark:text-zinc-400">
                             <Eye className="h-6 w-6" />
                         </div>
                         <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">How players see it</h2>
                         <p className="text-zinc-600 dark:text-zinc-400 mb-6">From a player's perspective, the audit page answers:</p>
                         <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm font-medium mb-8">
                             <li>• “Was my entry included?”</li>
                             <li>• “How many people entered?”</li>
                             <li>• “When exactly was the draw run?”</li>
                             <li>• “Was this done automatically or manually?”</li>
                             <li>• “Is there proof this hasn't been altered?”</li>
                         </ul>
                     </div>
                     <div className="flex-1 bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                         <h3 className="font-bold text-zinc-900 dark:text-white mb-4">Most players will simply see:</h3>
                         <div className="flex gap-4 mb-6">
                             <div className="bg-white dark:bg-black px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm font-bold shadow-sm">Fairness badge</div>
                             <div className="bg-white dark:bg-black px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm font-bold shadow-sm">Winner</div>
                             <div className="bg-white dark:bg-black px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm font-bold shadow-sm">Clear numbers</div>
                         </div>
                         <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
                             For those who want more detail, the technical fields are still there.
                         </p>
                     </div>
                 </div>
            </div>
        </section>

        {/* Section: How operators use it */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-12">How you use it as an operator</h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-12">
                     <div className="bg-white dark:bg-black p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                         <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Share Results</h3>
                         <p className="text-sm text-zinc-600 dark:text-zinc-400">Link to the audit page from your results page</p>
                     </div>
                     <div className="bg-white dark:bg-black p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                         <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Social Proof</h3>
                         <p className="text-sm text-zinc-600 dark:text-zinc-400">Share it on social media after live draws</p>
                     </div>
                     <div className="bg-white dark:bg-black p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                         <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Winner Comms</h3>
                         <p className="text-sm text-zinc-600 dark:text-zinc-400">Include it in emails to winners or participants</p>
                     </div>
                     <div className="bg-white dark:bg-black p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                         <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Dispute Resolution</h3>
                         <p className="text-sm text-zinc-600 dark:text-zinc-400">Use it to resolve complaints quickly</p>
                     </div>
                </div>
                <div className="inline-block bg-brand-cobalt/10 text-brand-cobalt px-6 py-4 rounded-xl font-medium border border-brand-cobalt/20">
                    “Here is the independent audit of that draw.”
                </div>
                <p className="mt-6 text-zinc-600 dark:text-zinc-400">
                    This saves time, reduces arguments and shows you have nothing to hide.
                </p>
            </div>
        </section>

        <FaqBlock faqs={faqs} title="Example audit FAQ" />
      </main>
      <SiteFooter />
    </div>
  );
}

























