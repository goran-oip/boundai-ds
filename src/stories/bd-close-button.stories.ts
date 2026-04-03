import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-close-button.js'

type BdCloseButtonArgs = {
  size: 'sm' | 'md' | 'lg'
  darkBackground: boolean
  label: string
}

const meta = {
  title: 'Base Components/bd-close-button',
  id: 'components-bd-close-button',
  tags: ['autodocs'],
  render: (args: BdCloseButtonArgs) =>
    html`<bd-close-button
      size=${args.size}
      ?dark-background=${args.darkBackground}
      label=${args.label}
    ></bd-close-button>`,
  args: {
    size: 'md',
    darkBackground: false,
    label: 'Close',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Hit target 36 / 40 / 44px (Figma **Buttons/Button close X** · `2763:420129`)',
    },
    darkBackground: {
      control: 'boolean',
      description: 'Light icon on dark chrome; focus ring still uses `--color-focus-ring` (blue)',
    },
    label: {
      control: 'text',
      description: 'Accessible name (`aria-label`)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-close-button>` — Figma **Buttons/Button close X** (`2763:420129`). Icon-only dismiss; default × in the slot. Focus uses **blue** via `--color-focus-ring`.',
      },
    },
  },
} satisfies Meta<BdCloseButtonArgs>

export default meta
type Story = StoryObj<BdCloseButtonArgs>

export const Default: Story = {}

export const Small: Story = {
  args: { size: 'sm' },
}

export const Large: Story = {
  args: { size: 'lg' },
}

export const DarkBackground: Story = {
  render: () => html`
    <div
      style="display:inline-flex;align-items:center;justify-content:center;padding:var(--spacing-xl);background:var(--color-gray-dark-mode-900);border-radius:var(--radius-md);"
    >
      <bd-close-button dark-background label="Close dialog"></bd-close-button>
    </div>
  `,
}

export const SizeRow: Story = {
  render: () => html`
    <div style="display:flex;gap:var(--spacing-lg);align-items:center;">
      <bd-close-button size="sm"></bd-close-button>
      <bd-close-button size="md"></bd-close-button>
      <bd-close-button size="lg"></bd-close-button>
    </div>
  `,
}
