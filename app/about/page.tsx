import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShieldCheck, Users, Target, Lock, Scale, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Veristiq — Independent Prize Draw Verification",
  description: "Veristiq is an independent verification layer for prize competitions. We exist solely to verify and evidence draws — not to run competitions or sell tickets.",
  openGraph: {
    title: "About Veristiq — Independent Prize Draw Verification",
    description: "Veristiq exists solely to verify and evidence prize draws independently.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

             <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                    <Target className="w-8 h-8 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Making Fairness Verifiable
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Veristiq is an independent infrastructure layer for the prize competition industry, providing the technical infrastructure that makes fairness independently verifiable.
                </p>
             </div>
        </section>

        {/* Mission */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] mb-6">Our Mission</h2>
                    <p className="text-lg text-[var(--veristiq-slate-light)] leading-relaxed">
                        Online competitions have grown rapidly, but trust has not kept pace. Players are increasingly sceptical of “screen-recorded” draws, while regulators are raising expectations around transparency and accountability.
                        <br/><br/>
                        We believe fairness should be provable — not merely asserted or implied.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 bg-[var(--veristiq-snow)] rounded-xl border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-[var(--veristiq-primary-blue)]">
                            <Scale className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Independence</h3>
                        <p className="text-sm text-gray-600">
                            Veristiq does not operate competitions and does not act as a marketplace. We provide neutral, third-party technical verification.
                        </p>
                    </div>
                    <div className="p-6 bg-[var(--veristiq-snow)] rounded-xl border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-[var(--veristiq-primary-blue)]">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Security</h3>
                        <p className="text-sm text-gray-600">
                            We use cryptographic chaining to create a tamper-evident record of every entry and every draw.
                        </p>
                    </div>
                    <div className="p-6 bg-[var(--veristiq-snow)] rounded-xl border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-[var(--veristiq-primary-blue)]">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Transparency</h3>
                        <p className="text-sm text-gray-600">
                            We support public auditability by enabling draw outcomes and verification data to be made publicly accessible.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Team/Story */}
        <section className="py-24 bg-[var(--veristiq-snow)] border-t border-gray-100">
             <div className="container mx-auto px-6 max-w-6xl">
                 <div className="flex flex-col md:flex-row gap-12 items-center">
                     <div className="flex-1">
                         <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] mb-6">
                             Built by Engineers Focused on Fairness Infrastructure
                         </h2>
                         <p className="text-[var(--veristiq-slate-light)] mb-6 leading-relaxed">
                             Veristiq was founded by engineers with experience building secure, auditable systems, who identified a gap in the market: operators lacked independent technical tools to demonstrate fairness once a draw had taken place.
                         </p>
                         <p className="text-[var(--veristiq-slate-light)] mb-6 leading-relaxed">
                             We set out to build a fairness verification engine — a technical layer that operators of any size can integrate to strengthen auditability, transparency, and regulatory confidence.
                         </p>
                     </div>
                     <div className="flex-1 grid grid-cols-2 gap-4">
                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                             <div className="text-xl font-bold text-[var(--veristiq-primary-blue)] mb-2">1M+ entries logged</div>
                             <div className="text-sm text-gray-500">across verified draw records</div>
                         </div>
                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                             <div className="text-base font-bold text-[var(--veristiq-primary-blue)] mb-2">Production infrastructure</div>
                             <div className="text-sm text-gray-500">with active monitoring</div>
                         </div>
                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center col-span-2">
                             <div className="text-xl font-bold text-[var(--veristiq-primary-blue)] mb-2">UK-based company</div>
                             <div className="text-sm text-gray-500">operating under UK law</div>
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
