import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Centered empty / zero-state block for lists, search results, or first-run screens.
 * Put **`bd-featured-icon`**, illustrations, or **`bd-spinner`** in **`media`**; actions in **`actions`**.
 *
 * @slot media - Visual above the title (icon, illustration, spinner).
 * @slot heading - Title line. Defaults to **`title`** when unset.
 * @slot description - Body copy. Defaults to **`description`** when unset.
 * @slot actions - Primary / secondary actions (e.g. **`bd-button`**).
 *
 * @csspart root - The outer container.
 */
@customElement('bd-app-empty-state')
export class BdAppEmptyState extends LitElement {
  /** Heading when the **`heading`** slot is not used. */
  @property() title = ''

  /** Body text when the **`description`** slot is not used. */
  @property() description = ''

  render() {
    return html`
      <div part="root" class="root">
        <div class="media"><slot name="media"></slot></div>
        <h2 class="heading">
          <slot name="heading">${this.title}</slot>
        </h2>
        <div class="body">
          <slot name="description">${this.description}</slot>
        </div>
        <div class="actions"><slot name="actions"></slot></div>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
    }

    .root {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: var(--spacing-md);
      width: 100%;
      max-width: 28rem;
      margin-inline: auto;
      padding: var(--spacing-3xl) var(--spacing-lg);
    }

    .media {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      color: var(--color-text-tertiary-600);
    }

    .media:empty {
      display: none;
    }

    .heading {
      margin: 0;
      max-width: 100%;
      font-family: var(--font-family-display);
      font-size: var(--font-size-text-lg);
      line-height: var(--line-height-text-lg);
      font-weight: var(--font-weight-semibold);
      letter-spacing: var(--letter-spacing-none);
      color: var(--color-text-primary-900);
    }

    .body {
      width: 100%;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-secondary-700);
    }

    .body:empty {
      display: none;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
      margin-top: var(--spacing-xs);
    }

    .actions:empty {
      display: none;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-app-empty-state': BdAppEmptyState
  }
}
