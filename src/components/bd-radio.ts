import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

let _rbId = 0

export type BdRadioSize = 'sm' | 'md'

/**
 * Radio button (Figma **Radio** · frame `1097:63652`).
 * Uses native `<input type="radio">`; checked fill uses **blue** (`--color-brand-ui-600`); focus uses `--color-focus-ring`.
 *
 * @slot label - Primary line beside the control.
 * @slot description - Supporting line under the label.
 *
 * @csspart box - Visual radio frame.
 *
 * @fires bd-change - `detail: { checked: boolean }` when this radio becomes selected.
 */
@customElement('bd-radio')
export class BdRadio extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false

  @property({ type: Boolean, reflect: true }) disabled = false

  @property({ reflect: true }) size: BdRadioSize = 'md'

  @property({ reflect: true }) name = ''

  @property({ reflect: true }) value = ''

  @property({ reflect: true }) label = ''

  @property({ reflect: true }) description = ''

  @property({ reflect: true, attribute: 'input-id' }) inputId = ''

  private readonly _fallbackId = `bd-rb-${++_rbId}`

  private readonly _onDocChange = (e: Event) => {
    if (!this.name) return
    const radio = e
      .composedPath()
      .find((n): n is HTMLInputElement => n instanceof HTMLInputElement && n.type === 'radio')
    if (!radio || radio.name !== this.name) return
    const mine = this.renderRoot?.querySelector('input') as HTMLInputElement | null
    if (!mine) return
    if (mine.checked !== this.checked) {
      this.checked = mine.checked
    }
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('change', this._onDocChange)
  }

  disconnectedCallback() {
    document.removeEventListener('change', this._onDocChange)
    super.disconnectedCallback()
  }

  render() {
    const id = this.inputId || this._fallbackId
    const hasCopy = Boolean(this.label || this.description)
    const labelId = `${id}-label`
    const descId = `${id}-desc`

    return html`
      <label class="root ${hasCopy ? 'has-copy' : ''}" for=${id}>
        <input
          id=${id}
          class="native"
          type="radio"
          name=${this.name}
          value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-labelledby=${hasCopy ? labelId : undefined}
          aria-describedby=${hasCopy && this.description ? descId : undefined}
          aria-label=${hasCopy ? undefined : 'Radio'}
          @change=${this._onChange}
        />
        <span class="box ${this.checked ? 'on' : ''}" part="box" aria-hidden="true"></span>
        ${
          hasCopy
            ? html`<span class="texts">
              <span id=${labelId} class="label-line"><slot name="label">${this.label}</slot></span>
              <span id=${descId} class="desc-line"><slot name="description">${this.description}</slot></span>
            </span>`
            : null
        }
      </label>
    `
  }

  private _onChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.checked = input.checked
    if (this.checked) {
      this.dispatchEvent(
        new CustomEvent('bd-change', {
          bubbles: true,
          composed: true,
          detail: { checked: true },
        }),
      )
    }
  }

  static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    .root {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--spacing-lg);
      cursor: pointer;
      font-family: var(--font-family-body);
    }

    :host([size='sm']) .root.has-copy {
      gap: var(--spacing-md);
    }

    .native {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .root:has(.native:disabled) {
      cursor: not-allowed;
    }

    .box {
      position: relative;
      display: inline-block;
      flex-shrink: 0;
      box-sizing: border-box;
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-full);
      background: var(--color-bg-primary);
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }

    :host([size='md']) .box {
      width: 20px;
      height: 20px;
    }

    :host([size='sm']) .box {
      width: 16px;
      height: 16px;
    }

    .root.has-copy .box {
      margin-top: var(--spacing-xxs);
    }

    .root:has(.native:focus-visible) .box {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }

    .box.on {
      border-color: var(--color-brand-ui-600);
      background: var(--color-brand-ui-600);
    }

    .box.on::after {
      content: '';
      position: absolute;
      inset: 31.25%;
      border-radius: var(--radius-full);
      background: var(--color-base-white);
    }

    .root:not(:has(.native:disabled)):hover .box.on {
      border-color: var(--color-blue-dark-700);
      background: var(--color-blue-dark-700);
    }

    .native:disabled + .box {
      border-color: var(--color-border-primary);
      background: var(--color-gray-light-mode-50);
    }

    .native:disabled + .box.on {
      border-color: var(--color-border-primary);
      background: var(--color-gray-light-mode-50);
    }

    .native:disabled + .box.on::after {
      background: var(--color-gray-light-mode-500);
    }

    .texts {
      display: flex;
      min-width: 0;
      flex: 1 1 auto;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-xxs);
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
