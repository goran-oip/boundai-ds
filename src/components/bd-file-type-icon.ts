import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Figma **File type icon** (`4916:411695`) — 40×40 “Simple / Image” style tile.
 *
 * - **`default`** — neutral document stroke, brand-blue image glyph.
 * - **`gray`** — single neutral palette.
 * - **`solid`** — filled surfaces (Figma “Solid”).
 *
 * @slot - Replace the entire 40×40 artwork (optional).
 *
 * @csspart root - Outer 40×40 box.
 */
export type BdFileTypeIconAppearance = 'default' | 'gray' | 'solid'

@customElement('bd-file-type-icon')
export class BdFileTypeIcon extends LitElement {
  @property({ reflect: true }) appearance: BdFileTypeIconAppearance = 'default'

  /** Accessible name, e.g. “PNG file”. */
  @property({ attribute: 'label' }) label = ''

  render() {
    return html`
      <div
        part="root"
        class="root ${this.appearance}"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <slot>${this._defaultSvg()}</slot>
      </div>
    `
  }

  private _defaultSvg() {
    const a = this.appearance
    const doc = a === 'gray' ? 'var(--color-gray-light-mode-600)' : 'var(--color-border-primary)'
    const accent =
      a === 'gray' ? 'var(--color-gray-light-mode-600)' : 'var(--color-utility-brand-500)'
    const paper = a === 'solid' ? 'var(--color-bg-primary)' : 'transparent'

    return html`
      <svg
        class="svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M9 5.5h12.2L29 13.3V32.5c0 1.38-1.12 2.5-2.5 2.5h-15A2.5 2.5 0 0 1 9 32.5v-27Z"
          stroke=${doc}
          stroke-width="1.5"
          stroke-linejoin="round"
          fill=${paper}
        />
        <path d="M21.2 5.5V13H29" stroke=${doc} stroke-width="1.5" stroke-linejoin="round" />
        ${
          a === 'solid'
            ? html`
              <path
                d="M13 24.5 16 27.5 23 20"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="23.5" cy="18.5" r="1.8" fill="white" />
              <path
                d="M12 29h14l-3-5-3.5 3.5L17 22l-5 7Z"
                fill=${accent}
                stroke="none"
              />
            `
            : html`
              <path
                d="M13 24.5 16 27.5 23 20"
                stroke=${accent}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="23.5" cy="18.5" r="1.6" stroke=${accent} stroke-width="1.3" fill="none" />
              <path
                d="M12 29h14l-3-5-3.5 3.5L17 22l-5 7Z"
                stroke=${accent}
                stroke-width="1.4"
                stroke-linejoin="round"
                fill="none"
              />
            `
        }
      </svg>
    `
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .root {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
    }

    .svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `
}
