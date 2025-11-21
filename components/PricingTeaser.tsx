import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";

type Tier = {
  name: string;
  price: string;
  description: string;
  bullets: string[];
  highlight?: boolean;
};

type PricingTeaserProps = {
  tiers: Tier[];
};

export const PricingTeaser = ({ tiers }: PricingTeaserProps) => (
  <section className="py-24">
    <div className="mx-auto max-w-content px-6 space-y-12">
      <SectionHeading
        eyebrow="Pricing"
        title="Start free. Pay when you run draws."
        description="Usage-based fees aligned with the value of each compliant competition."
        align="center"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-3xl border ${
              tier.highlight
                ? "border-accentMint/60 bg-white/10 shadow-brand"
                : "border-white/10 bg-black/40"
            } p-6`}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              {tier.name}
            </p>
            <p className="mt-4 text-3xl font-semibold text-white">
              {tier.price}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {tier.description}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              {tier.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
            <Button
              className={`mt-8 w-full rounded-full ${
                tier.highlight
                  ? "bg-accentMint text-brand-navy hover:bg-accentMint/90"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              Explore plan
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

