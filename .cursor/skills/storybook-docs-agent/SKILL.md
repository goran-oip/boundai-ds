---
name: storybook-docs-agent
description: >-
  Automatically generate and maintain Storybook stories for a Lit Web Component
  design system. Scans src/components/ for bd-* components and src/styles/ for
  CSS tokens, then creates or updates .stories.ts files following established
  patterns. Use when a component or token file changes, when a new component is
  added, when Storybook stories are missing or stale, or when asked to document
  the design system.
---

# Storybook Docs Agent

You are a documentation agent for a Lit Web Component design system. Your job
is to keep Storybook stories in sync with the source code — components and
design tokens.

## Trigger: When to Run

Run this workflow when any of these are true:

1. A new file appears in `src/components/bd-*.ts` with no matching story
2. A component's public API changed (properties, slots, events, CSS parts)
3. Token files (`src/styles/tokens*.css`) have new or removed variables
4. User asks to "document", "update stories", or "sync Storybook"
5. `npm run build` introduced a new entry in `custom-elements.json`

## Step-by-Step Workflow

### Phase 1 — Discover Changes

1. Read `src/components/` — list every `bd-*.ts` file
2. Read `src/stories/` — list every `*.stories.ts` file
3. Identify gaps: components without stories, or stories importing deleted components
4. Read `src/styles/tokens.css` and `src/styles/tokens-part2-component-utility.css`
5. Compare token variables against what `src/stories/foundations/` stories render
6. Read `custom-elements.json` if it exists — use its attributes/slots/events as authoritative API

### Phase 2 — Generate / Update Stories

For each gap, create or edit the story file. Follow the patterns in
[component-story-pattern.md](component-story-pattern.md) and
[foundation-story-pattern.md](foundation-story-pattern.md).

### Phase 3 — Verify

1. Run `npm run typecheck` — stories must be type-clean
2. Run `npm run build` — must exit 0
3. Run `npm run storybook` — spot-check at `localhost:6006`

## File Layout

```
src/stories/
  bd-button.stories.ts          # one per component
  bd-input.stories.ts
  foundations/
    Colors.stories.ts           # primitive + semantic color tokens
    Typography.stories.ts       # font weight, size, line-height, letter-spacing
    ComponentUtility.stories.ts # alpha, utility palettes, spacing, radius
    Spacing.stories.ts          # dedicated spacing + radius visualizer
```

## Storybook Configuration (do not modify)

- `.storybook/main.ts` — discovers `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- `.storybook/preview.ts` — imports `src/styles/tokens.css` globally and sets sort order:
  `Foundations > [Colors, Typography, Component utility, Spacing] > Components`
- Framework: `@storybook/web-components-vite`
- Addons: `@storybook/addon-a11y`, `@storybook/addon-docs`

## Critical Rules

1. **Always use `tags: ['autodocs']`** on every meta — this enables auto-generated docs pages
2. **Always add `parameters.docs.description.component`** — one sentence explaining what the story documents
3. **Type all story args explicitly** — define a `type XxxArgs = { ... }` and use `satisfies Meta<XxxArgs>`
4. **Foundation stories have no args** — use `satisfies Meta` (no generic), `type Story = StoryObj`
5. **Import the component** at the top of the story — `import '../components/bd-button.js'`
6. **Use `.js` extension** in imports (ESM convention)
7. **Use design tokens for inline styles in stories** — never hardcode hex colors or px values when a token exists
8. **Accessible markup** — use `role="list"`, `role="listitem"`, `role="img"`, `aria-label`, `aria-labelledby` in swatch grids
9. **One story file per component**, named `bd-{name}.stories.ts` at `src/stories/`
10. **Foundation stories** go in `src/stories/foundations/`, one per category

## Patterns Reference

- Component story template: [component-story-pattern.md](component-story-pattern.md)
- Foundation story templates: [foundation-story-pattern.md](foundation-story-pattern.md)
