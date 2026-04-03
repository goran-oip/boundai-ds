import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../../components/bd-featured-folder-icon.js'
import '../../components/bd-featured-icon-outline.js'
import '../../components/bd-featured-icon.js'
import '../../components/bd-file-type-icon.js'

/**
 * Figma Design System v1.1 — Featured icons:
 * - Featured icon matrix · `1102:5338`
 * - Featured icon outline · `4843:410985`
 * - File type icon · `4916:411695`
 * - Folder featured icon · `7585:9240`
 */
const meta = {
  title: 'Foundations/Featured icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Featured icon variants implemented as `bd-featured-icon`, `bd-featured-icon-outline`, `bd-file-type-icon`, and `bd-featured-folder-icon` (see **Components** for props and slots).',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const PAGE =
  'padding:2rem;max-width:min(100%,1200px);font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);'
const BREAD = 'Foundations → Featured icons'

const colors = ['brand', 'gray', 'error', 'warning', 'success'] as const
const sizes = ['sm', 'md', 'lg', 'xl'] as const

export const FeaturedIconMatrix: Story = {
  name: 'Featured icon (matrix)',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Light · Gradient · Dark
      </h2>
      ${['light', 'gradient', 'dark'].map(
        (variant) => html`
          <section style="margin-bottom:2rem;">
            <h3
              style="font-size:var(--font-size-text-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--color-gray-light-mode-600);margin:0 0 0.75rem;"
            >
              ${variant}
            </h3>
            <div style="display:grid;grid-template-columns:repeat(5,auto);gap:1rem;align-items:center;">
              ${colors.map(
                (color) => html`
                  <div style="display:flex;flex-direction:column;gap:0.5rem;align-items:center;">
                    <span style="font-size:11px;color:var(--color-text-muted);">${color}</span>
                    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;">
                      ${sizes.map(
                        (size) => html`
                          <bd-featured-icon
                            variant=${variant}
                            color=${color}
                            size=${size}
                          ></bd-featured-icon>
                        `,
                      )}
                    </div>
                  </div>
                `,
              )}
            </div>
          </section>
        `,
      )}
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:2rem 0 1rem;color:var(--color-text-heading);"
      >
        Modern · Modern neue
      </h2>
      <div style="display:flex;gap:2rem;flex-wrap:wrap;align-items:flex-start;">
        <section>
          <h3
            style="font-size:var(--font-size-text-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--color-gray-light-mode-600);margin:0 0 0.75rem;"
          >
            modern
          </h3>
          <div style="display:flex;gap:0.5rem;">
            ${sizes.map((size) => html`<bd-featured-icon variant="modern" size=${size}></bd-featured-icon>`)}
          </div>
        </section>
        <section>
          <h3
            style="font-size:var(--font-size-text-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--color-gray-light-mode-600);margin:0 0 0.75rem;"
          >
            modern-neue
          </h3>
          <div style="display:flex;gap:0.5rem;">
            ${sizes.map(
              (size) =>
                html`<bd-featured-icon variant="modern-neue" size=${size}></bd-featured-icon>`,
            )}
          </div>
        </section>
      </div>
    </div>
  `,
}

export const FeaturedIconOutlineGrid: Story = {
  name: 'Featured icon outline',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Outline + rings
      </h2>
      <div style="display:flex;flex-direction:column;gap:1.5rem;">
        ${colors.map(
          (color) => html`
            <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;">
              <span style="min-width:5rem;font-size:var(--font-size-text-sm);color:var(--color-text-muted);"
                >${color}</span
              >
              ${(['sm', 'md', 'lg', 'xl'] as const).map(
                (size) =>
                  html`<bd-featured-icon-outline color=${color} size=${size}></bd-featured-icon-outline>`,
              )}
            </div>
          `,
        )}
      </div>
    </div>
  `,
}

export const FileTypeIconRow: Story = {
  name: 'File type icon',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Simple / Image
      </h2>
      <div style="display:flex;gap:2rem;align-items:center;">
        <bd-file-type-icon appearance="default" label="Image file default"></bd-file-type-icon>
        <bd-file-type-icon appearance="gray" label="Image file gray"></bd-file-type-icon>
        <bd-file-type-icon appearance="solid" label="Image file solid"></bd-file-type-icon>
      </div>
    </div>
  `,
}

export const FolderFeaturedIcons: Story = {
  name: 'Folder featured icon',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Brand · Gray · Noise × Closed · Open
      </h2>
      <div style="display:flex;flex-direction:column;gap:1.5rem;">
        ${(['brand', 'gray', 'noise'] as const).map(
          (variant) => html`
            <div style="display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap;">
              <span style="min-width:4rem;font-size:var(--font-size-text-sm);color:var(--color-text-muted);"
                >${variant}</span
              >
              <bd-featured-folder-icon variant=${variant} label=${`${variant} folder closed`}></bd-featured-folder-icon>
              <bd-featured-folder-icon
                variant=${variant}
                open
                label=${`${variant} folder open`}
              ></bd-featured-folder-icon>
            </div>
          `,
        )}
      </div>
    </div>
  `,
}
