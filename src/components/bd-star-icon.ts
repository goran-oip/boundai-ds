import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { STAR_PATH_D, starClipWidthForFill } from './icons/star-shape.js'

let starClipUid = 0

/**
 * Figma **Star icon** (`1232:9`) — default 20×20; ratings badge uses 16×16 (`7460:133330`).
 * Fill 0–100% in 10% steps from Figma (`1232:9`); clip width matches `starClipWidthForFill` (not linear % of width).
 *
 * @csspart root - Square SVG box (`size` × `size`).
 */
export type BdStarIconColor = 'yellow' | 'gray'

@customElement('bd-star-icon')
export class BdStarIcon extends LitElement {
  /** Fill amount 0–100 (Figma: 0%, 10% … 100%; widths are stepped, not `fill%` of 20px). */
  @property({ type: Number }) fill = 0

  @property({ reflect: true }) color: BdStarIconColor = 'yellow'

  /** Rendered pixel size (Figma frame is 20×20; ratings badge stars are 16×16). */
  @property({ type: Number }) size = 20

  @property({ attribute: 'label' }) label = ''

  private _clipId = `bd-star-clip-${++starClipUid}`

  render() {
    const w = starClipWidthForFill(this.fill)
    const sz = Math.max(1, this.size)
    const accent =
      this.color === 'yellow' ? 'var(--color-warning-400)' : 'var(--color-gray-light-mode-900)'
    const track = 'var(--color-gray-light-mode-100)'

    return html`
      <div
        part="root"
        class="root"
        style="width:${sz}px;height:${sz}px"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <svg
          width=${sz}
          height=${sz}
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
      flex-shrink: 0;
      line-height: 0;
    }
  `
}
