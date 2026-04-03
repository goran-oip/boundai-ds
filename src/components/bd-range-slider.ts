import { css, html, LitElement, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { createRef, ref } from 'lit/directives/ref.js'

let _sliderGroupId = 0

/**
 * Value label placement (Figma **Slider** · `1086:534`).
 * - `none` — track + handles only
 * - `bottom` — text-md under each thumb (centered; right thumb aligns end when near 100%)
 * - `top-floating` — white tooltip + shadow-lg above each thumb
 */
export type BdRangeSliderLabel = 'none' | 'bottom' | 'top-floating'

/**
 * Dual-thumb range control (Figma **Slider** · `1086:534`).
 * Track gray-200, selected range blue (`--color-text-brand-tertiary-600`), 24px circular thumbs with shadow-md.
 *
 * @csspart track - Hit area / track background.
 * @csspart range - Filled segment between thumbs.
 * @csspart thumb-low - Start thumb.
 * @csspart thumb-high - End thumb.
 *
 * @fires bd-input - `detail: { valueLow: number, valueHigh: number }` while dragging or adjusting.
 * @fires bd-change - Same detail on pointer/keyboard commit (pointerup, keyup).
 */
@customElement('bd-range-slider')
export class BdRangeSlider extends LitElement {
  @property({ type: Number }) min = 0

  @property({ type: Number }) max = 100

  @property({ type: Number }) step = 1

  @property({ type: Number, attribute: 'value-low' }) valueLow = 0

  @property({ type: Number, attribute: 'value-high' }) valueHigh = 100

  @property({ reflect: true }) label: BdRangeSliderLabel = 'none'

  @property({ type: Boolean, reflect: true }) disabled = false

  /** Accessible name for the range group. */
  @property({ reflect: true }) ariaLabel = 'Range'

  @state() private _drag: 'low' | 'high' | null = null

  private readonly _gid = `bd-rs-${++_sliderGroupId}`
  private readonly _trackRef = createRef<HTMLDivElement>()

  updated(changed: Map<string, unknown>) {
    super.updated(changed)
    if (
      changed.has('valueLow') ||
      changed.has('valueHigh') ||
      changed.has('min') ||
      changed.has('max')
    ) {
      this._normalizeValues()
    }
  }

  private _normalizeValues() {
    const lo = this._clampAndStep(this.valueLow)
    const hi = this._clampAndStep(this.valueHigh)
    let a = lo
    let b = hi
    if (a > b) [a, b] = [b, a]
    if (a !== this.valueLow || b !== this.valueHigh) {
      this.valueLow = a
      this.valueHigh = b
    }
  }

  private _clampAndStep(v: number): number {
    const s = this.step > 0 ? this.step : 1
    const mn = Math.min(this.min, this.max)
    const mx = Math.max(this.min, this.max)
    const r = Math.round((v - mn) / s) * s + mn
    return Math.min(mx, Math.max(mn, r))
  }

  private get _span(): number {
    return Math.max(0.0001, this.max - this.min)
  }

  private _toPct(v: number): number {
    return ((v - this.min) / this._span) * 100
  }

  private _fromPct(pct: number): number {
    return this.min + (pct / 100) * this._span
  }

  private _formatPct(v: number): string {
    return `${Math.round(this._toPct(v))}%`
  }

  private _valueFromClientX(clientX: number): number {
    const el = this._trackRef.value
    if (!el) return this.min
    const r = el.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100))
    return this._clampAndStep(this._fromPct(pct))
  }

  private _nearestThumb(val: number): 'low' | 'high' {
    const dL = Math.abs(val - this.valueLow)
    const dH = Math.abs(val - this.valueHigh)
    if (dL === dH) return val < this.valueLow ? 'low' : 'high'
    return dL < dH ? 'low' : 'high'
  }

  private _onTrackDown(e: PointerEvent) {
    if (this.disabled || e.button !== 0) return
    const v = this._valueFromClientX(e.clientX)
    const thumb = this._nearestThumb(v)
    if (thumb === 'low') {
      this.valueLow = Math.min(v, this.valueHigh)
    } else {
      this.valueHigh = Math.max(v, this.valueLow)
    }
    this._emitInput()
    this._drag = thumb
    this._trackRef.value?.setPointerCapture(e.pointerId)
    window.addEventListener('pointermove', this._onWindowMove)
    window.addEventListener('pointerup', this._onWindowUp)
  }

  private _onThumbDown(which: 'low' | 'high', e: PointerEvent) {
    if (this.disabled || e.button !== 0) return
    e.stopPropagation()
    this._drag = which
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    window.addEventListener('pointermove', this._onWindowMove)
    window.addEventListener('pointerup', this._onWindowUp)
  }

  private _onWindowMove = (e: PointerEvent) => {
    if (!this._drag) return
    const v = this._valueFromClientX(e.clientX)
    if (this._drag === 'low') {
      this.valueLow = this._clampAndStep(Math.min(v, this.valueHigh))
    } else {
      this.valueHigh = this._clampAndStep(Math.max(v, this.valueLow))
    }
    this._emitInput()
  }

  private _onWindowUp = () => {
    if (this._drag) {
      this._drag = null
      this._emitChange()
    }
    window.removeEventListener('pointermove', this._onWindowMove)
    window.removeEventListener('pointerup', this._onWindowUp)
  }

  private _onKey(which: 'low' | 'high', e: KeyboardEvent) {
    if (this.disabled) return
    const s = this.step > 0 ? this.step : 1
    let handled = true
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      if (which === 'low') this.valueLow = this._clampAndStep(this.valueLow - s)
      else this.valueHigh = this._clampAndStep(this.valueHigh - s)
      if (this.valueLow > this.valueHigh) {
        if (which === 'low') this.valueLow = this.valueHigh
        else this.valueHigh = this.valueLow
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      if (which === 'low') this.valueLow = this._clampAndStep(this.valueLow + s)
      else this.valueHigh = this._clampAndStep(this.valueHigh + s)
      if (this.valueLow > this.valueHigh) {
        if (which === 'low') this.valueLow = this.valueHigh
        else this.valueHigh = this.valueLow
      }
    } else if (e.key === 'Home') {
      if (which === 'low') this.valueLow = this.min
      else this.valueHigh = this.min
    } else if (e.key === 'End') {
      if (which === 'low') this.valueLow = this.max
      else this.valueHigh = this.max
    } else {
      handled = false
    }
    if (handled) {
      e.preventDefault()
      this._normalizeValues()
      this._emitInput()
      this._emitChange()
    }
  }

  private _emitInput() {
    this.dispatchEvent(
      new CustomEvent('bd-input', {
        bubbles: true,
        composed: true,
        detail: { valueLow: this.valueLow, valueHigh: this.valueHigh },
      }),
    )
  }

  private _emitChange() {
    this.dispatchEvent(
      new CustomEvent('bd-change', {
        bubbles: true,
        composed: true,
        detail: { valueLow: this.valueLow, valueHigh: this.valueHigh },
      }),
    )
  }

  render() {
    const pL = this._toPct(this.valueLow)
    const pH = this._toPct(this.valueHigh)
    const w = Math.max(0, pH - pL)
    const float = this.label === 'top-floating'
    const bottom = this.label === 'bottom'

    return html`
      <div
        class="host-inner ${float ? 'has-float' : ''} ${bottom ? 'has-bottom' : ''}"
        style=${this.disabled ? 'opacity:0.5;pointer-events:none;' : ''}
      >
        <div
          id=${this._gid}
          class="track"
          part="track"
          role="group"
          aria-label=${this.ariaLabel || nothing}
        >
          <div
            class="track-hit"
            ${ref(this._trackRef)}
            @pointerdown=${this._onTrackDown}
          >
            <div class="track-bg" aria-hidden="true"></div>
            <div
              part="range"
              class="range"
              style=${`left:${pL}%;width:${w}%;`}
              aria-hidden="true"
            ></div>
            ${this._thumb('low', pL, this._formatPct(this.valueLow), `${this._gid}-low`)}
            ${this._thumb('high', pH, this._formatPct(this.valueHigh), `${this._gid}-high`)}
          </div>
        </div>
      </div>
    `
  }

  private _thumb(which: 'low' | 'high', pct: number, label: string, sid: string) {
    const part = which === 'low' ? 'thumb-low' : 'thumb-high'
    const float = this.label === 'top-floating'
    const bottom = this.label === 'bottom'
    const edgeRight = which === 'high' && pct >= 98
    const edgeLeft = which === 'low' && pct <= 2

    return html`
      <div
        part=${part}
        class="thumb-wrap"
        style=${`left:${pct}%;`}
      >
        ${
          float
            ? html`
              <div class="float-tip" aria-hidden="true">
                <div class="float-inner">
                  <div class="float-bubble"><span class="float-text">${label}</span></div>
                  <div class="float-caret float-caret-down"></div>
                </div>
              </div>
            `
            : null
        }
        <button
          type="button"
          class="thumb-btn"
          id=${sid}
          role="slider"
          tabindex=${this.disabled ? -1 : 0}
          aria-valuemin=${this.min}
          aria-valuemax=${this.max}
          aria-valuenow=${which === 'low' ? this.valueLow : this.valueHigh}
          aria-valuetext=${label}
          aria-label=${which === 'low' ? 'Range start' : 'Range end'}
          ?disabled=${this.disabled}
          @pointerdown=${(e: PointerEvent) => this._onThumbDown(which, e)}
          @keydown=${(e: KeyboardEvent) => this._onKey(which, e)}
        >
          <span class="thumb-ring" aria-hidden="true"></span>
          <span class="thumb-face" aria-hidden="true"></span>
        </button>
        ${
          bottom
            ? html`
              <span
                class="lbl-bottom ${edgeRight ? 'is-end' : ''} ${edgeLeft ? 'is-start' : ''}"
                aria-hidden="true"
                >${label}</span
              >
            `
            : null
        }
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      --bd-rs-track: var(--color-gray-light-mode-200);
      --bd-rs-range: var(--color-text-brand-tertiary-600);
      --bd-rs-handle-border: var(--color-text-brand-tertiary-600);
      --bd-rs-float-border: rgba(0, 0, 0, 0.08);
      --bd-rs-float-shadow: var(--shadow-dropdown-panel);
      /* Figma shadow-md on handle */
      --bd-rs-thumb-shadow:
        0 4px 6px -1px rgba(10, 13, 18, 0.1), 0 2px 4px -2px rgba(10, 13, 18, 0.06);
    }

    .host-inner {
      position: relative;
      width: 100%;
    }

    .host-inner.has-float {
      padding-top: 44px;
    }

    .host-inner.has-bottom {
      padding-bottom: 28px;
    }

    .track {
      position: relative;
      width: 100%;
    }

    .track-hit {
      position: relative;
      height: 24px;
      cursor: pointer;
      touch-action: none;
    }

    .track-bg {
      position: absolute;
      left: 0;
      right: 0;
      top: 8px;
      height: 8px;
      border-radius: var(--radius-full);
      background: var(--bd-rs-track);
    }

    .range {
      position: absolute;
      top: 8px;
      height: 8px;
      border-radius: var(--radius-full);
      background: var(--bd-rs-range);
      pointer-events: none;
    }

    .thumb-wrap {
      position: absolute;
      top: 0;
      z-index: 2;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: none;
    }

    .thumb-btn {
      pointer-events: auto;
      position: relative;
      width: 24px;
      height: 24px;
      padding: 0;
      margin: 0;
      border: none;
      background: none;
      cursor: grab;
      border-radius: var(--radius-full);
    }

    .thumb-btn:active {
      cursor: grabbing;
    }

    .thumb-btn:focus-visible {
      outline: none;
    }

    .thumb-btn:focus-visible .thumb-ring {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }

    .thumb-ring {
      position: absolute;
      inset: 0;
      border-radius: 12px;
      border: 1.5px solid var(--bd-rs-handle-border);
      box-sizing: border-box;
    }

    .thumb-face {
      position: absolute;
      left: -1.5px;
      top: -1.5px;
      width: 24px;
      height: 24px;
      border-radius: var(--radius-full);
      background: var(--color-base-white);
      border: 2px solid var(--bd-rs-handle-border);
      box-sizing: border-box;
      box-shadow: var(--bd-rs-thumb-shadow);
    }

    .lbl-bottom {
      margin-top: 10px;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-medium);
      color: var(--color-gray-light-mode-900);
      white-space: nowrap;
      pointer-events: none;
    }

    .lbl-bottom.is-end {
      position: relative;
      left: 12px;
      transform: translateX(-100%);
      text-align: right;
    }

    .lbl-bottom.is-start {
      transform: translateX(0);
      margin-left: -12px;
    }

    /* Top tooltips */
    .float-tip {
      position: absolute;
      bottom: calc(100% + 4px);
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      width: max-content;
      min-width: 43px;
    }

    .float-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .float-bubble {
      box-sizing: border-box;
      padding: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--radius-md);
      background: var(--color-base-white);
      border: 1px solid var(--bd-rs-float-border);
      box-shadow: var(--bd-rs-float-shadow);
    }

    .float-text {
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
      font-weight: var(--font-weight-semibold);
      color: var(--color-gray-light-mode-700);
      white-space: nowrap;
    }

    .float-caret {
      width: 10px;
      height: 5px;
      margin-top: -1px;
      background: var(--color-base-white);
      border-left: 1px solid var(--bd-rs-float-border);
      border-right: 1px solid var(--bd-rs-float-border);
      clip-path: polygon(50% 100%, 0 0, 100% 0);
      filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.06));
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-range-slider': BdRangeSlider
  }
}
