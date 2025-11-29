import { Link, Globe, Gift, Users, Binary, Webhook, Shield, LayoutDashboard } from "lucide-react";

export function FeatureGridSection() {
  const features = [
    { 
      title: "Tamper-Evident Hash Chain", 
      desc: "Every event references the previous one. Any change breaks the chain.",
      icon: Link 
    },
    { 
      title: "Public Audit Pages", 
      desc: "A dedicated verification page for each draw.",
      icon: Globe 
    },
    { 
      title: "Multi-Prize Support", 
      desc: "Run as many prize draws per competition as you need.",
      icon: Gift 
    },
    { 
      title: "Full Entry Transparency", 
      desc: "Log paid entries, free entries, and eligibility checks.",
      icon: Users 
    },
    { 
      title: "Seed + RNG Disclosure", 
      desc: "Random seed, seed hash, RNG metadata — all published openly.",
      icon: Binary 
    },
    { 
      title: "Webhook & API Access", 
      desc: "Automate your entire workflow.",
      icon: Webhook 
    },
    { 
      title: "Zero Influence Guarantee", 
      desc: "CAFAAS cannot influence outcomes. Every draw is deterministic.",
      icon: Shield 
    },
    { 
      title: "Operator Dashboard", 
      desc: "Track competitions, entries, and draw integrity in one place.",
      icon: LayoutDashboard 
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
            Everything you need to run <br className="hidden md:block"/>
            transparent competitions.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-start space-y-3">
              <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-brand-cobalt mb-1">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

