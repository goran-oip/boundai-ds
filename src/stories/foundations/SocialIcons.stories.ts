import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type { BdSocialIconName } from '../../components/bd-social-icon.js'
import '../../components/bd-social-icon.js'

/**
 * Figma Design System v1.1 — Social icons (`1457:244804`): brand row, gray default, gray hover.
 */
const meta = {
  title: 'Foundations/Social icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full social icon set as `bd-social-icon` with `variant="brand"` or `variant="gray"` and `state` for hover (see **Components**).',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const PAGE =
  'padding:2rem;max-width:min(100%,1400px);font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);'
const BREAD = 'Foundations → Social icons'

const ROW: BdSocialIconName[] = [
  'angellist',
  'apple',
  'clubhouse',
  'dribbble',
  'discord-01',
  'discord-02',
  'facebook',
  'figma',
  'framer-01',
  'framer-02',
  'github',
  'google',
  'instagram',
  'layers',
  'linkedin',
  'notion',
  'paypal',
  'pinterest',
  'reddit',
  'signal',
  'slack',
  'snapchat',
  'spotify',
  'stripe',
  'telegram',
  'tiktok',
  'tumblr',
  'twitch',
  'twitter',
  'webflow',
  'whatsapp',
  'wise',
  'x-twitter',
  'youtube',
]

const rowStyle =
  'display:flex;flex-wrap:wrap;gap:1rem var(--spacing-xl);align-items:center;margin-bottom:var(--spacing-xl);'

export const BrandRow: Story = {
  name: 'Brand',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Brand · 24×24
      </h2>
      <div style=${rowStyle}>
        ${ROW.map(
          (platform) =>
            html`<bd-social-icon platform=${platform} variant="brand"></bd-social-icon>`,
        )}
      </div>
    </div>
  `,
}

export const GrayDefaultRow: Story = {
  name: 'Gray (default)',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Gray · default
      </h2>
      <div style=${rowStyle}>
        ${ROW.map(
          (platform) => html`<bd-social-icon platform=${platform} variant="gray"></bd-social-icon>`,
        )}
      </div>
    </div>
  `,
}

export const GrayHoverRow: Story = {
  name: 'Gray (hover state)',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Gray · hover (use <code>state="hover"</code> or pointer hover)
      </h2>
      <div style=${rowStyle}>
        ${ROW.map(
          (platform) =>
            html`<bd-social-icon
              platform=${platform}
              variant="gray"
              state="hover"
            ></bd-social-icon>`,
        )}
      </div>
    </div>
  `,
}
