import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />
      <main className="pt-20">
        
        {/* Hero */}
        <section className="py-20 bg-[var(--veristiq-snow)] border-b border-gray-100 text-center">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--veristiq-slate)]">Get in touch</h1>
                <p className="text-xl text-[var(--veristiq-slate-light)] mb-8">
                    Ready to build trust? Our team is here to help you integrate.
                </p>
            </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-12">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                    <p className="text-[var(--veristiq-slate-light)] text-lg mb-8">
                        Whether you're a small operator or an enterprise platform, we can help you verify your draws.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[var(--veristiq-primary-blue)] flex-shrink-0">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">Email</h3>
                            <p className="text-[var(--veristiq-slate-light)]">hello@veristiq.io</p>
                            <p className="text-sm text-gray-400 mt-1">Response time: &lt; 24 hours</p>
                        </div>
                    </div>

                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[var(--veristiq-primary-blue)] flex-shrink-0">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">Office</h3>
                            <p className="text-[var(--veristiq-slate-light)]">
                                14 Bonhill Street<br/>
                                London EC2A 4BX<br/>
                                United Kingdom
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
              <form className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" className="h-12 bg-gray-50 border-gray-200" />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Competition Brand Ltd." className="h-12 bg-gray-50 border-gray-200" />
                </div>

                 <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" type="email" placeholder="you@company.com" className="h-12 bg-gray-50 border-gray-200" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="size">Operator Size (Approx. Monthly Draws)</Label>
                    <Select>
                        <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select volume..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="starter">1 - 10 draws / mo</SelectItem>
                            <SelectItem value="growth">11 - 50 draws / mo</SelectItem>
                            <SelectItem value="scale">50+ draws / mo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us about your platform..." className="min-h-[120px] bg-gray-50 border-gray-200" />
                </div>

                <Button className="w-full bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white h-12 text-lg">
                  Send Message
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
