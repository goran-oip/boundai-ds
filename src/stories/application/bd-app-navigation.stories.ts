import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../../components/application/bd-app-header-navigation.js'
import '../../components/application/bd-app-nav-menu-button.js'
import '../../components/application/bd-app-sidebar-navigation.js'
import '../../components/application/bd-nav-account-menu-item.js'
import '../../components/application/bd-nav-item-expandable.js'
import '../../components/application/bd-nav-item-icon-button.js'
import '../../components/application/bd-nav-item.js'
import '../../components/bd-avatar.js'
import '../../components/bd-button.js'
import '../../components/bd-radio.js'
import Bell from 'lucide/dist/esm/icons/bell.js'
import Zap from 'lucide/dist/esm/icons/zap.js'
import { lucideIcon } from '../../icons/lucide.js'
import {
  lucideIconChevronDown,
  lucideIconMenu,
  lucideIconSearch,
  lucideIconSettings,
} from '../../icons/lucide-preset.js'

const chartIcon = html`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
  <path
    d="M17.5 17.5H2.5M3.33333 17.5V11.6667M8.33333 17.5V5M13.3333 17.5V8.33333"
    stroke="currentColor"
    stroke-width="1.67"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const meta = {
  title: 'Application Components/bd-app-navigation',
  id: 'app-bd-app-navigation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Application navigation primitives and shells (Figma **Nav item base** `1152:89220`, **Nav item button** `1165:736`, **Application nav menu button** `1161:14070`, **Nav item dropdown** `1152:90366`, **Nav account menu item** `7891:71338`, **Sidebar navigation** `1158:90768`, **Header navigation** `1207:1678`). Composite account switcher / widget decks (`7891:87996`, `1157:90307`) compose from **`bd-nav-account-menu-item`**, **`bd-button`**, and cards.',
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj

export const NavItem: Story = {
  name: 'bd-nav-item',
  render: () => html`
    <bd-nav-item label="Dashboard" current dot badge trailing>
      <span slot="icon">${chartIcon}</span>
      <span slot="badge" style="display:inline-flex;align-items:center;padding:2px 8px;border-radius:9999px;border:1px solid var(--color-border-secondary);background:var(--color-bg-secondary);font-size:var(--font-size-text-xs);font-weight:500;">10</span>
      <span slot="trailing">${lucideIconChevronDown({ size: 16 })}</span>
    </bd-nav-item>
  `,
}

export const NavItemIconButton: Story = {
  name: 'bd-nav-item-icon-button',
  render: () => html`
    <div style="display:flex;gap:var(--spacing-xl);align-items:center;">
      <bd-nav-item-icon-button size="md" label="Notifications">${chartIcon}</bd-nav-item-icon-button>
      <bd-nav-item-icon-button size="lg" label="Notifications" current>${chartIcon}</bd-nav-item-icon-button>
    </div>
  `,
}

export const AppNavMenuButton: Story = {
  name: 'bd-app-nav-menu-button',
  render: () => html`
    <div style="display:flex;gap:var(--spacing-xl);align-items:center;">
      <bd-app-nav-menu-button></bd-app-nav-menu-button>
      <bd-app-nav-menu-button opened></bd-app-nav-menu-button>
    </div>
  `,
}

export const NavItemExpandable: Story = {
  name: 'bd-nav-item-expandable',
  render: () => html`
    <bd-nav-item-expandable label="Dashboard" current open>
      <span slot="icon">${chartIcon}</span>
      <div slot="subnav" style="display:flex;flex-direction:column;gap:var(--spacing-xs);">
        <bd-nav-item label="Overview"></bd-nav-item>
        <bd-nav-item label="Notifications"></bd-nav-item>
        <bd-nav-item label="Analytics"></bd-nav-item>
      </div>
    </bd-nav-item-expandable>
  `,
}

export const NavAccountMenuItem: Story = {
  name: 'bd-nav-account-menu-item',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:var(--spacing-md);max-width:15rem;">
      <bd-nav-account-menu-item variant="menu-item" shortcut-text="⌘C">
        <span slot="icon">${chartIcon}</span>
        Placeholder
      </bd-nav-account-menu-item>
      <bd-nav-account-menu-item variant="account" current>
        <bd-avatar slot="avatar" size="md" kind="initials" initials="GP"></bd-avatar>
        <span slot="label">Goran Petkovic</span>
        <span slot="description">goran@boundai.ai</span>
        <bd-radio slot="control" name="nav-demo" size="sm" checked></bd-radio>
      </bd-nav-account-menu-item>
    </div>
  `,
}

export const AccountMenuPanel: Story = {
  name: 'Account menu panel (7891:87996)',
  render: () => html`
    <div
      style="max-width:20rem;padding:var(--spacing-xs);border-radius:var(--radius-xl);border:1px solid var(--color-border-secondary);background:var(--color-bg-primary);box-shadow:var(--shadow-dropdown-panel);"
    >
      <bd-nav-account-menu-item variant="menu-item" shortcut-text="⌘K→P">
        <span slot="icon">${chartIcon}</span>
        View profile
      </bd-nav-account-menu-item>
      <bd-nav-account-menu-item variant="menu-item" shortcut-text="⌘S">
        <span slot="icon">${lucideIconSettings({ size: 20 })}</span>
        Account settings
      </bd-nav-account-menu-item>
      <bd-nav-account-menu-item variant="account">
        <bd-avatar slot="avatar" size="md" kind="initials" initials="GP"></bd-avatar>
        <span slot="label">Goran Petkovic</span>
        <span slot="description">goran@boundai.ai</span>
        <bd-radio slot="control" name="nav-demo" size="sm" checked></bd-radio>
      </bd-nav-account-menu-item>
    </div>
  `,
}

function demoHeaderSearchField() {
  return html`
    <div style="box-sizing:border-box;width:100%;">
      <div
        style="display:flex;align-items:center;gap:var(--spacing-md);box-sizing:border-box;width:100%;padding:var(--spacing-md) var(--spacing-lg);border:1px solid var(--color-border-primary);border-radius:var(--radius-md);background:var(--color-bg-primary);box-shadow:var(--shadow-xs);font-family:var(--font-family-body);"
      >
        ${lucideIconSearch({ size: 20 })}
        <span
          style="flex:1;min-width:0;font-family:var(--font-family-body);font-size:var(--font-size-text-md);line-height:var(--line-height-text-md);font-weight:var(--font-weight-regular);color:var(--color-text-placeholder);"
          >Search</span
        >
        <kbd
          style="border:1px solid var(--color-border-secondary);border-radius:var(--radius-xs);padding:1px var(--spacing-xs);font-size:var(--font-size-text-xs);line-height:var(--line-height-text-xs);font-weight:var(--font-weight-medium);color:var(--color-text-quaternary-500);font-family:var(--font-family-body);"
          >⌘K</kbd
        >
      </div>
    </div>
  `
}

export const HeaderNavigation: Story = {
  name: 'bd-app-header-navigation · dual tier',
  render: () => html`
    <bd-app-header-navigation tier="dual">
      <div slot="brand" style="font-weight:var(--font-weight-semibold);font-size:var(--font-size-text-md);">BoundAI</div>
      <div slot="nav" style="display:flex;gap:var(--spacing-xxs);flex-wrap:wrap;align-items:center;">
        <bd-button variant="tertiary" size="md">Home</bd-button>
        <bd-button variant="tertiary" size="md" style="background:var(--color-bg-primary-hover);">Dashboard</bd-button>
        <bd-button variant="tertiary" size="md">Projects</bd-button>
        <bd-button variant="tertiary" size="md">Tasks</bd-button>
        <bd-button variant="tertiary" size="md">Reporting</bd-button>
        <bd-button variant="tertiary" size="md">Users</bd-button>
      </div>
      <div slot="end" style="display:flex;gap:var(--spacing-lg);align-items:center;">
        <bd-button variant="secondary" size="md">
          <span slot="leading-icon">${lucideIcon(Zap, { size: 20 })}</span>
          Upgrade now
        </bd-button>
        <span style="display:inline-flex;gap:var(--spacing-xxs);align-items:center;">
          <bd-nav-item-icon-button size="md" label="Settings">${lucideIconSettings({ size: 20 })}</bd-nav-item-icon-button>
          <bd-nav-item-icon-button size="md" label="Notifications">${lucideIcon(Bell, { size: 20 })}</bd-nav-item-icon-button>
        </span>
        <bd-avatar size="sm" kind="initials" initials="GP"></bd-avatar>
      </div>
      <div slot="subnav" style="display:flex;flex-wrap:wrap;gap:var(--spacing-xxs);align-items:center;">
        <bd-button variant="tertiary" size="sm" style="background:var(--color-bg-primary-hover);">Overview</bd-button>
        <bd-button variant="tertiary" size="sm">Notifications</bd-button>
        <bd-button variant="tertiary" size="sm">Analytics</bd-button>
        <bd-button variant="tertiary" size="sm">Saved reports</bd-button>
        <bd-button variant="tertiary" size="sm">Scheduled reports</bd-button>
        <bd-button variant="tertiary" size="sm">User reports</bd-button>
      </div>
      <div slot="subnav-end">${demoHeaderSearchField()}</div>
    </bd-app-header-navigation>
  `,
}

export const HeaderNavigationSingle: Story = {
  name: 'bd-app-header-navigation · single tier',
  render: () => html`
    <bd-app-header-navigation tier="single">
      <div slot="brand" style="font-weight:var(--font-weight-semibold);font-size:var(--font-size-text-md);">BoundAI</div>
      <div slot="nav" style="display:flex;gap:var(--spacing-xxs);flex-wrap:wrap;align-items:center;">
        <bd-button variant="tertiary" size="md">Home</bd-button>
        <bd-button variant="tertiary" size="md" style="background:var(--color-bg-primary-hover);">Dashboard</bd-button>
        <bd-button variant="tertiary" size="md">Projects</bd-button>
        <bd-button variant="tertiary" size="md">Tasks</bd-button>
        <bd-button variant="tertiary" size="md">Reporting</bd-button>
        <bd-button variant="tertiary" size="md">Users</bd-button>
      </div>
      <div slot="end" style="display:flex;gap:var(--spacing-xxs);align-items:center;">
        <bd-nav-item-icon-button size="md" label="Search">${lucideIconSearch({ size: 20 })}</bd-nav-item-icon-button>
        <bd-nav-item-icon-button size="md" label="Settings">${lucideIconSettings({ size: 20 })}</bd-nav-item-icon-button>
        <bd-nav-item-icon-button size="md" label="Notifications">${lucideIcon(Bell, { size: 20 })}</bd-nav-item-icon-button>
        <bd-avatar size="sm" kind="initials" initials="GP"></bd-avatar>
      </div>
    </bd-app-header-navigation>
  `,
}

export const SidebarNavigation: Story = {
  name: 'bd-app-sidebar-navigation',
  render: () => html`
    <div style="height:28rem;display:flex;border:1px dashed var(--color-border-primary);">
      <bd-app-sidebar-navigation variant="full">
        <div slot="header" style="display:flex;align-items:center;justify-content:space-between;">
          <span style="font-weight:600;">BoundAI</span>
          <bd-app-nav-menu-button opened></bd-app-nav-menu-button>
        </div>
        <div
          slot="search"
          style="display:flex;align-items:center;gap:var(--spacing-md);padding:var(--spacing-md) var(--spacing-lg);border:1px solid var(--color-border-primary);border-radius:var(--radius-md);font-family:var(--font-family-body);font-size:var(--font-size-text-md);line-height:var(--line-height-text-md);font-weight:var(--font-weight-regular);color:var(--color-text-placeholder);"
        >
          ${lucideIconSearch({ size: 20 })}
          <span>Search</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:var(--spacing-xs);">
          <bd-nav-item-expandable label="Dashboard" open>
            <span slot="icon">${chartIcon}</span>
            <div slot="subnav">
              <bd-nav-item label="Overview"></bd-nav-item>
              <bd-nav-item label="Reports"></bd-nav-item>
            </div>
          </bd-nav-item-expandable>
        </div>
        <div slot="footer">
          <bd-nav-account-menu-item variant="account">
            <bd-avatar slot="avatar" size="md" kind="initials" initials="GP"></bd-avatar>
            <span slot="label">Goran Petkovic</span>
            <span slot="description">goran@boundai.ai</span>
            <span slot="control">${lucideIconChevronDown({ size: 16 })}</span>
          </bd-nav-account-menu-item>
        </div>
      </bd-app-sidebar-navigation>
      <div style="flex:1;padding:var(--spacing-xl);">Content</div>
    </div>
  `,
}

export const SlimSidebarRail: Story = {
  name: 'bd-app-sidebar-navigation · slim',
  render: () => html`
    <div style="height:20rem;display:flex;border:1px dashed var(--color-border-primary);">
      <bd-app-sidebar-navigation variant="slim" open>
        <div slot="header" style="display:flex;justify-content:center;">
          <bd-app-nav-menu-button></bd-app-nav-menu-button>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:var(--spacing-md);">
          <bd-nav-item-icon-button size="md" label="Home">${lucideIconMenu({ size: 20 })}</bd-nav-item-icon-button>
          <bd-nav-item-icon-button size="md" label="Settings" current>${lucideIconSettings({ size: 20 })}</bd-nav-item-icon-button>
        </div>
      </bd-app-sidebar-navigation>
      <div style="flex:1;"></div>
    </div>
  `,
}

export const SidebarWidgetsNote: Story = {
  name: 'Sidebar widget deck (1157:90307)',
  render: () => html`
    <p style="max-width:40rem;color:var(--color-text-tertiary-600);font-size:var(--font-size-text-md);line-height:1.5;">
      Figma <strong>Sidebar navigation · widgets</strong> is a set of marketing / utility cards (usage meters, cookie
      consent, referrals, etc.). Build those screens by composing <code>bd-button</code>, <code>bd-progress-bar</code>,
      <code>bd-avatar</code>, and bordered panels — there is no single wrapper component.
    </p>
  `,
}
