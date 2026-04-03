import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import './bd-check-icon.js'
import type { BdCheckIconColor, BdCheckIconSize, BdCheckIconType } from './bd-check-icon.js'

/**
 * Figma **Check item text** (`1345:1610`) — check icon + body copy (feature lists, pricing).
 *
 * Typography: **Desktop** / **lg** → `text-lg`; **sm** or **md** on mobile → `text-md`.
 *
 * @slot - Label text (default slot).
 */
export type BdCheckItemBreakpoint = 'desktop' | 'mobile'

@customElement('bd-check-item')
export class BdCheckItem extends LitElement {
  @property({ reflect: true }) type: BdCheckIconType = 'default'

  /** Figma **Primary** maps to brand blue. */
  @property({ reflect: true }) color: BdCheckIconColor = 'brand'

  @property({ reflect: true }) size: BdCheckIconSize = 'sm'

  @property({ reflect: true }) breakpoint: BdCheckItemBreakpoint = 'desktop'

  render() {
    const mdText =
      this.size === 'sm' ||
      this.size === 'md' ||
      (this.size === 'lg' && this.breakpoint === 'mobile')

    return html`
      <div part="root" class="root">
        <bd-check-icon
          class="ico"
          type=${this.type}
          color=${this.color}
          size=${this._iconSize()}
        ></bd-check-icon>
        <div class="copy ${mdText ? 'is-md' : 'is-lg'}">
          <slot></slot>
        </div>
      </div>
    `
  }

  /** Map row size to icon size (Figma passes md to CheckIcon when lg+mobile or md). */
  private _iconSize(): BdCheckIconSize {
    if (this.size === 'lg' && this.breakpoint === 'mobile') {
      return 'md'
    }
    if (this.size === 'md') {
      return 'md'
    }
    if (this.size === 'lg') {
      return 'lg'
    }
    return this.size
  }

  static styles = css`
    :host {
      display: block;
    }

    .root {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-lg);
      max-width: 400px;
    }

    :host([breakpoint='mobile']) .root {
      max-width: 343px;
    }

    .ico {
      flex-shrink: 0;
    }

    .copy {
      flex: 1 1 auto;
      min-width: 0;
      margin: 0;
      font-family: var(--font-family-body);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-tertiary-600);
    }

    .copy.is-md {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }

    .copy.is-lg {
      font-size: var(--font-size-text-lg);
      line-height: var(--line-height-text-lg);
    }

    :host([size='lg'][breakpoint='desktop']) .copy {
      padding-top: var(--spacing-xxs);
    }
  `
}
