import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Figma **Check icon** (`1254:137887`) — Default (subtle fill), Line (outline), Filled (solid + white check).
 *
 * @csspart root - Circular frame.
 */
export type BdCheckIconType = 'default' | 'line' | 'filled'
export type BdCheckIconColor = 'brand' | 'gray' | 'success'
export type BdCheckIconSize = 'xs' | 'sm' | 'md' | 'lg'

const BOX: Record<BdCheckIconSize, number> = {
  xs: 20,
  sm: 24,
  md: 28,
  lg: 32,
}

function subtleBg(c: BdCheckIconColor): string {
  switch (c) {
    case 'brand':
      return 'var(--color-utility-brand-50)'
    case 'gray':
      return 'var(--color-gray-light-mode-100)'
    case 'success':
      return 'var(--color-success-100)'
  }
}

function solidBg(c: BdCheckIconColor): string {
  switch (c) {
    case 'brand':
      return 'var(--color-utility-brand-600)'
    case 'gray':
      return 'var(--color-gray-light-mode-600)'
    case 'success':
      return 'var(--color-success-600)'
  }
}

@customElement('bd-check-icon')
export class BdCheckIcon extends LitElement {
  @property({ reflect: true }) type: BdCheckIconType = 'default'

  @property({ reflect: true }) color: BdCheckIconColor = 'brand'

  @property({ reflect: true }) size: BdCheckIconSize = 'xs'

  @property({ attribute: 'label' }) label = ''

  render() {
    const px = BOX[this.size]
    const subtle = subtleBg(this.color)
    const solid = solidBg(this.color)
    const mark = this.type === 'filled' ? '#ffffff' : solid

    return html`
      <div
        part="root"
        class="root"
        style="width:${px}px;height:${px}px;"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <svg
          class="svg"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          ${
            this.type === 'line'
              ? html`<circle
                cx="12"
                cy="12"
                r="9.25"
                stroke=${solid}
                stroke-width="1.5"
                fill="none"
              />`
              : html`<circle cx="12" cy="12" r="10" fill=${this.type === 'filled' ? solid : subtle} />`
          }
          <path
            d="M8 12.2 10.4 14.6 16.2 8.8"
            stroke=${mark}
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
        </svg>
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .root {
      flex-shrink: 0;
      border-radius: var(--radius-full);
      overflow: hidden;
      box-sizing: border-box;
    }

    .svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `
}
