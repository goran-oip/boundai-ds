import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import {
  type BdSocialIconName,
  SOCIAL_ICON_BODIES,
  SOCIAL_ICON_BRAND_HEX,
} from './icons/social-icon-data.js'

let uid = 0

/**
 * Figma **Social icons** (`1457:244804`) — 24×24 brand marks, **brand** (full color) or **gray**
 * (monochrome with default / hover tones).
 *
 * SVG paths from Simple Icons (see `social-icon-data.ts`). Discord / Framer “02” variants add
 * the filled plate from the Figma matrix (rounded square / circle) in **brand** mode.
 *
 * @csspart root - 24×24 alignment box.
 */
export type { BdSocialIconName } from './icons/social-icon-data.js'
export type BdSocialIconVariant = 'brand' | 'gray'
export type BdSocialIconState = 'default' | 'hover'

@customElement('bd-social-icon')
export class BdSocialIcon extends LitElement {
  @property({ reflect: true }) platform: BdSocialIconName = 'facebook'

  @property({ reflect: true }) variant: BdSocialIconVariant = 'brand'

  /** Gray style only: lighter default, darker on hover (matches Figma Gray + Hover). */
  @property({ reflect: true }) state: BdSocialIconState = 'default'

  @property({ attribute: 'label' }) label = ''

  private _igGradId = `bd-soc-ig-${++uid}`

  render() {
    const body = SOCIAL_ICON_BODIES[this.platform]
    if (!body) {
      return html``
    }

    const isBrand = this.variant === 'brand'

    if (isBrand && this.platform === 'instagram') {
      const pathOnly = body.replace('fill="currentColor"', `fill="url(#${this._igGradId})"`)
      return html`
        <div
          part="root"
          class="root is-instagram-brand"
          role=${this.label ? 'img' : nothing}
          aria-label=${this.label || nothing}
          aria-hidden=${this.label ? nothing : 'true'}
        >
          <svg
            class="svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id=${this._igGradId}
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stop-color="#f09433" />
                <stop offset="25%" stop-color="#e6683c" />
                <stop offset="50%" stop-color="#dc2743" />
                <stop offset="75%" stop-color="#cc2366" />
                <stop offset="100%" stop-color="#bc1888" />
              </linearGradient>
            </defs>
            ${unsafeHTML(pathOnly)}
          </svg>
        </div>
      `
    }

    const brandHex = SOCIAL_ICON_BRAND_HEX[this.platform]
    const brandColor = brandHex ? `#${brandHex}` : 'currentColor'

    const skipInlineBrandColor =
      isBrand &&
      (this.platform === 'discord-02' ||
        this.platform === 'framer-02' ||
        this.platform === 'snapchat')

    const rootStyle = isBrand && !skipInlineBrandColor ? `color:${brandColor}` : ''

    return html`
      <div
        part="root"
        class="root ${this._rootClass()}"
        style=${rootStyle || nothing}
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <svg
          class="svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          ${unsafeHTML(body)}
        </svg>
      </div>
    `
  }

  private _rootClass(): string {
    const p = this.platform
    const v = this.variant
    const classes: string[] = []
    if (p === 'discord-02' && v === 'brand') {
      classes.push('is-discord-plate')
    }
    if (p === 'framer-02' && v === 'brand') {
      classes.push('is-framer-plate')
    }
    if (p === 'snapchat' && v === 'brand') {
      classes.push('is-snapchat-brand')
    }
    return classes.join(' ')
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

    /* Gray: monochrome via currentColor */
    :host([variant='gray']) .root {
      color: var(--color-gray-light-mode-600);
      background: transparent !important;
      padding: 0 !important;
    }

    :host([variant='gray'][state='hover']) .root,
    :host([variant='gray']:hover) .root {
      color: var(--color-gray-light-mode-900);
    }

    :host([variant='brand']) .root.is-discord-plate {
      background: #5865f2;
      border-radius: 5px;
      padding: 2px;
    }

    :host([variant='brand']) .root.is-discord-plate .svg {
      color: #fff;
    }

    :host([variant='brand']) .root.is-framer-plate {
      background: #0055ff;
      border-radius: 50%;
      padding: 4px;
    }

    :host([variant='brand']) .root.is-framer-plate .svg {
      color: #fff;
    }

    :host([variant='brand']) .root.is-instagram-brand {
      background: transparent;
      padding: 0;
    }

    :host([variant='brand']) .root.is-snapchat-brand {
      background: #fffc00;
      border-radius: 6px;
      padding: 2px;
      color: #000;
    }
  `
}
