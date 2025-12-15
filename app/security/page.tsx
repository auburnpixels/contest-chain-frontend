import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Database, Lock, ShieldAlert, Key, Server, Hash, FileKey, EyeOff, UserX, ShieldCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SecurityPage() {
  const faqs = [
    {
      question: "Can Veristiq staff change audit records?",
      answer: "Normal workflows do not allow modification of audit records. In the extremely rare case where operational corrections are needed (e.g. a clear bug), any adjustments would be logged and the integrity of the chain would reflect that change."
    },
    {
      question: "Does Veristiq store card or payment data?",
      answer: "No. Payment processing remains entirely within your payment provider or platform."
    },
    {
      question: "Where is data stored?",
      answer: "We currently host in the UK/EU."
    },
    {
      question: "How long do you retain audit data?",
      answer: "Our goal is to retain audit data for a long enough period to be useful to operators, players and regulators. Default retention is 5 years."
    },
      {
          question: "Does Veristiq secure my entire competition platform?",
          answer: "No. Veristiq secures the integrity and verifiability of draw records and audit data. Operators remain responsible for the security of their own websites, payment systems, customer data, and operational platforms."
      }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">
        
        {/* Hero */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

             <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                    <ShieldCheck className="w-8 h-8 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Security & Data Integrity</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Fairness depends on integrity. This page explains how Veristiq protects audit data and keeps draw records tamper-evident.
                </p>
             </div>
        </section>

        {/* Section: Data we store */}
        <section className="py-24 bg-[var(--veristiq-snow)] border-b border-gray-100">
            <div className="container px-6 mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                     <div className="flex-1">
                         <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-[var(--veristiq-primary-blue)]">
                             <Database className="h-6 w-6" />
                         </div>
                         <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] mb-6">What we store</h2>
                         <p className="text-[var(--veristiq-slate-light)] mb-6">
                             Veristiq stores only the data necessary to verify competition draws and generate independent audit evidence.
                         </p>
                         <ul className="space-y-4 mb-8">
                             {[
                                 "Competition metadata (e.g. competition identifiers, draw times, prize references)",
                                 "Entry references submitted by operators (hashed or pseudonymised where applicable)",
                                 "Draw execution data (entropy seed references, entry pool hash, winning reference)",
                                 "Cryptographic audit records (event hashes, chain position, timestamps)",
                                 "Limited operator account metadata (account identifiers and API keys)"
                             ].map((item, idx) => (
                                 <li key={idx} className="flex items-start gap-3">
                                     <div className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--veristiq-primary-blue)] shrink-0" />
                                     <span className="text-gray-600 text-sm font-medium leading-relaxed">{item}</span>
                                 </li>
                             ))}
                         </ul>
                     </div>
                     <div className="flex-1 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                         <div className="flex items-center gap-2 mb-4 text-[var(--veristiq-primary-blue)]">
                             <ShieldAlert className="h-5 w-5" />
                             <span className="font-bold uppercase text-sm tracking-wide">Data Minimisation</span>
                         </div>
                         <p className="text-[var(--veristiq-slate)] mb-4 font-medium">
                             Veristiq is designed to minimise exposure to personally identifiable information (PII). Where entry references are required, operators are encouraged to submit anonymised or pseudonymised identifiers.
                         </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Section: How we protect integrity */}
        <section className="py-24 bg-white">
             <div className="container px-6 mx-auto max-w-5xl">
                 <div className="text-center mb-16">
                     <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--veristiq-primary-blue)]">
                         <Hash className="h-8 w-8" />
                     </div>
                     <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] mb-4">Protecting the integrity of the audit chain</h2>
                     <p className="text-[var(--veristiq-slate-light)] max-w-2xl mx-auto">To make the audit chain tamper-evident, we:</p>
                 </div>

                 <div className="grid sm:grid-cols-2 gap-6 mb-16">
                     <div className="bg-[var(--veristiq-snow)] p-6 rounded-xl border border-gray-100">
                         <h3 className="font-bold text-[var(--veristiq-slate)] mb-2">Hashing</h3>
                         <p className="text-sm text-gray-600">Hash each event using a strong cryptographic function</p>
                     </div>
                     <div className="bg-[var(--veristiq-snow)] p-6 rounded-xl border border-gray-100">
                         <h3 className="font-bold text-[var(--veristiq-slate)] mb-2">Linking</h3>
                         <p className="text-sm text-gray-600">Include the previous event's hash in the new event's data</p>
                     </div>
                     <div className="bg-[var(--veristiq-snow)] p-6 rounded-xl border border-gray-100">
                         <h3 className="font-bold text-[var(--veristiq-slate)] mb-2">Immutability</h3>
                         <p className="text-sm text-gray-600">Prevent normal update/delete operations on audit records</p>
                     </div>
                     <div className="bg-[var(--veristiq-snow)] p-6 rounded-xl border border-gray-100">
                         <h3 className="font-bold text-[var(--veristiq-slate)] mb-2">Verification</h3>
                         <p className="text-sm text-gray-600">Run internal integrity checks to detect any inconsistencies</p>
                     </div>
                 </div>

                 <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
                     <h3 className="text-red-800 font-bold mb-6">If someone attempted to alter a past event:</h3>
                     <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-sm font-medium text-red-700">
                         <span>Any modification to a historical event would invalidate subsequent hashes and surface immediately during integrity verification. This ensures the audit chain provides reliable, tamper-evident evidence over time.</span>
                     </div>
                 </div>
             </div>
        </section>

        {/* Section: Access and control */}
        <section className="py-24 bg-[var(--veristiq-snow)]">
            <div className="container px-6 mx-auto max-w-5xl">
                 <div className="flex flex-col md:flex-row gap-12 items-center">
                     <div className="flex-1">
                         <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] mb-8">Who can access what</h2>
                         <ul className="space-y-6">
                             <li className="flex gap-4">
                                 <div className="mt-1 bg-white p-2 rounded-lg border border-gray-100 shadow-sm shrink-0">
                                     <Key className="h-5 w-5 text-[var(--veristiq-primary-blue)]" />
                                 </div>
                                 <div>
                                     <h3 className="font-bold text-[var(--veristiq-slate)]">Operators</h3>
                                     <p className="text-sm text-gray-600">Can see their own competitions, entries and audits.</p>
                                 </div>
                             </li>
                             <li className="flex gap-4">
                                 <div className="mt-1 bg-white p-2 rounded-lg border border-gray-100 shadow-sm shrink-0">
                                     <Server className="h-5 w-5 text-[var(--veristiq-primary-blue)]" />
                                 </div>
                                 <div>
                                     <h3 className="font-bold text-[var(--veristiq-slate)]">Public</h3>
                                     <p className="text-sm text-gray-600">Public audit pages expose only the data necessary to verify fairness — not internal operator data or personal player data.</p>
                                 </div>
                             </li>
                         </ul>
                     </div>
                     <div className="flex-1 bg-[var(--veristiq-slate)] text-white p-8 rounded-2xl shadow-xl">
                         <div className="flex items-center gap-2 mb-6 text-red-400">
                             <Lock className="h-5 w-5" />
                             <span className="font-bold uppercase text-sm tracking-wide">System Integrity Constraints</span>
                         </div>
                         <p className="font-medium text-white mb-4">
                             Veristiq's architecture prevents the following actions:
                         </p>
                         <ul className="space-y-3 text-sm text-gray-300">
                             <li className="flex items-center gap-3">
                                 <EyeOff className="h-4 w-4 text-red-400" /> Move a draw forward or backward in time
                             </li>
                             <li className="flex items-center gap-3">
                                 <EyeOff className="h-4 w-4 text-red-400" /> Change the winner without leaving a trace
                             </li>
                             <li className="flex items-center gap-3">
                                 <EyeOff className="h-4 w-4 text-red-400" /> Silently drop entries from the draw pool
                             </li>
                         </ul>
                     </div>
                 </div>
            </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-[var(--veristiq-slate)]">Security FAQ</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed">
                        {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
