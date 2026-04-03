import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

const meta = {
  title: 'Foundations/Component utility',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma **Component colors** (Alpha + Utility palettes), **spacing**, and **radius** from node `6487:347428`. CSS: `tokens-part2-component-utility.css` (imported by `tokens.css`).',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

function sectionSlug(title: string) {
  return title.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
}

function swatchSection(title: string, rows: { label: string; varName: string }[]) {
  const sid = sectionSlug(title)
  return html`
    <section style="margin-bottom:2rem;" aria-labelledby=${`cu-${sid}`}>
      <h3
        id=${`cu-${sid}`}
        style="font-family:var(--font-family-display);font-size:1rem;font-weight:600;margin:0 0 0.75rem;color:var(--color-text-heading);"
      >
        ${title}
      </h3>
      <div
        style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0.5rem 1rem;"
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

export const Alpha: Story = {
  render: () => html`
    <div
      style="padding:1.5rem;max-width:960px;font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);"
    >
      ${swatchSection('Alpha / white', [
        { label: '10', varName: '--color-alpha-white-10' },
        { label: '20', varName: '--color-alpha-white-20' },
        { label: '30', varName: '--color-alpha-white-30' },
        { label: '40', varName: '--color-alpha-white-40' },
        { label: '50', varName: '--color-alpha-white-50' },
        { label: '60', varName: '--color-alpha-white-60' },
        { label: '70', varName: '--color-alpha-white-70' },
        { label: '80', varName: '--color-alpha-white-80' },
        { label: '90', varName: '--color-alpha-white-90' },
        { label: '100', varName: '--color-alpha-white-100' },
      ])}
      ${swatchSection('Alpha / black', [
        { label: '10', varName: '--color-alpha-black-10' },
        { label: '20', varName: '--color-alpha-black-20' },
        { label: '30', varName: '--color-alpha-black-30' },
        { label: '40', varName: '--color-alpha-black-40' },
        { label: '50', varName: '--color-alpha-black-50' },
        { label: '60', varName: '--color-alpha-black-60' },
        { label: '70', varName: '--color-alpha-black-70' },
        { label: '80', varName: '--color-alpha-black-80' },
        { label: '90', varName: '--color-alpha-black-90' },
        { label: '100', varName: '--color-alpha-black-100' },
      ])}
    </div>
  `,
}

export const UtilityGrayAndBrand: Story = {
  render: () => html`
    <div
      style="padding:1.5rem;max-width:960px;font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);"
    >
      ${swatchSection('Utility / Gray', [
        { label: '50', varName: '--color-utility-gray-50' },
        { label: '100', varName: '--color-utility-gray-100' },
        { label: '200', varName: '--color-utility-gray-200' },
        { label: '300', varName: '--color-utility-gray-300' },
        { label: '400', varName: '--color-utility-gray-400' },
        { label: '500', varName: '--color-utility-gray-500' },
        { label: '600', varName: '--color-utility-gray-600' },
        { label: '700', varName: '--color-utility-gray-700' },
        { label: '800', varName: '--color-utility-gray-800' },
        { label: '900', varName: '--color-utility-gray-900' },
      ])}
      ${swatchSection('Utility / Brand', [
        { label: '50', varName: '--color-utility-brand-50' },
        { label: '100', varName: '--color-utility-brand-100' },
        { label: '200', varName: '--color-utility-brand-200' },
        { label: '300', varName: '--color-utility-brand-300' },
        { label: '400', varName: '--color-utility-brand-400' },
        { label: '500', varName: '--color-utility-brand-500' },
        { label: '600', varName: '--color-utility-brand-600' },
        { label: '700', varName: '--color-utility-brand-700' },
        { label: '800', varName: '--color-utility-brand-800' },
        { label: '900', varName: '--color-utility-brand-900' },
      ])}
    </div>
  `,
}

export const UtilitySemantic: Story = {
  render: () => html`
    <div
      style="padding:1.5rem;max-width:960px;font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);"
    >
      ${swatchSection('Utility / Error', [
        { label: '50', varName: '--color-utility-error-50' },
        { label: '100', varName: '--color-utility-error-100' },
        { label: '200', varName: '--color-utility-error-200' },
        { label: '300', varName: '--color-utility-error-300' },
        { label: '400', varName: '--color-utility-error-400' },
        { label: '500', varName: '--color-utility-error-500' },
        { label: '600', varName: '--color-utility-error-600' },
        { label: '700', varName: '--color-utility-error-700' },
      ])}
      ${swatchSection('Utility / Warning', [
        { label: '50', varName: '--color-utility-warning-50' },
        { label: '100', varName: '--color-utility-warning-100' },
        { label: '200', varName: '--color-utility-warning-200' },
        { label: '300', varName: '--color-utility-warning-300' },
        { label: '400', varName: '--color-utility-warning-400' },
        { label: '500', varName: '--color-utility-warning-500' },
        { label: '600', varName: '--color-utility-warning-600' },
        { label: '700', varName: '--color-utility-warning-700' },
      ])}
      ${swatchSection('Utility / Success', [
        { label: '50', varName: '--color-utility-success-50' },
        { label: '100', varName: '--color-utility-success-100' },
        { label: '200', varName: '--color-utility-success-200' },
        { label: '300', varName: '--color-utility-success-300' },
        { label: '400', varName: '--color-utility-success-400' },
        { label: '500', varName: '--color-utility-success-500' },
        { label: '600', varName: '--color-utility-success-600' },
        { label: '700', varName: '--color-utility-success-700' },
      ])}
    </div>
  `,
}

export const UtilityBlueScales: Story = {
  render: () => html`
    <div
      style="padding:1.5rem;max-width:960px;font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);"
    >
      ${swatchSection('Utility / Gray blue', [
        { label: '50', varName: '--color-utility-gray-blue-50' },
        { label: '100', varName: '--color-utility-gray-blue-100' },
        { label: '200', varName: '--color-utility-gray-blue-200' },
        { label: '300', varName: '--color-utility-gray-blue-300' },
        { label: '400', varName: '--color-utility-gray-blue-400' },
        { label: '500', varName: '--color-utility-gray-blue-500' },
        { label: '600', varName: '--color-utility-gray-blue-600' },
        { label: '700', varName: '--color-utility-gray-blue-700' },
      ])}
      ${swatchSection('Utility / Blue light', [
        { label: '50', varName: '--color-utility-blue-light-50' },
        { label: '100', varName: '--color-utility-blue-light-100' },
        { label: '200', varName: '--color-utility-blue-light-200' },
        { label: '300', varName: '--color-utility-blue-light-300' },
        { label: '400', varName: '--color-utility-blue-light-400' },
        { label: '500', varName: '--color-utility-blue-light-500' },
        { label: '600', varName: '--color-utility-blue-light-600' },
        { label: '700', varName: '--color-utility-blue-light-700' },
      ])}
      ${swatchSection('Utility / Blue', [
        { label: '50', varName: '--color-utility-blue-50' },
        { label: '100', varName: '--color-utility-blue-100' },
        { label: '200', varName: '--color-utility-blue-200' },
        { label: '300', varName: '--color-utility-blue-300' },
        { label: '400', varName: '--color-utility-blue-400' },
        { label: '500', varName: '--color-utility-blue-500' },
        { label: '600', varName: '--color-utility-blue-600' },
        { label: '700', varName: '--color-utility-blue-700' },
      ])}
      ${swatchSection('Utility / Blue dark', [
        { label: '50', varName: '--color-utility-blue-dark-50' },
        { label: '100', varName: '--color-utility-blue-dark-100' },
        { label: '200', varName: '--color-utility-blue-dark-200' },
        { label: '300', varName: '--color-utility-blue-dark-300' },
        { label: '400', varName: '--color-utility-blue-dark-400' },
        { label: '500', varName: '--color-utility-blue-dark-500' },
        { label: '600', varName: '--color-utility-blue-dark-600' },
        { label: '700', varName: '--color-utility-blue-dark-700' },
      ])}
    </div>
  `,
}

export const UtilityAccentHues: Story = {
  render: () => html`
    <div
      style="padding:1.5rem;max-width:960px;font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);"
    >
      ${swatchSection('Utility / Indigo', [
        { label: '50', varName: '--color-utility-indigo-50' },
        { label: '100', varName: '--color-utility-indigo-100' },
        { label: '200', varName: '--color-utility-indigo-200' },
        { label: '300', varName: '--color-utility-indigo-300' },
        { label: '400', varName: '--color-utility-indigo-400' },
        { label: '500', varName: '--color-utility-indigo-500' },
        { label: '600', varName: '--color-utility-indigo-600' },
        { label: '700', varName: '--color-utility-indigo-700' },
      ])}
      ${swatchSection('Utility / Purple', [
        { label: '50', varName: '--color-utility-purple-50' },
        { label: '100', varName: '--color-utility-purple-100' },
        { label: '200', varName: '--color-utility-purple-200' },
        { label: '300', varName: '--color-utility-purple-300' },
        { label: '400', varName: '--color-utility-purple-400' },
        { label: '500', varName: '--color-utility-purple-500' },
        { label: '600', varName: '--color-utility-purple-600' },
        { label: '700', varName: '--color-utility-purple-700' },
      ])}
      ${swatchSection('Utility / Fuchsia', [
        { label: '50', varName: '--color-utility-fuchsia-50' },
        { label: '100', varName: '--color-utility-fuchsia-100' },
        { label: '200', varName: '--color-utility-fuchsia-200' },
        { label: '300', varName: '--color-utility-fuchsia-300' },
        { label: '400', varName: '--color-utility-fuchsia-400' },
        { label: '500', varName: '--color-utility-fuchsia-500' },
        { label: '600', varName: '--color-utility-fuchsia-600' },
        { label: '700', varName: '--color-utility-fuchsia-700' },
      ])}
      ${swatchSection('Utility / Pink', [
        { label: '50', varName: '--color-utility-pink-50' },
        { label: '100', varName: '--color-utility-pink-100' },
        { label: '200', varName: '--color-utility-pink-200' },
        { label: '300', varName: '--color-utility-pink-300' },
        { label: '400', varName: '--color-utility-pink-400' },
        { label: '500', varName: '--color-utility-pink-500' },
        { label: '600', varName: '--color-utility-pink-600' },
        { label: '700', varName: '--color-utility-pink-700' },
      ])}
      ${swatchSection('Utility / Orange dark', [
        { label: '50', varName: '--color-utility-orange-dark-50' },
        { label: '100', varName: '--color-utility-orange-dark-100' },
        { label: '200', varName: '--color-utility-orange-dark-200' },
        { label: '300', varName: '--color-utility-orange-dark-300' },
        { label: '400', varName: '--color-utility-orange-dark-400' },
        { label: '500', varName: '--color-utility-orange-dark-500' },
        { label: '600', varName: '--color-utility-orange-dark-600' },
        { label: '700', varName: '--color-utility-orange-dark-700' },
      ])}
      ${swatchSection('Utility / Orange', [
        { label: '50', varName: '--color-utility-orange-50' },
        { label: '100', varName: '--color-utility-orange-100' },
        { label: '200', varName: '--color-utility-orange-200' },
        { label: '300', varName: '--color-utility-orange-300' },
        { label: '400', varName: '--color-utility-orange-400' },
        { label: '500', varName: '--color-utility-orange-500' },
        { label: '600', varName: '--color-utility-orange-600' },
        { label: '700', varName: '--color-utility-orange-700' },
      ])}
    </div>
  `,
}

export const SpacingAndRadius: Story = {
  render: () => html`
    <div
      style="padding:1.5rem;max-width:960px;font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);"
    >
      <section style="margin-bottom:2rem;" aria-labelledby="sp-sec">
        <h3
          id="sp-sec"
          style="font-family:var(--font-family-display);font-size:1rem;font-weight:600;margin:0 0 0.75rem;color:var(--color-text-heading);"
        >
          Spacing/*
        </h3>
        <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;" role="list">
          ${[
            '--spacing-xxs',
            '--spacing-xs',
            '--spacing-sm',
            '--spacing-md',
            '--spacing-lg',
            '--spacing-xl',
            '--spacing-2xl',
            '--spacing-3xl',
            '--spacing-4xl',
            '--spacing-6xl',
            '--spacing-7xl',
            '--spacing-8xl',
            '--spacing-10xl',
          ].map(
            (v) => html`
              <div role="listitem" style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                <div
                  style="height:32px;background:var(--color-utility-brand-500);border-radius:4px;width:var(${v});min-width:2px;"
                  aria-hidden="true"
                ></div>
                <code style="font-size:10px;color:var(--color-text-muted);">${v}</code>
              </div>
            `,
          )}
        </div>
      </section>
      <section aria-labelledby="rad-sec">
        <h3
          id="rad-sec"
          style="font-family:var(--font-family-display);font-size:1rem;font-weight:600;margin:0 0 0.75rem;color:var(--color-text-heading);"
        >
          Radius/* & layout
        </h3>
        <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:flex-end;" role="list">
          ${[
            ['--radius-xs', '24px'],
            ['--radius-sm', '24px'],
            ['--radius-md', '24px'],
            ['--radius-xl', '24px'],
            ['--radius-3xl', '48px'],
            ['--radius-full', '48px'],
          ].map(
            ([r, box]) => html`
              <div role="listitem" style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                <div
                  style="width:${box};height:${box};background:var(--color-utility-gray-200);border-radius:var(${r});border:1px solid var(--color-border-secondary);"
                ></div>
                <code style="font-size:10px;color:var(--color-text-muted);">${r}</code>
              </div>
            `,
          )}
        </div>
        <p style="margin:1rem 0 0;font-size:var(--font-size-text-sm);color:var(--color-text-muted);">
          Layout: <code>--layout-width-2xl</code> (${'1024px'}),
          <code>--layout-paragraph-max-width</code> (${'720px'})
        </p>
      </section>
    </div>
  `,
}
