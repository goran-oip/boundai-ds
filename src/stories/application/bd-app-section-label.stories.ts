import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../../components/application/bd-app-section-label.js'
import '../../components/bd-button.js'
import '../../components/bd-tooltip.js'

type BdAppSectionLabelArgs = {
  size: 'sm' | 'md'
  label: string
  description: string
  required: boolean
  help: boolean
  hasActions: boolean
}

const meta = {
  title: 'Application Components/bd-app-section-label',
  id: 'app-bd-app-section-label',
  tags: ['autodocs'],
  render: (args: BdAppSectionLabelArgs) =>
    html`<bd-app-section-label
      size=${args.size}
      label=${args.label}
      description=${args.description}
      ?required=${args.required}
      ?help=${args.help}
      ?hasActions=${args.hasActions}
    ></bd-app-section-label>`,
  args: {
    size: 'sm',
    label: 'Section label',
    description: 'This is a hint text to help user.',
    required: false,
    help: false,
    hasActions: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Typography scale for the label row',
    },
    label: { control: 'text', description: 'Primary label (or default slot content)' },
    description: { control: 'text', description: 'Supporting line (or **`slot="description"`**)' },
    required: {
      control: 'boolean',
      description: 'Show a decorative required asterisk (pair with real form controls in app code)',
    },
    help: { control: 'boolean', description: 'Reserves space for **`slot="help"`**' },
    hasActions: {
      control: 'boolean',
      description: 'Reserve space for the right-side **`actions`** slot',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-app-section-label>` — Figma **Section label** (`5013:376534`): label, optional **required** asterisk, **`help`**, supporting text, optional **actions**.',
      },
    },
  },
} satisfies Meta<BdAppSectionLabelArgs>

export default meta
type Story = StoryObj<BdAppSectionLabelArgs>

export const Default: Story = {}

export const RequiredWithHelp: Story = {
  args: {
    required: true,
    help: true,
  },
  render: () => html`
    <bd-app-section-label required help label="Section label" description="This is a hint text to help user.">
      <bd-help-icon slot="help" placement="top-no-arrow"></bd-help-icon>
    </bd-app-section-label>
  `,
}

export const WithActions: Story = {
  args: {
    hasActions: true,
  },
  render: () => html`
    <bd-app-section-label hasActions label="Section label" description="This is a hint text to help user.">
      <div slot="actions" style="display:flex;flex-wrap:wrap;gap:var(--spacing-md);">
        <bd-button variant="tertiary" size="md">Secondary action</bd-button>
        <bd-button variant="tertiary" size="md">Primary action</bd-button>
      </div>
    </bd-app-section-label>
  `,
}

export const Full: Story = {
  name: 'Required, help, actions (md)',
  render: () => html`
    <bd-app-section-label
      size="md"
      required
      help
      hasActions
      label="Section label"
      description="This is a hint text to help user."
    >
      <bd-help-icon slot="help" placement="top-no-arrow"></bd-help-icon>
      <div slot="actions" style="display:flex;flex-wrap:wrap;gap:var(--spacing-md);">
        <bd-button variant="tertiary" size="md">Secondary action</bd-button>
        <bd-button variant="tertiary" size="md">Primary action</bd-button>
      </div>
    </bd-app-section-label>
  `,
}
