import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type {
  BdCheckIconColor,
  BdCheckIconSize,
  BdCheckIconType,
} from '../components/bd-check-icon.js'
import '../components/bd-check-icon.js'

type BdCheckIconArgs = {
  type: BdCheckIconType
  color: BdCheckIconColor
  size: BdCheckIconSize
  label: string
}

const meta = {
  title: 'Base Components/bd-check-icon',
  id: 'components-bd-check-icon',
  tags: ['autodocs'],
  render: (args: BdCheckIconArgs) =>
    html`<bd-check-icon
      type=${args.type}
      color=${args.color}
      size=${args.size}
      label=${args.label || ''}
    ></bd-check-icon>`,
  args: {
    type: 'default',
    color: 'brand',
    size: 'md',
    label: '',
  } satisfies BdCheckIconArgs,
  argTypes: {
    type: { control: 'select', options: ['default', 'line', 'filled'] },
    color: { control: 'select', options: ['brand', 'gray', 'success'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    label: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Circular check mark (default fill, line outline, or filled). Figma node `1254:137887`.',
      },
    },
  },
} satisfies Meta<BdCheckIconArgs>

export default meta
type Story = StoryObj<BdCheckIconArgs>

export const Playground: Story = {}
