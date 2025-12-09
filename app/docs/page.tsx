import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Terminal, Lock, Database, RefreshCw, FileText, Webhook } from "lucide-react";

export default function DocsPage() {
  const sections = [
      {
          title: "Authentication",
          icon: Lock,
          content: "Secure access with Bearer tokens. Scoped keys for read-only, write-only (entries), and admin access."
      },
      {
          title: "Entries",
          icon: Database,
          content: "High-throughput ingestion endpoint. Send entry data with optional metadata. Entries are hashed immediately."
      },
      {
          title: "Draws",
          icon: RefreshCw,
          content: "Execute draws on-demand. Trigger the RNG engine, lock the pool, and select winners atomically."
      },
      {
          title: "Audit Chain",
          icon: FileText,
          content: "Retrieve cryptographic proofs. Fetch the hash chain, seed data, and signature history for verification."
      },
       {
          title: "Webhooks",
          icon: Webhook,
          content: "Subscribe to events like `draw.completed` or `audit.published` to automate your post-draw workflows."
      }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-20 bg-[var(--veristiq-slate)] text-white border-b border-gray-100">
             <div className="container mx-auto px-6 max-w-4xl">
                 <div className="flex items-center gap-3 mb-6">
                     <div className="p-2 bg-white/10 rounded-lg">
                        <Terminal className="w-6 h-6 text-[var(--veristiq-teal)]" />
                     </div>
                     <span className="text-[var(--veristiq-teal)] font-medium tracking-wide uppercase text-sm">Developer Documentation</span>
                 </div>
                 <h1 className="text-4xl md:text-5xl font-bold mb-6">Integrate fairness in minutes.</h1>
                 <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                     A simple REST API to handle all your compliance and audit needs. You handle the ticket sales, we handle the proof.
                 </p>
                 <div className="flex gap-4">
                     <Link href="/api-reference">
                        <Button className="bg-white text-[var(--veristiq-slate)] hover:bg-gray-100 font-bold px-6 py-4 h-auto">
                            API Reference
                        </Button>
                     </Link>
                     <Link href="https://github.com/veristiq" target="_blank">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 py-4 h-auto">
                            SDKs & Libraries
                        </Button>
                     </Link>
                 </div>
             </div>
        </section>

        {/* Quickstart */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Quickstart Flow</h2>
                        <div className="space-y-8 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                             <div className="relative pl-10">
                                 <div className="absolute left-0 top-0 w-8 h-8 bg-[var(--veristiq-primary-blue)] text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                                 <h3 className="font-bold mb-1">Create Competition</h3>
                                 <p className="text-sm text-gray-500 mb-2">Register the competition to track.</p>
                                 <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">POST /v1/competitions</code>
                             </div>
                             <div className="relative pl-10">
                                 <div className="absolute left-0 top-0 w-8 h-8 bg-[var(--veristiq-primary-blue)] text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                                 <h3 className="font-bold mb-1">Log Entries</h3>
                                 <p className="text-sm text-gray-500 mb-2">Stream entries as they are sold.</p>
                                 <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">POST /v1/entries</code>
                             </div>
                             <div className="relative pl-10">
                                 <div className="absolute left-0 top-0 w-8 h-8 bg-[var(--veristiq-primary-blue)] text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                                 <h3 className="font-bold mb-1">Execute Draw</h3>
                                 <p className="text-sm text-gray-500 mb-2">Trigger the random selection.</p>
                                 <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">POST /v1/draws/:id/execute</code>
                             </div>
                             <div className="relative pl-10">
                                 <div className="absolute left-0 top-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                                 <h3 className="font-bold mb-1">Get Audit URL</h3>
                                 <p className="text-sm text-gray-500 mb-2">Show the proof to your players.</p>
                                 <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">GET /v1/audits/:id</code>
                             </div>
                        </div>
                    </div>
                    
                    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                        <div className="flex items-center px-4 py-2 bg-[#2d2d2d] border-b border-black">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="ml-4 text-xs text-gray-400 font-mono">example-request.sh</div>
                        </div>
                        <div className="p-6 overflow-x-auto">
<pre className="text-sm font-mono text-gray-300 leading-relaxed">
<span className="text-purple-400">curl</span> -X POST https://api.veristiq.io/v1/entries \<br/>
&nbsp;&nbsp;-H <span className="text-green-400">"Authorization: Bearer sk_live_..."</span> \<br/>
&nbsp;&nbsp;-H <span className="text-green-400">"Content-Type: application/json"</span> \<br/>
&nbsp;&nbsp;-d <span className="text-yellow-300">{"'{"}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"competition_id": "cmp_892...",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"ticket_number": "A105",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"user_id": "usr_772",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"is_free_entry": false<br/>
&nbsp;&nbsp;{"}'"}</span>
</pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Core Concepts */}
        <section className="py-20 bg-[var(--veristiq-snow)]">
            <div className="container mx-auto px-6 max-w-5xl">
                <h2 className="text-2xl font-bold mb-10 text-center">Core Concepts</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sections.map((section, idx) => (
                        <Card key={idx} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <div className="p-2 bg-blue-50 text-[var(--veristiq-primary-blue)] rounded-lg">
                                        <section.icon className="w-5 h-5" />
                                    </div>
                                    {section.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-[var(--veristiq-slate-light)] text-sm leading-relaxed">
                                    {section.content}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
