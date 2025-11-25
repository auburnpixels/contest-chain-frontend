"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TechDeepDive() {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Explanation */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 rounded-full px-3 py-1 mb-6">
                <Hash className="w-3.5 h-3.5 text-trust-cyan" />
                <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">
                    The Fairness Chain
                </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-brand-dark mb-6">
              Tamper-Proof Transparency, <br />
              <span className="text-slate-500">Secured by Cryptography</span>
            </h2>

            <div className="space-y-6 text-lg text-slate-600">
              <p>
                Every draw event becomes part of the CAAS Fairness Chain — a global, append-only timeline of competition results.
              </p>
              <p>
                Each event contains the hash of the previous event, forming an unbreakable chain of trust. This ensures:
              </p>
              <ul className="space-y-3 text-base">
                {[
                  "Operators cannot alter past draws",
                  "Mistakes cannot be hidden",
                  "All draw data remains verifiable forever"
                ].map((item, i) => (
                    <li key={i} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-trust-teal mr-3" />
                        {item}
                    </li>
                ))}
              </ul>
            </div>

            <Button variant="link" className="mt-8 pl-0 text-trust-teal hover:text-trust-emerald text-lg">
                Learn How the Chain Works <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Right: Visual Schematic */}
          <div className="relative">
             <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-sm" />
             
             <div className="relative p-8 space-y-6">
                {/* Block 1 */}
                <ChainBlock 
                    label="Draw #1024" 
                    hash="0x8a7...f92" 
                    prevHash="0x000...000"
                    status="verified"
                />
                
                {/* Link */}
                <div className="flex justify-center -my-2 relative z-10">
                    <div className="h-8 w-0.5 bg-slate-300" />
                </div>

                {/* Block 2 */}
                <ChainBlock 
                    label="Draw #1025" 
                    hash="0x3b1...c44" 
                    prevHash="0x8a7...f92"
                    status="verified"
                    active
                />

                 {/* Link */}
                 <div className="flex justify-center -my-2 relative z-10">
                    <div className="h-8 w-0.5 bg-slate-300 border-l border-dashed border-slate-400" />
                </div>

                 {/* Block 3 (Ghost) */}
                 <div className="mx-auto max-w-[280px] p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center text-slate-400 text-sm font-mono">
                    Next Block Pending...
                 </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ChainBlock({ label, hash, prevHash, status, active = false }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mx-auto max-w-sm p-5 rounded-xl border ${active ? 'border-trust-teal bg-white shadow-lg shadow-trust-teal/10' : 'border-slate-200 bg-white shadow-sm'}`}
        >
            <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-brand-dark">{label}</span>
                {status === 'verified' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700">
                        <Lock className="w-3 h-3 mr-1" /> Verified
                    </span>
                )}
            </div>
            
            <div className="space-y-2">
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Previous Hash</div>
                    <div className="text-xs font-mono text-slate-600 truncate">{prevHash}</div>
                </div>
                <div className="bg-brand-dark/5 p-2 rounded border border-brand-dark/5">
                    <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Current Hash</div>
                    <div className="text-xs font-mono text-trust-teal font-medium truncate">{hash}</div>
                </div>
            </div>
        </motion.div>
    )
}
