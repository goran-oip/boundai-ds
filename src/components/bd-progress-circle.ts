import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/** Figma **Progress circle** · `1084:2717` */
export type BdProgressCircleSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg'

/** Full ring (12 o’clock → clockwise) or 240° horseshoe arc (bottom). */
export type BdProgressCircleShape = 'circle' | 'half-circle'

const SIZE = {
  xxs: { dim: 64, stroke: 4, halfH: 35 },
  xs: { dim: 160, stroke: 8, halfH: 88 },
  sm: { dim: 200, stroke: 10, halfH: 110 },
  md: { dim: 240, stroke: 12, halfH: 132 },
  lg: { dim: 280, stroke: 14, halfH: 154 },
} as const

/** Normalized viewBox 0 0 100 100 — full circle centerline r=40 at (50,50). */
const FULL_C = 2 * Math.PI * 40

/**
 * 240° arc along bottom (gap at top). Endpoints use math angles (CCW from +x); y is SVG-down.
 * Center (50,50), r=40 in viewBox 0 0 100 100.
 */
function halfArcPath(): string {
  const cx = 50
  const cy = 50
  const r = 40
  const rad = Math.PI / 180
  const x1 = cx + r * Math.cos(150 * rad)
  const y1 = cy + r * Math.sin(150 * rad)
  const x2 = cx + r * Math.cos(30 * rad)
  const y2 = cy + r * Math.sin(30 * rad)
  /* large-arc 1, sweep 1 → long way round (240°) through bottom */
  return `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`
}

const HALF_ARC_LEN = (240 / 360) * 2 * Math.PI * 40

/**
 * Circular / horseshoe progress (Figma **Progress circle** · `1084:2717`).
 * Track gray-200, progress brand blue. Sizes xxs–lg; optional label + value.
 *
 * @csspart svg - Root SVG.
 * @csspart track - Background ring / arc.
 * @csspart progress - Value ring / arc.
 */
@customElement('bd-progress-circle')
export class BdProgressCircle extends LitElement {
  @property({ type: Number }) value = 0

  @property({ type: Number }) max = 100

  @property({ reflect: true }) size: BdProgressCircleSize = 'md'

  @property({ reflect: true }) shape: BdProgressCircleShape = 'circle'

  /** Show label line + large percentage (xxs: small “Users” below ring). */
  @property({ type: Boolean, reflect: true }) label = true

  /** Secondary line (e.g. “Active users” / “Users”). */
  @property({ reflect: true }) labelText = 'Active users'

  private get _pct(): number {
    const v = Number.isFinite(this.value) ? this.value : 0
    const m = this.max > 0 ? this.max : 100
    return Math.min(100, Math.max(0, (v / m) * 100))
  }

  private get _pctLabel(): string {
    return `${Math.round(this._pct)}%`
  }

  render() {
    const spec = SIZE[this.size]
    const pct = this._pct
    const isHalf = this.shape === 'half-circle'
    const w = isHalf ? spec.dim : spec.dim
    const h = isHalf ? spec.halfH : spec.dim
    const stroke = spec.stroke
    const vb = '0 0 100 100'

    const trackDash = isHalf ? `${HALF_ARC_LEN} ${HALF_ARC_LEN}` : `${FULL_C} ${FULL_C}`
    const progDash = trackDash
    const arcLen = isHalf ? HALF_ARC_LEN : FULL_C
    const offset = arcLen * (1 - pct / 100)
    const sw = (stroke / spec.dim) * 100

    const pathD = isHalf ? halfArcPath() : ''

    const svgContent = isHalf
      ? html`
          <svg part="svg" class="svg" viewBox=${vb} width=${w} height=${h} aria-hidden="true">
            <path
              part="track"
              class="ring track"
              d=${pathD}
              fill="none"
              stroke-width=${sw}
              stroke-dasharray=${trackDash}
              stroke-dashoffset="0"
            />
            <path
              part="progress"
              class="ring progress"
              d=${pathD}
              fill="none"
              stroke-width=${sw}
              stroke-dasharray=${progDash}
              stroke-dashoffset=${offset}
            />
          </svg>
        `
      : html`
          <svg part="svg" class="svg" viewBox=${vb} width=${w} height=${h} aria-hidden="true">
            <g transform="rotate(-90 50 50)">
              <circle
                part="track"
                class="ring track"
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke-width=${sw}
                stroke-dasharray=${trackDash}
                stroke-dashoffset="0"
              />
              <circle
                part="progress"
                class="ring progress"
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke-width=${sw}
                stroke-dasharray=${progDash}
                stroke-dashoffset=${offset}
              />
            </g>
          </svg>
        `

    /** Typographic scale per Figma */
    const labelClasses = this._labelClasses()
    const showXxsLayout = this.size === 'xxs'

    return html`
      <div
        class="root ${isHalf ? 'is-half' : 'is-full'} size-${this.size}"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${Math.round(pct)}
        aria-valuetext=${this._pctLabel}
        aria-label=${this.labelText || nothing}
      >
        ${
          showXxsLayout
            ? html`
              <div class="graphic graphic-xxs">
                ${svgContent}
                <span class="xxs-pct-inside" aria-hidden="true">${this._pctLabel}</span>
              </div>
              ${this.label ? html`<span class="xxs-caption">${this.labelText}</span>` : null}
            `
            : html`
              <div class="graphic">${svgContent}</div>
              ${
                this.label
                  ? isHalf
                    ? html`
                      <div class="labels below-half ${labelClasses.wrap}">
                        ${
                          this.size === 'md' || this.size === 'lg'
                            ? html`<span class="cap-sm">${this.labelText}</span>`
                            : html`<span class="cap-xs">${this.labelText}</span>`
                        }
                        <span class=${labelClasses.pct}>${this._pctLabel}</span>
                      </div>
                    `
                    : html`
                      <div class="labels stacked ${labelClasses.wrap}">
                        ${
                          this.size === 'md' || this.size === 'lg'
                            ? html`<span class="cap-sm">${this.labelText}</span>`
                            : html`<span class="cap-xs">${this.labelText}</span>`
                        }
                        <span class=${labelClasses.pct}>${this._pctLabel}</span>
                      </div>
                    `
                  : null
              }
            `
        }
      </div>
    `
  }

  private _labelClasses(): { wrap: string; pct: string } {
    switch (this.size) {
      case 'lg':
        return { wrap: 'pos-lg', pct: 'num-lg' }
      case 'md':
        return { wrap: 'pos-md', pct: 'num-md' }
      case 'sm':
        return { wrap: 'pos-sm', pct: 'num-sm' }
      case 'xs':
        return { wrap: 'pos-xs', pct: 'num-xs' }
      default:
        return { wrap: '', pct: '' }
    }
  }

  static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
      --bd-pc-track: var(--color-gray-light-mode-200);
      --bd-pc-fill: var(--color-text-brand-tertiary-600);
      --bd-pc-label: var(--color-gray-light-mode-600);
      --bd-pc-value: var(--color-gray-light-mode-900);
    }

    .root {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    .root.is-full {
      width: var(--bd-pc-dim);
      height: var(--bd-pc-dim);
    }

    .root.is-half {
      width: var(--bd-pc-w);
      height: var(--bd-pc-h);
    }

    .root.size-xxs {
      --bd-pc-dim: 64px;
      --bd-pc-w: 64px;
      --bd-pc-h: 35px;
    }

    .root.size-xs {
      --bd-pc-dim: 160px;
      --bd-pc-w: 160px;
      --bd-pc-h: 88px;
    }

    .root.size-sm {
      --bd-pc-dim: 200px;
      --bd-pc-w: 200px;
      --bd-pc-h: 110px;
    }

    .root.size-md {
      --bd-pc-dim: 240px;
      --bd-pc-w: 240px;
      --bd-pc-h: 132px;
    }

    .root.size-lg {
      --bd-pc-dim: 280px;
      --bd-pc-w: 280px;
      --bd-pc-h: 154px;
    }

    .graphic {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .root.is-full .graphic {
      width: var(--bd-pc-dim);
      height: var(--bd-pc-dim);
    }

    .root.is-half .graphic {
      width: var(--bd-pc-w);
      height: var(--bd-pc-h);
    }

    .svg {
      display: block;
      overflow: visible;
    }

    .ring {
      stroke: var(--bd-pc-track);
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .ring.progress {
      stroke: var(--bd-pc-fill);
    }

    .labels {
      text-align: center;
    }

    .labels.stacked {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      pointer-events: none;
    }

    .labels.below-half {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      margin-top: var(--spacing-sm);
      text-align: center;
    }

    .cap-sm {
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-medium);
      color: var(--bd-pc-label);
    }

    .cap-xs {
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
      font-weight: var(--font-weight-medium);
      color: var(--bd-pc-label);
    }

    .num-lg {
      font-family: var(--font-family-display);
      font-size: var(--font-size-display-lg);
      line-height: var(--line-height-display-lg);
      font-weight: var(--font-weight-semibold);
      letter-spacing: var(--letter-spacing-display-tight);
      color: var(--bd-pc-value);
    }

    .num-md {
      font-family: var(--font-family-display);
      font-size: var(--font-size-display-md);
      line-height: var(--line-height-display-md);
      font-weight: var(--font-weight-semibold);
      letter-spacing: var(--letter-spacing-display-tight);
      color: var(--bd-pc-value);
    }

    .num-sm {
      font-family: var(--font-family-display);
      font-size: var(--font-size-display-sm);
      line-height: var(--line-height-display-sm);
      font-weight: var(--font-weight-semibold);
      letter-spacing: var(--letter-spacing-display-tight);
      color: var(--bd-pc-value);
    }

    .num-xs {
      font-family: var(--font-family-display);
      font-size: var(--font-size-display-xs);
      line-height: var(--line-height-display-xs);
      font-weight: var(--font-weight-semibold);
      letter-spacing: var(--letter-spacing-display-tight);
      color: var(--bd-pc-value);
    }

    .graphic-xxs {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .xxs-pct-inside {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--bd-pc-value);
      pointer-events: none;
    }

    .root.is-half .graphic-xxs .xxs-pct-inside {
      top: calc(50% - 2px);
    }

    .xxs-caption {
      margin-top: var(--spacing-xs);
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
      font-weight: var(--font-weight-medium);
      color: var(--bd-pc-label);
      text-align: center;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-progress-circle': BdProgressCircle
  }
}
