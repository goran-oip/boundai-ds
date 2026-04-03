import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type { BdTagAction, BdTagLeading, BdTagSize } from '../components/bd-tag.js'
import '../components/bd-tag.js'

type Args = {
  size: BdTagSize
  leading: BdTagLeading
  action: BdTagAction
  count: number
  checked: boolean
  label: string
}

const meta = {
  title: 'Components/bd-tag',
  tags: ['autodocs'],
  render: (args: Args) => {
    if (args.leading === 'media') {
      return html`
        <bd-tag
          size=${args.size}
          leading="media"
          action=${args.action}
          count=${args.count}
          ?checked=${args.checked}
        >
          ${args.label}
          <img
            slot="prefix"
            src="https://flagcdn.com/w40/gb.png"
            width="16"
            height="16"
            alt=""
          />
        </bd-tag>
      `
    }
    return html`
      <bd-tag
        size=${args.size}
        leading=${args.leading}
        action=${args.action}
        count=${args.count}
        ?checked=${args.checked}
      >
        ${args.label}
      </bd-tag>
    `
  },
  args: {
    size: 'sm',
    leading: 'none',
    action: 'none',
    count: 5,
    checked: false,
    label: 'Label',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    leading: {
      control: 'select',
      options: ['none', 'dot', 'checkbox', 'media'],
    },
    action: { control: 'select', options: ['none', 'close', 'count'] },
    count: { control: 'number' },
    checked: { control: 'boolean' },
    label: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-tag>` — Figma **Tag** (`3307:417515`): neutral bordered chips for inputs, filters, and multi-select. Checkbox uses **blue** (`--color-brand-ui-600`) when checked.',
      },
    },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

export const Default: Story = {}

export const Removable: Story = {
  args: { action: 'close' },
}

export const WithCount: Story = {
  args: { action: 'count', count: 12 },
}

export const WithDot: Story = {
  args: { leading: 'dot' },
}

export const WithCheckbox: Story = {
  args: { leading: 'checkbox', checked: true },
}

export const Large: Story = {
  args: { size: 'lg' },
}

export const MediaLeading: Story = {
  args: { leading: 'media', label: 'English' },
  render: (args: Args) => html`
    <bd-tag size=${args.size} leading="media" action=${args.action} count=${args.count}>
      ${args.label}
      <img slot="prefix" src="https://flagcdn.com/w40/gb.png" width="16" height="16" alt="" />
    </bd-tag>
  `,
}

export const Row: Story = {
  render: () => html`
    <div
      style="display:flex;flex-wrap:wrap;gap:var(--spacing-sm);align-items:center;font-family:var(--font-family-body);"
    >
      <bd-tag>Label</bd-tag>
      <bd-tag action="close">Label</bd-tag>
      <bd-tag action="count" .count=${5}>Label</bd-tag>
      <bd-tag leading="dot">Label</bd-tag>
      <bd-tag leading="checkbox">Label</bd-tag>
      <bd-tag size="md">Label</bd-tag>
      <bd-tag size="lg">Label</bd-tag>
    </div>
  `,
}
