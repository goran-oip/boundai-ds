import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const chevronRight = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M7.5 5L12.5 10L7.5 15"
    stroke="currentColor"
    stroke-width="1.67"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

/**
 * Figma **Design system header** (`1550:264694`, `1550:264800`, `1550:264842`, `3275:373204`, `6721:120376`) — documentation-style intro: logo, inline trail,
 * large display heading, and supporting copy inside a rounded surface on `--color-bg-secondary`.
 *
 * @slot logo - Product mark (≈36×36px). Defaults to an empty rounded placeholder frame.
 * @slot trail - Replaces the whole top trail row (logo + breadcrumb). Rare; use for full custom nav.
 * @slot heading - Page title. Defaults to **`heading`**.
 * @slot description - Lead paragraph. Defaults to **`description`**.
 *
 * @csspart root - Outer layout wrapper.
 * @csspart surface - Inner rounded panel.
 * @csspart trail - Logo + breadcrumb row (when **`trail`** slot is unused).
 */
@customElement('bd-app-doc-page-header')
export class BdAppDocPageHeader extends LitElement {
  /** First segment in the inline trail (e.g. “Application components”). */
  @property() sectionLabel = ''

  /** Last segment after the chevron (e.g. “Page headers”). */
  @property() pageLabel = ''

  /** Main H1 text (fallback for **`heading`** slot). */
  @property() heading = ''

  /** Supporting paragraph (fallback for **`description`** slot). */
  @property() description = ''

  render() {
    return html`
      <div part="root" class="outer">
        <div part="surface" class="surface">
          <slot name="trail">
            <div class="trail">
              <div class="logo-wrap">
                <slot name="logo">
                  <div class="logo-placeholder" aria-hidden="true"></div>
                </slot>
              </div>
              <div class="crumb" aria-label="Section">
                ${
                  this.sectionLabel
                    ? html`<span class="crumb-text">${this.sectionLabel}</span>`
                    : html``
                }
                ${this.sectionLabel && this.pageLabel ? html`<span class="crumb-icon">${chevronRight}</span>` : html``}
                ${this.pageLabel ? html`<span class="crumb-text">${this.pageLabel}</span>` : html``}
              </div>
            </div>
          </slot>
          <div class="hero">
            <h1 class="display-title">
              <slot name="heading">${this.heading}</slot>
            </h1>
            <div class="lead">
              <slot name="description">${this.description}</slot>
            </div>
          </div>
        </div>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
    }

    .outer {
      box-sizing: border-box;
      width: 100%;
      padding: var(--spacing-4xl);
    }

    .surface {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-10xl);
      width: 100%;
      padding: var(--spacing-6xl) var(--spacing-6xl) var(--spacing-7xl);
      border-radius: var(--radius-3xl);
      background: var(--color-bg-secondary);
      overflow: hidden;
    }

    .trail {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-xl);
      width: 100%;
    }

    .logo-wrap {
      display: flex;
      align-items: flex-start;
      flex-shrink: 0;
    }

    .logo-placeholder {
      width: 36px;
      height: 36px;
      border-radius: 9px;
      border: 0.225px solid rgba(10, 13, 18, 0.12);
      box-shadow: var(--shadow-xs);
      background: var(--color-bg-primary);
    }

    .crumb {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-xs);
      min-width: 0;
    }

    .crumb-text {
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xl);
      line-height: var(--line-height-text-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary-900);
      white-space: nowrap;
    }

    .crumb-icon {
      display: inline-flex;
      color: var(--color-text-primary-900);
      flex-shrink: 0;
    }

    .hero {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-2xl);
      width: 100%;
      max-width: 64rem;
    }

    .display-title {
      margin: 0;
      width: 100%;
      font-family: var(--font-family-display);
      font-size: var(--font-size-display-xl);
      line-height: var(--line-height-display-xl);
      font-weight: var(--font-weight-semibold);
      letter-spacing: var(--letter-spacing-display-tight);
      color: var(--color-text-primary-900);
    }

    .lead {
      width: 100%;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xl);
      line-height: var(--line-height-text-xl);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-tertiary-600);
    }

    .lead:empty {
      display: none;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-app-doc-page-header': BdAppDocPageHeader
  }
}
