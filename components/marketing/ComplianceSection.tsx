import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";

export function ComplianceSection() {
  return (
    <section className="py-24 bg-[var(--veristiq-slate)] text-white">
      <div className="container mx-auto px-6 max-w-7xl text-center flex flex-col items-center gap-12">
          <div className="flex flex-col gap-4">
              <div>
                  <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full">
                      <FileCheck className="w-8 h-8 text-[var(--veristiq-primary-blue)]" />
                  </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold">
                  Designed to support the DCMS Voluntary Code
              </h2>

              <p className="max-w-3xl text-gray-300">
                  Veristiq provides technical verification and audit evidence; operators remain responsible for meeting their regulatory obligations.
              </p>
          </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-gray-300">
            <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--veristiq-primary-blue)]"></span> Independent draw verification
            </span>
             <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--veristiq-primary-blue)]"></span> Tamper-evident audit records
            </span>
             <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--veristiq-primary-blue)]"></span> Publicly accessible draw evidence
            </span>
             <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--veristiq-primary-blue)]"></span> Time-stamped event logging
            </span>
        </div>

        <Link href="/compliance">
            <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 h-auto text-base">
                View Code Mapping
            </Button>
        </Link>
      </div>
    </section>
  );
}

