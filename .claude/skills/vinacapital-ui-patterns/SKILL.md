---
name: vinacapital-ui-patterns
description: Detailed UI implementation reference for the VinaCapital MKT Infrastructure tool. Load when creating or modifying any page, section, component, or stylesheet. Covers the full color palette, typography table, ghost CSS classes, section structure rhythm, hero patterns, status pill maps, and drawer patterns. The foundational rules (Helvetica Now + Georgia, VinaCapital Red, transparency pattern, 0.5px borders) live in CLAUDE.md — this skill carries the implementation specifics.
---

# VinaCapital UI Patterns — Implementation Reference

Detailed implementation reference for the visual and UI rules. The high-level rules (Helvetica Now + Georgia, VinaCapital Red, 0.5px borders, transparency pattern) are in the project root `CLAUDE.md`. This skill contains the specifics: color tokens, typography table, ghost CSS classes, section rhythm, status pill maps, hero pattern, etc.

If a rule appears in both files and they conflict, `CLAUDE.md` wins.

---

## Color palette (full tokens)

Use these exact values. Don't introduce new colors without updating this skill first.

| Token            | Hex       | Usage                                                         |
|------------------|-----------|---------------------------------------------------------------|
| Brand red        | `#D71920` | Primary actions, accents, brand chips                         |
| Red-pale         | `#FCEBEC` | Stats strip background, status pill background (contracted)   |
| Red-light        | `#F7D0D2` | Subtle red zones, hover states                                |
| Black            | `#1A1A1A` | Primary text, h1 / h2                                         |
| Dark gray        | `#535353` | Body text, subtitle text                                      |
| Medium gray      | `#727272` | Secondary text, meta lines                                    |
| Light gray       | `#A3A3A3` | Muted text, "Not yet captured", field labels                  |
| Ghost border     | `#D3D3D3` | Dashed borders on ghost elements                              |
| Standard border  | `#E6E6E6` | Solid 0.5px borders on cards                                  |
| Subtle divider   | `#F5F5F5` | Footer separators inside cards, hairlines                     |
| Page background  | `#FAFAFA` | App background where cards sit on contrast                    |

### Status pill background tints

Subtle tinted backgrounds for pills. Border-radius 4px or pill-shaped. Padding 4px 10px.

| Status           | Background  | Text color |
|------------------|-------------|------------|
| Navy-pale¹       | `#EAECF2`   | `#333B52`  |
| Blue-pale        | `#EAF1FA`   | `#1E4E8C`  |
| Amber-pale       | `#FBF3E2`   | `#7A5A14`  |
| Gray-pale        | `#F0F0F0`   | `#535353`  |
| Red-pale         | `#FCEBEC`   | `#B0141A`  |

¹ Navy-pale replaces the former green "success / active" tint. Green has been
purged from the UI — `active`, `high`, `reviewed`, and other positive states now
use the navy tint, not green. Red stays exclusive to the VinaCapital brand accent.

---

## Typography

Use Helvetica Now (system fallback: Helvetica / Arial, per the brand book). Use Georgia for serif / editorial display accents (proof numbers, pull quotes). Sizes and weights:

| Element            | Size  | Weight | Color     | Notes                                  |
|--------------------|-------|--------|-----------|----------------------------------------|
| h1 hero            | 28px  | 800    | `#1A1A1A` | line-height 1.1                        |
| h2 section group   | 18px  | 700    | `#1A1A1A` | rare; mostly use group eyebrows        |
| Section title      | 12px  | 700    | `#1A1A1A` | uppercase, letter-spacing 0.08em       |
| Section subtitle   | 12.5px| 400    | `#535353` | italic                                 |
| Group eyebrow      | 11px  | 700    | `#D71920` | uppercase, letter-spacing 0.1em        |
| Field label        | 11px  | 700    | `#A3A3A3` | uppercase, letter-spacing 0.08em       |
| Field value        | 13px  | 500    | `#1A1A1A` |                                        |
| Body paragraph     | 13.5–14px| 400 | `#535353` | line-height 1.6                        |
| Card title         | 15.5px| 700    | `#1A1A1A` |                                        |
| Card sub-line      | 11.5px| 400    | `#727272` |                                        |
| Eyebrow / meta     | 11.5px| 600    | `#727272` | uppercase optional                     |
| Stats value        | 22–28px| 800   | `#1A1A1A` | for stats strips                       |
| Stats label        | 10–11px| 700   | `#A3A3A3` | uppercase, letter-spacing 0.08em       |
| Muted "not captured"| inherit| 400 | `#A3A3A3` | italic                                 |

---

## Ghost element CSS utilities

Every detail page's CSS module must include these classes. They support the transparency pattern.

```css
.ghostCard {
  border: 0.5px dashed #D3D3D3 !important;
  background: transparent;
  opacity: 0.55;
}

.ghostText {
  font-style: italic;
  color: #A3A3A3;
  font-weight: 400;
}

.fieldMuted {
  font-style: italic;
  color: #A3A3A3;
  font-weight: 400;
}

.ghostPill {
  background: transparent;
  border: 0.5px dashed #D3D3D3;
  color: #A3A3A3;
  font-style: italic;
}

.ghostAvatar {
  border: 0.5px dashed #D3D3D3;
  background: transparent;
  color: transparent;
}

.ghostDot {
  background: transparent !important;
  border: 0.5px dashed #D3D3D3;
}
```

---

## Section structure rhythm

Every section on a detail page follows this rhythm:

1. **Group divider** (above the first section of each group):
   - Eyebrow text: "Group X · Group Name" in 11px/700 red uppercase
   - Followed by a horizontal hairline (`0.5px solid #E6E6E6`)
   - Vertical space above and below: 48px

2. **Section header**:
   - Section chip: 24×24 rounded square with red bg (`#D71920`), white text, the section number in 12px/700. Border-radius 6px.
   - Section title: 12px/700 uppercase `#1A1A1A`, letter-spacing 0.08em, positioned to the right of the chip with 12px gap
   - Section subtitle: 12.5px italic `#535353`, on the line below, max-width ~70% of container

3. **Section body**: appropriate content per pattern (A or B)
   - 24px gap below the header

4. **Inter-section spacing**: 32–40px vertical space between sections in the same group

---

## Hero pattern on detail pages

Used at the top of every entity detail page (portfolio, brand, source, etc.).

### Layout

- **Breadcrumb** (above identity row, 12px #727272): "Knowledge Base › Section › Parent › Entity Name"
- **Identity row**: two-column flex with left content and right actions
- **Stats strip**: below identity row, red-pale background, 3–4 cells

### Left column of identity row

- **Tiny parent label** (above h1, 11px/600 uppercase #A3A3A3 with letter-spacing 0.08em):
  - Format: "{ENTITY TYPE} · {Parent Context}"
  - Example: "BRAND · L'Oréal VN — Consumer Products"
- **h1** (28px/800 #1A1A1A, line-height 1.1, margin-top 4px): the entity name
- **Meta line** (13px #535353, margin-top 8px): comma-separated key facts
  - Example: "Consumer Products · Women 25-45 · Active · Engaged Feb 2024"

### Right column of identity row

- **Status pill** (large variant: padding 6px 14px, 12px text): color-coded by entity status
- **Action buttons**: Edit, Delete, etc. — small ghost-style buttons (transparent bg, gray border, hover red)

### Stats strip

- Red-pale background (`#FCEBEC`), 1px solid `#F7D0D2`, border-radius 8px
- Padding 16px 24px
- Flex row, 3–4 cells equally spaced
- Each cell:
  - Stats label (10–11px/700 uppercase #A3A3A3, letter-spacing 0.08em)
  - Stats value (22–28px/800 #1A1A1A), bottom margin
  - Optional small sub-text below value (11px #727272)

---

## Status pill color maps

### Brand and project status

| Status        | Background     | Label            |
|---------------|----------------|------------------|
| `active`      | navy-pale     | "ACTIVE"         |
| `pitched`     | blue-pale      | "PITCHED"        |
| `prospect`    | gray-pale      | "PROSPECT"       |
| `contracted`  | red-pale       | "CONTRACTED"     |
| `paused`      | amber-pale     | "PAUSED"         |

### Product status

| Status        | Background     | Label            |
|---------------|----------------|------------------|
| `hero`        | red-pale       | "HERO"           |
| `active`      | navy-pale     | "ACTIVE"         |
| `upcoming`    | blue-pale      | "UPCOMING"       |
| `considered`  | amber-pale     | "CONSIDERED"     |
| `sunset`      | gray-pale      | "SUNSET"         |

### Insight confidence

| Confidence    | Background     | Label            |
|---------------|----------------|------------------|
| `high`        | navy-pale     | "HIGH"           |
| `medium`      | blue-pale      | "MEDIUM"         |
| `low`         | amber-pale     | "LOW"            |
| `speculative` | gray-pale      | "SPECULATIVE"    |

### Source type

| Type             | Background  | Label            |
|------------------|-------------|------------------|
| `pdf`            | red-pale    | "PDF"            |
| `url-collection` | blue-pale   | "URL COLLECTION" |

---

## Drawer pattern (AI sidebars and modals)

Used for: Vision Companion, Research Companion, future AI sidebars, and large modal forms.

### Structure

- **Backdrop**: full-viewport overlay, `rgba(26, 26, 26, 0.4)`, fade-in animation 0.2s
- **Drawer**: fixed right side, 480px wide on desktop (≥768px), 100vw on mobile
- **Animation**: `transform: translateX(0)` from `translateX(100%)`, transition 0.3s cubic-bezier ease
- **Z-index**: drawer 100, backdrop 90, page content default

### Layout inside drawer

- **Header** (sticky top):
  - Title (16px/700 #1A1A1A)
  - Subtitle (12px #727272)
  - Optional stats line (11.5px #A3A3A3)
  - Close X button (top-right, 24×24, ghost style)
  - Padding 20px 24px, border-bottom 0.5px solid #E6E6E6
- **Body** (scrollable, padding 20px 24px)
- **Footer** (sticky bottom, optional):
  - Textarea/input + send button row
  - Padding 16px 24px, border-top 0.5px solid #E6E6E6

### Close behavior

- ESC key
- Backdrop click
- X button

### Floating trigger button (for AI companions)

- Position: fixed, bottom 24px, right 24px
- Z-index: 50 (above content, below modals)
- Visual: pill shape, 48px height, padding 0 20px
  - Background: `#D71920`
  - Text: white, 13.5px/600
  - Icon (left of text): 16px sparkle or message-question icon
  - Box-shadow: `0 4px 16px rgba(215, 25, 32, 0.3)`
- Hover: scale 1.03, deeper shadow
- Mobile: collapse to icon-only circle button (48×48)

---

## Card patterns

### Standard card

- Background: `#FFFFFF`
- Border: 0.5px solid `#E6E6E6`
- Border-radius: 8px
- Padding: 18–24px (use 24px for primary content cards, 18px for compact items)
- Box-shadow: none by default (the borders carry the structure)

### Clickable card (entity card, insight card, etc.)

- Same as standard card +
- Cursor: pointer
- Hover: border `#D3D3D3`, background `#FAFAFA`
- Transition: 0.15s ease

### Stats strip cell

- Background: `#FCEBEC`
- Border-radius: 8px (the whole strip, not individual cells)
- Padding: 16px 24px (on the strip; cells use flex spacing)

### Footer separator inside card

- Border-top: 0.5px solid `#F5F5F5`
- Margin-top 12px, padding-top 12px

---

## Standard empty-state copy

| Context                       | Text                                           |
|-------------------------------|------------------------------------------------|
| Empty text field              | "Not yet captured"                             |
| Empty numeric metric          | `—`                                            |
| Empty pill row                | "Not yet captured"                             |
| No projects under brand       | "No projects yet for {brand.name}"             |
| No tags                       | "No tags yet"                                  |
| AI summary not generated      | "AI summary not yet generated"                 |
| No insights for entity        | "No research yet applies to this {entity}"     |
| No services contracted        | "None yet contracted"                          |
| No services deployed (product)| "No services deployed yet"                     |
| Empty list (generic)          | "{Item} not yet captured"                      |

Always render muted text in italic, color `#A3A3A3`, using `.fieldMuted` or `.ghostText`.

---

## Reference implementations

When building a new detail page, use these as canonical models:

- **Portfolio detail page** — `app/knowledge-base/client-insight/portfolio/[accountSlug]/page.tsx`: 14 sections, all patterns demonstrated
- **Brand detail page** — `app/knowledge-base/client-insight/portfolio/[accountSlug]/brand/[brandSlug]/page.tsx`: 11 sections, leaner variant
- **Source detail page** — `app/knowledge-base/research/sources/[id]/page.tsx`: 4 sections, demonstrates source content rendering
- **Drawer pattern** — `components/VisionCompanion.tsx`: canonical AI sidebar
- **Floating trigger** — `components/research/ResearchCompanionTrigger.tsx`: canonical floating button

New pages should match the structure of the closest reference, not invent new patterns.
