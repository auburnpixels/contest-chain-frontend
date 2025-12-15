import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Check, TrendingUp, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
             
            <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                    <FileText className="w-8 h-8 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    See how competition operators use Veristiq to build trust and streamline compliance.
                </p>
            </div>
        </section>

        {/* Raffaly Case Study */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            
            {/* Case Study Header */}
            <div className="mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[var(--veristiq-primary-blue)] rounded-full text-sm font-medium mb-6">
                    Featured Case Study
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--veristiq-slate)] mb-4">Raffaly</h2>
                <p className="text-lg text-[var(--veristiq-slate-light)] max-w-2xl mx-auto">
                    How a leading UK competition platform uses Veristiq to verify every draw and build player confidence.
                </p>
            </div>

            {/* Challenge / Solution / Results */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-gradient-to-br from-[var(--veristiq-snow)] to-white p-8 rounded-2xl border border-gray-200">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-4">The Challenge</h3>
                    <p className="text-[var(--veristiq-slate-light)] leading-relaxed">
                        [Placeholder: Describe the challenge Raffaly faced before using Veristiq—e.g., player trust issues, compliance concerns, or operational overhead from manual verification.]
                    </p>
                </div>

                <div className="bg-gradient-to-br from-[var(--veristiq-snow)] to-white p-8 rounded-2xl border border-gray-200">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-[var(--veristiq-primary-blue)] mb-6">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-4">The Solution</h3>
                    <p className="text-[var(--veristiq-slate-light)] leading-relaxed">
                        Raffaly integrated Veristiq&apos;s API to independently verify every draw. Each competition now generates a public audit page that players can access to confirm draw fairness.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-[var(--veristiq-snow)] to-white p-8 rounded-2xl border border-gray-200">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-4">The Results</h3>
                    <p className="text-[var(--veristiq-slate-light)] leading-relaxed">
                        [Placeholder: Add specific metrics—e.g., reduction in support queries, increase in player confidence, time saved on compliance reporting.]
                    </p>
                </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-[var(--veristiq-slate)] rounded-2xl p-10 md:p-12 text-white mb-16">
                <h3 className="text-2xl font-bold mb-8 text-center">Key Benefits</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-[var(--veristiq-teal)]" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-1">Independent Verification</h4>
                            <p className="text-gray-300 text-sm">Every draw is verified by a third party, not internal systems.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-[var(--veristiq-teal)]" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-1">Public Audit Pages</h4>
                            <p className="text-gray-300 text-sm">Players can verify their entry was included in the draw pool.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-[var(--veristiq-teal)]" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-1">Reduced Disputes</h4>
                            <p className="text-gray-300 text-sm">Cryptographic proof eliminates ambiguity about draw fairness.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-[var(--veristiq-teal)]" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-1">Compliance Ready</h4>
                            <p className="text-gray-300 text-sm">Audit reports available instantly for regulatory inquiries.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center">
                <p className="text-[var(--veristiq-slate-light)] mb-6">
                    Want similar results for your platform?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                        <Button size="lg" className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white font-semibold px-8 shadow-md">
                            Get in Touch
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                    <Link href="/operator/register">
                        <Button size="lg" variant="outline" className="border-gray-300 text-[var(--veristiq-slate)] hover:bg-gray-50 font-semibold px-8">
                            Start Free Trial
                        </Button>
                    </Link>
                </div>
            </div>

          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
