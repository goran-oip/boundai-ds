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

/** Figma outline variants: single circle, fill + stroke halo (`1046:12310`). */
const OUTLINE: Record<
  BdStatusDotSize,
  { box: number; cx: number; cy: number; r: number; stroke: number }
> = {
  sm: { box: 12, cx: 6, cy: 6, r: 4.5, stroke: 3 },
  md: { box: 16, cx: 8, cy: 8, r: 6, stroke: 4 },
  lg: { box: 20, cx: 10, cy: 10, r: 7.5, stroke: 5 },
}

@customElement('bd-status-dot')
export class BdStatusDot extends LitElement {
  @property({ type: Boolean, reflect: true }) outline = false

  @property({ reflect: true }) size: BdStatusDotSize = 'sm'

  @property({ attribute: 'label' }) label = ''

  render() {
    if (this.outline) {
      const o = OUTLINE[this.size]
      return html`
        <div
          part="root"
          class="root root--outline"
          style="width:${o.box}px;height:${o.box}px;"
          role=${this.label ? 'img' : nothing}
          aria-label=${this.label || nothing}
          aria-hidden=${this.label ? nothing : 'true'}
        >
          <svg
            class="outline-svg"
            width=${o.box}
            height=${o.box}
            viewBox="0 0 ${o.box} ${o.box}"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              cx=${o.cx}
              cy=${o.cy}
              r=${o.r}
              fill="var(--color-success-500)"
              stroke="var(--color-success-100)"
              stroke-width=${o.stroke}
            />
          </svg>
        </div>
      `
    }

    const inner = SOLID[this.size]
    return html`
      <div
        part="root"
        class="root"
        style="width:${inner}px;height:${inner}px;--dot:${inner}px;"
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

    .root--outline {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .outline-svg {
      display: block;
      overflow: visible;
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
