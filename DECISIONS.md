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
