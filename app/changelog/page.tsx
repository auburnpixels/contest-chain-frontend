import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600/30 font-sans">
      <SiteHeader />

      {/* Hero */}
      <section className="relative py-24 container mx-auto px-4 text-center">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />
         <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 tracking-tight">
            Changelog
         </h1>
         <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Latest updates, improvements, and fixes to the CaaS Platform.
         </p>
      </section>

      <section className="container mx-auto px-4 pb-24 max-w-3xl">
         <div className="space-y-16 relative before:absolute before:left-8 before:top-0 before:bottom-0 before:w-px before:bg-zinc-800">
            {/* Entry 1 */}
            <div className="relative pl-24">
               <div className="absolute left-0 top-1.5 text-sm text-zinc-500 font-mono bg-black pr-2 z-10">Oct 24</div>
               <div className="absolute left-[28px] top-2 h-3 w-3 rounded-full bg-blue-600 ring-4 ring-black z-10 shadow-[0_0_10px_#2563EB]"></div>
               
               <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 hover:border-zinc-800 transition-colors">
                  <div className="flex items-center gap-4 mb-5">
                     <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20 rounded-md">New</Badge>
                     <h2 className="text-xl font-bold text-white tracking-tight">Enhanced Regulator Dashboard</h2>
                  </div>
                  <p className="text-zinc-400 mb-6 leading-relaxed">
                     We've completely overhauled the regulator portal to provide real-time insights into operator compliance scores.
                  </p>
                  <ul className="space-y-2">
                     <li className="flex items-center gap-3 text-zinc-400 text-sm"><div className="h-1.5 w-1.5 rounded-full bg-zinc-700"></div> Added global ecosystem health metrics</li>
                     <li className="flex items-center gap-3 text-zinc-400 text-sm"><div className="h-1.5 w-1.5 rounded-full bg-zinc-700"></div> Implemented automated anomaly detection alerts</li>
                     <li className="flex items-center gap-3 text-zinc-400 text-sm"><div className="h-1.5 w-1.5 rounded-full bg-zinc-700"></div> Standardized CSV export formats for audit logs</li>
                  </ul>
               </div>
            </div>

            {/* Entry 2 */}
            <div className="relative pl-24">
               <div className="absolute left-0 top-1.5 text-sm text-zinc-500 font-mono bg-black pr-2 z-10">Oct 10</div>
               <div className="absolute left-[28px] top-2 h-3 w-3 rounded-full bg-zinc-700 ring-4 ring-black z-10"></div>
               
               <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 hover:border-zinc-800 transition-colors">
                  <div className="flex items-center gap-4 mb-5">
                     <Badge variant="outline" className="text-zinc-400 border-zinc-700 rounded-md">Improvement</Badge>
                     <h2 className="text-xl font-bold text-white tracking-tight">Webhook Retries</h2>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                     Improved reliability for webhook delivery. Failed webhooks will now be retried with exponential backoff for up to 24 hours.
                  </p>
               </div>
            </div>

            {/* Entry 3 */}
            <div className="relative pl-24">
               <div className="absolute left-0 top-1.5 text-sm text-zinc-500 font-mono bg-black pr-2 z-10">Sep 28</div>
               <div className="absolute left-[28px] top-2 h-3 w-3 rounded-full bg-blue-600 ring-4 ring-black z-10 shadow-[0_0_10px_#2563EB]"></div>
               
               <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 hover:border-zinc-800 transition-colors">
                  <div className="flex items-center gap-4 mb-5">
                     <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20 rounded-md">Beta</Badge>
                     <h2 className="text-xl font-bold text-white tracking-tight">Public Beta Launch</h2>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                     CaaS Platform is now open for public beta registration. Operators can sign up and start creating test competitions in the sandbox environment.
                  </p>
               </div>
            </div>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}
