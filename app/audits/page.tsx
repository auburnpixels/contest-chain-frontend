'use client';

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DrawAuditsWidget } from '@/components/draw-audits-widget';
import { Card, CardContent } from '@/components/ui/card';
import { Hash, Clock, ShieldCheck, Link as LinkIcon } from 'lucide-react';

export default function AuditsPage() {
    return (
        <div className="min-h-screen bg-[var(--veristiq-snow)] flex flex-col font-sans text-[var(--veristiq-slate)]">
            <SiteHeader />
            
            {/* Hero Section */}
            <div className="relative bg-[var(--veristiq-slate)] pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                         <Hash className="w-8 h-8 text-[var(--veristiq-teal)]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Public Audit Ledger</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Every draw. Every operator. Fully verifiable.
                        <br/>
                        Inspect the tamper-evident chain of custody that powers the Veristiq integrity system.
                    </p>
                </div>
            </div>

            <main className="flex-1 container mx-auto max-w-7xl px-6 -mt-10 relative z-20 pb-20">
                {/* Explainer Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                     <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
                        <CardContent className="pt-6">
                            <div className="mb-4 bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center text-[var(--veristiq-primary-blue)]">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Timestamped</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Every draw event is cryptographically timestamped at the moment of execution. No backdating is possible.
                            </p>
                        </CardContent>
                     </Card>
                     
                     <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
                        <CardContent className="pt-6">
                            <div className="mb-4 bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center text-[var(--veristiq-primary-blue)]">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Tamper-Proof</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Results are hashed and linked to previous records. Any modification breaks the chain and alerts the network.
                            </p>
                        </CardContent>
                     </Card>

                     <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-white/20">
                        <CardContent className="pt-6">
                            <div className="mb-4 bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center text-[var(--veristiq-primary-blue)]">
                                <LinkIcon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Linked History</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                A continuous, unbroken sequence of events provides a complete audit trail for every competition.
                            </p>
                        </CardContent>
                     </Card>
                </div>

                {/* Main Widget */}
                <div className="space-y-4">
                    <DrawAuditsWidget
                        showOperator={true}
                        publicView={true}
                        title="Global Draw Feed"
                        description="Real-time ledger of all verified draws across the Veristiq network."
                        pageSize={15}
                    />
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
