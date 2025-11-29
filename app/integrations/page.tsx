import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const integrations = [
  {
    stack: "WooCommerce",
    steps: [
      "Install Cafaas plugin from marketplace.",
      "Map order statuses to entry creation calls.",
      "Embed trust badge on product and thank-you pages.",
    ],
  },
  {
    stack: "Laravel",
    steps: [
      "composer require caas/laravel-sdk",
      "Publish config + set API keys in .env",
      "Use queued jobs to batch entries and trigger draws.",
    ],
  },
  {
    stack: "Node / Next.js",
    steps: [
      "npm install @caas/sdk",
      "Use server actions to send entries.",
      "Listen for webhooks via /api/webhooks/caas.",
    ],
  },
  {
    stack: "Pure PHP",
    steps: [
      "composer require caas/php",
      "Instantiate client with scoped key.",
      "Call ->draws()->execute() when ready.",
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Integration gallery"
          title="Drop-in fairness for every stack."
          description="Use official SDKs, webhook recipes, and example repos to go live fast."
          primaryCta={{ label: "View GitHub examples", href: "/docs" }}
        />

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="Playbooks"
              title="Choose your stack."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {integrations.map((integration) => (
                <Card key={integration.stack} className="border-white/10 bg-black/40 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-accentMint">
                    {integration.stack}
                  </p>
                  <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {integration.steps.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="text-accentMint">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

