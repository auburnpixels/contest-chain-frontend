import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import { HeroSection } from "@/components/marketing/HeroSection";

export const metadata: Metadata = {
  title: "Veristiq — Independent Fairness Verification for Prize Draws",
  description: "Third-party verification for prize competitions. Tamper-evident audit trails, cryptographic proof, and regulator-ready compliance for UK operators.",
  openGraph: {
    title: "Veristiq — Independent Fairness Verification for Prize Draws",
    description: "Third-party verification for prize competitions. Tamper-evident audit trails, cryptographic proof, and regulator-ready compliance.",
  },
};
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { SolutionSection } from "@/components/marketing/SolutionSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { ProductScreenshotSection } from "@/components/marketing/ProductScreenshotSection";
import { FeaturesChecklistSection } from "@/components/marketing/FeaturesChecklistSection";
import { ComplianceSection } from "@/components/marketing/ComplianceSection";
import { PricingPreviewSection } from "@/components/marketing/PricingPreviewSection";
import { BlogPreviewSection } from "@/components/marketing/BlogPreviewSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20"> {/* Add padding-top to account for fixed header */}
        <HeroSection />
        <TrustStrip />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <ProductScreenshotSection />
        <ComplianceSection />
        <PricingPreviewSection />
        <BlogPreviewSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
