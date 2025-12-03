import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/marketing/PageHero";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";
import { Check, X, ShieldCheck, AlertTriangle, FileText, Scale, Lock, Eye } from "lucide-react";

export default function DcmsCodePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      <main>
        <PageHero 
          title="Compliance"
          headline="Cafaas & The DCMS Voluntary Code of Good Practice"
          subheadline="How Cafaas supports transparency, fairness and accountability for prize-draw operators."
        />

        {/* Overview */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <div className="flex items-start gap-6">
                    <div className="hidden md:flex h-16 w-16 bg-brand-cobalt/10 rounded-2xl items-center justify-center shrink-0">
                        <FileText className="h-8 w-8 text-brand-cobalt" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Overview</h2>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                            The UK Department for Culture, Media & Sport (DCMS) has introduced the Voluntary Code of Good Practice for Prize Draw Operators — a new standard designed to improve fairness, transparency and player protections across the prize-draw industry.
                        </p>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                            While the Code is voluntary, operators are expected to implement its measures by 20 May 2026, and DCMS has signalled that statutory regulation may follow if industry compliance is poor.
                        </p>
                        <div className="p-6 bg-brand-cobalt/5 border border-brand-cobalt/20 rounded-xl">
                            <p className="font-medium text-brand-cobalt">
                                Cafaas helps operators adopt many of the Code’s expectations simply, consistently and transparently — without requiring major platform changes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* How CAFAAS Supports the Code */}
        <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">How Cafaas Supports the Code</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        The Code is built around three pillars: Player Protections, Transparency, and Accountability & Governance. 
                        Cafaas does not replace operator responsibilities, but it directly supports many of the Code’s core expectations.
                    </p>
                </div>

                {/* Pillar 1 */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-900">
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">1</div>
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Fairness & Transparency <span className="text-sm font-normal ml-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10 px-3 py-1 rounded-full">Strongly Supported</span></h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-6">
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <h4 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2"><Lock className="h-4 w-4 text-brand-cobalt"/> Tamper-Evident Draw Audits</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Each draw is logged as a cryptographically linked event, preventing hidden modification.</p>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <h4 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2"><Eye className="h-4 w-4 text-brand-cobalt"/> Public Audit Pages</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Every draw automatically gets a shareable audit page showing winner selection, seed hash, and integrity check.</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <h4 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2"><FileText className="h-4 w-4 text-brand-cobalt"/> Clear Record of Entries</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Logs all entries (paid & free) with eligibility status, helping operators show equal treatment.</p>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <h4 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2"><Scale className="h-4 w-4 text-brand-cobalt"/> Multiple Prize Draw Transparency</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Each prize has its own audited event chain, aligned with requirements for clear prize mechanics.</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 italic pl-4 border-l-4 border-brand-cobalt">
                        <strong>Result:</strong> Operators can point to an independent, tamper-evident record of how the draw was conducted — exactly what the Code calls for.
                    </p>
                </div>

                {/* Pillar 2 */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-900">
                        <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">2</div>
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Player Protections <span className="text-sm font-normal ml-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 px-3 py-1 rounded-full">Partially Supported</span></h3>
                    </div>

                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        Cafaas supports evidence, audit, and logging — not enforcement. Operators remain responsible for age checks, spend caps, and self-exclusion.
                    </p>
                    
                    <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                        <li className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-brand-cobalt shrink-0 mt-0.5" />
                            <div>
                                <strong className="block text-zinc-900 dark:text-white text-sm">Entry Limit Logging</strong>
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">Log when a user hits an entry limit.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-brand-cobalt shrink-0 mt-0.5" />
                            <div>
                                <strong className="block text-zinc-900 dark:text-white text-sm">Responsible Play Events</strong>
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">Log limits or interventions triggered.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-brand-cobalt shrink-0 mt-0.5" />
                            <div>
                                <strong className="block text-zinc-900 dark:text-white text-sm">Metadata Support</strong>
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">Store payment method/price metadata for evidence.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-brand-cobalt shrink-0 mt-0.5" />
                            <div>
                                <strong className="block text-zinc-900 dark:text-white text-sm">Complaint Logging</strong>
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">Full trail of complaints submitted and resolved.</span>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Pillar 3 */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-900">
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">3</div>
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Accountability & Governance <span className="text-sm font-normal ml-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10 px-3 py-1 rounded-full">Strongly Supported</span></h3>
                    </div>
                    
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800">
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Comprehensive Audit Chain</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Logs internal/external events: draw requests, prize changes, admin overrides, and more.</p>
                                <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Operator Governance Trails</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Shows who triggered draws, updated prizes, and closed competitions.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Third-Party Oversight</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Transparent logs for influencer/affiliate activity showing entries sent and draws triggered.</p>
                                <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Integrity Verification</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Tools to verify the chain and detect tampering.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Areas Not Covered */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                        Areas Cafaas Does Not Cover
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-lg flex items-start gap-3">
                            <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <strong className="block text-zinc-900 dark:text-white text-sm">Enforce age verification</strong>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">Handled by your KYC flow</span>
                            </div>
                        </div>
                        <div className="p-4 border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-lg flex items-start gap-3">
                            <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <strong className="block text-zinc-900 dark:text-white text-sm">Enforce payment methods</strong>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">e.g. blocking credit cards</span>
                            </div>
                        </div>
                        <div className="p-4 border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-lg flex items-start gap-3">
                            <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <strong className="block text-zinc-900 dark:text-white text-sm">Conduct player harm analysis</strong>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">But we can log operator actions</span>
                            </div>
                        </div>
                        <div className="p-4 border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-lg flex items-start gap-3">
                            <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <strong className="block text-zinc-900 dark:text-white text-sm">Provide legal approval</strong>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">We enable transparency, not certification</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Table */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">Summary — How Cafaas Helps You Meet the Code</h3>
                    <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold">
                                <tr>
                                    <th className="p-4">DCMS Code Area</th>
                                    <th className="p-4">Covered by Cafaas?</th>
                                    <th className="p-4 hidden sm:table-cell">Notes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {[
                                    { area: "Transparent, fair draws", status: "Fully supported", notes: "Hash chain + public audits", color: "text-green-600" },
                                    { area: "Record-keeping & audit logs", status: "Fully supported", notes: "Immutable event trail", color: "text-green-600" },
                                    { area: "Complaints handling transparency", status: "Supported", notes: "Complaint submitted/resolved events", color: "text-green-600" },
                                    { area: "Fair treatment of free entries", status: "Supported", notes: "Free entries logged & included", color: "text-green-600" },
                                    { area: "Prize information & mechanics", status: "Supported", notes: "Public audit structure", color: "text-green-600" },
                                    { area: "Player protections (limits)", status: "Partially supported", notes: "Operator implements, Cafaas logs", color: "text-amber-600" },
                                    { area: "Age verification", status: "Operator responsibility", notes: "Cafaas can log outcomes", color: "text-zinc-500" },
                                    { area: "Credit-card rules", status: "Operator responsibility", notes: "Cafaas can hold metadata", color: "text-zinc-500" },
                                    { area: "Marketing standards", status: "Operator responsibility", notes: "Out of scope", color: "text-zinc-500" },
                                ].map((row, idx) => (
                                    <tr key={idx} className="bg-white dark:bg-black">
                                        <td className="p-4 font-medium text-zinc-900 dark:text-white">{row.area}</td>
                                        <td className={`p-4 font-medium ${row.color}`}>{row.status}</td>
                                        <td className="p-4 text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">{row.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>

        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
















