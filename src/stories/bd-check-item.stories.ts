import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type {
  BdCheckIconColor,
  BdCheckIconSize,
  BdCheckIconType,
} from '../components/bd-check-icon.js'
import type { BdCheckItemBreakpoint } from '../components/bd-check-item.js'
import '../components/bd-check-item.js'

type BdCheckItemArgs = {
  type: BdCheckIconType
  color: BdCheckIconColor
  size: BdCheckIconSize
  breakpoint: BdCheckItemBreakpoint
  text: string
}

const meta = {
  title: 'Base Components/bd-check-item',
  id: 'components-bd-check-item',
  tags: ['autodocs'],
  render: (args: BdCheckItemArgs) =>
    html`<bd-check-item
        type=${args.type}
        color=${args.color}
        size=${args.size}
        breakpoint=${args.breakpoint}
      >
        ${args.text}
      </bd-check-item>`,
  args: {
    type: 'default',
    color: 'brand',
    size: 'sm',
    breakpoint: 'desktop',
    text: 'Unlimited projects and team members',
  } satisfies BdCheckItemArgs,
  argTypes: {
    type: { control: 'select', options: ['default', 'line', 'filled'] },
    color: { control: 'select', options: ['brand', 'gray', 'success'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    breakpoint: { control: 'select', options: ['desktop', 'mobile'] },
    text: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Check icon with body copy for feature lists. Figma node `1345:1610`.',
      },
    },
  },
} satisfies Meta<BdCheckItemArgs>

export default meta
type Story = StoryObj<BdCheckItemArgs>

export const Playground: Story = {}
