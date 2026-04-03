import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { rewriteSvgIds } from '../utils/svg-id.js'
import { type BdCountryIconName, COUNTRY_ICON_BODIES } from './icons/country-icon-data.js'

let uid = 0

/**
 * Figma **Country icons** (`1107:70094`) — circular flags, 24×24 (circle-flags via Iconify).
 *
 * @csspart root - Alignment box for the flag.
 */
export type { BdCountryIconName } from './icons/country-icon-data.js'

const VIEW = '0 0 512 512'

@customElement('bd-country-icon')
export class BdCountryIcon extends LitElement {
  @property({ reflect: true }) country: BdCountryIconName = 'us'

  @property({ attribute: 'label' }) label = ''

  private _idPrefix = `bd-cf-${++uid}`

  render() {
    const raw = COUNTRY_ICON_BODIES[this.country]
    if (!raw) {
      return html``
    }
    const body = rewriteSvgIds(raw, this._idPrefix)
    return html`
      <div
        part="root"
        class="root"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <svg
          class="svg"
          width="24"
          height="24"
          viewBox=${VIEW}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          ${unsafeHTML(body)}
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
      display: inline-flex;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      line-height: 0;
      box-sizing: border-box;
    }

    .svg {
      display: block;
      width: 24px;
      height: 24px;
    }
  `
}
