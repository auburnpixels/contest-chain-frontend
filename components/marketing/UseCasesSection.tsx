import { Trophy, Layers, Heart, Users, Scale } from "lucide-react";

export function UseCasesSection() {
  const cases = [
    {
      title: "Competition Operators",
      desc: "Increase trust and reduce complaints with fully verified draws.",
      icon: Trophy,
    },
    {
      title: "Prize Platforms",
      desc: "Integrate CAFAAS to offer fairness as part of your core product.",
      icon: Layers,
    },
    {
      title: "Charities & Non-profits",
      desc: "Show supporters transparent and accountable results.",
      icon: Heart,
    },
    {
      title: "Influencers & Brands",
      desc: "Run transparent giveaways with verifiable draw pages.",
      icon: Users,
    },
    {
      title: "Regulated Operators",
      desc: "Use CAFAAS as independent technical oversight.",
      icon: Scale,
    },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center text-zinc-900 dark:text-white mb-16">
          Who CAFAAS is built for.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-black p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow duration-300">
              <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center mb-6 text-brand-cobalt">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

