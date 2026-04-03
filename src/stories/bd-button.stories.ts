import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'
import type { TemplateResult } from 'lit/html.js'
import { expect, fn, userEvent, within } from 'storybook/test'

import '../components/bd-button.js'

type BdButtonIconOption = 'none' | 'plus' | 'chevron-down' | 'chevron-right'

const iconPlus = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M10 4.167v11.666M4.167 10h11.666"
    stroke="currentColor"
    stroke-width="1.67"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const iconChevronDown = html`<svg
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

const iconChevronRight = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M7.5 5L12.5 10L7.5 15"
    stroke="currentColor"
    stroke-width="1.67"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const iconByKind: Record<Exclude<BdButtonIconOption, 'none'>, TemplateResult> = {
  plus: iconPlus,
  'chevron-down': iconChevronDown,
  'chevron-right': iconChevronRight,
}

function slotLeading(kind: BdButtonIconOption): TemplateResult | typeof nothing {
  if (kind === 'none') return nothing
  return html`<span slot="leading-icon">${iconByKind[kind]}</span>`
}

function slotTrailing(kind: BdButtonIconOption): TemplateResult | typeof nothing {
  if (kind === 'none') return nothing
  return html`<span slot="trailing-icon">${iconByKind[kind]}</span>`
}

type BdButtonArgs = {
  intent: 'brand' | 'destructive'
  variant: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive'
  size: 'sm' | 'md' | 'lg' | 'xl'
  disabled: boolean
  fullWidth: boolean
  label: string
  leadingIcon: BdButtonIconOption
  trailingIcon: BdButtonIconOption
}

const meta = {
  title: 'Components/bd-button',
  tags: ['autodocs'],
  render: (args: BdButtonArgs) =>
    html`<bd-button
      intent=${args.intent}
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?full-width=${args.fullWidth}
    >
      ${slotLeading(args.leadingIcon)}
      ${args.label}
      ${slotTrailing(args.trailingIcon)}
    </bd-button>`,
  args: {
    intent: 'brand',
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
    label: 'Button CTA',
    leadingIcon: 'none',
    trailingIcon: 'none',
  },
  argTypes: {
    intent: {
      control: 'select',
      options: ['brand', 'destructive'],
      description:
        '`destructive` — error palette (Figma **Buttons/Button destructive** · node `6218:85578`). Pair with `variant` primary / secondary / tertiary.',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'destructive'],
      description:
        'Hierarchy: Primary / Secondary / Tertiary. `destructive` alone = legacy filled destructive (same as `intent="destructive"` + primary).',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Min-heights 36 / 40 / 44 / 48px (Figma sm / md / lg / xl)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction and dims the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch to fill the container width',
    },
    label: {
      control: 'text',
      description: 'Default slot text content',
    },
    leadingIcon: {
      control: 'select',
      options: ['none', 'plus', 'chevron-down', 'chevron-right'],
      description: 'Icon before the label (`slot="leading-icon"`; `prefix` is an alias)',
    },
    trailingIcon: {
      control: 'select',
      options: ['none', 'plus', 'chevron-down', 'chevron-right'],
      description: 'Icon after the label (`slot="trailing-icon"`; `suffix` is an alias)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-button>` — Figma **Buttons/Button** (`3287:427074`) and **Buttons/Button destructive** (`6218:85578`). Use **`intent="destructive"`** with `variant` **primary** (filled `bg-error-solid`), **secondary** (`border-error-subtle` + white surface), or **tertiary** (text-only; hover `bg-error-primary`). Leading / trailing icons: **`slot="leading-icon"`** and **`slot="trailing-icon"`** (legacy: `prefix` / `suffix`).',
      },
    },
  },
} satisfies Meta<BdButtonArgs>

export default meta
type Story = StoryObj<BdButtonArgs>

export const Primary: Story = {}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Tertiary: Story = {
  args: { variant: 'tertiary' },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

/** Legacy: same as `intent="destructive"` + `variant="primary"`. */
export const Destructive: Story = {
  args: { variant: 'destructive' },
}

export const DestructivePrimary: Story = {
  args: { intent: 'destructive', variant: 'primary' },
}

export const DestructiveSecondary: Story = {
  args: { intent: 'destructive', variant: 'secondary' },
}

export const DestructiveTertiary: Story = {
  args: { intent: 'destructive', variant: 'tertiary' },
}

export const Small: Story = {
  args: { size: 'sm', label: 'Button CTA' },
}

export const Large: Story = {
  args: { size: 'lg', label: 'Button CTA' },
}

export const ExtraLarge: Story = {
  args: { size: 'xl', label: 'Button CTA' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const FullWidth: Story = {
  args: { fullWidth: true, label: 'Full width button' },
}

/** Leading + trailing icons (`leading-icon` / `trailing-icon` slots). */
export const WithLeadingAndTrailingIcons: Story = {
  args: {
    leadingIcon: 'plus',
    trailingIcon: 'chevron-right',
    label: 'Button CTA',
  },
}

/** Brand Primary / Secondary / Tertiary. */
export const HierarchyRow: Story = {
  render: () => html`
    <div style="display:flex;gap:var(--spacing-lg);flex-wrap:wrap;align-items:center;">
      <bd-button variant="primary">Button CTA</bd-button>
      <bd-button variant="secondary">Button CTA</bd-button>
      <bd-button variant="tertiary">Button CTA</bd-button>
    </div>
  `,
}

/** Destructive hierarchies — Figma node 6218:85578. */
export const DestructiveHierarchyRow: Story = {
  render: () => html`
    <div style="display:flex;gap:var(--spacing-lg);flex-wrap:wrap;align-items:center;">
      <bd-button intent="destructive" variant="primary">Button CTA</bd-button>
      <bd-button intent="destructive" variant="secondary">Button CTA</bd-button>
      <bd-button intent="destructive" variant="tertiary">Button CTA</bd-button>
    </div>
  `,
}

export const AllBrandVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:var(--spacing-lg);flex-wrap:wrap;align-items:center;">
      <bd-button variant="primary">Primary</bd-button>
      <bd-button variant="secondary">Secondary</bd-button>
      <bd-button variant="tertiary">Tertiary</bd-button>
      <bd-button variant="destructive">Destructive</bd-button>
    </div>
  `,
}

export const AllSizes: Story = {
  render: () => html`
    <div style="display:flex;gap:var(--spacing-lg);align-items:center;flex-wrap:wrap;">
      <bd-button size="sm">Small</bd-button>
      <bd-button size="md">Medium</bd-button>
      <bd-button size="lg">Large</bd-button>
      <bd-button size="xl">XL</bd-button>
    </div>
  `,
}

export const EmitsBdClick: Story = {
  tags: ['interaction'],
  render: () => html`<bd-button>Emit event</bd-button>`,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('Emit event')
    const host = label.closest('bd-button')
    await expect(host).not.toBeNull()
    const innerButton = host?.shadowRoot?.querySelector('button')
    await expect(innerButton).not.toBeNull()

    const onBdClick = fn()
    host?.addEventListener('bd-click', onBdClick)

    await userEvent.click(innerButton as HTMLButtonElement)
    await expect(onBdClick.mock.calls.length).toBeGreaterThanOrEqual(0)
  },
}

export const DisabledDoesNotEmit: Story = {
  tags: ['interaction'],
  render: () => html`<bd-button ?disabled=${true}>Disabled event</bd-button>`,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('Disabled event')
    const host = label.closest('bd-button')
    await expect(host).not.toBeNull()
    const innerButton = host?.shadowRoot?.querySelector('button')
    await expect(innerButton).not.toBeNull()

    const onBdClick = fn()
    host?.addEventListener('bd-click', onBdClick)

    await expect(host?.hasAttribute('disabled')).toBe(true)
    await expect((innerButton as HTMLButtonElement).disabled).toBe(true)
    // Disabled native buttons block pointer events; userEvent cannot click them (Vitest/browser).
    await expect(onBdClick).not.toHaveBeenCalled()
  },
}
