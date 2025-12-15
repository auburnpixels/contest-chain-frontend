import { Lock, FileCheck, Users } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col gap-10 lg:gap-16">
        <div className="text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--veristiq-slate)]">
              The limitations of existing draw verification.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 group">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6 text-[var(--veristiq-slate)] group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                <Lock className="w-6 h-6 text-gray-400 group-hover:text-[var(--veristiq-primary-blue)] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--veristiq-slate)] mb-3">Private Draw Systems</h3>
            <p className="text-[var(--veristiq-slate-light)] leading-relaxed">
                Most competition draws are executed inside private databases. While screen recordings may show what happened on screen, they do not provide independent, tamper-evident evidence of what occurred at the data level.
            </p>
          </div>

          <div className="p-8 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 group delay-100">
             <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6 text-[var(--veristiq-slate)] group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                <FileCheck className="w-6 h-6 text-gray-400 group-hover:text-[var(--veristiq-primary-blue)] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--veristiq-slate)] mb-3">Rising Regulatory Expectations</h3>
            <p className="text-[var(--veristiq-slate-light)] leading-relaxed text-base">
                The DCMS Voluntary Code raises the standard for how fairness is demonstrated. Operators are increasingly expected to produce clear, verifiable evidence — not just internal assurances or self-certification.
            </p>
          </div>

          <div className="p-8 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 group delay-200">
             <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6 text-[var(--veristiq-slate)] group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                <Users className="w-6 h-6 text-gray-400 group-hover:text-[var(--veristiq-primary-blue)] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--veristiq-slate)] mb-3">Growing Expectations for Transparency</h3>
            <p className="text-[var(--veristiq-slate-light)] leading-relaxed">
                Entrants expect greater visibility into how winners are selected. When outcomes cannot be independently verified, even fair draws can be questioned, creating unnecessary disputes and reputational risk.
            </p>
          </div>
        </div>

          <p className="text-center text-lg font-semibold">Screen recordings show what happened on screen — not what happened in the database.</p>
      </div>
    </section>
  );
}
