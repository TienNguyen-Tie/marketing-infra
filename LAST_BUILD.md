# Last Build — Portfolio Data Model Restructuring
_2026-05-19_

## Summary

Restructured client portfolio data model to use **Portfolio = Parent × Category** as the unit. L'Oréal Vietnam split into two portfolios (Consumer Products, Active Cosmetics). Unilever Vietnam renamed to unilever-vn-beauty. Six smaller accounts updated with new fields. Listing page rewritten as flat list with filter bar. Detail page updated: parent/category hero, sibling callout, new Brand Portfolio section (§03), sections renumbered. `npx tsc --noEmit` clean. `npm run build` succeeds (94 pages, up from 93 — L'Oréal split added a net +1 static route).

---

## Files modified

```
data/portfolio/types.ts          — Brand.slug renamed to Brand.id; Brand.status (required)
                                   + optional: subCategory, targetConsumer, brandManager,
                                   pitchSolution, contractedServices, gmvLabel added;
                                   AccountContact.isPrimary?: boolean added;
                                   PortfolioAccount: parentCompany, parentSlug, categoryName,
                                   categorySlug, isGeneralCategory fields added;
                                   BrandStatus type added

data/portfolio/accounts.ts       — REPLACED entirely: loreal-vietnam split into
                                   loreal-vn-consumer + loreal-vn-active; unilever-vietnam
                                   renamed unilever-vn-beauty; dove-dry-serum-ugc project
                                   moved from loreal-vn-consumer to unilever-vn-beauty (under
                                   dove brand, not loreal-paris); all 6 smaller accounts updated
                                   with parentCompany/parentSlug/categoryName/categorySlug/
                                   isGeneralCategory; Brand.slug → Brand.id throughout;
                                   linkedEntities updated to new slugs

data/portfolio/helpers.ts        — brand.slug → brand.id in getProjectsByBrand;
                                   AccountContact imported; 5 new exports added:
                                   getPortfoliosByParent, getPortfoliosByCategory,
                                   getDisplayName, getFullDisplayName, getPrimaryContact,
                                   getSiblingPortfolios

app/knowledge-base/client-insight/portfolio/page.tsx
                                 — REPLACED entirely: flat portfolio grid with filter bar
                                   (search + category dropdown + parent dropdown + clear);
                                   pfCard layout with parent label, category title, brands,
                                   top outcome, footer stats; now a 'use client' component

app/knowledge-base/client-insight/portfolio/[accountSlug]/page.tsx
                                 — Hero: accountHeroParentRow (parent + category pill) above
                                   account name; breadcrumb shows parent › category;
                                   siblingStrip callout (if siblings exist);
                                   §03 Brand Portfolio cards added (status pill, contracted
                                   services, stats); sections renumbered 03→09;
                                   brand.slug → brand.id; getSiblingPortfolios + getDisplayName
                                   imported

app/knowledge-base/client-insight/portfolio.module.css
                                 — New classes: pfFilterBar, pfSearchWrap, pfSearchInput,
                                   pfSelect, pfClearAll, pfGrid, pfCard (+ sub-classes);
                                   pfEmpty, pfEmptyIcon, pfEmptyText;
                                   accountHeroParentRow, accountHeroParent, accountHeroParentSep,
                                   accountHeroCatPill; siblingStrip, siblingSLabel, siblingChip,
                                   siblingChipArrow; crPrimaryBadge;
                                   brandPortfolioGrid, brandPortfolioCard, bpcHead, bpcName,
                                   bpcStatusPill + bpcStatus--{active,prospect,lapsed},
                                   bpcSub, bpcMeta, bpcServices, bpcServicePill,
                                   bpcStat, bpcGmv, bpcPitch

app/knowledge-base/client-insight/portfolio/[accountSlug]/[projectSlug]/page.tsx
                                 — brand.slug → brand.id (1 reference)
```

---

## Portfolio roster (after restructuring)

| Slug | Parent Company | Category | isGeneral |
|---|---|---|---|
| `loreal-vn-consumer` | L'Oréal Vietnam | Consumer Products | false |
| `loreal-vn-active` | L'Oréal Vietnam | Active Cosmetics | false |
| `unilever-vn-beauty` | Unilever Vietnam | Beauty & Wellbeing | false |
| `cocoon` | Cocoon | Beauty & Personal Care | true |
| `pampers` | Pampers | Mom & Kid | true |
| `friso` | Friso | Mom & Kid | true |
| `bobby` | Bobby | Mom & Kid | true |
| `sunhouse` | Sunhouse | Home Care | true |
| `comet` | Comet | Home Care | true |

## Project move

`dove-dry-serum-ugc` was incorrectly attached to `loreal-vn-consumer` under the `loreal-paris` brand. Moved to `unilever-vn-beauty` under `dove` brand. brandSlug updated `loreal-paris` → `dove`; brandName updated `L'Oréal Paris` → `Dove`; linkedEntities updated to reference `unilever-vn-beauty`.

---

## Design decisions

1. **Brand.slug → Brand.id** — `ProjectBase.brandSlug` still references `brand.id` values (no change to project data). Only the Brand interface property name changed, plus all map lookups in helpers and JSX.

2. **Listing page → `'use client'`** — filter bar requires useState/useMemo. All filtering is in-memory over the static PORTFOLIO_ACCOUNTS array; no server fetches needed.

3. **Display name logic** — `getDisplayName` returns `parentCompany` for isGeneralCategory portfolios (e.g., "Cocoon"), or `categoryName` for split portfolios (e.g., "Consumer Products"). `getFullDisplayName` returns `"L'Oréal Vietnam — Consumer Products"` form for non-general.

4. **Sibling callout** — only rendered when `getSiblingPortfolios` finds siblings by matching `parentSlug`. For general-category accounts (which each have a unique parentSlug = their own slug), no strip appears.

5. **§03 Brand Portfolio** — always rendered (all accounts have at least one brand). Shows status pill (active/prospect/lapsed), contracted services, project count. Fields are optional — cards degrade gracefully when pitchSolution, gmvLabel etc. are absent.

---

## TypeScript

`npx tsc --noEmit` — clean, 0 errors.
`npm run build` — 94 pages, 0 errors.
