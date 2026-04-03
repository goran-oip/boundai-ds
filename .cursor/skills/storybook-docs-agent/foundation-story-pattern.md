# Foundation Story Patterns

Foundation stories visualize design tokens. They live in `src/stories/foundations/`.

## Common Boilerplate

All foundation stories share this structure:

```ts
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

const meta = {
  title: 'Foundations/{Category}',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'One sentence describing what tokens this page covers.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj
```

No args, no argTypes, no component import. Foundation stories render pure HTML
using `lit` `html` templates with inline styles that reference design tokens.

---

## Pattern A: Color Swatch Grid

Used by `Colors.stories.ts` and `ComponentUtility.stories.ts`.

### Helper functions (paste into the story file):

```ts
function sectionSlug(title: string) {
  return title.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
}

function section(title: string, rows: { label: string; varName: string }[]) {
  const sid = sectionSlug(title)
  return html`
    <section style="margin-bottom:2rem;" aria-labelledby=${`sec-${sid}`}>
      <h3
        id=${`sec-${sid}`}
        style="font-family:var(--font-family-display);font-size:1rem;font-weight:600;margin:0 0 0.75rem;color:var(--color-text-heading);"
      >
        ${title}
      </h3>
      <div
        style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:0.5rem 1rem;"
        role="list"
      >
        ${rows.map(
          ({ label, varName }) => html`
            <div style="display:flex;align-items:center;gap:0.5rem;" role="listitem">
              <div
                role="img"
                aria-label=${`${label}: ${varName}`}
                style="width:2.5rem;height:2rem;border-radius:6px;flex-shrink:0;border:1px solid var(--color-border-secondary);background:var(${varName});"
              ></div>
              <div style="min-width:0;">
                <div
                  style="font-size:11px;font-family:var(--font-family-mono);color:var(--color-text-muted);word-break:break-all;"
                >
                  ${varName}
                </div>
              </div>
            </div>
          `,
        )}
      </div>
    </section>
  `
}
```

### Rendering a color scale

Each exported story wraps sections in a page container:

```ts
export const Palette: Story = {
  render: () => html`
    <div
      style="padding:1.5rem;max-width:960px;font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);"
    >
      ${section('Gray (light mode)', [
        { label: '25', varName: '--color-gray-light-mode-25' },
        { label: '50', varName: '--color-gray-light-mode-50' },
        // ... full scale
      ])}
    </div>
  `,
}
```

### How to add a new color group

1. Read the token file — find all `--color-{group}-{step}` variables
2. Create a `{ label, varName }` array for each step
3. Wrap in a `section('Group Name', [...])` call
4. Add to an existing story or create a new exported story

### Organizing stories for large token sets

Split into multiple exported stories by logical grouping:
- `Palette` — primitives (base, gray, brand, error, warning, success)
- `TextSemantic` — `Colors/Text/*` semantic tokens
- `SemanticAndEffects` — app aliases, derived surfaces, shadows, status semantics
- `Alpha` — alpha white / black
- `UtilityGrayAndBrand` — utility gray + brand
- `UtilitySemantic` — utility error / warning / success
- `UtilityBlueScales` — utility gray-blue / blue-light / blue / blue-dark
- `UtilityAccentHues` — utility indigo / purple / fuchsia / pink / orange

---

## Pattern B: Typography Sample Rows

Used by `Typography.stories.ts`.

### Helper function:

```ts
function tokenRow(cssVar: string, sampleStyle: string) {
  return html`
    <div
      style="display:grid;grid-template-columns:minmax(160px,1fr) minmax(180px,2fr);gap:1rem;align-items:baseline;padding:0.75rem 0;border-bottom:1px solid var(--color-border-secondary);"
    >
      <code style="font-size:11px;color:var(--color-text-muted);word-break:break-all;">${cssVar}</code>
      <span style="${sampleStyle}">The quick brown fox jumps over the lazy dog.</span>
    </div>
  `
}
```

### Usage:

```ts
tokenRow(
  '--font-size-display-xl / --line-height-display-xl',
  `font-family:var(--font-family-display);font-size:var(--font-size-display-xl);line-height:var(--line-height-display-xl);font-weight:var(--font-weight-regular);letter-spacing:var(--letter-spacing-display-tight);`,
)
```

### Section structure for typography:

1. **Font weight** — one row per weight, all at same font-size-text-md
2. **Display sizes** — one row per display-{2xl..xs}, use font-family-display
3. **Text sizes** — one row per text-{xl..xs}, use font-family-body

Letter spacing rules:
- Display 2xl through md: `var(--letter-spacing-display-tight)`
- Display sm, xs, and all text sizes: `var(--letter-spacing-none)`

---

## Pattern C: Spacing / Radius Visualizer

Used by `Spacing.stories.ts`.

### Spacing: sized square blocks

```ts
const spacingTokens = [
  { name: '--spacing-xxs', px: '2' },
  { name: '--spacing-xs', px: '4' },
  // ...
]

// Render each as a colored square whose width & height = the token value
html`
  <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem;">
    <code style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);width:160px;">
      ${t.name}
    </code>
    <span style="font-size:11px;color:var(--color-text-quaternary-500);width:40px;">${t.px}px</span>
    <div style="height:var(${t.name});width:var(${t.name});min-width:2px;min-height:2px;background:var(--color-interactive-accent);border-radius:2px;"></div>
  </div>
`
```

### Radius: fixed-size boxes with varying border-radius

```ts
const radiusTokens = [
  { name: '--radius-xs', px: '4' },
  // ...
]

// Render each as a 64x64 box with the token as border-radius
html`
  <div style="text-align:center;">
    <div style="width:64px;height:64px;background:var(--color-interactive-accent-muted);border:2px solid var(--color-interactive-accent);border-radius:var(${t.name});"></div>
    <code style="display:block;margin-top:0.5rem;font-size:11px;">${t.name}</code>
    <span style="font-size:10px;">${t.px}px</span>
  </div>
`
```

---

## Adding Tokens from a New CSS File

When a new token file is created or `tokens.css` gains a new section:

1. Parse the `:root { }` blocks — extract every `--{name}: {value};` line
2. Group by naming prefix (e.g. all `--color-utility-indigo-*` are one group)
3. Decide which foundation story file it belongs to:
   - Color primitives/semantics → `Colors.stories.ts`
   - Alpha / utility palettes / spacing / radius → `ComponentUtility.stories.ts`
   - Typography → `Typography.stories.ts`
   - Spacing-only → `Spacing.stories.ts`
4. Add a new exported story or append to an existing section
5. Follow the swatch grid pattern (Pattern A) for colors, typography row pattern
   (Pattern B) for font tokens, spacing visualizer (Pattern C) for spacing/radius

## Page Container

Every story's `render` wraps content in:

```ts
html`
  <div style="padding:1.5rem;max-width:960px;font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);">
    <!-- sections here -->
  </div>
`
```

This ensures consistent layout, token-based colors, and a readable max width.
