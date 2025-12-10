import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle, Activity } from "lucide-react";

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
             <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent"></div>

             <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 mb-8 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="font-medium text-sm">All Systems Operational</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">System Status</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Current status of Veristiq services.
                </p>
             </div>
        </section>

        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="space-y-4">
                    {[
                        "API Gateway",
                        "Draw Engine (CSPRNG)",
                        "Audit Chain Storage",
                        "Webhooks",
                        "Dashboard"
                    ].map((service) => (
                        <Card key={service} className="bg-white border-gray-200 hover:shadow-md transition-all">
                            <CardContent className="p-6 flex items-center justify-between">
                                <span className="font-medium text-[var(--veristiq-slate)]">{service}</span>
                                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                                    <CheckCircle2 className="h-5 w-5" />
                                    Operational
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-20">
                    <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-8 tracking-tight flex items-center gap-2">
                        <Activity className="w-5 h-5 text-gray-400" />
                        Past Incidents
                    </h3>
                    <div className="space-y-10">
                        <div className="border-l-2 border-gray-200 pl-8 pb-2 relative">
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white border-4 border-gray-200"></div>
                            <div className="text-sm text-gray-400 mb-2 font-mono">Oct 15, 2025</div>
                            <h4 className="text-[var(--veristiq-slate)] font-bold text-lg mb-2">API Latency Spike</h4>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                                We observed increased latency on the /entries endpoint. The issue was identified as a database contention issue and resolved within 15 minutes. No data was lost.
                            </p>
                        </div>
                        <div className="border-l-2 border-gray-200 pl-8 pb-2 relative">
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white border-4 border-gray-200"></div>
                            <div className="text-sm text-gray-400 mb-2 font-mono">Sep 02, 2025</div>
                            <h4 className="text-[var(--veristiq-slate)] font-bold text-lg mb-2">Scheduled Maintenance</h4>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                                Routine database upgrades completed successfully.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
