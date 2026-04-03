import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../../components/application/bd-app-page-header.js'
import '../../components/bd-avatar.js'
import '../../components/bd-button.js'

/** Figma-style search field (slot content; not a standalone DS primitive). */
function demoSearchSlot() {
  return html`
    <div
      slot="search"
      style="box-sizing:border-box;width:100%;max-width:20rem;"
    >
      <div
        style="display:flex;align-items:center;gap:var(--spacing-md);box-sizing:border-box;width:100%;padding:var(--spacing-md) var(--spacing-lg);border:1px solid var(--color-border-primary);border-radius:var(--radius-md);background:var(--color-bg-primary);box-shadow:var(--shadow-xs);font-family:var(--font-family-body);"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style="flex-shrink:0;color:var(--color-text-quaternary-500);">
          <path d="M17.5 17.5L13.875 13.875M15.833 9.167a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0Z" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span
          style="flex:1;min-width:0;font-family:var(--font-family-body);font-size:var(--font-size-text-md);line-height:var(--line-height-text-md);font-weight:var(--font-weight-regular);color:var(--color-text-placeholder);"
          >Search</span
        >
        <kbd style="border:1px solid var(--color-border-secondary);border-radius:var(--radius-xs);padding:1px var(--spacing-xs);font-size:var(--font-size-text-xs);line-height:var(--line-height-text-xs);font-weight:var(--font-weight-medium);color:var(--color-text-quaternary-500);font-family:var(--font-family-body);">⌘K</kbd>
      </div>
    </div>
  `
}

const iconHome = html`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
  <path d="M3 10.5L10 4l7 6.5M5.5 10.5V16h9v-5.5" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const iconChevron = html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="flex-shrink:0;color:var(--color-text-quaternary-500);">
  <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const iconArrowLeft = html`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
  <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

function demoBreadcrumbs() {
  const crumb = (label: string, current = false) => html`
    <span
      style="display:inline-flex;align-items:center;justify-content:center;padding:var(--spacing-xs) var(--spacing-md);border-radius:var(--spacing-sm);font-family:var(--font-family-body);font-size:var(--font-size-text-sm);line-height:var(--line-height-text-sm);font-weight:var(--font-weight-semibold);white-space:nowrap;${
        current
          ? `background:var(--color-bg-primary-hover);color:var(--color-text-tertiary-hover);`
          : `color:var(--color-text-quaternary-500);`
      }"
      >${label}</span>
  `
  return html`
    <nav
      slot="breadcrumbs"
      aria-label="Breadcrumb"
      style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--spacing-xs);font-family:var(--font-family-body);"
    >
      <span style="display:inline-flex;padding:var(--spacing-xs);border-radius:var(--spacing-sm);color:var(--color-text-tertiary-600);">${iconHome}</span>
      ${iconChevron}
      ${crumb('Settings')}
      ${iconChevron}
      ${crumb('...')}
      ${iconChevron}
      ${crumb('Team', true)}
    </nav>
  `
}

function demoActionsFull() {
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

function demoMobileBack() {
  return html`
    <div slot="mobile-nav" style="display:inline-flex;align-items:center;gap:var(--spacing-xs);color:var(--color-text-tertiary-600);cursor:default;">
      ${iconArrowLeft}
      <span
        style="font-family:var(--font-family-body);font-size:var(--font-size-text-sm);line-height:var(--line-height-text-sm);font-weight:var(--font-weight-semibold);"
        >Back</span
      >
    </div>
  `
}

type BdAppPageHeaderArgs = {
  variant: 'simple' | 'avatar'
  heading: string
  description: string
  profileName: string
  profileEmail: string
}

const meta = {
  title: 'Application Components/bd-app-page-header',
  id: 'app-bd-app-page-header',
  tags: ['autodocs'],
  render: (args: BdAppPageHeaderArgs) =>
    html`<bd-app-page-header
      variant=${args.variant}
      heading=${args.heading}
      description=${args.description}
      profile-name=${args.profileName}
      profile-email=${args.profileEmail}
    ></bd-app-page-header>`,
  args: {
    variant: 'simple',
    heading: 'Team members',
    description: 'Manage your team members and their account permissions here.',
    profileName: 'Goran Petkovic',
    profileEmail: 'goran@boundai.ai',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'avatar'],
      description: 'Figma **Simple** vs **Avatar** (`1239:122640`)',
    },
    heading: { control: 'text', description: 'Main title (or use **`slot="heading"`**)' },
    description: { control: 'text', description: 'Subtitle (or use **`slot="description"`**)' },
    profileName: {
      control: 'text',
      description: 'Avatar variant: profile name (or **`slot="identity"`** for full custom block)',
    },
    profileEmail: {
      control: 'text',
      description: 'Avatar variant: email line (or **`slot="identity"`** for full custom block)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-app-page-header>` — Figma **Page header** (`1239:122640`): breadcrumbs / mobile back, identity, actions, search, divider. Responsive at **`768px`** (container query).',
      },
    },
  },
} satisfies Meta<BdAppPageHeaderArgs>

export default meta
type Story = StoryObj<BdAppPageHeaderArgs>

export const SimpleToolbar: Story = {
  args: { variant: 'simple' },
  render: () => html`
    <bd-app-page-header variant="simple" heading="Team members" description="Manage your team members and their account permissions here.">
      ${demoBreadcrumbs()} ${demoActionsFull()} ${demoSearchSlot()}
    </bd-app-page-header>
  `,
}

export const AvatarToolbar: Story = {
  args: { variant: 'avatar' },
  render: () => html`
    <bd-app-page-header variant="avatar" profile-name="Goran Petkovic" profile-email="goran@boundai.ai">
      ${demoBreadcrumbs()}
      <bd-avatar slot="avatar" size="xl" kind="initials" initials="GP"></bd-avatar>
      ${demoActionsFull()}
      ${demoSearchSlot()}
    </bd-app-page-header>
  `,
}

export const SimpleToolbarMobile: Story = {
  name: 'Simple · mobile width',
  render: () => html`
    <div style="max-width:23.4375rem;border:1px dashed var(--color-border-primary);padding:var(--spacing-md);">
      <bd-app-page-header variant="simple" heading="Team members" description="Manage your team members and their account permissions here.">
        ${demoMobileBack()}
        ${demoActionsMobile()}
        ${demoSearchSlot()}
      </bd-app-page-header>
    </div>
  `,
}

export const AvatarToolbarMobile: Story = {
  name: 'Avatar · mobile width',
  render: () => html`
    <div style="max-width:23.4375rem;border:1px dashed var(--color-border-primary);padding:var(--spacing-md);">
      <bd-app-page-header variant="avatar" profile-name="Goran Petkovic" profile-email="goran@boundai.ai">
        ${demoMobileBack()}
        <bd-avatar slot="avatar" size="xl" kind="initials" initials="GP"></bd-avatar>
        ${demoActionsMobile()}
        ${demoSearchSlot()}
      </bd-app-page-header>
    </div>
  `,
}

export const Minimal: Story = {
  args: {
    variant: 'simple',
    heading: 'Settings',
    description: '',
  },
}
