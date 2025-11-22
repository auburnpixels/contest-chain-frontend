import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 font-sans">
      <SiteHeader />

      <section className="container mx-auto px-4 py-24 max-w-3xl">
         <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
         <div className="space-y-6 text-muted-foreground">
            <p>Last updated: October 24, 2025</p>
            
            <h2 className="text-2xl font-bold text-white mt-8">1. Introduction</h2>
            <p>
               CaaS Platform ("we", "our", "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">2. The Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
               <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
               <li><strong>Contact Data</strong> includes billing address, email address and telephone numbers.</li>
               <li><strong>Transaction Data</strong> includes details about payments to and from you.</li>
               <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
               <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
               <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
               <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">4. Data Security</h2>
            <p>
               We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">5. Contact Us</h2>
            <p>
               If you have any questions about this privacy policy, please contact us at <a href="mailto:privacy@caas-platform.com" className="text-blue-400 hover:underline">privacy@caas-platform.com</a>.
            </p>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}

