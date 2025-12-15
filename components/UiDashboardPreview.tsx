import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, ExternalLink, MoreHorizontal, Search, Bell } from "lucide-react";

type UiDashboardPreviewProps = {
  screenshots?: any[];
};

export const UiDashboardPreview = ({ screenshots }: UiDashboardPreviewProps) => {
  return (
    <section className="py-32 bg-brand-navy relative overflow-hidden max-w-7xl mx-auto">
      <div className="mx-auto max-w-content px-6 relative z-10">
        <SectionHeading
          eyebrow="The Interface"
          title="Mission control for your competitions."
          description="Manage draws, export audits, and monitor integrity from one secure dashboard."
          align="center"
          className="mb-16"
        />

        {/* Browser Frame */}
        <div className="rounded-xl border border-white/10 bg-brand-slate/80 backdrop-blur-xl shadow-2xl overflow-hidden max-w-5xl mx-auto animate-in slide-in-from-bottom-8 fade-in duration-700">
            {/* Window Controls */}
            <div className="h-12 border-b border-white/10 bg-brand-navy flex items-center px-4 justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/50" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-brand-slate border border-white/5 text-xs text-muted-foreground w-96 justify-center font-mono">
                    <span className="text-slate-600">https://</span>app.caas.com/dashboard/overview
                </div>
                <div className="flex gap-3 text-muted-foreground">
                    <Bell className="w-4 h-4" />
                    <div className="w-5 h-5 rounded-full bg-brand-blue/20 border border-brand-blue/50" />
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 grid grid-cols-12 gap-6">
                {/* Sidebar */}
                <div className="col-span-2 space-y-6 hidden md:block">
                    <div className="space-y-1">
                        <div className="h-8 w-full bg-brand-blue/10 text-brand-blue rounded-md flex items-center px-3 text-sm font-medium">Overview</div>
                        <div className="h-8 w-full text-muted-foreground rounded-md flex items-center px-3 text-sm hover:bg-white/5 cursor-pointer">Competitions</div>
                        <div className="h-8 w-full text-muted-foreground rounded-md flex items-center px-3 text-sm hover:bg-white/5 cursor-pointer">Audits</div>
                        <div className="h-8 w-full text-muted-foreground rounded-md flex items-center px-3 text-sm hover:bg-white/5 cursor-pointer">Settings</div>
                    </div>
                </div>

                {/* Main Area */}
                <div className="col-span-12 md:col-span-10 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-2xl font-display font-semibold text-white">Draw Overview</h3>
                            <p className="text-muted-foreground text-sm">Manage your active and past competitions.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                                <Download className="w-4 h-4 mr-2" /> Export CSV
                            </Button>
                            <Button size="sm" className="bg-brand-blue text-white hover:bg-brand-blue/90">
                                + New Draw
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-brand-navy border border-white/5">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Entries</p>
                            <p className="text-2xl font-semibold text-white">12,402</p>
                        </div>
                         <div className="p-4 rounded-xl bg-brand-navy border border-white/5">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Audits Published</p>
                            <p className="text-2xl font-semibold text-white">156</p>
                        </div>
                         <div className="p-4 rounded-xl bg-brand-navy border border-white/5">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Integrity Score</p>
                            <p className="text-2xl font-semibold text-accent-mint">100%</p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-xl border border-white/5 bg-brand-navy overflow-hidden">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <p className="font-medium text-white">Recent Activity</p>
                            <Search className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="divide-y divide-white/5">
                             {[
                                { name: "Weekly Tech Bundle #42", status: "Live", entries: "1,204", audit: "Pending" },
                                { name: "Porsche 911 GT3 Draw", status: "Completed", entries: "15,000", audit: "Verified" },
                                { name: "Cash Prize £10k", status: "Completed", entries: "5,432", audit: "Verified" },
                             ].map((row, i) => (
                                 <div key={i} className="p-4 flex items-center justify-between text-sm hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3 w-1/3">
                                        <div className="w-8 h-8 rounded bg-brand-slate border border-white/10" />
                                        <span className="font-medium text-white">{row.name}</span>
                                    </div>
                                    <div className="text-muted-foreground">{row.entries} entries</div>
                                    <div>
                                        <span className={`px-2 py-1 rounded-full text-xs ${row.status === 'Live' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-white/5 text-muted-foreground'}`}>
                                            {row.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        {row.audit === "Verified" ? (
                                            <span className="flex items-center text-accent-mint text-xs">
                                                <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                                            </span>
                                        ) : (
                                            <span className="text-xs">Processing...</span>
                                        )}
                                    </div>
                                    <MoreHorizontal className="w-4 h-4 text-slate-600" />
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
