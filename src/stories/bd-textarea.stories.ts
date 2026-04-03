import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-textarea.js'
import '../components/bd-tag.js'

type BdTextareaArgs = {
  variant: 'default' | 'tags'
  label: string
  placeholder: string
  hint: string
  errorText: string
  invalid: boolean
  required: boolean
  showHelp: boolean
  disabled: boolean
  value: string
  minHeight: string
}

const meta = {
  title: 'Base Components/bd-textarea',
  id: 'components-bd-textarea',
  tags: ['autodocs'],
  render: (args: BdTextareaArgs) =>
    html`<div style="padding:var(--spacing-4xl);max-width:360px;background:var(--color-surface-canvas)">
      <bd-textarea
        variant=${args.variant}
        label=${args.label}
        placeholder=${args.placeholder}
        hint=${args.hint}
        error-text=${args.errorText}
        ?invalid=${args.invalid}
        ?required=${args.required}
        ?show-help=${args.showHelp}
        ?disabled=${args.disabled}
        .value=${args.value}
        min-height=${args.minHeight}
      >
        ${
          args.variant === 'tags'
            ? html`
              <bd-tag slot="tags" size="sm" action="close">Design</bd-tag>
              <bd-tag slot="tags" size="sm" action="close">Software</bd-tag>
            `
            : null
        }
      </bd-textarea>
    </div>`,
  args: {
    variant: 'default',
    label: 'Description',
    placeholder: 'Enter a description...',
    hint: 'This is a hint text to help user.',
    errorText: 'This is an error message.',
    invalid: false,
    required: true,
    showHelp: true,
    disabled: false,
    value: '',
    minHeight: '120px',
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'tags'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    errorText: { control: 'text' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
    showHelp: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    minHeight: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-textarea>` — Figma **TextArea Input Field** (`1238:278`): label + optional help, bordered surface (`--shadow-button-xs`), blue focus (`--color-interactive-accent`), error (`--color-border-error-subtle` / `--color-error-500` when focused), disabled fill (`--color-gray-light-mode-50`). **`variant="tags"`** uses `slot="tags"` + inline tag input.',
      },
    },
  },
} satisfies Meta<BdTextareaArgs>

export default meta
type Story = StoryObj<BdTextareaArgs>

export const DefaultPlaceholder: Story = {
  name: 'Default · placeholder',
  args: {
    value: '',
    hint: 'This is a hint text to help user.',
  },
}

export const DefaultFilled: Story = {
  name: 'Default · filled',
  args: {
    value: "A little about the company and the team that you'll be working with.",
    hint: 'This is a hint text to help user.',
  },
}

export const Invalid: Story = {
  args: {
    value: '',
    placeholder: 'Enter a description...',
    invalid: true,
    errorText: 'This is an error message.',
    hint: '',
  },
}

export const Disabled: Story = {
  args: {
    value: '',
    disabled: true,
    hint: 'This is a hint text to help user.',
  },
}

export const TagsEmpty: Story = {
  name: 'Tags · placeholder',
  args: {
    variant: 'tags',
    value: '',
    hint: 'This is a hint text to help user.',
  },
  render: (args) =>
    html`<div style="padding:var(--spacing-4xl);max-width:360px;background:var(--color-surface-canvas)">
      <bd-textarea
        variant="tags"
        label=${args.label}
        hint=${args.hint}
        error-text=${args.errorText}
        tag-input-placeholder="Add tags..."
        ?invalid=${args.invalid}
        ?required=${args.required}
        ?show-help=${args.showHelp}
        ?disabled=${args.disabled}
        min-height=${args.minHeight}
      ></bd-textarea>
    </div>`,
}

export const TagsWithChips: Story = {
  name: 'Tags · with chips',
  args: {
    variant: 'tags',
    value: '',
    hint: 'This is a hint text to help user.',
  },
  render: (args) =>
    html`<div style="padding:var(--spacing-4xl);max-width:360px;background:var(--color-surface-canvas)">
      <bd-textarea
        variant="tags"
        label=${args.label}
        hint=${args.hint}
        error-text=${args.errorText}
        tag-input-placeholder="Add tags..."
        ?invalid=${args.invalid}
        ?required=${args.required}
        ?show-help=${args.showHelp}
        ?disabled=${args.disabled}
        min-height=${args.minHeight}
      >
        <bd-tag slot="tags" size="sm" action="close">Design</bd-tag>
        <bd-tag slot="tags" size="sm" action="close">Software</bd-tag>
      </bd-textarea>
    </div>`,
}
