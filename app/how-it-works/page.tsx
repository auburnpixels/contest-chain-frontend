import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Clock, Video, LifeBuoy } from "lucide-react";

const timeline = [
  {
    step: "01",
    title: "Configure competition",
    description:
      "Define prizes, entry caps, eligibility, and free-entry routes via dashboard or API. CAAS versions T&Cs and locks configuration when approved.",
  },
  {
    step: "02",
    title: "Capture entries",
    description:
      "Entries stream in from your storefront, CRM, or batch imports. Each ticket receives a unique ID, SHA-256 hash, and Merkle position.",
  },
  {
    step: "03",
    title: "Lock + seed",
    description:
      "When the cutoff hits, CAAS freezes entries, publishes the hash commitment, and generates a verifiable randomness seed.",
  },
  {
    step: "04",
    title: "Draw & audit",
    description:
      "Winners selected with CSPRNG, multi-prize ordering recorded, and a cryptographic audit published for players and regulators.",
  },
];

const assurances = [
  {
    title: "Integrity controls",
    detail: "Late entry detection, duplicate ID prevention, eligibility enforcement, and void ticket quarantine happen before the draw fires.",
  },
  {
    title: "Cryptographic evidence",
    detail: "Seeds, hashes, signatures, and transcripts produced automatically. Export as PDF, JSON, or share public URLs.",
  },
  {
    title: "Alerting & observability",
    detail: "Slack, email, or webhook alerts let your team intervene if anything looks off. Full audit logs available for review.",
  },
];

const lifecycle = [
  "Config created",
  "Entries hashed",
  "Seed committed",
  "Draw executed",
  "Winners verified",
  "Audit published",
  "Evidence archived",
];

const touchpoints = [
  {
    title: "Onboarding concierge",
    description: "Two-week guided setup with integration reviews, compliance checklist, and badge configuration.",
  },
  {
    title: "Live draw coaching",
    description: "CAAS specialists shadow your first draws to ensure audit chains publish as expected.",
  },
  {
    title: "Operator success",
    description: "Quarterly trust reviews, conversion tips, and access to our fairness community.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="How it works"
          title="From entry to audit in one predictable motion."
          description="CAAS wraps every competition in a repeatable workflow—configure, collect, lock, draw, publish, and archive. No spreadsheets. No improvised proofs."
          primaryCta={{ label: "Schedule onboarding", href: "/contact" }}
          secondaryCta={{ label: "Watch workflow demo", href: "/docs" }}
        />

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 space-y-12">
            <SectionHeading
              eyebrow="Process timeline"
              title="Four steps. Auditor approved."
              description="Every step is timestamped, logged, and linked in the audit chain."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {timeline.map((item) => (
                <Card
                  key={item.step}
                  className="border-white/10 bg-black/40 p-6"
                >
                  <p className="text-sm font-mono text-accentMint">{item.step}</p>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black/60 py-24">
          <div className="mx-auto max-w-content px-6 space-y-12">
            <SectionHeading
              eyebrow="Technical assurance"
              title="Integrity baked into every moment."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {assurances.map((assurance) => (
                <Card key={assurance.title} className="border-white/10 bg-black/40 p-6">
                  <ShieldCheck className="h-6 w-6 text-accentMint" />
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {assurance.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {assurance.detail}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow="Operator workflow"
                title="See the dashboard in action."
                description="A 3-minute walk-through guides non-technical teams through the exact sequence—configure, collect, lock, draw."
              />
              <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-brand-navy/80 to-brand-slate/80 p-8 text-white">
                <Video className="h-8 w-8 text-accentMint" />
                <p className="mt-4 text-lg font-semibold">
                  Workflow demo • Operators vs Admins
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Includes live draw trigger, eligibility checks, and audit page publish flow.
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
              <SectionHeading
                eyebrow="Audit lifecycle"
                title="Every artefact, in order."
              />
              <ol className="mt-6 space-y-4 text-sm text-muted-foreground">
                {lifecycle.map((stage, index) => (
                  <li key={stage} className="flex items-start gap-3">
                    <Badge className="rounded-full bg-white/10 text-white">{index + 1}</Badge>
                    <span>{stage}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-black/60 py-24">
          <div className="mx-auto max-w-content px-6 space-y-12">
            <SectionHeading
              eyebrow="Support touchpoints"
              title="Humans with compliance brains."
              description="Real people help your team get every draw right."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {touchpoints.map((touch) => (
                <Card key={touch.title} className="border-white/10 bg-black/40 p-6">
                  <LifeBuoy className="h-6 w-6 text-accentMint" />
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {touch.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {touch.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 rounded-3xl border border-white/10 bg-gradient-to-r from-brand-navy via-brand-slate to-black p-10 text-white">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-accentMint">
                  Next step
                </p>
                <h2 className="mt-2 text-3xl font-semibold">
                  Schedule a live workflow review.
                </h2>
                <p className="mt-2 text-sm text-white/70">
                  We’ll map your exact competition flow to CAAS in under 30 minutes.
                </p>
              </div>
              <a
                href="/contact"
                className="rounded-full bg-accentMint px-8 py-3 text-center text-brand-navy font-semibold"
              >
                Book onboarding slot
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

