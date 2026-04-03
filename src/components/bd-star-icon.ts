import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { STAR_PATH_D } from './icons/star-shape.js'

let starClipUid = 0

/**
 * Figma **Star icon** (`1232:9`) — 20×20, fill 0–100% (step 10 in Figma), Yellow or Gray fill.
 *
 * @csspart root - 20×20 SVG box.
 */
export type BdStarIconColor = 'yellow' | 'gray'

@customElement('bd-star-icon')
export class BdStarIcon extends LitElement {
  /** Fill amount 0–100 (Figma uses 10% increments). */
  @property({ type: Number }) fill = 0

  @property({ reflect: true }) color: BdStarIconColor = 'yellow'

  @property({ attribute: 'label' }) label = ''

  private _clipId = `bd-star-clip-${++starClipUid}`

  render() {
    const f = Math.min(100, Math.max(0, this.fill))
    const w = (20 * f) / 100
    const accent =
      this.color === 'yellow' ? 'var(--color-warning-400)' : 'var(--color-gray-light-mode-900)'
    const track = 'var(--color-gray-light-mode-100)'

    return html`
      <div
        part="root"
        class="root"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <clipPath id=${this._clipId}>
              <rect x="0" y="0" width=${w} height="20" />
            </clipPath>
          </defs>
          <path d=${STAR_PATH_D} fill=${track} />
          <path d=${STAR_PATH_D} fill=${accent} clip-path="url(#${this._clipId})" />
        </svg>
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .root {
      width: 20px;
      height: 20px;
      line-height: 0;
    }
  `
}
