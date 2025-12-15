import { Link, Eye, FileText, CheckCircle2 } from "lucide-react";

export function SolutionSection() {
  return (
    <section className="py-24 bg-[var(--veristiq-snow)] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/40 to-transparent"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--veristiq-slate)] mb-6">
              What Veristiq does
          </h2>
            <p className="text-[var(--veristiq-slate-light)]">Veristiq provides an independent, tamper-evident verification layer for competition draws. It creates a permanent audit record that allows operators, entrants, and third parties to independently verify that a draw was conducted fairly.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Link className="w-6 h-6 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--veristiq-slate)] mb-2">Provable Draw History</h3>
                <p className="text-sm text-[var(--veristiq-slate-light)]">Every draw-related event is cryptographically hashed and linked, creating an immutable sequence that cannot be altered without detection.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 delay-100">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--veristiq-slate)] mb-2">Public, Independent Verification</h3>
                <p className="text-sm text-[var(--veristiq-slate-light)]">Each draw is published to a dedicated audit page, allowing results to be inspected and verified without relying on internal systems or screen recordings.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 delay-200">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--veristiq-slate)] mb-2">Evidence for Compliance & Disputes</h3>
                <p className="text-sm text-[var(--veristiq-slate-light)]">Veristiq generates structured audit records and reports designed to support regulatory enquiries, advertising standards reviews, and customer disputes.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 delay-300">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[var(--veristiq-primary-blue)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--veristiq-slate)] mb-2">Designed to Integrate, Not Replace</h3>
                <p className="text-sm text-[var(--veristiq-slate-light)]">A simple API allows Veristiq to integrate with existing competition platforms. Operators retain full control over entries, payments, and customer management.</p>
            </div>
        </div>
      </div>
    </section>
  );
}
