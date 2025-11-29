import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingSection() {
  const tiers = [
    {
      name: "Starter",
      price: "£29",
      fee: "£0.50",
      description: "For small operators beginning their transparency journey.",
      features: [
        "CAFAAS Verified badge",
        "API access",
        "Public audit pages",
        "1 user",
        "Standard support",
      ],
      highlight: false,
    },
    {
      name: "Growth",
      price: "£79",
      fee: "£0.25",
      description: "For growing operators and platforms.",
      features: [
        "Everything in Starter",
        "Custom audit branding",
        "Webhook support",
        "Team accounts",
        "Priority support",
      ],
      highlight: true,
    },
    {
      name: "Platform",
      price: "£199",
      fee: "£0.10",
      description: "For large operators and competition platforms.",
      features: [
        "Everything in Growth",
        "Custom domain for audits",
        "Full theme control",
        "Advanced audit reporting",
        "Dedicated support",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Simple pricing for operators of all sizes.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Fair, predictable pricing — with per-draw fees that scale with your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-8 rounded-3xl border ${
                tier.highlight 
                  ? "border-brand-cobalt ring-1 ring-brand-cobalt bg-zinc-50 dark:bg-zinc-900" 
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-brand-cobalt text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-zinc-900 dark:text-white">{tier.price}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">/mo</span>
                </div>
                <div className="text-sm font-medium text-brand-cobalt mt-2">
                  + {tier.fee} per draw
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 h-10">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <Check className="h-5 w-5 text-brand-cobalt flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  tier.highlight 
                    ? "bg-brand-cobalt hover:bg-brand-cobalt/90 text-white" 
                    : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200"
                }`}
                asChild
              >
                <Link href="/operator/register">
                  Get Started
                </Link>
              </Button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

