import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type BdAppSidebarNavigationVariant = 'full' | 'slim'

/**
 * Figma **Sidebar navigation** (`1158:90768`) — vertical shell: **header**, **search**, main **nav**, **footer** (e.g. account card).
 *
 * **`variant="full"`** — width **`296px`** (Figma **Simple** / **Sections** collapsed). **`slim`** — icon rail **`68px`** when collapsed, **`336px`** when open.
 *
 * @slot header - Top brand / menu control.
 * @slot search - Search field.
 * @slot - Scrollable navigation items.
 * @slot footer - Account card, promos, etc.
 *
 * @csspart root - `<aside>` element.
 *
 * @attr label - Accessible name for the sidebar landmark (default **Sidebar navigation**).
 */
@customElement('bd-app-sidebar-navigation')
export class BdAppSidebarNavigation extends LitElement {
  @property({ reflect: true }) variant: BdAppSidebarNavigationVariant = 'full'

  /** When **`variant="slim"`**, wide panel vs icon rail. Ignored for **`full`**. */
  @property({ type: Boolean, reflect: true }) open = true

  /** Accessible name for the sidebar landmark (mirrors to **`aria-label`** on `<aside>`). */
  @property({ attribute: 'label' }) label = 'Sidebar navigation'

  render() {
    return html`
      <aside part="root" class="root" aria-label=${this.label || nothing}>
        <div class="head">
          <slot name="header"></slot>
        </div>
        <div class="search">
          <slot name="search"></slot>
        </div>
        <div class="body">
          <slot></slot>
        </div>
        <div class="foot">
          <slot name="footer"></slot>
        </div>
      </aside>
    `
  }

  static styles = css`
    :host {
      display: block;
      flex-shrink: 0;
      height: 100%;
      min-height: 0;
      font-family: var(--font-family-body);
    }

    .head slot::slotted(*),
    .search slot::slotted(*),
    .body slot::slotted(*),
    .foot slot::slotted(*) {
      font-family: var(--font-family-body);
    }

    .root {
      container-type: inline-size;
      container-name: bd-app-sidebar-navigation;

      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      height: 100%;
      min-height: 100%;
      border-right: 1px solid var(--color-border-secondary);
      background: var(--color-bg-primary);
      transition: width 0.2s ease;
    }

    :host([variant='full']) .root {
      width: 18.5rem;
    }

    :host([variant='slim'][open]) .root {
      width: 21rem;
    }

    :host([variant='slim']:not([open])) .root {
      width: 4.25rem;
    }

    .head {
      flex-shrink: 0;
      padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-md);
    }

    .search {
      flex-shrink: 0;
      padding: 0 var(--spacing-lg) var(--spacing-md);
    }

    .search:empty {
      display: none;
    }

    .body {
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
      padding: var(--spacing-md) var(--spacing-lg);
    }

    .foot {
      flex-shrink: 0;
      padding: var(--spacing-md) var(--spacing-lg);
      border-top: 1px solid var(--color-border-secondary);
    }

    .foot:empty {
      display: none;
    }

    @container bd-app-sidebar-navigation (max-width: 767.98px) {
      :host([variant='full']) .root {
        width: 100%;
        max-width: 23.4375rem;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-app-sidebar-navigation': BdAppSidebarNavigation
  }
}
