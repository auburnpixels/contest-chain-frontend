import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPage() {
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
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
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
                            Introduction
                        </h2>
                        <p>
                           Veristiq ("we", "our", "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or use our services.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[var(--veristiq-primary-blue)] text-sm">2</span>
                            The Data We Collect
                        </h2>
                        <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                        <ul className="space-y-3 pl-2 list-none">
                           <li className="flex gap-3">
                               <div className="h-2 w-2 rounded-full bg-[var(--veristiq-primary-blue)] mt-2.5 shrink-0" />
                               <span><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</span>
                           </li>
                           <li className="flex gap-3">
                               <div className="h-2 w-2 rounded-full bg-[var(--veristiq-primary-blue)] mt-2.5 shrink-0" />
                               <span><strong>Contact Data</strong> includes billing address, email address and telephone numbers.</span>
                           </li>
                           <li className="flex gap-3">
                               <div className="h-2 w-2 rounded-full bg-[var(--veristiq-primary-blue)] mt-2.5 shrink-0" />
                               <span><strong>Transaction Data</strong> includes details about payments to and from you.</span>
                           </li>
                           <li className="flex gap-3">
                               <div className="h-2 w-2 rounded-full bg-[var(--veristiq-primary-blue)] mt-2.5 shrink-0" />
                               <span><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</span>
                           </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[var(--veristiq-primary-blue)] text-sm">3</span>
                            How We Use Your Data
                        </h2>
                        <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul className="space-y-3 pl-2 list-none">
                           <li className="flex gap-3">
                               <div className="h-2 w-2 rounded-full bg-[var(--veristiq-primary-blue)] mt-2.5 shrink-0" />
                               <span>Where we need to perform the contract we are about to enter into or have entered into with you.</span>
                           </li>
                           <li className="flex gap-3">
                               <div className="h-2 w-2 rounded-full bg-[var(--veristiq-primary-blue)] mt-2.5 shrink-0" />
                               <span>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</span>
                           </li>
                           <li className="flex gap-3">
                               <div className="h-2 w-2 rounded-full bg-[var(--veristiq-primary-blue)] mt-2.5 shrink-0" />
                               <span>Where we need to comply with a legal or regulatory obligation.</span>
                           </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[var(--veristiq-primary-blue)] text-sm">4</span>
                            Data Security
                        </h2>
                        <p>
                           We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[var(--veristiq-primary-blue)] text-sm">5</span>
                            Contact Us
                        </h2>
                        <p>
                           If you have any questions about this privacy policy, please contact us at <a href="mailto:privacy@veristiq.com" className="text-[var(--veristiq-primary-blue)] hover:text-blue-700 transition-colors font-medium">privacy@veristiq.com</a>.
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
