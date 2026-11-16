# AutoBazaar — Used Car Marketplace

A modern, full-stack used car marketplace built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5.8 (strict mode) |
| **Styling** | Tailwind CSS v4, CVA, tailwind-merge |
| **Database** | PostgreSQL 17 via Drizzle ORM |
| **Search** | Meilisearch |
| **Forms** | React Hook Form + Zod validation |
| **UI Primitives** | Radix UI |
| **Data Fetching** | TanStack React Query |
| **Job Queue** | pg-boss |
| **i18n** | next-intl |
| **Monitoring** | Sentry, PostHog |
| **Icons** | Lucide React |
| **Images** | sharp (optimisation) |
| **Testing** | Vitest (unit), Playwright (e2e) |

## Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **pnpm** (recommended) or npm
- **Docker** (for local PostgreSQL & Meilisearch)

### 1. Clone and Install

```bash
git clone <repository-url>
cd used-car-marketplace
pnpm install
```

### 2. Start Infrastructure

```bash
docker compose up -d
```

This spins up:
- **PostgreSQL 17** on `localhost:5432`
- **Meilisearch** on `localhost:7700`

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your credentials. The defaults work with the Docker setup.

### 4. Set Up the Database

```bash
pnpm db:generate   # generate migration files
pnpm db:migrate    # apply migrations
```

### 5. Run the Dev Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint check |
| `pnpm format` | Format with Prettier |
| `pnpm format:check` | Check formatting |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:watch` | Unit tests in watch mode |
| `pnpm test:e2e` | Run E2E tests (Playwright) |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:migrate` | Apply Drizzle migrations |
| `pnpm db:push` | Push schema directly (dev) |
| `pnpm db:studio` | Open Drizzle Studio |

## Project Structure

```
src/
├── app/                 # Next.js App Router pages & layouts
│   ├── globals.css      # Tailwind directives & design tokens
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/          # Shared UI components
│   ├── ui/              # Base UI primitives (Button, Input, etc.)
│   └── ...              # Feature components
├── db/                  # Drizzle schema, migrations, client
├── lib/                 # Utilities, helpers, constants
├── hooks/               # Custom React hooks
├── services/            # Business logic & external service clients
├── types/               # Shared TypeScript types
└── i18n/                # Internationalisation config & messages
```

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| Ink | `#101828` | Primary text |
| Muted | `#475467` | Secondary text |
| Canvas | `#F6F5F2` | Page background |
| Surface | `#FFFFFF` | Card / panel backgrounds |
| Primary | `#0B6E6E` | Buttons, links, focus rings |
| Accent | `#C2410C` | CTAs, highlights |
| Success | `#15803D` | Positive feedback |
| Warning | `#B45309` | Caution states |
| Danger | `#B42318` | Errors, destructive actions |

## License

Private — All rights reserved.
