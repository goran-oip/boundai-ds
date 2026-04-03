import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/** Figma **Buttons/Button close X** · node `2763:420129` */
export type BdCloseButtonSize = 'sm' | 'md' | 'lg'

/**
 * Icon-only dismiss control (×). Use on light surfaces, or set `dark-background` on dark/chrome.
 *
 * @slot - Replace the default × icon (optional).
 *
 * @csspart base - Native `<button>`.
 *
 * @fires bd-click
 */
@customElement('bd-close-button')
export class BdCloseButton extends LitElement {
  /** Hit target: 36 / 40 / 44 px. */
  @property({ reflect: true }) size: BdCloseButtonSize = 'md'

  /** Use on dark headers/modals — light icon + hover wash; focus ring uses `--color-focus-ring` (blue). */
  @property({ type: Boolean, reflect: true, attribute: 'dark-background' })
  darkBackground = false

  /** Accessible name (default “Close”). */
  @property({ attribute: 'label' }) label = 'Close'

  render() {
    return html`
      <button part="base" type="button" aria-label=${this.label} @click=${this._emit}>
        <span class="icon-wrap" aria-hidden="true">
          <slot>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </slot>
        </span>
      </button>
    `
  }

  private _emit() {
    this.dispatchEvent(new CustomEvent('bd-click', { bubbles: true, composed: true }))
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    button {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: var(--spacing-md);
      border: none;
      border-radius: var(--radius-md);
      background: transparent;
      cursor: pointer;
      color: var(--color-gray-light-mode-700);
      transition: background-color 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
    }

    :host([size='sm']) button {
      width: 36px;
      height: 36px;
    }
    :host([size='md']) button {
      width: 40px;
      height: 40px;
    }
    :host([size='lg']) button {
      width: 44px;
      height: 44px;
    }

    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host([size='sm']) svg,
    :host([size='md']) svg {
      width: 20px;
      height: 20px;
    }
    :host([size='lg']) svg {
      width: 24px;
      height: 24px;
    }

    /* Light surface */
    :host(:not([dark-background])) button:hover {
      background: var(--color-bg-primary-hover);
      color: var(--color-gray-light-mode-800);
    }
    :host(:not([dark-background])) button:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
      background: var(--color-bg-primary);
    }

    /* Dark surface */
    :host([dark-background]) button {
      color: var(--color-base-white);
      opacity: 1;
    }
    :host([dark-background]) .icon-wrap {
      opacity: 0.7;
    }
    :host([dark-background]) button:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    :host([dark-background]) button:hover .icon-wrap {
      opacity: 1;
    }
    :host([dark-background]) button:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
      background: rgba(255, 255, 255, 0.2);
    }
    :host([dark-background]) button:focus-visible .icon-wrap {
      opacity: 1;
    }

    button:active {
      transform: scale(0.98);
    }

    button:focus:not(:focus-visible) {
      outline: none;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-close-button': BdCloseButton
  }
}
