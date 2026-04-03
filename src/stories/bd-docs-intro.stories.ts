import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-docs-intro.js'

const logoMark = `${import.meta.env.BASE_URL}boundai-logo.svg`

const chevronRight = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M7.5 15l5-5-5-5"
    stroke="currentColor"
    stroke-width="1.67"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const meta = {
  title: 'Base Components/bd-docs-intro',
  id: 'components-bd-docs-intro',
  tags: ['autodocs'],
  render: () =>
    html`<bd-docs-intro>
      <div slot="logo" style="display:flex;align-items:center;color:var(--color-text-default)">
        <img src=${logoMark} width="32" height="32" alt="" />
      </div>
      <div slot="breadcrumb" style="display:flex;align-items:center;gap:var(--spacing-sm)">
        <span>Base components</span>
        ${chevronRight}
        <span>Dropdowns</span>
      </div>
      <span slot="title">Dropdowns</span>
      <span slot="description">
        Dropdown menus surface a list of actions or navigation. Use them for compact options tied to a
        button, icon, or avatar. Keep groups focused; use dividers and headers when the list grows.
      </span>
    </bd-docs-intro>`,
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-docs-intro>` — Figma documentation hero for **Dropdowns** (`1538:269977`): `--color-gray-light-mode-50` panel, `--radius-3xl`, display-xl title, text-xl tertiary body.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const DropdownsPage: Story = {}

export const SelectPage: Story = {
  name: 'Select (documentation)',
  render: () =>
    html`<bd-docs-intro>
      <div slot="logo" style="display:flex;align-items:center;color:var(--color-text-default)">
        <img src=${logoMark} width="32" height="32" alt="" />
      </div>
      <div slot="breadcrumb" style="display:flex;align-items:center;gap:var(--spacing-sm)">
        <span>Base components</span>
        ${chevronRight}
        <span>Select</span>
      </div>
      <span slot="title">Select</span>
      <span
        slot="description"
        style="display:block;font-size:var(--font-size-text-xl);line-height:var(--line-height-text-xl);color:var(--color-text-muted)"
      >
        Select components (previously called <em style="font-style:italic">Input dropdowns</em>) are used to group
        together actions in a subview. They’re useful for allowing users to select from a large number of options,
        or to even search for options within the input field before selecting.
      </span>
    </bd-docs-intro>`,
  parameters: {
    docs: {
      description: {
        story:
          'Figma documentation hero **Select** (`1538:271137`): same layout as other base-component intros, with italic “Input dropdowns” in the body copy.',
      },
    },
  },
}
