import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-progress-bar.js'
import '../components/bd-progress-circle.js'
import type { BdProgressBarLabel } from '../components/bd-progress-bar.js'

const barLabels: BdProgressBarLabel[] = [
  'none',
  'right',
  'bottom',
  'top-floating',
  'bottom-floating',
]

const meta = {
  title: 'Components/bd-progress',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**`<bd-progress-bar>`** — Figma **Progress bar** (`1085:57382`). **`<bd-progress-circle>`** — Figma **Progress circle** (`1084:2717`). Track gray-200, fill brand blue (`--color-text-brand-tertiary-600`).',
      },
    },
  },
} satisfies Meta

export default meta

export const ProgressBarMatrix: StoryObj = {
  name: 'Progress bar · label variants (40%)',
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:32px;padding:32px 24px;max-width:360px;background:var(--color-base-white);"
    >
      ${barLabels.map(
        (label) => html`
          <div style="display:flex;flex-direction:column;gap:8px;">
            <span
              style="font-family:var(--font-family-body);font-size:var(--font-size-text-xs);line-height:var(--line-height-text-xs);color:var(--color-gray-light-mode-600);"
              >${label}</span
            >
            <bd-progress-bar label=${label} .value=${40}></bd-progress-bar>
          </div>
        `,
      )}
    </div>
  `,
}

export const ProgressBarSteps: StoryObj = {
  name: 'Progress bar · 0–100% (right label)',
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:16px;padding:32px 24px;max-width:360px;background:var(--color-base-white);"
    >
      ${[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
        (v) => html`
          <bd-progress-bar label="right" .value=${v} style="width:320px;"></bd-progress-bar>
        `,
      )}
    </div>
  `,
}

export const ProgressCirclesRow: StoryObj = {
  name: 'Progress circle · sizes (circle, 40%)',
  render: () => html`
    <div
      style="display:flex;flex-wrap:wrap;gap:32px;align-items:flex-end;padding:40px 24px;background:var(--color-base-white);"
    >
      ${(['xxs', 'xs', 'sm', 'md', 'lg'] as const).map(
        (size) => html`
          <bd-progress-circle shape="circle" .size=${size} .value=${40} label-text="Active users"></bd-progress-circle>
        `,
      )}
    </div>
  `,
}

export const ProgressHalfRow: StoryObj = {
  name: 'Progress circle · half-circle (40%)',
  render: () => html`
    <div
      style="display:flex;flex-wrap:wrap;gap:40px;align-items:flex-end;padding:40px 24px;background:var(--color-base-white);"
    >
      ${(['xxs', 'xs', 'sm', 'md', 'lg'] as const).map(
        (size) => html`
          <bd-progress-circle
            shape="half-circle"
            .size=${size}
            .value=${40}
            label-text="Active users"
          ></bd-progress-circle>
        `,
      )}
    </div>
  `,
}
