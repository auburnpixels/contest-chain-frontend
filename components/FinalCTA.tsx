import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => (
  <section className="py-24 bg-brand-navy relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-blue/5 to-brand-navy" />
    
    <div className="mx-auto max-w-content px-6 relative z-10">
      <div className="rounded-3xl bg-brand-slate border border-white/10 p-12 md:p-20 text-center shadow-2xl shadow-brand-blue/10 relative overflow-hidden">
        {/* Abstract Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
            Ready to upgrade your reputation?
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Join the top operators running provably fair competitions. Eliminate disputes, automate compliance, and sell more tickets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/access">
              <Button className="w-full sm:w-auto h-14 rounded-full bg-white text-brand-navy hover:bg-slate-200 text-base font-semibold px-8 shadow-lg shadow-white/10">
                Request Access
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-14 rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 text-base px-8"
              >
                Talk to Sales <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-slate-500 pt-4">
            No credit card required for sandbox testing.
          </p>
        </div>
      </div>
    </div>
  </section>
);
