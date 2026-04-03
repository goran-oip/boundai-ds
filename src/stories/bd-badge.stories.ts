import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type {
  BdBadgeColor,
  BdBadgeIcon,
  BdBadgeSize,
  BdBadgeVariant,
} from '../components/bd-badge.js'
import '../components/bd-badge.js'

const arrowUp = html`<svg
  width="12"
  height="12"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M12 19V5M5 12l7-7 7 7"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

type BdBadgeArgs = {
  variant: BdBadgeVariant
  size: BdBadgeSize
  color: BdBadgeColor
  icon: BdBadgeIcon
  label: string
}

const meta = {
  title: 'Components/bd-badge',
  tags: ['autodocs'],
  render: (args: BdBadgeArgs) => {
    if (args.icon === 'leading') {
      return html`<bd-badge
        variant=${args.variant}
        size=${args.size}
        color=${args.color}
        icon="leading"
        ><span slot="prefix">${arrowUp}</span>Label</bd-badge>`
    }
    if (args.icon === 'trailing') {
      return html`<bd-badge
        variant=${args.variant}
        size=${args.size}
        color=${args.color}
        icon="trailing"
        >Label<span slot="suffix">${arrowUp}</span></bd-badge>`
    }
    if (args.icon === 'only') {
      return html`<bd-badge
        variant=${args.variant}
        size=${args.size}
        color=${args.color}
        icon="only"
        label=${args.label || 'Status'}
        >${arrowUp}</bd-badge>`
    }
    return html`<bd-badge
      variant=${args.variant}
      size=${args.size}
      color=${args.color}
      icon=${args.icon}
      >Label</bd-badge>`
  },
  args: {
    variant: 'pill' as BdBadgeVariant,
    size: 'sm' as BdBadgeSize,
    color: 'brand' as BdBadgeColor,
    icon: 'none' as BdBadgeIcon,
    label: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['pill', 'badge', 'modern'],
      description:
        '**pill** — full radius · **badge** — `radius-sm` tint · **modern** — neutral surface + shadow (Figma `1046:3819`)',
    },
    size: { control: 'select', options: ['sm', 'md'] },
    color: {
      control: 'select',
      options: [
        'brand',
        'gray',
        'error',
        'warning',
        'success',
        'gray-blue',
        'blue-light',
        'blue',
        'indigo',
        'purple',
        'pink',
        'orange',
      ],
      description: '`brand` uses **Blue dark** utilities (product blue)',
    },
    icon: {
      control: 'select',
      options: ['none', 'dot', 'close', 'leading', 'trailing', 'only'],
    },
    label: {
      control: 'text',
      description: 'When `icon="only"` — sets accessible name',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-badge>` — Badges / chips (Figma **Badge** · `1046:3819`). Use **`bd-dismiss`** on `icon="close"`. **`brand`** maps to **Blue dark** scale.',
      },
    },
  },
} satisfies Meta<BdBadgeArgs>

export default meta
type Story = StoryObj<BdBadgeArgs>

export const PillBrand: Story = {
  args: { variant: 'pill', color: 'brand', icon: 'none' },
}

export const BadgeSuccess: Story = {
  args: { variant: 'badge', color: 'success', icon: 'none' },
}

export const ModernLeading: Story = {
  args: { variant: 'modern', color: 'brand', icon: 'leading' },
  render: () => html`
    <bd-badge variant="modern" color="brand" icon="leading">
      <span slot="prefix">${arrowUp}</span>
      Label
    </bd-badge>
  `,
}

export const PillWithDot: Story = {
  args: { variant: 'pill', color: 'brand', icon: 'dot' },
  render: () => html`<bd-badge variant="pill" color="brand" icon="dot">Label</bd-badge>`,
}

export const Removable: Story = {
  render: () => html`
    <bd-badge variant="pill" color="gray" icon="close" @bd-dismiss=${() => console.log('dismiss')}>
      Label
    </bd-badge>
  `,
}

export const ColorRow: Story = {
  render: () => html`
    <div
      style="display:flex;flex-wrap:wrap;gap:var(--spacing-sm);align-items:center;font-family:var(--font-family-body);"
    >
      <bd-badge variant="pill" color="brand">Brand</bd-badge>
      <bd-badge variant="pill" color="gray">Gray</bd-badge>
      <bd-badge variant="pill" color="error">Error</bd-badge>
      <bd-badge variant="pill" color="warning">Warning</bd-badge>
      <bd-badge variant="pill" color="success">Success</bd-badge>
      <bd-badge variant="pill" color="gray-blue">Gray blue</bd-badge>
      <bd-badge variant="pill" color="blue-light">Blue light</bd-badge>
      <bd-badge variant="pill" color="blue">Blue</bd-badge>
      <bd-badge variant="pill" color="indigo">Indigo</bd-badge>
      <bd-badge variant="pill" color="purple">Purple</bd-badge>
      <bd-badge variant="pill" color="pink">Pink</bd-badge>
      <bd-badge variant="pill" color="orange">Orange</bd-badge>
    </div>
  `,
}

export const SizeMd: Story = {
  render: () => html`
    <div style="display:flex;gap:var(--spacing-md);align-items:center;">
      <bd-badge variant="pill" size="md" color="brand">Label</bd-badge>
      <bd-badge variant="badge" size="md" color="brand">Label</bd-badge>
      <bd-badge variant="modern" size="md" color="brand" icon="leading">
        <span slot="prefix">${arrowUp}</span>
        Label
      </bd-badge>
    </div>
  `,
}
