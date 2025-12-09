import { Building2 } from "lucide-react";

export function TrustStrip() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <p className="text-center text-sm font-medium text-[var(--veristiq-grey)] uppercase tracking-wider mb-8">
          Trusted by UK competition operators
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholders using text/icons for now as per instructions */}
            <div className="flex items-center gap-2 text-xl font-bold text-[var(--veristiq-slate)]">
                <div className="bg-gray-200 h-8 w-8 rounded"></div>
                <span>OperatorOne</span>
            </div>
             <div className="flex items-center gap-2 text-xl font-bold text-[var(--veristiq-slate)]">
                <div className="bg-gray-200 h-8 w-8 rounded"></div>
                <span>WinBig</span>
            </div>
             <div className="flex items-center gap-2 text-xl font-bold text-[var(--veristiq-slate)]">
                <div className="bg-gray-200 h-8 w-8 rounded"></div>
                <span>PrizeDraws</span>
            </div>
             <div className="flex items-center gap-2 text-xl font-bold text-[var(--veristiq-slate)]">
                <div className="bg-gray-200 h-8 w-8 rounded"></div>
                <span>Compify</span>
            </div>
        </div>
      </div>
    </section>
  );
}
