import { AlertTriangle, XCircle, TrendingDown, Gavel, FileWarning, ShieldAlert } from "lucide-react";

export function ProblemSection() {
  const problems = [
    { icon: AlertTriangle, text: "Rising complaints across the industry" },
    { icon: TrendingDown, text: "Loss of player trust" },
    { icon: XCircle, text: "No standardised draw verification" },
    { icon: FileWarning, text: "No shared audit history" },
    { icon: ShieldAlert, text: "Operators forced to 'prove fairness' manually" },
    { icon: Gavel, text: "Regulatory pressure increasing" },
  ];

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900/30 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center rounded-md bg-brand-cobalt/10 dark:bg-red-950/30 px-3 py-1 text-sm font-medium text-brand-cobalt dark:text-brand-cobalt ring-1 ring-inset ring-brand-cobalt/10 dark:ring-red-500/20">
              The Industry Problem
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Fairness is the biggest risk in online competitions.
            </h2>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Players question draws. Operators deal with accusations. Regulators receive complaints. 
              <br/><br/>
              And without independent verification, every competition is vulnerable to distrust — even when everything is done properly. 
              Whether it’s a missing audit trail, unclear draw process, or lack of transparency, one unfair-looking moment can damage your reputation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {problems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-brand-cobalt flex-shrink-0" />
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-xl font-semibold text-zinc-900 dark:text-white">
                CAFAAS eliminates this risk — <span className="text-brand-cobalt">permanently.</span>
              </p>
            </div>
          </div>

          {/* Visual/Image Side - Abstract Representation of Risk */}
          <div className="flex-1 w-full max-w-md md:max-w-full">
            <div className="relative aspect-square md:aspect-[4/3] bg-white dark:bg-black rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col justify-center items-center text-center space-y-6">
               <div className="absolute inset-0 bg-gradient-to-tr from-red-50/50 to-transparent dark:from-red-900/10 dark:to-transparent rounded-2xl pointer-events-none" />
               
               <AlertTriangle className="h-24 w-24 text-brand-cobalt/20" />
               <h3 className="text-2xl font-bold text-zinc-900 dark:text-white z-10">
                 "Is this draw rigged?"
               </h3>
               <p className="text-zinc-500 dark:text-zinc-400 z-10 max-w-xs">
                 The single question that kills conversion rates and destroys operator longevity.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

