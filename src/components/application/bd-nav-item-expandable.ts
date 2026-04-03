import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Figma **`Nav item dropdown base`** (`1152:90366`) — parent row + optional nested **`subnav`** (indented **`spacing-5xl`**).
 *
 * @slot - Parent label (defaults to **`label`**).
 * @slot icon - Leading icon (~20×20px).
 * @slot subnav - Nested links / rows (shown when **`open`** is true).
 *
 * @csspart root - Column wrapper.
 * @csspart trigger - Parent `<button>`.
 * @csspart chevron - Trailing chevron (rotates when open).
 * @csspart subnav - Sub-navigation container.
 */
@customElement('bd-nav-item-expandable')
export class BdNavItemExpandable extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false

  @property({ type: Boolean, reflect: true }) current = false

  @property() label = ''

  render() {
    return html`
      <div part="root" class="root">
        <button
          part="trigger"
          type="button"
          class="trigger"
          aria-expanded=${this.open ? 'true' : 'false'}
          @click=${this._toggle}
        >
          <span class="row ${this.current ? 'is-current' : ''}">
            <span class="main">
              <span class="icon"><slot name="icon"></slot></span>
              <span class="label"><slot>${this.label}</slot></span>
            </span>
            <span class="chev-wrap" part="chevron">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="chev">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </span>
        </button>
        ${
          this.open
            ? html`<div part="subnav" class="subnav"><slot name="subnav"></slot></div>`
            : nothing
        }
      </div>
    `
  }

  private _toggle() {
    this.open = !this.open
    this.dispatchEvent(
      new CustomEvent('bd-toggle', {
        bubbles: true,
        composed: true,
        detail: { open: this.open },
      }),
    )
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 17rem;
    }

    .root {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: 100%;
    }

    .trigger {
      margin: 0;
      padding: var(--spacing-xxs) 0;
      border: none;
      background: none;
      font: inherit;
      color: inherit;
      cursor: pointer;
      width: 100%;
      border-radius: var(--radius-sm);
    }

    .trigger:focus {
      outline: none;
    }

    .trigger:focus-visible {
      box-shadow: var(--shadow-effects-focus-ring-sm);
    }

    .row {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--spacing-lg);
      padding: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--radius-sm);
      background: var(--color-bg-primary);
      transition: background-color 0.15s ease;
    }

    .row.is-current {
      background: var(--color-bg-primary-hover);
    }

    .trigger:hover .row {
      background: var(--color-bg-primary-hover);
    }

    .trigger:hover .row.is-current {
      background: var(--color-gray-light-mode-100);
    }

    .main {
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      gap: var(--spacing-md);
      min-width: 0;
    }

    .icon {
      display: inline-flex;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      line-height: 0;
      color: var(--color-text-secondary-700);
    }

    .icon:empty {
      display: none;
    }

    .label {
      flex: 1 1 auto;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-secondary-700);
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .row.is-current .label {
      color: var(--color-text-secondary-hover);
    }

    .chev-wrap {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      color: var(--color-text-secondary-700);
    }

    .chev {
      transition: transform 0.15s ease;
    }

    :host([open]) .chev {
      transform: rotate(180deg);
    }

    .subnav {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      box-sizing: border-box;
      padding: 0 0 var(--spacing-xs) var(--spacing-5xl);
      width: 100%;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-nav-item-expandable': BdNavItemExpandable
  }
}
