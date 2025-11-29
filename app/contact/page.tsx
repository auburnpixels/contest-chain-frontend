import { PageHero } from "@/components/PageHero";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Contact"
          title="Talk to the Cafaas team."
          description="Sales, support, regulator inquiries—one inbox with aligned response times."
        />

        <section className="py-24">
          <div className="mx-auto max-w-5xl px-6 grid gap-12 lg:grid-cols-2">
            <div className="space-y-10">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-accentMint">
                  Email
                </p>
                <p className="mt-2 text-white">hello@caas-platform.com</p>
                <p className="text-sm text-muted-foreground">Sales & partnerships</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-accentMint">
                  Support
                </p>
                <p className="mt-2 text-white">support@caas-platform.com</p>
                <p className="text-sm text-muted-foreground">API + operator assistance</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-accentMint">
                  Office
                </p>
                <p className="mt-2 text-white">
                  14 Bonhill Street<br />
                  London EC2A 4BX
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
              <form className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">How can we help?</Label>
                  <Textarea id="message" placeholder="Tell us about your competitions..." />
                </div>
                <Button className="w-full rounded-full bg-accentMint text-brand-navy hover:bg-accentMint/90">
                  Send message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
