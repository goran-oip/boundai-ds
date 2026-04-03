import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Figma **Buttons/Button** (brand · node 3287:427074) vs **Buttons/Button destructive** (node 6218:85578).
 *
 * Use `intent="destructive"` with `variant` **primary / secondary / tertiary** for error styling.
 * `variant="destructive"` is legacy — same as `intent="destructive"` + primary (filled `bg-error-solid`).
 *
 * `ghost` is an alias for tertiary (brand) or matches tertiary destructive rules when `intent="destructive"`.
 */
export type BdButtonIntent = 'brand' | 'destructive'
export type BdButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive'
export type BdButtonSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * For **icon-only** buttons, set **`label`** so the inner button gets a proper accessible name (slot content alone may not name the control).
 *
 * @slot - Button label content.
 * @slot prefix - Content before the label (alias: **`leading-icon`**).
 * @slot suffix - Content after the label (alias: **`trailing-icon`**).
 * @slot leading-icon - Leading icon or content (same position as `prefix`).
 * @slot trailing-icon - Trailing icon or content (same position as `suffix`).
 *
 * @csspart base - The inner `<button>` element.
 *
 * @fires bd-click - Dispatched on activation (mirrors native click but from the host).
 */
@customElement('bd-button')
export class BdButton extends LitElement {
  /**
   * `brand` — default blue/gray hierarchies.
   * `destructive` — error palette (use with `variant` primary / secondary / tertiary).
   */
  @property({ reflect: true }) intent: BdButtonIntent = 'brand'

  /** Visual hierarchy (Figma Primary / Secondary / Tertiary). Legacy: `destructive` = destructive primary fill. */
  @property({ reflect: true }) variant: BdButtonVariant = 'primary'

  /** Size: sm 36px, md 40px, lg 44px, xl 48px min-height (Figma sm/md/lg/xl). */
  @property({ reflect: true }) size: BdButtonSize = 'md'

  @property({ type: Boolean, reflect: true }) disabled = false

  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false

  /**
   * Accessible name for the inner `<button>` when the visible label is icon-only or missing.
   * Omit when default slot text supplies the name.
   */
  @property({ attribute: 'label' }) label = ''

  render() {
    return html`
      <button
        part="base"
        type="button"
        aria-label=${this.label || nothing}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot name="prefix"></slot>
        <slot name="leading-icon"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
        <slot name="trailing-icon"></slot>
      </button>
    `
  }

  private _handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('bd-click', { bubbles: true, composed: true }))
    }
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    :host([full-width]) {
      display: flex;
      width: 100%;
    }

    :host([full-width]) button {
      width: 100%;
    }

    button {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs);
      cursor: pointer;
      font-family: var(--font-family-body);
      font-weight: var(--font-weight-semibold);
      line-height: var(--line-height-text-sm);
      font-size: var(--font-size-text-sm);
      letter-spacing: var(--letter-spacing-none);
      border-radius: var(--radius-md);
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease,
        color 0.15s ease,
        box-shadow 0.15s ease;
      white-space: nowrap;
    }

    :host([size='sm']) button {
      min-height: 36px;
      padding: var(--spacing-sm) var(--spacing-lg);
    }

    :host([size='md']) button {
      min-height: 40px;
      padding: var(--spacing-10px) var(--spacing-14px);
    }

    :host([size='lg']) button {
      min-height: 44px;
      padding: var(--spacing-md) var(--spacing-xl);
    }

    :host([size='xl']) button {
      min-height: 48px;
      padding: var(--spacing-md) var(--spacing-2xl);
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }

    /* -------------------------------------------------------------------------
       Brand — Primary / Secondary / Tertiary / Ghost
       ------------------------------------------------------------------------- */
    :host([variant='primary']:not([intent='destructive'])) button {
      border-style: solid;
      color: var(--color-text-white);
      background: var(--color-utility-blue-600);
      border-width: 2px;
      border-color: rgba(255, 255, 255, 0.12);
      box-shadow: var(--shadow-button-xs), var(--shadow-button-skeuomorphic-inner);
    }

    :host([variant='primary']:not([intent='destructive'])) button:hover:not(:disabled) {
      background: var(--color-utility-blue-700);
    }

    @media (prefers-color-scheme: dark) {
      :host([variant='primary']:not([intent='destructive'])) button {
        background: var(--color-interactive-accent);
        border-color: rgba(255, 255, 255, 0.12);
      }
      :host([variant='primary']:not([intent='destructive'])) button:hover:not(:disabled) {
        background: var(--color-blue-dark-500);
      }
    }

    :host([variant='secondary']:not([intent='destructive'])) button {
      color: var(--color-text-secondary-700);
      background: var(--color-bg-primary);
      border-style: solid;
      border-width: 1px;
      border-color: var(--color-border-primary);
      box-shadow: var(--shadow-button-xs), var(--shadow-button-skeuomorphic-inner);
    }

    :host([variant='secondary']:not([intent='destructive'])) button:hover:not(:disabled) {
      color: var(--color-text-secondary-hover);
      background: var(--color-bg-primary-hover);
    }

    :host([variant='tertiary']:not([intent='destructive'])) button,
    :host([variant='ghost']:not([intent='destructive'])) button {
      color: var(--color-text-tertiary-600);
      background: transparent;
      border: 1px solid transparent;
      box-shadow: none;
    }

    :host([variant='tertiary']:not([intent='destructive'])) button:hover:not(:disabled),
    :host([variant='ghost']:not([intent='destructive'])) button:hover:not(:disabled) {
      color: var(--color-text-secondary-700);
      background: var(--color-bg-primary-hover);
    }

    /* -------------------------------------------------------------------------
       Destructive — Primary (filled) · legacy variant=destructive
       ------------------------------------------------------------------------- */
    :host([intent='destructive'][variant='primary']) button,
    :host([variant='destructive']) button {
      border-style: solid;
      color: var(--color-text-white);
      background: var(--color-bg-error-solid);
      border-width: 2px;
      border-color: rgba(255, 255, 255, 0.12);
      box-shadow: var(--shadow-button-xs), var(--shadow-button-skeuomorphic-inner);
    }

    :host([intent='destructive'][variant='primary']) button:hover:not(:disabled),
    :host([variant='destructive']) button:hover:not(:disabled) {
      background: var(--color-bg-error-solid-hover);
    }

    /* -------------------------------------------------------------------------
       Destructive — Secondary (outline + error border)
       ------------------------------------------------------------------------- */
    :host([intent='destructive'][variant='secondary']) button {
      color: var(--color-text-error-primary-600);
      background: var(--color-bg-primary);
      border-style: solid;
      border-width: 1px;
      border-color: var(--color-border-error-subtle);
      box-shadow: var(--shadow-button-xs), var(--shadow-button-skeuomorphic-inner);
    }

    :host([intent='destructive'][variant='secondary']) button:hover:not(:disabled) {
      color: var(--color-text-error-primary-hover);
      background: var(--color-bg-error-primary);
    }

    /* -------------------------------------------------------------------------
       Destructive — Tertiary / ghost
       ------------------------------------------------------------------------- */
    :host([intent='destructive'][variant='tertiary']) button,
    :host([intent='destructive'][variant='ghost']) button {
      color: var(--color-text-error-primary-600);
      background: transparent;
      border: 1px solid transparent;
      box-shadow: none;
    }

    :host([intent='destructive'][variant='tertiary']) button:hover:not(:disabled),
    :host([intent='destructive'][variant='ghost']) button:hover:not(:disabled) {
      color: var(--color-text-error-primary-hover);
      background: var(--color-bg-error-primary);
    }

    /* ---------- focus ---------- */
    button:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }

    :host([intent='destructive']) button:focus-visible,
    :host([variant='destructive']) button:focus-visible {
      outline-color: var(--color-bg-error-solid);
    }

    @media (prefers-color-scheme: dark) {
      :host([variant='secondary']:not([intent='destructive'])) button:focus-visible,
      :host([variant='tertiary']:not([intent='destructive'])) button:focus-visible,
      :host([variant='ghost']:not([intent='destructive'])) button:focus-visible {
        outline-color: var(--color-interactive-accent);
      }

      :host([intent='destructive'][variant='secondary']) button:focus-visible {
        outline-color: var(--color-error-400);
      }
    }

    /* ---------- disabled ---------- */
    :host([disabled]) {
      pointer-events: none;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    ::slotted([slot='prefix']),
    ::slotted([slot='leading-icon']),
    ::slotted([slot='suffix']),
    ::slotted([slot='trailing-icon']) {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-button': BdButton
  }
}
