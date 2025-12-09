import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />

      <section className="container mx-auto px-6 py-24 max-w-4xl">
         <div className="mb-16 border-b border-white/10 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Terms of Service</h1>
            <p className="text-zinc-400">Last updated: October 24, 2025</p>
         </div>

         <div className="space-y-12 text-lg text-zinc-300 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400">1</span>
                    Acceptance of Terms
                </h2>
                <p>
                   By accessing and using the Veristiq services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400">2</span>
                    Service Description
                </h2>
                <p>
                   Veristiq provides a compliance and fairness engine for prize competitions ("Service"). You are responsible for obtaining access to the Service and that access may involve third party fees (such as Internet service provider or airtime charges).
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400">3</span>
                    Operator Responsibilities
                </h2>
                <p className="mb-4">As an operator using our platform, you agree to:</p>
                <ul className="space-y-3 pl-2">
                   <li className="flex gap-3 text-zinc-300">
                       <div className="h-2 w-2 rounded-full bg-brand-cobalt mt-2.5 shrink-0" />
                       <span>Comply with all applicable laws and regulations, including the UK Gambling Act 2005 and CAP Code.</span>
                   </li>
                   <li className="flex gap-3 text-zinc-300">
                       <div className="h-2 w-2 rounded-full bg-brand-cobalt mt-2.5 shrink-0" />
                       <span>Ensure all competition data submitted to the API is accurate and truthful.</span>
                   </li>
                   <li className="flex gap-3 text-zinc-300">
                       <div className="h-2 w-2 rounded-full bg-brand-cobalt mt-2.5 shrink-0" />
                       <span>Maintain the confidentiality of your API keys and account credentials.</span>
                   </li>
                   <li className="flex gap-3 text-zinc-300">
                       <div className="h-2 w-2 rounded-full bg-brand-cobalt mt-2.5 shrink-0" />
                       <span>Not use the service for any illegal or unauthorized purpose.</span>
                   </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400">4</span>
                    Intellectual Property
                </h2>
                <p>
                   The Service and its original content, features and functionality are and will remain the exclusive property of Veristiq and its licensors. The Service is protected by copyright, trademark, and other laws of both the United Kingdom and foreign countries.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400">5</span>
                    Termination
                </h2>
                <p>
                   We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400">6</span>
                    Changes to Terms
                </h2>
                <p>
                   We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
            </section>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}

