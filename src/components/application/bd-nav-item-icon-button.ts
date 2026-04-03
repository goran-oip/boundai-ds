import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type BdNavItemIconButtonSize = 'md' | 'lg'

/**
 * Figma **`Nav item button`** (`1165:736`) — square **icon-only** control (**`md`** 40px, **`lg`** 48px) for slim sidebars / toolbars.
 *
 * @slot - Icon (20px or 24px to match size).
 *
 * @csspart base - Native `<button>`.
 *
 * @fires bd-click
 */
@customElement('bd-nav-item-icon-button')
export class BdNavItemIconButton extends LitElement {
  @property({ reflect: true }) size: BdNavItemIconButtonSize = 'md'

  @property({ type: Boolean, reflect: true }) current = false

  @property({ attribute: 'label' }) label = ''

  render() {
    return html`
      <button part="base" type="button" aria-label=${this.label || nothing} @click=${this._emit}>
        <span class="inner"><slot></slot></span>
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
      border-radius: var(--radius-sm);
      background: var(--color-bg-primary);
      color: var(--color-text-secondary-700);
      cursor: pointer;
      line-height: 0;
      transition: background-color 0.15s ease, box-shadow 0.15s ease;
    }

    button:focus {
      outline: none;
    }

    button:focus-visible {
      box-shadow: var(--shadow-effects-focus-ring-sm);
    }

    :host([size='md']) button {
      width: var(--spacing-5xl);
      height: var(--spacing-5xl);
    }

    :host([size='lg']) button {
      width: var(--spacing-6xl);
      height: var(--spacing-6xl);
    }

    :host([current]) button {
      background: var(--color-bg-primary-hover);
    }

    button:hover {
      background: var(--color-bg-primary-hover);
    }

    :host([current]) button:hover {
      background: var(--color-gray-light-mode-100);
    }

    .inner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-nav-item-icon-button': BdNavItemIconButton
  }
}
