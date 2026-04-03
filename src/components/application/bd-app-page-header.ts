import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type BdAppPageHeaderVariant = 'simple' | 'avatar'

/**
 * Figma **Page header** (`1239:122640`) — breadcrumbs or mobile back row, identity (title or avatar + profile),
 * **`actions`**, optional **`search`**, and a bottom divider. Layout responds via **container queries** (`768px`).
 *
 * @slot breadcrumbs - Desktop-only trail (e.g. home → Settings → … → current).
 * @slot mobile-nav - Narrow viewports only (e.g. back control).
 * @slot avatar - Profile image / **`bd-avatar`** when **`variant="avatar"`**.
 * @slot heading - Title (simple). Defaults to **`heading`**.
 * @slot description - Supporting line (simple). Defaults to **`description`**.
 * @slot actions - Toolbar buttons (**`bd-button`**, etc.).
 * @slot search - Search field (e.g. input + shortcut).
 * @slot identity - Replaces the default simple / avatar block.
 *
 * @csspart root - Outer wrapper (`container-type: inline-size`).
 * @csspart main - Identity + actions + search group.
 * @csspart divider - Full-width 1px line under the header block.
 */
@customElement('bd-app-page-header')
export class BdAppPageHeader extends LitElement {
  /** `simple` — title + description. `avatar` — **`avatar`** slot + **`profileName`** / **`profileEmail`**. */
  @property({ reflect: true }) variant: BdAppPageHeaderVariant = 'simple'

  @property() heading = ''

  @property() description = ''

  @property() profileName = ''

  @property() profileEmail = ''

  @property({ type: Boolean, reflect: true }) divider = true

  render() {
    return html`
      <div part="root" class="root">
        <div class="breadcrumbs-desktop">
          <slot name="breadcrumbs"></slot>
        </div>
        <div class="mobile-nav">
          <slot name="mobile-nav"></slot>
        </div>

        <div part="main" class="main-row">
          <slot name="identity">
            ${this.variant === 'avatar' ? this._renderAvatarIdentity() : this._renderSimpleIdentity()}
          </slot>
          <div class="actions">
            <slot name="actions"></slot>
          </div>
          <div class="search">
            <slot name="search"></slot>
          </div>
        </div>

        ${this.divider ? html`<div part="divider" class="divider" role="presentation"></div>` : nothing}
      </div>
    `
  }

  private _renderSimpleIdentity() {
    return html`
      <div class="identity identity-simple">
        <h1 class="title">
          <slot name="heading">${this.heading}</slot>
        </h1>
        <div class="support">
          <slot name="description">${this.description}</slot>
        </div>
      </div>
    `
  }

  private _renderAvatarIdentity() {
    return html`
      <div class="identity identity-avatar">
        <div class="avatar-cell">
          <slot name="avatar"></slot>
        </div>
        <div class="profile">
          <p class="profile-name">${this.profileName}</p>
          ${this.profileEmail ? html`<p class="profile-email">${this.profileEmail}</p>` : nothing}
        </div>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
      /* Slotted breadcrumbs / search / mobile-nav live in light DOM; inherit from the host */
      font-family: var(--font-family-body);
    }

    slot[name='breadcrumbs']::slotted(*),
    slot[name='mobile-nav']::slotted(*),
    slot[name='search']::slotted(*) {
      font-family: var(--font-family-body);
    }

    .root {
      container-type: inline-size;
      container-name: bd-app-page-header;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-xl);
      width: 100%;
    }

    .breadcrumbs-desktop {
      width: 100%;
    }

    .mobile-nav {
      display: none;
      width: 100%;
    }

    .main-row {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-xl);
      width: 100%;
      min-width: 0;
    }

    .identity {
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
    }

    .identity-simple {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-xs);
    }

    .title {
      margin: 0;
      width: 100%;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xl);
      line-height: var(--line-height-text-xl);
      font-weight: var(--font-weight-semibold);
      letter-spacing: var(--letter-spacing-none);
      color: var(--color-text-primary-900);
    }

    .support {
      width: 100%;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-tertiary-600);
    }

    .support:empty {
      display: none;
    }

    .identity-avatar {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--spacing-xl);
      width: 100%;
      min-width: min(100%, 20rem);
    }

    .avatar-cell {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    .avatar-cell:empty {
      display: none;
    }

    .profile {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      min-width: 0;
      flex: 1 1 auto;
    }

    .profile-name {
      margin: 0;
      width: 100%;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xl);
      line-height: var(--line-height-text-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary-900);
    }

    .profile-email {
      margin: 0;
      width: 100%;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-tertiary-600);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-lg);
      width: 100%;
    }

    .actions:empty {
      display: none;
    }

    .search {
      box-sizing: border-box;
      width: 100%;
      max-width: 20rem;
      min-width: min(100%, 12.5rem);
    }

    .search:empty {
      display: none;
    }

    .divider {
      width: 100%;
      height: 1px;
      margin: 0;
      border: none;
      background: var(--color-border-secondary);
      flex-shrink: 0;
    }

    @container bd-app-page-header (min-width: 768px) {
      .mobile-nav {
        display: none !important;
      }

      .breadcrumbs-desktop {
        display: block;
      }

      .title {
        font-family: var(--font-family-display);
        font-size: var(--font-size-display-xs);
        line-height: var(--line-height-display-xs);
      }

      .main-row {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;
        column-gap: var(--spacing-xl);
        row-gap: var(--spacing-2xl);
      }

      .identity {
        flex: 1 1 20rem;
        min-width: min(100%, 20rem);
        width: auto;
      }

      .actions {
        flex: 0 0 auto;
        width: auto;
      }

      .search {
        flex: 1 1 12.5rem;
        width: auto;
        max-width: 20rem;
      }
    }

    @container bd-app-page-header (max-width: 767.98px) {
      .breadcrumbs-desktop {
        display: none !important;
      }

      .mobile-nav {
        display: block;
      }

      .identity-simple {
        gap: var(--spacing-xxs);
      }

      .identity-avatar {
        gap: var(--spacing-lg);
        align-items: flex-start;
      }

      .search {
        max-width: none;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-app-page-header': BdAppPageHeader
  }
}
