import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

let _dropdownPanelId = 0

export type BdDropdownAlign = 'start' | 'end'

/**
 * Disclosure + anchored menu panel (Figma **Dropdown** · node `3281:383083`).
 * Focus ring uses design-system blue (`--color-focus-ring`).
 *
 * @slot trigger - Button, utility icon, avatar, etc. `aria-expanded` / `aria-controls` are synced when possible.
 * @slot - Menu content (`bd-dropdown-header`, `bd-dropdown-item`, `bd-dropdown-divider`, …).
 *
 * @csspart root - Outer wrapper.
 * @csspart trigger - Click target wrapping the trigger slot.
 * @csspart panel - Floating menu surface.
 *
 * @fires bd-open-change - `detail: { open: boolean }` when `open` toggles.
 */
@customElement('bd-dropdown')
export class BdDropdown extends LitElement {
  /** Whether the menu panel is visible. */
  @property({ type: Boolean, reflect: true }) open = false

  /** Horizontal alignment of the panel relative to the trigger (`end` for kebab / avatar triggers). */
  @property({ reflect: true }) align: BdDropdownAlign = 'start'

  /** Close when a `bd-dropdown-item` (or `[data-bd-dropdown-close]`) is activated. */
  @property({ type: Boolean, reflect: true, attribute: 'close-on-select' })
  closeOnSelect = true

  /**
   * `default` — fixed 248px menu width (Figma dropdowns).
   * `trigger` — panel matches host width (e.g. `bd-select`).
   */
  @property({ reflect: true, attribute: 'panel-width' })
  panelWidth: 'default' | 'trigger' = 'default'

  /** `menu` (default) or `listbox` for combobox-style selects. */
  @property({ reflect: true, attribute: 'panel-role' })
  panelRole: 'menu' | 'listbox' = 'menu'

  /** When false, no focus ring on the trigger wrapper (select uses inner control border). */
  @property({ type: Boolean, reflect: true, attribute: 'hide-trigger-ring' })
  hideTriggerRing = false

  private readonly _panelId = `bd-dropdown-panel-${++_dropdownPanelId}`

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('pointerdown', this._onDocPointerDown, true)
    document.addEventListener('keydown', this._onDocKeydown, true)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('pointerdown', this._onDocPointerDown, true)
    document.removeEventListener('keydown', this._onDocKeydown, true)
  }

  protected updated(changed: Map<PropertyKey, unknown>) {
    super.updated(changed)
    if (changed.has('open')) {
      this._syncTriggerAria()
      this.dispatchEvent(
        new CustomEvent('bd-open-change', {
          bubbles: true,
          composed: true,
          detail: { open: this.open },
        }),
      )
    }
  }

  private _syncTriggerAria() {
    const slot = this.renderRoot.querySelector('slot[name="trigger"]') as HTMLSlotElement | null
    const el = slot?.assignedElements({ flatten: true })[0] as HTMLElement | undefined
    if (!el) return
    el.setAttribute('aria-expanded', String(this.open))
    el.setAttribute('aria-haspopup', this.panelRole === 'listbox' ? 'listbox' : 'true')
    el.setAttribute('aria-controls', this._panelId)
  }

  private _onDocPointerDown = (e: PointerEvent) => {
    if (!this.open) return
    if (e.composedPath().includes(this)) return
    this.open = false
  }

  private _onDocKeydown = (e: KeyboardEvent) => {
    if (!this.open) return
    if (e.key === 'Escape') {
      e.preventDefault()
      this.open = false
      const slot = this.renderRoot.querySelector('slot[name="trigger"]') as HTMLSlotElement | null
      const el = slot?.assignedElements({ flatten: true })[0] as HTMLElement | undefined
      el?.focus?.()
    }
  }

  private _toggleTrigger() {
    this.open = !this.open
  }

  private _onTriggerSlotChange() {
    this._syncTriggerAria()
  }

  private _onPanelClick(e: Event) {
    if (!this.closeOnSelect) return
    const path = e.composedPath()
    for (const node of path) {
      if (node === this) break
      if (node instanceof HTMLElement) {
        if (
          node.tagName === 'BD-DROPDOWN-ITEM' ||
          node.tagName === 'BD-SELECT-OPTION' ||
          node.hasAttribute('data-bd-dropdown-close')
        ) {
          this.open = false
          return
        }
      }
    }
  }

  render() {
    return html`
      <div class="root" part="root">
        <div
          class="trigger"
          part="trigger"
          @click=${this._toggleTrigger}
        >
          <slot name="trigger" @slotchange=${this._onTriggerSlotChange}></slot>
        </div>
        <div
          id=${this._panelId}
          class="panel"
          part="panel"
          role=${this.panelRole}
          ?hidden=${!this.open}
          @click=${this._onPanelClick}
        >
          <slot></slot>
        </div>
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
      vertical-align: middle;
    }

    .root {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .trigger {
      display: inline-flex;
      align-items: center;
      justify-content: inherit;
      max-width: 100%;
      border-radius: var(--radius-sm);
      cursor: pointer;
      box-sizing: border-box;
      transition: outline-color 0.15s ease;
    }

    :host([open]:not([hide-trigger-ring])) .trigger {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }

    :host([hide-trigger-ring]) .trigger {
      outline: none;
    }

    .panel {
      position: absolute;
      top: calc(100% + var(--spacing-xs));
      z-index: 1000;
      box-sizing: border-box;
      width: 248px;
      min-width: 248px;
      max-width: min(248px, 100vw);
      padding: var(--spacing-xs) 0;
      border: 1px solid var(--color-border-secondary);
      border-radius: var(--radius-md);
      background: var(--color-bg-primary);
      box-shadow: var(--shadow-dropdown-panel);
    }

    :host([panel-width='trigger']) .panel {
      width: 100%;
      min-width: 100%;
      max-width: none;
    }

    :host([align='start']) .panel {
      left: 0;
      right: auto;
    }

    :host([align='end']) .panel {
      left: auto;
      right: 0;
    }

    .panel[hidden] {
      display: none !important;
    }
  `
}

/**
 * @slot - Primary label (semibold).
 * @slot prefix - Leading icon (16px).
 * @slot shortcut - Trailing shortcut (e.g. `⌘K`); styled as a compact chip.
 *
 * @csspart base - The inner `<button>`.
 *
 * @fires bd-click - Dispatched on activation (mirrors native click).
 */
@customElement('bd-dropdown-item')
export class BdDropdownItem extends LitElement {
  @property({ type: Boolean, reflect: true }) disabled = false

  render() {
    return html`
      <button
        part="base"
        type="button"
        role="menuitem"
        ?disabled=${this.disabled}
        @click=${this._emit}
      >
        <span class="prefix"><slot name="prefix"></slot></span>
        <span class="label"><slot></slot></span>
        <span class="shortcut"><slot name="shortcut"></slot></span>
      </button>
    `
  }

  private _emit(e: Event) {
    if (this.disabled) {
      e.stopPropagation()
      return
    }
    this.dispatchEvent(new CustomEvent('bd-click', { bubbles: true, composed: true }))
  }

  static styles = css`
    :host {
      display: block;
    }

    button {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      box-sizing: border-box;
      width: 100%;
      min-height: 40px;
      margin: 0;
      padding: var(--spacing-sm) var(--spacing-xl);
      border: none;
      border-radius: var(--radius-sm);
      background: transparent;
      font-family: inherit;
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-default);
      text-align: left;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    button:hover:not(:disabled),
    button:focus-visible:not(:disabled) {
      outline: 2px solid transparent;
      outline-offset: 2px;
      background: var(--color-bg-primary-hover);
    }

    button:focus-visible:not(:disabled) {
      outline-color: var(--color-focus-ring);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .prefix {
      display: inline-flex;
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      align-items: center;
      justify-content: center;
      color: var(--color-gray-light-mode-700);
    }

    .prefix:empty {
      display: none;
    }

    .label {
      flex: 1 1 auto;
      min-width: 0;
    }

    .shortcut {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      margin-left: auto;
    }

    .shortcut:empty {
      display: none;
    }

    ::slotted([slot='shortcut']) {
      display: inline-flex;
      align-items: center;
      padding: var(--spacing-xxs) var(--spacing-sm);
      border: 1px solid var(--color-border-secondary);
      border-radius: var(--radius-xs);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-muted);
    }
  `
}

/**
 * Horizontal rule between menu sections (Figma dropdown dividers).
 */
@customElement('bd-dropdown-divider')
export class BdDropdownDivider extends LitElement {
  render() {
    return html`<div class="rule" role="separator" aria-orientation="horizontal"></div>`
  }

  static styles = css`
    :host {
      display: block;
    }

    .rule {
      height: 1px;
      margin: var(--spacing-xs) var(--spacing-xl);
      background: var(--color-border-secondary);
    }
  `
}

/**
 * User block at the top of a menu (avatar + name + email; Figma node `3281:383083`).
 *
 * @slot media - Avatar or media (e.g. 40×40 with optional status dot).
 * @slot title - Primary line (e.g. name).
 * @slot subtitle - Secondary line (e.g. email, tertiary).
 */
@customElement('bd-dropdown-header')
export class BdDropdownHeader extends LitElement {
  render() {
    return html`
      <div class="header" part="root">
        <div class="media"><slot name="media"></slot></div>
        <div class="meta">
          <div class="title"><slot name="title"></slot></div>
          <div class="subtitle"><slot name="subtitle"></slot></div>
        </div>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
    }

    .header {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-md);
      padding: var(--spacing-lg) var(--spacing-xl);
    }

    .media {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .media:empty {
      display: none;
    }

    .meta {
      display: flex;
      min-width: 0;
      flex: 1 1 auto;
      flex-direction: column;
      gap: 0;
    }

    .title {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-default);
    }

    .subtitle {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-muted);
    }

    .title:empty,
    .subtitle:empty {
      display: none;
    }
  `
}
