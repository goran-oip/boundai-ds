import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { expect, userEvent, within } from 'storybook/test'

import '../components/bd-button.js'
import '../components/bd-dropdown.js'
import '../components/bd-utility-button.js'

const chevronDown = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M5 7.5L10 12.5L15 7.5"
    stroke="currentColor"
    stroke-width="1.67"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const iconDots = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M10 10.833a.833.833 0 100-1.666.833.833 0 000 1.666zM10 5a.833.833 0 100-1.667A.833.833 0 0010 5zm0 11.667a.833.833 0 100-1.667.833.833 0 000 1.667z"
    fill="currentColor"
  />
</svg>`

const iconUser = html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
  <path
    d="M8 8a2.667 2.667 0 100-5.333A2.667 2.667 0 008 8zm0 1.333c-2.227 0-4.667 1.12-4.667 3.334V14h9.334v-1.333c0-2.214-2.44-3.334-4.667-3.334z"
    fill="currentColor"
  />
</svg>`

const iconSettings = html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
  <path
    d="M8 10a2 2 0 100-4 2 2 0 000 4zm5.06-1.68l-.44-.27a4.67 4.67 0 000-.94l.44-.27a.67.67 0 00.2-.92l-1-1.73a.67.67 0 00-.91-.2l-.44.27a4.67 4.67 0 00-.81-.47l-.07-.51a.67.67 0 00-.66-.58H8.2a.67.67 0 00-.66.58l-.07.51c-.29.12-.56.28-.81.47l-.44-.27a.67.67 0 00-.91.2l-1 1.73a.67.67 0 00.2.92l.44.27c-.05.31-.05.63 0 .94l-.44.27a.67.67 0 00-.2.92l1 1.73a.67.67 0 00.91.2l.44-.27c.25.19.52.35.81.47l.07.51a.67.67 0 00.66.58h2a.67.67 0 00.66-.58l.07-.51c.29-.12.56-.28.81-.47l.44.27a.67.67 0 00.91-.2l1-1.73a.67.67 0 00-.2-.92z"
    fill="currentColor"
  />
</svg>`

type BdDropdownArgs = {
  align: 'start' | 'end'
  closeOnSelect: boolean
}

const meta = {
  title: 'Base Components/bd-dropdown',
  id: 'components-bd-dropdown',
  tags: ['autodocs'],
  render: (args: BdDropdownArgs) =>
    html`<div style="min-height:420px;padding:var(--spacing-4xl);background:var(--color-surface-canvas)">
      <bd-dropdown align=${args.align} ?close-on-select=${args.closeOnSelect}>
        <bd-button slot="trigger" variant="secondary" size="md">
          Open menu
          <span slot="suffix">${chevronDown}</span>
        </bd-button>
        <bd-dropdown-header>
          <div slot="media" style="position:relative;width:40px;height:40px">
            <div
              aria-hidden="true"
              style="display:flex;width:40px;height:40px;align-items:center;justify-content:center;border-radius:var(--radius-full);background:var(--color-blue-dark-muted);color:var(--color-blue-dark-600);font-size:var(--font-size-text-md);font-weight:var(--font-weight-semibold)"
            >
              OR
            </div>
            <span
              style="position:absolute;bottom:0;right:0;width:10px;height:10px;border-radius:var(--radius-full);background:var(--color-success-600);border:2px solid var(--color-bg-primary)"
              aria-hidden="true"
            ></span>
          </div>
          <span slot="title">Olivia Rhye</span>
          <span slot="subtitle">olivia@untitledui.com</span>
        </bd-dropdown-header>
        <bd-dropdown-item>${iconUser} View profile</bd-dropdown-item>
        <bd-dropdown-item>${iconSettings} Settings</bd-dropdown-item>
        <bd-dropdown-divider></bd-dropdown-divider>
        <bd-dropdown-item>Keyboard shortcuts <span slot="shortcut">⌘K</span></bd-dropdown-item>
        <bd-dropdown-item>Company profile</bd-dropdown-item>
        <bd-dropdown-divider></bd-dropdown-divider>
        <bd-dropdown-item>Sign out</bd-dropdown-item>
      </bd-dropdown>
    </div>`,
  args: {
    align: 'start',
    closeOnSelect: true,
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Panel alignment (`end` for icon / avatar triggers; Figma node `3281:383083`).',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Close when a menu item is activated.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-dropdown>` + **`bd-dropdown-header`**, **`bd-dropdown-item`**, **`bd-dropdown-divider`** — Figma **Dropdown** (`3281:383083`). Menu surface: 248px, `--radius-md`, `--shadow-dropdown-panel`, blue focus via `--color-focus-ring` on the trigger wrapper.',
      },
    },
  },
} satisfies Meta<BdDropdownArgs>

export default meta
type Story = StoryObj<BdDropdownArgs>

export const Default: Story = {}

export const AlignEndKebab: Story = {
  name: 'Align end (utility trigger)',
  args: { align: 'end' },
  render: (args) =>
    html`<div style="min-height:380px;padding:var(--spacing-4xl);background:var(--color-surface-canvas);display:flex;justify-content:center">
      <bd-dropdown align=${args.align} ?close-on-select=${args.closeOnSelect}>
        <bd-utility-button slot="trigger" hierarchy="secondary" size="sm">${iconDots}</bd-utility-button>
        <bd-dropdown-item>Duplicate</bd-dropdown-item>
        <bd-dropdown-item>Archive</bd-dropdown-item>
        <bd-dropdown-divider></bd-dropdown-divider>
        <bd-dropdown-item>Delete</bd-dropdown-item>
      </bd-dropdown>
    </div>`,
}

export const AvatarTrigger: Story = {
  tags: ['interaction'],
  args: { align: 'end' },
  render: (args) =>
    html`<div style="min-height:400px;padding:var(--spacing-4xl);background:var(--color-surface-canvas);display:flex;justify-content:flex-end">
      <bd-dropdown align=${args.align} ?close-on-select=${args.closeOnSelect}>
        <button
          slot="trigger"
          type="button"
          aria-label="Account menu"
          style="display:inline-flex;width:40px;height:40px;align-items:center;justify-content:center;padding:0;border:none;background:var(--color-gray-light-mode-100);border-radius:var(--radius-full);cursor:pointer;color:var(--color-text-default);font-size:var(--font-size-text-sm);font-weight:var(--font-weight-semibold)"
        >
          AM
        </button>
        <bd-dropdown-header>
          <span slot="title">Alex Morgan</span>
          <span slot="subtitle">alex@example.com</span>
        </bd-dropdown-header>
        <bd-dropdown-divider></bd-dropdown-divider>
        <bd-dropdown-item>Account</bd-dropdown-item>
        <bd-dropdown-item>Sign out</bd-dropdown-item>
      </bd-dropdown>
    </div>`,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Account menu' })
    const dropdown = trigger.closest('bd-dropdown')
    await expect(dropdown).not.toBeNull()

    const wrapper = dropdown?.shadowRoot?.querySelector('.trigger')
    await expect(wrapper).not.toBeNull()

    await userEvent.click(wrapper as HTMLElement)
    await expect(trigger.getAttribute('aria-label')).toBe('Account menu')
  },
}
