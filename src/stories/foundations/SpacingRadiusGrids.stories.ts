import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

/**
 * Documentation pages for Figma Design System v1.1:
 * - Spacing primitives · `6300:76782`
 * - Radius · `5253:372274`
 * - Semantic spacing (widths, container, paragraph) · `5245:372881`
 * - Grid layouts · `5245:373008`
 */
const meta = {
  title: 'Foundations/Spacing, radius & grids',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Spacing scale, radius tokens, layout widths, and responsive grid definitions from `tokens-part2-component-utility.css`, aligned with Figma **Spacing, radius & grids** foundations.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const PAGE_PAD =
  'padding:2rem;max-width:min(100%,1200px);font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);'
const BREAD = 'Foundations → Spacing, radius & grids'
const BAR =
  'background:var(--color-utility-brand-200);border-radius:9999px;height:8px;min-width:2px;'

const spacingPrimitives: { name: string; varName: string; rem: string; px: string }[] = [
  { name: '0', varName: '--spacing-unit-0', rem: '0rem', px: '0px' },
  { name: '0.5', varName: '--spacing-unit-0-5', rem: '0.125rem', px: '2px' },
  { name: '1', varName: '--spacing-unit-1', rem: '0.25rem', px: '4px' },
  { name: '1.5', varName: '--spacing-unit-1-5', rem: '0.375rem', px: '6px' },
  { name: '2', varName: '--spacing-unit-2', rem: '0.5rem', px: '8px' },
  { name: '3', varName: '--spacing-unit-3', rem: '0.75rem', px: '12px' },
  { name: '4', varName: '--spacing-unit-4', rem: '1rem', px: '16px' },
  { name: '5', varName: '--spacing-unit-5', rem: '1.25rem', px: '20px' },
  { name: '6', varName: '--spacing-unit-6', rem: '1.5rem', px: '24px' },
  { name: '8', varName: '--spacing-unit-8', rem: '2rem', px: '32px' },
  { name: '10', varName: '--spacing-unit-10', rem: '2.5rem', px: '40px' },
  { name: '12', varName: '--spacing-unit-12', rem: '3rem', px: '48px' },
  { name: '16', varName: '--spacing-unit-16', rem: '4rem', px: '64px' },
  { name: '20', varName: '--spacing-unit-20', rem: '5rem', px: '80px' },
  { name: '24', varName: '--spacing-unit-24', rem: '6rem', px: '96px' },
  { name: '32', varName: '--spacing-unit-32', rem: '8rem', px: '128px' },
  { name: '40', varName: '--spacing-unit-40', rem: '10rem', px: '160px' },
  { name: '48', varName: '--spacing-unit-48', rem: '12rem', px: '192px' },
  { name: '56', varName: '--spacing-unit-56', rem: '14rem', px: '224px' },
  { name: '64', varName: '--spacing-unit-64', rem: '16rem', px: '256px' },
  { name: '80', varName: '--spacing-unit-80', rem: '20rem', px: '320px' },
  { name: '96', varName: '--spacing-unit-96', rem: '24rem', px: '384px' },
  { name: '120', varName: '--spacing-unit-120', rem: '30rem', px: '480px' },
  { name: '140', varName: '--spacing-unit-140', rem: '35rem', px: '560px' },
  { name: '160', varName: '--spacing-unit-160', rem: '40rem', px: '640px' },
  { name: '180', varName: '--spacing-unit-180', rem: '45rem', px: '720px' },
  { name: '192', varName: '--spacing-unit-192', rem: '48rem', px: '768px' },
  { name: '256', varName: '--spacing-unit-256', rem: '64rem', px: '1,024px' },
  { name: '320', varName: '--spacing-unit-320', rem: '80rem', px: '1,280px' },
  { name: '360', varName: '--spacing-unit-360', rem: '90rem', px: '1,440px' },
  { name: '400', varName: '--spacing-unit-400', rem: '100rem', px: '1,600px' },
  { name: '480', varName: '--spacing-unit-480', rem: '120rem', px: '1,920px' },
]

const semanticSpacing: { name: string; varName: string; rem: string; px: string }[] = [
  { name: 'spacing-none', varName: '--spacing-none', rem: '0rem', px: '0px' },
  { name: 'spacing-xxx', varName: '--spacing-xxx', rem: '0.125rem', px: '2px' },
  { name: 'spacing-xs', varName: '--spacing-xs', rem: '0.25rem', px: '4px' },
  { name: 'spacing-sm', varName: '--spacing-sm', rem: '0.375rem', px: '6px' },
  { name: 'spacing-md', varName: '--spacing-md', rem: '0.5rem', px: '8px' },
  { name: 'spacing-lg', varName: '--spacing-lg', rem: '0.75rem', px: '12px' },
  { name: 'spacing-xl', varName: '--spacing-xl', rem: '1rem', px: '16px' },
  { name: 'spacing-2xl', varName: '--spacing-2xl', rem: '1.25rem', px: '20px' },
  { name: 'spacing-3xl', varName: '--spacing-3xl', rem: '1.5rem', px: '24px' },
  { name: 'spacing-4xl', varName: '--spacing-4xl', rem: '2rem', px: '32px' },
  { name: 'spacing-5xl', varName: '--spacing-5xl', rem: '2.5rem', px: '40px' },
  { name: 'spacing-6xl', varName: '--spacing-6xl', rem: '3rem', px: '48px' },
  { name: 'spacing-7xl', varName: '--spacing-7xl', rem: '4rem', px: '64px' },
  { name: 'spacing-8xl', varName: '--spacing-8xl', rem: '5rem', px: '80px' },
  { name: 'spacing-9xl', varName: '--spacing-9xl', rem: '6rem', px: '96px' },
  { name: 'spacing-10xl', varName: '--spacing-10xl', rem: '8rem', px: '128px' },
  { name: 'spacing-11xl', varName: '--spacing-11xl', rem: '10rem', px: '160px' },
]

const widthTokens: { name: string; varName: string; rem: string; px: string }[] = [
  { name: 'width-xs', varName: '--width-xs', rem: '20rem', px: '320px' },
  { name: 'width-sm', varName: '--width-sm', rem: '24rem', px: '384px' },
  { name: 'width-md', varName: '--width-md', rem: '30rem', px: '480px' },
  { name: 'width-ml', varName: '--width-ml', rem: '35rem', px: '560px' },
  { name: 'width-lg', varName: '--width-lg', rem: '40rem', px: '640px' },
  { name: 'width-xl', varName: '--width-xl', rem: '48rem', px: '768px' },
  { name: 'width-2xl', varName: '--width-2xl', rem: '64rem', px: '1,024px' },
  { name: 'width-3xl', varName: '--width-3xl', rem: '80rem', px: '1,280px' },
  { name: 'width-4xl', varName: '--width-4xl', rem: '90rem', px: '1,440px' },
  { name: 'width-5xl', varName: '--width-5xl', rem: '100rem', px: '1,600px' },
  { name: 'width-6xl', varName: '--width-6xl', rem: '120rem', px: '1,920px' },
]

const containerTokens: { name: string; varName: string; rem: string; px: string }[] = [
  {
    name: 'container-padding-mobile',
    varName: '--container-padding-mobile',
    rem: '1rem',
    px: '16px',
  },
  {
    name: 'container-padding-desktop',
    varName: '--container-padding-desktop',
    rem: '2rem',
    px: '32px',
  },
  {
    name: 'container-max-width-desktop',
    varName: '--container-max-width-desktop',
    rem: '80rem',
    px: '1,280px',
  },
]

const radiusTokens: { name: string; varName: string; rem: string; px: string }[] = [
  { name: 'radius-none', varName: '--radius-none', rem: '0rem', px: '0px' },
  { name: 'radius-xxs', varName: '--radius-xxs', rem: '0.125rem', px: '2px' },
  { name: 'radius-xs', varName: '--radius-xs', rem: '0.25rem', px: '4px' },
  { name: 'radius-sm', varName: '--radius-sm', rem: '0.375rem', px: '6px' },
  { name: 'radius-md', varName: '--radius-md', rem: '0.5rem', px: '8px' },
  { name: 'radius-lg', varName: '--radius-lg', rem: '0.625rem', px: '10px' },
  { name: 'radius-xl', varName: '--radius-xl', rem: '0.75rem', px: '12px' },
  { name: 'radius-2xl', varName: '--radius-2xl', rem: '1rem', px: '16px' },
  { name: 'radius-3xl', varName: '--radius-3xl', rem: '1.25rem', px: '20px' },
  { name: 'radius-4xl', varName: '--radius-4xl', rem: '1.5rem', px: '24px' },
  { name: 'radius-full', varName: '--radius-full', rem: '∞', px: '9999px' },
]

function tableSection(
  title: string,
  intro: string,
  rows: { name: string; varName: string; rem: string; px: string }[],
  useVarWidth: boolean,
) {
  return html`
    <section style="margin-bottom:2.5rem;">
      <h3
        style="font-family:var(--font-family-display);font-size:var(--font-size-text-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--color-gray-light-mode-600);margin:0 0 0.75rem;"
      >
        ${title}
      </h3>
      <p style="margin:0 0 1rem;font-size:var(--font-size-text-sm);line-height:var(--line-height-text-sm);color:var(--color-text-muted);max-width:72ch;">
        ${intro}
      </p>
      <div tabindex="0" aria-label="${title} table, scrollable" style="overflow-x:auto;border:1px solid var(--color-border-secondary);border-radius:var(--radius-md);">
        <table style="width:100%;border-collapse:collapse;font-size:var(--font-size-text-sm);">
          <thead>
            <tr style="background:var(--color-gray-light-mode-50);text-align:left;">
              <th style="padding:0.75rem 1rem;font-weight:600;color:var(--color-text-heading);">Name</th>
              <th style="padding:0.75rem 1rem;font-weight:600;color:var(--color-text-heading);">Size (16px base)</th>
              <th style="padding:0.75rem 1rem;font-weight:600;color:var(--color-text-heading);">Pixels</th>
              <th style="padding:0.75rem 1rem;font-weight:600;color:var(--color-text-heading);width:40%;">Spacing</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(
              (r) => html`
                <tr style="border-top:1px solid var(--color-border-secondary);">
                  <td style="padding:0.5rem 1rem;font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);">
                    ${r.name}
                  </td>
                  <td style="padding:0.5rem 1rem;font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);">
                    ${r.rem}
                  </td>
                  <td style="padding:0.5rem 1rem;color:var(--color-text-muted);">${r.px}</td>
                  <td style="padding:0.5rem 1rem;">
                    <div style="overflow-x:auto;max-width:100%;padding:4px 0;">
                      <div
                        role="img"
                        aria-label=${`${r.varName}: ${r.px}`}
                        style="${BAR}${useVarWidth ? `width:var(${r.varName});max-width:100%;` : ''}"
                      ></div>
                    </div>
                  </td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
    </section>
  `
}

export const SpacingPrimitives: Story = {
  name: 'Spacing primitives',
  render: () => html`
    <div style=${PAGE_PAD}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">${BREAD}</p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 0.75rem;color:var(--color-text-heading);"
      >
        Spacing primitives
      </h2>
      <p style="margin:0 0 2rem;font-size:var(--font-size-text-lg);line-height:var(--line-height-text-lg);color:var(--color-text-muted);max-width:72ch;">
        The spacing scale uses numeric primitives where <strong>one spacing unit equals 0.25rem (4px)</strong> at a 16px
        root. Names are proportional to the size (for example, 8px is named “2” and 16px is “4”).
      </p>
      ${tableSection(
        'Primitives',
        'Each row maps to a CSS variable in `tokens-part2-component-utility.css` (e.g. `--spacing-unit-4` → 1rem).',
        spacingPrimitives,
        true,
      )}
    </div>
  `,
}

export const Radius: Story = {
  render: () => html`
    <div style=${PAGE_PAD}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">${BREAD}</p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 0.75rem;color:var(--color-text-heading);"
      >
        Radius
      </h2>
      <p style="margin:0 0 1.5rem;font-size:var(--font-size-text-lg);line-height:var(--line-height-text-lg);color:var(--color-text-muted);max-width:72ch;">
        Border-radius tokens round corners consistently. Use the scale for images, buttons, and surfaces.
      </p>
      <div
        style="display:flex;flex-wrap:wrap;gap:1.25rem;margin-bottom:2rem;"
        role="list"
        aria-label="Radius preview"
      >
        ${radiusTokens.map(
          (t) => html`
            <div role="listitem" style="text-align:center;width:88px;">
              <div
                role="img"
                aria-label=${`${t.name}: ${t.px}`}
                style="width:64px;height:64px;margin:0 auto;background:var(--color-gray-light-mode-100);border:1px solid var(--color-border-secondary);border-radius:var(${t.varName});"
              ></div>
              <code
                style="display:block;margin-top:0.5rem;font-family:var(--font-family-mono);font-size:10px;color:var(--color-text-muted);word-break:break-all;"
                >${t.varName}</code
              >
              <span style="font-size:10px;color:var(--color-text-quaternary-500);">${t.px}</span>
            </div>
          `,
        )}
      </div>
      <div tabindex="0" aria-label="Border radius tokens table, scrollable" style="overflow-x:auto;border:1px solid var(--color-border-secondary);border-radius:var(--radius-md);">
        <table style="width:100%;border-collapse:collapse;font-size:var(--font-size-text-sm);">
          <thead>
            <tr style="background:var(--color-gray-light-mode-50);text-align:left;">
              <th style="padding:0.75rem 1rem;font-weight:600;">Name</th>
              <th style="padding:0.75rem 1rem;font-weight:600;">Size (16px base)</th>
              <th style="padding:0.75rem 1rem;font-weight:600;">Pixels</th>
              <th style="padding:0.75rem 1rem;font-weight:600;">Preview</th>
            </tr>
          </thead>
          <tbody>
            ${radiusTokens.map(
              (t) => html`
                <tr style="border-top:1px solid var(--color-border-secondary);">
                  <td style="padding:0.5rem 1rem;font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);">
                    ${t.name}
                  </td>
                  <td style="padding:0.5rem 1rem;font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);">
                    ${t.rem}
                  </td>
                  <td style="padding:0.5rem 1rem;color:var(--color-text-muted);">${t.px}</td>
                  <td style="padding:0.5rem 1rem;">
                    <div
                      role="img"
                      aria-label=${`${t.name} preview`}
                      style="width:48px;height:48px;background:var(--color-gray-light-mode-100);border:1px solid var(--color-border-secondary);border-radius:var(${t.varName});"
                    ></div>
                  </td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
    </div>
  `,
}

export const SemanticSpacingAndWidths: Story = {
  name: 'Spacing tokens & widths',
  render: () => html`
    <div style=${PAGE_PAD}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">${BREAD}</p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Spacing
      </h2>
      <p style="margin:0 0 1.5rem;font-size:var(--font-size-text-lg);line-height:var(--line-height-text-lg);color:var(--color-text-muted);max-width:72ch;">
        Semantic spacing tokens for gaps, padding, and margins inside components. Derived from the same 4px-based
        scale.
      </p>
      ${tableSection(
        'Spacing',
        '`spacing-xs` … `spacing-11xl` map to `--spacing-*` in CSS.',
        semanticSpacing,
        true,
      )}
      ${tableSection(
        'Width',
        'Use for section widths and max-widths for page elements.',
        widthTokens,
        true,
      )}
      ${tableSection(
        'Container',
        'Horizontal padding and max width for page shells.',
        containerTokens,
        true,
      )}
      <section style="margin-bottom:2rem;">
        <h3
          style="font-family:var(--font-family-display);font-size:var(--font-size-text-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--color-gray-light-mode-600);margin:0 0 0.75rem;"
        >
          Paragraph max width
        </h3>
        <p style="margin:0 0 1rem;font-size:var(--font-size-text-sm);color:var(--color-text-muted);max-width:72ch;">
          Long-form reading width. Token: <code style="font-family:var(--font-family-mono);font-size:11px;">--paragraph-max-width</code> (45rem / 720px).
        </p>
        <div
          style="width:var(--paragraph-max-width);max-width:100%;padding:var(--spacing-lg);background:var(--color-gray-light-mode-50);border-radius:var(--radius-md);border:1px dashed var(--color-border-secondary);font-size:var(--font-size-text-sm);line-height:var(--line-height-text-md);"
        >
          Example paragraph block constrained to <code>--paragraph-max-width</code>.
        </div>
      </section>
    </div>
  `,
}

function gridDemo(
  label: string,
  badge: string,
  width: string,
  cols: number,
  gutter: string,
  margin: string,
  contentNote: string,
) {
  return html`
    <div style="margin-bottom:2.5rem;">
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;flex-wrap:wrap;">
        <span style="font-weight:600;color:var(--color-text-heading);">${label}</span>
        <span
          style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:9999px;background:var(--color-gray-light-mode-100);color:var(--color-gray-light-mode-600);"
          >${badge}</span
        >
        <span style="font-size:var(--font-size-text-xs);color:var(--color-text-muted);">${width} wide</span>
      </div>
      <div
        style="width:${width};max-width:100%;box-sizing:border-box;margin:0 auto;border:1px solid var(--color-border-secondary);border-radius:var(--radius-md);padding:${margin};background:var(--color-base-white);"
      >
        <div
          style="display:grid;grid-template-columns:repeat(${cols}, 1fr);gap:${gutter};width:100%;box-sizing:border-box;"
        >
          ${Array.from(
            { length: cols },
            (_, i) => html`
              <div
                style="height:48px;background:var(--color-utility-brand-200);border-radius:var(--radius-sm);border:1px solid var(--color-utility-brand-300);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:var(--color-text-brand-tertiary-600);"
              >
                ${i + 1}
              </div>
            `,
          )}
        </div>
        <p style="margin:0.75rem 0 0;font-size:10px;color:var(--color-text-muted);font-family:var(--font-family-mono);">
          ${contentNote}
        </p>
      </div>
    </div>
  `
}

function gridAuto(cols: number) {
  return html`
    <div style="margin-bottom:1.5rem;">
      <h4 style="margin:0 0 0.5rem;font-size:var(--font-size-text-sm);font-weight:600;color:var(--color-text-heading);">
        ${cols} columns (auto)
      </h4>
      <div
        style="display:grid;grid-template-columns:repeat(${cols}, minmax(0, 1fr));gap:var(--layout-grid-desktop-gutter);width:100%;"
      >
        ${Array.from(
          { length: cols },
          () => html`
            <div
              style="height:40px;background:var(--color-gray-light-mode-100);border-radius:var(--radius-sm);border:1px solid var(--color-border-secondary);"
            ></div>
          `,
        )}
      </div>
    </div>
  `
}

export const GridLayouts: Story = {
  name: 'Grid layouts',
  render: () => html`
    <div style=${PAGE_PAD}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">${BREAD}</p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 0.75rem;color:var(--color-text-heading);"
      >
        Grid layouts
      </h2>
      <p style="margin:0 0 2rem;font-size:var(--font-size-text-lg);line-height:var(--line-height-text-lg);color:var(--color-text-muted);max-width:72ch;">
        Breakpoint grids define column count, gutters, and side margins. Tokens:
        <code style="font-family:var(--font-family-mono);font-size:11px;">--layout-grid-*</code>
      </p>
      <h3
        style="font-family:var(--font-family-display);font-size:var(--font-size-text-md);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Breakpoints
      </h3>
      ${gridDemo(
        'Desktop',
        '12 cols',
        'var(--layout-grid-desktop-width)',
        12,
        'var(--layout-grid-desktop-gutter)',
        'var(--layout-grid-desktop-margin)',
        'Content width ≈ 1216px · 12 columns · 20px gutter · 32px side margin (Figma).',
      )}
      ${gridDemo(
        'Tablet',
        '6 cols',
        'var(--layout-grid-tablet-width)',
        6,
        'var(--layout-grid-tablet-gutter)',
        'var(--layout-grid-tablet-margin)',
        'Content width ≈ 704px · 6 columns · 20px gutter · 32px side margin.',
      )}
      ${gridDemo(
        'Mobile',
        '4 cols',
        'var(--layout-grid-mobile-width)',
        4,
        'var(--layout-grid-mobile-gutter)',
        'var(--layout-grid-mobile-margin)',
        'Content width ≈ 343px · 4 columns · 16px gutter · 16px side margin.',
      )}
      <h3
        style="font-family:var(--font-family-display);font-size:var(--font-size-text-md);font-weight:600;margin:2rem 0 1rem;color:var(--color-text-heading);"
      >
        Container grid layouts
      </h3>
      <p style="margin:0 0 1rem;font-size:var(--font-size-text-sm);color:var(--color-text-muted);max-width:72ch;">
        Equal columns that grow with the parent; use inside sections or components.
      </p>
      ${gridAuto(12)} ${gridAuto(6)} ${gridAuto(5)} ${gridAuto(3)} ${gridAuto(2)}
    </div>
  `,
}
