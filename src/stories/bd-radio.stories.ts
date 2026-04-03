import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-radio.js'

type BdRadioArgs = {
  checked: boolean
  disabled: boolean
  size: 'sm' | 'md'
  name: string
  value: string
  label: string
  description: string
}

const meta = {
  title: 'Components/bd-radio',
  tags: ['autodocs'],
  render: (args: BdRadioArgs) =>
    html`<div style="padding:var(--spacing-4xl);background:var(--color-surface-canvas)">
      <bd-radio
        ?checked=${args.checked}
        ?disabled=${args.disabled}
        size=${args.size}
        name=${args.name}
        value=${args.value}
        label=${args.label}
        description=${args.description}
      ></bd-radio>
    </div>`,
  args: {
    checked: false,
    disabled: false,
    size: 'md',
    name: 'demo',
    value: 'a',
    label: '',
    description: '',
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md'] },
    name: { control: 'text' },
    value: { control: 'text' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-radio>` — Figma **Radio** (`1097:63652`): **sm** / **md**, `name` / `value` for groups, optional label + description. Fill uses `--color-brand-ui-600`, focus uses `--color-focus-ring`.',
      },
    },
  },
} satisfies Meta<BdRadioArgs>

export default meta
type Story = StoryObj<BdRadioArgs>

export const Unchecked: Story = {
  args: { checked: false, name: 'demo', value: 'a' },
}

export const Checked: Story = {
  args: { checked: true, name: 'demo', value: 'a' },
}

export const DisabledUnchecked: Story = {
  args: { checked: false, disabled: true, name: 'demo', value: 'a' },
}

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true, name: 'demo', value: 'a' },
}

export const Small: Story = {
  args: { size: 'sm', checked: true, name: 'demo', value: 'a' },
}

export const WithLabelMd: Story = {
  name: 'With label (md)',
  args: {
    size: 'md',
    checked: true,
    name: 'demo',
    value: 'a',
    label: 'Email me product news',
    description: 'We will not share your address with third parties.',
  },
}

export const WithLabelSm: Story = {
  name: 'With label (sm)',
  args: {
    size: 'sm',
    checked: false,
    name: 'demo',
    value: 'a',
    label: 'Email me product news',
    description: 'We will not share your address with third parties.',
  },
}

export const Group: Story = {
  name: 'Group (same name)',
  render: () => html`
    <div style="padding:var(--spacing-4xl);background:var(--color-surface-canvas);display:flex;flex-direction:column;gap:var(--spacing-lg)">
      <bd-radio name="plan" value="starter" label="Starter" description="For individuals."></bd-radio>
      <bd-radio name="plan" value="pro" checked label="Pro" description="For growing teams."></bd-radio>
      <bd-radio name="plan" value="enterprise" label="Enterprise" description="For organizations."></bd-radio>
    </div>
  `,
}
