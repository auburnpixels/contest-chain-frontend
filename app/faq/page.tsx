import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 font-sans">
      <SiteHeader />

      <section className="relative py-24 container mx-auto px-4 text-center">
         <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Frequently Asked Questions
         </h1>
         <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Common questions about compliance, technical integration, and pricing.
         </p>
      </section>

      <section className="container mx-auto px-4 pb-24 max-w-3xl">
        <div className="space-y-16">
         
         {/* Core Operator FAQs */}
         <div>
           <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
             <span className="text-blue-500">🔥</span> Core Operator FAQs
           </h2>
           <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">What is CAAS and why do I need it for my competitions?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    CAAS ensures every draw you run is cryptographically verifiable, legally compliant, and independently auditable — protecting your business and boosting customer trust.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Is CAAS required by UK law?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    CAAS itself is not required, but the compliance standards it enforces are required (fairness, transparency, free-entry handling, verifiable draws, etc.).
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Will using CAAS make my competitions legally compliant?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — CAAS helps you meet key UK requirements (ASA, CAP Code, consumer protection, free-entry requirements, transparency rules). You must still follow advertising and prize rules.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Does CAAS run the draw for me?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes. You call the draw endpoint, and CAAS generates a tamper-proof, hash-chained draw event with proof of fairness.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Can my entrants verify the draw themselves?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Absolutely. Every competition gets a public audit page showing cryptographic proof of fairness.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Does CAAS store my entries? Is it safe?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Entries are securely stored, hashed, chained, and timestamped. Any manipulation becomes instantly detectable.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">What if my website goes down? Does CAAS still work?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes. CAAS operates independently as the audit authority. Your entrants can still verify your draw.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">How long does integration take?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Most operators integrate in minutes to a few hours using our REST API, SDKs, and webhook support.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Do I need my own developer?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Not necessarily. You can run competitions manually through the dashboard, or integrate via API if you have a tech team.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-10" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Can CAAS prove my draw wasn’t rigged?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — every draw is signed, chained, timestamped, and independently verifiable.
                 </AccordionContent>
              </AccordionItem>
           </Accordion>
         </div>

         {/* Pricing & Billing FAQs */}
         <div>
           <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
             <span className="text-blue-500">💼</span> Pricing & Billing FAQs
           </h2>
           <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-11" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Do all competitions have to use CAAS?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — to maintain regulatory integrity, all draws must follow the same compliance process.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-12" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Why is there a mandatory Core fee?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Because the Core compliance engine is required to ensure uniform fairness across operators.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-13" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">What am I billed for?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    You pay a monthly subscription and a small fee per competition draw. Optional add-ons are available for scale or automation.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-14" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Do I pay extra for high-value prizes?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    No — pricing is based on usage, not prize value.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-15" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Do I need to sign a contract?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    No. CAAS is month-to-month unless you choose an enterprise plan.
                 </AccordionContent>
              </AccordionItem>
           </Accordion>
         </div>

         {/* Technical / Integration FAQs */}
         <div>
           <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
             <span className="text-blue-500">⚙️</span> Technical / Integration FAQs
           </h2>
           <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-16" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Which programming languages do you support?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    We provide typed SDKs for Node, PHP, Python, Go, and more.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-17" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">What happens if my API request fails during a draw?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Draws are atomic — if anything fails, the draw is not recorded. You retry safely.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-18" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Can I import entries in bulk?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — via API, CSV import (Pro+), or queued entry endpoints (Enterprise).
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-19" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Do you support webhooks?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — for entry submitted, draw completed, audit generated, compliance alerts, and more.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-20" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Do you offer a staging/sandbox environment?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — all paid plans include a full sandbox.
                 </AccordionContent>
              </AccordionItem>
           </Accordion>
         </div>

         {/* Security & Trust FAQs */}
         <div>
           <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
             <span className="text-blue-500">🔐</span> Security & Trust FAQs
           </h2>
           <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-21" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Is CAAS a blockchain?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    No — CAAS uses a blockchain-inspired hash chain. It’s faster, cheaper, and easier for operators while still fully tamper-evident.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-22" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Can CAAS be tampered with?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    No. Every action is hashed, timestamped, chained, and verified. Any modification breaks the chain.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-23" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Where is data stored?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Secure UK/EU cloud storage, with audit logs stored immutably.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-24" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Do regulators have access to my competitions?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — regulators have read-only visibility for compliance and oversight.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-25" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Are draws reproducible?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — anyone can replay the draw using the public seed and chain data.
                 </AccordionContent>
              </AccordionItem>
           </Accordion>
         </div>

         {/* Regulation & Legality FAQs */}
         <div>
           <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
             <span className="text-blue-500">🏛</span> Regulation & Legality FAQs
           </h2>
           <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-26" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Does CAAS satisfy free-entry compliance rules?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — the platform tracks free entries separately and ensures they’re included correctly.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-27" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Does CAAS replace my need for legal advice?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    No — but it drastically reduces compliance risk and simplifies evidence requirements.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-28" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Does CAAS meet ASA/CAP transparency rules?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — CAAS is built around these standards.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-29" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Are competition results private or public?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Audit data is public. Entry lists remain private unless you choose otherwise.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-30" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Can regulators verify my draws independently?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — that’s one of CAAS’s core functions.
                 </AccordionContent>
              </AccordionItem>
           </Accordion>
         </div>

         {/* Entrant / Customer FAQs */}
         <div>
           <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
             <span className="text-blue-500">👥</span> Entrant / Customer FAQs
           </h2>
           <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-31" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">How do entrants verify a draw?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    They simply visit the audit link for that competition. Everything is visible and mathematically provable.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-32" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Do entrants see personal data?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    No — entries are hashed and anonymized.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-33" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Why should entrants trust CAAS?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Because all verification is independent, tamper-proof, and mathematically guaranteed.
                 </AccordionContent>
              </AccordionItem>
           </Accordion>
         </div>

         {/* Operator Platform / Marketplace FAQs */}
         <div>
           <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
             <span className="text-blue-500">🏢</span> Operator Platform / Marketplace FAQs
           </h2>
           <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-34" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Can platforms integrate CAAS for all their hosted competitions?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — via white-label or enterprise plans.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-35" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Can I use CAAS if I run multiple competition brands?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — multi-brand support is built-in.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-36" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Can I export my audit data?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — JSON, CSV, or regulator-ready PDF.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-37" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Does CAAS support scheduled draws?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — available in Pro+ plans.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-38" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Can CAAS automate my entire competition workflow?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — many operators use CAAS as their competition backend.
                 </AccordionContent>
              </AccordionItem>
           </Accordion>
         </div>

         {/* Enterprise / Scale FAQs */}
         <div>
           <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
             <span className="text-blue-500">💳</span> Enterprise / Scale FAQs
           </h2>
           <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-39" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Do you offer SLAs?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — enterprise plans include uptime and audit availability SLAs.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-40" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Can CAAS run on-prem or hybrid?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Enterprise customers can request a private signing service.
                 </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-41" className="border-slate-800">
                 <AccordionTrigger className="text-white hover:text-blue-400">Do you support thousands of entries per minute?</AccordionTrigger>
                 <AccordionContent className="text-muted-foreground">
                    Yes — CAAS is built for high-throughput ingest.
                 </AccordionContent>
              </AccordionItem>
           </Accordion>
         </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
