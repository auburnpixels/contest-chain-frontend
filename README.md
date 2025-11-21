# CaaS Platform - Next.js Frontend

Modern dashboard for the CaaS (Compliance-as-a-Service) platform built with Next.js 16, TypeScript, and shadcn/ui.

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
next.js/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public pages (marketing, docs)
│   ├── operator/          # Operator dashboard
│   ├── regulator/         # Regulator dashboard
│   └── audit/[uuid]/      # Public audit viewer
├── components/
│   ├── ui/                # shadcn/ui components
│   └── ...                # Custom components
├── lib/
│   ├── api/               # API client utilities
│   ├── config.ts          # Configuration
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Features

### Public Site
- **Homepage**: Platform overview and features
- **Documentation**: API reference and integration guide
- **Audit Viewer**: Public audit verification pages

### Operator Dashboard
- **Dashboard**: Compliance summary and metrics
- **Competitions**: List and manage competitions
- **API Keys**: Generate and manage API keys
- **Webhooks**: Configure webhook subscriptions

### Regulator Dashboard
- **Overview**: Platform-wide compliance metrics
- **Operators**: View all operators and their compliance
- **Integrity**: Chain verification tools
- **Competitions**: Deep inspection of audits and events

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **API Client**: Custom fetch-based client with JWT support

## API Configuration

Configure the Laravel backend URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

## Authentication

The dashboard uses JWT tokens for authentication:

1. Login via `/operator/login` or `/regulator/login`
2. Token stored in localStorage
3. Automatically attached to API requests
4. Refresh token on expiry

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Laravel backend API URL

## Building for Production

```bash
npm run build
npm run start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [CaaS Platform API](../laravel/README-CAAS.md)
