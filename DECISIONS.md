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

## D-006 — Section numbering on detail page
_2026-05-19_

**Before**: §01 Account Profile / §02 ICP & Persona → §03 Brief → §04 Solution → §05 Outcomes → §06 Account Patterns → §07 Reference Index → §08 Projects

**After**: §01 Account Profile / §02 ICP & Persona → **§03 Brand Portfolio** → §04 Brief → §05 Solution → §06 Outcomes → §07 Account Patterns → §08 Reference Index → §09 Projects

**Rationale**: Brand Portfolio (§03) surfaces which brands are active/prospect/lapsed and what services they have contracted — this is decision-support data that belongs before the campaign history, not after it.
