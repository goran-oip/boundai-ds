import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-featured-icon.js'

type BdFeaturedIconArgs = {
  variant: string
  color: string
  size: string
  label: string
}

const meta = {
  title: 'Base Components/bd-featured-icon',
  id: 'components-bd-featured-icon',
  tags: ['autodocs'],
  render: (args: BdFeaturedIconArgs) =>
    html`<bd-featured-icon
      variant=${args.variant}
      color=${args.color}
      size=${args.size}
      label=${args.label || ''}
    ></bd-featured-icon>`,
  args: {
    variant: 'light',
    color: 'brand',
    size: 'md',
    label: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'gradient', 'dark', 'modern', 'modern-neue'],
    },
    color: {
      control: 'select',
      options: ['brand', 'gray', 'error', 'warning', 'success'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    label: { control: 'text' },
  },
} satisfies Meta<BdFeaturedIconArgs>

export default meta
type Story = StoryObj<BdFeaturedIconArgs>

export const Playground: Story = {}
