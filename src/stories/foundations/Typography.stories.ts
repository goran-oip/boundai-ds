import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

/**
 * Typography primitives from Figma (Font family, Font size, Line height, Font weight).
 * Composite styles in the file (e.g. “Display xl / Semibold”) combine these tokens.
 */
const meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Inter via `font-family-body` and `font-family-display`. Sizes and line heights match Figma `Font size/*` and `Line height/*`. Display 2xl–md use `letter-spacing-display-tight` (-2 in Figma); display sm/xs and all text styles use `letter-spacing-none`.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

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

export const Primitives: Story = {
  render: () => html`
    <div
      style="padding:1.5rem;max-width:960px;font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);"
    >
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);line-height:var(--line-height-display-xs);font-weight:var(--font-weight-semibold);margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Typography tokens
      </h2>

      <section style="margin-bottom:2rem;" aria-labelledby="typo-weights">
        <h3
          id="typo-weights"
          style="font-size:var(--font-size-text-md);font-weight:var(--font-weight-semibold);margin:0 0 0.75rem;color:var(--color-text-heading);"
        >
          Font weight/*
        </h3>
        ${tokenRow(
          '--font-weight-regular',
          `font-family:var(--font-family-body);font-weight:var(--font-weight-regular);font-size:var(--font-size-text-md);line-height:var(--line-height-text-md);`,
        )}
        ${tokenRow(
          '--font-weight-medium',
          `font-family:var(--font-family-body);font-weight:var(--font-weight-medium);font-size:var(--font-size-text-md);line-height:var(--line-height-text-md);`,
        )}
        ${tokenRow(
          '--font-weight-semibold',
          `font-family:var(--font-family-body);font-weight:var(--font-weight-semibold);font-size:var(--font-size-text-md);line-height:var(--line-height-text-md);`,
        )}
        ${tokenRow(
          '--font-weight-bold',
          `font-family:var(--font-family-body);font-weight:var(--font-weight-bold);font-size:var(--font-size-text-md);line-height:var(--line-height-text-md);`,
        )}
      </section>

      <section style="margin-bottom:2rem;" aria-labelledby="typo-display">
        <h3
          id="typo-display"
          style="font-size:var(--font-size-text-md);font-weight:var(--font-weight-semibold);margin:0 0 0.75rem;color:var(--color-text-heading);"
        >
          Display (font-family-display)
        </h3>
        ${tokenRow(
          '--font-size-display-2xl / --line-height-display-2xl',
          `font-family:var(--font-family-display);font-size:var(--font-size-display-2xl);line-height:var(--line-height-display-2xl);font-weight:var(--font-weight-regular);letter-spacing:var(--letter-spacing-display-tight);`,
        )}
        ${tokenRow(
          '--font-size-display-xl / --line-height-display-xl',
          `font-family:var(--font-family-display);font-size:var(--font-size-display-xl);line-height:var(--line-height-display-xl);font-weight:var(--font-weight-regular);letter-spacing:var(--letter-spacing-display-tight);`,
        )}
        ${tokenRow(
          '--font-size-display-lg / --line-height-display-lg',
          `font-family:var(--font-family-display);font-size:var(--font-size-display-lg);line-height:var(--line-height-display-lg);font-weight:var(--font-weight-regular);letter-spacing:var(--letter-spacing-display-tight);`,
        )}
        ${tokenRow(
          '--font-size-display-md / --line-height-display-md',
          `font-family:var(--font-family-display);font-size:var(--font-size-display-md);line-height:var(--line-height-display-md);font-weight:var(--font-weight-regular);letter-spacing:var(--letter-spacing-display-tight);`,
        )}
        ${tokenRow(
          '--font-size-display-sm / --line-height-display-sm',
          `font-family:var(--font-family-display);font-size:var(--font-size-display-sm);line-height:var(--line-height-display-sm);font-weight:var(--font-weight-regular);letter-spacing:var(--letter-spacing-none);`,
        )}
        ${tokenRow(
          '--font-size-display-xs / --line-height-display-xs',
          `font-family:var(--font-family-display);font-size:var(--font-size-display-xs);line-height:var(--line-height-display-xs);font-weight:var(--font-weight-regular);letter-spacing:var(--letter-spacing-none);`,
        )}
      </section>

      <section aria-labelledby="typo-text">
        <h3
          id="typo-text"
          style="font-size:var(--font-size-text-md);font-weight:var(--font-weight-semibold);margin:0 0 0.75rem;color:var(--color-text-heading);"
        >
          Text (font-family-body)
        </h3>
        ${tokenRow(
          '--font-size-text-xl / --line-height-text-xl',
          `font-family:var(--font-family-body);font-size:var(--font-size-text-xl);line-height:var(--line-height-text-xl);font-weight:var(--font-weight-regular);letter-spacing:var(--letter-spacing-none);`,
        )}
        ${tokenRow(
          '--font-size-text-lg / --line-height-text-lg',
          `font-family:var(--font-family-body);font-size:var(--font-size-text-lg);line-height:var(--line-height-text-lg);font-weight:var(--font-weight-regular);letter-spacing:var(--letter-spacing-none);`,
        )}
        ${tokenRow(
          '--font-size-text-md / --line-height-text-md',
          `font-family:var(--font-family-body);font-size:var(--font-size-text-md);line-height:var(--line-height-text-md);font-weight:var(--font-weight-regular);letter-spacing:var(--letter-spacing-none);`,
        )}
        ${tokenRow(
          '--font-size-text-sm / --line-height-text-sm',
          `font-family:var(--font-family-body);font-size:var(--font-size-text-sm);line-height:var(--line-height-text-sm);font-weight:var(--font-weight-regular);letter-spacing:var(--letter-spacing-none);`,
        )}
        ${tokenRow(
          '--font-size-text-xs / --line-height-text-xs',
          `font-family:var(--font-family-body);font-size:var(--font-size-text-xs);line-height:var(--line-height-text-xs);font-weight:var(--font-weight-regular);letter-spacing:var(--letter-spacing-none);`,
        )}
      </section>
    </div>
  `,
}
