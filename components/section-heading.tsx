import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "text-center mx-auto max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs tracking-[0.3em] uppercase text-accentMint/80">
          {eyebrow}
        </p>
      )}
      <div className="text-3xl md:text-4xl font-semibold font-display text-white">
        {title}
      </div>
      {description && (
        <p className="text-base text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

