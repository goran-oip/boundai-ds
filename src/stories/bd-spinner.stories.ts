import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { expect } from 'storybook/test'

import '../components/bd-spinner.js'

type BdSpinnerArgs = {
  size: 'sm' | 'md'
}

const meta = {
  title: 'Components/bd-spinner',
  tags: ['autodocs'],
  render: (args: BdSpinnerArgs) => html`<bd-spinner size=${args.size}></bd-spinner>`,
  args: {
    size: 'sm',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: '20px vs 24px ring (Figma **Buttons/Button loading icon** · `8993:429278`)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-spinner>` — indeterminate loading arc. Active segment uses **`--color-brand-ui-600`** (blue).',
      },
    },
  },
} satisfies Meta<BdSpinnerArgs>

export default meta
type Story = StoryObj<BdSpinnerArgs>

export const Default: Story = {}

export const Medium: Story = {
  args: { size: 'md' },
}

export const InlineWithText: Story = {
  render: () => html`
    <div
      style="display:flex;align-items:center;gap:var(--spacing-md);font-family:var(--font-family-body);font-size:var(--font-size-text-md);font-weight:var(--font-weight-regular);line-height:var(--line-height-text-md);color:var(--color-text-secondary);"
    >
      <bd-spinner size="sm"></bd-spinner>
      <span>Loading…</span>
    </div>
  `,
}

export const SizeRow: Story = {
  render: () => html`
    <div style="display:flex;gap:var(--spacing-xl);align-items:center;">
      <bd-spinner size="sm"></bd-spinner>
      <bd-spinner size="md"></bd-spinner>
    </div>
  `,
}

export const HasStatusRole: Story = {
  tags: ['interaction'],
  render: () => html`<bd-spinner size="sm"></bd-spinner>`,
  play: async ({ canvasElement }) => {
    await expect(canvasElement).toBeDefined()
  },
}
