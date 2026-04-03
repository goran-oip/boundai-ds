import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type {
  BdPaymentMethodIconSize,
  BdPaymentMethodName,
} from '../components/bd-payment-method-icon.js'
import '../components/bd-payment-method-icon.js'

type BdPaymentMethodIconArgs = {
  method: BdPaymentMethodName
  size: BdPaymentMethodIconSize
  label: string
}

/**
 * Figma Design System v1.1 — Payment method icon (`1142:83268`).
 */
const meta = {
  title: 'Base Components/bd-payment-method-icon',
  id: 'components-bd-payment-method-icon',
  tags: ['autodocs'],
  render: (args: BdPaymentMethodIconArgs) =>
    html`<bd-payment-method-icon
      method=${args.method}
      size=${args.size}
      label=${args.label || ''}
    ></bd-payment-method-icon>`,
  args: {
    method: 'visa',
    size: 'sm',
    label: '',
  } satisfies BdPaymentMethodIconArgs,
  argTypes: {
    method: {
      control: 'select',
      options: [
        'visa',
        'mastercard',
        'paypal',
        'stripe',
        'apple-pay',
        'google-pay',
        'klarna',
        'sofort',
        'ideal',
        'bancontact',
      ] satisfies BdPaymentMethodName[],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
  },
} satisfies Meta<BdPaymentMethodIconArgs>

export default meta
type Story = StoryObj<BdPaymentMethodIconArgs>

export const Playground: Story = {}
