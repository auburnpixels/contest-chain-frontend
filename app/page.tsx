import { Hero } from "@/components/Hero";
import { PainPoints } from "@/components/PainPoints";
import { ValueProps } from "@/components/ValueProps";
import { HowItWorks } from "@/components/HowItWorks";
import { Features, resolveFeatureIcon } from "@/components/Features";
import { TrustSection } from "@/components/TrustSection";
import { AuditPreview } from "@/components/AuditPreview";
import { ComplianceChecklist } from "@/components/ComplianceChecklist";
import { PricingTeaser } from "@/components/PricingTeaser";
import { CTASection } from "@/components/CTASection";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const painPoints = [
  "People claim every draw is “rigged” the moment they lose.",
  "Manual draws mean screenshots, disputes, and refund requests.",
  "Spreadsheets and livestreams make you look less credible than competitors.",
  "No public audit page means hours explaining how the draw worked.",
  "Complaints stack up because customers can’t verify anything themselves.",
  "Winning tickets can’t be proven tamper-proof when challenged.",
];

const valueHighlights = [
  {
    title: "Run fair, transparent competitions.",
    description:
      "Configure prizes, eligibility rules, and entry caps on infrastructure designed for regulator-style scrutiny.",
  },
  {
    title: "Automatic public audit trails.",
    description:
      "Every draw publishes a cryptographic audit page, complete with entry hashes, RNG seed, and winner proof.",
  },
  {
    title: "Prove tamper-proof draws.",
    description:
      "Entry IDs, hashes, seeds, and draw ordering are chained to prevent edits or manipulated results.",
  },
  {
    title: "Operate like a pro team.",
    description:
      "Dashboards, trust badges, SDKs, and multi-prize orchestration make you look and act enterprise-grade.",
  },
];

const workflowSteps = [
  {
    title: "Create competition",
    description: "Define prizes, ticket caps, entry windows, and free-entry routes in minutes.",
    detail: "Dashboard or API. CAAS validates inputs, version-controls T&Cs, and timestamps configuration.",
  },
  {
    title: "Accept entries",
    description: "Send entries to CAAS or use our SDKs.",
    detail: "Each entry receives a unique ID, SHA-256 hash, and placement within the Merkle tree for that draw.",
  },
  {
    title: "Run the draw",
    description: "Trigger a verifiable draw through dashboard, API, or schedule.",
    detail: "CAAS seeds the RNG, locks entries, records chain-of-custody, and outputs winners in order.",
  },
  {
    title: "Publish audit",
    description: "A hosted audit viewer, winner evidence pack, and shareable badge go live automatically.",
    detail: "Entrants verify outcomes themselves; regulators receive immutable logs if they ever ask.",
  },
];

const features = [
  {
    title: "Tamper-proof audit chain",
    description: "Every event is hashed, timestamped, and linked.",
    icon: resolveFeatureIcon("audit"),
    bullets: [
      "SHA-256 hashing at ingest",
      "Merkle root published per draw",
      "Immutable audit timeline",
    ],
  },
  {
    title: "Multi-prize draw support",
    description: "Run sequential or simultaneous prize selections.",
    icon: resolveFeatureIcon("multi"),
    bullets: [
      "Weighted prize rules",
      "Automatic re-draw for ineligible winners",
      "Instant public results",
    ],
  },
  {
    title: "Public audit verification",
    description: "Entrants self-verify winners, tickets, and odds.",
    icon: resolveFeatureIcon("public"),
    bullets: [
      "Shareable audit URLs + QR codes",
      "Mobile optimised explorer",
      "Copy-ready badge & embed widget",
    ],
  },
  {
    title: "Operator dashboard",
    description: "Trusted control room for non-technical teams.",
    icon: resolveFeatureIcon("dashboard"),
    bullets: [
      "Live draw queue & alerts",
      "Entry intelligence and risk flags",
      "Audit artefact exports",
    ],
  },
  {
    title: "REST API + SDKs",
    description: "Developers integrate with real tooling, not PDFs.",
    icon: resolveFeatureIcon("api"),
    bullets: [
      "Typed Node, PHP, and Laravel SDKs",
      "Idempotent webhooks & retries",
      "Fine-grained API keys and scopes",
    ],
  },
  {
    title: "Draw fairness engine",
    description: "CSPRNG seeds, hash commitments, and RNG attestation.",
    icon: resolveFeatureIcon("fairness"),
    bullets: [
      "Seed reveal & signature",
      "Audit-ready RNG transcript",
      "On-demand re-run with lockstep proof",
    ],
  },
  {
    title: "Integrity checks & health monitoring",
    description: "CAAS watches what humans miss.",
    icon: resolveFeatureIcon("integrity"),
    bullets: [
      "Late or void entry blocking",
      "Duplicate ticket and eligibility scans",
      "Alerting to Slack, email, or webhook",
    ],
  },
  {
    title: "Automatic compliance evidence",
    description: "Proof bundles generated per draw.",
    icon: resolveFeatureIcon("evidence"),
    bullets: [
      "PDF + JSON audit packs",
      "Signed attestation summary",
      "Customer-facing badge + embed kit",
    ],
  },
];

const testimonials = [
  {
    quote: "CAAS stopped accusations overnight. We send the audit link and the ticket holder instantly believes us.",
    author: "James Morton",
    role: "Founder, PrizeDraw UK",
  },
  {
    quote: "Multi-prize draws used to take a day of admin. Now CAAS publishes the entire audit chain in minutes.",
    author: "Sarah Lennon",
    role: "Head of Ops, Elite Competitions",
  },
  {
    quote: "Our charity raffles finally look regulator-grade. Donations went up 15% after we added the verified badge.",
    author: "David Kumar",
    role: "Director, RaffleAid",
  },
];

const auditScreens = [
  {
    title: "Public audit viewer",
    description: "Entrants scan a QR code, validate tickets, and review hashes.",
    image: "comp_8x92ns",
  },
  {
    title: "Operator evidence pack",
    description: "One click to download the full transcript, signatures, and logs.",
    image: "draw_pack_q4",
  },
];

const complianceItems = [
  { title: "Late entries", description: "Entries past cutoff are rejected with proof stored in the audit chain." },
  { title: "Duplicate IDs", description: "Collision detector prevents duplicate ticket IDs before a draw runs." },
  { title: "Void entry usage", description: "Void tickets are quarantined so they never impact fairness." },
  { title: "Winner eligibility", description: "Eligibility rules checked before the winner is confirmed." },
  { title: "Draw ordering", description: "Multi-prize draws log selection order and re-draw reasons." },
  { title: "Seed & hash verification", description: "Every draw seed and hash pair is published for third-party review." },
  { title: "Audit chain continuity", description: "Any break in the chain triggers immediate alerts to your team." },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Test the full workflow on low-volume competitions.",
    bullets: ["50 entries per draw", "1 public audit / month", "Standard badge"],
  },
  {
    name: "Growth",
    price: "£49 / draw",
    description: "Scale confidently with unlimited audits and automation.",
    bullets: ["Unlimited entries", "Custom badge & white-label viewer", "Priority onboarding"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Dedicated compliance concierge for high-volume operators.",
    bullets: ["Dedicated success engineer", "SLA-backed uptime", "Bespoke integrations"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero
          eyebrow="Compliance Assurance for Competitions"
          title="Compliance-grade transparency for every competition draw."
          subtitle="CAAS automates audit trails, tamper-proof proofs, and trust-building dashboards so raffles, giveaways, and multi-prize draws feel as legitimate as the biggest operators."
          actions={[
            { label: "Integrate CAAS", href: "/operator/register" },
            { label: "View audit demo", href: "/audit/example-uuid", variant: "secondary" },
          ]}
          stats={[
            { label: "Disputes eliminated", value: "92%", helper: "Average drop after first week" },
            { label: "Audit publish time", value: "3.2s", helper: "Median time from draw to public page" },
          ]}
        />
        <PainPoints items={painPoints} />
        <ValueProps highlights={valueHighlights} />
        <HowItWorks steps={workflowSteps} />
        <Features features={features} />
        <TrustSection testimonials={testimonials} />
        <AuditPreview screenshots={auditScreens} />
        <ComplianceChecklist items={complianceItems} />
        <PricingTeaser tiers={pricingTiers} />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
