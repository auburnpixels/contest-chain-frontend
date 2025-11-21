import Link from "next/link";
import { ArrowRight, ShieldCheck, Hash, Eye } from "lucide-react";
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
  eyebrow: string;
  title: string;
  subtitle: string;
  actions: [HeroAction, HeroAction];
  stats?: HeroStat[];
};

export const Hero = ({
  eyebrow,
  title,
  subtitle,
  actions,
  stats = [],
}: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy via-brand-slate to-black text-white">
      <div className="absolute inset-0 opacity-20 bg-brand-grid bg-[length:22px_22px]" />
      <div className="absolute -top-32 right-10 h-[520px] w-[520px] rounded-full bg-accentPurple/20 blur-[160px]" />
      <div className="relative mx-auto max-w-content px-6 pb-24 pt-32 lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 space-y-8">
          <p className="inline-flex items-center text-xs uppercase tracking-[0.4em] text-accentMint/80">
            {eyebrow}
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold font-display tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-slate-300 max-w-xl">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {actions.map((action, index) => (
              <Link key={action.label} href={action.href}>
                <Button
                  size="lg"
                  className={cn(
                    "h-14 rounded-full px-8 text-base font-medium",
                    action.variant === "secondary"
                      ? "border border-white/30 bg-transparent text-white hover:bg-white/10"
                      : "bg-accentMint text-brand-navy hover:bg-accentMint/90",
                  )}
                >
                  {action.label}
                  {index === 0 && <ArrowRight className="ml-3 h-5 w-5" />}
                </Button>
              </Link>
            ))}
          </div>
          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-sm uppercase tracking-wide text-slate-400">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-semibold text-white">
                    {stat.value}
                  </p>
                  {stat.helper && (
                    <p className="text-sm text-slate-400">{stat.helper}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 lg:col-span-6 lg:mt-0">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-brand">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-slate-300">
                  Live draw monitor
                </p>
                <p className="text-2xl font-semibold mt-2">Porsche 911</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accentMint/40 px-4 py-2 text-xs text-accentMint">
                <ShieldCheck className="h-4 w-4" />
                Verified
              </div>
            </div>

            <div className="mt-6 space-y-4 rounded-2xl bg-black/30 p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Audit Chain Snapshot
              </div>
              <div className="space-y-3 font-mono text-sm text-slate-300">
                <p className="truncate rounded-lg border border-white/5 bg-black/30 px-4 py-2">
                  seed: 7f83b1657ff1fc53b92dc18148a1d65d...
                </p>
                <p className="truncate rounded-lg border border-white/5 bg-black/30 px-4 py-2">
                  hash(entrant_4821) → 8x92ns01cf0b82a51f44
                </p>
                <p className="truncate rounded-lg border border-white/5 bg-black/30 px-4 py-2">
                  merkle_root → 4a0c8a6b6549f5f1d018b7
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <Eye className="h-4 w-4 text-accentMint" />
                  Public audit link ready
                </div>
                <p className="mt-2 text-xs text-slate-400 font-mono">
                  https://caas.app/audit/comp_8x92ns
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase text-slate-400">Entries</p>
                <p className="text-2xl font-semibold">4,821</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase text-slate-400">Winners</p>
                <p className="text-2xl font-semibold">03</p>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 hidden h-40 w-40 rounded-full bg-accentMint/30 blur-3xl lg:block" />
            <div className="absolute -top-10 -right-8 hidden h-32 w-32 rounded-full bg-accentPurple/40 blur-3xl lg:block" />
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

