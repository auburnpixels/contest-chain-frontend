import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="py-28 bg-[var(--veristiq-snow)]">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--veristiq-slate)] mb-6">
          Start verifying your draws today
        </h2>
        <p className="text-xl text-[var(--veristiq-slate-light)] mb-10 max-w-2xl mx-auto">
          Build trust with players. Demonstrate fairness. Stay ahead of regulation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/operator/register">
            <Button className="bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white px-8 py-6 text-lg h-auto w-full sm:w-auto">
              Get Started
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="border-[var(--veristiq-slate)] text-[var(--veristiq-slate)] hover:bg-white px-8 py-6 text-lg h-auto w-full sm:w-auto">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
