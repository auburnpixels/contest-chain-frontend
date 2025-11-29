"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const useCases = [
  "Cash prize competitions",
  "Car & luxury competitions",
  "Tech giveaways",
  "Charity prize draws",
  "Influencer competitions",
  "Custom raffle websites",
  "Shopify/WooCommerce stores"
];

export function AudienceProof() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        
        {/* Top Split: Who is it for + Real Audit Preview */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            
            {/* Left: Audience List */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-brand-dark mb-6">
                    Who Cafaas Is For
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                    If your customers ever question fairness, Cafaas protects your reputation and increases trust instantly.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                    {useCases.map((item, i) => (
                        <div key={i} className="flex items-center space-x-3 text-brand-dark">
                            <div className="w-5 h-5 rounded-full bg-trust-emerald/10 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-trust-emerald" />
                            </div>
                            <span className="font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Browser Preview */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-trust-teal to-trust-cyan rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xl">
                    {/* Browser Toolbar */}
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center space-x-2">
                        <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-slate-300" />
                            <div className="w-3 h-3 rounded-full bg-slate-300" />
                            <div className="w-3 h-3 rounded-full bg-slate-300" />
                        </div>
                        <div className="flex-1 bg-white border border-slate-200 rounded px-3 py-1 text-xs text-center text-trust-emerald font-medium">
                            🔒 verify.contestchain.com/audit/82910...
                        </div>
                    </div>
                    {/* Fake Content */}
                    <div className="p-8 bg-slate-50/50 min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                         <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-2">
                            <Check className="w-8 h-8 text-trust-emerald" />
                         </div>
                         <h4 className="text-xl font-bold text-brand-dark">Draw Verified Fair</h4>
                         <p className="text-sm text-slate-500 max-w-[200px]">
                            SHA-256 Hash matches chain record. No anomalies detected.
                         </p>
                         <Button className="mt-4 bg-white border border-slate-200 text-brand-dark hover:bg-slate-50">
                            View Full Certificate
                         </Button>
                    </div>
                </div>
                
                <div className="absolute -bottom-6 left-0 right-0 text-center">
                    <Button variant="default" className="bg-trust-teal hover:bg-trust-emerald text-white shadow-lg">
                        View a Live Audit Example
                    </Button>
                    <p className="text-xs text-slate-500 mt-2">See exactly what your players will see.</p>
                </div>
            </div>
        </div>

        {/* Bottom: Testimonials */}
        <div className="border-t border-slate-100 pt-16 text-center">
            <h3 className="text-sm font-semibold text-trust-teal uppercase tracking-widest mb-12">
                Trusted by Forward-Thinking Operators
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <TestimonialCard 
                    quote="Finally a way to prove our draws are fair. Player trust shot up overnight."
                    author="Early Cafaas Operator"
                />
                <TestimonialCard 
                    quote="The audit page is a game-changer. We embed it everywhere."
                    author="Competition Platform Founder"
                />
            </div>
        </div>

      </div>
    </section>
  );
}

function TestimonialCard({ quote, author }: { quote: string, author: string }) {
    return (
        <div className="bg-slate-50 p-8 rounded-2xl">
             <div className="flex justify-center mb-4 text-trust-teal">
                ★★★★★
             </div>
             <blockquote className="text-xl text-brand-dark font-medium mb-4">
                "{quote}"
             </blockquote>
             <cite className="not-italic text-sm text-slate-500 font-semibold">
                — {author}
             </cite>
        </div>
    )
}
