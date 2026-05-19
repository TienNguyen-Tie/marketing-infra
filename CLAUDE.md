# Ecomobi MKT Infrastructure

Internal marketing intelligence tool for Ecomobi, Southeast Asia's social commerce operation. Built solo by the marketing lead in HCMC. Used by the marketing team (~10-20 people) to manage client portfolios, brand intelligence, research, and creator commerce operations.

This file is the source of truth for how to work on this codebase. Read it at the start of every session.

---

## Stack

- **Framework**: Next.js 15 (App Router) with TypeScript strict mode
- **Styling**: Plain CSS modules. NO Tailwind, NO styled-components, NO CSS-in-JS.
- **Font**: DM Sans throughout. Never override with another font.
- **Database**: Neon Postgres (managed) accessed via Prisma ORM
- **Auth**: NextAuth/Auth.js v5 with Prisma adapter + bcryptjs for passwords
- **Encryption**: AES-256-GCM for API keys (lib/encryption.ts)
- **File storage**: Vercel Blob (for PDFs in Research & Insights)
- **AI**: Anthropic API direct (not via SDK — Edge runtime issues). Model: claude-sonnet-4-6.
- **Hosting**: Vercel. Auto-deploys on push to main.

---

## Workflow

The marketing lead vibe-codes in VS Code with Claude Code. They follow:

**THINK → ALIGN → SEE → BUILD**

- THINK: brainstorm in chat
- ALIGN: assistant summarizes, user confirms direction
- SEE: visual mockup if helpful
- BUILD: single, comprehensive Claude Code prompt

Bridge between sessions via `LAST_BUILD.md` (what was just built, manual steps, env changes) and `DECISIONS.md` (architectural choices and rationale).

User strongly prefers SURGICAL improvements over full revamps. Make minimal targeted changes when possible. If you find yourself wanting to rewrite a working file, propose the change as a question first.

---

## Architecture Principles

### Three-layer hierarchy

```
Portfolio (Parent × Category)  →  Brand  →  Project
```

- **Portfolio** = parent company × category split (e.g., "L'Oréal VN — Consumer Products"). Lives at `/portfolio/{accountSlug}`.
- **Brand** = a single brand within a portfolio (e.g., "L'Oréal Paris"). Lives at `/portfolio/{accountSlug}/brand/{brandSlug}`. The ONLY level where products live.
- **Project** = a specific engagement (e.g., "Tet 2024 Livestream"). Lives at `/portfolio/{accountSlug}/{projectSlug}`.

For smaller clients without category split, the portfolio is marked `isGeneralCategory: true` and uses just the parent slug.

### Slugs

Every entity (portfolio, brand, project, product, source) has a `slug` field. Auto-generated from name if not explicitly set: lowercase, hyphenated, special chars stripped. URL-friendly. Stable.

### Three-layer SSOT

Data flows through three layers:

1. **Data layer**: `data/portfolio/accounts.ts` (TypeScript source of truth for portfolio/brand data) + Prisma DB (dynamic data: research, insights, suggestions)
2. **Helper layer**: `lib/*/helpers.ts` and `data/portfolio/helpers.ts`. All data access goes through helpers — never query Prisma or import data files directly in components.
3. **Render layer**: Pages and components. Read-only consumers of the helper layer.

### Knowledge Base structure

The main app section at `/knowledge-base/` contains:

- Client Portfolio (built — portfolios → brands → projects)
- Research & Insights (built — sources, insights, AI companion)
- Brand Foundation (in progress)
- Design Guidelines (partial)
- Services P1–P7 (stubs)
- ICPs (stubs)
- Decision-maker Personas (stubs)

---

## Visual & UI Foundations

The non-negotiable rules. Detailed implementation (full color palette, ghost CSS classes, status pill maps, section rhythm specs) lives in `.claude/skills/ecomobi-ui-patterns/SKILL.md` — that skill loads automatically when working on UI.

### Foundations (always apply)

- **Font**: DM Sans. Never override with another font.
- **Brand color**: `#F43C34` for primary actions and accents. Don't introduce new accent colors.
- **Borders**: 0.5px solid `#E6E6E6` on cards. Never 1px unless emphasizing a divider.
- **Radius**: 8px on cards, 4px on small chips, 12px on modals/drawers.
- **Spacing**: 12 / 16 / 24 rhythm. Avoid arbitrary values like 13px or 21px.
- **No external CSS frameworks**: plain CSS modules only. No Tailwind, no styled-components, no CSS-in-JS.

### The transparency pattern (mandatory architectural rule)

Every detail page section MUST always render its structure, regardless of whether data is populated. This is not styling — it's how the tool teaches users what data lives where.

- **Field sections** (label/value, paragraphs): always render every field label. Value shows real data OR italic muted "Not yet captured."
- **List sections** (variable lists like products, decision-makers, insights): real items if present, OR 2–3 ghost cards (dashed border, ~55% opacity, italic muted text) showing the same structure.

Never replace a section with a single muted "this section will populate" card. The structure itself is the value.

Specific ghost CSS classes, color tokens, and section rhythm specs are in the `ecomobi-ui-patterns` skill.

---

## Code Patterns

### File organization

```
app/                          # Next.js App Router pages
  {feature}/
    page.tsx                  # Server component by default
    [param]/page.tsx          # Dynamic routes
  api/
    {feature}/route.ts        # API endpoints

components/                   # Reusable React components
  {feature}/{Name}.tsx        # Group by feature

lib/                          # Shared logic
  {feature}/
    types.ts                  # TypeScript interfaces
    constants.ts              # Display labels, enums, fixed values
    helpers.ts                # Data access functions
    {special}.ts              # Feature-specific utilities

data/                         # Static TypeScript data sources
  {feature}/
    types.ts
    accounts.ts (etc.)        # The data itself
    helpers.ts                # Lookup helpers

prisma/
  schema.prisma               # Database schema
```

### Server vs client components

Default to **server components**. They fetch data, render markup, and are simpler.

Use `'use client'` ONLY when the component needs:

- React hooks (useState, useEffect, etc.)
- Browser-only APIs (localStorage, navigator)
- Event handlers (onClick that triggers state changes)
- Third-party libraries that need the browser

If a server component needs to embed interactive bits, split: parent server component handles fetch and structure, child client component handles interaction.

### TypeScript

- Strict mode on. No `any` ever. Use `unknown` if you genuinely don't know the type.
- Define interfaces in `lib/{feature}/types.ts` and export from there.
- Prefer interface over type for object shapes.
- Use Prisma's generated types directly when working with DB rows.

### State management

Plain React `useState` and `useReducer`. No Zustand, no Redux, no Jotai, no Context for global state.

If something feels like it needs cross-component state, it probably wants to be lifted to a parent or moved to URL state via `useSearchParams`. URL state is preferred when it could matter for sharing/bookmarking.

### Naming

- Components: PascalCase, descriptive (`InsightDetailModal`, not `Modal`)
- Helpers: camelCase, verb-first (`getInsightsForBrand`, not `brandInsights`)
- Constants: SCREAMING_SNAKE_CASE for true constants (`MAX_PDF_SIZE_BYTES`), camelCase for label maps (`SOURCE_CATEGORY_LABELS`)
- Files: match the component/function name exactly

---

## Database Conventions

- Prisma is the only ORM. No raw SQL except in migration files.
- Every model has `createdAt DateTime @default(now())` and `updatedAt DateTime @updatedAt`
- `String[]` fields use Postgres native arrays, NOT JSON, except for nested object structures (those use `Json?`)
- Foreign key columns indexed: `@@index([fooId])`
- GIN indexes on `String[]` columns that get queried via `hasSome`
- Cascading deletes (`onDelete: Cascade`) only when child data is genuinely owned by parent and should die with it
- IDs: cuid by default (`@default(cuid())`)
- Never store binary files in Postgres — use Vercel Blob

When adding schema:

1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name descriptive_name`
3. Verify migration file looks safe before committing
4. Use the `migration-safety` subagent BEFORE running migrate on any destructive-looking change

---

## API Conventions

- Routes at `app/api/{feature}/route.ts` using App Router conventions
- Every protected route checks auth: `const session = await auth(); if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });`
- Status codes: 401 unauthorized, 404 not found, 400 invalid input, 500 server error
- Errors always return JSON: `{ error: "human-readable message" }` — never raw exceptions
- Validate input minimally (presence + types). Heavy validation lives client-side.
- For long-running endpoints (AI calls, PDF processing), set `export const maxDuration = 60` (or higher on Pro)

---

## Authentication

- NextAuth/Auth.js v5 with Prisma adapter
- Split into two files: `lib/auth.config.ts` (edge-safe, no Prisma, used by `proxy.ts` middleware) and `lib/auth.ts` (full, with Prisma, used by everything else)
- Server-side auth check: `import { auth } from '@/lib/auth'; const session = await auth();`
- NO SessionProvider on the client. NextAuth v5 App Router uses server-side auth() directly.
- `ConditionalLayout.tsx` handles the no-sidebar-on-/login case via `usePathname`
- API keys (Anthropic) encrypted at rest via `lib/encryption.ts` (AES-256-GCM). Retrieved via `lib/get-api-key.ts` — never duplicate this flow.

Required env vars:

- `DATABASE_URL` — Neon Postgres connection
- `NEXTAUTH_SECRET` — JWT signing
- `NEXTAUTH_URL` — must match deployed URL exactly
- `ENCRYPTION_KEY` — 32-byte hex for API key encryption
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob access (for Research & Insights PDFs)

---

## AI Integration

- Direct fetch calls to `https://api.anthropic.com/v1/messages` (no SDK — Edge runtime conflicts)
- Model: `claude-sonnet-4-6`
- API key retrieved via `getAnthropicKey(userId)` from `lib/get-api-key.ts` — handles encryption transparently
- System prompts live in `lib/{feature}/companion-prompt.ts` or `extraction-prompt.ts` — exported as constants
- Responses logged to DB for review (`Suggestion` model for Vision Companion, `ResearchQuery` model for Research Companion)
- All AI sidebars follow the same drawer pattern: right-side slide-in, 480px desktop / 100vw mobile, ESC closes, backdrop click closes
- Floating trigger button bottom-right (24px from edges) for opening companions

---

## Never Do

- Don't store binary files in Postgres — use Vercel Blob
- Don't introduce Tailwind, styled-components, or any CSS-in-JS
- Don't add new state libraries (React's built-ins are enough)
- Don't add `any` types — use `unknown` or define the real shape
- Don't duplicate helpers — check `lib/` first
- Don't introduce new auth flows — NextAuth v5 is the system
- Don't use SessionProvider with NextAuth v5 App Router
- Don't import Prisma in `auth.config.ts` or `proxy.ts` (edge runtime breaks)
- Don't render a section-level "this section will populate" empty card — always show structure
- Don't introduce new fonts beyond DM Sans
- Don't introduce new colors beyond the defined palette
- Don't make destructive Prisma schema changes without explicit confirmation
- Don't rewrite working files when a small change suffices

---

## After Every Build

Run this checklist before pushing to main:

1. `npx tsc --noEmit` — must be clean
2. `npm run build` — must succeed
3. Update `LAST_BUILD.md` with what changed and any manual steps required
4. Update `DECISIONS.md` if any architectural choice was made
5. Run the `architect-reviewer` subagent on changed files
6. If schema changed, run the `migration-safety` subagent before migrating
7. Run the `/deploy-check` slash command

---

## Project Structure — Key Files

### Auth & infrastructure

- `lib/auth.ts` — full auth config with Prisma
- `lib/auth.config.ts` — edge-safe auth config
- `lib/prisma.ts` — Prisma client singleton
- `lib/encryption.ts` — AES-256-GCM API key encryption
- `lib/get-api-key.ts` — encrypted API key retrieval
- `proxy.ts` — middleware (renamed from middleware.ts for Next 16)

### Portfolio system

- `data/portfolio/types.ts` — Portfolio, Brand, Product, Project interfaces
- `data/portfolio/accounts.ts` — portfolio data source of truth
- `data/portfolio/helpers.ts` — `getAccountBySlug`, `getBrandBySlug`, `getProjectsByBrand`, etc.

### Research & Insights

- `lib/research/types.ts`, `constants.ts`, `helpers.ts`
- `lib/research/extraction-prompt.ts` — AI extraction system prompt
- `lib/research/companion-prompt.ts` — AI Companion system prompt
- `lib/research/insight-filters.ts` — filter types and URL state helpers
- `lib/research/compress-pdf.ts` — client-side PDF compression (pdf-lib)
- `lib/research/fetch-url.ts` — server-side URL content fetcher
- `lib/research/draft-storage.ts` — localStorage helpers for extraction drafts

### Shared components

- `components/ConditionalLayout.tsx` — sidebar visibility conditional on route
- `components/VisionCompanion.tsx` — homepage AI sidebar (canonical drawer pattern)
- `components/research/*` — Research & Insights component family

### Pages

- `app/page.tsx` — Vision homepage (10 bands)
- `app/login/page.tsx` — login screen
- `app/knowledge-base/client-insight/portfolio/[accountSlug]/page.tsx` — portfolio detail (14 sections)
- `app/knowledge-base/client-insight/portfolio/[accountSlug]/brand/[brandSlug]/page.tsx` — brand detail (11 sections)
- `app/knowledge-base/client-insight/portfolio/[accountSlug]/[projectSlug]/page.tsx` — project detail
- `app/knowledge-base/research/page.tsx` — Research & Insights listing (Sources + Insights tabs)
- `app/knowledge-base/research/sources/[id]/page.tsx` — source detail
- `app/knowledge-base/research/new/page.tsx` — add source flow
- `app/settings/suggestions/page.tsx` — Vision Companion query log
- `app/settings/research-queries/page.tsx` — Research Companion query log

---

## Active Development Context

Open items at the time of writing (check LAST_BUILD.md for current state):

- Build out Design Guidelines section (For Website 50→100%, For Applications 0→100%, Copywriting 80→100%)
- Build out Services P1–P7 detail pages (P1 confirmed Livestream Commerce, P2–P7 need user confirmation)
- Build out ICPs section
- Build out Decision-maker Personas section
- Consider Employer Branding 5th layer for Brand Foundation
- Phase 2 enhancement: pgvector semantic retrieval for Research Companion (when insights library exceeds ~200)
- Phase 2 enhancement: slug autocomplete on Insights tab applicability filters
- Phase 2 enhancement: ICP cross-linking (uses existing `getInsightsForIcp` helper once ICP pages exist)
- Phase 2 enhancement: Product detail pages at `/portfolio/.../brand/.../product/{slug}` when products warrant their own dossier
- Domain: deploy to `mkt.ecomobi.com` when DNS is configured (update NEXTAUTH_URL)
