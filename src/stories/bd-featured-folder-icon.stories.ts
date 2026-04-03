import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-featured-folder-icon.js'

type BdFeaturedFolderIconArgs = {
  variant: string
  open: boolean
  label: string
}

const meta = {
  title: 'Base Components/bd-featured-folder-icon',
  id: 'components-bd-featured-folder-icon',
  tags: ['autodocs'],
  render: (args: BdFeaturedFolderIconArgs) =>
    html`<bd-featured-folder-icon
      variant=${args.variant}
      ?open=${args.open}
      label=${args.label || ''}
    ></bd-featured-folder-icon>`,
  args: { variant: 'brand', open: false, label: '' },
  argTypes: {
    variant: { control: 'select', options: ['brand', 'gray', 'noise'] },
    open: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<BdFeaturedFolderIconArgs>

export default meta
type Story = StoryObj<BdFeaturedFolderIconArgs>

export const Playground: Story = {}
