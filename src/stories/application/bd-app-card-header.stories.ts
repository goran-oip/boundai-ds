import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../../components/application/bd-app-card-header.js'
import '../../components/bd-avatar.js'
import '../../components/bd-badge.js'
import '../../components/bd-button.js'
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

function demoMenuSlot() {
  return html`
    <bd-utility-button slot="menu" hierarchy="secondary" size="sm" label="More options">${iconDotsVertical}</bd-utility-button>
  `
}

function demoActionsDesktop() {
  return html`
    <div slot="actions" style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--spacing-lg);">
      <bd-button variant="tertiary" size="md">Tertiary</bd-button>
      <bd-button variant="secondary" size="md">Secondary</bd-button>
      <bd-button variant="secondary" size="md">Secondary</bd-button>
      <bd-button variant="primary" size="md">Primary</bd-button>
    </div>
  `
}

function demoActionsMobile() {
  return html`
    <div slot="actions" style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--spacing-lg);">
      <bd-button variant="secondary" size="md">Secondary</bd-button>
      <bd-button variant="primary" size="md">Primary</bd-button>
    </div>
  `
}

function demoBadgeSeats() {
  return html`<bd-badge slot="badge" variant="pill" size="sm" color="brand">10/20 seats</bd-badge>`
}

function demoBadgeNewUser() {
  return html`<bd-badge slot="badge" variant="pill" size="sm" color="brand">New user</bd-badge>`
}

type BdAppCardHeaderArgs = {
  variant: 'text' | 'avatar'
  heading: string
  description: string
  profileName: string
  profileEmail: string
}

const meta = {
  title: 'Application Components/bd-app-card-header',
  id: 'app-bd-app-card-header',
  tags: ['autodocs'],
  render: (args: BdAppCardHeaderArgs) =>
    html`<bd-app-card-header
      variant=${args.variant}
      heading=${args.heading}
      description=${args.description}
      profile-name=${args.profileName}
      profile-email=${args.profileEmail}
    ></bd-app-card-header>`,
  args: {
    variant: 'text',
    heading: 'Team members',
    description: 'Manage your team members and their account permissions here.',
    profileName: 'Goran P',
    profileEmail: 'goran@boundai.ai',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'avatar'],
      description: 'Figma **text** vs **avatar** (`1211:169`)',
    },
    heading: { control: 'text', description: 'Main title (or use **`slot="heading"`**)' },
    description: { control: 'text', description: 'Subtitle (or use **`slot="description"`**)' },
    profileName: {
      control: 'text',
      description: 'Avatar variant: profile name line (or **`slot="profile-name"`**)',
    },
    profileEmail: {
      control: 'text',
      description: 'Avatar variant: email line (or **`slot="profile-email"`**)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-app-card-header>` — Figma **Card header** (`1211:169`): title or avatar row, **`badge`**, **`actions`**, **`menu`**, divider. Breakpoint **`768px`**.',
      },
    },
  },
} satisfies Meta<BdAppCardHeaderArgs>

export default meta
type Story = StoryObj<BdAppCardHeaderArgs>

export const TextWithToolbar: Story = {
  args: { variant: 'text' },
  render: () => html`
    <bd-app-card-header variant="text" heading="Team members" description="Manage your team members and their account permissions here.">
      ${demoBadgeSeats()}
      ${demoActionsDesktop()}
      ${demoMenuSlot()}
    </bd-app-card-header>
  `,
}

export const AvatarWithToolbar: Story = {
  args: { variant: 'avatar' },
  render: () => html`
    <bd-app-card-header variant="avatar" profile-name="Goran P" profile-email="goran@boundai.ai">
      <bd-avatar slot="avatar" size="xl" kind="initials" initials="GP"></bd-avatar>
      ${demoBadgeNewUser()}
      ${demoActionsDesktop()}
      ${demoMenuSlot()}
    </bd-app-card-header>
  `,
}

export const TextMobileWidth: Story = {
  name: 'Text · mobile width',
  render: () => html`
    <div style="max-width:23.4375rem;border:1px dashed var(--color-border-primary);">
      <bd-app-card-header variant="text" heading="Team members" description="Manage your team members and their account permissions here.">
        ${demoBadgeSeats()}
        ${demoActionsMobile()}
        ${demoMenuSlot()}
      </bd-app-card-header>
    </div>
  `,
}

export const AvatarMobileWidth: Story = {
  name: 'Avatar · mobile width',
  render: () => html`
    <div style="max-width:23.4375rem;border:1px dashed var(--color-border-primary);">
      <bd-app-card-header variant="avatar" profile-name="Goran P" profile-email="goran@boundai.ai">
        <bd-avatar slot="avatar" size="lg" kind="initials" initials="GP"></bd-avatar>
        ${demoBadgeNewUser()}
        ${demoActionsMobile()}
        ${demoMenuSlot()}
      </bd-app-card-header>
    </div>
  `,
}

export const Minimal: Story = {
  args: {
    variant: 'text',
    heading: 'Section',
    description: '',
  },
}
