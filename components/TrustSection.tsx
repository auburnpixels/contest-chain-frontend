import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Users, Clock, ArrowRight, Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

type TrustSectionProps = {
  testimonials?: Testimonial[];
};

const defaultTestimonials = [
  {
    quote: "CAAS stopped accusations overnight. We send the audit link and the ticket holder instantly believes us.",
    author: "James Morton",
    role: "Founder, PrizeDraw UK",
  },
  {
    quote: "Multi-prize draws used to take a day of admin. Now CAAS publishes the entire audit chain in minutes.",
    author: "Sarah Lennon",
    role: "Head of Ops, Elite Competitions",
  }
];

export const TrustSection = ({ testimonials = defaultTestimonials }: TrustSectionProps) => (
  <section className="bg-brand-navy py-32 relative max-w-7xl mx-auto">
    <div className="mx-auto max-w-content px-6 space-y-20">
      <SectionHeading
        eyebrow="Trust & Results"
        title="Proof is your best marketing asset."
        description="Operators that switch to verifiable audits see fewer disputes and higher ticket values."
        align="left"
      />

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: Testimonials */}
        <div className="space-y-8">
          {testimonials.map((item, idx) => (
            <Card
              key={idx}
              className="border-none bg-transparent relative"
            >
              <div className="absolute -top-4 -left-4 text-brand-blue/20">
                <Quote size={48} strokeWidth={1} />
              </div>
              <CardContent className="space-y-6 p-0 relative z-10">
                <p className="text-2xl font-display font-medium text-white leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-slate border border-white/10" />
                    <div>
                        <p className="font-semibold text-white">{item.author}</p>
                        <p className="text-sm text-muted-foreground">{item.role}</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="pt-8">
             <a href="/case-studies" className="inline-flex items-center text-brand-blue font-medium hover:text-brand-blue/80 transition-colors">
                 Read more success stories <ArrowRight className="ml-2 w-4 h-4" />
             </a>
          </div>
        </div>

        {/* Right: Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
            <div className="p-8 rounded-2xl bg-brand-slate border border-white/5 hover:border-brand-blue/30 transition-colors">
                <Users className="w-8 h-8 text-brand-blue mb-4" />
                <p className="text-4xl font-bold text-white mb-2">+18%</p>
                <p className="text-muted-foreground text-sm">Average uplift in ticket conversion rates.</p>
            </div>
            <div className="p-8 rounded-2xl bg-brand-slate border border-white/5 hover:border-brand-blue/30 transition-colors">
                <ShieldCheck className="w-8 h-8 text-accent-mint mb-4" />
                <p className="text-4xl font-bold text-white mb-2">0</p>
                <p className="text-muted-foreground text-sm">Disputes escalated after implementing audit links.</p>
            </div>
             <div className="p-8 rounded-2xl bg-brand-slate border border-white/5 hover:border-brand-blue/30 transition-colors sm:col-span-2">
                <Clock className="w-8 h-8 text-accent-purple mb-4" />
                <p className="text-4xl font-bold text-white mb-2">3.2s</p>
                <p className="text-muted-foreground text-sm">Average time to publish a fully verified public audit page.</p>
            </div>
        </div>
      </div>
    </div>
  </section>
);
