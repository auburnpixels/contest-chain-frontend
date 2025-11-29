import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqBlock } from "@/components/marketing/FaqBlock";
import { Database, Lock, ShieldAlert, Key, Server, Hash, FileKey, EyeOff, UserX } from "lucide-react";

export default function SecurityPage() {
  const faqs = [
    {
      question: "Can CAFAAS staff change audit records?",
      answer: "Normal workflows do not allow modification of audit records. In the extremely rare case where operational corrections are needed (e.g. a clear bug), any adjustments would be logged and the integrity of the chain would reflect that change."
    },
    {
      question: "Does CAFAAS store card or payment data?",
      answer: "No. Payment processing remains entirely within your payment provider or platform."
    },
    {
      question: "Where is data stored?",
      answer: "We currently host in the UK/EU."
    },
    {
      question: "How long do you retain audit data?",
      answer: "Our goal is to retain audit data for a long enough period to be useful to operators, players and regulators. Default retention is 5 years."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      <main>
        <PageHero 
          title="Security & Data Integrity"
          headline="Security, integrity and data handling at CAFAAS."
          subheadline="Fairness doesn’t work without security. Here’s how we protect your data and ensure our audit chain remains tamper-evident."
        />

        {/* Section: Data we store */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                     <div className="flex-1">
                         <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center mb-6 text-zinc-600 dark:text-zinc-400">
                             <Database className="h-6 w-6" />
                         </div>
                         <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">What we store</h2>
                         <p className="text-zinc-600 dark:text-zinc-400 mb-6">CAFAAS primarily stores:</p>
                         <ul className="space-y-3 mb-8">
                             {[
                                 "competition data (IDs, names, draw times, prize info)",
                                 "entry records (internal ticket ID, your external ID, eligibility flags)",
                                 "draw events (seed hash, entry pool hash, winner reference)",
                                 "audit records (signature hash, chain pointers, timestamps)",
                                 "limited operator metadata (operator account, API keys)"
                             ].map((item, idx) => (
                                 <li key={idx} className="flex items-start gap-3">
                                     <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-cobalt shrink-0" />
                                     <span className="text-zinc-700 dark:text-zinc-300 text-sm font-medium">{item}</span>
                                 </li>
                             ))}
                         </ul>
                     </div>
                     <div className="flex-1 bg-white dark:bg-black p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                         <div className="flex items-center gap-2 mb-4 text-brand-cobalt">
                             <ShieldAlert className="h-5 w-5" />
                             <span className="font-bold uppercase text-sm tracking-wide">Data Minimisation</span>
                         </div>
                         <p className="text-zinc-700 dark:text-zinc-300 mb-4 font-medium">
                             We deliberately avoid storing unnecessary personally identifiable information (PII).
                         </p>
                         <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                             Where user references are stored, we encourage operators to use hashed or anonymised references.
                         </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Section: How we protect integrity */}
        <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
             <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                 <div className="text-center mb-12">
                     <div className="h-16 w-16 bg-brand-cobalt/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-cobalt">
                         <Hash className="h-8 w-8" />
                     </div>
                     <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Protecting the integrity of the audit chain</h2>
                     <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">To make the audit chain tamper-evident, we:</p>
                 </div>

                 <div className="grid sm:grid-cols-2 gap-6 mb-16">
                     <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                         <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Hashing</h3>
                         <p className="text-sm text-zinc-600 dark:text-zinc-400">hash each event using a strong cryptographic function</p>
                     </div>
                     <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                         <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Linking</h3>
                         <p className="text-sm text-zinc-600 dark:text-zinc-400">include the previous event’s hash in the new event’s data</p>
                     </div>
                     <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                         <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Immutability</h3>
                         <p className="text-sm text-zinc-600 dark:text-zinc-400">prevent normal update/delete operations on audit records</p>
                     </div>
                     <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                         <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Verification</h3>
                         <p className="text-sm text-zinc-600 dark:text-zinc-400">run internal integrity checks to detect any inconsistencies</p>
                     </div>
                 </div>

                 <div className="bg-brand-cobalt/10 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-8 text-center">
                     <h3 className="text-red-800 dark:text-red-400 font-bold mb-4">If someone attempted to alter a past event:</h3>
                     <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-sm font-medium text-red-700 dark:text-red-300">
                         <span>its hash would change</span>
                         <span className="hidden md:inline">→</span>
                         <span>all subsequent hashes would no longer match</span>
                         <span className="hidden md:inline">→</span>
                         <span>an integrity check would surface the discrepancy</span>
                     </div>
                     <p className="mt-6 text-brand-cobalt dark:text-red-400 font-bold">
                         This makes quiet rewriting of history extremely difficult to hide.
                     </p>
                 </div>
             </div>
        </section>

        {/* Section: Access and control */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                 <div className="flex flex-col md:flex-row gap-12 items-center">
                     <div className="flex-1">
                         <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Who can access what</h2>
                         <ul className="space-y-6">
                             <li className="flex gap-4">
                                 <div className="mt-1 bg-white dark:bg-black p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0">
                                     <Key className="h-5 w-5 text-brand-cobalt" />
                                 </div>
                                 <div>
                                     <h3 className="font-bold text-zinc-900 dark:text-white">Operators</h3>
                                     <p className="text-sm text-zinc-600 dark:text-zinc-400">Can see their own competitions, entries and audits.</p>
                                 </div>
                             </li>
                             <li className="flex gap-4">
                                 <div className="mt-1 bg-white dark:bg-black p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0">
                                     <Server className="h-5 w-5 text-brand-cobalt" />
                                 </div>
                                 <div>
                                     <h3 className="font-bold text-zinc-900 dark:text-white">Public</h3>
                                     <p className="text-sm text-zinc-600 dark:text-zinc-400">Public audit pages expose only the data necessary to verify fairness — not internal operator data or personal player data.</p>
                                 </div>
                             </li>
                             <li className="flex gap-4">
                                 <div className="mt-1 bg-white dark:bg-black p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0">
                                     <FileKey className="h-5 w-5 text-brand-cobalt" />
                                 </div>
                                 <div>
                                     <h3 className="font-bold text-zinc-900 dark:text-white">Admins</h3>
                                     <p className="text-sm text-zinc-600 dark:text-zinc-400">Internal admin tools are limited to operational and integrity purposes, not result manipulation.</p>
                                 </div>
                             </li>
                         </ul>
                     </div>
                     <div className="flex-1 bg-zinc-900 text-zinc-300 p-8 rounded-2xl shadow-xl border border-zinc-800">
                         <div className="flex items-center gap-2 mb-6 text-red-400">
                             <Lock className="h-5 w-5" />
                             <span className="font-bold uppercase text-sm tracking-wide">Strict Limitations</span>
                         </div>
                         <p className="font-medium text-white mb-4">CAFAAS cannot be used to secretly:</p>
                         <ul className="space-y-3 text-sm">
                             <li className="flex items-center gap-3">
                                 <EyeOff className="h-4 w-4 text-red-400" /> move a draw forward or backward in time
                             </li>
                             <li className="flex items-center gap-3">
                                 <EyeOff className="h-4 w-4 text-red-400" /> change the winner without leaving a trace
                             </li>
                             <li className="flex items-center gap-3">
                                 <EyeOff className="h-4 w-4 text-red-400" /> silently drop entries from the draw pool
                             </li>
                         </ul>
                     </div>
                 </div>
            </div>
        </section>

        {/* Section: Privacy */}
        <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
            <div className="container px-4 md:px-6 mx-auto max-w-2xl text-center">
                 <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-600 dark:text-zinc-400">
                     <UserX className="h-6 w-6" />
                 </div>
                 <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Player privacy</h2>
                 <p className="text-zinc-600 dark:text-zinc-400 mb-8">We encourage operators to:</p>
                 <div className="flex flex-wrap justify-center gap-4 mb-12">
                     <span className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-full text-sm font-medium border border-zinc-200 dark:border-zinc-800">use anonymised or hashed identifiers</span>
                     <span className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-full text-sm font-medium border border-zinc-200 dark:border-zinc-800">avoid sending full personal data</span>
                     <span className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-full text-sm font-medium border border-zinc-200 dark:border-zinc-800">keep sensitive information on their own systems</span>
                 </div>
                 <p className="text-xl font-bold text-zinc-900 dark:text-white">
                     CAFAAS is a fairness and audit platform, <br/>
                     <span className="text-brand-cobalt">not a marketing database.</span>
                 </p>
            </div>
        </section>

        <FaqBlock faqs={faqs} title="Security FAQ" />
      </main>
      <SiteFooter />
    </div>
  );
}
