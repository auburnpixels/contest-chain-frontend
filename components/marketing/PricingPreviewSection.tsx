import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PricingPreviewSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Core */}
            <div className="p-8 rounded-xl border border-gray-200 hover:border-[var(--veristiq-primary-blue)] transition-all duration-300 hover:shadow-xl group bg-white">
                <h3 className="text-xl font-bold text-[var(--veristiq-slate)] mb-2">Core</h3>
                <div className="text-3xl font-bold text-[var(--veristiq-slate)] mb-4">£39<span className="text-sm font-normal text-gray-500">/mo</span></div>
                <p className="text-[var(--veristiq-slate-light)] mb-8">Everything you need to verify draws.</p>
                <Link href="/pricing" className="text-[var(--veristiq-primary-blue)] font-medium hover:underline flex items-center gap-2 group-hover:gap-3 transition-all">
                    See details &rarr;
                </Link>
            </div>

            {/* Enterprise */}
             <div className="p-8 rounded-xl border border-gray-200 bg-[var(--veristiq-slate)] text-white hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                 <div className="text-3xl font-bold mb-4">£349<span className="text-sm font-normal text-gray-400">/mo</span></div>
                <p className="text-gray-300 mb-8">For large operators requiring compliance and SLA.</p>
                <Link href="/pricing" className="text-white font-medium hover:underline flex items-center gap-2 hover:gap-3 transition-all">
                    See details &rarr;
                </Link>
            </div>
        </div>
        
        <div className="text-center mt-12">
            <Link href="/pricing">
                <Button variant="link" className="text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] transition-colors">See full pricing</Button>
            </Link>
        </div>
      </div>
    </section>
  );
}
