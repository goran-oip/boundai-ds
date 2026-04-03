---
name: lit-design-system
description: >-
  Scaffold a Lit Web Component design-system library with tokenized CSS from
  Figma, Storybook documentation, Custom Elements Manifest, and npm-ready
  packaging. Use when creating a new component library, adding components to an
  existing Lit DS, extracting Figma design tokens, or setting up Storybook for
  Web Components.
---

# Lit Design System — Project Skill

End-to-end workflow for building a publishable Web Component library with Lit,
design tokens from Figma, Storybook docs, and npm packaging.

## When to Use

- Scaffolding a new Lit + Vite + TypeScript component library
- Extracting Figma variables into CSS custom properties
- Adding a new `bd-*` component to the library
- Wiring Storybook autodocs for Web Components
- Preparing the package for npm publish

## Architecture Overview

```
src/
  index.ts               # barrel export — every component re-exported here
  components/
    bd-button.ts          # one file per component, self-registers
    bd-input.ts
  styles/
    tokens.css            # primitive + semantic tokens (:root custom properties)
    tokens-part2-component-utility.css  # utility colors, alpha, spacing, radius
  stories/
    bd-button.stories.ts
    foundations/
      Colors.stories.ts
      Typography.stories.ts
      ComponentUtility.stories.ts
      Spacing.stories.ts
.storybook/
  main.ts
  preview.ts              # imports tokens.css globally
dist/                     # build output (ES module + .d.ts)
custom-elements.json      # CEM manifest (auto-generated)
```

## Stack

| Concern         | Tool                                     |
|-----------------|------------------------------------------|
| Components      | Lit 3 (`LitElement`, decorators, `css`)  |
| Build           | Vite lib mode, ES format, Lit externalized |
| Types           | TypeScript, `tsconfig.build.json` for `.d.ts` emit |
| API manifest    | `@custom-elements-manifest/analyzer`     |
| Tokens          | CSS custom properties on `:root` (inherit into Shadow DOM) |
| Docs            | Storybook (`@storybook/web-components-vite`) |
| Accessibility   | `@storybook/addon-a11y`                  |

## Conventions

### Component naming

- Tag prefix: `bd-` (e.g. `bd-button`, `bd-input`)
- Class name: PascalCase matching tag without prefix (`BdButton`)
- One component per file in `src/components/`
- Self-registers via `@customElement('bd-*')`
- Always add to `HTMLElementTagNameMap` global declaration
- Always export from `src/index.ts`

### Token naming

Figma variable paths map to CSS custom properties:

```
Figma: Colors / {Group} / {name}
CSS:   --color-{group-kebab}-{name-kebab}

Figma: Font size / Display 2xl
CSS:   --font-size-display-2xl
```

Utility tokens that duplicate primitives must alias via `var()`, never
duplicate hex values.

### Storybook stories

- Components → `title: 'Components/bd-*'`
- Token docs → `title: 'Foundations/{Category}'`
- Always include `tags: ['autodocs']`
- Type story args explicitly, use `satisfies Meta<Args>`
- Import the component at the top of the story file

## Workflows

### 1. Scaffold a New Project

Follow the steps in [scaffold.md](scaffold.md).

### 2. Extract Figma Tokens

1. Get the Figma file URL + node ID for the token frame
2. Use the Figma MCP (`get_design_context`) to read variable collections
3. Map each variable to a CSS custom property following the naming convention
4. Place primitives in `tokens.css`, component/utility tokens in `tokens-part2-component-utility.css`
5. Create semantic aliases (e.g. `--color-text-default`) that reference primitives
6. Add a Storybook story under `Foundations/` to visualize the tokens
7. Add dark-mode overrides in a `@media (prefers-color-scheme: dark)` block

### 3. Add a New Component

1. Create `src/components/bd-{name}.ts`
2. Extend `LitElement`, use `@customElement('bd-{name}')`
3. Use design tokens in `static styles` — never hardcode colors/spacing
4. Document: `@slot`, `@csspart`, `@fires` JSDoc tags (CEM reads these)
5. Export from `src/index.ts`
6. Create `src/stories/bd-{name}.stories.ts` with autodocs + variant stories
7. Run `npm run build` to regenerate types + CEM
8. Verify in Storybook: `npm run storybook`

### 4. Build & Verify

```bash
npm run build          # runs build:lib → build:types → build:cem
npm run storybook      # visual check
npm run docs           # static Storybook export
```

Build output checklist:
- [ ] `dist/boundai-ds.js` — ES module, Lit externalized
- [ ] `dist/index.d.ts` — TypeScript declarations
- [ ] `dist/components/*.d.ts` — per-component declarations
- [ ] `custom-elements.json` — all components, attributes, slots, events, parts

### 5. Publish to npm

```bash
npm version patch      # or minor / major
npm publish --access public
```

Consumers install with:
```bash
npm install @boundai/ds lit
```
```html
<link rel="stylesheet" href="@boundai/ds/tokens.css" />
<script type="module">
  import '@boundai/ds'
</script>
<bd-button variant="primary">Click</bd-button>
```

## Component Checklist

For every new component, verify:

- [ ] Uses `bd-` prefix
- [ ] All visual values come from design tokens
- [ ] Has `@slot`, `@csspart`, `@fires` JSDoc where applicable
- [ ] Reflects key attributes (`reflect: true`) for CSS selector styling
- [ ] Focus styles use `button:focus-visible` or `:host(:focus-visible)`
- [ ] Disabled state blocks pointer events and dims visually
- [ ] Exported from `src/index.ts`
- [ ] Storybook story with autodocs + multiple variant stories
- [ ] `npm run build` passes cleanly
