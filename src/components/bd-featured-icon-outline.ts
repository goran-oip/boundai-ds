import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { featuredIconCheckLight } from './icons/featured-icon-check.js'

/**
 * Figma **Featured icon outline** (`4843:410985`) — concentric “ripple” rings + outlined check.
 *
 * Sizes match Figma: **sm** 16px, **md** 20px, **lg** 24px, **xl** 28px (outer box).
 *
 * @slot icon - Replace the default check glyph (`slot="icon"`).
 *
 * @csspart root - Positioning host for rings + icon.
 */
export type BdFeaturedIconOutlineColor = 'brand' | 'gray' | 'error' | 'warning' | 'success'
export type BdFeaturedIconOutlineSize = 'sm' | 'md' | 'lg' | 'xl'

const OUTLINE: Record<
  BdFeaturedIconOutlineSize,
  { px: number; innerInset: string; outerInset: string }
> = {
  sm: { px: 16, innerInset: '-25%', outerInset: '-56.25%' },
  md: { px: 20, innerInset: '-20%', outerInset: '-45%' },
  lg: { px: 24, innerInset: '-16.67%', outerInset: '-37.5%' },
  xl: { px: 28, innerInset: '-14.29%', outerInset: '-32.14%' },
}

function ringColor(c: BdFeaturedIconOutlineColor): string {
  switch (c) {
    case 'brand':
      return 'var(--color-utility-brand-600)'
    case 'gray':
      return 'var(--color-gray-light-mode-600)'
    case 'error':
      return 'var(--color-error-600)'
    case 'warning':
      return 'var(--color-warning-600)'
    case 'success':
      return 'var(--color-success-600)'
  }
}

@customElement('bd-featured-icon-outline')
export class BdFeaturedIconOutline extends LitElement {
  @property({ reflect: true }) color: BdFeaturedIconOutlineColor = 'brand'

  @property({ reflect: true }) size: BdFeaturedIconOutlineSize = 'sm'

  @property({ attribute: 'label' }) label = ''

  render() {
    const o = OUTLINE[this.size]
    const rc = ringColor(this.color)
    return html`
      <div
        part="root"
        class="host"
        style="width:${o.px}px;height:${o.px}px;--ring:${rc};--inner-inset:${o.innerInset};--outer-inset:${o.outerInset};color:${rc};"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <div class="ring outer" aria-hidden="true"></div>
        <div class="ring inner" aria-hidden="true"></div>
        <div class="icon">
          <slot name="icon">${featuredIconCheckLight()}</slot>
        </div>
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .host {
      position: relative;
      flex-shrink: 0;
      border-radius: var(--radius-full);
    }

    .ring {
      position: absolute;
      box-sizing: border-box;
      border: 2px solid var(--ring);
      border-radius: 50%;
      pointer-events: none;
    }

    .ring.outer {
      inset: var(--outer-inset);
      opacity: 0.1;
    }

    .ring.inner {
      inset: var(--inner-inset);
      opacity: 0.3;
    }

    .icon {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `
}
