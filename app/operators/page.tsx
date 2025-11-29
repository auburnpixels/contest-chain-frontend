import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqBlock } from "@/components/marketing/FaqBlock";
import { ShieldCheck, TrendingUp, MessageSquareOff, Scale, Check, LayoutDashboard, Database, FileCheck, Award, Layers, BarChart, Code2, Users, Megaphone, MonitorPlay } from "lucide-react";

export default function OperatorsPage() {
  const faqs = [
    {
      question: "Do I have to change how players enter my competitions?",
      answer: "No. Players enter on your website or app exactly as they do today. You simply send entry records to CAFAAS in the background."
    },
    {
      question: "Do players see CAFAAS during checkout?",
      answer: "Not necessarily. Most operators keep their normal checkout process and show CAFAAS only at the draw/results stage (badge + audit page link)."
    },
    {
      question: "Can I use CAFAAS for only some competitions?",
      answer: "Yes. You can start with a subset of competitions and expand once you see the benefits."
    },
    {
      question: "How much development work is needed?",
      answer: "That depends on your platform, but many operators can integrate the core flows (create competition, submit entry, run draw, show audit URL) in a few days of development."
    },
    {
      question: "What if I run draws live on social media?",
      answer: "You can still use CAFAAS to select the winner in the background and then reveal the result live, pointing viewers to the audit link afterwards."
    }
  ];

  const benefits = [
      {
          title: "Stop “rigged” accusations",
          desc: "Every draw is backed by a public audit page.",
          icon: ShieldCheck
      },
      {
          title: "Increase player trust and conversion",
          desc: "Players are more likely to enter when they see independent verification.",
          icon: TrendingUp
      },
      {
          title: "Reduce support and complaint workload",
          desc: "Instead of arguing, you share the audit link.",
          icon: MessageSquareOff
      },
      {
          title: "Prepare for future regulation and scrutiny",
          desc: "If expectations around fairness tighten, you’re already ahead.",
          icon: Scale
      },
      {
          title: "Differentiate your brand",
          desc: "“CAFAAS Verified” shows you care about doing things properly.",
          icon: Award
      }
  ];

  const features = [
      "An operator dashboard for competitions and draws",
      "A JSON API for full integration",
      "Public audit pages for each draw",
      "A CAFAAS Verified badge to use on your site",
      "Detailed draw event history",
      "Support for multiple prizes per competition",
      "Clear statistics on entries and draws completed"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      <main>
        <PageHero 
          title="For Operators"
          headline="Prove your draws are fair — without changing how you sell tickets."
          subheadline="CAFAAS slots in alongside your existing competition website. You keep your platform. We handle fairness, audit logs and public verification."
        />

        {/* Section: Benefits */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-16">Why operators use CAFAAS</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-white dark:bg-black p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center mb-6 text-brand-cobalt">
                                <benefit.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-3">{benefit.title}</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Section: What you get */}
        <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                 <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">What you get as an operator</h2>
                        <ul className="space-y-4">
                            {features.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-brand-cobalt/10 flex items-center justify-center text-brand-cobalt shrink-0">
                                        <Check className="h-4 w-4" />
                                    </div>
                                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 w-full max-w-sm">
                        <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-inner">
                            <LayoutDashboard className="h-16 w-16 text-zinc-300 dark:text-zinc-700" />
                            <p className="text-zinc-400 dark:text-zinc-600 font-medium">Operator Dashboard Preview</p>
                        </div>
                    </div>
                 </div>
            </div>
        </section>

        {/* Section: Integration overview */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
             <div className="container px-4 md:px-6 mx-auto max-w-3xl">
                 <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-12">Integration at a glance</h2>
                 <div className="space-y-8 relative">
                     <div className="absolute top-4 bottom-4 left-[27px] w-0.5 bg-zinc-200 dark:bg-zinc-800 -z-10" />
                     {[
                         { title: "1. Create competitions", desc: "Use the API to register each competition and its prizes." },
                         { title: "2. Send entries as they happen", desc: "When someone buys or claims an entry in your system, send CAFAAS a record." },
                         { title: "3. Close the competition", desc: "When the entry window ends, you close the competition in CAFAAS." },
                         { title: "4. Trigger the draw", desc: "Call the draw endpoint from your admin or cron job." },
                         { title: "5. Share the audit page", desc: "Publish the audit URL on your draw results page, email and socials." }
                     ].map((step, idx) => (
                         <div key={idx} className="flex gap-6 items-start">
                             <div className="h-14 w-14 rounded-full bg-white dark:bg-black border-4 border-zinc-100 dark:border-zinc-800 flex items-center justify-center font-bold text-brand-cobalt shrink-0">
                                 {idx + 1}
                             </div>
                             <div className="pt-2">
                                 <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">{step.title}</h3>
                                 <p className="text-zinc-600 dark:text-zinc-400">{step.desc}</p>
                             </div>
                         </div>
                     ))}
                 </div>

                 <div className="mt-12 bg-white dark:bg-black p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                     <p className="font-medium text-zinc-900 dark:text-white mb-2">You can start with just:</p>
                     <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                         competition creation • paid entries • draw trigger • audit sharing
                     </p>
                     <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 italic">
                         …and add more features (free entries, webhooks, advanced reporting) later.
                     </p>
                 </div>
             </div>
        </section>

        {/* Section: For your team */}
        <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
             <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                 <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-16">Built to fit your existing operations</h2>
                 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     <div className="text-center">
                         <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-600 dark:text-zinc-400">
                             <Code2 className="h-5 w-5" />
                         </div>
                         <p className="text-sm font-medium text-zinc-900 dark:text-white">your developers can integrate it</p>
                     </div>
                     <div className="text-center">
                         <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-600 dark:text-zinc-400">
                             <Users className="h-5 w-5" />
                         </div>
                         <p className="text-sm font-medium text-zinc-900 dark:text-white">your customer service team can share audit links</p>
                     </div>
                     <div className="text-center">
                         <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-600 dark:text-zinc-400">
                             <Megaphone className="h-5 w-5" />
                         </div>
                         <p className="text-sm font-medium text-zinc-900 dark:text-white">your marketing team can promote “CAFAAS Verified”</p>
                     </div>
                     <div className="text-center">
                         <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-600 dark:text-zinc-400">
                             <BarChart className="h-5 w-5" />
                         </div>
                         <p className="text-sm font-medium text-zinc-900 dark:text-white">your management can see high-level stats</p>
                     </div>
                 </div>
                 
                 <div className="mt-16 text-center">
                     <p className="text-xl font-bold text-zinc-900 dark:text-white">
                        We don’t ask you to move platforms. <br/>
                        <span className="text-brand-cobalt">We plug into the platform you already have.</span>
                     </p>
                 </div>
             </div>
        </section>

        <FaqBlock faqs={faqs} title="Operators page – FAQ" />
      </main>
      <SiteFooter />
    </div>
  );
}
