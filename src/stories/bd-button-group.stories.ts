import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-button-group.js'

const circleIcon = html`<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
</svg>`

type BdButtonGroupArgs = {
  layout: 'text' | 'leading' | 'icon-only'
  label: string
}

const meta = {
  title: 'Components/bd-button-group',
  tags: ['autodocs'],
  render: (args: BdButtonGroupArgs) => {
    if (args.layout === 'text') {
      return html`
        <bd-button-group layout=${args.layout} label=${args.label}>
          <bd-button-group-item>Day</bd-button-group-item>
          <bd-button-group-item selected>Week</bd-button-group-item>
          <bd-button-group-item>Month</bd-button-group-item>
        </bd-button-group>
      `
    }
    if (args.layout === 'leading') {
      return html`
        <bd-button-group layout=${args.layout} label=${args.label}>
          <bd-button-group-item>${circleIcon} Text</bd-button-group-item>
          <bd-button-group-item>${circleIcon} Text</bd-button-group-item>
          <bd-button-group-item>${circleIcon} Text</bd-button-group-item>
        </bd-button-group>
      `
    }
    return html`
      <bd-button-group layout="icon-only" label=${args.label}>
        <bd-button-group-item aria-label="Previous">${arrowLeft}</bd-button-group-item>
        <bd-button-group-item aria-label="Add">${plusIcon}</bd-button-group-item>
        <bd-button-group-item aria-label="Next">${arrowRight}</bd-button-group-item>
      </bd-button-group>
    `
  },
  args: {
    layout: 'text',
    label: 'Example button group',
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['text', 'leading', 'icon-only'],
      description:
        'Matches Figma **Button group** (`1046:10171`): text-only, icon + text, or icon-only segments',
    },
    label: {
      control: 'text',
      description: '`aria-label` on the group (`role="group"`)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-button-group>` groups **`<bd-button-group-item>`** segments into one bordered control (toolbar, split actions, or segmented “tabs” like date ranges). Use **`layout`** on the group; items must be **direct children**. Focus ring uses **`--color-focus-ring`** (blue).',
      },
    },
  },
} satisfies Meta<BdButtonGroupArgs>

const arrowLeft = html`<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M15 18l-6-6 6-6"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const plusIcon = html`<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M12 5v14M5 12h14"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  />
</svg>`

const arrowRight = html`<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M9 18l6-6-6-6"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

export default meta
type Story = StoryObj<BdButtonGroupArgs>

export const Text: Story = {
  args: { layout: 'text' },
}

export const LeadingIcon: Story = {
  args: { layout: 'leading' },
}

export const IconOnly: Story = {
  args: { layout: 'icon-only' },
}

/** Segmented control pattern — toggle `selected` in app state (Storybook demo: Week is selected). */
export const DateRangeToolbar: Story = {
  render: () => html`
    <bd-button-group layout="text" label="Date range">
      <bd-button-group-item>24h</bd-button-group-item>
      <bd-button-group-item selected>7d</bd-button-group-item>
      <bd-button-group-item>30d</bd-button-group-item>
      <bd-button-group-item>Custom</bd-button-group-item>
    </bd-button-group>
  `,
}

export const WithDisabled: Story = {
  render: () => html`
    <bd-button-group layout="text" label="Actions">
      <bd-button-group-item>Left</bd-button-group-item>
      <bd-button-group-item disabled>Disabled</bd-button-group-item>
      <bd-button-group-item>Right</bd-button-group-item>
    </bd-button-group>
  `,
}
