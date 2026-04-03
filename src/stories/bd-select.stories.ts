import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-select.js'

const options = () => html`
  <bd-select-option value="phoenix">Phoenix Baker<span slot="supporting">@phoenix</span></bd-select-option>
  <bd-select-option value="goran">Goran Petkovic<span slot="supporting">@goran</span></bd-select-option>
  <bd-select-option value="lana">Lana Steiner<span slot="supporting">@lana</span></bd-select-option>
  <bd-select-option value="demi">Demi Wilkinson<span slot="supporting">@demi</span></bd-select-option>
  <bd-select-option value="candice">Candice Wu<span slot="supporting">@candice</span></bd-select-option>
`

type BdSelectArgs = {
  size: 'sm' | 'md'
  variant: 'default' | 'search'
  label: string
  hint: string
  placeholder: string
  required: boolean
  showHelp: boolean
  disabled: boolean
  value: string
}

const meta = {
  title: 'Components/bd-select',
  tags: ['autodocs'],
  render: (args: BdSelectArgs) =>
    html`<div style="padding:var(--spacing-4xl);max-width:360px;background:var(--color-surface-canvas)">
      <bd-select
        size=${args.size}
        variant=${args.variant}
        label=${args.label}
        hint=${args.hint}
        placeholder=${args.placeholder}
        ?required=${args.required}
        ?show-help=${args.showHelp}
        ?disabled=${args.disabled}
        .value=${args.value}
      >
        ${options()}
        ${args.variant === 'search' ? html`<span slot="shortcut">⌘K</span>` : null}
      </bd-select>
    </div>`,
  args: {
    size: 'md',
    variant: 'default',
    label: 'Team member',
    hint: 'This is a hint text to help user.',
    placeholder: 'Select a team member',
    required: true,
    showHelp: true,
    disabled: false,
    value: 'goran',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    variant: { control: 'select', options: ['default', 'search'] },
    label: { control: 'text' },
    hint: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    showHelp: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'text', description: 'Selected `bd-select-option` value' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-select>` + **`bd-select-option`** — Figma **Select** (`3281:377673`). Combobox trigger with label, optional hint, blue focus/open border (`--color-interactive-accent`). List panel matches trigger width and uses `--shadow-dropdown-panel`.',
      },
    },
  },
} satisfies Meta<BdSelectArgs>

export default meta
type Story = StoryObj<BdSelectArgs>

export const Default: Story = {}

export const Placeholder: Story = {
  args: {
    value: '',
    placeholder: 'Select a team member',
  },
}

export const SearchVariant: Story = {
  args: {
    variant: 'search',
    label: 'Search',
    value: 'goran',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    value: 'goran',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'goran',
  },
}
