import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/marketing/PageHero";
import { FaqBlock } from "@/components/marketing/FaqBlock";
import { ShieldCheck, CheckCircle2, XCircle, Search, Users, Eye } from "lucide-react";

export default function AboutPage() {
  const faqs = [
    {
      question: "Are you connected to any regulator?",
      answer: "No. CAFAAS is independent. We are not a regulator and we don’t grant licenses. We provide technical tools that operators and regulators can choose to use."
    },
    {
      question: "Can CAFAAS guarantee that an operator is compliant?",
      answer: "No. Compliance depends on how you run your business, structure your promotions and follow local law. CAFAAS provides transparency and auditability, not legal sign-off."
    },
    {
      question: "Does CAFAAS ever hide or change draw data?",
      answer: "No. Once a draw is recorded and linked in the chain, it cannot be edited without breaking the chain and causing an integrity failure."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      <main>
        <PageHero 
          title="About CAFAAS"
          headline="Independent fairness infrastructure for online competitions."
        />

        {/* Introduction Section */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
             <div className="space-y-6 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <p>
                  CAFAAS is an independent fairness and audit platform for online prize competitions, raffles and giveaways.
                </p>
                <p>
                  We provide tamper-evident audit logs, public draw verification pages and tools that help operators prove their draws are fair, transparent and well run.
                </p>
                
                <div className="my-8 p-6 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-4">We’re not a competition platform.</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2"><XCircle className="h-5 w-5 text-brand-cobalt"/> We don’t sell tickets.</li>
                        <li className="flex items-center gap-2"><XCircle className="h-5 w-5 text-brand-cobalt"/> We don’t pick winners for you behind the scenes.</li>
                    </ul>
                </div>

                <p>
                  CAFAAS sits alongside your existing website or platform and handles the technical side of fairness:
                </p>
                <ul className="list-disc pl-6 space-y-2 marker:text-brand-cobalt">
                    <li>recording entries</li>
                    <li>running auditable draws</li>
                    <li>publishing public audit pages</li>
                    <li>storing a cryptographically linked event history for every competition</li>
                </ul>

                <p className="font-bold text-xl text-zinc-900 dark:text-white pt-4">
                  Our goal is simple: Make it easy for honest operators to prove they’re honest.
                </p>
             </div>
          </div>
        </section>

        {/* Why CAFAAS exists */}
        <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
             <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Why we built CAFAAS</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                        Online competitions have exploded in popularity. With that growth comes a familiar pattern:
                    </p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-start gap-3">
                            <span className="h-6 w-6 rounded-full bg-brand-cobalt/10 dark:bg-red-900/30 flex items-center justify-center text-brand-cobalt dark:text-red-400 text-xs font-bold shrink-0">1</span>
                            <span className="text-zinc-700 dark:text-zinc-300">Players accuse operators of rigged draws</span>
                        </li>
                        <li className="flex items-start gap-3">
                             <span className="h-6 w-6 rounded-full bg-brand-cobalt/10 dark:bg-red-900/30 flex items-center justify-center text-brand-cobalt dark:text-red-400 text-xs font-bold shrink-0">2</span>
                             <span className="text-zinc-700 dark:text-zinc-300">Social media comments fill with “fixed” and “scam”</span>
                        </li>
                        <li className="flex items-start gap-3">
                             <span className="h-6 w-6 rounded-full bg-brand-cobalt/10 dark:bg-red-900/30 flex items-center justify-center text-brand-cobalt dark:text-red-400 text-xs font-bold shrink-0">3</span>
                             <span className="text-zinc-700 dark:text-zinc-300">Regulators receive more complaints</span>
                        </li>
                        <li className="flex items-start gap-3">
                             <span className="h-6 w-6 rounded-full bg-brand-cobalt/10 dark:bg-red-900/30 flex items-center justify-center text-brand-cobalt dark:text-red-400 text-xs font-bold shrink-0">4</span>
                             <span className="text-zinc-700 dark:text-zinc-300">Operators spend hours defending themselves</span>
                        </li>
                    </ul>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium italic">
                        Most of the time, those draws are fair — but there’s no easy way to prove it.
                    </p>
                </div>
                <div className="flex-1 bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800">
                     <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-6">We built CAFAAS to solve that:</h3>
                     <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-brand-cobalt"/>
                            <span className="text-zinc-700 dark:text-zinc-300">A shared fairness engine across operators</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-brand-cobalt"/>
                            <span className="text-zinc-700 dark:text-zinc-300">A tamper-evident chain of events for every draw</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-brand-cobalt"/>
                            <span className="text-zinc-700 dark:text-zinc-300">Public audit pages anyone can check</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-brand-cobalt"/>
                            <span className="text-zinc-700 dark:text-zinc-300">Tools that make it simple to demonstrate fairness, instead of just claiming it</span>
                        </li>
                     </ul>
                </div>
             </div>
          </div>
        </section>

        {/* What CAFAAS is (and isn't) */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
           <div className="container px-4 md:px-6 mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-12 text-center">What CAFAAS is — and what it isn’t</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                 {/* IS */}
                 <div className="bg-white dark:bg-black p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">CAFAAS is:</h3>
                    </div>
                    <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                        <li>• A fairness and audit infrastructure layer</li>
                        <li>• An event logging and draw auditing system</li>
                        <li>• A public verification tool for your competitions</li>
                        <li>• An API and dashboard for operators</li>
                    </ul>
                 </div>
                 
                 {/* IS NOT */}
                 <div className="bg-white dark:bg-black p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <XCircle className="h-6 w-6 text-brand-cobalt" />
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">CAFAAS is not:</h3>
                    </div>
                     <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                        <li>• A regulator or licensing authority</li>
                        <li>• A ticketing or checkout system</li>
                        <li>• A guarantee of legal compliance in your jurisdiction</li>
                        <li>• A competition marketplace or competitor to your site</li>
                    </ul>
                 </div>
              </div>

              <div className="mt-12 text-center max-w-2xl mx-auto">
                 <p className="text-lg text-zinc-700 dark:text-zinc-300 font-medium mb-4">
                    You keep full control over your brand, your website, your sales, and your marketing.
                 </p>
                 <p className="text-zinc-500 dark:text-zinc-400">
                    CAFAAS focuses purely on fairness, transparency and auditability.
                 </p>
              </div>
           </div>
        </section>

        {/* Built by operators */}
        <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
           <div className="container px-4 md:px-6 mx-auto max-w-4xl">
               <div className="flex flex-col md:flex-row gap-12 items-center">
                   <div className="flex-1">
                        <div className="h-12 w-12 bg-brand-cobalt/10 rounded-xl flex items-center justify-center mb-6 text-brand-cobalt">
                            <Users className="h-6 w-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Built from real operator experience</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                            CAFAAS wasn’t designed in a vacuum. It’s built from real-world experience running online competitions:
                        </p>
                        <ul className="grid grid-cols-1 gap-2 mb-6 text-zinc-700 dark:text-zinc-300 font-medium">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-cobalt" /> dealing with complaints</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-cobalt" /> responding to “prove the draw was fair”</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-cobalt" /> handling free entries and eligibility rules</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-cobalt" /> thinking about responsible play and fairness expectations</li>
                        </ul>
                   </div>
                   <div className="flex-1">
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-bold text-zinc-900 dark:text-white mb-4">That experience is baked into the product:</h3>
                             <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> sensible APIs</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> practical event logs</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> language your team actually understands</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> features focused on real problems, not theoretical ones</li>
                            </ul>
                        </div>
                   </div>
               </div>
           </div>
        </section>

        {/* Vision */}
        <section className="py-24 bg-brand-cobalt text-white text-center">
             <div className="container px-4 md:px-6 mx-auto max-w-3xl">
                <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                    <Eye className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-8">Our vision</h2>
                <div className="space-y-4 text-lg md:text-xl font-medium leading-relaxed opacity-90 mb-12">
                    <p>We believe fairness should be visible, not hidden.</p>
                    <p>Operators should have an easy way to prove they are doing things right.</p>
                    <p>Players should be able to verify a draw without needing to trust a vague screenshot.</p>
                    <p>Regulators and industry bodies should have better tools to understand what actually happened.</p>
                </div>
                <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto border-t border-white/20 pt-8">
                    CAFAAS aims to become the technical standard for fair draws across operators — a shared infrastructure layer that supports honest businesses and protects players.
                </p>
             </div>
        </section>

        <FaqBlock faqs={faqs} title="About page – mini FAQ" />
      </main>
      <SiteFooter />
    </div>
  );
}
