import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import {
  FILE_TYPE_GLYPHS,
  FILE_TYPE_PAGE_GRAY,
  FILE_TYPE_PAGE_OUTLINE,
} from './bd-file-type-icon-assets.js'
import {
  type BdFileTypeIconKind,
  type BdFileTypeIconSpec,
  FILE_TYPE_SOLID_PAGE_FILL,
  FILE_TYPE_SPECS,
} from './bd-file-type-icon-catalog.js'

/**
 * Figma **File type icon** (`4916:411695`) — 40×40 document tiles: **Simple** / **Default** pictograms,
 * **Image** / **Document** / … extension pills, three **appearances** (outline / gray / solid).
 *
 * Set **`file-type`** to a catalog slug (e.g. `image-png`, `document-pdf`, `simple-image`). If omitted, **`default-image`** is used (prior default artwork).
 *
 * @slot - Replace the entire 40×40 artwork (optional).
 *
 * @csspart root - Outer 40×40 box.
 */
export type BdFileTypeIconAppearance = 'default' | 'gray' | 'solid'

@customElement('bd-file-type-icon')
export class BdFileTypeIcon extends LitElement {
  @property({ reflect: true }) appearance: BdFileTypeIconAppearance = 'default'

  /**
   * Catalog key: `image-jpg`, `simple-folder`, `default-code`, `document-pdf`, …
   * Omit → `default-image` (Figma “Default / Image”).
   */
  @property({ attribute: 'file-type' }) fileType: BdFileTypeIconKind | '' = ''

  /** Accessible name, e.g. “PNG file”. */
  @property({ attribute: 'label' }) label = ''

  render() {
    const kind = (this.fileType || 'default-image') as BdFileTypeIconKind
    const spec = FILE_TYPE_SPECS[kind]
    return html`
      <div
        part="root"
        class="root"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <slot>${this._renderBuiltIn(spec)}</slot>
      </div>
    `
  }

  private _renderBuiltIn(spec: BdFileTypeIconSpec) {
    const a = this.appearance
    const solidFill = FILE_TYPE_SOLID_PAGE_FILL[spec.solidPage]

    return html`
      <div class="frame">
        <div class="page-layer ${this._pageClass(spec)}">${this._renderPage(a, solidFill)}</div>
        ${this._renderOverlay(spec)}
      </div>
    `
  }

  /** Extension + outline row uses the narrow page frame; gray/solid use 10% inset like Figma. */
  private _pageClass(spec: BdFileTypeIconSpec): string {
    if (spec.mode === 'extension' && this.appearance === 'default') return 'page-narrow'
    return 'page-full'
  }

  private _renderPage(a: BdFileTypeIconAppearance, solidFill: string) {
    if (a === 'gray') return html`<div class="page-svg">${unsafeHTML(FILE_TYPE_PAGE_GRAY)}</div>`
    if (a === 'solid')
      return html`<div class="page-svg page-solid" style="color:${solidFill}">${this._solidPageSvg()}</div>`
    return html`<div class="page-svg">${unsafeHTML(FILE_TYPE_PAGE_OUTLINE)}</div>`
  }

  private _solidPageSvg() {
    return html`
      <svg width="100%" height="100%" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M0 4C0 1.79086 1.79086 0 4 0H20L32 12V36C32 38.2091 30.2091 40 28 40H4C1.79086 40 0 38.2091 0 36V4Z"
          fill="currentColor"
        />
        <path opacity="0.3" d="M20 0L32 12H24C21.7909 12 20 10.2091 20 8V0Z" fill="white" />
      </svg>
    `
  }

  private _renderOverlay(spec: BdFileTypeIconSpec) {
    const a = this.appearance
    if (spec.mode === 'empty') return nothing

    if (spec.mode === 'extension') {
      if (a === 'default') {
        if (spec.docBadge) {
          return html`
            <div class="badge badge--doc" style="background:${spec.defaultBadgeBg}">
              <span class="badge-text">${spec.label}</span>
            </div>
          `
        }
        const { t, r, b, l } = spec.badgeInset
        return html`
          <div
            class="badge"
            style="background:${spec.defaultBadgeBg};top:${t}%;right:${r}%;bottom:${b}%;left:${l}%;"
          >
            <span class="badge-text">${spec.label}</span>
          </div>
        `
      }
      return html`<div class="ext-label ${a === 'solid' ? 'is-solid' : ''}">${spec.label}</div>`
    }

    if (spec.mode === 'glyph') {
      const slot = a === 'default' ? 'default' : a === 'gray' ? 'gray' : 'solid'
      const key = spec.glyphs[slot]
      const raw = FILE_TYPE_GLYPHS[key]
      return html`
        <div class="glyph-wrap glyph-wrap--${spec.glyphRow}">${unsafeHTML(raw)}</div>
      `
    }

    return nothing
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

    .frame {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .page-layer {
      position: absolute;
      z-index: 0;
    }

    .page-layer.page-full {
      inset: 0 10%;
    }

    .page-layer.page-narrow {
      inset: 0 2.5% 0 17.5%;
    }

    .page-svg {
      width: 100%;
      height: 100%;
      line-height: 0;
    }

    .page-svg :global(svg) {
      display: block;
      width: 100%;
      height: 100%;
    }

    .page-solid :global(svg) {
      overflow: visible;
    }

    .badge {
      position: absolute;
      z-index: 1;
      box-sizing: border-box;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 2px 3px;
      border-radius: 2px;
    }

    .badge--doc {
      top: 45%;
      bottom: 15%;
      left: 2.5%;
      right: 25%;
    }

    .badge-text {
      font-family: var(--font-family-body);
      font-size: 10px;
      font-weight: var(--font-weight-bold);
      line-height: normal;
      color: var(--color-base-white);
      text-align: center;
      white-space: nowrap;
    }

    .ext-label {
      position: absolute;
      z-index: 1;
      top: 57.5%;
      left: 10%;
      right: 10%;
      bottom: 15%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      font-family: var(--font-family-body);
      font-size: 9px;
      font-weight: var(--font-weight-bold);
      line-height: normal;
      text-align: center;
      color: var(--color-text-secondary-700);
    }

    .ext-label.is-solid {
      color: var(--color-base-white);
    }

    .glyph-wrap {
      position: absolute;
      z-index: 1;
      pointer-events: none;
    }

    .glyph-wrap--simple {
      inset: 37.5% 27.5% 17.5% 27.5%;
    }

    .glyph-wrap--default {
      inset: 40% 30% 20% 30%;
    }

    .glyph-wrap :global(svg) {
      display: block;
      width: 100%;
      height: 100%;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-file-type-icon': BdFileTypeIcon
  }
}

export type { BdFileTypeIconKind, BdFileTypeSolidPageId } from './bd-file-type-icon-catalog.js'
