import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PricingPage() {
  const faqs = [
    {
      question: "What counts as a “draw”?",
      answer: "A draw is the process of selecting a winner (or winners) for a specific prize in a competition. If you run multiple prizes in one go, each prize draw still generates its own audited event."
    },
    {
      question: "Do I pay per competition or per draw?",
      answer: "You pay a monthly subscription plus a fee per draw. This lets you run as many competitions as you like and pay based on how often you actually draw winners."
    },
    {
      question: "Can I cancel at any time?",
      answer: "Yes, you can cancel your subscription at the end of any billing period. Audit data and history will remain accessible for a reasonable retention period."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">
        
        {/* Hero */}
        <section className="py-20 bg-[var(--veristiq-snow)] border-b border-gray-100 text-center">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--veristiq-slate)]">Simple, Transparent Pricing</h1>
                <p className="text-xl text-[var(--veristiq-slate-light)] max-w-2xl mx-auto">
                    Choose the plan that fits your volume. Scale with confidence.
                </p>
            </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-white">
             <div className="container mx-auto px-6 max-w-5xl">
                 <div className="grid md:grid-cols-2 gap-8 items-start">
                     {/* Core Plan */}
                     <div className="p-8 rounded-2xl border border-gray-200 bg-white shadow-lg hover:border-[var(--veristiq-primary-blue)] transition-all relative">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--veristiq-primary-blue)] text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                             MOST POPULAR
                         </div>
                         <h3 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-2">Core</h3>
                         <div className="flex items-baseline gap-1 mb-6">
                             <span className="text-4xl font-bold">£39</span>
                             <span className="text-gray-500">/mo</span>
                         </div>
                         <p className="text-[var(--veristiq-slate-light)] mb-8">Everything you need to verify draws and build trust.</p>
                         
                         <Link href="/operator/register">
                            <Button className="w-full bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white h-12 text-lg">
                                Get Started
                            </Button>
                         </Link>
                     </div>

                     {/* Enterprise Plan */}
                     <div className="p-8 rounded-2xl border border-gray-200 bg-[var(--veristiq-slate)] text-white shadow-xl">
                         <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                         <div className="flex items-baseline gap-1 mb-6">
                             <span className="text-4xl font-bold">£349</span>
                             <span className="text-gray-400">/mo</span>
                         </div>
                         <p className="text-gray-300 mb-8">For large operators requiring compliance packs and SLA.</p>
                         
                         <Link href="/contact">
                            <Button variant="outline" className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20 h-12 text-lg">
                                Contact Sales
                            </Button>
                         </Link>
                     </div>
                 </div>
             </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-[var(--veristiq-snow)]">
            <div className="container mx-auto px-6 max-w-5xl">
                <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-3 bg-gray-50 p-6 border-b border-gray-200 font-bold text-[var(--veristiq-slate)]">
                        <div>Feature</div>
                        <div className="text-center">Core</div>
                        <div className="text-center">Enterprise</div>
                    </div>
                    
                    <div className="divide-y divide-gray-100">
                        <TableRow feature="Unlimited draws" core={true} enterprise={true} />
                        <TableRow feature="Audit chain" core={true} enterprise={true} />
                        <TableRow feature="Public audit pages" core="Standard" enterprise="Custom Domain" />
                        <TableRow feature="Compliance pack" core="Basic" enterprise="Full DCMS" />
                        <TableRow feature="Data Retention" core="3 months" enterprise="12 months" />
                        <TableRow feature="SLA" core={false} enterprise={true} />
                        <TableRow feature="Priority Support" core={false} enterprise={true} />
                    </div>
                </div>

                 {/* Add-ons */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <h3 className="text-xl font-bold mb-6 text-center">Available Add-ons</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white rounded-lg border border-gray-200">
                            <h4 className="font-bold mb-2">White-label Audit Domain</h4>
                            <p className="text-sm text-gray-500 mb-2">Use audits.yourbrand.com</p>
                            <div className="font-medium text-[var(--veristiq-primary-blue)]">£49/mo</div>
                        </div>
                        <div className="p-6 bg-white rounded-lg border border-gray-200">
                            <h4 className="font-bold mb-2">Historical Data Import</h4>
                            <p className="text-sm text-gray-500 mb-2">Migrate past draw data</p>
                            <div className="font-medium text-[var(--veristiq-primary-blue)]">POA</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
             <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-[var(--veristiq-slate-light)] text-base leading-relaxed">
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

function TableRow({ feature, core, enterprise }: { feature: string, core: boolean | string, enterprise: boolean | string }) {
    return (
        <div className="grid grid-cols-3 p-4 hover:bg-gray-50 transition-colors">
            <div className="font-medium text-[var(--veristiq-slate)] flex items-center">{feature}</div>
            <div className="flex justify-center items-center text-[var(--veristiq-slate-light)] text-sm">
                {typeof core === 'boolean' ? (
                    core ? <Check className="w-5 h-5 text-green-500" /> : <div className="w-4 h-px bg-gray-300"></div>
                ) : (
                    core
                )}
            </div>
            <div className="flex justify-center items-center text-[var(--veristiq-slate-light)] text-sm">
                {typeof enterprise === 'boolean' ? (
                     enterprise ? <Check className="w-5 h-5 text-green-500" /> : <div className="w-4 h-px bg-gray-300"></div>
                ) : (
                    enterprise
                )}
            </div>
        </div>
    )
}
