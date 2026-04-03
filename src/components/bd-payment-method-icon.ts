import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { rewriteSvgIds } from '../utils/svg-id.js'
import {
  type BdPaymentMethodName,
  PAYMENT_ICON_ENTRIES,
  PAYMENT_METHOD_SURFACE,
} from './icons/payment-icon-data.js'

let uid = 0

/**
 * Figma **Payment method icon** (`1142:83268`) — sm / md / lg card badges with brand marks.
 *
 * @csspart root - Outer shell (rounded rect).
 * @csspart mark - Inner SVG.
 */
export type { BdPaymentMethodName } from './icons/payment-icon-data.js'
export type BdPaymentMethodIconSize = 'sm' | 'md' | 'lg'

const SIZE_PX: Record<BdPaymentMethodIconSize, { w: number; h: number }> = {
  sm: { w: 34, h: 24 },
  md: { w: 46, h: 32 },
  lg: { w: 58, h: 40 },
}

@customElement('bd-payment-method-icon')
export class BdPaymentMethodIcon extends LitElement {
  @property({ reflect: true }) method: BdPaymentMethodName = 'visa'

  @property({ reflect: true }) size: BdPaymentMethodIconSize = 'sm'

  @property({ attribute: 'label' }) label = ''

  private _idPrefix = `bd-pay-${++uid}`

  render() {
    const entry = PAYMENT_ICON_ENTRIES[this.method]
    if (!entry) {
      return html``
    }
    const body = rewriteSvgIds(entry.body, this._idPrefix)
    const surface = PAYMENT_METHOD_SURFACE[this.method]
    const isBrand = surface.kind === 'brand'
    const { w, h } = SIZE_PX[this.size]

    const shellStyle = isBrand
      ? `width:${w}px;height:${h}px;background:${surface.bg};border:none;`
      : `width:${w}px;height:${h}px;`

    return html`
      <div
        part="root"
        class="shell ${isBrand ? 'is-brand' : 'is-default'}"
        style=${shellStyle}
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <svg
          part="mark"
          class="mark"
          viewBox=${entry.viewBox}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          ${unsafeHTML(body)}
        </svg>
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .shell {
      display: inline-flex;
      box-sizing: border-box;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      padding: 2px 4px;
      border-radius: var(--radius-xs);
      line-height: 0;
    }

    :host([size='lg']) .shell {
      border-radius: var(--radius-sm);
    }

    .shell.is-default {
      background: var(--color-base-white);
      border: 1px solid var(--color-border-secondary);
    }

    .shell.is-brand {
      padding: 2px 4px;
    }

    .mark {
      display: block;
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
    }
  `
}
