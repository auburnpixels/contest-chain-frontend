import { Hero } from "@/components/Hero";
import { OperatorPainPoints } from "@/components/OperatorPainPoints";
import { CoreValueProposition } from "@/components/CoreValueProposition";
import { HowItWorks } from "@/components/HowItWorks";
import { Features, resolveFeatureIcon } from "@/components/Features";
import { TrustSection } from "@/components/TrustSection";
import { UiDashboardPreview } from "@/components/UiDashboardPreview";
import { ComplianceIntegrity } from "@/components/ComplianceIntegrity";
import { PricingTeaser } from "@/components/PricingTeaser";
import { FinalCTA } from "@/components/FinalCTA";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const features = [
  {
    title: "Tamper-Proof Audit Chain",
    description: "Every entry and draw event is hashed, timestamped, and linked in a cryptographic chain.",
    icon: resolveFeatureIcon("audit"),
    bullets: [
      "SHA-256 hashing at ingest",
      "Merkle root verification",
      "Immutable timeline",
    ],
  },
  {
    title: "Multi-Prize Logic",
    description: "Handle complex draws with multiple winners, weighted odds, and instant redraws.",
    icon: resolveFeatureIcon("multi"),
    bullets: [
      "Sequential prize selection",
      "Automatic exclusion rules",
      "Real-time results publishing",
    ],
  },
  {
    title: "Public Verification",
    description: "Give every entrant a tool to verify their own ticket and the draw outcome.",
    icon: resolveFeatureIcon("public"),
    bullets: [
      "Mobile-friendly explorer",
      "Shareable proof links",
      "QR code verification",
    ],
  },
  {
    title: "Operator Dashboard",
    description: "A powerful command center to manage competitions, alerts, and exports.",
    icon: resolveFeatureIcon("dashboard"),
    bullets: [
      "Live draw monitoring",
      "Risk & fraud alerts",
      "One-click audit exports",
    ],
  },
  {
    title: "Developer API",
    description: "Build custom experiences with our robust REST API and typed SDKs.",
    icon: resolveFeatureIcon("api"),
    bullets: [
      "Typed Node/PHP SDKs",
      "Webhooks for draw events",
      "Idempotent operations",
    ],
  },
  {
    title: "Fairness Engine",
    description: "Provably fair RNG using CSPRNG seeds and commitment schemes.",
    icon: resolveFeatureIcon("fairness"),
    bullets: [
      "Seed reveal protocols",
      "RNG transcript logging",
      "Statistical randomness tests",
    ],
  },
  {
    title: "Integrity Monitors",
    description: "Automated watchdogs that prevent common compliance failures.",
    icon: resolveFeatureIcon("integrity"),
    bullets: [
      "Late entry blocking",
      "Duplicate ticket prevention",
      "Eligibility enforcement",
    ],
  },
  {
    title: "Compliance Evidence",
    description: "Generate regulator-ready PDF and JSON reports for every competition.",
    icon: resolveFeatureIcon("evidence"),
    bullets: [
      "Signed attestation summaries",
      "Full event logs",
      "Downloadable proof packs",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-navy text-white font-sans selection:bg-brand-blue selection:text-white">
      <SiteHeader />
      <main>
        <Hero />
        <OperatorPainPoints />
        <CoreValueProposition />
        <HowItWorks />
        <Features features={features} />
        <TrustSection />
        <UiDashboardPreview />
        <ComplianceIntegrity />
        <PricingTeaser />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
