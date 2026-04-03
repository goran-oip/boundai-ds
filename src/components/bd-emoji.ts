import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * Figma **Emoji** (`1244:296`) — miscellaneous reaction glyphs. Default uses **Unicode** emoji
 * (Figma uses raster artwork; swap via **`src`** for pixel-perfect assets).
 *
 * @csspart root - 16×16 alignment box.
 */
export type BdEmojiName =
  | 'heart-red'
  | 'heart-orange'
  | 'heart-yellow'
  | 'heart-green'
  | 'heart-blue'
  | 'heart-purple'
  | 'heart-brown'
  | 'heart-black'
  | 'heart-white'
  | 'thumbs-up'
  | 'thumbs-down'
  | 'shakas'
  | 'okay'
  | 'eyes'
  | 'smile'
  | 'slight-smile'
  | 'hug'
  | 'wink'
  | 'sweat-smile'

const GLYPH: Record<BdEmojiName, string> = {
  'heart-red': '❤️',
  'heart-orange': '🧡',
  'heart-yellow': '💛',
  'heart-green': '💚',
  'heart-blue': '💙',
  'heart-purple': '💜',
  'heart-brown': '🤎',
  'heart-black': '🖤',
  'heart-white': '🤍',
  'thumbs-up': '👍',
  'thumbs-down': '👎',
  shakas: '🤙',
  okay: '👌',
  eyes: '👀',
  smile: '😊',
  'slight-smile': '🙂',
  hug: '🤗',
  wink: '😉',
  'sweat-smile': '😅',
}

@customElement('bd-emoji')
export class BdEmoji extends LitElement {
  @property({ reflect: true }) name: BdEmojiName = 'heart-red'

  /** Optional raster URL to replace the Unicode glyph. */
  @property() src = ''

  @property({ attribute: 'label' }) label = ''

  render() {
    const g = GLYPH[this.name] ?? '❤️'

    return html`
      <span
        part="root"
        class="root"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        ${
          this.src
            ? html`<img class="img" alt="" src=${this.src} width="16" height="16" />`
            : html`<span class="glyph" aria-hidden="true">${g}</span>`
        }
      </span>
    `
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .root {
      display: inline-flex;
      width: 16px;
      height: 16px;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }

    .glyph {
      font-size: 16px;
    }

    .img {
      display: block;
      width: 16px;
      height: 16px;
      object-fit: cover;
    }
  `
}
