import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";

type PainPointsProps = {
  items: string[];
};

export const PainPoints = ({ items }: PainPointsProps) => (
  <section className="bg-black/40 py-20">
    <div className="mx-auto max-w-content px-6 space-y-12">
      <SectionHeading
        eyebrow="Operator Pain Points"
        title="Everything operators hate about running draws manually."
        description="CAAS removes the drama that slows ticket sales and erodes trust."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item}
            className="border-white/5 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-accentMint/40"
          >
            <CardContent className="p-0">
              <p className="text-lg text-muted-foreground">{item}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

