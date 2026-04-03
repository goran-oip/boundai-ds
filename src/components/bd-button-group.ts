import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Figma **Button group** · node `1046:10171` — toolbar / segmented control / split-style actions.
 *
 * Set `layout` on the group; each **`bd-button-group-item`** inherits padding and inner gap via CSS variables.
 * Place **`bd-button-group-item`** elements as **direct children** (no wrapper) so first/last rounding and dividers apply.
 */
export type BdButtonGroupLayout = 'text' | 'leading' | 'icon-only'

@customElement('bd-button-group')
export class BdButtonGroup extends LitElement {
  /**
   * `text` — label only (Figma icon “False”).
   * `leading` — icon + label (Figma “Leading”).
   * `icon-only` — icon only (Figma “Only”).
   */
  @property({ reflect: true }) layout: BdButtonGroupLayout = 'text'

  /** Accessible label for `role="group"` (e.g. “Date range”). */
  @property({ attribute: 'label' }) label = ''

  render() {
    return html`
      <div
        class="root"
        part="root"
        role="group"
        aria-label=${this.label || nothing}
      >
        <slot></slot>
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;

      /* Inherited by bd-button-group-item (light DOM) */
      --bd-bg-item-py: var(--spacing-md);
      --bd-bg-item-gap: 0;
      --bd-bg-item-pl: var(--spacing-xl);
      --bd-bg-item-pr: var(--spacing-xl);
    }

    :host([layout='leading']) {
      --bd-bg-item-pl: var(--spacing-14px);
      --bd-bg-item-pr: var(--spacing-xl);
      --bd-bg-item-gap: var(--spacing-sm);
    }

    :host([layout='icon-only']) {
      --bd-bg-item-pl: var(--spacing-lg);
      --bd-bg-item-pr: var(--spacing-lg);
      --bd-bg-item-gap: 0;
    }

    .root {
      box-sizing: border-box;
      position: relative;
      display: inline-flex;
      align-items: stretch;
      isolation: isolate;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border-primary);
      box-shadow: var(--shadow-button-xs);
    }

    .root::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      box-shadow: var(--shadow-button-skeuomorphic-inner);
      z-index: 2;
    }
  `
}

/**
 * One segment in a **`bd-button-group`**. Renders a native `<button type="button">`.
 *
 * @slot - Label, or icon + label (`layout="leading"`), or icon only (`layout="icon-only"` on the group).
 *
 * @csspart base - The `<button>`.
 *
 * @fires bd-click
 */
@customElement('bd-button-group-item')
export class BdButtonGroupItem extends LitElement {
  @property({ type: Boolean, reflect: true }) disabled = false

  /** Use for “tabs” / date-range toggles — pressed visual. */
  @property({ type: Boolean, reflect: true }) selected = false

  /** Forwarded to the inner `<button>` (use for **icon-only** groups). */
  @property({ attribute: 'aria-label' }) ariaLabel = ''

  render() {
    return html`
      <button
        part="base"
        type="button"
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel || nothing}
        @click=${this._emit}
      >
        <span class="inner"><slot></slot></span>
      </button>
    `
  }

  private _emit(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    this.dispatchEvent(new CustomEvent('bd-click', { bubbles: true, composed: true }))
  }

  static styles = css`
    :host {
      display: flex;
      flex: 0 0 auto;
      position: relative;
      z-index: 0;
    }

    :host(:hover),
    :host(:focus-within) {
      z-index: 1;
    }

    button {
      box-sizing: border-box;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      min-height: 40px;
      padding: var(--bd-bg-item-py, var(--spacing-md)) var(--bd-bg-item-pr, var(--spacing-xl))
        var(--bd-bg-item-py, var(--spacing-md)) var(--bd-bg-item-pl, var(--spacing-xl));
      border: none;
      border-right: 1px solid var(--color-border-primary);
      background: var(--color-bg-primary);
      color: var(--color-text-secondary-700);
      cursor: pointer;
      font-family: var(--font-family-body);
      font-weight: var(--font-weight-semibold);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      letter-spacing: var(--letter-spacing-none);
      transition:
        background-color 0.15s ease,
        color 0.15s ease;
    }

    :host(:last-of-type) button {
      border-right: none;
    }

    :host(:first-of-type) button {
      border-top-left-radius: var(--radius-md);
      border-bottom-left-radius: var(--radius-md);
    }

    :host(:last-of-type) button {
      border-top-right-radius: var(--radius-md);
      border-bottom-right-radius: var(--radius-md);
    }

    .inner {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--bd-bg-item-gap, 0);
    }

    button:hover:not(:disabled) {
      color: var(--color-text-secondary-hover);
      background: var(--color-bg-primary-hover);
    }

    :host([selected]) button:not(:disabled) {
      color: var(--color-text-primary-900);
      background: var(--color-bg-primary-hover);
    }

    button:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
      z-index: 3;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-button-group': BdButtonGroup
    'bd-button-group-item': BdButtonGroupItem
  }
}
