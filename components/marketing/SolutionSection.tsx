import { Link, Eye, FileText, CheckCircle2 } from "lucide-react";

export function SolutionSection() {
  return (
    <section className="py-24 bg-[var(--veristiq-snow)] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/40 to-transparent"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--veristiq-slate)] mb-6">
            Veristiq creates an independent, cryptographically verifiable record of every draw.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Link className="w-6 h-6 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--veristiq-slate)] mb-2">Tamper-Evident Chain</h3>
                <p className="text-sm text-[var(--veristiq-slate-light)]">Every event is hashed and linked. History cannot be rewritten.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 delay-100">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--veristiq-slate)] mb-2">Public Verification</h3>
                <p className="text-sm text-[var(--veristiq-slate-light)]">Dedicated pages where players can verify results independently.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 delay-200">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--veristiq-slate)] mb-2">Compliance Reporting</h3>
                <p className="text-sm text-[var(--veristiq-slate-light)]">Automated reports aligned with DCMS and advertising standards.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 delay-300">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--veristiq-slate)] mb-2">Simple API</h3>
                <p className="text-sm text-[var(--veristiq-slate-light)]">Integrates with your existing platform in minutes.</p>
            </div>
        </div>
      </div>
    </section>
  );
}
