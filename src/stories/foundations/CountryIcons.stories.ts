import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type { BdCountryIconName } from '../../components/bd-country-icon.js'
import '../../components/bd-country-icon.js'

/**
 * Figma Design System v1.1 — Country icons (`1107:70094`): 24×24 circle flags.
 */
const meta = {
  title: 'Foundations/Country icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Circle flags as `bd-country-icon` (see **Components**). Data: `@iconify-json/circle-flags` via `npm run generate:country-icons`.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const PAGE =
  'padding:2rem;max-width:min(100%,1400px);font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);'
const BREAD = 'Foundations → Country icons'

const SAMPLE: BdCountryIconName[] = [
  'us',
  'gb',
  'de',
  'fr',
  'jp',
  'au',
  'ca',
  'br',
  'in',
  'kr',
  'earth',
]

const rowStyle =
  'display:flex;flex-wrap:wrap;gap:1rem var(--spacing-xl);align-items:center;margin-bottom:var(--spacing-xl);'

export const SampleGrid: Story = {
  name: 'Sample',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        24×24
      </h2>
      <div style=${rowStyle}>
        ${SAMPLE.map(
          (c) => html`
            <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;">
              <bd-country-icon country=${c}></bd-country-icon>
              <span style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);"
                >${c}</span
              >
            </div>
          `,
        )}
      </div>
    </div>
  `,
}
