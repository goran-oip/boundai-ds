import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

/**
 * Figma Design System v1.1 — Effect styles:
 * - Shadows · `1532:352912`
 * - Focus rings · `5424:398991`
 * - Backdrop blurs · `1532:352913`
 */
const meta = {
  title: 'Foundations/Effect styles',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Elevation shadows, stacked focus-ring box-shadows, and backdrop blur tokens from `tokens.css`, aligned with Figma **Effect styles** foundations.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const PAGE_PAD =
  'padding:2rem;max-width:min(100%,1200px);font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);'
const BREAD = 'Foundations → Effect styles'

const shadowScale: { name: string; varName: string }[] = [
  { name: 'shadow-xs', varName: '--shadow-xs' },
  { name: 'shadow-sm', varName: '--shadow-sm' },
  { name: 'shadow-md', varName: '--shadow-md' },
  { name: 'shadow-lg', varName: '--shadow-lg' },
  { name: 'shadow-xl', varName: '--shadow-xl' },
  { name: 'shadow-2xl', varName: '--shadow-2xl' },
  { name: 'shadow-3xl', varName: '--shadow-3xl' },
]

const focusSamples: { name: string; varName: string; note?: string }[] = [
  {
    name: 'focus-ring (Figma swatch)',
    varName: '--shadow-effects-focus-ring',
    note: 'Brand ring (blue); matches `--shadow-focus-ring`.',
  },
  { name: 'focus-ring-error', varName: '--shadow-effects-focus-ring-error' },
  { name: 'focus-ring-shadow-xs', varName: '--shadow-effects-focus-ring-xs' },
  { name: 'focus-ring-shadow-sm', varName: '--shadow-effects-focus-ring-sm' },
  { name: 'focus-ring-error-shadow-xs', varName: '--shadow-effects-focus-ring-error-xs' },
  {
    name: 'focus-ring-shadow-xs-skeuomorphic',
    varName: '--shadow-effects-focus-ring-xs-skeuomorphic',
  },
  {
    name: 'focus-ring-error-shadow-xs-skeuomorphic',
    varName: '--shadow-effects-focus-ring-error-xs-skeuomorphic',
  },
]

const backdropSamples: { name: string; blurVar: string; px: string }[] = [
  { name: 'backdrop-blur-sm', blurVar: '--backdrop-blur-sm', px: '4px' },
  { name: 'backdrop-blur-md', blurVar: '--backdrop-blur-md', px: '8px' },
  { name: 'backdrop-blur-lg', blurVar: '--backdrop-blur-lg', px: '12px' },
  { name: 'backdrop-blur-xl', blurVar: '--backdrop-blur-xl', px: '20px' },
]

export const Shadows: Story = {
  name: 'Shadows',
  render: () => html`
    <div style=${PAGE_PAD}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">${BREAD}</p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 0.75rem;color:var(--color-text-heading);"
      >
        Shadows
      </h2>
      <p style="margin:0 0 2rem;font-size:var(--font-size-text-lg);line-height:var(--line-height-text-lg);color:var(--color-text-muted);max-width:72ch;">
        Elevation scale from <code style="font-family:var(--font-family-mono);font-size:0.9em;">xs</code> through
        <code style="font-family:var(--font-family-mono);font-size:0.9em;">3xl</code>. Semantic aliases:
        <code style="font-family:var(--font-family-mono);font-size:0.9em;">--shadow-button-xs</code> →
        <code style="font-family:var(--font-family-mono);font-size:0.9em;">--shadow-xs</code>,
        <code style="font-family:var(--font-family-mono);font-size:0.9em;">--shadow-toggle-thumb</code> →
        <code style="font-family:var(--font-family-mono);font-size:0.9em;">--shadow-sm</code>,
        <code style="font-family:var(--font-family-mono);font-size:0.9em;">--shadow-dropdown-panel</code> →
        <code style="font-family:var(--font-family-mono);font-size:0.9em;">--shadow-lg</code>.
      </p>
      <div
        style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.5rem;padding:2rem;border-radius:var(--radius-xl);background:var(--color-gray-light-mode-100);border:1px solid var(--color-border-secondary);"
      >
        ${shadowScale.map(
          (s) => html`
            <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;">
              <div
                style="width:100%;aspect-ratio:4/3;border-radius:var(--radius-lg);background:var(--color-bg-primary);box-shadow:var(${s.varName});"
              ></div>
              <div style="text-align:center;">
                <div style="font-size:var(--font-size-text-sm);font-weight:600;color:var(--color-text-heading);">
                  ${s.name}
                </div>
                <div
                  style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);margin-top:0.25rem;"
                >
                  var(${s.varName})
                </div>
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `,
}

export const FocusRings: Story = {
  name: 'Focus rings',
  render: () => html`
    <div style=${PAGE_PAD}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">${BREAD}</p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 0.75rem;color:var(--color-text-heading);"
      >
        Focus rings
      </h2>
      <p style="margin:0 0 2rem;font-size:var(--font-size-text-lg);line-height:var(--line-height-text-lg);color:var(--color-text-muted);max-width:72ch;">
        Stacked <code style="font-family:var(--font-family-mono);font-size:0.9em;">box-shadow</code> values (white gap +
        ring color, optionally with elevation and skeuomorphic insets). Samples use a 40×40px rounded square on a neutral
        canvas so the ring reads clearly.
      </p>
      <div
        style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.5rem;padding:2rem;border-radius:var(--radius-xl);background:var(--color-gray-light-mode-100);border:1px solid var(--color-border-secondary);"
      >
        ${focusSamples.map(
          (f) => html`
            <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;">
              <div
                role="img"
                aria-label=${f.name}
                style="width:80px;height:80px;border-radius:var(--radius-md);background:var(--color-bg-primary);box-shadow:var(${f.varName});"
              ></div>
              <div style="text-align:center;max-width:28ch;">
                <div style="font-size:var(--font-size-text-sm);font-weight:600;color:var(--color-text-heading);">
                  ${f.name}
                </div>
                <div
                  style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);margin-top:0.25rem;word-break:break-word;"
                >
                  var(${f.varName})
                </div>
                ${
                  f.note
                    ? html`<p style="margin:0.5rem 0 0;font-size:var(--font-size-text-xs);color:var(--color-text-muted);">
                      ${f.note}
                    </p>`
                    : null
                }
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `,
}

export const BackdropBlurs: Story = {
  name: 'Backdrop blurs',
  render: () => html`
    <div style=${PAGE_PAD}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">${BREAD}</p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 0.75rem;color:var(--color-text-heading);"
      >
        Backdrop blurs
      </h2>
      <p style="margin:0 0 2rem;font-size:var(--font-size-text-lg);line-height:var(--line-height-text-lg);color:var(--color-text-muted);max-width:72ch;">
        Blur radii are length tokens (<code style="font-family:var(--font-family-mono);font-size:0.9em;">--backdrop-blur-*</code>)
        for use with <code style="font-family:var(--font-family-mono);font-size:0.9em;">backdrop-filter: blur(var(--backdrop-blur-sm))</code>.
        Glass tints: <code style="font-family:var(--font-family-mono);font-size:0.9em;">--backdrop-tint-light</code> /
        <code style="font-family:var(--font-family-mono);font-size:0.9em;">--backdrop-tint-dark</code>.
      </p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
        <div>
          <h3
            style="font-family:var(--font-family-display);font-size:var(--font-size-text-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--color-gray-light-mode-600);margin:0 0 0.75rem;"
          >
            Light surface
          </h3>
          <div
            style="position:relative;height:280px;border-radius:var(--radius-xl);overflow:hidden;border:1px solid var(--color-border-secondary);background:linear-gradient(135deg,var(--color-utility-brand-200) 0%,var(--color-utility-brand-400) 50%,var(--color-success-300) 100%);"
          >
            <div
              style="position:absolute;inset:0;opacity:0.35;background-image:repeating-linear-gradient(45deg,transparent,transparent 12px,rgba(255,255,255,0.15) 12px,rgba(255,255,255,0.15) 24px);"
            ></div>
            <div
              style="position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;padding:1rem;align-content:center;"
            >
              ${backdropSamples.map(
                (b) => html`
                  <div
                    style="border-radius:var(--radius-lg);padding:1rem;min-height:100px;display:flex;flex-direction:column;justify-content:flex-end;background:var(--backdrop-tint-light);-webkit-backdrop-filter:blur(var(${b.blurVar}));backdrop-filter:blur(var(${b.blurVar}));border:1px solid rgba(255,255,255,0.5);"
                  >
                    <div style="font-size:var(--font-size-text-sm);font-weight:600;color:var(--color-text-heading);">
                      ${b.name}
                    </div>
                    <div style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);">
                      blur(${b.px})
                    </div>
                  </div>
                `,
              )}
            </div>
          </div>
        </div>
        <div>
          <h3
            style="font-family:var(--font-family-display);font-size:var(--font-size-text-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--color-gray-light-mode-600);margin:0 0 0.75rem;"
          >
            Dark surface
          </h3>
          <div
            style="position:relative;height:280px;border-radius:var(--radius-xl);overflow:hidden;border:1px solid var(--color-border-secondary);background:linear-gradient(145deg,#1a1a2e 0%,#16213e 40%,#0f3460 100%);"
          >
            <div
              style="position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;padding:1rem;align-content:center;"
            >
              ${backdropSamples.map(
                (b) => html`
                  <div
                    style="border-radius:var(--radius-lg);padding:1rem;min-height:100px;display:flex;flex-direction:column;justify-content:flex-end;background:var(--backdrop-tint-dark);-webkit-backdrop-filter:blur(var(${b.blurVar}));backdrop-filter:blur(var(${b.blurVar}));border:1px solid rgba(255,255,255,0.08);color:var(--color-gray-dark-mode-50);"
                  >
                    <div style="font-size:var(--font-size-text-sm);font-weight:600;">${b.name}</div>
                    <div style="font-family:var(--font-family-mono);font-size:11px;opacity:0.8;">blur(${b.px})</div>
                  </div>
                `,
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
}
