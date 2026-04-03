import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-checkbox.js'

type BdCheckboxArgs = {
  checked: boolean
  indeterminate: boolean
  disabled: boolean
  size: 'sm' | 'md'
  label: string
  description: string
}

const meta = {
  title: 'Components/bd-checkbox',
  tags: ['autodocs'],
  render: (args: BdCheckboxArgs) =>
    html`<div style="padding:var(--spacing-4xl);background:var(--color-surface-canvas)">
      <bd-checkbox
        ?checked=${args.checked}
        ?indeterminate=${args.indeterminate}
        ?disabled=${args.disabled}
        size=${args.size}
        label=${args.label}
        description=${args.description}
      ></bd-checkbox>
    </div>`,
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: 'md',
    label: '',
    description: '',
  },
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md'] },
    label: { control: 'text' },
    description: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-checkbox>` — Figma **Checkbox** (`1097:63652`): **sm** / **md**, optional label + description, **indeterminate** (minus) state. Fill uses `--color-brand-ui-600`, focus uses `--color-focus-ring`.',
      },
    },
  },
} satisfies Meta<BdCheckboxArgs>

export default meta
type Story = StoryObj<BdCheckboxArgs>

export const Unchecked: Story = {
  args: { checked: false },
}

export const Checked: Story = {
  args: { checked: true },
}

export const Indeterminate: Story = {
  args: { checked: false, indeterminate: true },
}

export const DisabledUnchecked: Story = {
  args: { checked: false, disabled: true },
}

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true },
}

export const DisabledIndeterminate: Story = {
  args: { checked: false, indeterminate: true, disabled: true },
}

export const Small: Story = {
  args: { size: 'sm', checked: true },
}

export const WithLabelMd: Story = {
  name: 'With label (md)',
  args: {
    size: 'md',
    checked: true,
    label: 'Remember me',
    description: 'Save my login details for next time.',
  },
}

export const WithLabelSm: Story = {
  name: 'With label (sm)',
  args: {
    size: 'sm',
    checked: false,
    label: 'Remember me',
    description: 'Save my login details for next time.',
  },
}
