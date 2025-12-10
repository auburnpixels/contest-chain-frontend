import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
             <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent"></div>

             <div className="container mx-auto px-6 max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
                <p className="text-xl text-gray-300">
                    Last updated: October 24, 2025
                </p>
             </div>
        </section>

        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                 <div className="prose prose-lg max-w-none text-gray-600">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[var(--veristiq-primary-blue)] text-sm">1</span>
                            Acceptance of Terms
                        </h2>
                        <p>
                           By accessing and using the Veristiq services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[var(--veristiq-primary-blue)] text-sm">2</span>
                            Service Description
                        </h2>
                        <p>
                           Veristiq provides a compliance and fairness engine for prize competitions ("Service"). You are responsible for obtaining access to the Service and that access may involve third party fees (such as Internet service provider or airtime charges).
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[var(--veristiq-primary-blue)] text-sm">3</span>
                            Operator Responsibilities
                        </h2>
                        <p className="mb-4">As an operator using our platform, you agree to:</p>
                        <ul className="space-y-3 pl-2 list-none">
                           <li className="flex gap-3">
                               <div className="h-2 w-2 rounded-full bg-[var(--veristiq-primary-blue)] mt-2.5 shrink-0" />
                               <span>Comply with all applicable laws and regulations, including the UK Gambling Act 2005 and CAP Code.</span>
                           </li>
                           <li className="flex gap-3">
                               <div className="h-2 w-2 rounded-full bg-[var(--veristiq-primary-blue)] mt-2.5 shrink-0" />
                               <span>Ensure all competition data submitted to the API is accurate and truthful.</span>
                           </li>
                           <li className="flex gap-3">
                               <div className="h-2 w-2 rounded-full bg-[var(--veristiq-primary-blue)] mt-2.5 shrink-0" />
                               <span>Maintain the confidentiality of your API keys and account credentials.</span>
                           </li>
                           <li className="flex gap-3">
                               <div className="h-2 w-2 rounded-full bg-[var(--veristiq-primary-blue)] mt-2.5 shrink-0" />
                               <span>Not use the service for any illegal or unauthorized purpose.</span>
                           </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[var(--veristiq-primary-blue)] text-sm">4</span>
                            Intellectual Property
                        </h2>
                        <p>
                           The Service and its original content, features and functionality are and will remain the exclusive property of Veristiq and its licensors. The Service is protected by copyright, trademark, and other laws of both the United Kingdom and foreign countries.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[var(--veristiq-primary-blue)] text-sm">5</span>
                            Termination
                        </h2>
                        <p>
                           We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[var(--veristiq-primary-blue)] text-sm">6</span>
                            Changes to Terms
                        </h2>
                        <p>
                           We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
                        </p>
                    </section>
                 </div>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
