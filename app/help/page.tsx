import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Book, MessageSquare, FileText, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 font-sans">
      <SiteHeader />

      {/* Hero */}
      <section className="relative py-24 container mx-auto px-4 text-center">
         <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            How can we help?
         </h1>
         <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
            <Input 
               className="h-12 pl-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-600" 
               placeholder="Search guides, API docs, and articles..." 
            />
         </div>
      </section>

      <section className="container mx-auto px-4 pb-24 max-w-5xl">
         <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900 transition-colors cursor-pointer">
               <CardHeader>
                  <Book className="h-8 w-8 text-blue-500 mb-2" />
                  <CardTitle className="text-white">Documentation</CardTitle>
                  <CardDescription className="text-muted-foreground">
                     Technical guides for integrating the Veristiq API.
                  </CardDescription>
               </CardHeader>
            </Card>
            <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900 transition-colors cursor-pointer">
               <CardHeader>
                  <PlayCircle className="h-8 w-8 text-purple-500 mb-2" />
                  <CardTitle className="text-white">Video Tutorials</CardTitle>
                  <CardDescription className="text-muted-foreground">
                     Step-by-step walkthroughs of key features.
                  </CardDescription>
               </CardHeader>
            </Card>
            <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900 transition-colors cursor-pointer">
               <CardHeader>
                  <FileText className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle className="text-white">Knowledge Base</CardTitle>
                  <CardDescription className="text-muted-foreground">
                     Articles on compliance best practices.
                  </CardDescription>
               </CardHeader>
            </Card>
         </div>

         <div className="grid md:grid-cols-2 gap-12">
            <div>
               <h2 className="text-2xl font-bold text-white mb-6">Popular Articles</h2>
               <ul className="space-y-4">
                  <li>
                     <Link href="#" className="text-blue-400 hover:underline block">How to verify a hash chain</Link>
                     <p className="text-sm text-muted-foreground">Learn the mathematics behind our proof of fairness.</p>
                  </li>
                  <li>
                     <Link href="#" className="text-blue-400 hover:underline block">Handling free postal entries</Link>
                     <p className="text-sm text-muted-foreground">Automated workflows for scanning and digitizing mail-ins.</p>
                  </li>
                  <li>
                     <Link href="#" className="text-blue-400 hover:underline block">Webhooks implementation guide</Link>
                     <p className="text-sm text-muted-foreground">Best practices for processing real-time events securely.</p>
                  </li>
                  <li>
                     <Link href="#" className="text-blue-400 hover:underline block">Exporting data for regulators</Link>
                     <p className="text-sm text-muted-foreground">Generating standardized compliance reports.</p>
                  </li>
               </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
               <h2 className="text-xl font-bold text-white mb-4">Still stuck?</h2>
               <p className="text-muted-foreground mb-6">
                  Our support team is available Mon-Fri, 9am-6pm GMT.
               </p>
               <Button className="w-full bg-blue-600 hover:bg-blue-500">Contact Support</Button>
               <div className="mt-6 text-center">
                  <p className="text-sm text-slate-500">Premium support available for Enterprise plans.</p>
               </div>
            </div>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}

