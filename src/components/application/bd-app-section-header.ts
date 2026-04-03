import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Figma **Section header** (`1214:38`) — section title + description, optional **`toolbar`** (buttons, search, button group),
 * overflow **`menu`**, optional **tab strip** slot, and divider. Responsive at **`768px`** (container query).
 *
 * @slot heading - Section title. Defaults to **`heading`**.
 * @slot description - Supporting copy. Defaults to **`description`**.
 * @slot toolbar - Right-side controls (buttons, search field, **`bd-button-group`**, etc.).
 * @slot menu - Overflow (e.g. **`bd-utility-button`** + kebab icon).
 * @slot tabs - Horizontal tabs; wrapped in a muted bar (desktop). Empty when **`tabs`** is false.
 *
 * @csspart root - Outer wrapper.
 * @csspart shell - Padded block containing the main row and tab strip.
 * @csspart main - Title + toolbar + menu row.
 * @csspart leading - Title stack.
 * @csspart toolbar - Toolbar slot container.
 * @csspart menu - Menu slot container.
 * @csspart tabs - Tab strip surface.
 * @csspart divider - Bottom rule.
 */
@customElement('bd-app-section-header')
export class BdAppSectionHeader extends LitElement {
  @property() heading = ''

  @property() description = ''

  /** When true, renders the **`tabs`** slot inside a styled strip (Figma horizontal tabs). */
  @property({ type: Boolean, reflect: true }) tabs = false

  @property({ type: Boolean, reflect: true }) divider = true

  render() {
    return html`
      <div part="root" class="root">
        <div part="shell" class="shell">
          <div part="main" class="main">
            <div part="leading" class="leading">
              <div class="title-block">
                <h2 class="title">
                  <slot name="heading">${this.heading}</slot>
                </h2>
                <div class="support">
                  <slot name="description">${this.description}</slot>
                </div>
              </div>
            </div>
            <div part="toolbar" class="toolbar">
              <slot name="toolbar"></slot>
            </div>
            <div part="menu" class="menu">
              <slot name="menu"></slot>
            </div>
          </div>
          ${
            this.tabs
              ? html`<div part="tabs" class="tabs-shell"><slot name="tabs"></slot></div>`
              : nothing
          }
        </div>
        ${this.divider ? html`<div part="divider" class="divider" role="presentation"></div>` : nothing}
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
    }

    .root {
      container-type: inline-size;
      container-name: bd-app-section-header;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-2xl);
      width: 100%;
      background: var(--color-bg-primary);
      isolation: isolate;
    }

    .shell {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2xl);
      width: 100%;
      padding: var(--spacing-2xl) var(--spacing-3xl) 0;
    }

    .main {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      gap: var(--spacing-xl);
      width: 100%;
      min-width: 0;
    }

    .leading {
      flex: 1 1 auto;
      min-width: 0;
      width: 100%;
    }

    .title-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-xxs);
      width: 100%;
      min-width: 0;
    }

    .title {
      margin: 0;
      width: 100%;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-lg);
      line-height: var(--line-height-text-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary-900);
    }

    .support {
      margin: 0;
      width: 100%;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-tertiary-600);
    }

    .support:empty {
      display: none;
    }

    @container bd-app-section-header (min-width: 768px) {
      .support {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-lg);
      flex-shrink: 0;
    }

    .toolbar:empty {
      display: none;
    }

    .menu {
      display: flex;
      flex-shrink: 0;
      align-items: flex-start;
      justify-content: center;
    }

    .menu:empty {
      display: none;
    }

    .tabs-shell {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-md);
      width: 100%;
      padding: var(--spacing-xs);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border-secondary);
      background: var(--color-bg-primary-hover);
    }

    .tabs-shell:empty {
      display: none;
    }

    .divider {
      width: 100%;
      height: 1px;
      margin: 0;
      border: none;
      background: var(--color-border-secondary);
      flex-shrink: 0;
      z-index: 1;
    }

    @container bd-app-section-header (min-width: 768px) {
      .main {
        position: static;
      }

      .menu {
        position: static;
        z-index: auto;
      }

      .leading {
        padding-inline-end: 0;
      }
    }

    @container bd-app-section-header (max-width: 767.98px) {
      .shell {
        padding: var(--spacing-2xl) var(--spacing-xl) 0;
      }

      .main {
        position: relative;
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-xl);
      }

      .leading {
        padding-inline-end: var(--spacing-5xl);
      }

      .menu {
        position: absolute;
        top: var(--spacing-2xl);
        right: var(--spacing-xl);
        z-index: 3;
      }

      .support {
        white-space: normal;
        overflow: visible;
        text-overflow: unset;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-app-section-header': BdAppSectionHeader
  }
}
