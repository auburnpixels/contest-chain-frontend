import { ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
         <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-semibold text-[var(--veristiq-slate)]">How It Works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative z-10 group">
                <div className="bg-[var(--veristiq-snow)] rounded-xl p-8 h-full border border-gray-100 transition-all duration-500 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1">
                    <div className="w-10 h-10 bg-[var(--veristiq-primary-blue)] text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">1</div>
                    <h3 className="text-xl font-semibold text-[var(--veristiq-slate)] mb-4">Log Entries & Events</h3>
                    <p className="text-[var(--veristiq-slate-light)] mb-6">
                        Operators send ticket entries and competition events to Veristiq via API. Everything is logged immutably in real-time.
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
                    <h3 className="text-xl font-semibold text-[var(--veristiq-slate)] mb-4">Execute Draw</h3>
                    <p className="text-[var(--veristiq-slate-light)] mb-6">
                        The draw is executed atomically using our provably fair RNG. The result, hash, and timestamp are locked into the chain.
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
                    <h3 className="text-xl font-semibold text-[var(--veristiq-slate)] mb-4">Verify Result</h3>
                    <p className="text-[var(--veristiq-slate-light)] mb-6">
                        Anyone can verify the result on a public audit page. Cryptographic proof ensures the winner was picked fairly from the full pool.
                    </p>
                     <div className="flex items-center gap-2 bg-green-50 p-3 rounded border border-green-200 text-green-700 text-sm font-medium shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
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
      </div>
    </section>
  );
}
