"use client";

import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const standardFeatures = [
    "Public audit pages",
    "Hash-chained event history",
    "Tamper-evident draw integrity",
    "Free-entry logging",
    "Complaint logging",
    "Entry pool hashing",
    "RNG seed + algorithm reporting",
    "Competition statistics",
    "Public verification button"
];

const businessFeatures = [
    "Teams",
    "Webhooks",
    "Priority processing",
    "API usage logs",
    "Custom branded audit pages",
    "High rate limits",
    "SLA guarantees",
    "Exporting audit history"
];

export function FeaturesClose() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 lg:px-6">
        
        {/* Features Table */}
        <div className="mb-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Core Features</h2>
                <p className="text-slate-600">Everything you need to run provably fair competitions.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Standard */}
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                    <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center">
                        Included in all plans
                    </h3>
                    <ul className="space-y-4">
                        {standardFeatures.map((feat, i) => (
                            <li key={i} className="flex items-start">
                                <Check className="w-5 h-5 text-trust-teal mr-3 flex-shrink-0" />
                                <span className="text-slate-700">{feat}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Business */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-brand-dark text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                        BUSINESS
                    </div>
                    <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center">
                        Business Power Features
                    </h3>
                    <ul className="space-y-4">
                        {businessFeatures.map((feat, i) => (
                            <li key={i} className="flex items-start">
                                <Check className="w-5 h-5 text-trust-purple mr-3 flex-shrink-0" />
                                <span className="text-slate-700">{feat}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        {/* Pricing Teaser */}
        <div className="text-center max-w-3xl mx-auto mb-24 bg-brand-dark rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-grid opacity-10 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                    <h3 className="text-2xl font-bold mb-2">Simple, transparent pricing</h3>
                    <p className="text-brand-steel">From £29/mo + pay-as-you-go draw pricing.</p>
                </div>
                <Button className="bg-white text-brand-dark hover:bg-slate-100 font-semibold px-8 py-6 h-auto text-lg">
                    View Pricing <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </div>

        {/* Final CTA */}
        <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark mb-8 leading-tight">
                Start Running <span className="text-trust-teal">Verified Fair</span> Draws Today
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="h-16 px-10 text-xl bg-trust-teal hover:bg-trust-emerald text-white shadow-xl shadow-trust-teal/20 transition-all duration-300 w-full sm:w-auto">
                    Get Started Free
                </Button>
                <Button size="lg" variant="ghost" className="h-16 px-10 text-lg text-slate-600 hover:text-brand-dark w-full sm:w-auto">
                    Talk to Sales
                </Button>
            </div>
        </div>

      </div>
    </section>
  );
}
