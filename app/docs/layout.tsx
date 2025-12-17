import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Documentation — Veristiq",
  description: "Integrate prize draw verification in minutes. REST API documentation for competitions, entries, draws, and public audit pages.",
  openGraph: {
    title: "Developer Documentation — Veristiq",
    description: "Integrate prize draw verification in minutes. REST API for competitions, entries, and auditable draws.",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

