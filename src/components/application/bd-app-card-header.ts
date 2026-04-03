import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type BdAppCardHeaderVariant = 'text' | 'avatar'

/**
 * Figma **Card header** (`1211:169`) — title (or avatar + profile), optional **`badge`**, supporting line,
 * **`actions`**, overflow **`menu`**, and bottom divider. Responsive at **`768px`** (container query).
 *
 * @slot badge - Pill next to the title (e.g. **`bd-badge`**).
 * @slot heading - Title (text variant). Defaults to **`heading`**.
 * @slot description - Supporting copy. Defaults to **`description`**.
 * @slot avatar - Avatar (**`bd-avatar`**); use **`size="xl"`** (56px) / **`size="lg"`** (48px) to match breakpoints.
 * @slot profile-name - Overrides **`profileName`** (avatar).
 * @slot profile-email - Overrides **`profileEmail`** (avatar).
 * @slot actions - Toolbar (**`bd-button`**s); narrow view shows secondary + primary only (compose in Storybook).
 * @slot menu - Overflow control (e.g. **`bd-utility-button`** + icon); positioned top-right on narrow layouts.
 *
 * @csspart root - Outer wrapper.
 * @csspart inner - Padded content row.
 * @csspart leading - Title / avatar block.
 * @csspart actions - Actions group.
 * @csspart menu - Menu control.
 * @csspart divider - Bottom rule.
 */
@customElement('bd-app-card-header')
export class BdAppCardHeader extends LitElement {
  @property({ reflect: true }) variant: BdAppCardHeaderVariant = 'text'

  /** Card title (text variant) or use **`heading`** slot. */
  @property() heading = ''

  /** Supporting line under the title row (text variant). */
  @property() description = ''

  /** Display name when **`variant="avatar"`**. */
  @property() profileName = ''

  /** Secondary line (e.g. email) when **`variant="avatar"`**. */
  @property() profileEmail = ''

  @property({ type: Boolean, reflect: true }) divider = true

  render() {
    return html`
      <div part="root" class="root">
        <div part="inner" class="inner">
          <div part="leading" class="leading">
            ${this.variant === 'avatar' ? this._avatarBlock() : this._textBlock()}
          </div>
          <div part="actions" class="actions">
            <slot name="actions"></slot>
          </div>
          <div part="menu" class="menu">
            <slot name="menu"></slot>
          </div>
        </div>
        ${this.divider ? html`<div part="divider" class="divider" role="presentation"></div>` : nothing}
      </div>
    `
  }

  private _textBlock() {
    return html`
      <div class="title-block">
        <div class="title-line">
          <h2 class="title">
            <slot name="heading">${this.heading}</slot>
          </h2>
          <div class="badge-slot">
            <slot name="badge"></slot>
          </div>
        </div>
        <div class="support">
          <slot name="description">${this.description}</slot>
        </div>
      </div>
    `
  }

  private _avatarBlock() {
    return html`
      <div class="avatar-row">
        <div class="avatar-wrap">
          <slot name="avatar"></slot>
        </div>
        <div class="title-block title-block--avatar">
          <div class="title-line">
            <h2 class="title">
              <slot name="profile-name">${this.profileName}</slot>
            </h2>
            <div class="badge-slot">
              <slot name="badge"></slot>
            </div>
          </div>
          <div class="support">
            <slot name="profile-email">${this.profileEmail}</slot>
          </div>
        </div>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
    }

    .root {
      container-type: inline-size;
      container-name: bd-app-card-header;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-2xl);
      width: 100%;
      background: var(--color-bg-primary);
      isolation: isolate;
    }

    .inner {
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      gap: var(--spacing-xl);
      width: 100%;
      padding: var(--spacing-2xl) var(--spacing-3xl) 0;
      z-index: 2;
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

    .title-line {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-md);
      width: 100%;
      min-width: 0;
    }

    .title {
      margin: 0;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-lg);
      line-height: var(--line-height-text-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary-900);
    }

    .badge-slot {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }

    .badge-slot:empty {
      display: none;
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

    .avatar-row {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: var(--spacing-lg);
      width: 100%;
      min-width: 0;
    }

    .title-block--avatar {
      flex: 1 1 auto;
      min-width: 0;
    }

    .avatar-wrap {
      display: flex;
      flex-shrink: 0;
      align-items: flex-start;
      justify-content: center;
      line-height: 0;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-lg);
      flex-shrink: 0;
    }

    .actions:empty {
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

    .divider {
      width: 100%;
      height: 1px;
      margin: 0;
      border: none;
      background: var(--color-border-secondary);
      flex-shrink: 0;
      z-index: 1;
    }

    @container bd-app-card-header (min-width: 768px) {
      .inner {
        position: static;
      }

      .leading {
        padding-inline-end: 0;
      }

      .menu {
        position: static;
        z-index: auto;
      }

      .support {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    /* Narrow: stack; menu top-right (Figma 1211:169). */
    @container bd-app-card-header (max-width: 767.98px) {
      .inner {
        position: relative;
        flex-direction: column;
        align-items: stretch;
        padding: var(--spacing-2xl) var(--spacing-xl) 0;
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
    'bd-app-card-header': BdAppCardHeader
  }
}
