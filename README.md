# BoundAI Design System

**BoundAI Design System** is the product name. The published npm package is **`@boundai/ds`** (bundle: `boundai-ds.js`). Use the repo name **`boundai-ds`** on GitHub to match.

Lit web components, tokenized CSS, and Storybook documentation.

## Installation

```bash
npm i @boundai/ds lit
```

## Usage

Import tokens once at app entry:

```ts
import '@boundai/ds/tokens.css'
```

Import components (registers custom elements):

```ts
import '@boundai/ds'
```

Example:

```html
<bd-button variant="primary">Primary action</bd-button>
```

## Documentation

- Storybook dev: `npm run storybook` (http://localhost:6006)
- Static docs build: `npm run docs`
- Static docs preview: `npm run preview-docs` (http://localhost:6007)

## Development

### Scripts

- `npm run dev` - local Vite playground page with real DS components
- `npm run storybook` - interactive Storybook
- `npm run docs` - build static Storybook into `storybook-static/`
- `npm run preview-docs` - serve `storybook-static/` on port 6007
- `npm run lint` - run Biome checks
- `npm run lint:fix` - auto-fix lint/style issues in `src/`
- `npm run format` - format `src/` with Biome
- `npm run typecheck` - TypeScript checks
- `npm run build` - library bundle + types + custom elements manifest
- `npm run test:storybook` - run Storybook interaction tests (expects docs served at port 6007)
- `npm run test:vitest` - run Storybook stories as Vitest browser tests (`@storybook/addon-vitest`)

### Build Outputs

- `dist/` - library JS bundle and declaration files
- `custom-elements.json` - generated manifest from `npm run build:cem` (via `npm run build`)

`custom-elements.json` is generated output and should not be edited manually.

## CI

GitHub Actions pipeline runs:

1. `npm ci`
2. `npx playwright install --with-deps chromium`
3. `npm run lint`
4. `npm run typecheck`
5. `npm run build`
6. `npm run docs`
7. `npm run test:storybook`
