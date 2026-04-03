import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/** Figma **Buttons/Button loading icon** · node `8993:429278` */
export type BdSpinnerSize = 'sm' | 'md'

/**
 * Indeterminate loading indicator. Arc uses **blue** (`--color-brand-ui-600`).
 *
 * @csspart ring - Rotating element.
 */
@customElement('bd-spinner')
export class BdSpinner extends LitElement {
  /** `sm` 20px · `md` 24px (matches Figma). */
  @property({ reflect: true }) size: BdSpinnerSize = 'sm'

  render() {
    return html`
      <div part="ring" class="ring" role="status" aria-label="Loading">
        <span class="sr-only">Loading</span>
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .ring {
      display: block;
      box-sizing: border-box;
      border-radius: 50%;
      border-style: solid;
      border-color: var(--color-gray-light-mode-200);
      border-top-color: var(--color-brand-ui-600);
      animation: bd-spinner-rotate 0.75s linear infinite;
    }

    :host([size='sm']) .ring {
      width: 20px;
      height: 20px;
      border-width: 2px;
    }

    :host([size='md']) .ring {
      width: 24px;
      height: 24px;
      border-width: 2px;
    }

    @keyframes bd-spinner-rotate {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .ring {
        animation-duration: 1.5s;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-spinner': BdSpinner
  }
}
