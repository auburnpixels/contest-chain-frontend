import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  ShieldCheck,
  Hash,
  Zap,
  Globe,
  LayoutDashboard,
  Workflow,
  Code2,
  Sparkles,
} from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Transparency engine",
    description: "Audit chains, fairness proofs, and integrity checks built into every draw.",
  },
  {
    icon: LayoutDashboard,
    title: "Operator cockpit",
    description: "A regulator-grade dashboard for non-technical teams to manage competitions.",
  },
  {
    icon: Code2,
    title: "Developer platform",
    description: "Modern REST API, SDKs, and webhooks purpose-built for draw automation.",
  },
];

const deepDives = [
  {
    icon: Hash,
    title: "Cryptographic pipeline",
    points: [
      "Entry hashing, Merkle tree aggregation, and seed commitments.",
      "Automatic attestations for each draw step and replayable logs.",
      "Signed transcripts for regulators, auditors, or partners.",
    ],
  },
  {
    icon: Globe,
    title: "Public audit viewer",
    points: [
      "Shareable audit links + QR codes for every winner announcement.",
      "Searchable entry explorer so players can verify ticket status.",
      "White-label themes with custom domains and branding.",
    ],
  },
  {
    icon: Workflow,
    title: "Automation recipes",
    points: [
      "Trigger draws from WooCommerce, Laravel, or Node flows.",
      "Alert Slack or Teams when audits publish or issues arise.",
      "Generate compliance packs and push them to Drive, S3, or email.",
    ],
  },
];

const sdks = [
  { name: "Laravel", description: "composer require caas/laravel-sdk" },
  { name: "Node / TypeScript", description: "npm install @caas/sdk" },
  { name: "PHP", description: "composer require caas/php" },
  { name: "WooCommerce", description: "Official plugin & webhook recipes" },
];

const automations = [
  {
    title: "WooCommerce checkout",
    detail: "Sync orders directly into Cafaas entries and trigger public badges.",
  },
  {
    title: "Laravel jobs",
    detail: "Use queued jobs to batch entries, lock draws, and publish audits.",
  },
  {
    title: "Node worker",
    detail: "Listen for Cafaas webhooks and pipe verified winners to marketing stacks.",
  },
  {
    title: "PHP CLI",
    detail: "Run on-premise draw triggers with cryptographic attestation.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Features"
          title="The Stripe-grade toolkit for competition fairness."
          description="Cafaas ships every layer operators need to look legitimate—audits, dashboards, SDKs, and automation-ready workflows."
          primaryCta={{ label: "Book product tour", href: "/contact" }}
          secondaryCta={{ label: "Browse docs", href: "/docs" }}
        />

      <section className="py-24 relative overflow-hidden max-w-7xl mx-auto">
          <div className="mx-auto max-w-content px-6 space-y-12">
            <SectionHeading
              eyebrow="Platform pillars"
              title="Three layers. One source of truth."
              description="Transparency lives in the audit chain, operations live in the dashboard, and developer freedom lives in the platform."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {pillars.map((pillar) => (
                <Card key={pillar.title} className="border-white/10 bg-black/40 p-6">
                  <pillar.icon className="h-8 w-8 text-accentMint" />
                  <h3 className="mt-4 text-xl font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{pillar.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

      <section className="py-24 relative overflow-hidden max-w-7xl mx-auto">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="Feature deep dives"
              title="Built for operators that welcome scrutiny."
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {deepDives.map((feature) => (
                <Card key={feature.title} className="border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6">
                  <feature.icon className="h-6 w-6 text-accentMint" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    {feature.points.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

      <section className="py-24 relative overflow-hidden max-w-7xl mx-auto">
          <div className="mx-auto max-w-content px-6 space-y-12">
            <SectionHeading
              eyebrow="SDK gallery"
              title="Modern tooling for every stack."
              description="Use our typed SDKs or extend via REST. All libraries include retries, observability hooks, and mocked sandbox environments."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {sdks.map((sdk) => (
                <Card key={sdk.name} className="border-white/10 bg-black/40 p-5">
                  <CardHeader className="p-0">
                    <CardTitle className="text-white">{sdk.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-4 text-sm font-mono text-accentMint">
                    {sdk.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      <section className="py-24 relative overflow-hidden max-w-7xl mx-auto">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="Automation recipes"
              title="Trigger fairness from the tools you already use."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {automations.map((item) => (
                <Card key={item.title} className="border-white/10 bg-black/40 p-6">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{item.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

      <section className="py-24 relative overflow-hidden max-w-7xl mx-auto">
          <div className="mx-auto max-w-content px-6">
            <Card className="border-accentMint/30 bg-gradient-to-r from-brand-navy/80 to-brand-slate/80 p-10 text-white">
              <CardHeader className="p-0">
                <CardTitle className="text-3xl font-semibold">
                  Ship fairness once. Prove it forever.
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-6 p-0">
                <p className="text-lg text-white/80">
                  Cafaas ties together audit chains, dashboards, and developer tooling so every competition looks like
                  it was run by the industry’s most trusted operator.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
