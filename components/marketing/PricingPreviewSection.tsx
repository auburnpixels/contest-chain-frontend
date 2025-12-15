import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export function PricingPreviewSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--veristiq-slate)] mb-4">
            Predictable pricing, no surprises
          </h2>
          <p className="text-lg text-[var(--veristiq-slate-light)] max-w-2xl mx-auto">
            No per-ticket fees. No per-draw charges. Just simple monthly pricing that scales with your business.
          </p>
        </div>

        {/* Value Props */}
        <div className="bg-gradient-to-br from-[var(--veristiq-snow)] to-white rounded-2xl border border-gray-200 p-8 md:p-10 mb-10">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Unlimited competitions</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Cryptographically verified draws</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Public audit pages</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Compliance reporting</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Full API access</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Chain integrity verification</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white font-semibold px-8 shadow-md">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/operator/register">
              <Button size="lg" variant="outline" className="border-gray-300 text-[var(--veristiq-slate)] hover:bg-gray-50 font-semibold px-8">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
