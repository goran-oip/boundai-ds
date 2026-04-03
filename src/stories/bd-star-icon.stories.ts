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
  title: 'Components/bd-star-icon',
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
