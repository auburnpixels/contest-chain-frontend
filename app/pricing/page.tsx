import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, HelpCircle, Shield, Zap, Server } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">
        
        {/* Hero */}
        <section className="py-24 bg-[var(--veristiq-slate)] text-white relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
             <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
             
             <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                    <Shield className="w-8 h-8 text-[var(--veristiq-teal)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Transparent pricing for transparent draws</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Start complying with the Voluntary Code today. No hidden fees, no per-ticket taxes.
                </p>
             </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-24 bg-white -mt-20 relative z-20">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Core Plan */}
                    <Card className="border-gray-200 shadow-xl flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative bg-white">
                        <CardHeader className="p-8 pb-0">
                            <h3 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-2">Core</h3>
                            <p className="text-[var(--veristiq-slate-light)] mb-6">For growing operators and independent sites.</p>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold text-[var(--veristiq-slate)]">£39</span>
                                <span className="text-gray-500">/month</span>
                            </div>
                            <Link href="/operator/register" className="w-full">
                                <Button className="w-full bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white h-12 text-base shadow-md">
                                    Start Free Trial
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="p-8 flex-1">
                            <p className="font-medium text-sm text-[var(--veristiq-slate)] mb-4 uppercase tracking-wider">Includes:</p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-600">Unlimited competitions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-600">Up to <strong>10,000</strong> entries / month</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-600">Public audit pages</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-600">Basic compliance reporting</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-600">Email support</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Enterprise Plan */}
                    <Card className="border-[var(--veristiq-primary-blue)] shadow-2xl flex flex-col hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 relative bg-white ring-4 ring-blue-50/50">
                        <div className="absolute top-0 right-0 bg-[var(--veristiq-primary-blue)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                        <CardHeader className="p-8 pb-0">
                            <h3 className="text-2xl font-bold text-[var(--veristiq-slate)] mb-2 flex items-center gap-2">
                                Enterprise <Zap className="w-5 h-5 text-[var(--veristiq-gold)] fill-current" />
                            </h3>
                            <p className="text-[var(--veristiq-slate-light)] mb-6">For high-volume platforms and agencies.</p>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold text-[var(--veristiq-slate)]">£349</span>
                                <span className="text-gray-500">/month</span>
                            </div>
                            <Link href="/contact" className="w-full">
                                <Button className="w-full bg-[var(--veristiq-slate)] hover:bg-[var(--veristiq-slate-light)] text-white h-12 text-base shadow-md">
                                    Contact Sales
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="p-8 flex-1">
                            <p className="font-medium text-sm text-[var(--veristiq-slate)] mb-4 uppercase tracking-wider">Everything in Core, plus:</p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-[var(--veristiq-primary-blue)] shrink-0 mt-0.5" />
                                    <span className="text-gray-600 font-medium">Unlimited entries</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-[var(--veristiq-primary-blue)] shrink-0 mt-0.5" />
                                    <span className="text-gray-600">Advanced API access & Webhooks</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-[var(--veristiq-primary-blue)] shrink-0 mt-0.5" />
                                    <span className="text-gray-600">Custom audit page branding</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-[var(--veristiq-primary-blue)] shrink-0 mt-0.5" />
                                    <span className="text-gray-600">Dedicated account manager</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-[var(--veristiq-primary-blue)] shrink-0 mt-0.5" />
                                    <span className="text-gray-600">SLA & Priority Support</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-24 bg-[var(--veristiq-snow)]">
            <div className="container mx-auto px-6 max-w-5xl">
                <h2 className="text-3xl font-bold text-center mb-16 text-[var(--veristiq-slate)]">Compare Plans</h2>
                
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-6 text-sm font-bold text-[var(--veristiq-slate)] uppercase tracking-wider w-1/3">Feature</th>
                                <th className="p-6 text-sm font-bold text-[var(--veristiq-slate)] uppercase tracking-wider w-1/3 text-center">Core</th>
                                <th className="p-6 text-sm font-bold text-[var(--veristiq-primary-blue)] uppercase tracking-wider w-1/3 text-center bg-blue-50/30">Enterprise</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {/* Usage */}
                            <tr>
                                <td className="p-6 font-medium text-[var(--veristiq-slate)] bg-gray-50/50 col-span-3 text-xs uppercase tracking-wider" colSpan={3}>Usage</td>
                            </tr>
                            <tr>
                                <td className="p-6 text-gray-600">Monthly Entries</td>
                                <td className="p-6 text-center font-medium">10,000</td>
                                <td className="p-6 text-center font-bold text-[var(--veristiq-primary-blue)] bg-blue-50/10">Unlimited</td>
                            </tr>
                            <tr>
                                <td className="p-6 text-gray-600">Competitions</td>
                                <td className="p-6 text-center font-medium">Unlimited</td>
                                <td className="p-6 text-center font-bold text-[var(--veristiq-primary-blue)] bg-blue-50/10">Unlimited</td>
                            </tr>

                            {/* Features */}
                            <tr>
                                <td className="p-6 font-medium text-[var(--veristiq-slate)] bg-gray-50/50 col-span-3 text-xs uppercase tracking-wider" colSpan={3}>Features</td>
                            </tr>
                            <tr>
                                <td className="p-6 text-gray-600">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger className="flex items-center gap-2 cursor-help text-left">
                                                Public Audit Pages <HelpCircle className="w-4 h-4 text-gray-400" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="w-64">Publicly accessible verification pages for your players to check draw results.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </td>
                                <td className="p-6 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                                <td className="p-6 text-center bg-blue-50/10"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                            </tr>
                            <tr>
                                <td className="p-6 text-gray-600">CSPRNG Draw Engine</td>
                                <td className="p-6 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                                <td className="p-6 text-center bg-blue-50/10"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                            </tr>
                            <tr>
                                <td className="p-6 text-gray-600">Custom Branding</td>
                                <td className="p-6 text-center"><span className="text-gray-300">-</span></td>
                                <td className="p-6 text-center bg-blue-50/10"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                            </tr>
                            <tr>
                                <td className="p-6 text-gray-600">API Access</td>
                                <td className="p-6 text-center">Standard</td>
                                <td className="p-6 text-center bg-blue-50/10">Advanced + Webhooks</td>
                            </tr>

                            {/* Compliance */}
                            <tr>
                                <td className="p-6 font-medium text-[var(--veristiq-slate)] bg-gray-50/50 col-span-3 text-xs uppercase tracking-wider" colSpan={3}>Compliance</td>
                            </tr>
                            <tr>
                                <td className="p-6 text-gray-600">Draw History Retention</td>
                                <td className="p-6 text-center">1 Year</td>
                                <td className="p-6 text-center bg-blue-50/10">7 Years</td>
                            </tr>
                            <tr>
                                <td className="p-6 text-gray-600">Automated Compliance PDF</td>
                                <td className="p-6 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                                <td className="p-6 text-center bg-blue-50/10"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-16 text-[var(--veristiq-slate)]">Frequently Asked Questions</h2>
                <div className="grid gap-8">
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                        <h3 className="font-bold text-lg mb-3">Do I need a credit card to sign up?</h3>
                        <p className="text-gray-600 leading-relaxed">No. You can create an account and explore the dashboard without adding payment details. You'll only need to subscribe when you're ready to publish your first live competition.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                        <h3 className="font-bold text-lg mb-3">What happens if I exceed my entry limit?</h3>
                        <p className="text-gray-600 leading-relaxed">We won't stop your draws. If you consistently exceed the Core plan limits, we'll reach out to discuss upgrading to the Enterprise plan to ensure your infrastructure scales with you.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                        <h3 className="font-bold text-lg mb-3">Can I cancel anytime?</h3>
                        <p className="text-gray-600 leading-relaxed">Yes. There are no long-term contracts for the Core plan. You can cancel your subscription at any time from your dashboard.</p>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
