import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">
        
        {/* Hero */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
             
             <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                    <Mail className="w-8 h-8 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in touch</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Ready to build trust? Our team is here to help you integrate.
                </p>
             </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            
            <div className="grid md:grid-cols-2 gap-12">
                {/* Email Card */}
                <div className="bg-gradient-to-br from-[var(--veristiq-snow)] to-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-left-8 duration-700 delay-100 fill-mode-both">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-[var(--veristiq-primary-blue)] mb-6">
                        <Mail className="w-7 h-7" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-[var(--veristiq-slate)]">Email Us</h2>
                    <p className="text-[var(--veristiq-slate-light)] mb-6">
                        Whether you&apos;re a small operator or an enterprise platform, we&apos;re happy to discuss how Veristiq can work for you.
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        We typically respond within 24 hours.
                    </p>
                    <Link href="mailto:liam@raffaly.com">
                        <Button size="lg" className="w-full bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white font-semibold">
                            Send Email
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>

                {/* Office Card */}
                <div className="bg-gradient-to-br from-[var(--veristiq-snow)] to-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-right-8 duration-700 delay-200 fill-mode-both">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-[var(--veristiq-primary-blue)] mb-6">
                        <MapPin className="w-7 h-7" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-[var(--veristiq-slate)]">Office</h2>
                    <p className="text-[var(--veristiq-slate-light)] mb-6">
                        We&apos;re a UK-based company operating under UK law.
                    </p>
                    <address className="not-italic text-[var(--veristiq-slate)] leading-relaxed">
                        14 Bonhill Street<br/>
                        London EC2A 4BX<br/>
                        United Kingdom
                    </address>
                </div>
            </div>

            {/* Additional CTA */}
            <div className="mt-16 text-center">
                <p className="text-[var(--veristiq-slate-light)] mb-6">
                    Want to explore the platform first?
                </p>
                <Link href="/operator/register">
                    <Button variant="outline" size="lg" className="border-gray-300 text-[var(--veristiq-slate)] hover:bg-gray-50 font-semibold px-8">
                        Create a Free Account
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
