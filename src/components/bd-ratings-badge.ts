import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import './bd-star-icon.js'
import wreathLeftSvg from './icons/ratings-wreath-left.svg?raw'
import wreathRightSvg from './icons/ratings-wreath-right.svg?raw'

/**
 * Figma **Ratings badge** (`7460:158976`) — laurel frame, five stars, title + supporting text.
 *
 * Default laurels match Figma exports; override with **`wreath-left`** / **`wreath-right`** slots.
 *
 * @slot wreath-left - Left laurel / decoration.
 * @slot wreath-right - Right laurel / decoration.
 * @slot stars - Star row (defaults to five filled yellow stars).
 * @slot title - Primary line (default: “Best InsurTech Tool”).
 * @slot subtitle - Secondary line (default: “2,000+ reviews”).
 */
@customElement('bd-ratings-badge')
export class BdRatingsBadge extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: 'show-stars' }) showStars = true

  @property({ attribute: 'label' }) label = ''

  render() {
    return html`
      <div
        part="root"
        class="badge"
        role=${this.label ? 'group' : nothing}
        aria-label=${this.label || nothing}
      >
        <div class="side">
          <slot name="wreath-left">${this._wreath('left')}</slot>
        </div>
        <div class="mid">
          ${
            this.showStars
              ? html`<div class="stars" part="stars">
                <slot name="stars">${this._defaultStars()}</slot>
              </div>`
              : nothing
          }
          <div class="text" part="text">
            <p class="title">
              <slot name="title">Best InsurTech Tool</slot>
            </p>
            <p class="subtitle">
              <slot name="subtitle">2,000+ reviews</slot>
            </p>
          </div>
        </div>
        <div class="side">
          <slot name="wreath-right">${this._wreath('right')}</slot>
        </div>
      </div>
    `
  }

  private _defaultStars() {
    return html`
      ${Array.from(
        { length: 5 },
        () => html`<bd-star-icon fill="100" color="yellow" .size=${16}></bd-star-icon>`,
      )}
    `
  }

  private _wreath(side: 'left' | 'right') {
    const raw = side === 'left' ? wreathLeftSvg : wreathRightSvg
    return html`<div class="wreath" aria-hidden="true">${unsafeHTML(raw)}</div>`
  }

  static styles = css`
    :host {
      display: inline-block;
    }

    .badge {
      display: flex;
      align-items: center;
      padding-right: 4px;
    }

    .side {
      flex-shrink: 0;
      margin-right: -4px;
      line-height: 0;
      color: var(--color-gray-light-mode-900);
    }

    .mid {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-xs);
      margin-right: -4px;
    }

    .stars {
      display: flex;
      gap: var(--spacing-xxs);
      align-items: start;
    }

    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      white-space: nowrap;
    }

    .title {
      margin: 0;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary-900);
    }

    .subtitle {
      margin: 0;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary-700);
    }

    .wreath {
      display: block;
      line-height: 0;
    }

    .wreath svg {
      display: block;
    }
  `
}
