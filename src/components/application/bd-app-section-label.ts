import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type BdAppSectionLabelSize = 'sm' | 'md'

/**
 * Figma **Section label** (`5013:376534`) — compact label row (optional **required** asterisk, **`help`** slot),
 * supporting text, and optional **link-style** actions.
 *
 * @slot - Label text (defaults to **`label`**).
 * @slot help - Replaces the default help icon area (e.g. **`bd-help-icon`**).
 * @slot description - Supporting line (defaults to **`description`**).
 * @slot actions - Trailing actions (e.g. tertiary **`bd-button`**s).
 *
 * @csspart root - Outer column.
 * @csspart label-row - Title + required + help.
 * @csspart actions - Action row when **`hasActions`** is true.
 */
@customElement('bd-app-section-label')
export class BdAppSectionLabel extends LitElement {
  @property({ reflect: true }) size: BdAppSectionLabelSize = 'sm'

  @property() label = ''

  @property() description = ''

  @property({ type: Boolean, reflect: true }) required = false

  /** Reserve space for **`slot="help"`** (use with **`bd-help-icon`**). */
  @property({ type: Boolean, reflect: true }) help = false

  @property({ type: Boolean, reflect: true }) hasActions = false

  render() {
    return html`
      <div part="root" class="root">
        <div class="stack">
          <div part="label-row" class="label-row">
            <span class="label">
              <slot>${this.label}</slot>
            </span>
            ${this.required ? html`<span class="required" aria-hidden="true">*</span>` : nothing}
            ${this.help ? html`<span class="help"><slot name="help"></slot></span>` : nothing}
          </div>
          <div class="description">
            <slot name="description">${this.description}</slot>
          </div>
        </div>
        ${
          this.hasActions
            ? html`<div part="actions" class="actions"><slot name="actions"></slot></div>`
            : nothing
        }
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
      max-width: 17.5rem;
    }

    .root {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-lg);
      width: 100%;
      min-width: min(100%, 12.5rem);
    }

    .stack {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-xs);
      width: 100%;
    }

    .label-row {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      min-width: 0;
    }

    :host([size='sm']) .label-row {
      gap: var(--spacing-xxs);
    }

    :host([size='md']) .label-row {
      gap: var(--spacing-xs);
    }

    .label {
      font-family: var(--font-family-body);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-secondary-700);
      white-space: nowrap;
    }

    :host([size='sm']) .label {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    :host([size='md']) .label {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }

    .required {
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-brand-tertiary-600);
    }

    .help {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    .help:empty {
      display: none;
    }

    .description {
      width: 100%;
      min-width: min-content;
      font-family: var(--font-family-body);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-tertiary-600);
    }

    :host([size='sm']) .description {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    :host([size='md']) .description {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }

    .description:empty {
      display: none;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: var(--spacing-md);
      width: 100%;
    }

    .actions:empty {
      display: none;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-app-section-label': BdAppSectionLabel
  }
}
