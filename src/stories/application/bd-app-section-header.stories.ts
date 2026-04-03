import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../../components/application/bd-app-section-header.js'
import '../../components/bd-button.js'
import '../../components/bd-button-group.js'
import '../../components/bd-utility-button.js'

const iconDotsVertical = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <circle cx="10" cy="4" r="1.67" fill="currentColor" />
  <circle cx="10" cy="10" r="1.67" fill="currentColor" />
  <circle cx="10" cy="16" r="1.67" fill="currentColor" />
</svg>`

const iconSearch = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M17.5 17.5L13.875 13.875M15.833 9.16667C15.833 12.8486 12.8486 15.833 9.16667 15.833C5.48477 15.833 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.833 5.48477 15.833 9.16667Z"
    stroke="currentColor"
    stroke-width="1.67"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

function demoToolbar() {
  return html`
    <div
      slot="toolbar"
      style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--spacing-lg);"
    >
      <bd-button-group layout="text" label="Date range">
        <bd-button-group-item selected>Last 7 days</bd-button-group-item>
        <bd-button-group-item>Last 30 days</bd-button-group-item>
        <bd-button-group-item>Last year</bd-button-group-item>
      </bd-button-group>
      <div
        style="display:inline-flex;align-items:center;gap:var(--spacing-md);min-width:16rem;max-width:20rem;padding:var(--spacing-md) var(--spacing-lg);border-radius:var(--radius-md);border:1px solid var(--color-border-primary);background:var(--color-bg-primary);box-shadow:var(--shadow-xs);font-size:var(--font-size-text-md);color:var(--color-text-placeholder);"
      >
        ${iconSearch}
        <span>Search</span>
      </div>
      <bd-button variant="secondary" size="md">Import</bd-button>
      <bd-button variant="primary" size="md">Add member</bd-button>
    </div>
  `
}

function demoMenu() {
  return html`
    <bd-utility-button slot="menu" hierarchy="secondary" size="sm" label="More options">${iconDotsVertical}</bd-utility-button>
  `
}

function demoTabs() {
  return html`
    <div slot="tabs" style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--spacing-md);width:100%;">
      <bd-button-group layout="text" label="Section">
        <bd-button-group-item selected>View all</bd-button-group-item>
        <bd-button-group-item>Archived</bd-button-group-item>
        <bd-button-group-item>Completed</bd-button-group-item>
      </bd-button-group>
    </div>
  `
}

type BdAppSectionHeaderArgs = {
  heading: string
  description: string
  tabs: boolean
  divider: boolean
}

const meta = {
  title: 'Application Components/bd-app-section-header',
  id: 'app-bd-app-section-header',
  tags: ['autodocs'],
  render: (args: BdAppSectionHeaderArgs) =>
    html`<bd-app-section-header
      heading=${args.heading}
      description=${args.description}
      ?tabs=${args.tabs}
      ?divider=${args.divider}
    ></bd-app-section-header>`,
  args: {
    heading: 'Team members',
    description: 'Manage your team members and their account permissions here.',
    tabs: false,
    divider: true,
  },
  argTypes: {
    heading: { control: 'text', description: 'Section title (or use **`slot="heading"`**)' },
    description: {
      control: 'text',
      description: 'Supporting text (or use **`slot="description"`**)',
    },
    tabs: { control: 'boolean', description: 'Renders the **`tabs`** slot in a muted bar' },
    divider: {
      control: 'boolean',
      description: 'Show a hairline divider below the header row',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-app-section-header>` — Figma **Section header** (`1214:38`): title + description, **`toolbar`**, **`menu`**, optional **tabs** row, divider. Breakpoint **`768px`**.',
      },
    },
  },
} satisfies Meta<BdAppSectionHeaderArgs>

export default meta
type Story = StoryObj<BdAppSectionHeaderArgs>

export const Default: Story = {}

export const WithToolbar: Story = {
  render: () => html`
    <bd-app-section-header
      heading="Team members"
      description="Manage your team members and their account permissions here."
    >
      ${demoToolbar()}
      ${demoMenu()}
    </bd-app-section-header>
  `,
}

export const WithToolbarAndTabs: Story = {
  render: () => html`
    <bd-app-section-header
      heading="Team members"
      description="Manage your team members and their account permissions here."
      tabs
    >
      ${demoToolbar()}
      ${demoMenu()}
      ${demoTabs()}
    </bd-app-section-header>
  `,
}

export const MobileWidth: Story = {
  name: 'With toolbar · mobile width',
  render: () => html`
    <div style="max-width:23.4375rem;border:1px dashed var(--color-border-primary);">
      <bd-app-section-header
        heading="Team members"
        description="Manage your team members and their account permissions here."
        tabs
      >
        ${demoToolbar()}
        ${demoMenu()}
        ${demoTabs()}
      </bd-app-section-header>
    </div>
  `,
}

export const Minimal: Story = {
  args: {
    heading: 'Section',
    description: '',
    tabs: false,
    divider: true,
  },
}
