import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, ThumbsUp, ArrowRight } from "lucide-react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

type TrustSectionProps = {
  testimonials: Testimonial[];
};

const columns = [
  { label: "Disputes handled", manual: "Hours of back-and-forth", caas: "Self-serve proof" },
  { label: "Winner proof", manual: "Screenshots", caas: "Cryptographic audit" },
  { label: "Customer trust", manual: "Hope for the best", caas: "+12% conversion avg." },
];

export const TrustSection = ({ testimonials }: TrustSectionProps) => (
  <section className="bg-black/50 py-24">
    <div className="mx-auto max-w-content px-6 space-y-12">
      <SectionHeading
        eyebrow="Trust & Legitimacy"
        title="Proof beats promises."
        description="Operators that ship audit links instead of explanations experience fewer disputes and more recurring buyers."
      />

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-white/5 bg-white/5 p-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {columns.map((col) => (
              <div key={col.label} className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {col.label}
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  Manual: <span className="text-white/80">{col.manual}</span>
                </p>
                <p className="mt-1 text-base font-semibold text-accentMint">
                  CAAS: {col.caas}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <Shield className="h-4 w-4 text-accentMint" />
            CAAS proves integrity without making you explain anything.
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {testimonials.map((item) => (
            <Card
              key={item.quote}
              className="border-white/5 bg-gradient-to-br from-white/10 to-transparent text-white"
            >
              <CardContent className="space-y-4 p-6">
                <p className="opacity-80">{item.quote}</p>
                <p className="text-sm text-slate-300">
                  {item.author} • {item.role}
                </p>
              </CardContent>
            </Card>
          ))}
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accentMint"
          >
            Explore case studies
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
          <Users className="h-5 w-5 text-accentMint" />
          <p className="mt-3 text-2xl font-semibold text-white">+18%</p>
          <p className="text-sm text-slate-400">Average uplift in ticket conversion.</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
          <Shield className="h-5 w-5 text-accentMint" />
          <p className="mt-3 text-2xl font-semibold text-white">Zero</p>
          <p className="text-sm text-slate-400">Draw disputes escalated after audit links.</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
          <ThumbsUp className="h-5 w-5 text-accentMint" />
          <p className="mt-3 text-2xl font-semibold text-white">3.2s</p>
          <p className="text-sm text-slate-400">Average time to publish a public audit.</p>
        </div>
      </div>
    </div>
  </section>
);

