import Link from "next/link";
import { Button } from "@/components/ui/button";

type CTA = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
};

export const PageHero = ({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: PageHeroProps) => (
  <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-brand-navy via-brand-slate/80 to-black py-20 text-white">
    <div className="absolute inset-0 bg-brand-grid bg-[length:28px_28px] opacity-10" />
    <div className="relative mx-auto max-w-content px-6">
      <p className="text-xs uppercase tracking-[0.4em] text-accentMint/90">
        {eyebrow}
      </p>
      <h1 className="mt-6 text-4xl font-semibold text-white">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-200">{description}</p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        {primaryCta && (
          <Link href={primaryCta.href}>
            <Button className="h-12 rounded-full bg-accentMint px-8 text-brand-navy hover:bg-accentMint/90">
              {primaryCta.label}
            </Button>
          </Link>
        )}
        {secondaryCta && (
          <Link href={secondaryCta.href}>
            <Button
              variant="outline"
              className="h-12 rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white/10"
            >
              {secondaryCta.label}
            </Button>
          </Link>
        )}
      </div>
    </div>
  </section>
);

