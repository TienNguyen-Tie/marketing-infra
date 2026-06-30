# Design Tokens

Canonical reference for the VinaCapital design system tokens used across the project.
Source of truth: `app/globals.css` `:root` (rendered at `/knowledge-base/brand-system/design-guidelines/general-tokens`).

Brand source: VinaCapital Brand Book v1.0 (2022).

---

## Typography tokens

| Token | Value |
|---|---|
| `--font-sans` | `'Helvetica Now Text', 'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif` |
| `--font-serif` | `Georgia, 'Times New Roman', serif` |
| `--font` | `var(--font-sans)` |

VinaCapital's primary typefaces are **Helvetica Now** (sans) and **Georgia** (serif).
Neither is loaded from Google Fonts:

- **Helvetica Now** is a licensed typeface. The stack falls back to the system
  Helvetica / Arial fonts named in the brand book ("Arial" is the documented
  substitute for Helvetica Now). If the licensed webfont is later self-hosted,
  add an `@font-face` and it will be picked up automatically — it's first in the stack.
- **Georgia** ships on every platform, so the serif needs no webfont. `Times New Roman`
  is the brand-book fallback.

There is no longer any `next/font` wiring — both stacks live entirely in
`app/globals.css` `:root`.

**Usage rules:**
- Use `var(--font-sans)` for all UI, headings, body, labels, buttons.
- Use `var(--font-serif)` for pull quotes, proof numbers, and editorial accent moments only.
- Never hardcode a font-family string in component CSS — always reference the token.

---

## Colour tokens

| Token | Value | Role |
|---|---|---|
| `--red` | `#D71920` | VinaCapital Red (Pantone 3546 C) — brand primary, CTAs, active states |
| `--red-dark` | `#B0141A` | Hover state for red elements |
| `--red-pale` | `#FCEBEC` | Light red tint, selected card bg, stats strip |
| `--red-light` | `#F7D0D2` | Red border, badge border |
| `--navy` | `#333B52` | VinaCapital Deep Blue — secondary / web surfaces |
| `--navy-dark` | `#162E38` | VinaCapital Darker Blue — sidebar, deep dark surfaces |
| `--off-white` | `#EDECE8` | VinaCapital Off-White — warm canvas accent |
| `--vc-gray` | `#C8C8C8` | VinaCapital Light Gray |
| `--black` | `#1A1A1A` | Primary text |
| `--gray-800` | `#272727` | Dark secondary text |
| `--gray-600` | `#535353` | Body secondary |
| `--gray-400` | `#A3A3A3` | Muted / placeholder |
| `--gray-200` | `#E6E6E6` | Borders, dividers |
| `--gray-100` | `#F5F5F5` | Hover backgrounds |
| `--gray-50` | `#FAFAFA` | Page canvas |
| `--white` | `#FFFFFF` | Component surface |
| `--border` | `#E6E6E6` | Default border |

> The `--red*` token names are historical (the system was previously green, then
> a different red). They now hold **VinaCapital Red** and its tints. The brand
> uses a single red — do not introduce a second accent red.

---

## Spacing

All spacing uses an 8px base grid. Common values: 4, 8, 12, 16, 20, 24, 32, 40, 48px.

---

## Border radius

| Use | Value |
|---|---|
| Small (chips, badges) | `4px` |
| Default (cards, inputs) | `8px` |
| Pills | `20px` |

---

## How to use these in CSS modules

```css
/* ✓ correct */
.myComponent {
  font-family: var(--font-sans);
  color: var(--black);
  border: 0.5px solid var(--gray-200);
  border-radius: 8px;
}

/* ✗ wrong — hardcoded */
.myComponent {
  font-family: 'Helvetica Neue', sans-serif;
  color: #1A1A1A;
}
```
