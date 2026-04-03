import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * Documentation hero block (Figma **Dropdowns** intro · node `1538:269977`).
 * Light gray rounded panel on canvas: breadcrumb row, display title, supporting copy.
 *
 * @slot logo - Optional mark before the breadcrumb (e.g. Bound logo).
 * @slot breadcrumb - Breadcrumb trail (e.g. “Base components” + chevron + current page).
 * @slot title - Page title (display-xl).
 * @slot description - Supporting text (text-xl, tertiary).
 *
 * @csspart outer - Full-width section on the canvas.
 * @csspart inner - Rounded gray content panel.
 */
@customElement('bd-docs-intro')
export class BdDocsIntro extends LitElement {
  render() {
    return html`
      <section class="outer" part="outer">
        <div class="inner" part="inner">
          <div class="crumb-row">
            <div class="logo"><slot name="logo"></slot></div>
            <div class="breadcrumb"><slot name="breadcrumb"></slot></div>
          </div>
          <h1 class="title"><slot name="title"></slot></h1>
          <p class="description"><slot name="description"></slot></p>
        </div>
      </section>
    `
  }

  static styles = css`
    :host {
      display: block;
    }

    .outer {
      box-sizing: border-box;
      padding: var(--spacing-4xl);
      background: var(--color-surface-canvas);
    }

    .inner {
      box-sizing: border-box;
      max-width: 100%;
      padding: var(--spacing-6xl) var(--spacing-8xl) var(--spacing-7xl);
      border-radius: var(--radius-3xl);
      background: var(--color-gray-light-mode-50);
    }

    .crumb-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-xl);
    }

    .logo {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      line-height: 0;
    }

    .logo:empty {
      display: none;
    }

    .breadcrumb {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: var(--font-size-text-xl);
      line-height: var(--line-height-text-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-default);
    }

    .title {
      margin: 0 0 var(--spacing-xl);
      font-family: var(--font-family-display);
      font-size: var(--font-size-display-xl);
      line-height: var(--line-height-display-xl);
      font-weight: var(--font-weight-semibold);
      letter-spacing: var(--letter-spacing-display-tight);
      color: var(--color-text-heading);
    }

    .description {
      margin: 0;
      max-width: 52rem;
      font-size: var(--font-size-text-xl);
      line-height: var(--line-height-text-xl);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-muted);
    }

    .title:empty,
    .description:empty {
      display: none;
    }
  `
}
