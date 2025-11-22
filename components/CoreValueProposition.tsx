import { SectionHeading } from "@/components/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Lock, Zap, CheckCircle2 } from "lucide-react";
import Image from "next/image";

type CoreValuePropositionProps = {
  highlights?: Array<{ title: string; description: string }>;
};

export const CoreValueProposition = ({ highlights }: CoreValuePropositionProps) => {
  return (
    <section className="py-32 bg-brand-navy relative max-w-7xl mx-auto">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading
          eyebrow="Why CAAS?"
          title="The standard for fair play."
          description="We replaced the trust-me bro model with cryptographic proof."
          align="center"
          className="mb-16"
        />

        <Tabs defaultValue="audits" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-brand-slate/50 border border-white/5 p-1 rounded-full">
              <TabsTrigger 
                value="audits" 
                className="rounded-full px-6 py-2 data-[state=active]:bg-brand-blue data-[state=active]:text-white transition-all"
              >
                Automated Audits
              </TabsTrigger>
              <TabsTrigger 
                value="tamper" 
                className="rounded-full px-6 py-2 data-[state=active]:bg-brand-blue data-[state=active]:text-white transition-all"
              >
                Tamper-Proof Chain
              </TabsTrigger>
              <TabsTrigger 
                value="trust" 
                className="rounded-full px-6 py-2 data-[state=active]:bg-brand-blue data-[state=active]:text-white transition-all"
              >
                Instant Legitimacy
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Automated Audits Content */}
          <TabsContent value="audits" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid lg:grid-cols-2 gap-12 items-center rounded-3xl border border-white/10 bg-brand-slate/30 p-8 md:p-12">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-display font-semibold text-white">Real-time public ledgers for every draw.</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Stop taking screenshots. CAAS automatically generates a hosted audit page for every competition you run. Entrants can verify their own ticket inclusion and the randomness of the result.
                </p>
                <ul className="space-y-3">
                  {["Merkle tree verification", "Entry list hashing", "Winner proof-of-inclusion"].map((item) => (
                    <li key={item} className="flex items-center text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-accent-mint mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[400px] rounded-2xl bg-brand-navy border border-white/10 overflow-hidden shadow-2xl">
                {/* Placeholder for Audit UI visualization */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-mono text-sm">
                    [Audit Trail UI Visualization]
                </div>
                <div className="absolute top-4 left-4 right-4 space-y-2">
                    <div className="h-2 w-1/3 bg-white/10 rounded-full"></div>
                    <div className="h-2 w-1/4 bg-white/10 rounded-full"></div>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-brand-navy to-transparent"></div>
              </div>
            </div>
          </TabsContent>

          {/* Tamper-Proof Content */}
          <TabsContent value="tamper" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid lg:grid-cols-2 gap-12 items-center rounded-3xl border border-white/10 bg-brand-slate/30 p-8 md:p-12">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-display font-semibold text-white">Math that cannot be bribed or edited.</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We use SHA-256 hashing and chained block architecture. Once an entry is accepted, it cannot be deleted or modified without breaking the chain and alerting everyone.
                </p>
                 <ul className="space-y-3">
                  {["Immutable entry logs", "CSPRNG seed commitment", "Chain-of-custody timeline"].map((item) => (
                    <li key={item} className="flex items-center text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-accent-purple mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[400px] rounded-2xl bg-brand-navy border border-white/10 overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-mono text-sm">
                    [Hash Chain Visualization]
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Trust Content */}
          <TabsContent value="trust" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid lg:grid-cols-2 gap-12 items-center rounded-3xl border border-white/10 bg-brand-slate/30 p-8 md:p-12">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-accent-mint/20 flex items-center justify-center text-accent-mint">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-display font-semibold text-white">Badge up and boost conversion.</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Display the "Verified by CAAS" badge on your checkout and product pages. Operators see an average 15-20% increase in ticket sales when players know the game is fair.
                </p>
                 <ul className="space-y-3">
                  {["Embeddable trust widgets", "Click-to-verify seal", "Regulatory compliance evidence"].map((item) => (
                    <li key={item} className="flex items-center text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-accent-mint mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
               <div className="relative h-[400px] rounded-2xl bg-brand-navy border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
                 <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent-mint/20 rounded-full text-accent-mint">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Fairness Verified</p>
                            <p className="text-white font-display text-xl">CAAS Protocol</p>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
