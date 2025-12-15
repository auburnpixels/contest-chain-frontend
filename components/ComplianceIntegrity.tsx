import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Check, ShieldAlert, AlertTriangle } from "lucide-react";

type ChecklistItem = {
  title: string;
  description: string;
};

type ComplianceIntegrityProps = {
  items?: ChecklistItem[];
};

const defaultItems = [
  { title: "Late entries", description: "Entries past cutoff are rejected with proof stored in the audit chain." },
  { title: "Duplicate IDs", description: "Collision detector prevents duplicate ticket IDs before a draw runs." },
  { title: "Void entry usage", description: "Void tickets are quarantined so they never impact fairness." },
  { title: "Winner eligibility", description: "Eligibility rules checked before the winner is confirmed." },
  { title: "Draw ordering", description: "Multi-prize draws log selection order and re-draw reasons." },
  { title: "Seed & hash verification", description: "Every draw seed and hash pair is published for third-party review." },
  { title: "Audit chain continuity", description: "Any break in the chain triggers immediate alerts to your team." },
];

export const ComplianceIntegrity = ({ items }: ComplianceIntegrityProps) => {
  const content = items || defaultItems;

  return (
    <section className="bg-brand-navy py-32 relative border-y border-white/5 max-w-7xl mx-auto">
      <div className="mx-auto max-w-content px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Left: Text Context */}
          <div className="lg:col-span-5 space-y-8">
             <SectionHeading
                eyebrow="Integrity Engine"
                title="We catch what humans miss."
                description="Cafaas doesn't just log events. It actively blocks invalid states to keep your competition legally defensible."
                align="left"
              />
              
              <div className="p-6 rounded-xl bg-brand-slate border border-brand-blue/20 shadow-glow-blue">
                 <div className="flex items-start gap-4">
                    <ShieldAlert className="w-6 h-6 text-brand-blue shrink-0 mt-1" />
                    <div>
                        <h4 className="text-white font-medium mb-2">Not Legal Advice</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Cafaas provides technical proof of fairness. While this solves 99% of player disputes, operators are still responsible for their own legal compliance with local gambling laws.
                        </p>
                    </div>
                 </div>
              </div>
          </div>

          {/* Right: Grid of Checks */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {content.map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-white/5 bg-brand-slate/30 p-6 transition-all hover:bg-brand-slate hover:border-white/10"
              >
                <div className="flex items-center gap-3 mb-3">
                   <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-blue-500" />
                   </div>
                   <h3 className="font-medium text-white group-hover:text-brand-blue transition-colors">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground pl-9 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
