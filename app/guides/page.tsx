import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Code2, FileText } from "lucide-react";
import Link from "next/link";

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 font-sans">
      <SiteHeader />

      {/* Hero */}
      <section className="relative py-24 container mx-auto px-4 text-center">
         <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Integration Guides
         </h1>
         <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Step-by-step tutorials to help you build compliant competition platforms.
         </p>
      </section>

      <section className="container mx-auto px-4 pb-24 max-w-5xl">
         <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900 transition-colors">
               <CardHeader>
                  <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20 mb-4">
                     <Code2 className="h-6 w-6 text-blue-500" />
                  </div>
                  <CardTitle className="text-white mb-2">Quickstart: 5 Minute Integration</CardTitle>
                  <p className="text-muted-foreground text-sm">
                     Learn how to create your first competition and accept entries using the Node.js SDK.
                  </p>
               </CardHeader>
               <CardContent>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full">Start Tutorial</Button>
               </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900 transition-colors">
               <CardHeader>
                  <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20 mb-4">
                     <FileText className="h-6 w-6 text-purple-500" />
                  </div>
                  <CardTitle className="text-white mb-2">Postal Entry Workflows</CardTitle>
                  <p className="text-muted-foreground text-sm">
                     Best practices for scanning, verifying, and uploading free postal entries to remain compliant.
                  </p>
               </CardHeader>
               <CardContent>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full">Read Guide</Button>
               </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900 transition-colors">
               <CardHeader>
                  <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20 mb-4">
                     <Book className="h-6 w-6 text-green-500" />
                  </div>
                  <CardTitle className="text-white mb-2">Handling Webhooks</CardTitle>
                  <p className="text-muted-foreground text-sm">
                     How to securely receive and verify draw events and audit publications in your backend.
                  </p>
               </CardHeader>
               <CardContent>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full">View Documentation</Button>
               </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900 transition-colors">
               <CardHeader>
                  <div className="h-12 w-12 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 mb-4">
                     <Code2 className="h-6 w-6 text-amber-500" />
                  </div>
                  <CardTitle className="text-white mb-2">Customizing the Audit Explorer</CardTitle>
                  <p className="text-muted-foreground text-sm">
                     How to white-label the public verification page to match your brand identity.
                  </p>
               </CardHeader>
               <CardContent>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full">Learn More</Button>
               </CardContent>
            </Card>
         </div>
         
         <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Looking for something else?</p>
            <Link href="/docs">
               <Button className="bg-slate-800 hover:bg-slate-700 text-white">Browse Full Documentation</Button>
            </Link>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}

