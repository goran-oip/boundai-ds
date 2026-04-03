import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type {
  BdBadgeGroupColor,
  BdBadgeGroupLayout,
  BdBadgeGroupSize,
  BdBadgeGroupVariant,
} from '../components/bd-badge-group.js'
import '../components/bd-badge-group.js'

type Args = {
  layout: BdBadgeGroupLayout
  variant: BdBadgeGroupVariant
  size: BdBadgeGroupSize
  color: BdBadgeGroupColor
  icon: boolean
  clickable: boolean
  badge: string
  message: string
}

const meta = {
  title: 'Base Components/bd-badge-group',
  id: 'components-bd-badge-group',
  tags: ['autodocs'],
  render: (args: Args) => html`
    <bd-badge-group
      layout=${args.layout}
      variant=${args.variant}
      size=${args.size}
      color=${args.color}
      ?icon=${args.icon}
      ?clickable=${args.clickable}
      label=${args.clickable ? `${args.badge}. ${args.message}` : ''}
    >
      ${args.message}
      <span slot="badge">${args.badge}</span>
    </bd-badge-group>
  `,
  args: {
    layout: 'leading',
    variant: 'pill',
    size: 'md',
    color: 'brand',
    icon: true,
    clickable: false,
    badge: 'New feature',
    message: "We've just released a new feature",
  },
  argTypes: {
    layout: { control: 'select', options: ['leading', 'trailing'] },
    variant: { control: 'select', options: ['pill', 'modern'] },
    size: { control: 'select', options: ['md', 'lg'] },
    color: {
      control: 'select',
      options: ['gray', 'brand', 'error', 'warning', 'success'],
    },
    icon: { control: 'boolean' },
    clickable: { control: 'boolean' },
    badge: { control: 'text' },
    message: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-badge-group>` — Figma **Badge group** (`1046:8088`): pill or modern shell, badge on **leading** or **trailing** side. **`brand`** uses **Blue dark** utilities. Pair with **`bd-button-group`** in layouts as needed; this component is for announcement rows, not segmented controls.',
      },
    },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

export const LeadingPillBrand: Story = {}

export const TrailingPillError: Story = {
  args: {
    layout: 'trailing',
    color: 'error',
    badge: 'Fix now',
    message: 'There was a problem with that action',
  },
}

export const LeadingModernBrand: Story = {
  args: {
    variant: 'modern',
    color: 'brand',
  },
}

export const TrailingModernSuccess: Story = {
  args: {
    layout: 'trailing',
    variant: 'modern',
    color: 'success',
    badge: 'Success',
    message: "You've updated your profile and details",
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    color: 'brand',
  },
}

export const NoIcon: Story = {
  args: {
    icon: false,
    color: 'warning',
    badge: 'Warning',
    message: 'Just to let you know this might be a problem',
  },
}

export const Clickable: Story = {
  args: {
    clickable: true,
    color: 'brand',
  },
  render: (args: Args) => html`
    <bd-badge-group
      layout=${args.layout}
      variant=${args.variant}
      size=${args.size}
      color=${args.color}
      ?icon=${args.icon}
      ?clickable=${args.clickable}
      label="New feature announcement"
      @bd-click=${() => console.log('bd-badge-group click')}
    >
      ${args.message}
      <span slot="badge">${args.badge}</span>
    </bd-badge-group>
  `,
}

export const OverviewRow: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:var(--spacing-lg);align-items:flex-start;font-family:var(--font-family-body);"
    >
      <bd-badge-group layout="leading" variant="pill" color="brand">
        We've just released a new feature
        <span slot="badge">New feature</span>
      </bd-badge-group>
      <bd-badge-group layout="trailing" variant="pill" color="error">
        There was a problem with that action
        <span slot="badge">Fix now</span>
      </bd-badge-group>
      <bd-badge-group layout="leading" variant="modern" color="success">
        You've updated your profile and details
        <span slot="badge">Success</span>
      </bd-badge-group>
    </div>
  `,
}
