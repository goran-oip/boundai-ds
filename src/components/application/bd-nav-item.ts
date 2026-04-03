import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Figma **`_Nav item base`** (`1152:89220`) — sidebar row: optional **status dot**, **leading icon**, label,
 * optional **badge**, optional **trailing** (e.g. chevron). Uses **`text-md` / semibold** and focus ring.
 *
 * @slot - Label text (defaults to **`label`**).
 * @slot icon - Leading icon (~20×20px).
 * @slot badge - Trailing count (e.g. pill); set **`badge`** to reserve space.
 * @slot trailing - Chevron or similar (~16×16px); set **`trailing`** to reserve space.
 *
 * @csspart base - Outer interactive wrapper.
 * @csspart row - Inner padded row.
 */
@customElement('bd-nav-item')
export class BdNavItem extends LitElement {
  @property({ type: Boolean, reflect: true }) current = false

  /** Show leading **online / status** dot (success). */
  @property({ type: Boolean, reflect: true }) dot = false

  @property({ type: Boolean, reflect: true }) badge = false

  @property({ type: Boolean, reflect: true }) trailing = false

  @property() label = ''

  @property() href = ''

  render() {
    const inner = html`
      <div part="row" class="row">
        <div class="main">
          ${this.dot ? html`<span class="dot" aria-hidden="true"></span>` : nothing}
          <span class="icon"><slot name="icon"></slot></span>
          <span class="label"><slot>${this.label}</slot></span>
        </div>
        ${this.badge ? html`<span class="badge-wrap"><slot name="badge"></slot></span>` : nothing}
        ${this.trailing ? html`<span class="trail"><slot name="trailing"></slot></span>` : nothing}
      </div>
    `

    return html`
      <div part="base" class="base">
        ${
          this.href
            ? html`<a
                class="hit"
                href=${this.href}
                aria-current=${this.current ? 'page' : nothing}
              >${inner}</a>`
            : html`<button
                type="button"
                class="hit"
                aria-current=${this.current ? 'true' : nothing}
              >${inner}</button>`
        }
      </div>
    `
  }

  static styles = css`
    :host {
      --size-status-dot: 10px;

      display: block;
      width: 100%;
      max-width: 17rem;
    }

    .base {
      box-sizing: border-box;
      padding: var(--spacing-xxs) 0;
      width: 100%;
    }

    .hit {
      box-sizing: border-box;
      display: block;
      width: 100%;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      font: inherit;
      color: inherit;
      text-align: left;
      text-decoration: none;
      cursor: pointer;
      border-radius: var(--radius-sm);
    }

    .hit:focus {
      outline: none;
    }

    .hit:focus-visible {
      box-shadow: var(--shadow-effects-focus-ring-sm);
    }

    .row {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      gap: var(--spacing-lg);
      min-width: 0;
      padding: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--radius-sm);
      background: var(--color-bg-primary);
      transition: background-color 0.15s ease;
    }

    :host([current]) .row {
      background: var(--color-bg-primary-hover);
    }

    .hit:hover .row {
      background: var(--color-bg-primary-hover);
    }

    :host([current]) .hit:hover .row {
      background: var(--color-gray-light-mode-100);
    }

    .main {
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      gap: var(--spacing-md);
      min-width: 0;
    }

    .dot {
      flex-shrink: 0;
      width: var(--size-status-dot);
      height: var(--size-status-dot);
      border-radius: var(--radius-full);
      background: var(--color-success-500);
    }

    .icon {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
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
      min-width: 0;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-secondary-700);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :host([current]) .label {
      color: var(--color-text-secondary-hover);
    }

    .badge-wrap {
      flex-shrink: 0;
    }

    .badge-wrap:empty {
      display: none;
    }

    .trail {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      line-height: 0;
      color: var(--color-text-secondary-700);
    }

    .trail:empty {
      display: none;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-nav-item': BdNavItem
  }
}
