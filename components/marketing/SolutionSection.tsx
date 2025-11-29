import { Link2, Globe, Server } from "lucide-react";

export function SolutionSection() {
  return (
    <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            CAFAAS gives you <span className="text-brand-cobalt">verifiable fairness</span> for every draw.
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            CAFAAS is the independent fairness infrastructure for prize competitions. 
            Every draw, entry, and outcome is logged, hashed, and secured inside a tamper-evident event chain that anyone can verify.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 hover:border-brand-cobalt/50 dark:hover:border-brand-cobalt/50 transition-all duration-300">
            <div className="h-12 w-12 bg-brand-cobalt/10 rounded-xl flex items-center justify-center mb-6 text-brand-cobalt">
              <Link2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Independent Draw Audits</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every prize draw creates a signed, hash-linked audit record. No edits. No deletion. No way to influence results.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 hover:border-brand-cobalt/50 dark:hover:border-brand-cobalt/50 transition-all duration-300">
            <div className="h-12 w-12 bg-brand-cobalt/10 rounded-xl flex items-center justify-center mb-6 text-brand-cobalt">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Public Audit Pages</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Show players exactly how winners were chosen. Shareable links. Transparent data. Instant trust.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 hover:border-brand-cobalt/50 dark:hover:border-brand-cobalt/50 transition-all duration-300">
            <div className="h-12 w-12 bg-brand-cobalt/10 rounded-xl flex items-center justify-center mb-6 text-brand-cobalt">
              <Server className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">API-Driven Fairness</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A clean JSON API for competition creation, entries, draws, and publishing — all backed by a cryptographically secured audit chain.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

