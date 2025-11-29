# CAFAAS Marketing Design Guidelines

## Philosophy
**"Minimal, Technical, Trusted."**

The design should not be "flashy" or overly decorative. It should feel like a serious infrastructure product. It relies on high contrast (Black/White), clean typography, and sparse use of the Brand Cobalt color to guide attention.

## Color System

### Base Colors (Light Mode)
- **Background**: `bg-white` (#FFFFFF) or `bg-zinc-50` (#FAFAFA) for subtle separation.
- **Text (Primary)**: `text-zinc-900` (#18181B)
- **Text (Secondary)**: `text-zinc-600` (#52525B)
- **Borders**: `border-zinc-200` (#E4E4E7)

### Base Colors (Dark Mode)
- **Background**: `dark:bg-black` (#000000) or `dark:bg-zinc-950` (#09090B) for subtle separation.
- **Text (Primary)**: `dark:text-white` (#FFFFFF)
- **Text (Secondary)**: `dark:text-zinc-400` (#A1A1AA)
- **Borders**: `dark:border-zinc-800` (#27272A)

### Highlights / Accents
- **Brand Cobalt**: `#8E6BFF` (Tailwind config: `brand.cobalt`) - **NOTE**: Now a Purple/Pink highlight.
- **Usage**:
    - Primary Buttons (`bg-brand-cobalt text-white`)
    - Text Highlights within headlines (`text-brand-cobalt`)
    - Active states / Selected items
    - Icons (when emphasis is needed)
    - Do NOT use for backgrounds unless it is a small badge or accent element (`bg-brand-cobalt/10`).

### Status Colors
- **Success/Trust**: Green/Emerald (`text-green-600` / `dark:text-green-400`) - Use for "Verified", "Audit Passed".
- **Risk/Problem**: Red (`text-red-600` / `dark:text-red-400`) - Use for "The Problem" section or errors.
- **Warning/Caution**: Amber (`text-amber-600` / `dark:text-amber-400`) - Use for "Partially Supported" or caveats.

## Typography
- **Font**: Inter (Default Sans)
- **Headlines**: Bold or Extrabold. Tight tracking (`tracking-tight`).
- **Body**: Regular. Relaxed line height (`leading-relaxed`) for readability.

## Component Patterns

### Sections
- Alternate between White and Zinc-50 (Light) / Black and Zinc-900 (Dark) backgrounds to define sections.
- Always use `container px-4 md:px-6 mx-auto` for consistent max-width and padding.
- Vertical spacing: `py-24` is standard for major sections.

### Cards (Features, Pricing, etc.)
- **Light**: `bg-white`, `border border-zinc-200`, `shadow-sm` (optional).
- **Dark**: `bg-black` or `bg-zinc-900`, `border border-zinc-800`.
- **Hover**: Subtle border color change to `brand-cobalt/50`.

### Buttons
- **Primary**: `bg-brand-cobalt text-white hover:bg-brand-cobalt/90`
- **Secondary (Outline)**: `border border-zinc-200 text-zinc-900 hover:bg-zinc-100` (Light) / `border border-zinc-800 text-white hover:bg-zinc-800` (Dark).

## Page Types
- **Standard Marketing**: Features, Pricing, Home. Use high-impact headers and grids.
- **Compliance/Regulatory**: Use structured layouts, clear pillars, and status indicators (Green/Amber/Red) to denote support levels. See `/dcms-code` for reference.

## Code Standards
- All marketing components live in `components/marketing/`.
- Ensure dark mode compatibility (`dark:` modifiers) for ALL color classes.
- Use `lucide-react` for icons.
