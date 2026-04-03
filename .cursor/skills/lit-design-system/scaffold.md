# Scaffold a Lit Design System Project

Step-by-step setup for a new project from scratch.

## 1. Init with Vite

```bash
npm create vite@latest . -- --template lit-ts
npm install
```

## 2. Create `vite.config.ts` (library mode)

```ts
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'boundai-ds.js',
    },
    rollupOptions: {
      external: [/^lit($|\/)/],
    },
    outDir: 'dist',
    cssCodeSplit: false,
    copyPublicDir: false,
  },
})
```

Key points:
- ES-only output (Web Components are ESM)
- Lit externalized — consumers bring their own version
- No public dir in dist (only library code)

## 3. Create `tsconfig.build.json` (declaration emit)

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "outDir": "dist",
    "noEmit": false,
    "allowImportingTsExtensions": false,
    "rootDir": "src"
  },
  "include": ["src/index.ts", "src/components"],
  "exclude": ["src/stories"]
}
```

## 4. Configure `package.json`

```json
{
  "name": "@boundai/ds",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/boundai-ds.js",
  "module": "./dist/boundai-ds.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/boundai-ds.js"
    },
    "./tokens.css": "./src/styles/tokens.css",
    "./tokens": "./src/styles/tokens.css"
  },
  "files": ["dist", "src/styles", "custom-elements.json"],
  "sideEffects": ["**/*.css", "**/bd-*.js"],
  "customElements": "custom-elements.json",
  "peerDependencies": {
    "lit": "^3.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "npm run build:lib && npm run build:types && npm run build:cem",
    "build:lib": "vite build",
    "build:types": "tsc --project tsconfig.build.json",
    "build:cem": "cem analyze --litelement --outdir . --globs \"src/components/**/*.ts\"",
    "storybook": "storybook dev -p 6006",
    "docs": "storybook build",
    "typecheck": "tsc --noEmit"
  }
}
```

Important fields:
- `exports` — conditional exports with types-first
- `sideEffects` — CSS files and component self-registrations
- `customElements` — points tools to the CEM manifest
- `peerDependencies` — Lit is a peer, not bundled

## 5. Install dev dependencies

```bash
npm install -D @custom-elements-manifest/analyzer
npx storybook@latest init --type web_components_vite
npm install -D @storybook/addon-a11y @storybook/addon-docs
```

## 6. Configure Storybook

**.storybook/main.ts:**
```ts
import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/web-components-vite',
}
export default config
```

**.storybook/preview.ts:**
```ts
import type { Preview } from '@storybook/web-components-vite'
import '../src/styles/tokens.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Foundations', ['Colors', 'Typography', 'Component utility', 'Spacing'],
          'Components',
        ],
      },
    },
  },
}
export default preview
```

## 7. Create token files

```bash
mkdir -p src/styles
touch src/styles/tokens.css
touch src/styles/tokens-part2-component-utility.css
```

`tokens.css` structure:
```css
@import './tokens-part2-component-utility.css';

/* Primitives: base, gray, brand, error, warning, success */
:root { /* ... */ }

/* Semantic text/bg/border tokens */
:root { /* ... */ }

/* Typography: family, weight, size, line-height, letter-spacing */
:root { /* ... */ }

/* Derived surfaces (color-mix, shadows) */
:root { /* ... */ }

/* App-level aliases */
:root { /* ... */ }

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root { /* ... */ }
}
```

## 8. Create barrel export

**src/index.ts:**
```ts
export { BdButton } from './components/bd-button.js'
export type { BdButtonVariant, BdButtonSize } from './components/bd-button.js'
```

Use `.js` extensions in imports (ESM convention — TypeScript resolves `.ts` at
compile time but the output must reference `.js`).

## 9. Create first component

See the "Add a New Component" workflow in the main SKILL.md.

## 10. Load fonts

Add to `index.html` for the dev server (consumers handle their own font loading):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
```

## 11. Verify

```bash
npm run build      # should produce dist/ + custom-elements.json
npm run storybook  # visual check at localhost:6006
```
