import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import { HeroSection } from "@/components/marketing/HeroSection";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { SolutionSection } from "@/components/marketing/SolutionSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { ProductScreenshotSection } from "@/components/marketing/ProductScreenshotSection";
import { FeaturesChecklistSection } from "@/components/marketing/FeaturesChecklistSection";
import { ComplianceSection } from "@/components/marketing/ComplianceSection";
import { PricingPreviewSection } from "@/components/marketing/PricingPreviewSection";
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
        <FeaturesChecklistSection />
        <ComplianceSection />
        <PricingPreviewSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
