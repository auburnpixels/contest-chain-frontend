import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Shield, TrendingUp, Clock, CheckCircle2, Lock, Users, Building2, Scale, Target, Mail } from "lucide-react";
import Link from "next/link";

export default function ComplianceScoreExplainedPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600/30 font-sans">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative py-24 container mx-auto px-4 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 tracking-tight">
          How the CAFAAS Compliance Score Works
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-4">
          Fair, Transparent, and Verifiable Prize Draw Standards
        </p>
        <p className="text-base text-zinc-500 max-w-3xl mx-auto leading-relaxed">
          The CAFAAS Compliance Score provides a clear, independent measure of how closely a prize draw follows industry best practices and the principles of fairness outlined in the UK's Voluntary Code of Good Practice for Prize Draw Operators.
        </p>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <p className="text-lg text-zinc-400 leading-relaxed mb-6">
            CAFAAS evaluates every competition using data submitted by operators and records the entire draw process in a tamper-evident audit chain.
          </p>
          <p className="text-lg text-zinc-400 leading-relaxed">
            The Compliance Score turns that information into an easy-to-understand rating that helps protect consumers and promote trust.
          </p>
        </div>
      </section>

      {/* What It Represents Section */}
      <section className="py-24 container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            What the Compliance Score Represents
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Your score reflects how well a competition adhered to industry standards
          </p>
        </div>

        <Card className="border-white/10 bg-black/40 p-8">
          <div className="flex items-start gap-6 mb-6">
            <Shield className="h-12 w-12 text-brand-cobalt flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Seven Core Principles</h3>
              <p className="text-zinc-400 mb-6">
                It measures whether a draw was run properly, fairly, and transparently.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 text-zinc-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Fair entry handling</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Clear timing and conditions</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Proper draw preparation</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Robust randomisation</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Accurate and complete event logging</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Prompt complaint resolution</span>
            </div>
            <div className="flex items-center gap-3 md:col-span-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Transparent publication of results</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Two Stages Section */}
      <section className="py-24 bg-zinc-900/30">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Two Stages: Before and After the Draw
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Every Compliance Score evolves in two phases
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pre-Draw Score */}
            <Card className="border-white/10 bg-black/40 p-8">
              <Clock className="h-10 w-10 text-zinc-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">1. Pre-Draw Score</h3>
              <p className="text-zinc-400 mb-6">
                Before the draw runs, CAFAAS evaluates whether the competition is properly set up and ready.
              </p>
              
              <div className="mb-6">
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-zinc-800 text-zinc-300">
                  58 (pre-draw)
                </Badge>
              </div>

              <div className="space-y-3 text-sm text-zinc-400">
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600">•</span>
                  <span>All entries recorded</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600">•</span>
                  <span>No duplicates or conflicts</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600">•</span>
                  <span>Entry limits respected</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600">•</span>
                  <span>Closing time correctly logged</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600">•</span>
                  <span>No outstanding complaints</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600">•</span>
                  <span>No suspicious entry behaviour</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600">•</span>
                  <span>Required draw metadata present</span>
                </div>
              </div>

              <p className="text-xs text-zinc-500 mt-6 italic">
                Meaning: the competition is mostly ready, but the draw hasn't happened yet.
              </p>
            </Card>

            {/* Final Score */}
            <Card className="border-white/10 bg-black/40 p-8">
              <CheckCircle2 className="h-10 w-10 text-green-500 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">2. Final Score (After Draw)</h3>
              <p className="text-zinc-400 mb-6">
                Once the draw has been completed, CAFAAS verifies the entire process was executed correctly.
              </p>
              
              <div className="mb-6">
                <Badge className="text-lg px-4 py-2 bg-green-500/20 text-green-400 border-green-500/30">
                  91 (final)
                </Badge>
              </div>

              <div className="space-y-3 text-sm text-zinc-400">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Seed generation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Seed hashing</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Randomisation execution</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Draw lifecycle events</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Winner validation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Publication of audited results</span>
                </div>
              </div>

              <p className="text-xs text-zinc-500 mt-6 italic">
                Meaning: the competition followed all required steps and passed integrity checks.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Score Ranges Section */}
      <section className="py-24 container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            What Does a Good Score Look Like?
          </h2>
          <p className="text-xl text-zinc-400">
            These ranges help you and participants interpret what the score means
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Excellent */}
          <Card className="border-green-500/30 bg-green-950/20 p-8 text-center">
            <div className="mb-6">
              <Badge className="text-2xl px-6 py-3 bg-green-500/20 text-green-400 border-green-500/30">
                85–100
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-green-400 mb-4">Excellent</h3>
            <p className="text-zinc-300">
              The draw followed best practice with full transparency.
            </p>
          </Card>

          {/* Satisfactory */}
          <Card className="border-yellow-500/30 bg-yellow-950/20 p-8 text-center">
            <div className="mb-6">
              <Badge className="text-2xl px-6 py-3 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                65–84
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Satisfactory</h3>
            <p className="text-zinc-300">
              The draw was fair, but some areas could improve.
            </p>
          </Card>

          {/* Needs Attention */}
          <Card className="border-red-500/30 bg-red-950/20 p-8 text-center">
            <div className="mb-6">
              <Badge className="text-2xl px-6 py-3 bg-red-500/20 text-red-400 border-red-500/30">
                Below 65
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-4">Needs Attention</h3>
            <p className="text-zinc-300">
              Indicates one or more issues in the entry process, timing, or draw integrity.
            </p>
          </Card>
        </div>
      </section>

      {/* Public vs Private Section */}
      <section className="py-24 bg-zinc-900/30">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Public */}
            <Card className="border-white/10 bg-black/40 p-8">
              <TrendingUp className="h-10 w-10 text-brand-cobalt mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Is the Compliance Score Public?
              </h3>
              <p className="text-zinc-400 mb-6">
                For transparency, the competition's final score may appear on its public audit page.
              </p>
              <div className="space-y-3 text-sm text-zinc-400">
                <p>The score helps participants confirm that:</p>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>The draw was properly prepared</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>The random process was conducted correctly</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>The result was published with a complete audit trail</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500 mt-6">
                Operator-wide scores and internal scoring logic remain private.
              </p>
            </Card>

            {/* Private */}
            <Card className="border-white/10 bg-black/40 p-8">
              <Lock className="h-10 w-10 text-zinc-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                What CAFAAS Does Not Disclose
              </h3>
              <p className="text-zinc-400 mb-6">
                To prevent misuse or gaming, CAFAAS does not publicly reveal:
              </p>
              <div className="space-y-3 text-sm text-zinc-400">
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600">•</span>
                  <span>Exact scoring formulas</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600">•</span>
                  <span>Detailed deductions</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600">•</span>
                  <span>Internal event thresholds</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600">•</span>
                  <span>Full operator performance profiles</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500 mt-6">
                These details are available privately to each operator inside their CAFAAS dashboard.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-24 container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Why the Compliance Score Matters
          </h2>
          <p className="text-xl text-zinc-400">
            A clear, independent score helps everyone in the ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Consumers */}
          <Card className="border-white/10 bg-black/40 p-6">
            <Users className="h-8 w-8 text-brand-cobalt mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">Consumers</h3>
            <p className="text-sm text-zinc-400">
              Understand that a draw was genuinely fair
            </p>
          </Card>

          {/* Operators */}
          <Card className="border-white/10 bg-black/40 p-6">
            <Building2 className="h-8 w-8 text-brand-cobalt mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">Operators</h3>
            <p className="text-sm text-zinc-400">
              Demonstrate transparency and build trust
            </p>
          </Card>

          {/* Regulators */}
          <Card className="border-white/10 bg-black/40 p-6">
            <Scale className="h-8 w-8 text-brand-cobalt mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">Regulators</h3>
            <p className="text-sm text-zinc-400">
              Monitor good practice across the sector
            </p>
          </Card>

          {/* Industry */}
          <Card className="border-white/10 bg-black/40 p-6">
            <Target className="h-8 w-8 text-brand-cobalt mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">Industry</h3>
            <p className="text-sm text-zinc-400">
              Move toward higher accountability
            </p>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-zinc-300 font-medium">
            CAFAAS exists to provide clarity, consistency, and confidence in every draw.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-zinc-900/30">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <Mail className="h-12 w-12 text-brand-cobalt mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 text-white">
            Have questions?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            We're here to help you understand the compliance scoring system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/faq" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
            >
              See our FAQ
            </Link>
            <Link 
              href="mailto:support@cafaas.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-cobalt hover:bg-brand-cobalt/90 text-white rounded-lg transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

