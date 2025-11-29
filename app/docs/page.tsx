import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const quickstart = [
  { label: "1. Create competition", snippet: "POST /v1/competitions" },
  { label: "2. Stream entries", snippet: "POST /v1/entries" },
  { label: "3. Trigger draw", snippet: "POST /v1/draws/:id/execute" },
  { label: "4. Publish audit", snippet: "GET /v1/audits/:id" },
];

const endpoints = [
  { name: "Competitions", description: "Create, update, and schedule draws.", path: "/v1/competitions" },
  { name: "Entries", description: "Secure entry ingestion with hashing.", path: "/v1/entries" },
  { name: "Draws", description: "Execute fairness engine and fetch winners.", path: "/v1/draws" },
  { name: "Audits", description: "Retrieve audit chain artefacts.", path: "/v1/audits" },
  { name: "Webhooks", description: "Manage event subscriptions.", path: "/v1/webhooks" },
];

const webhooks = [
  { event: "draw.published", detail: "A draw completed and winners are ready to announce." },
  { event: "audit.available", detail: "Audit pack is generated and hosted publicly." },
  { event: "entry.flagged", detail: "Cafaas detected a duplicate ID, void ticket, or other anomaly." },
];

const sdks = [
  { name: "Node / TypeScript", install: "npm install @caas/sdk" },
  { name: "Laravel", install: "composer require caas/laravel-sdk" },
  { name: "PHP", install: "composer require caas/php" },
  { name: "WooCommerce", install: "Official plugin via marketplace" },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Developer docs"
          title="Integrate fairness with modern tooling."
          description="Typed SDKs, REST endpoints, and webhook events that make compliance-grade draws programmable."
          primaryCta={{ label: "Generate API key", href: "/operator/register" }}
          secondaryCta={{ label: "Open API reference", href: "/api-reference" }}
        />

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 space-y-8">
            <SectionHeading
              eyebrow="Quickstart"
              title="Launch your first compliant draw in four calls."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {quickstart.map((item) => (
                <Card key={item.label} className="border-white/10 bg-black/40 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-accentMint">
                    {item.label}
                  </p>
                  <p className="mt-4 font-mono text-accentMint">{item.snippet}</p>
                </Card>
              ))}
            </div>
            <Card className="border-white/10 bg-black/40 p-6">
              <p className="text-sm text-muted-foreground">
                Use sandbox keys (`caas_sbx_`) for unlimited testing. Promote to production when ready.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-black/60 py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading eyebrow="Authentication" title="Bearer tokens with scoped access." />
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
              <pre className="overflow-x-auto text-sm text-accentMint">
{`curl -X POST https://api.caas.dev/v1/competitions \\
  -H "Authorization: Bearer caas_live_xxx" \\
  -H "Idempotency-Key: req_123" \\
  -d '{ "name": "Win a Defender", "draw_at": "2025-12-31T20:00:00Z" }'`}
              </pre>
              <p className="mt-4 text-sm text-muted-foreground">
                Keys can be limited to read-only, entry ingestion, or draw execution. Rotate instantly from the operator dashboard.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="Core endpoints"
              title="REST resources that mirror your competition lifecycle."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {endpoints.map((endpoint) => (
                <Card key={endpoint.name} className="border-white/10 bg-black/40 p-6">
                  <CardHeader className="p-0">
                    <CardTitle className="text-white">{endpoint.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-4">
                    <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                    <p className="mt-3 font-mono text-xs text-accentMint">{endpoint.path}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black/50 py-24">
          <div className="mx-auto max-w-content px-6 space-y-10">
            <SectionHeading
              eyebrow="Webhooks"
              title="Stream draw activity into your systems."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {webhooks.map((hook) => (
                <Card key={hook.event} className="border-white/10 bg-black/40 p-6">
                  <p className="font-mono text-accentMint">{hook.event}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{hook.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-content px-6 grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="SDKs"
                title="Use our batteries-included libraries."
                description="Consistent pagination, retries, observability hooks, and TS types out of the box."
              />
              <div className="mt-8 space-y-4">
                {sdks.map((sdk) => (
                  <Card key={sdk.name} className="border-white/10 bg-black/40 p-4">
                    <p className="text-white">{sdk.name}</p>
                    <p className="font-mono text-xs text-accentMint">{sdk.install}</p>
                  </Card>
                ))}
              </div>
            </div>
            <Card className="border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6">
              <SectionHeading
                eyebrow="Rate limits"
                title="Optimized for bursts."
              />
              <p className="mt-4 text-sm text-muted-foreground">
                Default operator tenants receive 500 requests / minute per key. Contact us for dedicated throughput or region-specific hosts.
              </p>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
