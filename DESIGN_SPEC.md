# CAAS Design Specification & Brand Guidelines

## 1. Brand Direction

### Core Concept
**"The Stripe of Competition Fairness"**
High-trust, regulator-grade, modern, and transparent. The aesthetic should be clean, precise, and technical but accessible.

### Colour Palette

#### Primary (Trust & Depth)
- **Brand Navy**: `#0A0E17` (Deepest background)
- **Brand Slate**: `#161B28` (Card background)
- **Brand Blue**: `#2563EB` (Primary Action - similar to Vercel/Stripe blue)

#### Secondary (Structure)
- **Stroke/Border**: `#2E3646` (Subtle borders)
- **Text Main**: `#FFFFFF` (High contrast)
- **Text Muted**: `#94A3B8` (Secondary text)

#### Accents (Conversion & Highlights)
- **Mint (Success/Trust)**: `#10B981` (Verified, Audit Passed)
- **Electric Purple (Innovation/Tech)**: `#8B5CF6` (Gradients, Premium features)
- **Amber (Warning/Attention)**: `#F59E0B` (Alerts)

### Typography
**Headings**: `Space Grotesk` - Technical, modern, with character.
**Body**: `Inter` - Clean, highly legible, standard for SaaS.

### Tone of Voice
- **Confident**: "We prove fairness." (Not "We try to help you be fair")
- **Direct**: "Integrate in minutes."
- **Professional**: Avoid slang. Use "Competition Operators", "Audit Trails", "Cryptographic Proof".

---

## 2. Sitemap

### Main Pages
1.  **Homepage**: The primary conversion engine.
2.  **Pricing**: Transparent, volume-based model.
3.  **How It Works**: Technical deep dive into the audit chain.
4.  **Features**: Full capability list (API, Dashboard, Widgets).
5.  **Public Audit Viewer (Overview)**: Explains what the public sees.
6.  **API Docs**: (Link to external or nested docs).

### Secondary Pages
-   **Trust & Security**: Compliance details, encryption, RNG specs.
-   **Case Studies**: "How EliteComps reduced disputes by 100%".
-   **About**: Company mission.
-   **Contact**: Sales and support.

---

## 3. Homepage Structure & Content

1.  **Hero Section**
    *   *Headline*: "The infrastructure for provably fair competitions."
    *   *Sub*: "Turn any raffle, giveaway, or prize draw into a cryptographic audit trail. Build trust, eliminate disputes, and automate compliance."
    *   *CTA*: "Start building" / "View Live Audit"

2.  **Operator Pain Points** (Grid)
    *   "Rigged" accusations.
    *   Manual spreadsheet errors.
    *   Lack of verifiable proof.

3.  **Core Value Proposition** (Tabs/Interactive)
    *   **Automated Audits**: Real-time public ledger.
    *   **Tamper-Proof**: SHA-256 hashing + Merkle Trees.
    *   **Instant Legitimacy**: Trust badges for your site.

4.  **How CAAS Works** (Step-by-step)
    1.  **API/Dashboard Input**: Define prizes & rules.
    2.  **Entry Hashing**: Every ticket gets a hash.
    3.  **RNG Draw**: Verifiable random selection.
    4.  **Audit Publish**: Permanent public record.

5.  **Features Grid**
    *   Multi-prize support.
    *   Developer SDKs.
    *   Compliance exports.
    *   Health monitoring.

6.  **Trust & Social Proof**
    *   "Used by leading operators."
    *   Logos / Metrics ("1M+ Entries Audited").

7.  **Dashboard Preview**
    *   Visual of the Operator Dashboard (Dark mode UI).

8.  **Compliance & Integrity**
    *   "We don't just say it's fair. We prove it."
    *   List of automated checks (Late entry blocking, etc.).

9.  **Pricing Teaser**
    *   "Pay per draw. Scale as you grow."

10. **Final CTA**
    *   "Ready to upgrade your reputation?"

---

## 4. Tailwind Styling Guide

### Spacing Scale
Use standard Tailwind spacing but standardized for "Airy" layouts:
-   **Sections**: `py-24` or `py-32`
-   **Card Padding**: `p-6` or `p-8`
-   **Gap**: `gap-8` for grids.

### Shadows (Glows)
Use colored shadows for modern SaaS feel:
-   `shadow-glow-blue`: `0 0 40px -10px rgba(37, 99, 235, 0.3)`
-   `shadow-glow-mint`: `0 0 40px -10px rgba(16, 185, 129, 0.3)`

### Border Radius
-   **Buttons**: `rounded-md` (Standard) or `rounded-full` (Pill).
-   **Cards**: `rounded-xl` or `rounded-2xl`.

### Gradients
-   **Surface**: `bg-gradient-to-b from-slate-900 to-slate-950`
-   **Text**: `bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400`

---

## 5. Component Architecture (Next.js)

### File Structure
```
/components
  /marketing
    Hero.tsx
    OperatorPainPoints.tsx
    CoreValueProposition.tsx
    HowItWorks.tsx
    FeaturesGrid.tsx
    TrustSection.tsx
    UiDashboardPreview.tsx
    ComplianceIntegrity.tsx
    PricingTeaser.tsx
    FinalCTA.tsx
  /ui
    Button.tsx
    Card.tsx
    Badge.tsx
    Container.tsx
    Section.tsx
  site-header.tsx
  site-footer.tsx
```

### Microcopy Examples
-   **Buttons**: "Start Integration", "Read Documentation", "See Pricing".
-   **Badges**: "Audit Verified", "Live", "Beta".

