import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

type ChecklistItem = {
  title: string;
  description: string;
};

type ComplianceChecklistProps = {
  items: ChecklistItem[];
};

export const ComplianceChecklist = ({ items }: ComplianceChecklistProps) => (
  <section className="bg-black/60 py-24">
    <div className="mx-auto max-w-content px-6 space-y-12">
      <SectionHeading
        eyebrow="Compliance & Integrity"
        title="CAAS enforces transparency. You remain the operator."
        description="We do not certify legality. We automate integrity checks that regulators expect competent operators to prove."
      />
      <p className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-300">
        <span className="font-semibold text-white">Reminder:</span> CAAS does
        not replace your legal obligations. It continuously monitors the
        technical integrity of each draw—late entries, duplicates, eligibility,
        and chain continuity—so you can demonstrate fairness instantly.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-6"
          >
            <Badge className="mb-4 border-accentMint/30 bg-accentMint/10 text-accentMint">
              <Check className="mr-2 h-4 w-4" />
              Monitored
            </Badge>
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

