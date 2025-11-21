import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Users, Target, Heart } from "lucide-react";

const pillars = [
  { icon: Target, title: "Mission", body: "Give every operator a regulator-grade path to fairness without hiring an in-house compliance team." },
  { icon: Users, title: "Team", body: "We’re a distributed crew of payments engineers, compliance analysts, and cryptography nerds." },
  { icon: Heart, title: "Values", body: "Radical transparency, privacy by design, and neutrality over hype." },
];

const milestones = [
  { year: "2022", event: "Founded after auditing dozens of manual competitions." },
  { year: "2023", event: "Launched audit chain + public viewer for pilot operators." },
  { year: "2024", event: "Released SDK suite and compliance automation." },
  { year: "2025", event: "Preparing SOC 2 Type I and expanding to EU operators." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="About CAAS"
          title="Restoring trust in every competition."
          description="We separate the marketing of a draw from the mechanics that prove fairness."
        />

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="Why we exist"
              title="Fairness should be provable, not promised."
              description="CAAS was founded so operators can grow without worrying about accusations, regulators, or manual compliance."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {pillars.map((pillar) => (
                <Card key={pillar.title} className="border-white/10 bg-black/40 p-6 text-center">
                  <pillar.icon className="mx-auto h-8 w-8 text-accentMint" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{pillar.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black/50 py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="Milestones"
              title="From prototype to industry standard."
            />
            <div className="space-y-6">
              {milestones.map((milestone) => (
                <Card key={milestone.year} className="border-white/10 bg-black/40 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-accentMint">{milestone.year}</p>
                  <p className="mt-2 text-white">{milestone.event}</p>
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
