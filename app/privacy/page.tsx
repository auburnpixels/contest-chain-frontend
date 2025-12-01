import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />

      <section className="container mx-auto px-6 py-24 max-w-4xl">
         <div className="mb-16 border-b border-white/10 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Privacy Policy</h1>
            <p className="text-zinc-400">Last updated: October 24, 2025</p>
         </div>

         <div className="space-y-12 text-lg text-zinc-300 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400">1</span>
                    Introduction
                </h2>
                <p>
                   Cafaas Platform ("we", "our", "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or use our services.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400">2</span>
                    The Data We Collect
                </h2>
                <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                <ul className="space-y-3 pl-2">
                   <li className="flex gap-3 text-zinc-300">
                       <div className="h-2 w-2 rounded-full bg-brand-cobalt mt-2.5 shrink-0" />
                       <span><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</span>
                   </li>
                   <li className="flex gap-3 text-zinc-300">
                       <div className="h-2 w-2 rounded-full bg-brand-cobalt mt-2.5 shrink-0" />
                       <span><strong>Contact Data</strong> includes billing address, email address and telephone numbers.</span>
                   </li>
                   <li className="flex gap-3 text-zinc-300">
                       <div className="h-2 w-2 rounded-full bg-brand-cobalt mt-2.5 shrink-0" />
                       <span><strong>Transaction Data</strong> includes details about payments to and from you.</span>
                   </li>
                   <li className="flex gap-3 text-zinc-300">
                       <div className="h-2 w-2 rounded-full bg-brand-cobalt mt-2.5 shrink-0" />
                       <span><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</span>
                   </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400">3</span>
                    How We Use Your Data
                </h2>
                <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <ul className="space-y-3 pl-2">
                   <li className="flex gap-3 text-zinc-300">
                       <div className="h-2 w-2 rounded-full bg-brand-cobalt mt-2.5 shrink-0" />
                       <span>Where we need to perform the contract we are about to enter into or have entered into with you.</span>
                   </li>
                   <li className="flex gap-3 text-zinc-300">
                       <div className="h-2 w-2 rounded-full bg-brand-cobalt mt-2.5 shrink-0" />
                       <span>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</span>
                   </li>
                   <li className="flex gap-3 text-zinc-300">
                       <div className="h-2 w-2 rounded-full bg-brand-cobalt mt-2.5 shrink-0" />
                       <span>Where we need to comply with a legal or regulatory obligation.</span>
                   </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400">4</span>
                    Data Security
                </h2>
                <p>
                   We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-sm text-zinc-400">5</span>
                    Contact Us
                </h2>
                <p>
                   If you have any questions about this privacy policy, please contact us at <a href="mailto:privacy@caas-platform.com" className="text-brand-cobalt hover:text-white transition-colors underline decoration-brand-cobalt/30 underline-offset-4">privacy@caas-platform.com</a>.
                </p>
            </section>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}

