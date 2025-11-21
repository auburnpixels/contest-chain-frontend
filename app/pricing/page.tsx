import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Check, ArrowRightCircle } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    detail: "Perfect for validating trust badges on a single competition.",
    bullets: ["50 entries / draw", "1 public audit per month", "Email support"],
    cta: "Launch sandbox",
  },
  {
    name: "Growth",
    price: "£49 per draw",
    detail: "Only pay when you publish a verified draw.",
    bullets: ["Unlimited entries", "White-label audit viewer", "Priority chat support"],
    cta: "Scale with CAAS",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    detail: "Tailored for multi-brand groups and regulated partners.",
    bullets: ["Dedicated compliance concierge", "Custom data residency", "Horizon monitoring"],
    cta: "Talk to sales",
  },
];

const comparison = [
  {
    label: "Public audit pages",
    starter: "Basic theme",
    growth: "Custom domain + branding",
    enterprise: "Full white-label + SSO",
  },
  {
    label: "API & SDK access",
    starter: "Read-only sandbox",
    growth: "Full write access",
    enterprise: "Private endpoints + rate tiers",
  },
  {
    label: "Evidence packs",
    starter: "Manual download",
    growth: "Automated per draw",
    enterprise: "Auto-share to regulators",
  },
  {
    label: "Support",
    starter: "Email (48h SLA)",
    growth: "Chat (4h SLA)",
    enterprise: "Dedicated Slack & TAM",
  },
];

const faqs = [
  {
    question: "Do I pay per month or per draw?",
    answer: "You pay for what you run. Growth charges £49 per verified draw. If you skip a month, you pay nothing.",
  },
  {
    question: "Is there a free tier for testing?",
    answer: "Yes. Starter lets you run internal test draws and publish one public audit page every month at no cost.",
  },
  {
    question: "What if I exceed the entry limit?",
    answer: "We auto-upgrade draws that exceed tier limits and notify you before charging. No downtime for your competition.",
  },
  {
    question: "Can I expense CAAS as compliance spend?",
    answer: "Absolutely. Most operators categorize CAAS as compliance tooling or platform assurance.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Pricing"
          title="Usage-based pricing aligned to transparent draws."
          description="Start free. Only pay when you publish verifiable results. Every plan includes the audit chain, trust badge, and compliance monitoring."
          primaryCta={{ label: "Start for free", href: "/operator/register" }}
          secondaryCta={{ label: "Book pricing call", href: "/contact" }}
        />

        <section className="bg-black/50 py-24">
          <div className="mx-auto max-w-content px-6">
            <SectionHeading
              eyebrow="Plan Selector"
              title="Choose how you want to pay for transparency."
              description="Select the plan that matches your draw volume. Switch tiers anytime."
              align="center"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`h-full rounded-3xl border ${
                    plan.featured
                      ? "border-accentMint/70 bg-white/10 shadow-brand"
                      : "border-white/10 bg-black/40"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                    <p className="text-3xl font-semibold text-white">{plan.price}</p>
                    <p className="text-sm text-muted-foreground">{plan.detail}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3 text-sm text-slate-200">
                      {plan.bullets.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-accentMint" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full rounded-full ${
                        plan.featured
                          ? "bg-accentMint text-brand-navy hover:bg-accentMint/90"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 space-y-12">
            <SectionHeading
              eyebrow="Usage-based model"
              title="Designed around draw volume, not seat counts."
              description="Your team pays only when a verified draw is published. Integrations, SDKs, and monitoring are always included."
            />
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-white/5 bg-black/40 p-6">
                <p className="text-sm text-accentMint">Metered events</p>
                <p className="mt-4 text-3xl font-semibold text-white">Per verified draw</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Usage resets each month. No cost for paused operators.
                </p>
              </Card>
              <Card className="border-white/5 bg-black/40 p-6">
                <p className="text-sm text-accentMint">Included</p>
                <p className="mt-4 text-3xl font-semibold text-white">API + SDKs</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  No extra line items for developer access or staging environments.
                </p>
              </Card>
              <Card className="border-white/5 bg-black/40 p-6">
                <p className="text-sm text-accentMint">Fairness guarantee</p>
                <p className="mt-4 text-3xl font-semibold text-white">Chargebacks covered</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  CAAS credits the draw fee if an audit chain fails to publish.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-black/50 py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="Feature comparison"
              title="Every tier ships transparency. Higher tiers add automation."
            />
            <div className="overflow-x-auto rounded-3xl border border-white/10">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="bg-white/5 text-sm text-muted-foreground">
                    <th className="px-6 py-4 font-medium text-white">Feature</th>
                    <th className="px-6 py-4 font-medium">Starter</th>
                    <th className="px-6 py-4 font-medium">Growth</th>
                    <th className="px-6 py-4 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label} className="border-t border-white/5 text-sm">
                      <td className="px-6 py-4 text-white">{row.label}</td>
                      <td className="px-6 py-4 text-slate-300">{row.starter}</td>
                      <td className="px-6 py-4 text-slate-300">{row.growth}</td>
                      <td className="px-6 py-4 text-slate-300">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="ROI snapshot"
                title="Transparency pays for itself."
                description="Operators report fewer disputes, higher ticket conversion, and faster regulator sign-off."
              />
              <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
                <li>• 12% average increase in ticket conversion after adding audit badge.</li>
                <li>• 90% reduction in “prove it” support tickets.</li>
                <li>• 1–2 hours saved per draw on evidence compilation.</li>
              </ul>
            </div>
            <Card className="border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6">
              <CardHeader className="p-0">
                <CardTitle className="flex items-center gap-2 text-white">
                  Scenario: 4 draws / month
                  <ArrowRightCircle className="h-5 w-5 text-accentMint" />
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-6 space-y-3 text-sm text-slate-200">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span>CAAS investment</span>
                  <span>£196</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span>Average extra ticket revenue*</span>
                  <span>£1,680</span>
                </div>
                <div className="flex justify-between">
                  <span>Support hours saved</span>
                  <span>8 hrs</span>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  *Based on 12% uplift on 4,000 tickets at £3.50 average ticket price.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-black/60 py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="FAQ"
              title="Everything you need to know before integrating."
              align="center"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {faqs.map((faq) => (
                <Card key={faq.question} className="border-white/10 bg-black/40 p-6">
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
