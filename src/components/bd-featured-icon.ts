import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { featuredIconCheckLight, featuredIconCheckOnDark } from './icons/featured-icon-check.js'

/**
 * Figma **Featured icon** (`1102:5338`) — Light, Gradient, Dark, Modern, Modern neue.
 *
 * @slot icon - Replace the default check-circle glyph (use `slot="icon"`).
 *
 * @csspart root - Outer wrapper for the current variant.
 */
export type BdFeaturedIconVariant = 'light' | 'gradient' | 'dark' | 'modern' | 'modern-neue'
export type BdFeaturedIconColor = 'brand' | 'gray' | 'error' | 'warning' | 'success'
export type BdFeaturedIconSize = 'sm' | 'md' | 'lg' | 'xl'

type DimLight = { outer: number; icon: number; pad: number }
type DimDark = { outer: number; icon: number; pad: number; radius: string }
type DimGrad = { outer: number; br: number; center: number; icon: number }
type DimModernNeue = { outer: number; inner: number; icon: number; or: string; ir: string }

const LIGHT: Record<BdFeaturedIconSize, DimLight> = {
  sm: { outer: 32, icon: 16, pad: 8 },
  md: { outer: 40, icon: 20, pad: 10 },
  lg: { outer: 48, icon: 24, pad: 12 },
  xl: { outer: 56, icon: 28, pad: 14 },
}

const DARK: Record<BdFeaturedIconSize, DimDark> = {
  sm: { outer: 32, icon: 16, pad: 6, radius: 'var(--radius-sm)' },
  md: { outer: 40, icon: 20, pad: 8, radius: 'var(--radius-md)' },
  lg: { outer: 48, icon: 24, pad: 10, radius: 'var(--radius-lg)' },
  xl: { outer: 56, icon: 28, pad: 12, radius: 'var(--radius-xl)' },
}

const GRADIENT: Record<BdFeaturedIconSize, DimGrad> = {
  sm: { outer: 32, br: 16, center: 24, icon: 16 },
  md: { outer: 40, br: 20, center: 28, icon: 16 },
  lg: { outer: 48, br: 24, center: 32, icon: 20 },
  xl: { outer: 56, br: 28, center: 36, icon: 20 },
}

const MODERN: Record<BdFeaturedIconSize, DimLight & { radius: string }> = {
  sm: { outer: 32, icon: 16, pad: 8, radius: 'var(--radius-md)' },
  md: { outer: 40, icon: 20, pad: 8, radius: 'var(--radius-lg)' },
  lg: { outer: 48, icon: 24, pad: 10, radius: 'var(--radius-xl)' },
  xl: { outer: 56, icon: 28, pad: 13, radius: 'var(--spacing-lg)' },
}

const MODERN_NEUE: Record<BdFeaturedIconSize, DimModernNeue> = {
  sm: { outer: 32, inner: 24, icon: 16, or: 'var(--radius-md)', ir: 'var(--radius-xs)' },
  md: { outer: 40, inner: 32, icon: 20, or: 'var(--radius-lg)', ir: 'var(--radius-sm)' },
  lg: { outer: 48, inner: 40, icon: 24, or: 'var(--radius-xl)', ir: 'var(--radius-md)' },
  xl: { outer: 56, inner: 48, icon: 28, or: '14px', ir: 'var(--radius-lg)' },
}

function lightBg(c: BdFeaturedIconColor): string {
  switch (c) {
    case 'brand':
      return 'var(--color-utility-brand-100)'
    case 'gray':
      return 'var(--color-gray-light-mode-100)'
    case 'error':
      return 'var(--color-error-100)'
    case 'warning':
      return 'var(--color-warning-100)'
    case 'success':
      return 'var(--color-success-100)'
  }
}

function solidBg(c: BdFeaturedIconColor): string {
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

function lightIconColor(c: BdFeaturedIconColor): string {
  return solidBg(c)
}

@customElement('bd-featured-icon')
export class BdFeaturedIcon extends LitElement {
  @property({ reflect: true }) variant: BdFeaturedIconVariant = 'light'

  @property({ reflect: true }) color: BdFeaturedIconColor = 'brand'

  @property({ reflect: true }) size: BdFeaturedIconSize = 'md'

  /** Accessible name when the icon is meaningful on its own. */
  @property({ attribute: 'label' }) label = ''

  private _effectiveColor(): BdFeaturedIconColor {
    if (this.variant === 'modern' || this.variant === 'modern-neue') {
      return 'gray'
    }
    return this.color
  }

  render() {
    const ec = this._effectiveColor()
    switch (this.variant) {
      case 'light':
        return this._light(ec)
      case 'gradient':
        return this._gradient(ec)
      case 'dark':
        return this._dark(ec)
      case 'modern':
        return this._modern()
      case 'modern-neue':
        return this._modernNeue()
      default:
        return this._light(ec)
    }
  }

  private _light(c: BdFeaturedIconColor) {
    const d = LIGHT[this.size]
    return html`
      <div
        part="root"
        class="light"
        style="width:${d.outer}px;height:${d.outer}px;background:${lightBg(
          c,
        )};border-radius:var(--radius-full);"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <div
          class="light-icon"
          style="width:${d.icon}px;height:${d.icon}px;left:${d.pad}px;top:${d.pad}px;color:${lightIconColor(c)};"
        >
          <slot name="icon">${featuredIconCheckLight()}</slot>
        </div>
      </div>
    `
  }

  private _gradient(c: BdFeaturedIconColor) {
    const d = GRADIENT[this.size]
    const solid = solidBg(c)
    return html`
      <div
        part="root"
        class="gradient"
        style="width:${d.outer}px;height:${d.outer}px;border-radius:${d.br}px;--fi-solid:${solid};"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <div class="gradient-halo" aria-hidden="true"></div>
        <div
          class="gradient-center"
          style="width:${d.center}px;height:${d.center}px;background:${solid};"
        >
          <div class="gradient-icon" style="width:${d.icon}px;height:${d.icon}px;">
            <slot name="icon">${featuredIconCheckOnDark()}</slot>
          </div>
        </div>
      </div>
    `
  }

  private _dark(c: BdFeaturedIconColor) {
    const d = DARK[this.size]
    const bg = solidBg(c)
    return html`
      <div
        part="root"
        class="dark"
        style="width:${d.outer}px;height:${d.outer}px;border-radius:${d.radius};--dark-bg:${bg};"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <div class="dark-fill" aria-hidden="true"></div>
        <div
          class="dark-icon"
          style="width:${d.icon}px;height:${d.icon}px;left:${d.pad}px;top:${d.pad}px;"
        >
          <slot name="icon">${featuredIconCheckOnDark()}</slot>
        </div>
        <div class="dark-skeuo" aria-hidden="true"></div>
      </div>
    `
  }

  private _modern() {
    const d = MODERN[this.size]
    return html`
      <div
        part="root"
        class="modern"
        style="width:${d.outer}px;height:${d.outer}px;border-radius:${d.radius};"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <div class="modern-bg" aria-hidden="true"></div>
        <div
          class="modern-icon"
          style="width:${d.icon}px;height:${d.icon}px;left:${d.pad}px;top:${d.pad}px;color:var(--color-gray-light-mode-600);"
        >
          <slot name="icon">${featuredIconCheckLight()}</slot>
        </div>
        <div class="modern-skeuo" aria-hidden="true"></div>
      </div>
    `
  }

  private _modernNeue() {
    const d = MODERN_NEUE[this.size]
    return html`
      <div
        part="root"
        class="mneue"
        style="width:${d.outer}px;height:${d.outer}px;border-radius:${d.or};"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <div
          class="mneue-inner"
          style="width:${d.inner}px;height:${d.inner}px;border-radius:${d.ir};"
        >
          <div class="mneue-inner-bg" aria-hidden="true"></div>
          <div
            class="mneue-icon"
            style="width:${d.icon}px;height:${d.icon}px;color:var(--color-gray-light-mode-600);"
          >
            <slot name="icon">${featuredIconCheckLight()}</slot>
          </div>
          <div class="mneue-inner-shade" aria-hidden="true"></div>
        </div>
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .light {
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
    }

    .light-icon {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gradient {
      position: relative;
      box-sizing: border-box;
      overflow: visible;
    }

    .gradient-halo {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: radial-gradient(
        ellipse 72% 72% at 50% 50%,
        color-mix(in srgb, var(--fi-solid) 38%, #ffffff) 0%,
        color-mix(in srgb, var(--fi-solid) 14%, #ffffff) 44%,
        rgba(255, 255, 255, 0) 70%
      );
    }

    .gradient-center {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .gradient-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dark {
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      border: 2px solid rgba(255, 255, 255, 0.12);
      box-shadow: var(--shadow-xs);
    }

    .dark-fill {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--dark-bg);
      pointer-events: none;
    }

    .dark-icon {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .dark-skeuo {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      box-shadow: var(--shadow-button-skeuomorphic-inner);
    }

    .modern {
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      border: 1px solid var(--color-border-primary);
      box-shadow: var(--shadow-xs);
    }

    .modern-bg {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--color-bg-primary);
      pointer-events: none;
    }

    .modern-icon {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .modern-skeuo {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      box-shadow: var(--shadow-button-skeuomorphic-inner);
    }

    .mneue {
      position: relative;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--color-border-primary);
      background: var(--color-bg-primary);
    }

    .mneue-inner {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow:
        1px 8px 5px 0 rgba(10, 13, 18, 0.05),
        0 3px 3px 0 rgba(10, 13, 18, 0.1),
        0 1px 2px 0 rgba(10, 13, 18, 0.1);
    }

    .mneue-inner-bg {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--color-bg-primary);
      pointer-events: none;
    }

    .mneue-icon {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mneue-inner-shade {
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      pointer-events: none;
      box-shadow: inset 0 -2px 2px 0 rgba(10, 13, 18, 0.1);
    }
  `
}
