import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Check, Shield, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">
        
        {/* Hero */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
             
            <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                    <Shield className="w-8 h-8 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, predictable pricing</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    No per-ticket fees. No per-draw charges. Just straightforward monthly pricing that works for operators of all sizes.
                </p>
            </div>
        </section>

        {/* Main Content */}
        <section className="py-24 bg-white -mt-16 relative z-20">
            <div className="container mx-auto px-6 max-w-4xl">
                
                {/* Contact Card */}
                <div className="bg-gradient-to-br from-[var(--veristiq-snow)] to-white rounded-2xl border border-gray-200 shadow-xl p-8 md:p-12 mb-16">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[var(--veristiq-primary-blue)] rounded-full text-sm font-medium mb-6">
                            <MessageCircle className="w-4 h-4" />
                            Let&apos;s find the right fit
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--veristiq-slate)] mb-4">
                            Pricing tailored to your needs
                        </h2>
                        <p className="text-[var(--veristiq-slate-light)] max-w-xl mx-auto">
                            Every operator is different. Whether you&apos;re running a few competitions a month or managing high-volume operations, we&apos;ll work with you to find pricing that makes sense.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white font-semibold px-8 shadow-md">
                                Talk to Us
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

                {/* What's Included */}
                <div className="mb-16">
                    <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-6 text-center">What&apos;s included</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-medium text-[var(--veristiq-slate)]">Unlimited competitions</span>
                                <p className="text-sm text-gray-500 mt-0.5">Run as many as you need</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-medium text-[var(--veristiq-slate)]">Cryptographically verified draws</span>
                                <p className="text-sm text-gray-500 mt-0.5">CSPRNG with external entropy</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-medium text-[var(--veristiq-slate)]">Public audit pages</span>
                                <p className="text-sm text-gray-500 mt-0.5">Shareable verification for every draw</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-medium text-[var(--veristiq-slate)]">Chain integrity verification</span>
                                <p className="text-sm text-gray-500 mt-0.5">Tamper-evident audit trail</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-medium text-[var(--veristiq-slate)]">Compliance reporting</span>
                                <p className="text-sm text-gray-500 mt-0.5">Ready for regulator requests</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-medium text-[var(--veristiq-slate)]">Full API access</span>
                                <p className="text-sm text-gray-500 mt-0.5">Integrate with your platform</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-[var(--veristiq-snow)]">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-16 text-[var(--veristiq-slate)]">Common Questions</h2>
                <div className="grid gap-6">
                    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Do I need a credit card to sign up?</h3>
                        <p className="text-gray-600">No. You can create an account and explore the dashboard without adding payment details. We&apos;ll discuss pricing when you&apos;re ready to go live.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Are there per-ticket or per-draw fees?</h3>
                        <p className="text-gray-600">No. We believe in predictable pricing. You pay a monthly subscription—run as many competitions and draws as you need without worrying about variable costs.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-2">How does pricing work?</h3>
                        <p className="text-gray-600">We offer flexible monthly pricing based on your operation&apos;s scale. Get in touch and we&apos;ll put together something that works for your situation.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Can I try before I commit?</h3>
                        <p className="text-gray-600">Yes. Create a free account to explore the dashboard, generate test API keys, and understand how the system works before making any commitment.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-[var(--veristiq-slate)]">
            <div className="container mx-auto px-6 max-w-3xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get started?</h2>
                <p className="text-xl text-gray-300 mb-10">
                    Create a free account to explore, or get in touch to discuss your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/operator/register">
                        <Button size="lg" className="bg-white text-[var(--veristiq-slate)] hover:bg-gray-100 font-semibold px-8 shadow-lg">
                            Create Free Account
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8">
                            Contact Us
                        </Button>
                    </Link>
                </div>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
