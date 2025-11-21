import { Fragment } from "react";
import { SectionHeading } from "@/components/section-heading";
import {
  BadgeCheck,
  Layers,
  Network,
  ShieldCheck,
  Terminal,
  Activity,
  FileText,
  Sparkles,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bullets: string[];
};

type FeaturesProps = {
  features: Feature[];
};

const iconMap = {
  audit: BadgeCheck,
  multi: Layers,
  public: Network,
  dashboard: ShieldCheck,
  api: Terminal,
  fairness: Activity,
  integrity: FileText,
  evidence: Sparkles,
};

export const Features = ({ features }: FeaturesProps) => (
  <section className="py-24">
    <div className="mx-auto max-w-content px-6 space-y-12">
      <SectionHeading
        eyebrow="Platform Features"
        title="Everything transparency-focused operators need."
        description="Each module reinforces legitimacy, consistency, and effortless compliance."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="h-full rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-8 shadow-subtle"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-accentMint">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-muted-foreground">
                {feature.bullets.map((bullet) => (
                  <Fragment key={bullet}>
                    <div className="flex items-start gap-3 text-base">
                      <span className="mt-1 h-2 w-2 rounded-full bg-accentMint shadow-[0_0_10px_rgba(48,224,181,0.6)]" />
                      <span>{bullet}</span>
                    </div>
                  </Fragment>
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

