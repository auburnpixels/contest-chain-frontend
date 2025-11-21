import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Scale, BookOpen, AlertTriangle, CheckSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600/30 font-sans">
      <SiteHeader />

      {/* Hero */}
      <section className="relative py-24 container mx-auto px-4 text-center">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />
         <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 tracking-tight">
            UK Regulatory Alignment
         </h1>
         <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Built specifically for the UK Gambling Act 2005 and ASA CAP Code requirements.
         </p>
      </section>

      <section className="container mx-auto px-4 pb-24 max-w-5xl">
         <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-zinc-950 border-zinc-900 hover:border-zinc-700 transition-colors">
               <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                     <Scale className="h-6 w-6 text-blue-500" />
                     Gambling Act 2005
                  </CardTitle>
               </CardHeader>
               <CardContent className="text-zinc-400 space-y-6">
                  <p className="leading-relaxed">
                     To operate as a "Prize Competition" rather than a lottery, skill or knowledge must be required to enter, OR a free entry route must be available.
                  </p>
                  <div className="bg-black p-5 rounded-xl border border-zinc-800 text-sm">
                     <strong className="text-white block mb-3 font-medium">How we help:</strong>
                     <ul className="space-y-2">
                        <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-blue-500"></div> Automated handling of postal (free) entries</li>
                        <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-blue-500"></div> Integration with skill-based questions</li>
                        <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-blue-500"></div> Strict separation of paid and free entry pools</li>
                     </ul>
                  </div>
               </CardContent>
            </Card>

            <Card className="bg-zinc-950 border-zinc-900 hover:border-zinc-700 transition-colors">
               <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                     <BookOpen className="h-6 w-6 text-blue-500" />
                     ASA CAP Code
                  </CardTitle>
               </CardHeader>
               <CardContent className="text-zinc-400 space-y-6">
                  <p className="leading-relaxed">
                     Marketing communications must not be misleading. Promoters must be able to demonstrate that the award of prizes was administered fairly.
                  </p>
                  <div className="bg-black p-5 rounded-xl border border-zinc-800 text-sm">
                     <strong className="text-white block mb-3 font-medium">How we help:</strong>
                     <ul className="space-y-2">
                        <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-blue-500"></div> Immutable audit logs of the draw process</li>
                        <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-blue-500"></div> Public verification pages for winners</li>
                        <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-blue-500"></div> Evidence of random selection methodology</li>
                     </ul>
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">Specific Compliance Controls</h2>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="flex gap-4">
                  <div className="mt-1">
                     <CheckSquare className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                     <h3 className="font-bold text-white mb-1">No Purchase Necessary</h3>
                     <p className="text-sm text-zinc-400 leading-relaxed">
                        We treat free postal entries exactly the same as paid entries in the random draw algorithm, a key requirement for legal compliance.
                     </p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="mt-1">
                     <CheckSquare className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                     <h3 className="font-bold text-white mb-1">Winner Transparency</h3>
                     <p className="text-sm text-zinc-400 leading-relaxed">
                        We publish the winning ticket ID and the cryptographic seed used to select it, allowing anyone to verify the result independently.
                     </p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="mt-1">
                     <CheckSquare className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                     <h3 className="font-bold text-white mb-1">Data Minimization</h3>
                     <p className="text-sm text-zinc-400 leading-relaxed">
                        We only store the data necessary to validate the entry. PII is encrypted and can be automatically purged according to your retention policy.
                     </p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="mt-1">
                     <CheckSquare className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                     <h3 className="font-bold text-white mb-1">Cap Enforcement</h3>
                     <p className="text-sm text-zinc-400 leading-relaxed">
                        Our system strictly enforces ticket caps. Once a competition is sold out, the API rejects further entries instantly to prevent over-selling.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}
