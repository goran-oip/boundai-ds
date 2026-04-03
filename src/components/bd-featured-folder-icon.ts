import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Figma **Folder featured icon** (`7585:9240`) — brand, gray, or noise texture; open or closed.
 *
 * @csspart root - SVG wrapper sizing to 48px height (54px wide when `open`).
 */
export type BdFeaturedFolderIconVariant = 'brand' | 'gray' | 'noise'

let folderUid = 0

@customElement('bd-featured-folder-icon')
export class BdFeaturedFolderIcon extends LitElement {
  @property({ reflect: true }) variant: BdFeaturedFolderIconVariant = 'brand'

  @property({ type: Boolean, reflect: true }) open = false

  @property({ attribute: 'label' }) label = ''

  private _noiseId = `bd-folder-noise-${++folderUid}`

  render() {
    const back = this._back()
    const front = this._front()
    const noise = this.variant === 'noise'
    return html`
      <div
        part="root"
        class="wrap ${this.open ? 'is-open' : ''}"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <svg
          class="svg"
          viewBox=${this.open ? '0 0 54 48' : '0 0 48 48'}
          width=${this.open ? '54' : '48'}
          height="48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          ${
            noise
              ? html`
                <defs>
                  <filter id=${this._noiseId} x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="3" result="t" />
                    <feDisplacementMap in="SourceGraphic" in2="t" scale="1.2" />
                  </filter>
                </defs>
              `
              : nothing
          }
          ${
            this.open
              ? html`
                <path
                  d="M6 14c0-1.1.9-2 2-2h10l4 4h14c1.1 0 2 .9 2 2v4H6v-8Z"
                  fill=${back}
                />
                <path
                  d="M4 20h46l-4 22H8L4 20Z"
                  fill=${front}
                  stroke="rgba(255,255,255,0.12)"
                  stroke-width="1"
                  filter=${noise ? `url(#${this._noiseId})` : nothing}
                />
                <rect x="10" y="12" width="22" height="14" rx="2" fill="white" opacity="0.95" />
              `
              : html`
                <path
                  d="M6 14c0-1.1.9-2 2-2h10l4 4h14c1.1 0 2 .9 2 2v4H6v-8Z"
                  fill=${back}
                />
                <path
                  d="M6 18h36c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V18Z"
                  fill=${front}
                  stroke="rgba(255,255,255,0.12)"
                  stroke-width="1"
                  filter=${noise ? `url(#${this._noiseId})` : nothing}
                />
                <rect x="10" y="12" width="22" height="14" rx="2" fill="white" opacity="0.95" />
              `
          }
        </svg>
      </div>
    `
  }

  private _back(): string {
    switch (this.variant) {
      case 'brand':
        return '#53389e'
      case 'gray':
      case 'noise':
        return '#101828'
    }
  }

  private _front(): string {
    switch (this.variant) {
      case 'brand':
        return 'var(--color-utility-brand-600)'
      case 'gray':
      case 'noise':
        return 'var(--color-gray-light-mode-600)'
    }
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .wrap {
      display: block;
      line-height: 0;
    }

    .wrap.is-open {
      width: 54px;
    }

    .wrap:not(.is-open) {
      width: 48px;
    }

    .svg {
      display: block;
    }
  `
}
