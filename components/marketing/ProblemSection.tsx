import { Lock, FileCheck, Users } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--veristiq-slate)] mb-4">
            The competitions industry has a trust problem.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 group">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6 text-[var(--veristiq-slate)] group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                <Lock className="w-6 h-6 text-gray-400 group-hover:text-[var(--veristiq-primary-blue)] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--veristiq-slate)] mb-3">Opaque Draws</h3>
            <p className="text-[var(--veristiq-slate-light)] leading-relaxed">
              Most draws happen inside private databases with no independent oversight. Players just have to "trust" the screen recording.
            </p>
          </div>

          <div className="p-8 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 group delay-100">
             <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6 text-[var(--veristiq-slate)] group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                <FileCheck className="w-6 h-6 text-gray-400 group-hover:text-[var(--veristiq-primary-blue)] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--veristiq-slate)] mb-3">Compliance Pressure</h3>
            <p className="text-[var(--veristiq-slate-light)] leading-relaxed">
              DCMS is raising expectations. Operators must demonstrate fairness, not just claim it. Self-certification is no longer enough.
            </p>
          </div>

          <div className="p-8 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 group delay-200">
             <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6 text-[var(--veristiq-slate)] group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                <Users className="w-6 h-6 text-gray-400 group-hover:text-[var(--veristiq-primary-blue)] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--veristiq-slate)] mb-3">Public Distrust</h3>
            <p className="text-[var(--veristiq-slate-light)] leading-relaxed">
              Players expect transparency. Without it, suspicion grows. "Fixed" accusations can kill a reputation overnight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
