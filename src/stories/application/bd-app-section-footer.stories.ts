import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'

import '../../components/application/bd-app-section-footer.js'
import '../../components/bd-button.js'
import '../../components/bd-button-group.js'
import { lucideIconPlus } from '../../icons/lucide-preset.js'

function demoActions() {
  return html`
    <div slot="actions" style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--spacing-lg);">
      <bd-button variant="tertiary" size="md">Tertiary</bd-button>
      <bd-button variant="secondary" size="md">Secondary</bd-button>
      <bd-button variant="primary" size="md">Primary</bd-button>
    </div>
  `
}

function demoLeadingFull(desktopLabels: boolean) {
  /* Figma **Button group** `3275:372484`: text rows **16px** horizontal padding; trailing **+ Custom** row **14px** pl, **6px** icon gap — use **`layout="leading"`** and reset padding on text-only segments. */
  const padText = 'var(--spacing-xl)'
  return html`
    <div slot="leading" style="display:flex;flex-wrap:wrap;align-items:center;gap:inherit;">
      <bd-button-group layout="leading" label="Date range">
        <bd-button-group-item style="--bd-bg-item-pl: ${padText}; --bd-bg-item-pr: ${padText};" selected
          >${desktopLabels ? '12 months' : '12m'}</bd-button-group-item
        >
        <bd-button-group-item style="--bd-bg-item-pl: ${padText}; --bd-bg-item-pr: ${padText};"
          >${desktopLabels ? '30 days' : '30d'}</bd-button-group-item
        >
        <bd-button-group-item style="--bd-bg-item-pl: ${padText}; --bd-bg-item-pr: ${padText};"
          >${desktopLabels ? '7 days' : '7d'}</bd-button-group-item
        >
        <bd-button-group-item aria-label=${!desktopLabels ? 'Custom range' : nothing}>
          ${lucideIconPlus({ size: 20 })}
          ${desktopLabels ? 'Custom' : ''}
        </bd-button-group-item>
      </bd-button-group>
      <bd-button variant="tertiary" size="md">Learn more</bd-button>
    </div>
  `
}

function demoLeadingLinkOnly() {
  return html`
    <div slot="leading">
      <bd-button variant="tertiary" size="md">Learn more</bd-button>
    </div>
  `
}

type BdAppSectionFooterArgs = {
  variant: 'section' | 'card'
  divider: boolean
}

const meta = {
  title: 'Application Components/bd-app-section-footer',
  id: 'app-bd-app-section-footer',
  tags: ['autodocs'],
  render: (args: BdAppSectionFooterArgs) =>
    html`<bd-app-section-footer variant=${args.variant} ?divider=${args.divider}></bd-app-section-footer>`,
  args: {
    variant: 'section',
    divider: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['section', 'card'],
      description: '**Section** vs **Card** spacing / Figma variant',
    },
    divider: {
      control: 'boolean',
      description: 'Show a hairline divider above the footer row',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-app-section-footer>` — Figma **Section footer** (`3275:372571`): optional **divider**, **`leading`** (segmented **`bd-button-group`**, tertiary link), **`actions`**. **`variant`** maps to **Section** vs **Card** spacing.',
      },
    },
  },
} satisfies Meta<BdAppSectionFooterArgs>

export default meta
type Story = StoryObj<BdAppSectionFooterArgs>

export const Default: Story = {}

export const SectionWithToolbar: Story = {
  render: () => html`
    <bd-app-section-footer variant="section" divider>
      ${demoLeadingFull(true)}
      ${demoActions()}
    </bd-app-section-footer>
  `,
}

export const CardWithToolbar: Story = {
  render: () => html`
    <bd-app-section-footer variant="card" divider>
      ${demoLeadingFull(true)}
      ${demoActions()}
    </bd-app-section-footer>
  `,
}

export const LeadingLinkOnly: Story = {
  render: () => html`
    <bd-app-section-footer variant="section" divider>
      ${demoLeadingLinkOnly()}
      ${demoActions()}
    </bd-app-section-footer>
  `,
}

export const NoDivider: Story = {
  render: () => html`
    <bd-app-section-footer variant="section" ?divider=${false}>
      ${demoLeadingFull(true)}
      ${demoActions()}
    </bd-app-section-footer>
  `,
}

export const MobileWidth: Story = {
  name: 'Section · mobile width (short labels)',
  render: () => html`
    <div style="max-width:23.4375rem;border:1px dashed var(--color-border-primary);">
      <bd-app-section-footer variant="section" divider>
        ${demoLeadingFull(false)}
        ${demoActions()}
      </bd-app-section-footer>
    </div>
  `,
}
