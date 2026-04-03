import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type BdAvatarProfilePhotoSize = 'sm' | 'md' | 'lg'
export type BdAvatarProfilePhotoKind = 'image' | 'placeholder' | 'initials'

const userIconLg = html`<svg
  class="ph"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
    stroke="var(--color-gray-light-mode-600)"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const verifiedLg = html`<svg
  class="v-svg"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <circle cx="12" cy="12" r="11" fill="var(--color-brand-ui-600)" />
  <path
    d="M8 12.5l2.5 2.5L16 9.5"
    stroke="var(--color-base-white)"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

/**
 * Large profile avatar with ring + optional verified badge (Figma **Avatar profile photo** · `1217:108477`).
 * Sizes **sm** (72px), **md** (96px), **lg** (160px). Verified uses `--color-brand-ui-600`.
 *
 * @slot - Custom inner content when `kind="image"` and no `src`.
 *
 * @csspart outer - Root circle.
 * @csspart content - Inner circular content.
 */
@customElement('bd-avatar-profile-photo')
export class BdAvatarProfilePhoto extends LitElement {
  @property({ reflect: true }) size: BdAvatarProfilePhotoSize = 'sm'

  @property({ reflect: true }) kind: BdAvatarProfilePhotoKind = 'image'

  @property({ type: Boolean, reflect: true }) verified = false

  @property({ reflect: true }) src = ''

  @property({ reflect: true }) alt = ''

  @property({ reflect: true }) initials = ''

  render() {
    const ini = (this.initials || '').slice(0, 2).toUpperCase().trim() || '?'

    return html`
      <div class="outer" part="outer">
        <div class="wrapper">
          <div class="content ${this.kind}" part="content">
            ${
              this.kind === 'image' && this.src
                ? html`<img src=${this.src} alt=${this.alt || 'Profile'} loading="lazy" />`
                : nothing
            }
            ${this.kind === 'image' && !this.src ? html`<slot></slot>` : nothing}
            ${this.kind === 'placeholder' ? userIconLg : nothing}
            ${this.kind === 'initials' ? html`<span class="initials">${ini}</span>` : nothing}
          </div>
        </div>
        ${
          this.verified
            ? html`<div class="vmark" role="img" aria-label="Verified">${verifiedLg}</div>`
            : nothing
        }
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
      line-height: 0;
    }

    .outer {
      position: relative;
      display: inline-block;
      flex-shrink: 0;
      border-radius: var(--radius-full);
    }

    .wrapper {
      box-sizing: border-box;
      border-radius: var(--radius-full);
      background: var(--color-bg-primary);
      border: 1px solid rgba(0, 0, 0, 0.08);
    }

    .content {
      position: relative;
      display: flex;
      box-sizing: border-box;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-full);
      border: 1px solid rgba(0, 0, 0, 0.08);
      background: var(--color-gray-light-mode-100);
    }

    .content.image {
      background: var(--color-bg-primary);
    }

    .content img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ph {
      width: 50%;
      height: 50%;
    }

    .initials {
      font-family: var(--font-family-display);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-quaternary-500);
      text-align: center;
    }

    .vmark {
      position: absolute;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    .vmark .v-svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    /* ----- sm 72px ----- */
    :host([size='sm']) .outer {
      width: 72px;
      height: 72px;
    }

    :host([size='sm']) .wrapper {
      padding: var(--spacing-3px);
      width: 72px;
      height: 72px;
    }

    :host([size='sm']) .content {
      width: 100%;
      height: 100%;
    }

    :host([size='sm']) .initials {
      font-size: var(--font-size-display-sm);
      line-height: var(--line-height-display-sm);
    }

    :host([size='sm']) .vmark {
      right: 2px;
      bottom: 2px;
      width: 20px;
      height: 20px;
    }

    /* ----- md 96px ----- */
    :host([size='md']) .outer {
      width: 96px;
      height: 96px;
    }

    :host([size='md']) .wrapper {
      padding: var(--spacing-xs);
      width: 96px;
      height: 96px;
    }

    :host([size='md']) .content {
      width: 100%;
      height: 100%;
    }

    :host([size='md']) .content.image,
    :host([size='md']) .content.placeholder {
      box-shadow:
        0 20px 24px -4px rgba(10, 13, 18, 0.08),
        0 8px 8px -4px rgba(10, 13, 18, 0.03),
        0 3px 3px -1.5px rgba(10, 13, 18, 0.04);
    }

    :host([size='md']) .initials {
      font-size: var(--font-size-display-md);
      line-height: var(--line-height-display-md);
      letter-spacing: -0.02em;
    }

    :host([size='md']) .vmark {
      right: 4px;
      bottom: 4px;
      width: 24px;
      height: 24px;
    }

    /* ----- lg 160px ----- */
    :host([size='lg']) .outer {
      width: 160px;
      height: 160px;
    }

    :host([size='lg']) .wrapper {
      padding: var(--spacing-sm);
      width: 160px;
      height: 160px;
    }

    :host([size='lg']) .content {
      width: 100%;
      height: 100%;
    }

    :host([size='lg']) .content.image,
    :host([size='lg']) .content.placeholder {
      box-shadow:
        0 24px 48px -12px rgba(10, 13, 18, 0.18),
        0 4px 4px -2px rgba(10, 13, 18, 0.04);
    }

    :host([size='lg']) .initials {
      font-size: var(--font-size-display-xl);
      line-height: var(--line-height-display-xl);
      letter-spacing: var(--letter-spacing-display-tight);
    }

    :host([size='lg']) .vmark {
      right: 8px;
      bottom: 8px;
      width: 32px;
      height: 32px;
    }
  `
}
