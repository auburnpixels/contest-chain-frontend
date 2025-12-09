import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";

export function ComplianceSection() {
  return (
    <section className="py-24 bg-[var(--veristiq-slate)] text-white">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8">
            <FileCheck className="w-8 h-8 text-[var(--veristiq-teal)]" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Aligned with the DCMS Voluntary Code
        </h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 text-lg text-gray-300">
            <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--veristiq-teal)]"></span> Independent verification
            </span>
             <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--veristiq-teal)]"></span> Auditability
            </span>
             <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--veristiq-teal)]"></span> Transparency
            </span>
             <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--veristiq-teal)]"></span> Accountability
            </span>
             <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--veristiq-teal)]"></span> Complaints logging
            </span>
        </div>

        <Link href="/compliance">
            <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 h-auto text-lg">
                View Full Compliance Mapping
            </Button>
        </Link>
      </div>
    </section>
  );
}

