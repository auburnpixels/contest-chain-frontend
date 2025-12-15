import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Quote, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
             
            <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                    <Quote className="w-8 h-8 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">What operators are saying</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Real feedback from competition operators using Veristiq.
                </p>
            </div>
        </section>

        {/* Featured Testimonial */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            
            <div className="bg-gradient-to-br from-[var(--veristiq-snow)] to-white rounded-3xl border border-gray-200 shadow-xl p-10 md:p-16 relative overflow-hidden">
                {/* Decorative quote mark */}
                <div className="absolute top-8 left-8 opacity-5">
                    <Quote className="w-32 h-32 text-[var(--veristiq-primary-blue)]" />
                </div>
                
                <div className="relative z-10">
                    {/* Quote */}
                    <blockquote className="text-2xl md:text-3xl font-medium text-[var(--veristiq-slate)] leading-relaxed mb-10">
                        &ldquo;Veristiq has transformed how our players perceive our competitions. The public audit pages give them confidence that every draw is fair, and we&apos;ve seen a significant reduction in support queries about draw integrity. It&apos;s become an essential part of how we operate.&rdquo;
                    </blockquote>
                    
                    {/* Attribution */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--veristiq-primary-blue)] to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            R
                        </div>
                        <div>
                            <div className="font-bold text-lg text-[var(--veristiq-slate)]">[Name], [Title]</div>
                            <div className="text-[var(--veristiq-slate-light)]">Raffaly</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
                <p className="text-[var(--veristiq-slate-light)] mb-6">
                    Ready to build trust with your players?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                        <Button size="lg" className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white font-semibold px-8 shadow-md">
                            Get in Touch
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                    <Link href="/case-studies">
                        <Button size="lg" variant="outline" className="border-gray-300 text-[var(--veristiq-slate)] hover:bg-gray-50 font-semibold px-8">
                            View Case Study
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
