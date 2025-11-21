import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const studies = [
  {
    title: "PrizeDraw UK",
    metric: "+12% conversion",
    summary: "Added CAAS audit badges to each competition page and cut refund requests by 40%.",
  },
  {
    title: "RaffleAid",
    metric: "0 disputes",
    summary: "Charity draws stopped receiving fairness complaints once audit links were embedded in confirmation emails.",
  },
  {
    title: "WinBig Competitions",
    metric: "3.2s audits",
    summary: "Scaled to 15 draws per week with automated evidence packs delivered to regulators.",
  },
];

const timeline = [
  "Week 1: Integrate badge + API",
  "Week 2: Launch first verified draw",
  "Week 3: Publish case study to social proof",
  "Week 4: Automate evidence packs + handoff to support",
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Case studies"
          title="Operators that sell trust first."
          description="See how raffles, giveaways, and charity draws turned compliance into a growth asset with CAAS."
          primaryCta={{ label: "Book a ROI review", href: "/contact" }}
        />

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="Success snapshots"
              title="Proof from operators just like you."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {studies.map((study) => (
                <Card key={study.title} className="border-white/10 bg-black/40 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-accentMint">
                    {study.metric}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-white">{study.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{study.summary}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black/50 py-24">
          <div className="mx-auto max-w-content px-6 grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Playbook"
                title="Rollout timeline."
                description="Every operator follows the same transparent path."
              />
              <ol className="mt-8 space-y-4 text-sm text-muted-foreground">
                {timeline.map((item, index) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-0.5 text-accentMint">{index + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <Card className="border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8">
              <SectionHeading
                eyebrow="Quote"
                title="“CAAS lets us look as legitimate as we operate.”"
                description="Sarah Lennon • Head of Ops, Elite Competitions"
              />
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

