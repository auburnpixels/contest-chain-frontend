import { SectionHeading } from "@/components/section-heading";

type Step = {
  title: string;
  description: string;
  detail: string;
};

type HowItWorksProps = {
  steps: Step[];
};

export const HowItWorks = ({ steps }: HowItWorksProps) => (
  <section className="bg-black/30 py-24">
    <div className="mx-auto max-w-content px-6 space-y-12">
      <SectionHeading
        eyebrow="How It Works"
        title="Transparency in four predictable steps."
        description="From entry capture to public audit, CAAS automates every compliance task in the background."
      />
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="grid gap-8 rounded-3xl border border-white/5 bg-white/[0.03] p-8 md:grid-cols-3"
          >
            <div className="flex items-start gap-4 md:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl font-semibold text-accentMint">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-muted-foreground">Step {index + 1}</p>
              </div>
            </div>
            <div className="md:col-span-2 space-y-3">
              <p className="text-lg text-muted-foreground">{step.description}</p>
              <p className="text-sm text-slate-400">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

