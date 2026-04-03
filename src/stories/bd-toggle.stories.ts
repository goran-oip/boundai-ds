import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-toggle.js'

type BdToggleArgs = {
  checked: boolean
  disabled: boolean
  size: 'sm' | 'md'
  variant: 'default' | 'slim'
  label: string
  description: string
}

const meta = {
  title: 'Base Components/bd-toggle',
  id: 'components-bd-toggle',
  tags: ['autodocs'],
  render: (args: BdToggleArgs) =>
    html`<div style="padding:var(--spacing-4xl);background:var(--color-surface-canvas)">
      <bd-toggle
        ?checked=${args.checked}
        ?disabled=${args.disabled}
        size=${args.size}
        variant=${args.variant}
        label=${args.label}
        description=${args.description}
      ></bd-toggle>
    </div>`,
  args: {
    checked: false,
    disabled: false,
    size: 'md',
    variant: 'default',
    label: '',
    description: '',
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md'] },
    variant: { control: 'select', options: ['default', 'slim'] },
    label: { control: 'text' },
    description: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-toggle>` — Figma **Toggle** (`1102:4208`): **Default** / **Slim** tracks, **sm** / **md**, optional label + description (`--spacing-lg` / `--spacing-md` gap). ON uses `--color-brand-ui-600`, focus uses `--color-focus-ring`.',
      },
    },
  },
} satisfies Meta<BdToggleArgs>

export default meta
type Story = StoryObj<BdToggleArgs>

export const Off: Story = {
  args: { checked: false },
}

export const On: Story = {
  args: { checked: true },
}

export const DisabledOff: Story = {
  args: { checked: false, disabled: true },
}

export const DisabledOn: Story = {
  args: { checked: true, disabled: true },
}

export const Small: Story = {
  args: { size: 'sm', checked: true },
}

export const Slim: Story = {
  args: { variant: 'slim', checked: true },
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

export const SlimWithLabel: Story = {
  name: 'Slim · with label',
  args: {
    variant: 'slim',
    size: 'md',
    checked: true,
    label: 'Remember me',
    description: 'Save my login details for next time.',
  },
}
