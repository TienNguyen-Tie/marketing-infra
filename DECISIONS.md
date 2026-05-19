# Architectural Decisions

## D-001 — Portfolio = Parent × Category data unit
_2026-05-19_

**Decision**: The `PortfolioAccount` is the unit of data for the client portfolio, where a portfolio represents one parent company × one business category. A multi-division parent (L'Oréal) yields multiple portfolio records.

**Rationale**: L'Oréal Consumer Products (L'Oréal Paris, Maybelline, Garnier) and L'Oréal Active Cosmetics (La Roche-Posay) have distinct procurement contacts, different brand-safety requirements, different host selection criteria, and different performance benchmarks. Merging them into one account obscures these differences and makes the pattern library less useful for matching future briefs.

**Consequence**: Some accounts have `isGeneralCategory: true` (e.g. Cocoon, Pampers) when the parent only operates in one category and the division split adds no analytical value. For these, `parentSlug` equals the account `slug` and no sibling strip renders.

---

## D-002 — Brand.id (not Brand.slug)
_2026-05-19_

**Decision**: The Brand identifier field is named `id`, not `slug`. `ProjectBase.brandSlug` references `brand.id` values.

**Rationale**: `slug` implies URL-readiness. Brand identifiers here are internal keys used only for joining projects to brands within the same account — they are never used in URLs. `id` is the clearer name.

**Consequence**: `brand.id` is used as the React key in brand lists and as the map key in `getProjectsByBrand`. Any future brand URL routing would derive slugs independently.

---

## D-003 — dove-dry-serum-ugc belongs to Unilever, not L'Oréal
_2026-05-19_

**Decision**: `dove-dry-serum-ugc` is a Dove (Unilever) project, now attached to `unilever-vn-beauty` under the `dove` brand.

**Rationale**: The project was created under `loreal-vietnam` with `brandSlug: 'loreal-paris'` — a data entry error. Dove Dry Serum is a Unilever product. The project data, patterns, and KPIs are Unilever / Dove content.

**Consequence**: The `loreal-vn-consumer` portfolio loses one full case (now 3 projects: 1 full case + 3 others). `unilever-vn-beauty` gains one full case (now 3 projects: 2 full cases + 1 adhoc).

---

## D-004 — Portfolio listing page is a client component
_2026-05-19_

**Decision**: `app/knowledge-base/client-insight/portfolio/page.tsx` is marked `'use client'` with local useState/useMemo for filtering.

**Rationale**: The filter bar (search + two dropdowns) requires interactive state. All data is static (in-memory array from `PORTFOLIO_ACCOUNTS`) — no server fetches are needed, so client rendering has no data-loading cost.

**Consequence**: The listing page is no longer a static page in Next.js terms; it becomes dynamic. This is acceptable — the portfolio listing is a logged-in-only tool page, not a public landing page. Build output still shows it as `ƒ` (dynamic).

---

## D-005 — Sibling portfolios callout only renders for non-general accounts
_2026-05-19_

**Decision**: `getSiblingPortfolios` returns accounts sharing the same `parentSlug`. General-category accounts (isGeneralCategory: true) each have `parentSlug === slug`, so they never share a parent slug with another account, and the callout never renders.

**Rationale**: Cocoon, Pampers, Bobby etc. are single-portfolio parents — a sibling callout makes no sense. L'Oréal portfolios share `parentSlug: 'loreal-vn'` and correctly surface each other.

---

## D-007 — Marketing dossier is the portfolio detail page
_2026-05-19_

**Decision**: The portfolio detail page is a 14-section marketing intelligence dossier in 7 groups (A–G), not a CRM/CSM record. All sales-process fields (stakeholder depth, approval workflow, brand safety, working style, risks) are excluded. Every section that feeds a marketing activity is present; every section that serves only account management is absent.

**Rationale**: The tool's audience is the marketing team. The data structure should reflect what they need to brief campaigns, find creator matches, write PR pitches, and plan co-marketing — not what a CSM needs to manage a commercial relationship.

**Consequence**: `accountPatterns` removed (replaced by `contentAngles` which are marketing-framed). `businessIntelligence`, `workingStyleNorms`, `operatingCalendar`, `approvalWorkflow`, `brandSafetyCompliance`, `risks`, and `opportunities` were not added despite prior consideration.

---

## D-008 — Empty sections always render ("aspirational frame")
_2026-05-19_

**Decision**: All 14 sections render on every portfolio detail page, even when their data is absent. Missing sections show a "Not yet captured" placeholder, not a hidden section.

**Rationale**: The page is the aspirational frame that teaches the team what to capture over time. If sections only appear when data exists, new portfolios look empty and broken rather than structured and in-progress. The empty state communicates "this is where X goes" — which is itself valuable.

**Consequence**: `loreal-vn-consumer` shows full content; `loreal-vn-active` and all general portfolios show placeholders for Groups B, D, E, F. The page feels structurally complete regardless of data density.

---

## D-009 — General-category accounts use categoryName='General'
_2026-05-19_

**Decision**: Accounts where the parent only operates in one category use `isGeneralCategory: true`, `categoryName: 'General'`, `categorySlug: 'general'`. The existing `category: ClientCategory` field is kept for filter compatibility.

**Rationale**: For Cocoon, Pampers, Bobby etc., naming a category adds no analytical value — they are single-portfolio parents. Using "General" signals this clearly in the UI and avoids false precision (e.g. Pampers is "Mom & Kid" but it's also just… Pampers).

**Consequence**: `getPortfoliosByCategory('general')` returns all 6 smaller accounts. The listing page filter still works via `account.category` (the `ClientCategory` enum). Sibling portfolios never appear for general accounts (D-005 still holds).

---

## D-006 — Section numbering on detail page
_2026-05-19_

**Before**: §01 Account Profile / §02 ICP & Persona → §03 Brief → §04 Solution → §05 Outcomes → §06 Account Patterns → §07 Reference Index → §08 Projects

**After**: §01 Account Profile / §02 ICP & Persona → **§03 Brand Portfolio** → §04 Brief → §05 Solution → §06 Outcomes → §07 Account Patterns → §08 Reference Index → §09 Projects

**Rationale**: Brand Portfolio (§03) surfaces which brands are active/prospect/lapsed and what services they have contracted — this is decision-support data that belongs before the campaign history, not after it.

---

## D-010 — Brand detail page as a hierarchy layer between Portfolio and Project
_2026-05-19_

**Decision**: Added a Brand detail page at `/knowledge-base/client-insight/portfolio/{accountSlug}/brand/{brandSlug}`. It is a 11-section dossier in 5 groups (A–E): Group A (Brand Identity: §01 profile + §02 positioning/voice), Group B (Brand Audience: §03), Group C (Products: §04), Group D (Story Capital + Creator: §05 pitch/services + §06 story capital + §07 top creators + §08 content angles), Group E (Outcomes + Reference: §09 + §10 + §11). Same Pattern A/B empty-state approach as the portfolio page.

**Rationale**: The portfolio dossier holds account-level intelligence; the project page holds campaign-level execution. Brand-specific data (positioning, audience, products, top creators) doesn't fit cleanly into either. A brand layer provides the right granularity for campaign briefing against a specific brand.

**Consequence**: `Brand` interface in `types.ts` extended with `slug`, `positioning`, `voiceTone`, `messagingPillars`, `brandAudience`, `products`, `brandStoryCapital`, `brandTopCreators`, `brandContentAngles`, `brandOutcomes`, `brandReferenceIndex`. New `Product` interface and `ProductStatus`/`ProductMarketingRole` types added. Helpers: `getBrandSlug`, `getBrandBySlug`, `getProductsByBrand`. L'Oréal Paris has full dossier seed data; Maybelline, Dove, La Roche-Posay have medium seeds; all others have slug + minimal fields. Portfolio §02 brand cards now link "View brand →" to the brand page; §13 brand sub-headers link to the brand page.

**URL generation**: `getBrandSlug(brand)` returns `brand.slug` if set, otherwise `nameToSlug(brand.name)` (lowercase, accent-stripped, non-alphanumeric → hyphen). Explicit `slug` fields set on all 13 brands in `accounts.ts` to lock URLs against future name changes.

---

## D-011 — Research & Insights uses Vercel Blob for PDF storage
_2026-05-19_

**Decision**: PDFs uploaded through the Research & Insights section are stored in Vercel Blob, not in the Neon database. The DB stores only the blob URL and file metadata. BLOB_READ_WRITE_TOKEN must be present in environment variables.

**Rationale**: Neon PostgreSQL (free/starter tier) is unsuitable for binary file storage. Vercel Blob is the native storage solution for Vercel-hosted Next.js projects and integrates cleanly with the `@vercel/blob/client` upload pattern (client-side upload, server-side token generation).

**Consequence**: PDF uploads require a live Vercel Blob configuration. URL Collection sources and manual insight entry work without Blob configured. BLOB_READ_WRITE_TOKEN is already set in .env.local.

---

## D-012 — prisma db push used instead of migrate dev (no migration history)
_2026-05-19_

**Decision**: The Research & Insights tables (ResearchSource, Insight) were added via `prisma db push` rather than `prisma migrate dev`, because the existing User/Session/Suggestion tables were created without any migration history.

**Rationale**: Running `prisma migrate dev` on a database with existing tables and no migration files triggers a "drift detected" error that requires a full schema reset (data loss). `prisma db push` adds only the new tables without touching the existing schema or data. Migration files are absent from this project.

**Consequence**: If migration history is needed in the future, baseline the existing schema first using `prisma migrate resolve`, then switch to `prisma migrate dev` for all subsequent changes.

---

## D-013 — Research & Insights: manual insight entry in Prompt 1; AI extraction in Prompt 2
_2026-05-19_

**Decision**: The Insights tab on the listing page is disabled ("Coming soon") in Prompt 1. Manual insight entry via modal is live. AI-powered extraction from PDF/URL content is deferred to Prompt 2.

**Rationale**: The data model and UI scaffolding must be established before adding AI extraction, which requires additional API integration and extraction logic. This phased approach allows the team to start adding manual insights immediately while AI extraction is built separately.

**Consequence**: The `AddInsightModal` accepts all insight fields manually. Applicability fields (portfolios, brands, ICPs) are free-text comma-separated in Phase 1; they will become proper multi-select dropdowns in Prompt 3.

---

## D-014 — AI extraction uses claude-opus-4-7; drafts held in localStorage until accepted
_2026-05-19_

**Decision**: Extraction POSTs to `/api/research/sources/[id]/extract` which calls `claude-opus-4-7`. Draft insights are held in client state + localStorage (`research-drafts-{sourceId}`) rather than written to the DB immediately. Each draft is reviewed, optionally edited inline, then accepted (POST to insights API) or rejected.

**Rationale**: Extraction quality varies; accepting all insights blindly would pollute the insight library. Holding drafts in localStorage provides persistence across page refreshes without requiring a separate DB model. `claude-opus-4-7` balances extraction quality with the 60-second `maxDuration` serverless limit. A `hydrated` guard flag prevents the save effect from clearing localStorage before the load effect runs on mount.

**Consequence**: PDF extraction sends the full PDF as base64 with the `anthropic-beta: pdfs-2024-09-25` header. URL extraction fetches each URL server-side (12s timeout, 10K char cap, HTML stripped) before sending. Drafts do not persist server-side — a full page reload after clearing browser storage loses unaccepted drafts.

---

## D-017 — Cross-linked research: read-only render on portfolio & brand pages, filtered by applicability slug
_2026-05-19_

**Decision**: Portfolio and brand detail pages fetch insights from the DB at render time using `getInsightsForPortfolio(slug)` / `getInsightsForBrand(slug)` and render them in a new "Relevant Research" section (§15 on portfolio, §12 on brand). The section is read-only — no modal, no edit. Each insight card links directly to the source detail page (new tab). Empty state shows 3 ghost cards and a CTA explaining how to populate. "View all in library →" routes to the Insights tab with the entity's slug pre-applied as the applicability filter.

**Rationale**: Surfacing relevant research at the point of use (portfolio/brand dossier) closes the loop between the research library and the account intelligence. The applicability field is already on every insight; cross-linking is pure presentation with zero schema change. Ghost cards preserve the "aspirational frame" pattern (D-008) — the section always renders and teaches users what to populate.

**Consequence**: Portfolio and brand detail pages now make a DB call at render time. Pages remain dynamic (`ƒ`). GIN indexes added on `Insight.applicabilityPortfolios`, `applicabilityBrands`, `applicabilityIcps` for query performance as the library grows. `InsightListItem` extended with `linkBehavior` prop — `'source-link'` wraps the whole card in a link (used on entity pages); `'modal'` preserves the existing click-to-open-modal behavior (used on the Insights tab).

---

## D-018 — NextAuth role typing via module augmentation in next-auth.d.ts
_2026-05-19_

**Decision**: NextAuth's `User`, `Session`, and `JWT` interfaces are augmented in a single `next-auth.d.ts` file at the project root. The `declare module 'next-auth'` block that was inline in `lib/auth.ts` has been removed and consolidated there.

**Rationale**: Having augmentation in `lib/auth.ts` (a runtime file) and potentially also in `next-auth.d.ts` causes duplicate declaration conflicts in TypeScript. A dedicated `.d.ts` is the canonical location for module augmentation. This eliminates `as any` and `as { role?: string }` casts across all route files.

**Consequence**: `session.user.role` is typed as `Role | undefined` throughout the app — no casts needed. In `lib/auth.config.ts`, `token.role` in the session callback is `unknown` (NextAuth v5 JWT callback limitation), so a narrow value cast `token.role as Role | undefined` is used instead of an object-level `as any`. `lib/auth.config.ts` defines `type Role = 'ADMIN' | 'EDITOR' | 'VIEWER'` locally to avoid Prisma imports in the edge-safe config.

**Pattern for future role-gated routes:**
```ts
const session = await auth();
if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
if (session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
```
No casts needed.

---

## ✅ Research & Insights arc — COMPLETE

```
✅ Prompt 1 — Base section, schema, listing, source detail, manual insight entry
✅ Prompt 2 — AI extraction for PDFs and URL collections, draft review UI
✅ Prompt 3 — Insights tab with URL-state filters, insight detail modal
✅ Prompt 4 — Research Companion drawer, citation linking, query log
✅ Prompt 5 — Cross-linking to portfolio and brand pages
```

---

## D-016 — Research Companion: single-shot Q&A, citations rendered client-side
_2026-05-19_

**Decision**: Each question to the Research Companion is independent — no message history is sent to the API. In-memory exchange history is displayed in the drawer but only the current question + full insight library JSON is sent per request. Citations `[#insightId]` are rendered by the client by parsing the answer text and mapping IDs to source URLs via a `citationMap` returned from the API. Queries are logged to `ResearchQuery` (non-critically — DB failure doesn't fail the request).

**Rationale**: Single-shot is simpler and avoids growing context costs as exchanges accumulate. The full insight library is small enough to fit in a single API call (tested under 4K tokens for typical libraries). Citation rendering in the client means the API returns clean text that can be logged verbatim; the rendering layer handles display.

**Consequence**: If a user asks follow-up questions that require context from prior answers, they must re-state the context in their next question. The drawer makes this friction low since prior exchanges are visible above.

---

## D-019 — Centralized model identifiers in lib/ai-models.ts
_2026-05-19_

**Decision**: Anthropic model identifiers are centralized in `lib/ai-models.ts` as exported constants (`EXTRACTION_MODEL`, `COMPANION_MODEL`, `SUGGESTION_MODEL`, `TEST_MODEL`). No route hardcodes the model string. The choice of model per route is documented inline in `lib/ai-models.ts` with rationale.

**Three models, three uses:**
- `EXTRACTION_MODEL` (`claude-opus-4-7`) — PDF extraction and URL collection synthesis; structured JSON output quality matters downstream
- `COMPANION_MODEL` (`claude-opus-4-7`) — Research Companion; sends full insight library as context per query; large context window and citation accuracy critical
- `SUGGESTION_MODEL` (`claude-sonnet-4-6`) — Vision Companion and brand foundation generation; latency-sensitive, shorter interactions

**Alternative considered**: leaving model strings inline in each route. Rejected because (a) it duplicates intent across files and (b) future model upgrades require touching every route instead of one constants file.

**Future revisit**: when the Research Companion moves to pgvector-based retrieval (planned when insight library exceeds ~200–300 insights), `COMPANION_MODEL` may revert to Sonnet since smaller context will fit comfortably. Re-evaluate at that point.

---

## D-015 — Insights tab uses client-side fetch with URL filter state
_2026-05-19_

**Decision**: The Insights tab (`?tab=insights`) fetches from `/api/research/insights` on the client using `useEffect` + `useState`. All filter state lives in URL query params. Tab switching clears all params and navigates to `?tab=X`.

**Rationale**: Filter state in URL makes views shareable and bookmarkable. Client-side fetch keeps the tab interactive (instant filter chip toggles, debounced text inputs) without full page reloads. Simple `useEffect` + `useState` is preferred over SWR to match the existing codebase pattern. Tab switch clears all params because Sources and Insights have entirely different filter sets; preserving cross-tab params adds complexity with no user benefit at this stage.

**Consequence**: Slug autocomplete for applicability filters is Phase 2 (currently free-text input). The confidence sort is applied in JavaScript after DB fetch (not in SQL) because Prisma has no native confidence-priority ordering. `totalCount` reflects the unfiltered total — used for "Showing N of M" display.
