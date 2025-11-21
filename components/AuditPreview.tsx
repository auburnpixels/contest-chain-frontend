import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Share2 } from "lucide-react";

type AuditPreviewProps = {
  screenshots: Array<{
    title: string;
    description: string;
    image: string;
  }>;
};

export const AuditPreview = ({ screenshots }: AuditPreviewProps) => (
  <section className="py-24">
    <div className="mx-auto max-w-content px-6 space-y-12">
      <SectionHeading
        eyebrow="UI Preview"
        title="Operator dashboard & audit viewer."
        description="Show non-technical teams exactly what transparency looks like."
      />
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <Card className="border-white/5 bg-gradient-to-br from-white/10 to-transparent p-6">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="border-accentMint/50 bg-white/5 text-accentMint"
              >
                Operator dashboard
              </Badge>
              <p className="text-sm text-muted-foreground">
                Entries, winners, alerts, and instant audit packages.
              </p>
            </div>
            <div className="mt-6">
              <Image
                src="/globe.svg"
                alt="Dashboard preview"
                width={1200}
                height={600}
                className="w-full rounded-2xl border border-white/5 bg-black/40 object-cover"
              />
            </div>
          </div>
        </Card>
        <div className="space-y-6">
          {screenshots.map((shot) => (
            <div
              key={shot.title}
              className="rounded-3xl border border-white/5 bg-black/40 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                    {shot.title}
                  </p>
                  <p className="text-lg text-white">{shot.description}</p>
                </div>
                <Badge className="bg-white/10 text-white border-white/10">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-accentMint" />
                  Verified
                </Badge>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                <span className="font-mono text-xs">
                  https://caas.app/audit/{shot.image}
                </span>
                <Share2 className="h-4 w-4 text-accentMint" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

