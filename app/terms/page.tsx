import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 font-sans">
      <SiteHeader />

      <section className="container mx-auto px-4 py-24 max-w-3xl">
         <h1 className="text-4xl font-bold mb-8 text-white">Terms of Service</h1>
         <div className="space-y-6 text-slate-400">
            <p>Last updated: October 24, 2025</p>
            
            <h2 className="text-2xl font-bold text-white mt-8">1. Acceptance of Terms</h2>
            <p>
               By accessing and using the CaaS Platform services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">2. Service Description</h2>
            <p>
               CaaS Platform provides a compliance and fairness engine for prize competitions ("Service"). You are responsible for obtaining access to the Service and that access may involve third party fees (such as Internet service provider or airtime charges).
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">3. Operator Responsibilities</h2>
            <p>As an operator using our platform, you agree to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
               <li>Comply with all applicable laws and regulations, including the UK Gambling Act 2005 and CAP Code.</li>
               <li>Ensure all competition data submitted to the API is accurate and truthful.</li>
               <li>Maintain the confidentiality of your API keys and account credentials.</li>
               <li>Not use the service for any illegal or unauthorized purpose.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">4. Intellectual Property</h2>
            <p>
               The Service and its original content, features and functionality are and will remain the exclusive property of CaaS Platform and its licensors. The Service is protected by copyright, trademark, and other laws of both the United Kingdom and foreign countries.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">5. Termination</h2>
            <p>
               We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">6. Changes to Terms</h2>
            <p>
               We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}

