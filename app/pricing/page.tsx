import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqBlock } from "@/components/marketing/FaqBlock";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, ShieldCheck, FileCheck, RefreshCw, Gift, Database, Sparkles } from "lucide-react";

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
      question: "What happens if I exceed my typical draw volume?",
      answer: "We’ll never hard-stop your draws. If you consistently exceed your tier’s typical volume, we’ll reach out and discuss whether another plan or a custom arrangement is better."
    },
    {
      question: "Are fairness and audit features available on all plans?",
      answer: "Yes. We don’t believe fairness should be an “add-on”. All plans include the full core fairness and audit engine. Higher tiers unlock branding, webhooks and support options."
    },
    {
      question: "Can I cancel at any time?",
      answer: "Yes, you can cancel your subscription at the end of any billing period. Audit data and history will remain accessible for a reasonable retention period."
    }
  ];

  const tiers = [
      {
          name: "Starter",
          price: "£29",
          fee: "£0.50",
          desc: "For small to mid-size operators running a handful of competitions per month.",
          features: [
              "CAFAAS Verified badge",
              "Public audit pages",
              "Operator dashboard",
              "Core API access",
              "Up to 1 team member",
              "Standard support"
          ]
      },
      {
          name: "Growth",
          price: "£79",
          fee: "£0.25",
          desc: "For growing operators and brands running frequent competitions.",
          features: [
              "Everything in Starter",
              "Custom audit branding (logo & colours)",
              "Webhook support (result notifications, status updates)",
              "Up to 5 team members",
              "Priority support"
          ],
          highlight: true
      },
      {
          name: "Platform",
          price: "£199",
          fee: "£0.10",
          desc: "For platforms and high-volume competition businesses.",
          features: [
              "Everything in Growth",
              "Custom domain for audit pages (e.g. audit.yourbrand.com)",
              "Full theme control for audit pages",
              "Advanced audit exports and reporting",
              "Up to 20 team members",
              "Dedicated support channel"
          ]
      }
  ];

  const includedFeatures = [
      { title: "Tamper-evident audit chain", icon: ShieldCheck },
      { title: "Public audit pages", icon: FileCheck },
      { title: "Draw logging and integrity checks", icon: RefreshCw },
      { title: "Support for multiple prizes per competition", icon: Gift },
      { title: "Entry logging (paid & free)", icon: Database },
      { title: "Access to new fairness features as they launch", icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      <main>
        <PageHero 
          title="Pricing"
          headline="Simple, predictable pricing that scales with your competitions."
          subheadline="Pay a small monthly fee to access the platform, plus a per-draw fee that scales down as you grow. All fairness and audit features are available on every plan."
        />

        {/* Pricing Cards */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
             <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                 <div className="grid md:grid-cols-3 gap-8 items-start">
                     {tiers.map((tier, idx) => (
                         <div key={idx} className={`relative flex flex-col p-8 rounded-3xl border ${tier.highlight ? 'border-brand-cobalt bg-white dark:bg-zinc-900 ring-1 ring-brand-cobalt shadow-xl scale-105 z-10' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black'}`}>
                             {tier.highlight && (
                                 <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                     <span className="bg-brand-cobalt text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
                                 </div>
                             )}
                             <div className="mb-6">
                                 <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{tier.name}</h3>
                                 <div className="flex items-baseline gap-1">
                                     <span className="text-4xl font-bold text-zinc-900 dark:text-white">{tier.price}</span>
                                     <span className="text-zinc-500 dark:text-zinc-400">/mo</span>
                                 </div>
                                 <div className="text-sm font-medium text-brand-cobalt mt-2">+ {tier.fee} per draw</div>
                                 <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 min-h-[40px]">{tier.desc}</p>
                             </div>
                             
                             <ul className="space-y-4 mb-8 flex-1">
                                 {tier.features.map((feature, i) => (
                                     <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                                         <Check className="h-5 w-5 text-brand-cobalt flex-shrink-0" />
                                         <span>{feature}</span>
                                     </li>
                                 ))}
                             </ul>

                             <Button className={`w-full ${tier.highlight ? 'bg-brand-cobalt hover:bg-brand-cobalt/90 text-white' : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200'}`} asChild>
                                 <Link href="/operator/register">Get Started</Link>
                             </Button>
                         </div>
                     ))}
                 </div>
             </div>
        </section>

        {/* Section: What's included */}
        <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Every plan includes:</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    {includedFeatures.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                            <div className="h-10 w-10 bg-white dark:bg-black rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-brand-cobalt shadow-sm">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-zinc-900 dark:text-white">{item.title}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center max-w-2xl mx-auto p-6 bg-brand-cobalt/5 rounded-2xl border border-brand-cobalt/10">
                    <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                        No fairness features are “locked” behind higher plans. <br/>
                        <span className="text-sm opacity-80 font-normal">Plans mainly differ in branding, automation and support.</span>
                    </p>
                </div>
            </div>
        </section>

        <FaqBlock faqs={faqs} title="Pricing FAQ" />
      </main>
      <SiteFooter />
    </div>
  );
}
