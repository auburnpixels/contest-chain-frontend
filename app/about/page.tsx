import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShieldCheck, Users, Target, Lock, Scale, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
             <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent"></div>

             <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                    <Target className="w-8 h-8 text-[var(--veristiq-teal)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Making Fairness the Standard</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Veristiq is the independent infrastructure layer for the prize competition industry. We build the tools that make trust possible.
                </p>
             </div>
        </section>

        {/* Mission */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] mb-6">Our Mission</h2>
                    <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed">
                        Online competitions have exploded in popularity, but trust hasn't kept pace. Players are skeptical of "screen recorded" draws, and regulators are demanding more transparency.
                        <br/><br/>
                        We believe that <strong>fairness should be provable, not just promised.</strong>
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 bg-[var(--veristiq-snow)] rounded-xl border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-[var(--veristiq-primary-blue)]">
                            <Scale className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Independence</h3>
                        <p className="text-sm text-gray-600">We are not an operator. We are not a marketplace. We are a neutral third-party verification service.</p>
                    </div>
                    <div className="p-6 bg-[var(--veristiq-snow)] rounded-xl border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-green-600">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Security</h3>
                        <p className="text-sm text-gray-600">We use cryptographic chaining to create an immutable record of every entry and every draw.</p>
                    </div>
                    <div className="p-6 bg-[var(--veristiq-snow)] rounded-xl border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-purple-600">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Transparency</h3>
                        <p className="text-sm text-gray-600">We believe in public auditability. Winners and draw logic should be visible to everyone.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Team/Story */}
        <section className="py-24 bg-[var(--veristiq-snow)] border-t border-gray-100">
             <div className="container mx-auto px-6 max-w-6xl">
                 <div className="flex flex-col md:flex-row gap-12 items-center">
                     <div className="flex-1">
                         <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] mb-6">Built by Industry Experts</h2>
                         <p className="text-[var(--veristiq-slate-light)] mb-6 leading-relaxed">
                             Veristiq was founded by a team of engineers and compliance specialists who saw a critical gap in the market: legitimate operators were struggling to prove their integrity amidst a sea of scams.
                         </p>
                         <p className="text-[var(--veristiq-slate-light)] mb-6 leading-relaxed">
                             We set out to build a "Fairness Engine" — a technical standard that could be adopted by any operator, big or small, to instantly upgrade their compliance and trust.
                         </p>
                     </div>
                     <div className="flex-1 grid grid-cols-2 gap-4">
                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                             <div className="text-4xl font-bold text-[var(--veristiq-primary-blue)] mb-2">1M+</div>
                             <div className="text-sm text-gray-500">Entries Verified</div>
                         </div>
                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                             <div className="text-4xl font-bold text-[var(--veristiq-primary-blue)] mb-2">100%</div>
                             <div className="text-sm text-gray-500">Uptime</div>
                         </div>
                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center col-span-2">
                             <div className="text-4xl font-bold text-[var(--veristiq-primary-blue)] mb-2">GB/UK</div>
                             <div className="text-sm text-gray-500">Based & Regulated</div>
                         </div>
                     </div>
                 </div>
             </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
