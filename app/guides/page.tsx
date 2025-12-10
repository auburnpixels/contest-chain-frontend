import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Code2, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GuidesPage() {
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
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                    <Book className="w-8 h-8 text-[var(--veristiq-teal)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Integration Guides</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Step-by-step tutorials to help you build compliant competition platforms.
                </p>
             </div>
        </section>

        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-white border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <CardHeader>
                            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100 mb-4 group-hover:scale-110 transition-transform">
                                <Code2 className="h-6 w-6 text-[var(--veristiq-primary-blue)]" />
                            </div>
                            <CardTitle className="text-[var(--veristiq-slate)] mb-2">Quickstart: 5 Minute Integration</CardTitle>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Learn how to create your first competition and accept entries using the Node.js SDK.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full border-gray-200 text-[var(--veristiq-slate)] hover:bg-gray-50 hover:text-[var(--veristiq-primary-blue)]">
                                Start Tutorial <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <CardHeader>
                            <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-100 mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="h-6 w-6 text-purple-600" />
                            </div>
                            <CardTitle className="text-[var(--veristiq-slate)] mb-2">Postal Entry Workflows</CardTitle>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Best practices for scanning, verifying, and uploading free postal entries to remain compliant.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full border-gray-200 text-[var(--veristiq-slate)] hover:bg-gray-50 hover:text-[var(--veristiq-primary-blue)]">
                                Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <CardHeader>
                            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center border border-green-100 mb-4 group-hover:scale-110 transition-transform">
                                <Book className="h-6 w-6 text-green-600" />
                            </div>
                            <CardTitle className="text-[var(--veristiq-slate)] mb-2">Handling Webhooks</CardTitle>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                How to securely receive and verify draw events and audit publications in your backend.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full border-gray-200 text-[var(--veristiq-slate)] hover:bg-gray-50 hover:text-[var(--veristiq-primary-blue)]">
                                View Documentation <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-white border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <CardHeader>
                            <div className="h-12 w-12 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-100 mb-4 group-hover:scale-110 transition-transform">
                                <Code2 className="h-6 w-6 text-amber-600" />
                            </div>
                            <CardTitle className="text-[var(--veristiq-slate)] mb-2">Customizing the Audit Explorer</CardTitle>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                How to white-label the public verification page to match your brand identity.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full border-gray-200 text-[var(--veristiq-slate)] hover:bg-gray-50 hover:text-[var(--veristiq-primary-blue)]">
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="mt-16 text-center">
                    <p className="text-gray-500 mb-4">Looking for something else?</p>
                    <Link href="/docs">
                        <Button className="bg-[var(--veristiq-slate)] hover:bg-[var(--veristiq-slate-light)] text-white px-8 py-6 h-auto text-lg">Browse Full Documentation</Button>
                    </Link>
                </div>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
