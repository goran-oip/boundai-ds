import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-featured-icon-outline.js'

type BdFeaturedIconOutlineArgs = {
  color: string
  size: string
  label: string
}

const meta = {
  title: 'Components/bd-featured-icon-outline',
  tags: ['autodocs'],
  render: (args: BdFeaturedIconOutlineArgs) =>
    html`<bd-featured-icon-outline
      color=${args.color}
      size=${args.size}
      label=${args.label || ''}
    ></bd-featured-icon-outline>`,
  args: { color: 'brand', size: 'md', label: '' },
  argTypes: {
    color: {
      control: 'select',
      options: ['brand', 'gray', 'error', 'warning', 'success'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    label: { control: 'text' },
  },
} satisfies Meta<BdFeaturedIconOutlineArgs>

export default meta
type Story = StoryObj<BdFeaturedIconOutlineArgs>

export const Playground: Story = {}
