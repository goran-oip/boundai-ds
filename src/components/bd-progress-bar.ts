import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Label placement (Figma **Progress bar** · `1085:57382`).
 * - `none` — track only
 * - `right` — percentage beside track (text-sm medium)
 * - `bottom` — percentage below track, end-aligned
 * - `top-floating` / `bottom-floating` — white tooltip + arrow follows fill end (shadow-lg)
 */
export type BdProgressBarLabel = 'none' | 'right' | 'bottom' | 'top-floating' | 'bottom-floating'

/**
 * Horizontal progress bar (Figma **Progress bar** · `1085:57382`).
 * Track `bg-quaternary`, fill `fg-brand-primary` (#7f56d9). Height 8px, pill caps.
 *
 * @csspart track - Full-width track background.
 * @csspart fill - Progress fill (width from `value`).
 */
@customElement('bd-progress-bar')
export class BdProgressBar extends LitElement {
  /** 0–`max`. */
  @property({ type: Number }) value = 0

  @property({ type: Number }) max = 100

  @property({ reflect: true }) label: BdProgressBarLabel = 'none'

  /** Optional accessible label (not shown). */
  @property({ reflect: true }) ariaLabel = ''

  private get _pct(): number {
    const v = Number.isFinite(this.value) ? this.value : 0
    const m = this.max > 0 ? this.max : 100
    return Math.min(100, Math.max(0, (v / m) * 100))
  }

  private get _labelText(): string {
    return `${Math.round(this._pct)}%`
  }

  render() {
    const pct = this._pct
    const floating = this.label === 'top-floating' || this.label === 'bottom-floating'

    const track = html`
      <div part="track" class="track" role="progressbar" aria-label=${this.ariaLabel || nothing} aria-valuemin="0"
        aria-valuemax="100" aria-valuenow=${Math.round(pct)}
        aria-valuetext=${this._labelText}
      >
        <div class="track-bg"></div>
        <div part="fill" class="fill" style=${`width: max(8px, ${pct}%);`}></div>
        ${
          floating
            ? html`
              <div class="float-tip" style=${`left: ${pct}%;`}>
                ${
                  this.label === 'top-floating'
                    ? html`
                      <div class="float-inner">
                        <div class="float-bubble">
                          <span class="float-text">${this._labelText}</span>
                        </div>
                        <div class="float-caret float-caret-down" aria-hidden="true"></div>
                      </div>
                    `
                    : html`
                      <div class="float-inner">
                        <div class="float-caret float-caret-up" aria-hidden="true"></div>
                        <div class="float-bubble">
                          <span class="float-text">${this._labelText}</span>
                        </div>
                      </div>
                    `
                }
              </div>
            `
            : null
        }
      </div>
    `

    if (this.label === 'right') {
      return html`
        <div class="layout layout-right">
          ${track}
          <span class="label-side" aria-hidden="true">${this._labelText}</span>
        </div>
      `
    }

    if (this.label === 'bottom') {
      return html`
        <div class="layout layout-bottom">
          ${track}
          <span class="label-bottom" aria-hidden="true">${this._labelText}</span>
        </div>
      `
    }

    if (floating) {
      return html`
        <div class="layout layout-float ${this.label === 'top-floating' ? 'has-pad-top' : 'has-pad-bottom'}">
          ${track}
        </div>
      `
    }

    return html`<div class="layout layout-plain">${track}</div>`
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      --bd-pb-track: var(--color-gray-light-mode-200);
      --bd-pb-fill: var(--color-text-brand-tertiary-600);
      --bd-pb-label: var(--color-gray-light-mode-700);
      --bd-pb-float-border: rgba(0, 0, 0, 0.08);
      --bd-pb-float-shadow: var(--shadow-dropdown-panel);
    }

    .layout {
      width: 100%;
    }

    .layout-right {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
    }

    .layout-right .track {
      flex: 1 1 auto;
      min-width: 0;
    }

    .layout-bottom {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--spacing-md);
    }

    .layout-float {
      position: relative;
    }

    .layout-float.has-pad-top {
      padding-top: 42px;
    }

    .layout-float.has-pad-bottom {
      padding-bottom: 42px;
    }

    .layout-plain .track,
    .layout-float .track {
      width: 100%;
    }

    .track {
      position: relative;
      height: 8px;
      border-radius: var(--radius-full);
    }

    .track-bg {
      position: absolute;
      inset: 0;
      border-radius: var(--radius-full);
      background: var(--bd-pb-track);
    }

    .fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 8px;
      border-radius: var(--radius-full);
      background: var(--bd-pb-fill);
      box-sizing: border-box;
    }

    .label-side,
    .label-bottom {
      flex-shrink: 0;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-medium);
      color: var(--bd-pb-label);
      white-space: nowrap;
    }

    /* Floating tooltip — Figma shadow-lg + border, text-xs semibold */
    .float-tip {
      position: absolute;
      z-index: 2;
      transform: translateX(-50%);
      pointer-events: none;
      width: max-content;
      min-width: 43px;
    }

    .layout-float.has-pad-top .float-tip {
      bottom: calc(100% + 4px);
    }

    .layout-float.has-pad-bottom .float-tip {
      top: calc(100% + 4px);
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
      border: 1px solid var(--bd-pb-float-border);
      box-shadow: var(--bd-pb-float-shadow);
    }

    .float-text {
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
      font-weight: var(--font-weight-semibold);
      color: var(--bd-pb-label);
      white-space: nowrap;
    }

    .float-caret {
      width: 10px;
      height: 5px;
      background: var(--color-base-white);
      border-left: 1px solid var(--bd-pb-float-border);
      border-right: 1px solid var(--bd-pb-float-border);
      box-sizing: border-box;
    }

    .float-caret-down {
      margin-top: -1px;
      clip-path: polygon(50% 100%, 0 0, 100% 0);
      filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.06));
    }

    .float-caret-up {
      margin-bottom: -1px;
      clip-path: polygon(50% 0, 0 100%, 100% 100%);
      filter: drop-shadow(0 -1px 0 rgba(0, 0, 0, 0.06));
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-progress-bar': BdProgressBar
  }
}
