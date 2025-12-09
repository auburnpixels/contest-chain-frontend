import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600/30 font-sans">
      <SiteHeader />

      {/* Hero */}
      <section className="relative py-24 container mx-auto px-4 text-center">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-medium text-sm">All Systems Operational</span>
         </div>
         <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            System Status
         </h1>
         <p className="text-zinc-400 text-lg">
            Current status of Veristiq services.
         </p>
      </section>

      <section className="container mx-auto px-4 pb-24 max-w-4xl">
         <div className="space-y-4">
            <Card className="bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition-colors">
               <CardContent className="p-6 flex items-center justify-between">
                  <span className="font-medium text-white">API Gateway</span>
                  <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                     <CheckCircle2 className="h-5 w-5" />
                     Operational
                  </div>
               </CardContent>
            </Card>
            <Card className="bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition-colors">
               <CardContent className="p-6 flex items-center justify-between">
                  <span className="font-medium text-white">Draw Engine (CSPRNG)</span>
                  <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                     <CheckCircle2 className="h-5 w-5" />
                     Operational
                  </div>
               </CardContent>
            </Card>
            <Card className="bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition-colors">
               <CardContent className="p-6 flex items-center justify-between">
                  <span className="font-medium text-white">Audit Chain Storage</span>
                  <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                     <CheckCircle2 className="h-5 w-5" />
                     Operational
                  </div>
               </CardContent>
            </Card>
            <Card className="bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition-colors">
               <CardContent className="p-6 flex items-center justify-between">
                  <span className="font-medium text-white">Webhooks</span>
                  <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                     <CheckCircle2 className="h-5 w-5" />
                     Operational
                  </div>
               </CardContent>
            </Card>
            <Card className="bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition-colors">
               <CardContent className="p-6 flex items-center justify-between">
                  <span className="font-medium text-white">Dashboard</span>
                  <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                     <CheckCircle2 className="h-5 w-5" />
                     Operational
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="mt-20">
            <h3 className="text-xl font-bold text-white mb-8 tracking-tight">Past Incidents</h3>
            <div className="space-y-10">
               <div className="border-l-2 border-zinc-800 pl-8 pb-2 relative">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-zinc-900 border-2 border-zinc-700"></div>
                  <div className="text-sm text-zinc-500 mb-2 font-mono">Oct 15, 2025</div>
                  <h4 className="text-white font-bold text-lg mb-2">API Latency Spike</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                     We observed increased latency on the /entries endpoint. The issue was identified as a database contention issue and resolved within 15 minutes. No data was lost.
                  </p>
               </div>
               <div className="border-l-2 border-zinc-800 pl-8 pb-2 relative">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-zinc-900 border-2 border-zinc-700"></div>
                  <div className="text-sm text-zinc-500 mb-2 font-mono">Sep 02, 2025</div>
                  <h4 className="text-white font-bold text-lg mb-2">Scheduled Maintenance</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                     Routine database upgrades completed successfully.
                  </p>
               </div>
            </div>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}
