import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const checkSvg = html`<svg
  width="12"
  height="12"
  viewBox="0 0 12 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M10 3L4.5 8.5L2 6"
    stroke="currentColor"
    stroke-width="1.67"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

let _itemId = 0

export type BdRadioGroupItemVariant = 'simple' | 'icon-card'
export type BdRadioGroupItemSize = 'sm' | 'md'

/**
 * Wraps **`bd-radio-group-item`** with `role="radiogroup"`. Set **`name`** on this element
 * and child items inherit it for native radio grouping (Figma **Radio group** · `1142:87213`).
 *
 * @slot - Radio group items (`bd-radio-group-item`).
 */
@customElement('bd-radio-group')
export class BdRadioGroup extends LitElement {
  @property({ reflect: true }) name = ''

  /** Accessible label for the group (sets `aria-label` on the radiogroup). */
  @property({ reflect: true }) label = ''

  render() {
    return html`
      <div
        class="root"
        role="radiogroup"
        aria-label=${this.label || nothing}
      >
        <slot></slot>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .root {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-lg);
    }
  `
}

/**
 * Card option for radio groups (Figma **Radio group item** `124:2838` + group `1142:87213`).
 *
 * - **`simple`** — compact row: radio + title / price hint + description (Type **Radio button**).
 * - **`icon-card`** — header (featured icon + title + square check) and body (display price, badge, text) (Type **Icon card**).
 *
 * Selected state uses **blue** (`--color-brand-ui-600`). Focus: `--color-focus-ring`.
 *
 * @slot title - (`simple`) Primary label beside the radio.
 * @slot meta - (`simple`) Inline hint (e.g. price per month).
 * @slot description - Supporting copy (`simple` or `icon-card` body).
 * @slot icon - (`icon-card`) Featured icon in the 32×32 tile.
 * @slot heading - (`icon-card`) Header title (overrides `heading` prop).
 * @slot badge - (`icon-card`) Replaces the default dot + label badge.
 *
 * @csspart card - Outer card container.
 * @csspart control - Visual radio circle or square check.
 *
 * @fires bd-change - `detail: { value: string; checked: boolean }` when this item becomes selected.
 */
@customElement('bd-radio-group-item')
export class BdRadioGroupItem extends LitElement {
  @property({ reflect: true }) variant: BdRadioGroupItemVariant = 'simple'

  @property({ reflect: true }) size: BdRadioGroupItemSize = 'sm'

  @property({ reflect: true }) name = ''

  @property({ reflect: true }) value = ''

  @property({ type: Boolean, reflect: true }) checked = false

  @property({ type: Boolean, reflect: true }) disabled = false

  /** `simple` — primary line. */
  @property({ reflect: true }) title = ''

  /** `simple` — inline secondary segment (e.g. `$10/month`). */
  @property({ reflect: true, attribute: 'title-hint' }) titleHint = ''

  /** Shared supporting line (`simple` and `icon-card`). */
  @property({ reflect: true }) description = ''

  /** `icon-card` — header title. */
  @property({ reflect: true }) heading = ''

  /** `icon-card` — large price string (e.g. `$10`). */
  @property({ reflect: true }) price = ''

  /** `icon-card` — period label (e.g. `per month`). */
  @property({ reflect: true }) period = ''

  /** `icon-card` — when set, shows the default “Limited time” style badge unless `slot="badge"` is used. */
  @property({ reflect: true }) badgeLabel = ''

  @property({ reflect: true, attribute: 'input-id' }) inputId = ''

  private readonly _fallbackId = `bd-rgi-${++_itemId}`

  private readonly _onDocChange = (e: Event) => {
    if (!this.name) return
    const radio = e
      .composedPath()
      .find((n): n is HTMLInputElement => n instanceof HTMLInputElement && n.type === 'radio')
    if (!radio || radio.name !== this.name) return
    const mine = this.renderRoot?.querySelector('input') as HTMLInputElement | null
    if (!mine) return
    if (mine.checked !== this.checked) {
      this.checked = mine.checked
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this._inheritGroupName()
    document.addEventListener('change', this._onDocChange)
  }

  disconnectedCallback() {
    document.removeEventListener('change', this._onDocChange)
    super.disconnectedCallback()
  }

  private _inheritGroupName() {
    const g = this.closest('bd-radio-group')
    const gn = g?.getAttribute('name')
    if (gn && !this.getAttribute('name')) {
      this.name = gn
    }
  }

  render() {
    return this.variant === 'icon-card' ? this._renderIconCard() : this._renderSimple()
  }

  private _renderSimple() {
    const id = this.inputId || this._fallbackId
    const titleId = `${id}-title`

    return html`
      <label class="card simple ${this.checked ? 'selected' : ''}" for=${id} part="card">
        <input
          id=${id}
          class="native"
          type="radio"
          name=${this.name}
          value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-labelledby=${titleId}
          @change=${this._onChange}
        />
        <span class="row">
          <span class="ctrl-wrap" aria-hidden="true">
            <span class="radio ${this.checked ? 'on' : ''}" part="control"></span>
          </span>
          <span class="copy">
            <span class="title-row" id=${titleId}>
              <span class="title"><slot name="title">${this.title}</slot></span>
              <span class="meta"><slot name="meta">${this.titleHint}</slot></span>
            </span>
            <span class="desc"><slot name="description">${this.description}</slot></span>
          </span>
        </span>
      </label>
    `
  }

  private _renderIconCard() {
    const id = this.inputId || this._fallbackId
    const headingId = `${id}-heading`

    return html`
      <label class="card icon-card ${this.checked ? 'selected' : ''}" for=${id} part="card">
        <input
          id=${id}
          class="native"
          type="radio"
          name=${this.name}
          value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-labelledby=${headingId}
          @change=${this._onChange}
        />
        <span class="header">
          <span class="header-main">
            <span class="featured-icon" aria-hidden="true">
              <slot name="icon"></slot>
            </span>
            <span class="heading" id=${headingId}>
              <slot name="heading">${this.heading}</slot>
            </span>
          </span>
          <span
            class="square ${this.checked ? 'on' : ''}"
            part="control"
            aria-hidden="true"
          >
            ${this.checked ? checkSvg : null}
          </span>
        </span>
        <span class="body">
          <span class="body-main">
            <span class="price-row">
              <span class="price">${this.price}</span>
              <span class="period">${this.period}</span>
            </span>
            <span class="body-desc"><slot name="description">${this.description}</slot></span>
          </span>
          <span class="badge-col">
            <slot name="badge">${this._badgeFallback()}</slot>
          </span>
        </span>
      </label>
    `
  }

  private _badgeFallback() {
    if (!this.badgeLabel) return null
    return html`
      <span class="badge">
        <span class="badge-dot" aria-hidden="true"></span>
        <span class="badge-text">${this.badgeLabel}</span>
      </span>
    `
  }

  private _onChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.checked = input.checked
    if (this.checked) {
      this.dispatchEvent(
        new CustomEvent('bd-change', {
          bubbles: true,
          composed: true,
          detail: { value: this.value, checked: true },
        }),
      )
    }
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: var(--font-family-body);
    }

    .native {
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

    /* ----- shared card chrome (2px border avoids layout shift) ----- */
    .card {
      position: relative;
      display: block;
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      cursor: pointer;
      border-radius: var(--radius-xl);
      background: var(--color-bg-primary);
      border: 2px solid var(--color-border-secondary);
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }

    .card:has(.native:disabled) {
      cursor: not-allowed;
      opacity: 0.65;
    }

    .card.selected {
      border-color: var(--color-brand-ui-600);
    }

    .card:has(.native:focus-visible) {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }

    /* ----- simple ----- */
    .simple .row {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-md);
      padding: var(--spacing-xl);
    }

    .simple .ctrl-wrap {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      padding-top: var(--spacing-xxs);
    }

    .simple .radio {
      position: relative;
      display: inline-block;
      flex-shrink: 0;
      box-sizing: border-box;
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-full);
      background: var(--color-bg-primary);
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }

    :host([size='sm']) .simple .radio {
      width: 16px;
      height: 16px;
    }

    :host([size='md']) .simple .radio {
      width: 20px;
      height: 20px;
    }

    .simple .radio.on {
      border-color: var(--color-brand-ui-600);
      background: var(--color-brand-ui-600);
    }

    .simple .radio.on::after {
      content: '';
      position: absolute;
      inset: 31.25%;
      border-radius: var(--radius-full);
      background: var(--color-base-white);
    }

    .card.simple:not(:has(.native:disabled)):hover .radio.on {
      border-color: var(--color-blue-dark-700);
      background: var(--color-blue-dark-700);
    }

    .card.simple:has(.native:disabled) .radio.on::after {
      background: var(--color-gray-light-mode-500);
    }

    .card.simple:has(.native:disabled) .radio:not(.on) {
      border-color: var(--color-border-primary);
      background: var(--color-gray-light-mode-50);
    }

    .card.simple:has(.native:disabled) .radio.on {
      border-color: var(--color-border-primary);
      background: var(--color-gray-light-mode-50);
    }

    .simple .copy {
      display: flex;
      min-width: 0;
      flex: 1 1 auto;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-xxs);
    }

    .simple .title-row {
      display: flex;
      flex-wrap: wrap;
      flex-shrink: 0;
      align-items: flex-start;
      gap: var(--spacing-xs);
      line-height: var(--line-height-text-sm);
      font-size: var(--font-size-text-sm);
    }

    :host([size='md']) .simple .title-row {
      line-height: var(--line-height-text-md);
      font-size: var(--font-size-text-md);
    }

    .simple .title {
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary-700);
    }

    .simple .meta {
      font-weight: var(--font-weight-regular);
      color: var(--color-text-tertiary-600);
    }

    .simple .desc {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-tertiary-600);
    }

    :host([size='md']) .simple .desc {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }

    /* ----- icon-card ----- */
    .icon-card .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-xs);
      padding: var(--spacing-lg) var(--spacing-2xl) var(--spacing-lg) var(--spacing-lg);
      border-bottom: 1px solid var(--color-border-secondary);
    }

    .icon-card .header-main {
      display: flex;
      min-width: 0;
      flex: 1 1 auto;
      align-items: center;
      gap: var(--spacing-lg);
    }

    .featured-icon {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-sm);
      background: var(--color-bg-primary);
      box-shadow: var(--shadow-button-xs), var(--shadow-button-skeuomorphic-inner);
    }

    .featured-icon ::slotted(svg) {
      width: 16px;
      height: 16px;
    }

    .icon-card .heading {
      flex: 1 1 auto;
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-secondary-700);
    }

    .icon-card .square {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 16px;
      height: 16px;
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-xs);
      background: var(--color-bg-primary);
      color: var(--color-base-white);
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }

    .icon-card .square.on {
      border-color: var(--color-brand-ui-600);
      background: var(--color-brand-ui-600);
    }

    .card.icon-card:not(:has(.native:disabled)):hover .square.on {
      border-color: var(--color-blue-dark-700);
      background: var(--color-blue-dark-700);
    }

    .card.icon-card:has(.native:disabled) .square {
      border-color: var(--color-border-primary);
      background: var(--color-gray-light-mode-50);
      color: var(--color-gray-light-mode-500);
    }

    .icon-card .body {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-xs);
      padding: var(--spacing-xl);
    }

    .body-main {
      display: flex;
      min-width: 0;
      flex: 1 1 auto;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-xs);
    }

    .price-row {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      gap: var(--spacing-xs);
    }

    .price {
      font-family: var(--font-family-display);
      font-size: var(--font-size-display-sm);
      line-height: var(--line-height-display-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-secondary-700);
    }

    .period {
      padding-bottom: 3px;
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-tertiary-600);
    }

    .body-desc {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-tertiary-600);
    }

    :host([size='md']) .body-desc {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }

    .badge-col {
      flex-shrink: 0;
    }

    .badge-col:empty {
      display: none;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-xxs) var(--spacing-sm);
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-sm);
      background: var(--color-bg-primary);
      box-shadow: var(--shadow-button-xs);
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      flex-shrink: 0;
      border-radius: var(--radius-full);
      background: var(--color-success-500);
    }

    .badge-text {
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary-700);
      white-space: nowrap;
    }
  `
}
