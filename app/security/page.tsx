import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Shield, Lock, Server, AlertTriangle, Target } from "lucide-react";

const controls = [
  {
    title: "Infrastructure",
    description: "AWS + CloudFront perimeter, WAF, private subnets, automated patching.",
    icon: Server,
  },
  {
    title: "Data handling",
    description: "PII encrypted using AES-256 at rest, TLS 1.3 in transit, field-level encryption for sensitive data.",
    icon: Lock,
  },
  {
    title: "Integrity",
    description: "Merkle-based audit chain, replay detection, signed transcripts.",
    icon: Shield,
  },
];

const compliance = [
  "Gambling Act 2005 guidance alignment",
  "ASA CAP Code transparency clauses",
  "GDPR + UK GDPR data handling",
  "SOC 2 Type I (in progress), ISO 27001 roadmap",
];

const response = [
  "24/7 monitoring with automated containment",
  "Runbooks for incident response shared with customers",
  "Dedicated security contact for regulators and partners",
  "Post-incident transparency report delivered within 24h",
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Trust & security"
          title="Integrity by design."
          description="CAAS protects operator data, entrant PII, and audit artefacts with enterprise-grade controls."
        />

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="Security stack"
              title="Defense-in-depth without compromises."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {controls.map((control) => (
                <Card key={control.title} className="border-white/10 bg-black/40 p-6">
                  <control.icon className="h-6 w-6 text-accentMint" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{control.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{control.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black/60 py-24">
          <div className="mx-auto max-w-content px-6 grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Compliance alignment"
                title="Built for regulator scrutiny."
                description="We give you the evidence packages, logs, and attestations you need to comply with UK standards."
              />
              <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                {compliance.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Target className="mt-0.5 h-4 w-4 text-accentMint" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8">
              <SectionHeading
                eyebrow="Incident readiness"
                title="Response drilled and documented."
              />
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {response.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-accentMint" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
