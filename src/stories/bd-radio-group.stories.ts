import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-radio-group.js'

const layersIcon = html`<svg
  slot="icon"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
    stroke="var(--color-gray-light-mode-600)"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const meta = {
  title: 'Base Components/bd-radio-group',
  id: 'components-bd-radio-group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-radio-group>` + `<bd-radio-group-item>` — Figma **Radio group** (`1142:87213`) and **Radio group item** (`124:2838`). **simple** = radio-in-card rows; **icon-card** = featured icon header + square check + price body. Selected border uses `--color-brand-ui-600`.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

/** Figma Type **Radio button** — stacked cards, radio + title / price + description. */
export const RadioButtonType: Story = {
  name: 'Radio button (simple)',
  render: () => html`
    <div style="max-width:768px;padding:var(--spacing-4xl);background:var(--color-surface-canvas)">
      <bd-radio-group name="plan-simple" label="Choose a plan">
        <bd-radio-group-item
          variant="simple"
          value="goran"
          title="Goran Petkovic"
          title-hint="$10/month"
          description="Includes up to 10 users, 20 GB individual data and access to all features."
          checked
        ></bd-radio-group-item>
        <bd-radio-group-item
          variant="simple"
          value="business"
          title="Business plan"
          title-hint="$20/month"
          description="Includes up to 10 users, 20 GB individual data and access to all features."
        ></bd-radio-group-item>
        <bd-radio-group-item
          variant="simple"
          value="enterprise"
          title="Enterprise plan"
          title-hint="$40/month"
          description="Includes up to 10 users, 20 GB individual data and access to all features."
        ></bd-radio-group-item>
        <bd-radio-group-item
          variant="simple"
          value="ultimate"
          title="Ultimate plan"
          title-hint="$60/month"
          description="Includes up to 10 users, 20 GB individual data and access to all features."
        ></bd-radio-group-item>
        <bd-radio-group-item
          variant="simple"
          value="secret"
          title="Secret plan"
          title-hint="$80/month"
          description="Includes up to 10 users, 20 GB individual data and access to all features."
        ></bd-radio-group-item>
      </bd-radio-group>
    </div>
  `,
}

/** Figma Type **Icon card** — header + body, square check indicator (still single-select radio). */
export const IconCardType: Story = {
  name: 'Icon card',
  render: () => html`
    <div style="max-width:768px;padding:var(--spacing-4xl);background:var(--color-surface-canvas)">
      <bd-radio-group name="plan-icon" label="Choose a plan">
        <bd-radio-group-item
          variant="icon-card"
          value="basic"
          heading="Basic plan"
          price="$10"
          period="per month"
          description="Includes up to 10 users, 20 GB individual data and access to all features."
          badge-label="Limited time only"
          checked
        >
          ${layersIcon}
        </bd-radio-group-item>
        <bd-radio-group-item
          variant="icon-card"
          value="business"
          heading="Business plan"
          price="$20"
          period="per month"
          description="Includes up to 20 users, 40 GB individual data and access to all features."
          badge-label="Limited time only"
        >
          ${layersIcon}
        </bd-radio-group-item>
        <bd-radio-group-item
          variant="icon-card"
          value="enterprise"
          heading="Enterprise plan"
          price="$40"
          period="per month"
          description="Unlimited users, unlimited individual data and access to all features."
          badge-label="Limited time only"
        >
          ${layersIcon}
        </bd-radio-group-item>
        <bd-radio-group-item
          variant="icon-card"
          value="ultimate"
          heading="Ultimate plan"
          price="$60"
          period="per month"
          description="Unlimited users, unlimited individual data and access to all features."
          badge-label="Limited time only"
        >
          ${layersIcon}
        </bd-radio-group-item>
        <bd-radio-group-item
          variant="icon-card"
          value="secret"
          heading="Secret plan"
          price="$80"
          period="per month"
          description="Unlimited users, unlimited individual data and access to all features."
          badge-label="Limited time only"
        >
          ${layersIcon}
        </bd-radio-group-item>
      </bd-radio-group>
    </div>
  `,
}

export const SimpleMd: Story = {
  name: 'Radio button · md',
  render: () => html`
    <div style="max-width:768px;padding:var(--spacing-4xl);background:var(--color-surface-canvas)">
      <bd-radio-group name="plan-md" label="Plans">
        <bd-radio-group-item
          variant="simple"
          size="md"
          value="a"
          title="Option A"
          title-hint="$12/mo"
          description="Description for option A."
          checked
        ></bd-radio-group-item>
        <bd-radio-group-item
          variant="simple"
          size="md"
          value="b"
          title="Option B"
          title-hint="$24/mo"
          description="Description for option B."
        ></bd-radio-group-item>
      </bd-radio-group>
    </div>
  `,
}
