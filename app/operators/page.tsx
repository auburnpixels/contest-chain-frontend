import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GaugeCircle, LayoutDashboard, BellRing } from "lucide-react";

const controls = [
  {
    title: "Competition control",
    description: "Spin up draws, clone templates, and set ticket caps in seconds.",
  },
  {
    title: "Entry intelligence",
    description: "Spot paid vs. free entry mix, refunds, and suspicious spikes instantly.",
  },
  {
    title: "Compliance tasks",
    description: "Track free-entry handling, audit approvals, and legal notes in one queue.",
  },
  {
    title: "Multi-prize orchestration",
    description: "Queue prizes, re-run ineligible winners, and publish results in order.",
  },
];

const stats = [
  { label: "Dispute tickets", value: "-90%", helper: "after audit links" },
  { label: "Manual admin", value: "4 hrs saved", helper: "per draw" },
  { label: "Trust badge clicks", value: "+37%", helper: "average engagement" },
];

const alerts = [
  "Late entries quarantined before draw lock.",
  "Duplicate ticket IDs flagged for manual review.",
  "Winner eligibility mismatch escalated to your team.",
  "Audit chain published + auto-shared to customer support.",
];

export default function OperatorsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Operator dashboard"
          title="Your compliance command center."
          description="CAAS gives non-technical teams a regulator-grade dashboard to run competitions, launch draws, and publish audits without chasing developers."
          primaryCta={{ label: "Book live walkthrough", href: "/contact" }}
          secondaryCta={{ label: "Launch sandbox", href: "/operator/register" }}
        />

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Dashboard overview"
                title="Everything an operator needs on one screen."
                description="Live competitions, upcoming draws, trust stats, and alerts arranged for clarity."
              />
              <div className="mt-8 space-y-4">
                {stats.map((stat) => (
                  <Card key={stat.label} className="border-white/10 bg-black/40 p-4">
                    <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.helper}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-navy/70 to-brand-slate/70 p-10 text-white shadow-brand">
              <LayoutDashboard className="h-8 w-8 text-accentMint" />
              <p className="mt-4 text-xl font-semibold">
                Operator home
              </p>
              <p className="mt-2 text-sm text-white/70">
                Screenshot placeholder – highlight live competitions, draw queue, integrity alerts, and audit shortcuts.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-black/60 py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="Core controls"
              title="Ship transparency without touching code."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {controls.map((control) => (
                <Card key={control.title} className="border-white/10 bg-black/40 p-6">
                  <GaugeCircle className="h-6 w-6 text-accentMint" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{control.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{control.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 grid gap-12 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
              <SectionHeading
                eyebrow="Alerts & health"
                title="Integrity signals you’ll actually use."
              />
              <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
                {alerts.map((alert) => (
                  <li key={alert} className="flex items-start gap-3">
                    <BellRing className="mt-0.5 h-4 w-4 text-accentMint" />
                    <span>{alert}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8">
              <SectionHeading
                eyebrow="Compliance checklist"
                title="Tasks resolved in the dashboard."
              />
              <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
                <li>• Approve free-entry logs before draws lock.</li>
                <li>• Attach regulator notes to each competition.</li>
                <li>• Export evidence packs with one click.</li>
                <li>• Audit history accessible to legal + customer support.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-black/60 py-24">
          <div className="mx-auto max-w-content px-6 rounded-3xl border border-white/10 bg-gradient-to-r from-brand-navy via-brand-slate to-black p-10 text-white">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-accentMint">Ready</p>
                <h2 className="mt-2 text-3xl font-semibold">Give your team the dashboard they deserve.</h2>
                <p className="mt-2 text-sm text-white/70">
                  No plugins, no spreadsheets. Just professional-grade competition control.
                </p>
              </div>
              <a
                href="/contact"
                className="rounded-full bg-accentMint px-8 py-3 text-center font-semibold text-brand-navy"
              >
                Book operator demo
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
