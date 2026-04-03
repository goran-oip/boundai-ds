import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-utility-button.js'

const icon16 = html`<svg
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M12 15a3 3 0 100-6 3 3 0 000 6z"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const icon20 = html`<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M12 15a3 3 0 100-6 3 3 0 000 6z"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

type BdUtilityButtonArgs = {
  hierarchy: 'secondary' | 'tertiary'
  size: 'xs' | 'sm'
  disabled: boolean
  label: string
}

const meta = {
  title: 'Base Components/bd-utility-button',
  id: 'components-bd-utility-button',
  tags: ['autodocs'],
  render: (args: BdUtilityButtonArgs) =>
    html`<bd-utility-button
      hierarchy=${args.hierarchy}
      size=${args.size}
      label=${args.label}
      ?disabled=${args.disabled}
      >${args.size === 'xs' ? icon16 : icon20}</bd-utility-button>`,
  args: {
    hierarchy: 'secondary',
    size: 'sm',
    disabled: false,
    label: 'Settings',
  },
  argTypes: {
    hierarchy: {
      control: 'select',
      options: ['secondary', 'tertiary'],
      description: 'Bordered vs ghost (Figma **Buttons/Button utility** · `8003:526508`)',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm'],
      description: '28px vs 36px min touch target',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
      description: 'Accessible name (inner `aria-label`); required for icon-only usage',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-utility-button>` — compact icon-only control. Set **`label`** for an accessible name. Focus ring uses **blue** (`--color-focus-ring`). Slot an icon (~16px for `xs`, ~20px for `sm`).',
      },
    },
  },
} satisfies Meta<BdUtilityButtonArgs>

export default meta
type Story = StoryObj<BdUtilityButtonArgs>

export const Secondary: Story = {
  args: { hierarchy: 'secondary' },
}

export const Tertiary: Story = {
  args: { hierarchy: 'tertiary' },
}

export const ExtraSmall: Story = {
  args: { size: 'xs' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Row: Story = {
  render: () => html`
    <div style="display:flex;gap:var(--spacing-md);align-items:center;flex-wrap:wrap;">
      <bd-utility-button hierarchy="secondary" size="sm" label="Settings">${icon20}</bd-utility-button>
      <bd-utility-button hierarchy="tertiary" size="sm" label="Settings">${icon20}</bd-utility-button>
      <bd-utility-button hierarchy="secondary" size="xs" label="Settings">${icon16}</bd-utility-button>
      <bd-utility-button hierarchy="tertiary" size="xs" label="Settings">${icon16}</bd-utility-button>
    </div>
  `,
}
