import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-file-type-icon.js'

type BdFileTypeIconArgs = {
  appearance: string
  label: string
}

const meta = {
  title: 'Components/bd-file-type-icon',
  tags: ['autodocs'],
  render: (args: BdFileTypeIconArgs) =>
    html`<bd-file-type-icon appearance=${args.appearance} label=${args.label || ''}></bd-file-type-icon>`,
  args: { appearance: 'default', label: '' },
  argTypes: {
    appearance: { control: 'select', options: ['default', 'gray', 'solid'] },
    label: { control: 'text' },
  },
} satisfies Meta<BdFileTypeIconArgs>

export default meta
type Story = StoryObj<BdFileTypeIconArgs>

export const Playground: Story = {}
