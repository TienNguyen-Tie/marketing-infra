# Last Build — Wave 3: Docs Alignment + Model Constants
_2026-05-19_

## Summary

5 findings from CONSOLIDATION_REPORT.md closed. CLAUDE.md now accurately documents the SDK pattern, no-arg `getAnthropicKey()`, and per-route-type model choice. All 6 previously hardcoded model strings moved to `lib/ai-models.ts`. TypeScript clean, build succeeds (114 pages, 0 errors).

---

## Closed findings

| ID | Finding | Fix |
|----|---------|-----|
| I-001 | CLAUDE.md documented direct fetch; code uses SDK | Corrected to document SDK pattern |
| I-002 | CLAUDE.md showed `getAnthropicKey(userId)`; function takes no args | Corrected to `getAnthropicKey()` |
| I-003 | CLAUDE.md said `claude-sonnet-4-6` everywhere; extraction/companion use Opus | Now documents per-route-type model with rationale |
| S-002 | No documented rationale for model selection | Rationale in `lib/ai-models.ts` (inline) and `DECISIONS.md` (D-019) |
| S-003 | Model strings scattered across routes | Created `lib/ai-models.ts`; all 6 occurrences replaced with constants |

## Files created / modified

```
lib/ai-models.ts              — NEW: EXTRACTION_MODEL, COMPANION_MODEL,
                                SUGGESTION_MODEL, TEST_MODEL constants
                                with inline selection rationale

app/api/research/sources/[id]/extract/route.ts
                              — 2 occurrences of 'claude-opus-4-7' → EXTRACTION_MODEL

app/api/research/companion/route.ts
                              — 'claude-opus-4-7' → COMPANION_MODEL

app/api/vision-companion/route.ts
                              — 'claude-sonnet-4-6' → SUGGESTION_MODEL

app/api/foundation-lab/route.ts
                              — 'claude-sonnet-4-6' → SUGGESTION_MODEL

app/api/settings/api-key/test/route.ts
                              — 'claude-haiku-4-5-20251001' → TEST_MODEL
                                (bonus: the haiku ping model is now documented)

CLAUDE.md                     — AI Integration section rewritten to reflect:
                                SDK pattern, no-arg getAnthropicKey(),
                                three-model approach with rationale pointer,
                                PDF beta feature note, trigger spec update

DECISIONS.md                  — D-019 added (model constants decision)
```

## No schema changes. No new dependencies. No new env vars.

## Manual verification checklist

- `grep` for hardcoded model strings in app/ and lib/ returns only `lib/ai-models.ts` ✅
- `npx tsc --noEmit` clean ✅
- `npm run build` succeeds (114 pages) ✅
- PDF extraction, Research Companion, Vision Companion — functional tests deferred to live environment (no test source available in local dev without a real Anthropic key)

## Discovered during Wave 3, deferred

- none

---

# Previous Build — Wave 2: Research Companion UI Alignment
_2026-05-19_

## Summary

4 UI consistency findings from CONSOLIDATION_REPORT.md closed. Surgical value-only edits — no restructuring. TypeScript clean, build succeeds (114 pages, 0 errors).

---

## Closed findings

| ID | Finding | Fix |
|----|---------|-----|
| I-004 | Trigger position off-spec (28px, z-index 90) | bottom/right → 24px, z-index → 50 |
| M-002 | Trigger background `var(--black)` | Changed to `var(--red)`, red-tinted shadow `rgba(244,60,52,0.3/0.4)` |
| M-003 | InsightListItem inline `style={{...}}` on source-link `<a>` | Moved to `.sourceLink` class in `research.module.css` |

## M-001 not changed (cross-check result)

M-001 said to align drawer z-index to 100/90. Cross-checking VisionCompanion shows it uses 101/100, not 100/90. Since VisionCompanion is canonical, Research Companion is already consistent at 101/100. SKILL.md spec (100/90) is the document that's out of date — see deferred below.

## Files touched

```
components/research/ResearchCompanion.module.css
  — trigger: bottom/right 28px→24px, z-index 90→50,
    background var(--black)→var(--red),
    box-shadow → rgba(244,60,52,0.3) / hover rgba(244,60,52,0.4)
  — triggerDot remains (visible on hover as accent; styling intentional)

app/knowledge-base/research/research.module.css
  — Added .sourceLink { text-decoration: none; color: inherit; display: block; }

components/research/InsightListItem.tsx
  — Replaced inline style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    with className combination ${styles.insightListCard} ${styles.sourceLink}
```

## No schema changes. No new dependencies. No new env vars.

## Manual verification

- Research Companion trigger is now red, sits at 24px from bottom-right ✓
- Red-tinted shadow on trigger ✓
- Drawer + backdrop stack unchanged (101/100 — consistent with VisionCompanion) ✓
- No inline styles remain in InsightListItem ✓

## Discovered during Wave 2, deferred

- SKILL.md spec says drawer z-index 100 / backdrop z-index 90. Both VisionCompanion and ResearchCompanion use 101/100 instead. SKILL.md needs updating to reflect the actual codebase standard (Wave 3 CLAUDE.md update wave could include this).
- `triggerDot` (small red dot on trigger) was visible against the black background as an accent; against the new red background it's invisible. Consider removing or recoloring the dot in a future pass.

---

# Previous Build — Wave 1: Security & Type Safety Fixes
_2026-05-19_

## Summary

Closed 6 findings from CONSOLIDATION_REPORT.md. No new features, no pattern changes. TypeScript clean, build succeeds (114 pages, 0 errors). Schema: additive `updatedAt` column added to ResearchQuery via `prisma db push` (no migration history in this project — D-012). Note: the wave prompt suggested `prisma migrate dev`, but `db push` is used throughout this project per D-012.

---

## Closed findings

| ID | Finding | Fix |
|----|---------|-----|
| C-001 | `app/api/foundation-lab/route.ts` had no auth check — unauthenticated POST | Added `auth()` guard as first operation in POST handler |
| C-002 | `ResearchQuery` missing `updatedAt DateTime @updatedAt` | Added field, pushed schema |
| C-003 | `(anthropic.messages.create as Function)(...)` in extract route | Replaced with `(anthropic.messages as any).create(...)` — narrower cast |
| I-005 | `as any` role casts in `lib/auth.config.ts` and `session.user` casts across routes | Created `next-auth.d.ts` with module augmentation; removed duplicate declaration from `lib/auth.ts`; replaced all role casts with direct property access |
| S-001 | Redundant role casts in 9 routes/pages | Removed all; `session.user.role` now typed via augmentation |
| S-004 | No TODO marking PDF beta header in extract route | Added TODO comment above the `as any` cast |

---

## Files created / modified

```
next-auth.d.ts                    — NEW: Module augmentation for next-auth User, Session,
                                    JWT interfaces. Adds role?: Role to all three.
                                    Single source of truth (replaces inline declare module
                                    block that was in lib/auth.ts).

lib/auth.ts                       — Removed inline `declare module 'next-auth'` block;
                                    consolidated into next-auth.d.ts. Role import removed.

lib/auth.config.ts                — jwt callback: `(user as any).role` → `user.role`
                                    session callback: `(session.user as any).role = token.role`
                                    → `session.user.role = token.role as Role | undefined`
                                    (token.role is `unknown` in NextAuth v5 JWT session
                                    callback context — narrow cast on value, not on object)
                                    Added local `type Role = 'ADMIN' | 'EDITOR' | 'VIEWER'`
                                    to avoid Prisma imports in edge-safe file.

prisma/schema.prisma              — ResearchQuery: added `updatedAt DateTime @updatedAt`

app/api/foundation-lab/route.ts   — Added `import { auth }` and session guard at top of POST

app/api/research/sources/[id]/extract/route.ts
                                  — `(anthropic.messages.create as Function)` →
                                    `(anthropic.messages as any).create`; TODO comment added

app/api/settings/api-key/route.ts — isAdmin: removed `as { role?: string }` cast
app/api/settings/api-key/test/route.ts — removed `as { role?: string }` cast
app/api/settings/users/route.ts   — isAdmin: removed `as { role?: string }` cast
app/api/settings/users/[id]/route.ts — isAdmin: removed `as { role?: string }` cast
app/api/suggestions/route.ts      — removed `as Session | null` cast + role cast
app/api/suggestions/[id]/route.ts — removed `as Session | null` cast + role cast
app/settings/research-queries/page.tsx — removed `session.user as {...}` cast
app/settings/users/page.tsx       — removed `as { role?: string }` cast
app/account/page.tsx              — removed `session.user as {...}` cast; access direct
```

---

## Schema changes

`ResearchQuery.updatedAt` — additive column. Applied via `prisma db push`.

## Manual steps required

None.

## Env changes

None.

## Discovered during Wave 1, deferred

- `app/api/vision-companion/route.ts:48` — `userId: session.user.id` had a pre-existing potential type mismatch with Prisma's `Suggestion.userId` (non-nullable). Resolved as a side-effect of consolidating the NextAuth Session augmentation (session.user.id is now `string` via explicit declaration). Confirmed by clean tsc.

---

# Previous Build — Cross-Linking: Relevant Research on Portfolio & Brand Pages (Prompt 5 of 5)
_2026-05-19_

## Summary

Research & Insights arc complete. Insights from the research library now surface on portfolio and brand detail pages, filtered by applicability slug. Read-only rendering — no new schema (beyond GIN indexes), no new API routes, pure presentation on existing data. `npx tsc --noEmit` clean. `npm run build` 114 pages, 0 errors.

---

## Files created / modified

```
prisma/schema.prisma              — GIN indexes added on Insight.applicabilityPortfolios,
                                    applicabilityBrands, applicabilityIcps (prisma db push)

lib/research/helpers.ts           — NEW: getInsightsForPortfolio(slug), getInsightsForBrand(slug),
                                    getInsightsForIcp(slug) — each queries DB via applicability
                                    array `has` filter, includes source join

components/research/InsightListItem.tsx
                                  — linkBehavior prop added: 'modal' (default, existing behavior
                                    with onClick + source Link) | 'source-link' (wraps whole
                                    card in <a target="_blank">)

app/knowledge-base/research/research.module.css
                                  — Added: .relevantResearchHeader, .relevantResearchCount,
                                    .relevantResearchViewAll, .relevantResearchList,
                                    .relevantResearchFooter, .relevantResearchFooterLink,
                                    .relevantResearchCta, .relevantResearchCtaText,
                                    .relevantResearchCtaSlug, .relevantResearchCtaLinks,
                                    .relevantResearchCtaLink

components/research/RelevantResearchSection.tsx
                                  — NEW: server component — renders insight list (linkBehavior=
                                    'source-link') or 3 ghost insight cards + CTA explaining
                                    how to populate. "View all in library →" links to Insights
                                    tab pre-filtered by entitySlug

app/knowledge-base/client-insight/portfolio/[accountSlug]/page.tsx
                                  — Imports getInsightsForPortfolio + RelevantResearchSection
                                  — Fetches relevantInsights = await getInsightsForPortfolio(accountSlug)
                                  — Group H + §15 Relevant Research added after §14

app/knowledge-base/client-insight/portfolio/[accountSlug]/brand/[brandSlug]/page.tsx
                                  — Imports getInsightsForBrand + RelevantResearchSection
                                  — Fetches relevantInsights = await getInsightsForBrand(getBrandSlug(brand))
                                  — Group F + §12 Relevant Research added after §11

DECISIONS.md                      — D-017 added; Research & Insights arc marked COMPLETE
```

---

## What works now

- `/knowledge-base/client-insight/portfolio/{slug}` — §15 "Relevant Research" (Group H) at bottom
  - Shows insights tagged with portfolio slug in applicabilityPortfolios
  - Empty state: 3 ghost insight cards + CTA explaining how to populate with slug '{accountSlug}'
  - "View all in library →" → `/knowledge-base/research?tab=insights&portfolios={slug}`
  - Each card → source detail page (new tab)

- `/knowledge-base/client-insight/portfolio/{accountSlug}/brand/{brandSlug}` — §12 "Relevant Research" (Group F)
  - Shows insights tagged with brand slug in applicabilityBrands
  - Same empty state and view-all link pattern

- `InsightListItem` now supports `linkBehavior` prop:
  - `'modal'` (default) — existing behavior, onClick triggers modal
  - `'source-link'` — whole card is `<a target="_blank">` pointing to source detail

---

## Research & Insights arc — COMPLETE ✅

```
✅ Prompt 1 — Base section, schema, listing, source detail, manual insight entry
✅ Prompt 2 — AI extraction for PDFs and URL collections, draft review UI with localStorage persistence
✅ Prompt 3 — Insights tab with shareable URL-state filters, insight detail modal
✅ Prompt 4 — Research Companion drawer, citation linking, query log
✅ Prompt 5 — Cross-linking to portfolio and brand pages
```

---

## Previous build (Research Companion, Prompt 4 of 5, 2026-05-19)
_2026-05-19_

## Summary

Research Companion added as a right-side drawer across the Research & Insights section. Single-shot Q&A grounded in the full insight library; citations `[#id]` render as clickable links to source pages. Queries logged to new `ResearchQuery` DB table. Admin view at `/settings/research-queries`. `npx tsc --noEmit` clean. `npm run build` 114 pages, 0 errors.

---

## Files created / modified

```
prisma/schema.prisma              — ResearchQuery model added (prisma db push + generate)

lib/research/companion-prompt.ts  — NEW: COMPANION_SYSTEM_PROMPT — instructs Claude to cite
                                    with [#insightId] format, never fabricate, flag gaps

app/api/research/companion/route.ts
                                  — NEW: POST endpoint, maxDuration=60
                                    Loads all insights + source join, sends full library JSON
                                    Parses [#id] citations, builds citationMap, logs ResearchQuery
                                    Returns { answer, citationMap }

components/research/ResearchCompanion.module.css
                                  — NEW: drawer, backdrop, conversation, exchange, userMsg,
                                    aiMsg, citation (link style), loading dots, error banner,
                                    inputArea, trigger pill button

components/research/ResearchCompanion.tsx
                                  — NEW: drawer component — in-memory exchange history,
                                    renderAnswer() splits text on [#id] tokens → Link elements,
                                    ESC closes, auto-focus on open, scroll-to-bottom

components/research/ResearchCompanionTrigger.tsx
                                  — NEW: floating pill button (bottom-right), manages open state,
                                    renders ResearchCompanion drawer

app/knowledge-base/research/page.tsx
                                  — ResearchCompanionTrigger mounted

app/knowledge-base/research/sources/[id]/page.tsx
                                  — ResearchCompanionTrigger mounted

app/settings/research-queries/page.tsx
                                  — NEW: server component, ADMIN-only, last 50 ResearchQuery
                                    entries, cards with question/answer/cited IDs/token count

app/settings/research-queries/research-queries.module.css
                                  — NEW: page styles for research-queries settings page

components/Sidebar.tsx            — "Research Queries" added to settingsTree

DECISIONS.md                      — D-016 added
```

---

## What works now

- Floating "Research Companion" pill appears bottom-right on:
  - `/knowledge-base/research` (both tabs)
  - `/knowledge-base/research/sources/[id]`
- Click opens 480px right drawer with ESC / backdrop close
- Ask a question → POST to `/api/research/companion` → answer grounded in full insight library
- Citations `[#insightId]` in the answer render as small red pill links → open source page in new tab
- In-drawer exchange history shows all Q&As from the current session (cleared on page navigation)
- Each query logged to `ResearchQuery` DB table (non-critical — won't block the response if DB fails)
- `/settings/research-queries` — last 50 queries with question, answer, cited IDs, token usage (admin-only)

## What's coming next

- Prompt 5: Edit source page

---

## Previous build (Insights Tab, Prompt 3 of 5, 2026-05-19)
_2026-05-19_

## Summary

Insights tab enabled at `/knowledge-base/research?tab=insights`. Cross-source insight browsing with 7 filter dimensions, URL state for shareable/bookmarkable filter views, and an inline detail modal with view, edit, and delete modes. `npx tsc --noEmit` clean. `npm run build` 112 pages, 0 errors.

---

## Files created / modified

```
lib/research/insight-filters.ts       — InsightFilters type, EMPTY_FILTERS, filtersFromURL,
                                         filtersToURL, hasActiveFilters

app/api/research/insights/route.ts    — NEW: GET endpoint — filtered insight listing,
                                         includes source join, confidence JS-sort, totalCount

components/research/SourcesTab.tsx    — NEW: server component, extracted from page.tsx
components/research/InsightListItem.tsx — NEW: client component, insight card
components/research/InsightDetailModal.tsx — NEW: client component, view/edit/delete modal
components/research/InsightsTab.tsx   — NEW: client component, filter panel + insight list
                                         + modal wiring

app/knowledge-base/research/page.tsx  — Rewritten: reads ?tab param, renders SourcesTab
                                         or InsightsTab via Suspense; tab strip uses Links
app/knowledge-base/research/research.module.css
                                      — .tab color updated (active → black text + red underline)
                                      — Added: insightTabMeta, insightTabCount, clearFiltersLink,
                                        insightFiltersPanel, insightFilterGroup/GroupLabel,
                                        insightChipRow, insightChip + active variants,
                                        insightFilterInput, insightSearchWrapper/Icon/Input,
                                        insightSortSelect, skeletonList/Row, insightListCard
                                        and sub-elements, modalHeaderRow/Pills/Actions,
                                        modalEditBtn/SaveBtn/DeleteBtn/CancelBtn,
                                        modalDetailHeadline/Body, modalDivider, modalSourceCard,
                                        modalApplicabilityRow

DECISIONS.md                          — D-015 added
```

---

## What works now

- `/knowledge-base/research` → Sources tab (default, existing behavior)
- `/knowledge-base/research?tab=insights` → Insights tab enabled
- Filters: category (multi-chip), confidence (multi-chip, color-coded), source type (single-chip),
  applicability portfolios/brands/icps (text inputs), tags (text input), search (debounced 300ms),
  sort (newest / oldest / by confidence / by category)
- All filters encode into URL query params → shareable, bookmarkable
- Loading: skeleton rows; empty-no-insights CTA; empty-no-match CTA with clear-all
- Click insight card → detail modal (view mode): full content, source link, applicability, tags
- Modal edit mode: all fields editable, PATCH on save, returns to view mode
- Modal delete: confirm dialog → DELETE, modal closes, list updates
- ESC closes modal (view mode) or prompts discard (edit mode)
- Backdrop click closes modal (view mode only)

## What's coming next

- Prompt 4: Research Companion (AI Q&A over the insight library)
- Prompt 5: Edit source page

---

## Previous build (AI Extraction, Prompt 2 of 5, 2026-05-19)

## Summary

AI-powered insight extraction added to the Research & Insights source detail page. Extraction uses `claude-opus-4-7` — PDFs are sent as base64 documents (beta PDF API), URL collections are fetched server-side and combined. Draft insights are held in `localStorage` until individually accepted (saved to DB) or rejected. `npx tsc --noEmit` clean. `npm run build` 111 pages, 0 errors.

**No schema changes** — all new functionality is API + client-side. **Anthropic API key must be configured** in Account Settings for extraction to work.

---

## Files created / modified

```
lib/research/extraction-prompt.ts    — EXTRACTION_SYSTEM_PROMPT + DraftInsight interface
lib/research/fetch-url.ts            — fetchURLContent() — server-side URL fetch, HTML strip, 10K cap
lib/research/draft-storage.ts        — saveDrafts / loadDrafts / clearDrafts (localStorage)

app/api/research/sources/[id]/extract/route.ts
                                     — NEW: POST endpoint, maxDuration=60, PDF base64 + URL fetch path
                                       returns { drafts: DraftInsight[] }

app/knowledge-base/research/sources/[id]/InsightsSectionClient.tsx
                                     — Rewritten: adds sourceType prop, drafts state + hydration guard,
                                       isExtracting / extractionError states, DraftInsightCard component
                                       (inline-editable amber cards), discard all button

app/knowledge-base/research/sources/[id]/page.tsx
                                     — sourceType prop added to InsightsSectionClient

app/knowledge-base/research/research.module.css
                                     — Added: .extractBtn, .extractingBanner, .extractingSpinner,
                                       .extractionErrorBanner, .draftsSection, .draftsBanner,
                                       .discardAllBtn, .draftCard, .draftPill, .draftCardHeader,
                                       .draftApplicabilityHint, .draftEditField/Textarea/Select/Label,
                                       .draftFieldGroup/Row, .draftActions, .acceptBtn, .rejectBtn

DECISIONS.md                         — D-014 added
```

---

## What works now

- Source detail page shows "Extract with AI" button in §04 Insights header
- Clicking triggers POST to `/api/research/sources/[id]/extract` (requires Anthropic key in Account Settings)
- PDF sources: full PDF fetched from Vercel Blob URL, sent as base64 document to Claude
- URL Collection sources: each URL fetched server-side, HTML stripped, combined text sent to Claude
- Amber-tinted draft cards appear below a "N drafts" banner — each card shows all fields editable inline
- Category and Confidence use dropdowns matching existing constants
- "Accept & Save" POSTs to the existing insights endpoint and removes the draft
- "Reject" removes the draft without saving
- "Discard all" clears all drafts (with confirmation)
- Drafts persist across page refreshes via `localStorage` (`research-drafts-{sourceId}`)
- `hydrated` flag prevents save effect from clearing drafts before load effect runs on mount

## What's coming next

- Prompt 3: Insights tab on listing page; applicability multi-select dropdowns
- Prompt 4: Research Companion (AI Q&A over the insight library)
- Prompt 5: Edit source page

---

## Previous build (Research & Insights Foundation, Prompt 1 of 5, 2026-05-19)

Research & Insights base section built at `/knowledge-base/research`. Data layer (Prisma models + Vercel Blob), listing page with filter bar, Add Source flow (PDF + URL Collection), source detail page, manual insight entry modal, and 5 API routes. `npx tsc --noEmit` clean. `npm run build` 111 pages, 0 errors.

---

## Files created / modified

```
prisma/schema.prisma
                — ResearchSource and Insight models added via prisma db push

lib/research/types.ts          — SourceType, SourceCategory, InsightCategory, Confidence, UrlRef
lib/research/constants.ts      — label maps + MAX_PDF_SIZE constants
lib/research/compress-pdf.ts   — client-side PDF compression via pdf-lib

components/Sidebar.tsx
                — "Research & Insights" leaf added under Knowledge Base (after Client Insight)

app/knowledge-base/research/research.module.css   — full shared CSS module
app/knowledge-base/research/page.tsx              — listing page (server, reads searchParams)
app/knowledge-base/research/ResearchFilters.tsx   — filter bar (client, updates URL params)
app/knowledge-base/research/new/page.tsx          — Add Source multi-step form (client)
                                                     Embeds PDFUploadField + URLCollectionField
                                                     + TagsInput components

app/knowledge-base/research/sources/[id]/page.tsx              — source detail (server)
app/knowledge-base/research/sources/[id]/InsightsSectionClient.tsx  — insights list + delete (client)
app/knowledge-base/research/sources/[id]/AddInsightModal.tsx        — add insight modal (client)

app/api/research/upload/route.ts                — Vercel Blob handleUpload, auth-gated, PDF only, 50 MB max
app/api/research/sources/route.ts               — GET (list + filter) / POST (create)
app/api/research/sources/[id]/route.ts          — GET (with insights) / PATCH / DELETE
app/api/research/sources/[id]/insights/route.ts — POST (create insight)
app/api/research/insights/[id]/route.ts         — PATCH / DELETE
```

---

## What works now

- Sidebar shows "Research & Insights" under Knowledge Base
- `/knowledge-base/research` — listing with type/category/tags/sort filters (URL-based)
- Empty state with "Add your first source" CTA
- `/knowledge-base/research/new` — type chooser → metadata form → PDF upload or URL collection
- PDF: client-side compression via pdf-lib, Vercel Blob upload, compression stats shown
- URL Collection: add/remove/edit rows with URL, title, quote, notes
- `/knowledge-base/research/sources/{id}` — 4-section dossier (metadata, content, summary/notes, insights)
- Ghost insight cards shown when 0 insights
- "+ Add Insight" modal with all fields; saves and refreshes via router.refresh()
- Delete insight with confirmation

## What's coming next

- Prompt 2: AI extraction (send PDF/URLs to Claude, auto-populate insights)
- Prompt 3: Insights tab on listing page; applicability multi-select dropdowns
- Prompt 4: Research Companion (AI Q&A over the insight library)
- Prompt 5: Edit source page

---

## Previous build (Brand Detail Page, 2026-05-19)

Added a Brand Detail Page as a hierarchy layer between Portfolio and Project. New route: `/knowledge-base/client-insight/portfolio/{accountSlug}/brand/{brandSlug}`. 11-section dossier in 5 groups with the same Pattern A/B empty-state approach as the portfolio page. L'Oréal Paris has a full seed dossier; Maybelline, Dove, La Roche-Posay have medium seeds; all other brands have slug + minimal fields. Portfolio §02 brand cards now show a "View brand →" footer link; §13 brand sub-headers are clickable links to the brand page. `npx tsc --noEmit` clean. `npm run build` succeeds (107 pages, 0 errors).

---

## Files modified

```
data/portfolio/types.ts
                                 — ProductStatus, ProductMarketingRole types added;
                                   Product interface added;
                                   Brand interface extended: slug, positioning, voiceTone,
                                   messagingPillars, brandAudience, products,
                                   brandStoryCapital, brandTopCreators, brandContentAngles,
                                   brandOutcomes, brandReferenceIndex

data/portfolio/helpers.ts
                                 — getBrandSlug, getBrandBySlug, getProductsByBrand helpers added

data/portfolio/accounts.ts
                                 — All 13 brands given explicit slug field;
                                   L'Oréal Paris: full dossier seed (11 sections);
                                   Maybelline: medium seed (positioning, voiceTone, 3 products);
                                   Dove: medium seed (positioning, audience, 2 products, outcomes);
                                   La Roche-Posay: slug + positioning + 2 products;
                                   All others: slug only

app/knowledge-base/client-insight/portfolio.module.css
                                 — .viewBrandLink, .viewBrandArrow, .brandDividerNameLink
                                   classes added (brand nav links)

app/knowledge-base/client-insight/portfolio/[accountSlug]/page.tsx
                                 — getBrandSlug imported;
                                   §02: "View brand →" Link added to each brand card;
                                   §13: brand sub-header span → Link (same style, hover underline)

app/knowledge-base/client-insight/portfolio/[accountSlug]/brand/[brandSlug]/brand.module.css
                                 — NEW: brand-specific styles (hero, status pills, stats strip,
                                   positioning/voice card, products grid, pitch & services card,
                                   brand creator grid, viewBrandLink)

app/knowledge-base/client-insight/portfolio/[accountSlug]/brand/[brandSlug]/page.tsx
                                 — NEW: server component, generateStaticParams for all brands,
                                   11 sections in 5 groups (A–E), Pattern A/B empty states
```

---

## Previous build (Ghost Empty-State Refinement, 2026-05-19)

Surgical empty-state refinement on the portfolio detail page. Replaced section-level "this section will populate…" placeholder cards with two patterns: **Pattern A** (field sections always render structure with labels + italic muted "Not yet captured" values) and **Pattern B** (list sections render N dashed-border ghost cards mirroring the real card layout). `SectionEmpty` component removed. `FieldMuted` component added. `icpRationale` moved from §01 to §03 exclusively. `npx tsc --noEmit` clean. `npm run build` succeeds (94 pages, 0 errors).

---

## Files modified (previous build)

```
app/knowledge-base/client-insight/portfolio.module.css
                                 — Ghost utility classes appended:
                                   .fieldMuted (inline italic muted text);
                                   .ghostCard (standalone: dashed border + 55% opacity);
                                   .ghostRow (list rows inside bordered container);
                                   .ghostText (italic muted text override);
                                   .ghostPill (dashed pill badge);
                                   .ghostAvatar (dashed circle avatar);
                                   .ghostDot (dashed small circle dot);
                                   .ghostIconBox (dashed 22×22px rectangle, project icon)

app/knowledge-base/client-insight/portfolio/[accountSlug]/page.tsx
                                 — SectionEmpty component REMOVED;
                                   FieldMuted component added;
                                   §01: icpRationale removed (consolidated to §03);
                                   §03: ghost contact rows (3) when keyContacts empty;
                                         icpRationale added below contact list;
                                   §04: Pattern A — always renders cmiCard,
                                         FieldMuted for missing categorySize/Growth/
                                         marketPosition/keyCompetitors;
                                   §05: Pattern A — always renders audienceCard,
                                         FieldMuted for missing demographic blocks;
                                   §06: Pattern B — ghost listItem rows (3) when
                                         goals/painPoints absent;
                                   §07: Pattern A — always renders solutionBlock,
                                         FieldMuted for missing servicesOverview;
                                   §08: Pattern B — 3 ghost metricCards when metrics absent;
                                         Pattern A — fieldMuted paragraph for missing narrative;
                                   §09: Pattern A for narrative/quotable/uniqueAngles;
                                         Pattern B — 2 ghost timeline items for moments;
                                   §10: Pattern A for creatorProfile fields;
                                         Pattern B — 3 ghost topPerformerCards;
                                   §11: Pattern B — 3 ghost angleCCards;
                                   §12: Pattern B — 3 ghost coPromoRows;
                                   §13: Pattern B — 1 ghost pjCard per brand with 0 projects;
                                         addProjectCard now only shows when project list > 0;
                                   §14: conditional && guard removed — always renders section
```

---

## Empty-state pattern assignments

| Section | Pattern | Ghost count |
|---|---|---|
| §01 Portfolio Profile | A (grid always renders) | — |
| §02 Brand Portfolio | A (cards always render) | — |
| §03 ICP & Persona | B (ghost contact rows) | 3 |
| §04 CMI | A (cmiCard always renders) | — |
| §05 Audience | A (audienceCard always renders) | — |
| §06 The Brief | B (ghost list rows per column) | 3 + 3 |
| §07 Solution | A (solutionBlock always renders) | — |
| §08 Outcomes | B (ghost metric cards) + A (narrative) | 3 |
| §09 Story Capital | A (narrative/quotable/angles) + B (moments) | 2 |
| §10 Creator Match | A (profile fields) + B (top performers) | 3 |
| §11 Content Angles | B (ghost angle cards) | 3 |
| §12 Co-promo | B (ghost co-promo rows) | 3 |
| §13 Projects | B (ghost project card per empty brand) | 1 |
| §14 Reference Index | A (always renders, fieldMuted if empty) | — |

---

## TypeScript

`npx tsc --noEmit` — clean, 0 errors.
`npm run build` — 94 pages, 0 errors.
