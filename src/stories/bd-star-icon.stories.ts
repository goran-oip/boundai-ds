import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type { BdStarIconColor } from '../components/bd-star-icon.js'
import '../components/bd-star-icon.js'

type BdStarIconArgs = {
  fill: number
  color: BdStarIconColor
  label: string
}

const meta = {
  title: 'Base Components/bd-star-icon',
  id: 'components-bd-star-icon',
  tags: ['autodocs'],
  render: (args: BdStarIconArgs) =>
    html`<bd-star-icon
      .fill=${args.fill}
      color=${args.color}
      label=${args.label || ''}
    ></bd-star-icon>`,
  args: {
    fill: 60,
    color: 'yellow',
    label: '',
  } satisfies BdStarIconArgs,
  argTypes: {
    fill: { control: { type: 'range', min: 0, max: 100, step: 10 } },
    color: { control: 'select', options: ['yellow', 'gray'] },
    label: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: '20×20 star with partial fill (0–100%). Figma node `1232:9`.',
      },
    },
  },
} satisfies Meta<BdStarIconArgs>

export default meta
type Story = StoryObj<BdStarIconArgs>

export const Playground: Story = {}

/** Figma `1232:9` — eleven fill levels 0% … 100% in 10% steps (yellow + gray). */
export const AllFillStates: StoryObj = {
  name: 'All fill states (0–100%, step 10)',
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:1.25rem;padding:1rem;font-family:var(--font-family-body);"
    >
      <div style="display:flex;gap:0.5rem;align-items:flex-end;flex-wrap:wrap;">
        ${[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
          (f) => html`
            <div style="display:flex;flex-direction:column;align-items:center;gap:0.25rem;">
              <bd-star-icon .fill=${f} color="yellow"></bd-star-icon>
              <span style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);"
                >${f}%</span
              >
            </div>
          `,
        )}
      </div>
      <div style="display:flex;gap:0.5rem;align-items:flex-end;flex-wrap:wrap;">
        ${[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
          (f) => html`
            <div style="display:flex;flex-direction:column;align-items:center;gap:0.25rem;">
              <bd-star-icon .fill=${f} color="gray"></bd-star-icon>
              <span style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);"
                >${f}%</span
              >
            </div>
          `,
        )}
      </div>
    </div>
  `,
}
