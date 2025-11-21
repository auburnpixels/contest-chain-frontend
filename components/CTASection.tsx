import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CTASection = () => (
  <section className="relative overflow-hidden py-24">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(48,224,181,0.25),_transparent_60%)]" />
    <div className="relative mx-auto max-w-content rounded-3xl border border-white/10 bg-gradient-to-br from-brand-navy via-brand-slate to-black px-10 py-16 text-center shadow-brand">
      <p className="text-xs uppercase tracking-[0.4em] text-accentMint/80">
        Final step
      </p>
      <h2 className="mt-4 text-4xl font-semibold text-white">
        Become the trusted operator in your category.
      </h2>
      <p className="mt-4 text-lg text-slate-300">
        Launch public audit pages, automated evidence packs, and dispute-proof
        draws with CAAS today.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link href="/operator/register">
          <Button className="h-14 rounded-full bg-accentMint px-10 text-base font-semibold text-brand-navy hover:bg-accentMint/90">
            Start running transparent draws
          </Button>
        </Link>
        <Link href="/contact">
          <Button
            variant="outline"
            className="h-14 rounded-full border-white/40 bg-transparent px-10 text-base text-white hover:bg-white/10"
          >
            Book a live trust audit
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

