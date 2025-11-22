import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 font-sans">
      <SiteHeader />

      <section className="container mx-auto px-4 py-24 max-w-3xl">
         <h1 className="text-4xl font-bold mb-8 text-white">Legal Information</h1>
         <div className="space-y-6 text-muted-foreground">
            <p>
               CaaS Platform is a trading name of CaaS Technology Ltd, a company registered in England and Wales.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8">Company Details</h2>
            <ul className="list-none space-y-2">
               <li><strong>Company Number:</strong> 12345678</li>
               <li><strong>VAT Number:</strong> GB 123 4567 89</li>
               <li><strong>Registered Office:</strong> 123 Innovation Drive, London, EC2A 4NE, United Kingdom</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">Regulatory Status</h2>
            <p>
               CaaS Platform provides software infrastructure for prize competitions. We are a technology provider and not a gambling operator. Our customers are responsible for ensuring their competitions comply with the Gambling Act 2005 and obtaining any necessary licenses.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">Policies</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
               <li><a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a></li>
               <li><a href="/terms" className="text-blue-400 hover:underline">Terms of Service</a></li>
               <li><a href="/security" className="text-blue-400 hover:underline">Security Policy</a></li>
               <li><a href="#" className="text-blue-400 hover:underline">Acceptable Use Policy</a></li>
            </ul>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}

