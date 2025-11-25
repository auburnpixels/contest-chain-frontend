"use client";

import { motion } from "framer-motion";
import { Eye, Link2, Gavel } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Fairness Your Players Can See",
    description: "Every draw produces a public audit page backed by cryptographic hash chaining. It proves your result wasn’t manipulated, altered, or generated after the fact.",
    color: "text-trust-cyan"
  },
  {
    icon: Link2,
    title: "Tamper-Evident Integrity Chain",
    description: "Each draw is immutably linked to the previous one. If anything changes — even a single field — the entire chain breaks, making tampering instantly detectable.",
    color: "text-trust-teal"
  },
  {
    icon: Gavel,
    title: "Aligned with DCMS Principles",
    description: "Built around fairness, auditability, and open verification — helping operators stay ahead of regulatory direction and demonstrate best practice.",
    color: "text-trust-emerald"
  }
];

export function ValueGrid() {
  return (
    <section className="py-20 bg-brand-light border-y border-slate-200/60">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl mb-4">
            Why Operators Choose CAAS
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
             Compliance isn't just a checkbox. It's your competitive advantage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-brand-dark mb-3">
                {item.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
