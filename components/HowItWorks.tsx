import { SectionHeading } from "@/components/section-heading";
import { Settings, Hash, Dices, FileCheck } from "lucide-react";

type Step = {
  title: string;
  description: string;
  detail: string;
};

type HowItWorksProps = {
  steps?: Step[];
};

const defaultSteps = [
  {
    title: "Configure Competition",
    description: "Define your prize, entry cap, and rules via Dashboard or API.",
    detail: "CAAS timestamps your T&Cs and initializes the audit chain.",
  },
  {
    title: "Ingest Entries",
    description: "As users buy tickets, you send them to CAAS.",
    detail: "We assign a unique ID and SHA-256 hash to every single entry instantly.",
  },
  {
    title: "Execute Draw",
    description: "Trigger the random selection engine when ready.",
    detail: "We use a verifiable random function (VRF) or CSPRNG seeded with public entropy.",
  },
  {
    title: "Publish Proof",
    description: "The results are locked and the audit page goes live.",
    detail: "Winners, hashes, and seeds are exposed for anyone to verify.",
  }
];

const icons = [Settings, Hash, Dices, FileCheck];

export const HowItWorks = ({ steps }: HowItWorksProps) => {
  const content = steps || defaultSteps;

  return (
    <section className="bg-brand-navy py-32 relative max-w-7xl mx-auto">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading
          eyebrow="Workflow"
          title="From setup to settled in minutes."
          description="Integrate once. Automate compliance forever."
          align="center"
          className="mb-20"
        />

        <div className="relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-blue/0 via-brand-blue/50 to-brand-blue/0 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-24">
            {content.map((step, index) => {
              const Icon = icons[index] || Settings;
              const isEven = index % 2 === 0;

              return (
                <div key={step.title} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16`}>
                  
                  {/* Text Side */}
                  <div className="flex-1 text-center md:text-left">
                    <div className={`flex flex-col gap-4 ${isEven ? 'md:items-start' : 'md:items-end md:text-right'}`}>
                       <div className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-brand-slate border border-white/10 text-brand-blue mb-4 mx-auto">
                            <Icon className="w-6 h-6" />
                       </div>
                       <h3 className="text-2xl font-display font-semibold text-white">{step.title}</h3>
                       <p className="text-lg text-muted-foreground">{step.description}</p>
                       <p className="text-sm text-slate-500 font-mono bg-white/5 px-3 py-1 rounded-lg inline-block border border-white/5">
                         {step.detail}
                       </p>
                    </div>
                  </div>

                  {/* Center Icon (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                     <div className="w-16 h-16 rounded-2xl bg-brand-navy border border-brand-blue/30 flex items-center justify-center shadow-[0_0_30px_-10px_rgba(37,99,235,0.5)]">
                        <Icon className="w-8 h-8 text-brand-blue" />
                     </div>
                  </div>

                  {/* Visual/Empty Side for Balance */}
                  <div className="flex-1 hidden md:block">
                     {/* Maybe a subtle visual or code snippet here later */}
                     <div className={`h-px w-24 bg-gradient-to-r from-brand-blue/50 to-transparent ${isEven ? 'mr-auto' : 'ml-auto rotate-180'}`} />
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
