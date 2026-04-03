import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type { BdPaymentMethodName } from '../../components/bd-payment-method-icon.js'
import '../../components/bd-payment-method-icon.js'

/**
 * Figma Design System v1.1 — Payment method icons (`1142:83268`).
 */
const meta = {
  title: 'Foundations/Payment method icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Payment badges as `bd-payment-method-icon` with `size="sm|md|lg"`. Regenerate data: `npm run generate:payment-icons`.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const PAGE =
  'padding:2rem;max-width:min(100%,1400px);font-family:var(--font-family-body);color:var(--color-text-default);background:var(--color-surface-canvas);'
const BREAD = 'Foundations → Payment method icons'

const ALL: BdPaymentMethodName[] = [
  'affirm',
  'alipay',
  'amazon',
  'amex',
  'apple-pay',
  'bancontact',
  'bitcoin',
  'bitcoincash',
  'bitpay',
  'citadele',
  'diners-club',
  'discover',
  'elo',
  'ethereum',
  'forbrugsforeningen',
  'giropay',
  'google-pay',
  'ideal',
  'interac',
  'jcb',
  'klarna',
  'litecoin',
  'maestro',
  'mastercard',
  'payoneer',
  'paypal',
  'paysafe',
  'qiwi',
  'sepa',
  'shop-pay',
  'skrill',
  'sofort',
  'stripe',
  'unionpay',
  'verifone',
  'visa',
  'webmoney',
  'wechat',
  'yandex',
]

const grid =
  'display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:var(--spacing-lg);align-items:center;'

export const AllSm: Story = {
  name: 'All (sm)',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <h2
        style="font-family:var(--font-family-display);font-size:var(--font-size-display-xs);font-weight:600;margin:0 0 1rem;color:var(--color-text-heading);"
      >
        sm · 34×24
      </h2>
      <div style=${grid}>
        ${ALL.map(
          (m) => html`
            <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;">
              <bd-payment-method-icon method=${m} size="sm"></bd-payment-method-icon>
              <span style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);text-align:center;"
                >${m}</span
              >
            </div>
          `,
        )}
      </div>
    </div>
  `,
}

export const Sizes: Story = {
  name: 'Sizes (visa)',
  render: () => html`
    <div style=${PAGE}>
      <p style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);margin:0 0 0.5rem;">
        ${BREAD}
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:var(--spacing-xl);align-items:flex-end;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;">
          <bd-payment-method-icon method="visa" size="sm"></bd-payment-method-icon>
          <span style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);">sm</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;">
          <bd-payment-method-icon method="visa" size="md"></bd-payment-method-icon>
          <span style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);">md</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;">
          <bd-payment-method-icon method="visa" size="lg"></bd-payment-method-icon>
          <span style="font-size:var(--font-size-text-xs);color:var(--color-gray-light-mode-600);">lg</span>
        </div>
      </div>
    </div>
  `,
}
