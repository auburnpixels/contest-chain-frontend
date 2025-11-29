import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VerifyWidget } from "@/components/verify-widget";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Share2, Shield } from "lucide-react";

const experiences = [
  {
    title: "Ticket search",
    detail: "Entrants enter ticket ID or email. Results show status, timestamp, and eligibility notes.",
  },
  {
    title: "Winner transparency",
    detail: "Winning tickets include proof, prize summary, and random seed snippet for self-verification.",
  },
  {
    title: "Dispute prevention",
    detail: "Audit viewer explains every step, so operators don’t manually reply to accusations.",
  },
];

const flow = [
  "Enter ticket ID or draw ID.",
  "System fetches immutable audit data.",
  "Entrant sees entry hash, draw order, and winner verification.",
];

const trustKit = [
  {
    title: "Public audit URLs",
    description: "Shareable link and QR code for every draw, ready for social, SMS, or email.",
  },
  {
    title: "Embeddable badge",
    description: "Copy a single snippet to display “Cafaas Verified” widgets across competition pages.",
  },
  {
    title: "Customer instructions",
    description: "Auto-generated copy telling entrants exactly how to verify their ticket.",
  },
];

const faqs = [
  {
    question: "Do I need an account to verify?",
    answer: "No. Anyone with the ticket ID or draw URL can search the public audit viewer instantly.",
  },
  {
    question: "Can operators hide results?",
    answer: "No. Once published, the audit page is immutable. Operators can only add context, not edit outcomes.",
  },
];

export default function PublicPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Public audit viewer"
          title="Let entrants verify every draw themselves."
          description="Cafaas publishes a consumer-friendly audit page for every competition. Ticket holders get undeniable proof without contacting your team."
          primaryCta={{ label: "View audit demo", href: "/audit/example-uuid" }}
          secondaryCta={{ label: "Embed trust badge", href: "/docs" }}
        />

        <section className="bg-black/60 py-20">
          <div className="mx-auto max-w-content px-6 space-y-10 text-center">
            <VerifyWidget variant="hero" />
            <p className="text-sm text-muted-foreground">
              Search is GDPR-safe, rate limited, and audit-logged so you always know who accessed what.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="What entrants see"
              title="A premium verification experience for non-technical players."
              description="Designed for mobile, supports 26 languages, and carries your brand colours."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {experiences.map((exp) => (
                <Card key={exp.title} className="border-white/10 bg-black/40 p-6">
                  <CheckCircle2 className="h-6 w-6 text-accentMint" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{exp.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{exp.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black/50 py-24">
          <div className="mx-auto max-w-content px-6 grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Verification flow"
                title="Three steps to complete assurance."
                description="Everything is instant and self-serve."
              />
              <ol className="mt-6 space-y-4 text-sm text-muted-foreground">
                {flow.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <Badge className="rounded-full bg-white/10 text-white">{index + 1}</Badge>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8">
              <SectionHeading
                eyebrow="Shareable trust kit"
                title="Built for marketing teams."
              />
              <div className="mt-6 grid gap-6">
                {trustKit.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 space-y-12">
            <SectionHeading
              eyebrow="Trust badges"
              title="Proof without explanations."
              description="Operators embed verified badges once. Cafaas handles uptime, accessibility, and localization."
            />
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-white/10 bg-black/40 p-6 text-center">
                <Shield className="mx-auto h-10 w-10 text-accentMint" />
                <p className="mt-4 text-xl font-semibold text-white">Cafaas Verified Badge</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Adjustable styles (mint, dark, monochrome) and automatic status updates post draw.
                </p>
              </Card>
              <Card className="border-white/10 bg-black/40 p-6 text-center">
                <Share2 className="mx-auto h-10 w-10 text-accentMint" />
                <p className="mt-4 text-xl font-semibold text-white">Share-ready snippets</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prebuilt copy for SMS, email, Instagram captions, and WhatsApp broadcasts.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-black/60 py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading eyebrow="FAQ" title="Common questions from entrants." />
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
