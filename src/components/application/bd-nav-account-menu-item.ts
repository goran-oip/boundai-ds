import type { PropertyValues } from 'lit'
import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type BdNavAccountMenuItemVariant = 'menu-item' | 'account'

/**
 * Figma **`Nav account card menu item`** (`7891:71338`) — **menu-item** (icon + label + shortcut) or **account** (avatar + lines + **`control`** slot).
 *
 * @slot icon - Leading icon (menu-item).
 * @slot - Label (menu-item); defaults to **`label`**.
 * @slot shortcut - Shortcut pill content; defaults to **`shortcutText`** when set.
 * @slot avatar - Avatar (account).
 * @slot label - Title (account); defaults to **`label`**.
 * @slot description - Subline (account); defaults to **`description`**.
 * @slot control - Trailing control (account), e.g. **`bd-radio`**.
 *
 * @csspart base - Outer wrapper.
 * @csspart row - Padded row.
 */
@customElement('bd-nav-account-menu-item')
export class BdNavAccountMenuItem extends LitElement {
  @property({ reflect: true }) variant: BdNavAccountMenuItemVariant = 'menu-item'

  @property({ type: Boolean, reflect: true }) current = false

  @property() label = ''

  @property() description = ''

  /** Shown inside the shortcut pill when **`shortcut`** slot is empty (menu-item). */
  @property({ attribute: 'shortcut-text' }) shortcutText = ''

  override connectedCallback() {
    super.connectedCallback()
    this._syncAriaCurrent()
  }

  override updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties)
    if (changedProperties.has('current')) {
      this._syncAriaCurrent()
    }
  }

  private _syncAriaCurrent() {
    if (this.current) {
      this.setAttribute('aria-current', 'true')
    } else {
      this.removeAttribute('aria-current')
    }
  }

  render() {
    if (this.variant === 'account') {
      return html`
        <div part="base" class="base">
          <div part="row" class="row row--account ${this.current ? 'is-current' : ''}">
            <div class="account-main">
              <slot name="avatar"></slot>
              <div class="text-stack">
                <span class="name"><slot name="label">${this.label}</slot></span>
                <span class="email"><slot name="description">${this.description}</slot></span>
              </div>
            </div>
            <div class="control"><slot name="control"></slot></div>
          </div>
        </div>
      `
    }

    return html`
      <div part="base" class="base">
        <div part="row" class="row row--menu ${this.current ? 'is-current' : ''}">
          <div class="menu-main">
            <span class="mi-icon"><slot name="icon"></slot></span>
            <span class="mi-label"><slot>${this.label}</slot></span>
          </div>
          <span class="kbd"><slot name="shortcut">${this.shortcutText}</slot></span>
        </div>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 15rem;
    }

    .base {
      box-sizing: border-box;
      padding: 0 var(--spacing-sm);
      width: 100%;
    }

    .row {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--spacing-lg);
      width: 100%;
      min-width: 0;
      border-radius: var(--radius-sm);
      transition: background-color 0.15s ease;
    }

    .row--menu {
      padding: var(--spacing-md);
    }

    .row--menu:hover,
    .row--menu.is-current {
      background: var(--color-bg-primary-hover);
    }

    .menu-main {
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      gap: var(--spacing-md);
      min-width: 0;
    }

    .mi-icon {
      display: inline-flex;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      line-height: 0;
      color: var(--color-text-secondary-700);
    }

    .mi-icon:empty {
      display: none;
    }

    .mi-label {
      flex: 1 1 auto;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-secondary-700);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :host([current]) .mi-label {
      color: var(--color-text-secondary-hover);
    }

    .kbd {
      flex-shrink: 0;
      padding: 1px var(--spacing-xs);
      border-radius: var(--radius-xs);
      border: 1px solid var(--color-border-secondary);
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-tertiary-600);
    }

    .kbd:empty {
      display: none;
    }

    .row--account {
      position: relative;
      align-items: flex-start;
      padding: var(--spacing-sm) var(--spacing-md);
    }

    .row--account:hover,
    .row--account.is-current {
      background: var(--color-bg-primary-hover);
    }

    .account-main {
      display: flex;
      flex: 1 1 auto;
      gap: var(--spacing-md);
      min-width: 0;
      align-items: center;
      padding-right: var(--spacing-4xl);
    }

    .text-stack {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      min-width: 0;
    }

    .name {
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary-900);
    }

    .email {
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-tertiary-600);
    }

    .control {
      position: absolute;
      top: var(--spacing-md);
      right: var(--spacing-md);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .control:empty {
      display: none;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-nav-account-menu-item': BdNavAccountMenuItem
  }
}
