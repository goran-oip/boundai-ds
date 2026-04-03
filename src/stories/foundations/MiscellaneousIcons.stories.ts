import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../../components/bd-check-icon.js'
import '../../components/bd-check-item.js'
import '../../components/bd-emoji.js'
import '../../components/bd-ratings-badge.js'
import '../../components/bd-star-icon.js'
import '../../components/bd-status-dot.js'

/**
 * Figma Design System v1.1 — Miscellaneous icons:
 * - Check icon · `1254:137887`
 * - Check item · `1345:1610`
 * - Star · `1232:9`
 * - Dot · `1046:12310`
 * - Emoji · `1244:296`
 * - Ratings badge · `7460:158976`
 */
const meta = {
  title: 'Foundations/Miscellaneous icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Miscellaneous icon primitives: `bd-check-icon`, `bd-check-item`, `bd-star-icon`, `bd-status-dot`, `bd-emoji`, and `bd-ratings-badge` (see **Components** for props).',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const PAGE =
  'padding:2rem;max-width:min(100%,1200px);font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);'
const BREAD = 'Foundations → Miscellaneous icons'

const checkTypes = ['default', 'line', 'filled'] as const
const checkColors = ['brand', 'gray', 'success'] as const
const checkSizes = ['xs', 'sm', 'md', 'lg'] as const

export const CheckIconMatrix: Story = {
  name: 'Check icon (matrix)',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Type × color × size
      </h2>
      ${checkTypes.map(
        (type) => html`
          <section style="margin-bottom:1.5rem;">
            <h3
              style="font-size:var(--font-size-text-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--color-gray-light-mode-600);margin:0 0 0.75rem;"
            >
              ${type}
            </h3>
            <div style="display:flex;flex-direction:column;gap:0.75rem;">
              ${checkColors.map(
                (color) => html`
                  <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;">
                    <span style="min-width:4rem;font-size:var(--font-size-text-sm);color:var(--color-text-muted);"
                      >${color}</span
                    >
                    ${checkSizes.map(
                      (size) =>
                        html`<bd-check-icon type=${type} color=${color} size=${size}></bd-check-icon>`,
                    )}
                  </div>
                `,
              )}
            </div>
          </section>
        `,
      )}
    </div>
  `,
}

export const CheckItemSamples: Story = {
  name: 'Check item (desktop / mobile)',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Typography + icon
      </h2>
      <div style="display:flex;flex-direction:column;gap:1.5rem;max-width:480px;">
        <bd-check-item size="lg" breakpoint="desktop">
          Desktop row: large copy with md-sized icon mapping.
        </bd-check-item>
        <bd-check-item size="lg" breakpoint="mobile">
          Same row forced to mobile breakpoint (narrower max width).
        </bd-check-item>
      </div>
    </div>
  `,
}

export const StarFillRow: Story = {
  name: 'Star (partial fill)',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Yellow / gray · 0–100%
      </h2>
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
          ${[0, 30, 50, 70, 100].map(
            (f) => html`<bd-star-icon .fill=${f} color="yellow"></bd-star-icon>`,
          )}
        </div>
        <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
          ${[0, 30, 50, 70, 100].map(
            (f) => html`<bd-star-icon .fill=${f} color="gray"></bd-star-icon>`,
          )}
        </div>
      </div>
    </div>
  `,
}

export const StatusDotGrid: Story = {
  name: 'Status dot (solid / halo)',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        sm · md · lg
      </h2>
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;">
          <span style="font-size:var(--font-size-text-sm);color:var(--color-text-muted);"
            >Solid</span
          >
          ${(['sm', 'md', 'lg'] as const).map(
            (size) => html`<bd-status-dot size=${size}></bd-status-dot>`,
          )}
        </div>
        <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;">
          <span style="font-size:var(--font-size-text-sm);color:var(--color-text-muted);"
            >Halo</span
          >
          ${(['sm', 'md', 'lg'] as const).map(
            (size) => html`<bd-status-dot outline size=${size}></bd-status-dot>`,
          )}
        </div>
      </div>
    </div>
  `,
}

export const EmojiRow: Story = {
  name: 'Emoji (reactions)',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Named glyphs
      </h2>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;">
        ${(['heart-red', 'thumbs-up', 'thumbs-down', 'eyes', 'smile', 'hug', 'wink'] as const).map(
          (name) => html`<bd-emoji name=${name}></bd-emoji>`,
        )}
      </div>
    </div>
  `,
}

export const RatingsBadgeBlock: Story = {
  name: 'Ratings badge',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Default laurels + stars
      </h2>
      <bd-ratings-badge label="InsurTech rating"></bd-ratings-badge>
    </div>
  `,
}
