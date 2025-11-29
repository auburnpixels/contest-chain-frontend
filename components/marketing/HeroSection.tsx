import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, FileCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          
          {/* Badge/Highlight - Optional visual cue */}
          <div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            <span className="flex h-2 w-2 rounded-full bg-brand-cobalt mr-2 animate-pulse"></span>
            Independent Fairness Infrastructure
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Independent fairness for <br className="hidden md:block" />
            <span className="text-brand-cobalt">every prize competition.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Ensure every draw you run is transparent, tamper-evident, and provably fair. 
            CAFAAS provides cryptographically secured audit trails and public verification tools that build trust with your players — instantly.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <Button 
              size="lg" 
              className="bg-brand-cobalt text-white hover:bg-brand-cobalt/90 h-12 px-8 text-base shadow-lg shadow-brand-cobalt/20"
              asChild
            >
              <Link href="/operator/register">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-12 px-8 text-base border-zinc-200 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
              asChild
            >
              <Link href="#example-audit">
                View Example Audit
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-cobalt" />
              <span>CAFAAS Verified</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-brand-cobalt" />
              <span>Tamper-Evident Hash Chain</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FileCheck className="h-5 w-5 text-brand-cobalt" />
              <span>Public Audit Pages Included</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Background gradients/decorations */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-brand-cobalt/5 to-transparent -z-10 pointer-events-none" />
    </section>
  );
}

