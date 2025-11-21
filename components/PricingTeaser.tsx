import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type Tier = {
  name: string;
  price: string;
  description: string;
  bullets: string[];
  highlight?: boolean;
};

type PricingTeaserProps = {
  tiers?: Tier[];
};

const defaultTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Test the full workflow on low-volume competitions.",
    bullets: ["50 entries per draw", "1 public audit / month", "Standard badge"],
  },
  {
    name: "Growth",
    price: "£49 / draw",
    description: "Scale confidently with unlimited audits and automation.",
    bullets: ["Unlimited entries", "Custom badge & white-label viewer", "Priority onboarding"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Dedicated compliance concierge for high-volume operators.",
    bullets: ["Dedicated success engineer", "SLA-backed uptime", "Bespoke integrations"],
  },
];

export const PricingTeaser = ({ tiers }: PricingTeaserProps) => {
  const content = tiers || defaultTiers;

  return (
    <section className="py-32 bg-brand-navy relative max-w-7xl mx-auto">
      <div className="mx-auto max-w-content px-6 space-y-20">
        <SectionHeading
          eyebrow="Pricing"
          title="Pay for proof, not promises."
          description="Start for free. Scale as your competition business grows."
          align="center"
        />
        
        <div className="grid gap-8 md:grid-cols-3 items-center">
          {content.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                tier.highlight
                  ? "border border-brand-blue/50 bg-brand-slate shadow-glow-blue scale-105 z-10"
                  : "border border-white/5 bg-brand-slate/30 hover:bg-brand-slate/50"
              }`}
            >
              {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
                      Most Popular
                  </div>
              )}
              
              <h3 className="text-lg font-medium text-white mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                 <span className="text-4xl font-display font-bold text-white">{tier.price}</span>
                 {!tier.price.includes("Custom") && tier.price !== "Free" && <span className="text-slate-500 text-sm">/ draw</span>}
              </div>
              
              <p className="text-sm text-slate-400 mb-8 min-h-[40px]">
                {tier.description}
              </p>
              
              <Button
                className={`w-full h-12 rounded-full font-medium mb-8 transition-all ${
                  tier.highlight
                    ? "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {tier.highlight ? "Get Started" : "View Details"}
              </Button>
              
              <div className="space-y-4">
                {tier.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlight ? 'text-brand-blue' : 'text-slate-500'}`} />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
