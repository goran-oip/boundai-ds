import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, type TemplateResult } from 'lit'

import {
  lucideIconCheck,
  lucideIconChevronDown,
  lucideIconChevronRight,
  lucideIconMenu,
  lucideIconPlus,
  lucideIconSearch,
  lucideIconSettings,
  lucideIconX,
} from '../../icons/lucide-preset.js'

/**
 * Figma Design System v1.1 — Lucide icon preset.
 *
 * The design system ships a curated set of Lucide icons as zero-config Lit
 * template helpers plus a generic `lucideIcon()` function for any icon in the
 * `lucide` package.
 */
const meta = {
  title: 'Foundations/Lucide icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Curated **Lucide** icons exported from `@boundai/ds` as Lit template helpers.',
          'Import the preset directly or use `lucideIcon(IconNode)` with any `lucide` deep import.',
          '',
          '```ts',
          '// Preset (tree-shakes to just the icons you use)',
          "import { lucideIconSearch } from '@boundai/ds'",
          '',
          '// Generic helper — any Lucide icon',
          "import { lucideIcon } from '@boundai/ds'",
          "import Settings from 'lucide/dist/esm/icons/settings.js'",
          '',
          `html\`\${lucideIconSearch({ size: 20 })}\``,
          `html\`\${lucideIcon(Settings, { size: 20 })}\``,
          '```',
        ].join('\n'),
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const PAGE =
  'padding:2rem;max-width:min(100%,1200px);font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);'
const BREAD = 'Foundations → Lucide icons'

type PresetEntry = {
  name: string
  importName: string
  render: (size: number) => TemplateResult
}

const PRESET: PresetEntry[] = [
  { name: 'Check', importName: 'lucideIconCheck', render: (s) => lucideIconCheck({ size: s }) },
  {
    name: 'Chevron Down',
    importName: 'lucideIconChevronDown',
    render: (s) => lucideIconChevronDown({ size: s }),
  },
  {
    name: 'Chevron Right',
    importName: 'lucideIconChevronRight',
    render: (s) => lucideIconChevronRight({ size: s }),
  },
  { name: 'Menu', importName: 'lucideIconMenu', render: (s) => lucideIconMenu({ size: s }) },
  { name: 'Plus', importName: 'lucideIconPlus', render: (s) => lucideIconPlus({ size: s }) },
  {
    name: 'Search',
    importName: 'lucideIconSearch',
    render: (s) => lucideIconSearch({ size: s }),
  },
  {
    name: 'Settings',
    importName: 'lucideIconSettings',
    render: (s) => lucideIconSettings({ size: s }),
  },
  { name: 'X', importName: 'lucideIconX', render: (s) => lucideIconX({ size: s }) },
]

const grid =
  'display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:var(--spacing-xl);'

function iconCell(entry: PresetEntry, size: number) {
  return html`
    <div
      style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;padding:var(--spacing-lg);border:1px solid var(--color-border-secondary);border-radius:var(--radius-md);background:var(--color-bg-primary);"
    >
      <span style="color:var(--color-text-primary-900);">${entry.render(size)}</span>
      <span
        style="font-size:var(--font-size-text-xs);font-weight:var(--font-weight-medium);color:var(--color-text-secondary-700);text-align:center;"
        >${entry.name}</span
      >
      <code
        style="font-size:10px;line-height:1.2;color:var(--color-text-quaternary-500);word-break:break-all;text-align:center;"
        >${entry.importName}</code
      >
    </div>
  `
}

export const PresetGrid: Story = {
  name: 'Preset (24px)',
  render: () => html`
    <div style=${PAGE}>
      <p
        style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;"
      >
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Curated preset · 24 px
      </h2>
      <div style=${grid}>${PRESET.map((e) => iconCell(e, 24))}</div>
    </div>
  `,
}

export const PresetSizes: Story = {
  name: 'Sizes (16 / 20 / 24)',
  render: () => html`
    <div style=${PAGE}>
      <p
        style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;"
      >
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Size comparison
      </h2>
      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        ${[16, 20, 24].map(
          (size) => html`
            <div>
              <h3
                style="font-size:var(--font-size-text-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--color-gray-light-mode-600);margin:0 0 0.75rem;"
              >
                ${size}px
              </h3>
              <div style="display:flex;gap:var(--spacing-xl);flex-wrap:wrap;align-items:center;">
                ${PRESET.map(
                  (e) => html`
                    <div
                      style="display:flex;flex-direction:column;align-items:center;gap:0.25rem;"
                    >
                      <span style="color:var(--color-text-primary-900);">${e.render(size)}</span>
                      <span
                        style="font-size:10px;color:var(--color-gray-light-mode-600);"
                        >${e.name}</span
                      >
                    </div>
                  `,
                )}
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `,
}
