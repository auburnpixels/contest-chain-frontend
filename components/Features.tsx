import { Fragment } from "react";
import { SectionHeading } from "@/components/section-heading";
import {
  BadgeCheck,
  Layers,
  Network,
  LayoutDashboard,
  Terminal,
  Scale,
  ShieldAlert,
  FileJson,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
  bullets: string[];
};

type FeaturesProps = {
  features: Feature[];
};

const iconMap = {
  audit: BadgeCheck,
  multi: Layers,
  public: Network,
  dashboard: LayoutDashboard,
  api: Terminal,
  fairness: Scale,
  integrity: ShieldAlert,
  evidence: FileJson,
};

export const Features = ({ features }: FeaturesProps) => (
  <section className="py-32 bg-brand-navy relative overflow-hidden max-w-7xl mx-auto">
    {/* Grid Pattern Background */}
    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />

    <div className="mx-auto max-w-content px-6 relative z-10 space-y-20">
      <SectionHeading
        eyebrow="Capabilities"
        title="Complete toolkit for verified games."
        description="Everything you need to run compliant, transparent, and automated competitions at scale."
        align="center"
      />
      
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="group h-full rounded-2xl border border-white/5 bg-brand-slate/40 p-6 transition-all duration-300 hover:border-brand-blue/30 hover:bg-brand-slate hover:shadow-xl hover:shadow-brand-blue/5"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-brand-navy text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              
              <h3 className="mb-3 text-xl font-display font-semibold text-white">
                {feature.title}
              </h3>
              
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              
              <div className="space-y-3 border-t border-white/5 pt-6">
                {feature.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export const resolveFeatureIcon = (key: keyof typeof iconMap) =>
  iconMap[key];
