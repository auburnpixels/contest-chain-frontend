import { CheckCircle2 } from "lucide-react";

export function FeaturesChecklistSection() {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16">
            {/* Fairness Engine */}
            <div>
                <h3 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-8 flex items-center gap-3">
                    Fairness Engine
                </h3>
                <ul className="space-y-4">
                    <FeatureItem text="Cryptographic chain" />
                    <FeatureItem text="Previous-hash linking" />
                    <FeatureItem text="Immutable events" />
                    <FeatureItem text="Draw integrity checks" />
                    <FeatureItem text="Replay protection" />
                </ul>
            </div>

            {/* Operator Tools */}
             <div>
                <h3 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-8 flex items-center gap-3">
                    Operator Tools
                </h3>
                <ul className="space-y-4">
                    <FeatureItem text="Dashboard" />
                    <FeatureItem text="Entries table" />
                    <FeatureItem text="Competitions management" />
                    <FeatureItem text="Compliance scoring" />
                    <FeatureItem text="Complaints log" />
                    <FeatureItem text="Branded audit pages (Enterprise)" />
                </ul>
            </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <li className="flex items-start gap-3 group">
            <CheckCircle2 className="w-6 h-6 text-[var(--veristiq-primary-blue)] flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-[var(--veristiq-slate-light)] text-lg group-hover:text-[var(--veristiq-slate)] transition-colors">{text}</span>
        </li>
    )
}
