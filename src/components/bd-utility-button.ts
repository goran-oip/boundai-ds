import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/** Figma **Buttons/Button utility** · node `8003:526508` */
export type BdUtilityButtonHierarchy = 'secondary' | 'tertiary'
export type BdUtilityButtonSize = 'xs' | 'sm'

/**
 * Compact icon-only control (settings, more, etc.). Slotted content should be an icon (~16 / 20 px).
 * Set **`label`** so the inner `<button>` exposes an accessible name (required for production).
 *
 * @slot - Icon (required for production).
 *
 * @csspart base - Native `<button>`.
 *
 * @fires bd-click
 */
@customElement('bd-utility-button')
export class BdUtilityButton extends LitElement {
  @property({ reflect: true }) hierarchy: BdUtilityButtonHierarchy = 'secondary'

  @property({ reflect: true }) size: BdUtilityButtonSize = 'sm'

  @property({ type: Boolean, reflect: true }) disabled = false

  /** Accessible name for the icon button (mirrors to inner `aria-label`). */
  @property({ attribute: 'label' }) label = ''

  render() {
    return html`
      <button
        part="base"
        type="button"
        aria-label=${this.label || nothing}
        ?disabled=${this.disabled}
        @click=${this._emit}
      >
        <span class="inner"><slot></slot></span>
      </button>
    `
  }

  private _emit() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('bd-click', { bubbles: true, composed: true }))
    }
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    button {
      box-sizing: border-box;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: var(--spacing-sm);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font: inherit;
      color: var(--color-gray-light-mode-700);
      transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease,
        opacity 0.15s ease;
    }

    .inner {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    :host([size='xs']) button {
      min-width: 28px;
      min-height: 28px;
    }
    :host([size='sm']) button {
      min-width: 32px;
      min-height: 32px;
    }

    /* Secondary — bordered + shadow-xs + skeuomorphic inner */
    :host([hierarchy='secondary']) button {
      border: 1px solid var(--color-border-primary);
      background: var(--color-bg-primary);
      box-shadow: var(--shadow-button-xs), var(--shadow-button-skeuomorphic-inner);
    }

    :host([hierarchy='secondary']) button:hover:not(:disabled) {
      border-color: var(--color-border-primary);
      background: var(--color-bg-primary-hover);
    }

    :host([hierarchy='secondary']) button:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
      border-color: var(--color-border-primary);
      background: var(--color-bg-primary);
    }

    :host([hierarchy='secondary']) button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      border-color: var(--color-border-disabled-subtle);
      background: var(--color-bg-primary);
      box-shadow: var(--shadow-button-xs);
    }

    /* Tertiary — ghost */
    :host([hierarchy='tertiary']) button {
      border: 1px solid transparent;
      background: transparent;
      box-shadow: none;
    }

    :host([hierarchy='tertiary']) button:hover:not(:disabled) {
      background: var(--color-bg-primary-hover);
    }

    :host([hierarchy='tertiary']) button:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
      background: var(--color-bg-primary);
    }

    :host([hierarchy='tertiary']) button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    button:focus:not(:focus-visible) {
      outline: none;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-utility-button': BdUtilityButton
  }
}
