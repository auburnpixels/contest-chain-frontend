import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import { Hero } from "@/components/home/Hero";
import { ValueGrid } from "@/components/home/ValueGrid";
import { ProcessFlow } from "@/components/home/ProcessFlow";
import { TechDeepDive } from "@/components/home/TechDeepDive";
import { AudienceProof } from "@/components/home/AudienceProof";
import { FeaturesClose } from "@/components/home/FeaturesClose";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-trust-teal/20 selection:text-trust-teal">
      <SiteHeader />
      <main>
        <Hero />
        <ValueGrid />
        <ProcessFlow />
        <TechDeepDive />
        <AudienceProof />
        <FeaturesClose />
      </main>
      <SiteFooter />
    </div>
  );
}
