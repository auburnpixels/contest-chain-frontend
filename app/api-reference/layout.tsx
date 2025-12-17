import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Reference — Veristiq",
  description: "Complete API documentation for Veristiq's prize draw verification platform. Endpoints, parameters, request examples, and response schemas.",
  openGraph: {
    title: "API Reference — Veristiq",
    description: "Full API documentation for prize draw verification. Endpoints, parameters, and examples.",
  },
};

export default function ApiReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

