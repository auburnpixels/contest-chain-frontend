import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

export default function TestimonialsPage() {
  const testimonials = [
    {
      quote: "Using CAAS stopped 90% of fairness complaints overnight.",
      author: "James M.",
      role: "Director, Prize Draw UK",
      rating: 5
    },
    {
      quote: "My customers trust the draw results now. Conversion increased by 12%.",
      author: "Sarah L.",
      role: "Marketing Lead, WinBig Competitions",
      rating: 5
    },
    {
      quote: "The automated audit trails save us hours of admin work every week. It's a no-brainer.",
      author: "David K.",
      role: "Operations Manager, RaffleKings",
      rating: 5
    },
    {
      quote: "Finally, a way to prove our draws are fair without needing a degree in cryptography.",
      author: "Emma R.",
      role: "Founder, Charity Draws Online",
      rating: 5
    },
    {
      quote: "Integration was seamless, and the support team was incredibly helpful.",
      author: "Michael T.",
      role: "CTO, Global Giveaways",
      rating: 4
    },
    {
      quote: "Our players love the public verification page. It builds immediate trust.",
      author: "Lisa P.",
      role: "Owner, Tech Prizes",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <SiteHeader />

      <section className="relative py-24 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
          Trusted by Operators
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          See what competition owners are saying about CAAS.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <CardTitle className="text-lg font-medium text-zinc-200 leading-relaxed">
                  "{testimonial.quote}"
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800">
                   <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold">
                      {testimonial.author.charAt(0)}
                   </div>
                   <div>
                      <div className="font-bold text-white">{testimonial.author}</div>
                      <div className="text-sm text-zinc-500">{testimonial.role}</div>
                   </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}




