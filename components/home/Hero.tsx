"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-white">
        {/* Subtle Background Mesh */}
      <div className="absolute inset-0 bg-brand-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-light rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 lg:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 bg-brand-light border border-slate-200 rounded-full px-4 py-1.5"
          >
            <Shield className="w-4 h-4 text-trust-teal" />
            <span className="text-sm font-medium text-slate-700 tracking-tight">
              DCMS Aligned • Cryptographic Proof
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight text-brand-dark leading-[1.1] lg:leading-[1.05]"
          >
            Independent Fair Draw <br className="hidden lg:block" />
            <span className="text-trust-teal">Verification</span> for Every Competition
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg lg:text-xl text-slate-600 max-w-2xl leading-relaxed"
          >
            Give your players cryptographic proof that every draw you run is fair, transparent, and tamper-free. Trusted by operators who take fairness seriously.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
          >
            <Button size="lg" className="h-14 px-8 text-lg bg-trust-teal hover:bg-trust-teal/90 text-white shadow-lg shadow-trust-teal/20 transition-all duration-300">
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-brand-dark transition-all duration-300">
              View a Live Audit Example
            </Button>
          </motion.div>

          {/* Micro-message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center space-x-6 text-sm text-slate-500 pt-4"
          >
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-trust-emerald" /> No credit card required</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-trust-emerald" /> Unlimited competitions</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


