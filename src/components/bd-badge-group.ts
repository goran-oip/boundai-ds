import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const arrowRightSvg = html`
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M6 12l4-4-4-4"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`

/**
 * Figma **Badge group** · frame `1046:8088` — announcement / inline alert with a nested badge and message.
 * Distinct from **`bd-button-group`** (segmented controls); compose with **`bd-badge`** only by reusing the same tokens.
 */
export type BdBadgeGroupLayout = 'leading' | 'trailing'
/** `pill` — tinted pill shell (Figma “Pill color”) · `modern` — neutral shell + dot badge (Figma “Badge modern”). */
export type BdBadgeGroupVariant = 'pill' | 'modern'
export type BdBadgeGroupSize = 'md' | 'lg'
export type BdBadgeGroupColor = 'gray' | 'brand' | 'error' | 'warning' | 'success'

@customElement('bd-badge-group')
export class BdBadgeGroup extends LitElement {
  /** `leading` — badge + message row · `trailing` — message + CTA badge (arrow inside badge when `icon`). */
  @property({ reflect: true }) layout: BdBadgeGroupLayout = 'leading'

  @property({ reflect: true }) variant: BdBadgeGroupVariant = 'pill'

  @property({ reflect: true }) size: BdBadgeGroupSize = 'md'

  @property({ reflect: true }) color: BdBadgeGroupColor = 'gray'

  /** Show chevron: content row (`leading`) or inside trailing CTA (`trailing`). */
  @property({ type: Boolean, reflect: true }) icon = true

  /** Whole bar is a `<button>` and emits **`bd-click`**. */
  @property({ type: Boolean, reflect: true }) clickable = false

  /** When `clickable`, optional accessible name (else derive from slots in consuming app). */
  @property({ attribute: 'label' }) label = ''

  render() {
    const shell = this.clickable ? this._buttonShell() : this._divShell()
    return shell
  }

  private _divShell() {
    return html`<div part="base" class="root">${this._inner()}</div>`
  }

  private _buttonShell() {
    return html`
      <button
        part="base"
        type="button"
        class="root root--button"
        aria-label=${this.label || nothing}
        @click=${this._emitClick}
      >
        ${this._inner()}
      </button>
    `
  }

  private _emitClick() {
    this.dispatchEvent(new CustomEvent('bd-click', { bubbles: true, composed: true }))
  }

  private _inner() {
    const isLeading = this.layout === 'leading'
    const isModern = this.variant === 'modern'
    const innerBadge = isModern ? this._innerModernBadge() : this._innerPillBadge()
    const msg = html`<span class="message" part="message"><slot></slot></span>`
    /* Trailing layout: arrow only inside the CTA badge (Figma); leading puts 16px arrow in the message row. */
    const arrow16 = this.icon && isLeading ? this._arrow(16) : nothing
    const row = html`<div class="content" part="content">${msg}${arrow16}</div>`

    if (isLeading) {
      return html`${innerBadge}${row}`
    }

    return html`${row}${this._innerTrailingBadge()}`
  }

  private _innerPillBadge() {
    return html`
      <span class="inner-pill" part="inner-badge">
        <span class="inner-pill__text"><slot name="badge"></slot></span>
      </span>
    `
  }

  private _innerModernBadge() {
    return html`
      <span class="inner-modern" part="inner-badge">
        <span class="inner-modern__dot" aria-hidden="true"></span>
        <span class="inner-modern__text"><slot name="badge"></slot></span>
      </span>
    `
  }

  private _innerTrailingBadge() {
    const isModern = this.variant === 'modern'
    if (isModern) {
      return html`
        <span class="inner-trail-modern" part="inner-badge">
          <span class="inner-modern__dot" aria-hidden="true"></span>
          <span class="inner-modern__text"><slot name="badge"></slot></span>
          ${this.icon ? this._arrow(12) : nothing}
        </span>
      `
    }
    return html`
      <span class="inner-trail-pill" part="inner-badge">
        <span class="inner-trail-pill__text"><slot name="badge"></slot></span>
        ${this.icon ? this._arrow(12) : nothing}
      </span>
    `
  }

  private _arrow(px: 12 | 16) {
    const cls = px === 12 ? 'arrow arrow--12' : 'arrow arrow--16'
    return html`<span class=${cls} part="arrow">${arrowRightSvg}</span>`
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
      --bdg-bg: var(--color-utility-gray-50);
      --bdg-border: var(--color-utility-gray-200);
      --bdg-fg: var(--color-utility-gray-700);
      --bdg-bg-hover: var(--color-utility-gray-100);
      --bdg-accent: var(--color-utility-gray-500);
    }

    :host([color='brand']) {
      --bdg-bg: var(--color-utility-blue-dark-50);
      --bdg-border: var(--color-utility-blue-dark-200);
      --bdg-fg: var(--color-utility-blue-dark-700);
      --bdg-bg-hover: var(--color-utility-blue-dark-100);
      --bdg-accent: var(--color-utility-blue-dark-500);
    }

    :host([color='gray']) {
      --bdg-bg: var(--color-utility-gray-50);
      --bdg-border: var(--color-utility-gray-200);
      --bdg-fg: var(--color-utility-gray-700);
      --bdg-bg-hover: var(--color-utility-gray-100);
      --bdg-accent: var(--color-utility-gray-500);
    }

    :host([color='error']) {
      --bdg-bg: var(--color-utility-error-50);
      --bdg-border: var(--color-utility-error-200);
      --bdg-fg: var(--color-utility-error-700);
      --bdg-bg-hover: var(--color-utility-error-100);
      --bdg-accent: var(--color-utility-error-500);
    }

    :host([color='warning']) {
      --bdg-bg: var(--color-utility-warning-50);
      --bdg-border: var(--color-utility-warning-200);
      --bdg-fg: var(--color-utility-warning-700);
      --bdg-bg-hover: var(--color-utility-warning-100);
      --bdg-accent: var(--color-utility-warning-500);
    }

    :host([color='success']) {
      --bdg-bg: var(--color-utility-success-50);
      --bdg-border: var(--color-utility-success-200);
      --bdg-fg: var(--color-utility-success-700);
      --bdg-bg-hover: var(--color-utility-success-100);
      --bdg-accent: var(--color-utility-success-500);
    }

    .root {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-md);
      width: max-content;
      max-width: 100%;
      font-family: var(--font-family-body);
      font-weight: var(--font-weight-medium);
      letter-spacing: var(--letter-spacing-none);
    }

    .root--button {
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      font: inherit;
      color: inherit;
      cursor: pointer;
      text-align: left;
    }

    .root--button:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }

    /* ----- Pill color (tinted capsule) ----- */
    :host([variant='pill']) .root {
      border: 1px solid var(--bdg-border);
      border-radius: var(--radius-full);
      background: var(--bdg-bg);
      color: var(--bdg-fg);
    }

    :host([variant='pill']:hover) .root,
    :host([variant='pill']:hover) .root--button {
      background: var(--bdg-bg-hover);
    }

    :host([layout='leading'][variant='pill']) .root {
      padding: var(--spacing-xs) var(--spacing-md) var(--spacing-xs) var(--spacing-xs);
    }

    :host([layout='trailing'][variant='pill']) .root {
      padding: var(--spacing-xs) var(--spacing-xs) var(--spacing-xs) var(--spacing-lg);
    }

    :host([variant='pill']) .inner-pill {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border-radius: var(--radius-full);
      border: 1px solid var(--bdg-border);
      background: var(--color-bg-primary);
      color: var(--bdg-fg);
    }

    :host([size='md'][variant='pill']) .inner-pill {
      padding: var(--spacing-xxs) var(--spacing-md);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
    }

    :host([size='lg'][variant='pill']) .inner-pill {
      padding: var(--spacing-xxs) var(--spacing-10px);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    :host([variant='pill']) .inner-trail-pill {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xxs);
      flex-shrink: 0;
      border-radius: var(--radius-full);
      border: 1px solid var(--bdg-border);
      background: var(--color-bg-primary);
      color: var(--bdg-fg);
    }

    :host([size='md'][variant='pill']) .inner-trail-pill {
      padding: var(--spacing-xxs) var(--spacing-sm) var(--spacing-xxs) var(--spacing-md);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
    }

    :host([size='lg'][variant='pill']) .inner-trail-pill {
      padding: var(--spacing-xxs) var(--spacing-sm) var(--spacing-xxs) var(--spacing-md);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    /* ----- Badge modern (neutral shell, radius 10px in Figma) ----- */
    :host([variant='modern']) .root {
      border: 1px solid var(--color-border-primary);
      border-radius: 10px;
      background: var(--color-bg-primary);
      color: var(--color-text-secondary-700);
      box-shadow: var(--shadow-button-xs);
    }

    :host([variant='modern']:hover) .root,
    :host([variant='modern']:hover) .root--button {
      background: var(--color-bg-primary-hover);
    }

    :host([layout='leading'][variant='modern']) .root {
      padding: var(--spacing-xs) var(--spacing-md) var(--spacing-xs) var(--spacing-xs);
    }

    :host([layout='trailing'][variant='modern']) .root {
      padding: var(--spacing-xs) var(--spacing-xs) var(--spacing-xs) var(--spacing-lg);
    }

    :host([variant='modern']) .inner-modern,
    :host([variant='modern']) .inner-trail-modern {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
      flex-shrink: 0;
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border-primary);
      background: var(--color-bg-primary);
      color: var(--color-text-secondary-700);
      box-shadow: var(--shadow-button-xs);
    }

    :host([size='md'][variant='modern']) .inner-modern,
    :host([size='md'][variant='modern']) .inner-trail-modern {
      padding: var(--spacing-xxs) var(--spacing-sm);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
    }

    :host([size='lg'][variant='modern']) .inner-modern,
    :host([size='lg'][variant='modern']) .inner-trail-modern {
      padding: var(--spacing-xxs) var(--spacing-sm);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    :host([variant='modern']) .inner-modern__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--bdg-accent);
      flex-shrink: 0;
    }

    :host([variant='modern']) .inner-trail-modern {
      gap: var(--spacing-xxs);
    }

    /* ----- Message row ----- */
    .content {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
      min-width: 0;
    }

    :host([size='md']) .message,
    :host([size='md']) .content {
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
    }

    :host([size='lg']) .message,
    :host([size='lg']) .content {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    :host([variant='pill']) .message {
      color: var(--bdg-fg);
    }

    .message {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .arrow {
      flex-shrink: 0;
      display: inline-flex;
      color: currentColor;
    }

    .arrow--12 {
      width: 12px;
      height: 12px;
    }

    .arrow--16 {
      width: 16px;
      height: 16px;
    }

    .arrow svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    :host([variant='modern']) .message,
    :host([variant='modern']) .content {
      color: var(--color-text-secondary-700);
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-badge-group': BdBadgeGroup
  }
}
