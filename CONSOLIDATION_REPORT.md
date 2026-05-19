# Consolidation Audit Report
_Generated: 2026-05-19_

## Executive Summary

Audit of the Research & Insights arc (Prompts 1–5) and surrounding codebase. **11 findings** requiring action (3 critical, 5 important, 3 minor) + 4 suggestions. The overall codebase is well-structured and consistent; most issues are isolated fixable bugs rather than systemic problems.

**Total findings: 15** (3 critical · 5 important · 3 minor · 4 suggestions)

---

## Critical Issues

### C-001 — `app/api/foundation-lab/route.ts` has no auth check

**File**: `app/api/foundation-lab/route.ts`  
**Severity**: Critical — unauthenticated POST endpoint exposed to anyone who can reach the server.

**Problem**: The route accepts POST requests and executes against the AI/DB without verifying the caller is a logged-in user. Every other API route in this project calls `auth()` and returns 401 if the session is absent. This one does not.

**Fix**:
```ts
import { auth } from '@/lib/auth';
// at the top of the handler:
const session = await auth();
if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
```

---

### C-002 — `ResearchQuery` model missing `updatedAt`

**File**: `prisma/schema.prisma`  
**Severity**: Critical — inconsistent schema; Prisma best practice violated; query log records can't be distinguished from stale entries.

**Problem**: Every other model in the schema has `updatedAt DateTime @updatedAt`. `ResearchQuery` has only `createdAt`. Query records are immutable in practice, but omitting `updatedAt` breaks any generic "last modified" tooling and creates an inconsistency that will cause confusion.

**Fix** — add to `ResearchQuery`:
```prisma
updatedAt DateTime @updatedAt
```
Then run `prisma db push`.

---

### C-003 — `(anthropic.messages.create as Function)(...)` type-unsafe cast in extract route

**File**: `app/api/research/sources/[id]/extract/route.ts`  
**Severity**: Critical — the cast bypasses TypeScript's safety for the PDF beta header, hiding any future API surface change until runtime.

**Problem**: The Anthropic SDK's `messages.create` does not accept `betas` in its official type. Rather than use a typed workaround, the extract route casts the entire method to `Function`, losing all parameter safety.

**Temporary mitigation** (use until SDK officially supports PDF):
```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const response = await (anthropic.messages as any).create({ ... });
```
Using `as any` on the narrowest possible expression is safer than casting the method itself to `Function`. Track the `anthropic-beta: pdfs-2024-09-25` header removal when the SDK graduates PDF support.

---

## Important Issues

### I-001 — CLAUDE.md AI integration docs incorrect (SDK not direct fetch)

**File**: `CLAUDE.md`  
**Severity**: Important — will mislead any engineer following the documented pattern.

**Problem**: CLAUDE.md documents AI calls as direct `fetch` to the Anthropic API. The actual codebase uses `@anthropic-ai/sdk` via `import Anthropic from '@anthropic-ai/sdk'` and `new Anthropic({ apiKey })`. The documented pattern (`fetch(ANTHROPIC_URL, { headers: { 'x-api-key': key } })`) does not match any file in the repo.

**Fix**: Update CLAUDE.md AI integration section to document the SDK pattern.

---

### I-002 — CLAUDE.md documents `getAnthropicKey(userId)` but function takes no args

**File**: `CLAUDE.md` / `lib/get-api-key.ts`  
**Severity**: Important — any new route written from the docs will pass an argument that is silently ignored.

**Problem**: CLAUDE.md shows `const key = await getAnthropicKey(session.user.id)`. The actual function signature is `getAnthropicKey()` with no parameters. The userId argument is ignored.

**Fix**: Update CLAUDE.md to show `const key = await getAnthropicKey()`.

---

### I-003 — CLAUDE.md documents wrong model; extraction/companion use `claude-opus-4-7`

**File**: `CLAUDE.md`  
**Severity**: Important — engineers using the docs will instantiate the wrong model for heavy extraction tasks.

**Problem**: CLAUDE.md lists `claude-sonnet-4-6` as the model. The PDF extraction route and Research Companion route both use `claude-opus-4-7`. Only suggestion routes use sonnet.

**Fix**: Update CLAUDE.md to distinguish: `claude-sonnet-4-6` for lightweight suggestion routes; `claude-opus-4-7` for extraction and companion routes.

---

### I-004 — ResearchCompanion floating trigger position off-spec

**File**: `components/research/ResearchCompanion.module.css`  
**Severity**: Important — deviates from the canonical spec in the UI Patterns skill.

**Problem**: The SKILL.md spec says the floating trigger should be `bottom: 24px; right: 24px; z-index: 50`. The ResearchCompanion trigger currently has `bottom: 28px; right: 28px; z-index: 90`.

**Fix**:
```css
.trigger {
  bottom: 24px;
  right: 24px;
  z-index: 50;
}
```

---

### I-005 — `(user as any).role` casts in `lib/auth.config.ts`

**File**: `lib/auth.config.ts`  
**Severity**: Important — suppresses type errors that could surface real bugs.

**Problem**: Multiple places in auth.config.ts cast `user` or `session.user` to `any` to access `.role`. The User type from Prisma has `role: Role` typed; the NextAuth session user type does not include it by default. This should be solved via module augmentation (`next-auth.d.ts`) rather than runtime casts.

**Fix**: Add `next-auth.d.ts` with:
```ts
import type { Role } from '@/lib/generated/prisma';

declare module 'next-auth' {
  interface User { role: Role; }
  interface Session {
    user: { role: Role } & DefaultSession['user'];
  }
}
```
Then remove `as any` casts in auth.config.ts.

---

## Minor Issues

### M-001 — Drawer z-index differs from spec

**File**: `components/research/ResearchCompanion.module.css`  
**Severity**: Minor — visual stacking may be wrong in edge cases.

**Problem**: SKILL.md specifies drawer z-index 100, backdrop z-index 90. ResearchCompanion uses drawer z-index 101, backdrop z-index 100. VisionCompanion (canonical) uses the spec values. The +1 offset is harmless now but will cause the drawers to stack incorrectly if both are ever open simultaneously.

**Fix**: Align to spec: drawer 100, backdrop 90.

---

### M-002 — ResearchCompanion trigger uses `var(--black)` instead of `var(--red)`

**File**: `components/research/ResearchCompanion.module.css`  
**Severity**: Minor — visual inconsistency with the AI companion pattern.

**Problem**: SKILL.md specifies the floating AI trigger background as `#F43C34` (brand red). The Research Companion trigger uses `background: var(--black)`. VisionCompanion uses red. This makes the Research Companion visually inconsistent with the established pattern.

**Fix**:
```css
.trigger {
  background: var(--red);
  box-shadow: 0 4px 16px rgba(244, 60, 52, 0.3);
}
```

---

### M-003 — `InsightListItem` uses inline `style` prop instead of CSS module class

**File**: `components/research/InsightListItem.tsx`  
**Severity**: Minor — violates the project's CSS Modules–only convention.

**Problem**: In `source-link` mode, the outer `<a>` has `style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}` as an inline style. The project uses CSS Modules exclusively; inline styles are not used anywhere else.

**Fix**: Move the three declarations to a `.sourceLink` class in `InsightListItem.module.css` and apply it via `className`.

---

## Suggestions

### S-001 — Type session user more strictly in API routes

Several routes do `session.user as { id: string; role: string }`. After I-005 is fixed (module augmentation in place), these casts can be removed and the role check becomes `session.user.role === 'ADMIN'` directly.

---

### S-002 — Document model selection rationale in CLAUDE.md

Add a one-paragraph note explaining why `claude-opus-4-7` is used for extraction/companion (quality, 60s limit headroom, library size) vs `claude-sonnet-4-6` for suggestions (latency-sensitive, simpler task). This prevents future engineers from "optimizing" extraction to sonnet without understanding the tradeoff.

---

### S-003 — Centralize model name constants

Both extract and companion routes hardcode the string `"claude-opus-4-7"`. Consider extracting to `lib/ai-models.ts`:
```ts
export const EXTRACTION_MODEL = 'claude-opus-4-7';
export const COMPANION_MODEL  = 'claude-opus-4-7';
export const SUGGESTION_MODEL = 'claude-sonnet-4-6';
```
This makes model upgrades a one-line change and makes intentional model choices discoverable.

---

### S-004 — Track `anthropic-beta: pdfs-2024-09-25` removal

The PDF beta header and the `as any` cast in the extract route should be removed once Anthropic graduates PDF support to stable SDK. Add a TODO comment in the extract route pinned to the beta flag:
```ts
// TODO: remove as-any cast + beta header when SDK officially supports PDF
```

---

## Consolidation Opportunities

1. **Auth guard helper**: 8 routes repeat the same 3-line auth check. A `requireAuth()` helper in `lib/api-helpers.ts` returning `{ session, user } | { response: NextResponse }` would DRY this up — low priority since the pattern is consistent.

2. **Insight type duplication**: `InsightWithSource` is defined in both `components/research/InsightListItem.tsx` and `components/research/RelevantResearchSection.tsx`. Extract to `lib/research/types.ts`.

3. **`SOURCE_SELECT` constant**: Defined inline in `lib/research/helpers.ts` and also repeated in the companion route. Move to `lib/research/constants.ts`.

---

## Recommended Fix Order

| Priority | ID    | Effort | Fix                                               |
|----------|-------|--------|---------------------------------------------------|
| 1        | C-001 | 5 min  | Add auth check to foundation-lab route            |
| 2        | C-002 | 2 min  | Add `updatedAt` to ResearchQuery + db push        |
| 3        | C-003 | 5 min  | Replace `as Function` with `as any` on expression |
| 4        | I-001 | 15 min | Update CLAUDE.md AI integration docs              |
| 5        | I-002 | 2 min  | Fix `getAnthropicKey()` docs (no args)            |
| 6        | I-003 | 5 min  | Document correct model per route type             |
| 7        | I-004 | 2 min  | Fix trigger bottom/right/z-index to spec          |
| 8        | M-002 | 2 min  | Fix trigger background to `var(--red)`            |
| 9        | I-005 | 20 min | Add next-auth.d.ts, remove `as any` role casts    |
| 10       | M-001 | 2 min  | Align drawer z-index to spec (101→100, 100→90)    |
| 11       | M-003 | 5 min  | Move inline styles to CSS module class            |

---

## Things That Look Good

1. **Auth pattern is consistent across all routes** — `import { auth } from '@/lib/auth'`; `if (!session?.user)` guard; `session.user.id` access. No route uses the wrong import path.

2. **DB import is consistent** — `import { db } from '@/lib/db'` everywhere. No stray `prisma` imports.

3. **No `SessionProvider` misuse** — SessionProvider is only in layout; no route or server component incorrectly wraps with it.

4. **DM Sans applied consistently** — `var(--font-sans)` used in all CSS modules; no hardcoded font-family strings.

5. **0.5px borders applied consistently** — All borders in new components (companion drawer, insight cards, query admin page) use `0.5px solid`.

6. **`getAnthropicKey()` called correctly in all routes** — No args, awaited, key passed to `new Anthropic({ apiKey })`. Pattern is uniform.

7. **AI prompts are well-crafted** — `COMPANION_SYSTEM_PROMPT` grounds the model in the insight library, demands citations in `[#id]` format, explicitly forbids fabrication, and tells Claude to flag gaps. Clean, purposeful system prompt.

8. **Citation parsing is correct** — Regex `/\[#([a-z0-9]+)\]/g` correctly matches CUID fragments; `citationMap` correctly maps insightId → sourceId; `renderAnswer` gracefully degrades for unresolved citations.

9. **Settings page respects transparency pattern** — `/settings/research-queries` uses ghost cards for the empty state and renders a CTA explaining how queries appear. Consistent with D-008.

10. **Cross-linking is zero-schema-change** — `RelevantResearchSection` uses the existing `applicabilityPortfolios`/`applicabilityBrands` fields already on every Insight. GIN indexes are additive. The portfolio and brand pages remain server components.
