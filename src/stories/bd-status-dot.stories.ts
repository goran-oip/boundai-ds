import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type { BdStatusDotSize } from '../components/bd-status-dot.js'
import '../components/bd-status-dot.js'

type BdStatusDotArgs = {
  outline: boolean
  size: BdStatusDotSize
  label: string
}

const meta = {
  title: 'Components/bd-status-dot',
  tags: ['autodocs'],
  render: (args: BdStatusDotArgs) =>
    html`<bd-status-dot
      ?outline=${args.outline}
      size=${args.size}
      label=${args.label || ''}
    ></bd-status-dot>`,
  args: {
    outline: false,
    size: 'md',
    label: 'Online',
  } satisfies BdStatusDotArgs,
  argTypes: {
    outline: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Success status dot: solid sizes or outlined halo. Figma node `1046:12310`.',
      },
    },
  },
} satisfies Meta<BdStatusDotArgs>

export default meta
type Story = StoryObj<BdStatusDotArgs>

export const Playground: Story = {}
