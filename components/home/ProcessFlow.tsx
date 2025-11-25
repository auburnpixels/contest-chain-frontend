"use client";

import { motion } from "framer-motion";
import { Upload, Ticket, PlayCircle, Share2 } from "lucide-react";

const steps = [
  {
    title: "Register Your Competition",
    description: "Send basic competition data via API or seamless platform integration.",
    icon: Upload
  },
  {
    title: "Submit Entries",
    description: "Paid and free entries are logged securely with full integrity tracking.",
    icon: Ticket
  },
  {
    title: "Trigger the Draw",
    description: "CAAS generates a secure seed, randomises the entry pool, and selects a winner.",
    icon: PlayCircle
  },
  {
    title: "Share the Public Audit Page",
    description: "Your customers verify fairness instantly — no explanations required.",
    icon: Share2
  }
];

export function ProcessFlow() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Column: Heading */}
            <div className="lg:w-1/3">
                <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl mb-6">
                    How It Works
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                    Four simple steps to absolute transparency. Integrate once, run forever.
                </p>
            </div>

            {/* Right Column: Timeline */}
            <div className="lg:w-2/3 relative">
                {/* Connecting Line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-100" />

                <div className="space-y-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative flex items-start gap-6 group"
                        >
                            <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-trust-teal group-hover:scale-110 transition-all duration-300">
                                <step.icon className="w-5 h-5 text-slate-400 group-hover:text-trust-teal transition-colors" />
                            </div>
                            
                            <div className="pt-2">
                                <h3 className="text-xl font-semibold text-brand-dark mb-2 group-hover:text-trust-teal transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed max-w-lg">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
