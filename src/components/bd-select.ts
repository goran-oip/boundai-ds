import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import './bd-dropdown.js'

export type BdSelectSize = 'sm' | 'md'
export type BdSelectVariant = 'default' | 'search'

const chevronDownSvg = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M5 7.5L10 12.5L15 7.5"
    stroke="currentColor"
    stroke-width="1.67"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const searchSvg = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M17.5 17.5l-3.625-3.625M15.833 9.167a6.667 6.667 0 11-13.333 0 6.667 6.667 0 0113.333 0z"
    stroke="currentColor"
    stroke-width="1.67"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const helpSvg = html`<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M8 14A6 6 0 108 2a6 6 0 000 12z"
    stroke="currentColor"
    stroke-width="1.33"
  />
  <path
    d="M8 11.333V8"
    stroke="currentColor"
    stroke-width="1.33"
    stroke-linecap="round"
  />
  <path
    d="M8 5.333h.007"
    stroke="currentColor"
    stroke-width="1.33"
    stroke-linecap="round"
  />
</svg>`

const checkSvg = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M16.667 5L7.5 14.167 3.333 10"
    stroke="currentColor"
    stroke-width="1.67"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

/**
 * Select option row (Figma **Select menu item** · node `3281:380050`).
 *
 * @slot - Primary label (e.g. full name).
 * @slot supporting - Secondary text (e.g. `@handle`).
 *
 * @csspart base - The inner `<button>`.
 *
 * @fires bd-option-select - `detail: { value: string }` when chosen (bubbles).
 */
@customElement('bd-select-option')
export class BdSelectOption extends LitElement {
  @property({ reflect: true }) value = ''

  @property({ type: Boolean, reflect: true }) selected = false

  @property({ type: Boolean, reflect: true }) disabled = false

  render() {
    return html`
      <button
        part="base"
        type="button"
        role="option"
        aria-selected=${this.selected ? 'true' : 'false'}
        ?disabled=${this.disabled}
        class=${this.selected ? 'row selected' : 'row'}
        @click=${this._emit}
      >
        <span class="texts">
          <span class="primary"><slot></slot></span>
          <span class="supporting"><slot name="supporting"></slot></span>
        </span>
        <span class="check">${checkSvg}</span>
      </button>
    `
  }

  private _emit(e: Event) {
    if (this.disabled) {
      e.stopPropagation()
      return
    }
    this.dispatchEvent(
      new CustomEvent('bd-option-select', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      }),
    )
  }

  static styles = css`
    :host {
      display: block;
    }

    .row {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: var(--spacing-10px) var(--spacing-10px) var(--spacing-10px) var(--spacing-md);
      border: none;
      border-radius: var(--spacing-sm);
      background: transparent;
      font-family: inherit;
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-default);
      text-align: left;
      cursor: pointer;
      transition: background-color 0.12s ease;
    }

    .row:hover:not(:disabled) {
      background: var(--color-bg-primary-hover);
    }

    .row:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }

    .row:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .row.selected {
      background: var(--color-gray-light-mode-50);
    }

    .texts {
      display: flex;
      flex: 1 1 auto;
      min-width: 0;
      align-items: center;
      gap: var(--spacing-md);
    }

    .primary {
      flex: 0 1 auto;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .supporting {
      flex: 0 1 auto;
      font-weight: var(--font-weight-regular);
      color: var(--color-text-muted);
      white-space: nowrap;
    }

    .supporting:empty {
      display: none;
    }

    .check {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: var(--color-interactive-accent);
      opacity: 0;
    }

    .row.selected .check {
      opacity: 1;
    }
  `
}

/**
 * Form-style select / combobox (Figma **Select** · node `3281:377673`).
 * Focus and open states use blue (`--color-interactive-accent`).
 * Compose with **`bd-select-option`** in the default slot; pairs with **`bd-dropdown`** for the panel.
 *
 * @slot - `bd-select-option` elements.
 * @slot label - Overrides the `label` string.
 * @slot hint - Overrides the `hint` string.
 * @slot help - Replaces the default help icon after the label.
 * @slot leading - Leading content in the control (avatar, dot, icon). Search variant shows a search icon when empty.
 * @slot shortcut - Trailing shortcut chip (search variant); e.g. `⌘K`.
 *
 * @csspart field - Vertical stack (label + control + hint).
 * @csspart control - The trigger `<button>`.
 *
 * @fires bd-change - `detail: { value: string }` when the value changes.
 */
@customElement('bd-select')
export class BdSelect extends LitElement {
  @property({ reflect: true }) size: BdSelectSize = 'md'

  @property({ reflect: true }) variant: BdSelectVariant = 'default'

  @property({ reflect: true }) label = ''

  @property({ reflect: true }) hint = ''

  @property({ reflect: true }) placeholder = ''

  /** Selected option `value`. */
  @property({ reflect: true }) value = ''

  @property({ type: Boolean, reflect: true }) required = false

  @property({ type: Boolean, reflect: true }) disabled = false

  /** Show the default help icon slot (after required asterisk). */
  @property({ type: Boolean, reflect: true, attribute: 'show-help' })
  showHelp = false

  @state() private _open = false

  @state() private _primary = ''

  @state() private _supporting = ''

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('bd-option-select', this._onOptionSelect as EventListener)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('bd-option-select', this._onOptionSelect as EventListener)
  }

  protected willUpdate(changed: Map<PropertyKey, unknown>) {
    super.willUpdate(changed)
    if (changed.has('value')) {
      this._syncSelectedFromValue()
    }
  }

  firstUpdated() {
    this._syncSelectedFromValue()
  }

  private _syncSelectedFromValue() {
    const opts = this.querySelectorAll('bd-select-option')
    opts.forEach((el) => {
      const o = el as BdSelectOption
      o.selected = this.value !== '' && o.value === this.value
    })
    const cur = [...opts].find((o) => (o as BdSelectOption).value === this.value) as
      | BdSelectOption
      | undefined
    if (cur) {
      const parts = readOptionParts(cur)
      this._primary = parts.primary
      this._supporting = parts.supporting
    } else if (!this.value) {
      this._primary = ''
      this._supporting = ''
    }
  }

  private _onOptionSelect = (e: Event) => {
    e.stopPropagation()
    const ev = e as CustomEvent<{ value: string }>
    const val = ev.detail?.value ?? ''
    this.value = val
    const opt = e.target as BdSelectOption
    const parts = readOptionParts(opt)
    this._primary = parts.primary
    this._supporting = parts.supporting
    this._open = false
    this.dispatchEvent(
      new CustomEvent('bd-change', {
        bubbles: true,
        composed: true,
        detail: { value: val },
      }),
    )
  }

  private _onOpenChange(e: CustomEvent<{ open: boolean }>) {
    this._open = e.detail.open
  }

  private _onControlClick(e: Event) {
    if (this.disabled) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  render() {
    const hasValue = this.value !== '' && this._primary !== ''
    const showChevron = this.variant === 'default'

    return html`
      <div class="field" part="field">
        <div class="label-row">
          <span class="label-slot"><slot name="label">${this.label}</slot></span>
          ${this.required ? html`<span class="required" aria-hidden="true">*</span>` : null}
          ${
            this.showHelp
              ? html`<span class="help-slot"><slot name="help">${helpSvg}</slot></span>`
              : null
          }
        </div>
        <bd-dropdown
          class="drop"
          align="start"
          panel-width="trigger"
          panel-role="listbox"
          hide-trigger-ring
          .open=${this._open}
          @bd-open-change=${this._onOpenChange}
        >
          <button
            slot="trigger"
            part="control"
            type="button"
            role="combobox"
            aria-expanded=${this._open ? 'true' : 'false'}
            ?disabled=${this.disabled}
            class="control ${this.size} ${this.variant} ${this._open ? 'open' : ''}"
            @click=${this._onControlClick}
          >
            ${
              this.variant === 'search'
                ? html`<span class="lead"
                  ><slot name="leading">${searchSvg}</slot></span
                >`
                : html`<span class="lead"><slot name="leading"></slot></span>`
            }
            <span class="value-wrap">
              ${
                hasValue
                  ? html`<span class="primary">${this._primary}</span
                    >${
                      this._supporting
                        ? html`<span class="supporting">${this._supporting}</span>`
                        : null
                    }`
                  : html`<span class="placeholder">${this.placeholder}</span>`
              }
            </span>
            ${
              this.variant === 'search'
                ? html`<span class="shortcut-wrap"><slot name="shortcut"></slot></span>`
                : null
            }
            ${showChevron ? html`<span class="chev">${chevronDownSvg}</span>` : null}
          </button>
          <slot @slotchange=${this._onOptionsSlotChange}></slot>
        </bd-dropdown>
        <p class="hint"><slot name="hint">${this.hint}</slot></p>
      </div>
    `
  }

  private _onOptionsSlotChange() {
    this._syncSelectedFromValue()
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 320px;
      font-family: var(--font-family-body);
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      align-items: stretch;
    }

    .label-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-xxs);
    }

    .label-slot {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary-700);
    }

    .label-slot:empty {
      display: none;
    }

    .required {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-brand-tertiary-600);
    }

    .help-slot {
      display: inline-flex;
      color: var(--color-gray-light-mode-500);
      line-height: 0;
    }

    .help-slot:empty {
      display: none;
    }

    .drop {
      display: block;
      width: 100%;
    }

    .control {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      align-items: center;
      gap: var(--spacing-md);
      margin: 0;
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-md);
      background: var(--color-bg-primary);
      color: var(--color-text-default);
      text-align: left;
      cursor: pointer;
      box-shadow: var(--shadow-button-xs);
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }

    .control:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .control.md {
      min-height: 44px;
      padding: var(--spacing-10px) var(--spacing-14px);
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }

    .control.sm {
      min-height: 40px;
      padding: var(--spacing-md) var(--spacing-lg);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    .control:focus-visible:not(:disabled) {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }

    .control.md:focus-visible:not(:disabled),
    .control.md.open:not(:disabled) {
      border: 2px solid var(--color-interactive-accent);
      padding: var(--spacing-9px) var(--spacing-13px);
    }

    .control.sm:focus-visible:not(:disabled),
    .control.sm.open:not(:disabled) {
      border: 2px solid var(--color-interactive-accent);
      padding: var(--spacing-7px) var(--spacing-11px);
    }

    .lead {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: var(--color-gray-light-mode-500);
    }

    .lead:empty {
      display: none;
    }

    :host(:not([variant='search'])) .lead:empty {
      display: none;
      width: 0;
    }

    .value-wrap {
      display: flex;
      flex: 1 1 auto;
      min-width: 0;
      align-items: center;
      gap: var(--spacing-md);
    }

    .primary {
      flex: 0 1 auto;
      font-weight: var(--font-weight-medium);
      color: var(--color-text-default);
    }

    .supporting {
      flex: 0 1 auto;
      font-weight: var(--font-weight-regular);
      color: var(--color-text-muted);
    }

    .placeholder {
      flex: 1 1 auto;
      font-weight: var(--font-weight-medium);
      color: var(--color-text-muted);
    }

    .chev {
      display: inline-flex;
      flex-shrink: 0;
      color: var(--color-gray-light-mode-500);
      line-height: 0;
    }

    .shortcut-wrap {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      padding: var(--spacing-1px) var(--spacing-xs);
      border: 1px solid var(--color-border-secondary);
      border-radius: var(--radius-xs);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
      font-weight: var(--font-weight-medium);
      color: var(--color-gray-light-mode-500);
    }

    .shortcut-wrap:empty {
      display: none;
    }

    .hint {
      margin: 0;
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-muted);
    }

    .hint:empty {
      display: none;
    }
  `
}

function readOptionParts(el: BdSelectOption): { primary: string; supporting: string } {
  const supEl = el.querySelector(':scope > [slot="supporting"]')
  const supporting = supEl?.textContent?.trim() ?? ''
  const primaryParts: string[] = []
  el.childNodes.forEach((node) => {
    if (node instanceof Element && node.getAttribute('slot') === 'supporting') return
    const t = node.textContent?.trim()
    if (t) primaryParts.push(t)
  })
  return { primary: primaryParts.join(' ').trim(), supporting }
}
