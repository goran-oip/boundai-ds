import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

/**
 * Color swatches mirror names in `src/styles/tokens.css` (Figma Design System v1.1).
 */
const meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primitive palettes, semantic text/background/border, app aliases, and derived surfaces. Dark mode updates several tokens via `prefers-color-scheme`.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

function sectionSlug(title: string) {
  return title.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
}

function section(title: string, rows: { label: string; varName: string }[]) {
  const sid = sectionSlug(title)
  return html`
    <section style="margin-bottom:2rem;" aria-labelledby=${`sec-${sid}`}>
      <h3
        id=${`sec-${sid}`}
        style="font-family:var(--font-family-display);font-size:1rem;font-weight:600;margin:0 0 0.75rem;color:var(--color-text-heading);"
      >
        ${title}
      </h3>
      <div
        style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:0.5rem 1rem;"
        role="list"
      >
        ${rows.map(
          ({ label, varName }) => html`
            <div style="display:flex;align-items:center;gap:0.5rem;" role="listitem">
              <div
                role="img"
                aria-label=${`${label}: ${varName}`}
                style="width:2.5rem;height:2rem;border-radius:6px;flex-shrink:0;border:1px solid var(--color-border-secondary);background:var(${varName});"
              ></div>
              <div style="min-width:0;">
                <div
                  style="font-size:11px;font-family:var(--font-family-mono);color:var(--color-text-muted);word-break:break-all;"
                >
                  ${varName}
                </div>
              </div>
            </div>
          `,
        )}
      </div>
    </section>
  `
}

export const Palette: Story = {
  render: () => html`
    <div
      style="padding:1.5rem;max-width:960px;font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);"
    >
      <h2
        style="font-family:var(--font-family-display);font-size:1.25rem;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Color tokens
      </h2>
      <p style="margin:0 0 1.5rem;color:var(--color-text-muted);font-size:0.875rem;">
        CSS custom properties from Figma (<code>Colors/*</code>). Dark mode follows
        <code>prefers-color-scheme</code>.
      </p>

      ${section('Base', [
        { label: 'white', varName: '--color-base-white' },
        { label: 'black', varName: '--color-base-black' },
      ])}
      ${section('Gray (light mode)', [
        { label: '25', varName: '--color-gray-light-mode-25' },
        { label: '50', varName: '--color-gray-light-mode-50' },
        { label: '100', varName: '--color-gray-light-mode-100' },
        { label: '200', varName: '--color-gray-light-mode-200' },
        { label: '300', varName: '--color-gray-light-mode-300' },
        { label: '400', varName: '--color-gray-light-mode-400' },
        { label: '500', varName: '--color-gray-light-mode-500' },
        { label: '600', varName: '--color-gray-light-mode-600' },
        { label: '700', varName: '--color-gray-light-mode-700' },
        { label: '800', varName: '--color-gray-light-mode-800' },
        { label: '900', varName: '--color-gray-light-mode-900' },
        { label: '950', varName: '--color-gray-light-mode-950' },
      ])}
      ${section('Gray (dark mode)', [
        { label: '100', varName: '--color-gray-dark-mode-100' },
        { label: '200', varName: '--color-gray-dark-mode-200' },
        { label: '300', varName: '--color-gray-dark-mode-300' },
        { label: '400', varName: '--color-gray-dark-mode-400' },
        { label: '500', varName: '--color-gray-dark-mode-500' },
        { label: '600', varName: '--color-gray-dark-mode-600' },
        { label: '700', varName: '--color-gray-dark-mode-700' },
        { label: '800', varName: '--color-gray-dark-mode-800' },
        { label: '900', varName: '--color-gray-dark-mode-900' },
        { label: '950', varName: '--color-gray-dark-mode-950' },
      ])}
      ${section('Blue dark (brand)', [
        { label: '25', varName: '--color-blue-dark-25' },
        { label: '50', varName: '--color-blue-dark-50' },
        { label: '100', varName: '--color-blue-dark-100' },
        { label: '200', varName: '--color-blue-dark-200' },
        { label: '300', varName: '--color-blue-dark-300' },
        { label: '400', varName: '--color-blue-dark-400' },
        { label: '500', varName: '--color-blue-dark-500' },
        { label: '600', varName: '--color-blue-dark-600' },
        { label: '700', varName: '--color-blue-dark-700' },
        { label: '800', varName: '--color-blue-dark-800' },
        { label: '900', varName: '--color-blue-dark-900' },
        { label: '950', varName: '--color-blue-dark-950' },
      ])}
      ${section('Error', [
        { label: '25', varName: '--color-error-25' },
        { label: '50', varName: '--color-error-50' },
        { label: '100', varName: '--color-error-100' },
        { label: '200', varName: '--color-error-200' },
        { label: '300', varName: '--color-error-300' },
        { label: '400', varName: '--color-error-400' },
        { label: '500', varName: '--color-error-500' },
        { label: '600', varName: '--color-error-600' },
        { label: '700', varName: '--color-error-700' },
        { label: '800', varName: '--color-error-800' },
        { label: '900', varName: '--color-error-900' },
        { label: '950', varName: '--color-error-950' },
      ])}
      ${section('Warning', [
        { label: '25', varName: '--color-warning-25' },
        { label: '50', varName: '--color-warning-50' },
        { label: '100', varName: '--color-warning-100' },
        { label: '200', varName: '--color-warning-200' },
        { label: '300', varName: '--color-warning-300' },
        { label: '400', varName: '--color-warning-400' },
        { label: '500', varName: '--color-warning-500' },
        { label: '600', varName: '--color-warning-600' },
        { label: '700', varName: '--color-warning-700' },
        { label: '800', varName: '--color-warning-800' },
        { label: '900', varName: '--color-warning-900' },
        { label: '950', varName: '--color-warning-950' },
      ])}
      ${section('Success', [
        { label: '25', varName: '--color-success-25' },
        { label: '50', varName: '--color-success-50' },
        { label: '100', varName: '--color-success-100' },
        { label: '200', varName: '--color-success-200' },
        { label: '300', varName: '--color-success-300' },
        { label: '400', varName: '--color-success-400' },
        { label: '500', varName: '--color-success-500' },
        { label: '600', varName: '--color-success-600' },
        { label: '700', varName: '--color-success-700' },
        { label: '800', varName: '--color-success-800' },
        { label: '900', varName: '--color-success-900' },
        { label: '950', varName: '--color-success-950' },
      ])}
    </div>
  `,
}

/** Figma `Colors/Text/*` — node 6472:97620 (part 1). */
export const TextSemantic: Story = {
  render: () => html`
    <div
      style="padding:1.5rem;max-width:960px;font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);"
    >
      <h2
        style="font-family:var(--font-family-display);font-size:1.25rem;margin:0 0 0.25rem;color:var(--color-text-heading);"
      >
        Colors/Text (semantic)
      </h2>
      <p style="margin:0 0 1.5rem;color:var(--color-text-muted);font-size:0.875rem;">
        Part 1 — Figma node <code>6472:97620</code>. Use for copy, labels, links, and status text (not
        foreground/icon tokens — those can follow in another export).
      </p>

      ${section('Hierarchy', [
        { label: 'primary 900', varName: '--color-text-primary-900' },
        { label: 'secondary 700', varName: '--color-text-secondary-700' },
        { label: 'tertiary 600', varName: '--color-text-tertiary-600' },
        { label: 'quaternary 500', varName: '--color-text-quaternary-500' },
      ])}
      ${section('Hover & on-brand', [
        { label: 'primary on-brand', varName: '--color-text-primary-on-brand' },
        { label: 'secondary hover', varName: '--color-text-secondary-hover' },
        { label: 'secondary on-brand', varName: '--color-text-secondary-on-brand' },
        { label: 'tertiary hover', varName: '--color-text-tertiary-hover' },
        { label: 'tertiary on-brand', varName: '--color-text-tertiary-on-brand' },
        { label: 'quaternary on-brand', varName: '--color-text-quaternary-on-brand' },
      ])}
      ${section('Utility', [
        { label: 'white', varName: '--color-text-white' },
        { label: 'disabled', varName: '--color-text-disabled' },
        { label: 'placeholder', varName: '--color-text-placeholder' },
        { label: 'placeholder subtle', varName: '--color-text-placeholder-subtle' },
      ])}
      ${section('Brand (blue)', [
        { label: 'brand primary 900', varName: '--color-text-brand-primary-900' },
        { label: 'brand secondary 700', varName: '--color-text-brand-secondary-700' },
        { label: 'brand secondary hover', varName: '--color-text-brand-secondary-hover' },
        { label: 'brand tertiary 600', varName: '--color-text-brand-tertiary-600' },
        { label: 'brand tertiary alt', varName: '--color-text-brand-tertiary-alt' },
      ])}
      ${section('Status', [
        { label: 'error primary 600', varName: '--color-text-error-primary-600' },
        { label: 'warning primary 600', varName: '--color-text-warning-primary-600' },
        { label: 'success primary 600', varName: '--color-text-success-primary-600' },
      ])}
    </div>
  `,
}

export const SemanticAndEffects: Story = {
  render: () => html`
    <div
      style="padding:1.5rem;max-width:960px;font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);"
    >
      <h2
        style="font-family:var(--font-family-display);font-size:1.25rem;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        Semantic, aliases &amp; effects
      </h2>
      <p style="margin:0 0 1.5rem;color:var(--color-text-muted);font-size:0.875rem;">
        Text/background/border from Figma, app-level aliases, derived interactive surfaces, elevation shadow, and status
        semantics (solid / muted / on-solid).
      </p>

      ${section('Text & surfaces (Figma)', [
        { label: 'text primary 900', varName: '--color-text-primary-900' },
        { label: 'text tertiary 600', varName: '--color-text-tertiary-600' },
        { label: 'text error primary hover', varName: '--color-text-error-primary-hover' },
        { label: 'bg primary', varName: '--color-bg-primary' },
        { label: 'bg primary hover', varName: '--color-bg-primary-hover' },
        { label: 'bg error primary', varName: '--color-bg-error-primary' },
        { label: 'bg error solid', varName: '--color-bg-error-solid' },
        { label: 'bg error solid hover', varName: '--color-bg-error-solid-hover' },
        { label: 'border primary', varName: '--color-border-primary' },
        { label: 'border secondary', varName: '--color-border-secondary' },
        { label: 'border disabled subtle', varName: '--color-border-disabled-subtle' },
        { label: 'border error subtle', varName: '--color-border-error-subtle' },
      ])}
      ${section('Brand UI & focus', [
        { label: 'brand ui 500', varName: '--color-brand-ui-500' },
        { label: 'brand ui 600', varName: '--color-brand-ui-600' },
        { label: 'focus ring', varName: '--color-focus-ring' },
      ])}
      ${section('App aliases', [
        { label: 'text default', varName: '--color-text-default' },
        { label: 'text heading', varName: '--color-text-heading' },
        { label: 'text muted', varName: '--color-text-muted' },
        { label: 'surface canvas', varName: '--color-surface-canvas' },
        { label: 'surface code', varName: '--color-surface-code' },
        { label: 'surface muted', varName: '--color-surface-muted' },
        { label: 'border default', varName: '--color-border-default' },
        { label: 'interactive accent', varName: '--color-interactive-accent' },
        { label: 'interactive accent muted', varName: '--color-interactive-accent-muted' },
        { label: 'interactive accent border', varName: '--color-interactive-accent-border' },
      ])}
      ${section('Derived brand surfaces', [
        { label: 'blue dark muted', varName: '--color-blue-dark-muted' },
        { label: 'blue dark border', varName: '--color-blue-dark-border' },
        { label: 'social bg muted', varName: '--color-social-bg-muted' },
      ])}
      <section style="margin-bottom:2rem;" aria-labelledby="shadow-demo">
        <h3
          id="shadow-demo"
          style="font-family:var(--font-family-display);font-size:1rem;font-weight:600;margin:0 0 0.75rem;color:var(--color-text-heading);"
        >
          Shadows & elevation
        </h3>
        <div style="display:flex;gap:var(--spacing-3xl);flex-wrap:wrap;align-items:start;">
          <div style="text-align:center;">
            <div
              style="width:200px;padding:1rem;border-radius:var(--radius-md);background:var(--color-surface-muted);color:var(--color-text-default);box-shadow:var(--shadow-default);"
            >
              --shadow-default
            </div>
          </div>
          <div style="text-align:center;">
            <div
              style="width:200px;padding:1rem;border-radius:var(--radius-md);background:var(--color-bg-primary);color:var(--color-text-default);border:1px solid var(--color-border-primary);box-shadow:var(--shadow-button-xs);"
            >
              --shadow-button-xs
            </div>
          </div>
          <div style="text-align:center;">
            <div
              style="width:200px;padding:1rem;border-radius:var(--radius-md);background:var(--color-bg-primary);color:var(--color-text-default);border:1px solid var(--color-border-primary);box-shadow:var(--shadow-button-xs), var(--shadow-button-skeuomorphic-inner);"
            >
              button-xs + skeuomorphic
            </div>
          </div>
          <div style="text-align:center;">
            <div
              style="width:200px;padding:1rem;border-radius:var(--radius-md);background:var(--color-bg-primary);color:var(--color-text-default);border:1px solid var(--color-border-primary);outline:2px solid var(--color-focus-ring);outline-offset:2px;"
            >
              --color-focus-ring (outline)
            </div>
          </div>
        </div>
      </section>
      ${section('Status semantics', [
        { label: 'error solid', varName: '--color-error-solid' },
        { label: 'error solid hover', varName: '--color-error-solid-hover' },
        { label: 'error muted', varName: '--color-error-muted' },
        { label: 'error on solid', varName: '--color-error-on-solid' },
        { label: 'warning solid', varName: '--color-warning-solid' },
        { label: 'warning solid hover', varName: '--color-warning-solid-hover' },
        { label: 'warning muted', varName: '--color-warning-muted' },
        { label: 'warning on solid', varName: '--color-warning-on-solid' },
        { label: 'success solid', varName: '--color-success-solid' },
        { label: 'success solid hover', varName: '--color-success-solid-hover' },
        { label: 'success muted', varName: '--color-success-muted' },
        { label: 'success on solid', varName: '--color-success-on-solid' },
      ])}
    </div>
  `,
}
