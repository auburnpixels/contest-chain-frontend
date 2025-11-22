import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, XCircle, MessageSquareWarning, FileSpreadsheet, EyeOff, Gavel } from "lucide-react";

type PainPoint = {
  title: string;
  description: string;
  icon?: React.ElementType;
};

type OperatorPainPointsProps = {
  items?: string[]; // Backward compatibility if needed, but prefer structured objects
};

// Hardcoded backup if props aren't sufficient, but we will use what's passed or default
const defaultPainPoints = [
  {
    title: "“Rigged” Accusations",
    description: "The moment someone loses, they claim the draw was fixed. Without proof, it's your word against theirs.",
    icon: MessageSquareWarning,
  },
  {
    title: "Manual Errors",
    description: "Spreadsheets and screen recordings are prone to mistakes. One wrong click can ruin your reputation.",
    icon: FileSpreadsheet,
  },
  {
    title: "Disputes & Chargebacks",
    description: "Angry players request refunds when they can't verify the outcome themselves.",
    icon: Gavel,
  },
  {
    title: "Zero Transparency",
    description: "Livestreams aren't proof. They can be pre-recorded or manipulated.",
    icon: EyeOff,
  },
  {
    title: "Compliance Nightmares",
    description: "Regulators want to see the chain of custody. Screenshots don't cut it anymore.",
    icon: AlertCircle,
  },
  {
    title: "Amateur Appearance",
    description: "Manual draws look like a hobby. Serious operators use serious infrastructure.",
    icon: XCircle,
  }
];

export const OperatorPainPoints = ({ items }: OperatorPainPointsProps) => {
  // If simple strings are passed (legacy), map them. Otherwise use defaults.
  const content = items ? items.map((item, i) => ({
    title: "Operational Risk",
    description: item,
    icon: AlertCircle
  })) : defaultPainPoints;

  return (
    <section className="bg-brand-navy py-24 relative overflow-hidden max-w-7xl mx-auto">
       {/* Background Elements */}
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
       
      <div className="mx-auto max-w-content px-6 relative z-10">
        <SectionHeading
          eyebrow="The Problem"
          title="Why operators struggle to scale."
          description="Trust is the currency of competitions. Without it, you're just another website."
          align="center"
        />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {content.map((item, idx) => (
            <Card
              key={idx}
              className="border-white/5 bg-brand-slate/50 backdrop-blur-sm p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-brand-slate hover:shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)] group"
            >
              <CardHeader className="p-0 mb-4">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  {item.icon ? <item.icon className="w-6 h-6 text-red-500" /> : <AlertCircle className="w-6 h-6 text-red-500" />}
                </div>
                <CardTitle className="text-xl font-display text-white">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
