import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ExternalLink } from "lucide-react";

export function ExampleAuditSection() {
  return (
    <section id="example-audit" className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              See CAFAAS in action.
            </h2>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0">
              Explore a real audit page and see exactly what players see after a draw. Transparent. Detailed. Tamper-evident.
            </p>
            <Button size="lg" className="bg-brand-cobalt text-white hover:bg-brand-cobalt/90" asChild>
              <Link href="#">
                View Example Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Browser Preview Mockup */}
          <div className="flex-1 w-full max-w-2xl relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-cobalt to-purple-600 rounded-xl blur opacity-20 dark:opacity-40 animate-pulse"></div>
            <div className="relative bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              
              {/* Browser Toolbar */}
              <div className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center space-x-4">
                 <div className="flex space-x-1.5">
                     <div className="w-3 h-3 rounded-full bg-red-400/80" />
                     <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                     <div className="w-3 h-3 rounded-full bg-green-400/80" />
                 </div>
                 <div className="flex-1 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-3 py-1.5 text-xs text-center text-green-600 dark:text-green-400 font-medium flex items-center justify-center">
                    <span className="mr-2">🔒</span> veristiq.com/audit/8f92a...
                 </div>
              </div>

              {/* Fake Content Area */}
              <div className="p-8 md:p-12 space-y-6">
                 {/* Success Header */}
                 <div className="flex items-center space-x-4 pb-6 border-b border-zinc-100 dark:border-zinc-900">
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Draw Verified Fair</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Completed on Nov 26, 2025 at 14:30 UTC</p>
                    </div>
                 </div>

                 {/* Hash Details */}
                 <div className="space-y-4">
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded p-4 border border-zinc-100 dark:border-zinc-800">
                        <span className="text-xs uppercase font-semibold text-zinc-400 dark:text-zinc-500 block mb-1">Final Random Seed</span>
                        <code className="text-xs md:text-sm font-mono text-zinc-700 dark:text-zinc-300 break-all">
                            9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0...
                        </code>
                    </div>
                     <div className="bg-zinc-50 dark:bg-zinc-900 rounded p-4 border border-zinc-100 dark:border-zinc-800">
                        <span className="text-xs uppercase font-semibold text-zinc-400 dark:text-zinc-500 block mb-1">Winning Entry Index</span>
                        <div className="flex justify-between items-center">
                             <code className="text-sm font-mono text-brand-cobalt font-bold">#4291</code>
                             <div className="flex items-center text-xs text-zinc-400">
                                <ExternalLink className="h-3 w-3 mr-1"/> View Entry
                             </div>
                        </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

