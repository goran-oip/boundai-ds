import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const defaultMenuIcon = html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>`

const defaultCloseIcon = html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>`

/**
 * Figma **`Application nav menu button`** (`1161:14070`) — **menu** (hamburger) vs **close** toggle for drawers / mobile nav.
 *
 * @slot menu - Overrides default menu icon when **`opened`** is false.
 * @slot close - Overrides close icon when **`opened`** is true.
 *
 * @csspart base - Native `<button>`.
 *
 * @fires bd-click
 */
@customElement('bd-app-nav-menu-button')
export class BdAppNavMenuButton extends LitElement {
  @property({ type: Boolean, reflect: true }) opened = false

  @property({ attribute: 'label' }) label = 'Open navigation menu'

  @property({ attribute: 'label-opened' }) labelOpened = 'Close navigation menu'

  render() {
    const aria = this.opened ? this.labelOpened : this.label
    return html`
      <button part="base" type="button" aria-label=${aria} aria-expanded=${this.opened ? 'true' : 'false'} @click=${this._emit}>
        ${
          this.opened
            ? html`<span class="slot close"><slot name="close">${defaultCloseIcon}</slot></span>`
            : html`<span class="slot menu"><slot name="menu">${defaultMenuIcon}</slot></span>`
        }
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

    button:hover {
      background: var(--color-bg-primary-hover);
    }

    .slot {
      display: flex;
      width: 24px;
      height: 24px;
      align-items: center;
      justify-content: center;
    }

    :host([opened]) .close {
      opacity: 0.7;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-app-nav-menu-button': BdAppNavMenuButton
  }
}
