import { ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col gap-10 lg:gap-16">
         <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-semibold text-[var(--veristiq-slate)]">How it works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative z-10 group">
                <div className="bg-[var(--veristiq-snow)] rounded-xl p-8 h-full border border-gray-100 transition-all duration-500 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1">
                    <div className="w-10 h-10 bg-[var(--veristiq-primary-blue)] text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">1</div>
                    <h3 className="text-xl font-semibold text-[var(--veristiq-slate)] mb-4">Record Entries & Events</h3>
                    <p className="text-[var(--veristiq-slate-light)] mb-6">
                        Operators send competition entries and draw-related events to Veristiq via API. Each event is recorded in a time-ordered, append-only audit log designed to be tamper-evident from the moment it is written
                    </p>
                    <div className="bg-white p-3 rounded border border-gray-200 font-mono text-xs text-gray-500 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
                        POST /api/v1/operator/entries<br/>
                        {`{ "external_id": "A105", "user_reference": "..." }`}
                    </div>
                </div>
            </div>

             {/* Step 2 */}
            <div className="relative z-10 group">
                <div className="bg-[var(--veristiq-snow)] rounded-xl p-8 h-full border border-gray-100 transition-all duration-500 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 delay-100">
                     <div className="w-10 h-10 bg-[var(--veristiq-primary-blue)] text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">2</div>
                    <h3 className="text-xl font-semibold text-[var(--veristiq-slate)] mb-4">Execute the Draw</h3>
                    <p className="text-[var(--veristiq-slate-light)] mb-6">
                        When a draw is triggered, Veristiq executes it as a single atomic operation. The selection method, inputs, timestamp, and result are cryptographically recorded, ensuring the outcome cannot be altered or replayed.
                    </p>
                     <div className="bg-white p-3 rounded border border-gray-200 font-mono text-xs text-gray-500 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
                        Draw #8821 Executed<br/>
                        Winner: Ticket #492<br/>
                        Hash: 7x9...2a1
                    </div>
                </div>
            </div>

             {/* Step 3 */}
            <div className="relative z-10 group">
                <div className="bg-[var(--veristiq-snow)] rounded-xl p-8 h-full border border-gray-100 transition-all duration-500 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 delay-200">
                     <div className="w-10 h-10 bg-[var(--veristiq-primary-blue)] text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">3</div>
                    <h3 className="text-xl font-semibold text-[var(--veristiq-slate)] mb-4">Verify the Outcome</h3>
                    <p className="text-[var(--veristiq-slate-light)] mb-6">
                        The completed draw is published to a public audit page. Anyone can independently inspect the draw record and verify that the winner was selected fairly from the recorded entry set, without relying on screen recordings or internal assurances.
                    </p>
                     <div className="flex items-center gap-2 bg-blue-50 p-3 rounded border border-blue-200 text-blue-700 text-sm font-medium shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                        Verification Successful
                    </div>
                </div>
            </div>
            
            {/* Arrows (Hidden on mobile) */}
            <div className="hidden md:block absolute top-12 left-[30%] text-gray-300 animate-pulse">
                <ArrowRight className="w-8 h-8" />
            </div>
             <div className="hidden md:block absolute top-12 left-[63%] text-gray-300 animate-pulse delay-500">
                <ArrowRight className="w-8 h-8" />
            </div>
        </div>

          <p className="text-center font-semibold text-lg">Veristiq does not handle payments, customer data, or marketing — only draw integrity and verification.</p>
      </div>
    </section>
  );
}
