import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/** Figma **Badges / Chips** · frame `1046:3819` */
export type BdBadgeVariant = 'pill' | 'badge' | 'modern'
export type BdBadgeSize = 'sm' | 'md'
export type BdBadgeColor =
  | 'brand'
  | 'gray'
  | 'error'
  | 'warning'
  | 'success'
  | 'gray-blue'
  | 'blue-light'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'orange'

/**
 * `none` — text only · `dot` — status dot · `close` — trailing dismiss ·
 * `leading` / `trailing` — `slot="prefix"` / `slot="suffix"` · `only` — icon-only (set `label`).
 */
export type BdBadgeIcon = 'none' | 'dot' | 'close' | 'leading' | 'trailing' | 'only'

/**
 * Badges and chips for labels, status, filters, and removable tags.
 *
 * - **`pill`** — `border-radius: full` · **`badge`** — `radius-sm` filled tint · **`modern`** — white surface, border, `shadow-xs`, gray label; icons use the palette accent (Figma “Badge modern”).
 * - **`brand`** maps to **Blue dark** utilities (product blue).
 *
 * @slot - Label text (omit when `icon="only"`).
 * @slot prefix - Leading icon (`icon="leading"` or `icon="only"` with slotted icon).
 * @slot suffix - Trailing icon (`icon="trailing"`).
 *
 * @csspart base - Root `<span>` (or layout wrapper).
 *
 * @fires bd-dismiss - Close control activated (`icon="close"`).
 */
@customElement('bd-badge')
export class BdBadge extends LitElement {
  @property({ reflect: true }) variant: BdBadgeVariant = 'pill'

  @property({ reflect: true }) size: BdBadgeSize = 'sm'

  @property({ reflect: true }) color: BdBadgeColor = 'brand'

  @property({ reflect: true }) icon: BdBadgeIcon = 'none'

  /** Required when `icon="only"` — sets `aria-label` on the root. */
  @property({ attribute: 'label' }) label = ''

  render() {
    const only = this.icon === 'only'
    return html`
      <span
        part="base"
        class="root"
        aria-label=${only && this.label ? this.label : nothing}
      >
        ${this.icon === 'dot' ? html`<span class="dot" aria-hidden="true"></span>` : nothing}
        ${
          this.icon === 'leading'
            ? html`<span class="slot-icon"><slot name="prefix"></slot></span>`
            : nothing
        }
        ${
          only
            ? html`<span class="slot-only"><slot></slot></span>`
            : html`<span class="label"><slot></slot></span>`
        }
        ${
          this.icon === 'trailing'
            ? html`<span class="slot-icon"><slot name="suffix"></slot></span>`
            : nothing
        }
        ${this.icon === 'close' ? this._closeTpl() : nothing}
      </span>
    `
  }

  private _closeTpl() {
    return html`
      <button
        type="button"
        class="close"
        part="close"
        aria-label="Remove"
        @click=${this._onDismiss}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
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
    this.dispatchEvent(new CustomEvent('bd-dismiss', { bubbles: true, composed: true }))
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
      --bd-c-bg: var(--color-utility-gray-50);
      --bd-c-border: var(--color-utility-gray-200);
      --bd-c-fg: var(--color-utility-gray-700);
      --bd-c-accent: var(--color-utility-gray-500);
    }

    :host([color='brand']) {
      --bd-c-bg: var(--color-utility-blue-dark-50);
      --bd-c-border: var(--color-utility-blue-dark-200);
      --bd-c-fg: var(--color-utility-blue-dark-700);
      --bd-c-accent: var(--color-utility-blue-dark-500);
    }

    :host([color='gray']) {
      --bd-c-bg: var(--color-utility-gray-50);
      --bd-c-border: var(--color-utility-gray-200);
      --bd-c-fg: var(--color-utility-gray-700);
      --bd-c-accent: var(--color-utility-gray-500);
    }

    :host([color='error']) {
      --bd-c-bg: var(--color-utility-error-50);
      --bd-c-border: var(--color-utility-error-200);
      --bd-c-fg: var(--color-utility-error-700);
      --bd-c-accent: var(--color-utility-error-500);
    }

    :host([color='warning']) {
      --bd-c-bg: var(--color-utility-warning-50);
      --bd-c-border: var(--color-utility-warning-200);
      --bd-c-fg: var(--color-utility-warning-700);
      --bd-c-accent: var(--color-utility-warning-500);
    }

    :host([color='success']) {
      --bd-c-bg: var(--color-utility-success-50);
      --bd-c-border: var(--color-utility-success-200);
      --bd-c-fg: var(--color-utility-success-700);
      --bd-c-accent: var(--color-utility-success-500);
    }

    :host([color='gray-blue']) {
      --bd-c-bg: var(--color-utility-gray-blue-50);
      --bd-c-border: var(--color-utility-gray-blue-200);
      --bd-c-fg: var(--color-utility-gray-blue-700);
      --bd-c-accent: var(--color-utility-gray-blue-500);
    }

    :host([color='blue-light']) {
      --bd-c-bg: var(--color-utility-blue-light-50);
      --bd-c-border: var(--color-utility-blue-light-200);
      --bd-c-fg: var(--color-utility-blue-light-700);
      --bd-c-accent: var(--color-utility-blue-light-500);
    }

    :host([color='blue']) {
      --bd-c-bg: var(--color-utility-blue-50);
      --bd-c-border: var(--color-utility-blue-200);
      --bd-c-fg: var(--color-utility-blue-700);
      --bd-c-accent: var(--color-utility-blue-500);
    }

    :host([color='indigo']) {
      --bd-c-bg: var(--color-utility-indigo-50);
      --bd-c-border: var(--color-utility-indigo-200);
      --bd-c-fg: var(--color-utility-indigo-700);
      --bd-c-accent: var(--color-utility-indigo-500);
    }

    :host([color='purple']) {
      --bd-c-bg: var(--color-utility-purple-50);
      --bd-c-border: var(--color-utility-purple-200);
      --bd-c-fg: var(--color-utility-purple-700);
      --bd-c-accent: var(--color-utility-purple-500);
    }

    :host([color='pink']) {
      --bd-c-bg: var(--color-utility-pink-50);
      --bd-c-border: var(--color-utility-pink-200);
      --bd-c-fg: var(--color-utility-pink-700);
      --bd-c-accent: var(--color-utility-pink-500);
    }

    :host([color='orange']) {
      --bd-c-bg: var(--color-utility-orange-50);
      --bd-c-border: var(--color-utility-orange-200);
      --bd-c-fg: var(--color-utility-orange-700);
      --bd-c-accent: var(--color-utility-orange-500);
    }

    .root {
      box-sizing: border-box;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: max-content;
      max-width: 100%;
      border-style: solid;
      border-width: 1px;
      font-family: var(--font-family-body);
      font-weight: var(--font-weight-medium);
      letter-spacing: var(--letter-spacing-none);
      white-space: nowrap;
    }

    /* ----- shape + chrome ----- */
    :host([variant='pill']) .root {
      border-radius: var(--radius-full);
    }

    :host([variant='badge']) .root {
      border-radius: var(--radius-sm);
    }

    :host([variant='modern']) .root {
      border-radius: var(--radius-sm);
      background: var(--color-bg-primary);
      border-color: var(--color-border-primary);
      color: var(--color-text-secondary-700);
      box-shadow: var(--shadow-button-xs);
    }

    :host([variant='pill']) .root,
    :host([variant='badge']) .root {
      background: var(--bd-c-bg);
      border-color: var(--bd-c-border);
      color: var(--bd-c-fg);
    }

    :host([variant='modern']) .label {
      color: var(--color-text-secondary-700);
    }

    :host([variant='modern']) .slot-icon {
      color: var(--bd-c-accent);
    }

    :host([variant='modern']) .slot-only {
      color: var(--bd-c-accent);
    }

    :host([variant='modern']) .close {
      color: var(--color-text-tertiary-600);
    }

    /* ----- typography ----- */
    :host([size='sm']) .root {
      padding: var(--spacing-xxs) var(--spacing-md);
      gap: 0;
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
    }

    :host([size='md']) .root {
      padding: var(--spacing-xxs) var(--spacing-10px);
      gap: 0;
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    :host([size='sm'][variant='badge']) .root {
      padding-left: var(--spacing-sm);
      padding-right: var(--spacing-sm);
    }

    :host([size='md'][variant='badge']) .root {
      padding-left: var(--spacing-md);
      padding-right: var(--spacing-md);
    }

    /* Figma “Badge modern”: tighter horizontal padding than pill/badge */
    :host([variant='modern'][size='sm']) .root {
      padding: var(--spacing-xxs) var(--spacing-sm);
    }

    :host([variant='modern'][size='md']) .root {
      padding: var(--spacing-xxs) var(--spacing-md);
    }

    /* ----- icon layouts ----- */
    :host([icon='dot']) .root {
      gap: var(--spacing-xs);
    }

    :host([icon='dot'][size='sm']) .root {
      padding-left: var(--spacing-sm);
      padding-right: var(--spacing-md);
    }

    :host([icon='dot'][size='md']) .root {
      padding-left: var(--spacing-md);
      padding-right: var(--spacing-10px);
    }

    :host([icon='close']) .root {
      gap: var(--spacing-xxs);
    }

    :host([icon='close'][size='sm']) .root {
      padding-left: var(--spacing-md);
      padding-right: var(--spacing-3px);
    }

    :host([icon='close'][size='md']) .root {
      padding-left: var(--spacing-10px);
      padding-right: var(--spacing-3px);
    }

    :host([icon='leading']) .root,
    :host([icon='trailing']) .root {
      gap: var(--spacing-xxs);
    }

    :host([icon='leading'][size='sm']) .root {
      padding-left: var(--spacing-sm);
      padding-right: var(--spacing-md);
    }

    :host([icon='leading'][size='md']) .root {
      padding-left: var(--spacing-md);
      padding-right: var(--spacing-lg);
    }

    :host([icon='trailing'][size='sm']) .root {
      padding-left: var(--spacing-md);
      padding-right: var(--spacing-sm);
    }

    :host([icon='trailing'][size='md']) .root {
      padding-left: var(--spacing-10px);
      padding-right: var(--spacing-md);
    }

    :host([icon='only'][size='sm']) .root {
      min-width: 22px;
      min-height: 22px;
      padding: var(--spacing-5px);
    }

    :host([icon='only'][size='md']) .root {
      min-width: 24px;
      min-height: 24px;
      padding: var(--spacing-sm);
    }

    .label,
    .slot-only,
    .slot-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .slot-icon ::slotted(*) {
      display: block;
    }

    .dot {
      flex-shrink: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--bd-c-accent);
    }

    .close {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: var(--spacing-xxs);
      border: none;
      border-radius: var(--radius-full);
      background: transparent;
      color: inherit;
      cursor: pointer;
      flex-shrink: 0;
    }

    .close:hover {
      opacity: 0.85;
    }

    .close:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 1px;
    }

    :host([variant='pill']) .close,
    :host([variant='badge']) .close {
      color: var(--bd-c-fg);
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-badge': BdBadge
  }
}
