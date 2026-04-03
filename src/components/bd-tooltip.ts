import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Arrow / beak position relative to the tooltip body (Figma **Tooltip** · `1052:489`).
 * `bottom-*` = triangle on the bottom edge (tooltip sits above the anchor).
 * `top-*` = triangle on the top edge (tooltip sits below the anchor).
 */
export type BdTooltipArrow =
  | 'none'
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'left'
  | 'right'

const DEFAULT_SUPPORTING =
  'Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text.'

/**
 * Tooltip panel (Figma **Tooltip** · `1052:489`): dark surface, text-xs, optional title + supporting copy, arrow variants.
 * Use with `bd-help-icon` or anchor your own trigger; this element is **presentational** (no positioning logic).
 *
 * @slot label - Overrides `label` for the title line (rich or single-line slot).
 * @slot - Rich mode: supporting copy. Simple mode: single line if `label` empty.
 *
 * @csspart root - Outer flex wrapper (includes arrow + body).
 * @csspart body - Text container.
 */
@customElement('bd-tooltip')
export class BdTooltip extends LitElement {
  @property({ reflect: true }) arrow: BdTooltipArrow = 'none'

  /** Rich tooltip: semibold title + medium supporting text. */
  @property({ type: Boolean, reflect: true }) rich = false

  @property({ reflect: true }) label = 'This is a tooltip'

  @property({ reflect: true }) description = DEFAULT_SUPPORTING

  render() {
    const body = this.rich
      ? html`
          <div class="body rich" part="body">
            <p class="title">
              <slot name="label">${this.label}</slot>
            </p>
            <p class="supporting"><slot>${this.description}</slot></p>
          </div>
        `
      : html`
          <div class="body simple" part="body">
            <p class="single">
              <slot name="label">${this.label}</slot>
            </p>
          </div>
        `

    switch (this.arrow) {
      case 'none':
        return html`<div class="root arrow-none ${this.rich ? 'is-rich' : 'is-simple'}" part="root">${body}</div>`
      case 'bottom-center':
        return html`
          <div class="root col arrow-bm ${this.rich ? 'is-rich' : 'is-simple'}" part="root">
            ${body}
            <div class="arrow ac-bottom-center" aria-hidden="true"></div>
          </div>
        `
      case 'bottom-left':
        return html`
          <div class="root col align-start arrow-bl ${this.rich ? 'is-rich' : 'is-simple'}" part="root">
            ${body}
            <div class="arrow ac-bottom-left" aria-hidden="true"></div>
          </div>
        `
      case 'bottom-right':
        return html`
          <div class="root col align-end arrow-br ${this.rich ? 'is-rich' : 'is-simple'}" part="root">
            ${body}
            <div class="arrow ac-bottom-right" aria-hidden="true"></div>
          </div>
        `
      case 'top-center':
        return html`
          <div class="root col arrow-tm ${this.rich ? 'is-rich' : 'is-simple'}" part="root">
            <div class="arrow ac-top-center" aria-hidden="true"></div>
            ${body}
          </div>
        `
      case 'left':
        return html`
          <div class="root row arrow-l ${this.rich ? 'is-rich' : 'is-simple'}" part="root">
            ${body}
            <div class="arrow ac-right" aria-hidden="true"></div>
          </div>
        `
      case 'right':
        return html`
          <div class="root row arrow-r ${this.rich ? 'is-rich' : 'is-simple'}" part="root">
            <div class="arrow ac-left" aria-hidden="true"></div>
            ${body}
          </div>
        `
      default:
        return html`<div class="root" part="root">${body}</div>`
    }
  }

  static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
      --bd-tooltip-bg: var(--color-gray-light-mode-950);
      --bd-tooltip-supporting: var(--color-gray-light-mode-300);
    }

    .root {
      position: relative;
      box-sizing: border-box;
      filter: drop-shadow(0 12px 16px rgba(10, 13, 18, 0.08))
        drop-shadow(0 4px 6px rgba(10, 13, 18, 0.03)) drop-shadow(0 2px 2px rgba(10, 13, 18, 0.04));
    }

    .root.col {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .root.col.align-start {
      align-items: flex-start;
    }

    .root.col.align-end {
      align-items: flex-end;
    }

    .root.row {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .root.arrow-none.is-simple {
      width: 112px;
    }

    .body {
      box-sizing: border-box;
      border-radius: var(--radius-md);
      background: var(--bd-tooltip-bg);
    }

    .body.simple {
      padding: var(--spacing-md) var(--spacing-lg);
    }

    .body.rich {
      padding: var(--spacing-lg);
      max-width: 296px;
      width: 296px;
    }

    .single {
      margin: 0;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
      font-weight: var(--font-weight-semibold);
      color: var(--color-base-white);
      text-align: center;
      white-space: nowrap;
    }

    .title {
      margin: 0 0 var(--spacing-xxs);
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
      font-weight: var(--font-weight-semibold);
      color: var(--color-base-white);
    }

    .supporting {
      margin: 0;
      font-family: var(--font-family-body);
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
      font-weight: var(--font-weight-medium);
      color: var(--bd-tooltip-supporting);
      white-space: pre-wrap;
    }

    /* Arrows: 16×6 horizontal, 6×16 vertical — same fill as panel */
    .arrow {
      flex-shrink: 0;
      background: var(--bd-tooltip-bg);
    }

    .ac-bottom-center {
      width: 16px;
      height: 6px;
      clip-path: polygon(50% 100%, 0 0, 100% 0);
    }

    .ac-top-center {
      width: 16px;
      height: 6px;
      clip-path: polygon(50% 0, 0 100%, 100% 100%);
    }

    .ac-bottom-left {
      width: 16px;
      height: 6px;
      align-self: flex-start;
      margin-left: var(--spacing-lg);
      clip-path: polygon(50% 100%, 0 0, 100% 0);
    }

    .ac-bottom-right {
      width: 16px;
      height: 6px;
      align-self: flex-end;
      margin-right: var(--spacing-lg);
      clip-path: polygon(50% 100%, 0 0, 100% 0);
    }

    .ac-left {
      width: 6px;
      height: 16px;
      clip-path: polygon(100% 50%, 0 0, 0 100%);
    }

    .ac-right {
      width: 6px;
      height: 16px;
      clip-path: polygon(0 50%, 100% 0, 100% 100%);
    }
  `
}

const helpSvgDefault = html`<svg
  class="ico"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M8 14A6 6 0 108 2a6 6 0 000 12z"
    stroke="currentColor"
    stroke-width="1.33"
  />
  <path d="M8 11.333V8" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" />
  <path d="M8 5.333h.007" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" />
</svg>`

const helpSvgOpen = html`<svg
  class="ico"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M8 14A6 6 0 108 2a6 6 0 000 12z"
    stroke="var(--color-gray-light-mode-700)"
    stroke-width="1.33"
  />
  <path
    d="M8 11.333V8"
    stroke="var(--color-gray-light-mode-700)"
    stroke-width="1.33"
    stroke-linecap="round"
  />
  <path
    d="M8 5.333h.007"
    stroke="var(--color-gray-light-mode-700)"
    stroke-width="1.33"
    stroke-linecap="round"
  />
</svg>`

/** Maps help placement → tooltip arrow (Figma **Help icon** · `1054:13`). */
export type BdHelpIconPlacement =
  | 'top-no-arrow'
  | 'top-arrow'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'left'
  | 'right'

function placementToArrow(p: BdHelpIconPlacement): BdTooltipArrow {
  switch (p) {
    case 'top-no-arrow':
      return 'none'
    case 'top-arrow':
      return 'bottom-center'
    case 'top-left':
      return 'bottom-right'
    case 'top-right':
      return 'bottom-left'
    case 'bottom':
      return 'top-center'
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      return 'none'
  }
}

/**
 * Help circle trigger with hover/focus tooltip (Figma **Help icon** · `1054:13`).
 * `placement` maps to `bd-tooltip` arrows; `rich` adds supporting paragraph.
 *
 * @csspart trigger - The icon button.
 */
@customElement('bd-help-icon')
export class BdHelpIcon extends LitElement {
  @property({ reflect: true }) placement: BdHelpIconPlacement = 'top-no-arrow'

  @property({ type: Boolean, reflect: true }) rich = false

  @property({ reflect: true }) label = 'This is a tooltip'

  @property({ reflect: true }) description = DEFAULT_SUPPORTING

  /** Demo-only: show pointer cursor graphic (Figma marketing frame). Not for production. */
  @property({ type: Boolean, reflect: true }) demoCursor = false

  @property({ type: Boolean, reflect: true }) open = false

  /** Accessible name for the icon button (tooltip content is separate). */
  @property({ reflect: true }) labelTrigger = 'Help'

  private readonly _tipId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? `bd-help-tip-${crypto.randomUUID()}`
      : `bd-help-tip-${Math.random().toString(36).slice(2)}`

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('keydown', this._onKeydown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this._onKeydown)
  }

  private _onEnter() {
    this.open = true
  }

  private _onLeave() {
    this.open = false
  }

  private _onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) {
      e.stopPropagation()
      this.open = false
    }
  }

  render() {
    const arrow = placementToArrow(this.placement)

    return html`
      <div
        class="wrap"
        @mouseenter=${this._onEnter}
        @mouseleave=${this._onLeave}
        @focusin=${this._onEnter}
        @focusout=${this._onLeave}
      >
        <button
          type="button"
          class="trigger"
          part="trigger"
          aria-label=${this.labelTrigger}
          aria-describedby=${this.open ? this._tipId : nothing}
          aria-expanded=${this.open ? 'true' : 'false'}
        >
          ${this.open ? helpSvgOpen : helpSvgDefault}
        </button>
        ${this.demoCursor ? html`<span class="demo-cursor" aria-hidden="true"></span>` : nothing}
        ${
          this.open
            ? html`
              <div class="tip ${this.placement}" id=${this._tipId} role="tooltip">
                <bd-tooltip
                  arrow=${arrow}
                  ?rich=${this.rich}
                  label=${this.label}
                  description=${this.description}
                ></bd-tooltip>
              </div>
            `
            : nothing
        }
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    .wrap {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
    }

    .trigger {
      display: flex;
      width: 16px;
      height: 16px;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      margin: 0;
      background: none;
      cursor: help;
      color: var(--color-gray-light-mode-500);
      line-height: 0;
      border-radius: var(--radius-full);
    }

    .trigger:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }

    .trigger:hover {
      color: var(--color-gray-light-mode-700);
    }

    .ico {
      display: block;
    }

    .tip {
      position: absolute;
      z-index: 10000;
      pointer-events: none;
    }

    /* Position tooltip relative to 16px icon; small gap ~4px */
    .tip.top-no-arrow {
      bottom: calc(100% + 4px);
      left: 50%;
      transform: translateX(-50%);
    }

    .tip.top-arrow {
      bottom: calc(100% + 4px);
      left: 50%;
      transform: translateX(-50%);
    }

    .tip.top-left {
      bottom: calc(100% + 4px);
      right: -12px;
    }

    .tip.top-right {
      bottom: calc(100% + 4px);
      left: -12px;
    }

    .tip.bottom {
      top: calc(100% + 4px);
      left: 50%;
      transform: translateX(-50%);
    }

    .tip.left {
      top: 50%;
      right: calc(100% + 4px);
      transform: translateY(-50%);
    }

    .tip.right {
      top: 50%;
      left: calc(100% + 4px);
      transform: translateY(-50%);
    }

    .demo-cursor {
      position: absolute;
      bottom: -75%;
      left: 37.5%;
      width: 20px;
      height: 20px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23fff' stroke='%23000' stroke-opacity='0.2' d='M3 3l7 14 2-5 5-2L3 3z'/%3E%3C/svg%3E")
        center / contain no-repeat;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
      pointer-events: none;
    }
  `
}
