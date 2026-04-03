import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/** Figma **Tag** · frame `3307:417515` — input chips / filters / multi-select. */
export type BdTagSize = 'sm' | 'md' | 'lg'

/**
 * Leading content: **`none`** · **`dot`** · **`checkbox`** (selection) · **`media`** (`slot="prefix"` — flag, avatar, etc.).
 */
export type BdTagLeading = 'none' | 'dot' | 'checkbox' | 'media'

/** Trailing: **`none`** · **`close`** (remove) · **`count`** (numeric pill — set **`count`**). */
export type BdTagAction = 'none' | 'close' | 'count'

/**
 * Compact tag / chip for filters, multi-select inputs, and removable tokens.
 *
 * Neutral chrome: white surface, **`--color-border-primary`**, **`radius-sm`** (6px). Checkbox checked state uses **blue** (`--color-brand-ui-600`).
 *
 * @slot - Label text.
 * @slot prefix - Leading image or icon when `leading="media"` (≈16×16 sm/md, ≈20×20 lg).
 *
 * @csspart base - Root `<span>`.
 * @csspart checkbox - Visible checkbox box (decorative; native input is sibling).
 * @csspart close - Dismiss control (`action="close"`).
 *
 * @fires bd-dismiss - Close control activated (`action="close"`).
 * @fires bd-change - Checkbox toggled (`detail.checked`).
 */
@customElement('bd-tag')
export class BdTag extends LitElement {
  @property({ reflect: true }) size: BdTagSize = 'sm'

  @property({ reflect: true }) leading: BdTagLeading = 'none'

  @property({ reflect: true }) action: BdTagAction = 'none'

  /** Shown when `action="count"`. */
  @property({ type: Number }) count = 0

  /** Binds to the checkbox (`leading="checkbox"`). */
  @property({ type: Boolean, reflect: true }) checked = false

  @property({ type: Boolean, reflect: true }) disabled = false

  render() {
    const body =
      this.leading === 'checkbox'
        ? html`
            <label class="cb-label">
              <input
                type="checkbox"
                class="cb-input"
                part="checkbox"
                ?checked=${this.checked}
                ?disabled=${this.disabled}
                @change=${this._onCheckboxChange}
              />
              <span class="label"><slot></slot></span>
            </label>
          `
        : html`
            ${this.leading === 'dot' ? html`<span class="dot" aria-hidden="true"></span>` : nothing}
            ${
              this.leading === 'media'
                ? html`<span class="prefix"><slot name="prefix"></slot></span>`
                : nothing
            }
            <span class="label"><slot></slot></span>
          `
    return html`
      <span part="base" class="root">
        ${body}
        ${this.action === 'count' ? html`<span class="count" part="count">${this.count}</span>` : nothing}
        ${this.action === 'close' ? this._closeTpl() : nothing}
      </span>
    `
  }

  private _onCheckboxChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.checked = input.checked
    this.dispatchEvent(
      new CustomEvent('bd-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _closeTpl() {
    return html`
      <button
        type="button"
        class="close"
        part="close"
        aria-label="Remove"
        ?disabled=${this.disabled}
        @click=${this._onDismiss}
      >
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M9 3L3 9M3 3l6 6"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>
    `
  }

  private _onDismiss(e: Event) {
    e.stopPropagation()
    if (this.disabled) return
    this.dispatchEvent(new CustomEvent('bd-dismiss', { bubbles: true, composed: true }))
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .root {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      max-width: 100%;
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-sm);
      background: var(--color-bg-primary);
      color: var(--color-text-secondary-700);
      font-family: var(--font-family-body);
      font-weight: var(--font-weight-medium);
      letter-spacing: var(--letter-spacing-none);
    }

    :host([disabled]) .root {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ----- sizes (default: sm/md text-xs, lg text-sm) ----- */
    :host([size='sm']) .root,
    :host([size='md']) .root {
      gap: var(--spacing-xs);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
    }

    :host([size='lg']) .root {
      gap: var(--spacing-xs);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    /* padding matrix */
    :host([size='sm'][leading='none']) .root {
      padding: var(--spacing-3px) var(--spacing-md);
    }

    :host([size='md'][leading='none']) .root {
      padding: var(--spacing-3px) var(--spacing-10px);
    }

    :host([size='lg'][leading='none']) .root {
      padding: var(--spacing-xs) var(--spacing-10px);
    }

    :host([leading='dot']) .root {
      padding: var(--spacing-3px) var(--spacing-md) var(--spacing-3px) var(--spacing-sm);
    }

    :host([size='lg'][leading='dot']) .root {
      padding: var(--spacing-xs) var(--spacing-md) var(--spacing-xs) var(--spacing-sm);
    }

    :host([leading='media']) .root {
      padding: var(--spacing-3px) var(--spacing-md) var(--spacing-3px) var(--spacing-sm);
    }

    :host([size='lg'][leading='media']) .root {
      padding: var(--spacing-xs) var(--spacing-md) var(--spacing-xs) var(--spacing-sm);
    }

    :host([leading='checkbox']) .root {
      padding: var(--spacing-3px) var(--spacing-md) var(--spacing-3px) var(--spacing-5px);
    }

    :host([size='lg'][leading='checkbox']) .root {
      padding: var(--spacing-xs) var(--spacing-md) var(--spacing-xs) var(--spacing-5px);
    }

    :host([action='close']) .root {
      gap: var(--spacing-3px);
      padding-right: var(--spacing-xs);
    }

    :host([action='count']) .root {
      padding-right: var(--spacing-xs);
    }

    .cb-label {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
      min-width: 0;
      cursor: pointer;
    }

    .cb-input {
      appearance: none;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      margin: 0;
      flex-shrink: 0;
      border-radius: var(--radius-xs);
      border: 1px solid var(--color-border-primary);
      background: var(--color-bg-primary);
      cursor: pointer;
    }

    .cb-input:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }

    .cb-input:checked {
      border-color: var(--color-brand-ui-600);
      background-color: var(--color-brand-ui-600);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M10 3L4.5 8.5L2 6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-size: 10px 10px;
      background-position: center;
      background-repeat: no-repeat;
    }

    .dot {
      flex-shrink: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-gray-light-mode-500);
    }

    .prefix {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
    }

    .prefix ::slotted(*) {
      display: block;
      width: 16px;
      height: 16px;
      object-fit: cover;
      border-radius: var(--radius-xs);
    }

    :host([size='lg']) .prefix ::slotted(*) {
      width: 20px;
      height: 20px;
    }

    .label {
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .count {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 8px;
      min-height: 16px;
      padding: 0 var(--spacing-xs);
      border-radius: 3px;
      background: var(--color-gray-light-mode-100);
      color: var(--color-text-secondary-700);
      font-size: inherit;
      line-height: inherit;
      flex-shrink: 0;
    }

    .close {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: var(--spacing-xxs);
      border: none;
      border-radius: 3px;
      background: transparent;
      color: var(--color-text-tertiary-600);
      cursor: pointer;
      flex-shrink: 0;
    }

    .close:hover:not(:disabled) {
      color: var(--color-text-secondary-700);
      background: var(--color-bg-primary-hover);
    }

    .close:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 1px;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-tag': BdTag
  }
}
