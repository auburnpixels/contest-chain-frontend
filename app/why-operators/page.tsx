import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const comparisons = [
  {
    title: "Manual draws",
    caas: "Cryptographic audit + public proof",
    manual: "Livestream + trust-me explanations",
  },
  {
    title: "Handling disputes",
    caas: "Entrants self-verify with audit page",
    manual: "Support team emails screenshots",
  },
  {
    title: "Compliance evidence",
    caas: "Auto-generated packs per draw",
    manual: "Spreadsheets stitched together weekly",
  },
];

export default function WhyOperatorsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Why CAAS"
          title="Operators choose CAAS because trust drives sales."
          description="We combine fairness tech, audit automation, and dashboards so your team can scale."
        />

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="Comparison"
              title="CAAS vs. traditional workflows."
            />
            <div className="space-y-6">
              {comparisons.map((row) => (
                <Card key={row.title} className="border-white/10 bg-black/40 p-6">
                  <h3 className="text-lg font-semibold text-white">{row.title}</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-accentMint">CAAS</p>
                      <p className="text-white">{row.caas}</p>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                        Manual
                      </p>
                      <p className="text-muted-foreground">{row.manual}</p>
                    </div>
                  </div>
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

