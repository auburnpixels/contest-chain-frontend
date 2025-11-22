import Link from "next/link";
import { ArrowRight, ShieldCheck, Eye, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroStat = {
  label: string;
  value: string;
  helper?: string;
};

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type HeroProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  actions?: HeroAction[];
  stats?: HeroStat[];
};

export const Hero = ({
  eyebrow = "Compliance Assurance for Competitions",
  title = "The infrastructure for provably fair competitions.",
  subtitle = "Turn any raffle, giveaway, or prize draw into a cryptographic audit trail. Build trust, eliminate disputes, and automate compliance.",
  actions = [
    { label: "Start building", href: "/operator/register" },
    { label: "View Live Audit", href: "/audit/example-uuid", variant: "secondary" },
  ],
  stats = [],
}: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white pt-16 pb-32 md:pt-32 md:pb-48 max-w-7xl mx-auto">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:32px_32px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/20 via-transparent to-transparent blur-[100px]" />
      </div>
      
      <div className="relative mx-auto max-w-content px-6 lg:grid lg:grid-cols-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1 text-xs font-medium text-brand-blue backdrop-blur-sm mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            {eyebrow}
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-tight text-balance">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed text-balance">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            {actions.map((action, index) => (
              <Link key={action.label} href={action.href} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className={cn(
                    "w-full h-14 rounded-full px-8 text-base font-medium transition-all duration-300",
                    action.variant === "secondary"
                      ? "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                      : "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-[0_0_30px_-10px_rgba(37,99,235,0.5)]"
                  )}
                >
                  {action.label}
                  {index === 0 && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </Link>
            ))}
          </div>

          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 mt-8 lg:justify-start justify-center">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm uppercase tracking-wider text-slate-500 font-medium mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side Visual - Dashboard Preview / Abstract Art */}
        <div className="mt-16 lg:mt-0 lg:col-span-6 relative">
          <div className="relative rounded-2xl border border-white/10 bg-brand-slate/50 backdrop-blur-xl p-2 shadow-2xl shadow-black/50 rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
            <div className="rounded-xl bg-brand-navy overflow-hidden border border-white/5 relative">
              {/* Header Mockup */}
              <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="ml-4 h-6 w-64 rounded-full bg-white/5" />
              </div>
              
              {/* Content Mockup */}
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-white/10 rounded" />
                    <div className="h-8 w-48 bg-white/20 rounded" />
                  </div>
                  <div className="h-10 w-24 bg-accent-mint/20 text-accent-mint rounded-full flex items-center justify-center border border-accent-mint/30 font-mono text-xs">
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    VERIFIED
                  </div>
                </div>
                
                {/* Code/Audit Block */}
                <div className="rounded-lg bg-black/50 border border-white/10 p-4 font-mono text-xs text-muted-foreground space-y-2">
                  <div className="flex justify-between">
                    <span>DRAW_ID</span>
                    <span className="text-slate-600">#8291-A</span>
                  </div>
                  <div className="flex justify-between text-accent-mint">
                    <span>STATUS</span>
                    <span>AUDIT_COMPLETE_VERIFIED</span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="space-y-1">
                    <p className="flex gap-2">
                      <span className="text-brand-blue">hash_root:</span>
                      <span className="text-slate-500 truncate">0x8f2a...9b1c</span>
                    </p>
                    <p className="flex gap-2">
                      <span className="text-brand-blue">prev_block:</span>
                      <span className="text-slate-500 truncate">0x1d4e...2f8a</span>
                    </p>
                    <p className="flex gap-2">
                      <span className="text-brand-blue">timestamp:</span>
                      <span className="text-slate-500">1678886400</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="h-24 rounded-lg bg-white/5 border border-white/5" />
                   ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-brand-slate border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md max-w-[200px] animate-bounce-slow">
             <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                 <Lock className="w-4 h-4" />
               </div>
               <p className="text-xs font-medium text-white">Tamper-Proof</p>
             </div>
             <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-green-500 w-full" />
             </div>
             <p className="text-[10px] text-muted-foreground mt-2">Cryptographically secured chain.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
