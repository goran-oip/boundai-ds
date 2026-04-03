import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

let _toggleId = 0

export type BdToggleSize = 'sm' | 'md'
/** `default` — padded track + thumb (Figma **Default**). `slim` — thinner track, thumb border (Figma **Slim**). */
export type BdToggleVariant = 'default' | 'slim'

/**
 * Switch / toggle (Figma **Toggle** · node `1102:4208`).
 * ON state uses **blue** (`--color-brand-ui-600`); focus uses `--color-focus-ring`.
 *
 * @slot label - Primary line beside the control (paired with optional description).
 * @slot description - Supporting line under the label.
 *
 * @csspart control - The `<button role="switch">`.
 * @csspart track - The pill track behind the thumb.
 * @csspart thumb - The sliding thumb.
 *
 * @fires bd-change - `detail: { checked: boolean }` when the checked state changes.
 */
@customElement('bd-toggle')
export class BdToggle extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false

  @property({ type: Boolean, reflect: true }) disabled = false

  @property({ reflect: true }) size: BdToggleSize = 'md'

  @property({ reflect: true }) variant: BdToggleVariant = 'default'

  @property({ reflect: true }) label = ''

  @property({ reflect: true }) description = ''

  @property({ reflect: true, attribute: 'input-id' }) inputId = ''

  private readonly _fallbackId = `bd-toggle-${++_toggleId}`

  render() {
    const fieldId = this.inputId || this._fallbackId
    const hasCopy = Boolean(this.label || this.description)
    const labelId = `${fieldId}-label`
    const descId = `${fieldId}-description`

    return html`
      <div class="root ${hasCopy ? 'has-copy' : ''}">
        <div class="toggle-wrap ${this.variant === 'slim' && hasCopy ? 'slim-offset' : ''}">
          <button
            id=${fieldId}
            part="control"
            type="button"
            role="switch"
            aria-checked=${this.checked ? 'true' : 'false'}
            aria-labelledby=${hasCopy ? labelId : nothing}
            aria-describedby=${hasCopy && this.description ? descId : nothing}
            aria-label=${hasCopy ? nothing : 'Toggle'}
            ?disabled=${this.disabled}
            class="switch"
            @click=${this._toggle}
          >
            <span class="track" part="track">
              ${
                this.variant === 'slim'
                  ? html`<span class="track-border" aria-hidden="true"></span>`
                  : null
              }
              <span class="thumb" part="thumb"></span>
            </span>
          </button>
        </div>
        ${
          hasCopy
            ? html`<label class="copy" for=${fieldId}>
              <span id=${labelId} class="label-line"
                ><slot name="label">${this.label}</slot></span
              >
              <span id=${descId} class="desc-line"
                ><slot name="description">${this.description}</slot></span
              >
            </label>`
            : null
        }
      </div>
    `
  }

  private _toggle() {
    if (this.disabled) return
    this.checked = !this.checked
    this.dispatchEvent(
      new CustomEvent('bd-change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked },
      }),
    )
  }

  static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
      --bd-tw: 44px;
      --bd-th: 24px;
      --bd-thumb: 20px;
      --bd-tpad: 2px;
      --bd-travel: 20px;
    }

    :host([size='sm']) {
      --bd-tw: 36px;
      --bd-th: 20px;
      --bd-thumb: 16px;
      --bd-tpad: 2px;
      --bd-travel: 16px;
    }

    :host([variant='slim'][size='md']) {
      --bd-tw: 40px;
      --bd-th: 20px;
      --bd-thumb: 20px;
      --bd-tpad: 0px;
      --bd-travel: 20px;
    }

    :host([variant='slim'][size='sm']) {
      --bd-tw: 32px;
      --bd-th: 16px;
      --bd-thumb: 16px;
      --bd-tpad: 0px;
      --bd-travel: 16px;
    }

    .root {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--spacing-lg);
    }

    :host([size='sm']) .root.has-copy {
      gap: var(--spacing-md);
    }

    .toggle-wrap {
      flex-shrink: 0;
    }

    .toggle-wrap.slim-offset {
      padding-top: var(--spacing-xxs);
    }

    .switch {
      display: block;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: var(--radius-full);
      line-height: 0;
    }

    .switch:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }

    .switch:disabled {
      cursor: not-allowed;
    }

    .track {
      position: relative;
      display: flex;
      box-sizing: border-box;
      width: var(--bd-tw);
      height: var(--bd-th);
      align-items: center;
      padding: var(--bd-tpad);
      border-radius: var(--radius-full);
      background: var(--color-gray-light-mode-100);
      transition: background-color 0.2s ease;
    }

    :host([checked]:not([disabled])) .track {
      background: var(--color-brand-ui-600);
    }

    :host([checked]:not([disabled])) .switch:hover .track {
      background: var(--color-blue-dark-700);
    }

    :host(:not([checked]):not([disabled])) .switch:hover .track {
      background: var(--color-gray-light-mode-100);
    }

    :host([disabled]) .track {
      background: #f5f5f5;
    }

    .track-border {
      position: absolute;
      inset: 0;
      border: 1px solid var(--color-border-secondary);
      border-radius: var(--radius-full);
      pointer-events: none;
      transition: border-color 0.2s ease;
    }

    :host([variant='slim'][checked]:not([disabled])) .track-border {
      border-color: var(--color-brand-ui-600);
    }

    :host([variant='slim'][checked]:not([disabled])) .switch:hover .track-border {
      border-color: var(--color-blue-dark-700);
    }

    :host([variant='slim'][disabled]) .track-border {
      border-color: var(--color-border-disabled-subtle);
    }

    :host([variant='slim']) .thumb {
      border: 1px solid var(--color-border-primary);
      box-shadow: var(--shadow-button-xs);
    }

    :host([variant='slim'][checked]:not([disabled])) .thumb {
      border-color: var(--color-brand-ui-600);
    }

    :host([variant='slim'][checked]:not([disabled])) .switch:hover .thumb {
      border-color: var(--color-blue-dark-700);
    }

    .thumb {
      position: relative;
      z-index: 1;
      display: block;
      flex-shrink: 0;
      width: var(--bd-thumb);
      height: var(--bd-thumb);
      border-radius: var(--radius-full);
      background: var(--color-base-white);
      box-shadow: var(--shadow-toggle-thumb);
      transition:
        transform 0.2s ease,
        background-color 0.2s ease,
        border-color 0.2s ease;
      transform: translateX(0);
    }

    :host([checked]) .thumb {
      transform: translateX(var(--bd-travel));
    }

    :host([disabled]) .thumb {
      background: var(--color-gray-light-mode-50);
      box-shadow: var(--shadow-toggle-thumb);
      border: none;
    }

    :host([variant='slim'][disabled]) .thumb {
      border: 1px solid var(--color-border-primary);
      box-shadow: var(--shadow-button-xs);
    }

    .copy {
      display: flex;
      min-width: 0;
      flex: 1 1 auto;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-xxs);
      cursor: pointer;
      font-family: inherit;
    }

    :host([size='md']) .label-line {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary-700);
    }

    :host([size='sm']) .label-line {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary-700);
    }

    :host([size='md']) .desc-line {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-muted);
    }

    :host([size='sm']) .desc-line {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-muted);
    }

    .desc-line:empty {
      display: none;
    }
  `
}
