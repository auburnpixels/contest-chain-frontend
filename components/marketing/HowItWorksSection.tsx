import { PenTool, Database, RefreshCw, FileCheck2 } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      title: "Operators create a competition",
      desc: "You register competitions through the CAFAAS API or dashboard.",
      icon: PenTool,
    },
    {
      title: "Entries are recorded and verified",
      desc: "Each paid or free entry is logged, eligibility validated, and added to the chain.",
      icon: Database,
    },
    {
      title: "Draw is executed with deterministic randomisation",
      desc: "CAFAAS generates a random seed, hashes it, and selects a winner. The process is fully auditable and cannot be manipulated.",
      icon: RefreshCw,
    },
    {
      title: "A public audit page is published instantly",
      desc: "Players, regulators, partners — anyone — can verify the integrity of the draw.",
      icon: FileCheck2,
    },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            How CAFAAS ensures fairness.
          </h2>
        </div>

        <div className="relative grid md:grid-cols-4 gap-8">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent -z-0" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center group z-10">
              <div className="h-24 w-24 rounded-full bg-white dark:bg-black border-4 border-zinc-100 dark:border-zinc-800 flex items-center justify-center mb-6 shadow-sm group-hover:border-brand-cobalt transition-colors duration-300">
                <step.icon className="h-10 w-10 text-brand-cobalt" />
              </div>
              
              <div className="bg-white dark:bg-black p-1 inline-block rounded-full px-4 mb-4 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                Step {idx + 1}
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-[250px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

