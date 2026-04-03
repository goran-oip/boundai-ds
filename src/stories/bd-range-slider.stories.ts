import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-range-slider.js'
import type { BdRangeSliderLabel } from '../components/bd-range-slider.js'

const meta = {
  title: 'Base Components/bd-range-slider',
  id: 'components-bd-range-slider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**`<bd-range-slider>`** — Figma **Slider** (`1086:534`): dual-thumb range, 8px track, blue brand segment, 24px white thumbs (shadow-md). Labels: `none`, `bottom`, `top-floating`. Emits **`bd-input`** while dragging and **`bd-change`** on release.',
      },
    },
  },
} satisfies Meta

export default meta

const presets: { low: number; high: number }[] = [
  { low: 0, high: 25 },
  { low: 0, high: 50 },
  { low: 0, high: 75 },
  { low: 0, high: 100 },
  { low: 25, high: 50 },
  { low: 25, high: 75 },
  { low: 25, high: 100 },
  { low: 50, high: 75 },
  { low: 50, high: 100 },
  { low: 75, high: 100 },
]

function matrix(label: BdRangeSliderLabel) {
  return html`
    <div
      style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:40px 24px;padding:32px 24px;background:var(--color-base-white);"
    >
      ${presets.map(
        (p) => html`
          <div style="display:flex;flex-direction:column;gap:8px;">
            <span
              style="font-family:var(--font-family-body);font-size:var(--font-size-text-xs);line-height:var(--line-height-text-xs);color:var(--color-gray-light-mode-600);"
              >${p.low}% – ${p.high}%</span
            >
            <bd-range-slider
              label=${label}
              .valueLow=${p.low}
              .valueHigh=${p.high}
              style="width:320px;max-width:100%;"
            ></bd-range-slider>
          </div>
        `,
      )}
    </div>
  `
}

export const None: StoryObj = {
  name: 'Label · none',
  render: () => matrix('none'),
}

export const Bottom: StoryObj = {
  name: 'Label · bottom',
  render: () => matrix('bottom'),
}

export const TopFloating: StoryObj = {
  name: 'Label · top-floating',
  render: () => matrix('top-floating'),
}

export const Interactive: StoryObj = {
  name: 'Playground',
  render: () => html`
    <div style="padding:32px;background:var(--color-base-white);max-width:360px;">
      <bd-range-slider label="bottom" .valueLow=${25} .valueHigh=${75}></bd-range-slider>
    </div>
  `,
}
