import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type BdAppSectionFooterVariant = 'section' | 'card'

/**
 * Figma **Section footer** (`3275:372571`) — optional top **divider**, then a row with **`leading`** (e.g. **`bd-button-group`** + tertiary link)
 * and **`actions`** (typically tertiary / secondary / primary **`bd-button`**s). **`768px`** container query.
 *
 * **`variant="section"`** — page-level footer spacing (gap after divider, row gaps like Figma **Section**).
 * **`variant="card"`** — inset horizontal padding and tighter gaps for card/table footers (**Card** in Figma).
 *
 * @slot leading - Start cluster: segmented control, **Learn more** link, etc.
 * @slot actions - End-aligned actions (use **`display:flex; gap: var(--spacing-lg)`** in a wrapper if needed).
 *
 * @csspart root - Outer wrapper.
 * @csspart divider - Top rule when **`divider`** is true.
 * @csspart shell - Padded block below the divider.
 * @csspart row - Flex row (**leading** + **actions**).
 * @csspart leading - Start slot container.
 * @csspart actions - End slot container.
 */
@customElement('bd-app-section-footer')
export class BdAppSectionFooter extends LitElement {
  @property({ reflect: true }) variant: BdAppSectionFooterVariant = 'section'

  @property({ type: Boolean, reflect: true }) divider = true

  render() {
    return html`
      <div part="root" class="root">
        ${this.divider ? html`<div part="divider" class="divider" role="presentation"></div>` : nothing}
        <div part="shell" class="shell">
          <div part="row" class="row">
            <div part="leading" class="leading">
              <slot name="leading"></slot>
            </div>
            <div part="actions" class="actions">
              <slot name="actions"></slot>
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

    .root {
      container-type: inline-size;
      container-name: bd-app-section-footer;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-xl);
      width: 100%;
      background: var(--color-bg-primary);
      isolation: isolate;
    }

    :host([variant='section']) .root {
      gap: var(--spacing-xl);
    }

    :host([variant='card']) .root {
      gap: var(--spacing-lg);
      padding-bottom: var(--spacing-lg);
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

    .shell {
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
    }

    :host([variant='section']) .shell {
      padding: 0 var(--spacing-xl) var(--spacing-2xl);
    }

    :host([variant='card']) .shell {
      padding: 0 var(--spacing-xl) 0;
    }

    .row {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      gap: var(--spacing-xl);
      width: 100%;
      min-width: 0;
    }

    :host([variant='section']) .row {
      gap: var(--spacing-xl);
    }

    :host([variant='card']) .row {
      gap: var(--spacing-lg);
    }

    .leading {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-xl);
      flex: 0 1 auto;
      min-width: 0;
    }

    :host([variant='card']) .leading {
      gap: var(--spacing-lg);
    }

    .actions {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      flex: 1 1 auto;
      align-items: center;
      justify-content: flex-end;
      gap: var(--spacing-lg);
      min-width: min(100%, 12rem);
    }

    @container bd-app-section-footer (min-width: 768px) {
      :host([variant='section']) .root {
        gap: var(--spacing-2xl);
      }

      :host([variant='card']) .root {
        gap: var(--spacing-xl);
        padding-bottom: var(--spacing-xl);
      }

      :host([variant='section']) .shell {
        padding: 0 var(--spacing-3xl) var(--spacing-2xl);
      }

      :host([variant='card']) .shell {
        padding: 0 var(--spacing-3xl) 0;
      }

      :host([variant='section']) .row {
        gap: var(--spacing-2xl);
      }

      :host([variant='section']) .leading {
        gap: var(--spacing-2xl);
      }

      :host([variant='card']) .row {
        gap: var(--spacing-xl);
      }

      :host([variant='card']) .leading {
        gap: var(--spacing-xl);
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-app-section-footer': BdAppSectionFooter
  }
}
