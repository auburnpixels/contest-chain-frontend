import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import { HeroSection } from "@/components/marketing/HeroSection";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { SolutionSection } from "@/components/marketing/SolutionSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { FeatureGridSection } from "@/components/marketing/FeatureGridSection";
import { ExampleAuditSection } from "@/components/marketing/ExampleAuditSection";
import { PricingSection } from "@/components/marketing/PricingSection";
import { UseCasesSection } from "@/components/marketing/UseCasesSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustStrip />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <FeatureGridSection />
        <ExampleAuditSection />
        <PricingSection />
        <UseCasesSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
