import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";

type ValuePropsProps = {
  highlights: Array<{
    title: string;
    description: string;
  }>;
};

export const ValueProps = ({ highlights }: ValuePropsProps) => (
  <section className="py-24">
    <div className="mx-auto max-w-content px-6 space-y-10">
      <SectionHeading
        eyebrow="Core Value Proposition"
        title="CAAS turns every draw into an indisputable event."
        description="Operators sell more tickets when buyers see verifiable transparency."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-8"
          >
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              {item.title}
            </Badge>
            <p className="text-lg text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

