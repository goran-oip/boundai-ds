import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Figma **Dot** (`1046:12310`) — success status: solid sizes or outlined “halo”.
 *
 * @csspart root - Outer box (halo when `outline`).
 */
export type BdStatusDotSize = 'sm' | 'md' | 'lg'

const SOLID: Record<BdStatusDotSize, number> = {
  sm: 6,
  md: 8,
  lg: 10,
}

const HALO: Record<BdStatusDotSize, number> = {
  sm: 8,
  md: 10,
  lg: 12,
}

@customElement('bd-status-dot')
export class BdStatusDot extends LitElement {
  @property({ type: Boolean, reflect: true }) outline = false

  @property({ reflect: true }) size: BdStatusDotSize = 'sm'

  @property({ attribute: 'label' }) label = ''

  render() {
    const outer = this.outline ? HALO[this.size] : SOLID[this.size]
    const inner = SOLID[this.size]

    return html`
      <div
        part="root"
        class="root ${this.outline ? 'has-halo' : ''}"
        style="width:${outer}px;height:${outer}px;--dot:${inner}px;"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <span class="dot" aria-hidden="true"></span>
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .root {
      position: relative;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-full);
    }

    .root.has-halo {
      background: color-mix(in srgb, var(--color-success-600) 18%, transparent);
    }

    .dot {
      display: block;
      width: var(--dot);
      height: var(--dot);
      border-radius: var(--radius-full);
      background: var(--color-success-600);
    }
  `
}
