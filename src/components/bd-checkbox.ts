import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

let _cbId = 0

export type BdCheckboxSize = 'sm' | 'md'

const checkSvg = html`<svg
  width="12"
  height="12"
  viewBox="0 0 12 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M10 3L4.5 8.5L2 6"
    stroke="currentColor"
    stroke-width="1.67"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const minusSvg = html`<svg
  width="12"
  height="12"
  viewBox="0 0 12 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path d="M2 6h8" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" />
</svg>`

/**
 * Checkbox (Figma **Checkbox** · frame `1097:63652`).
 * Uses native `<input type="checkbox">` with a styled box; `indeterminate` maps to the DOM property.
 * Checked / indeterminate fills use **blue** (`--color-brand-ui-600`); focus uses `--color-focus-ring`.
 *
 * @slot label - Primary line beside the control.
 * @slot description - Supporting line under the label.
 *
 * @csspart box - Visual checkbox frame.
 *
 * @fires bd-change - `detail: { checked: boolean; indeterminate: boolean }` on change.
 */
@customElement('bd-checkbox')
export class BdCheckbox extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false

  @property({ type: Boolean, reflect: true }) indeterminate = false

  @property({ type: Boolean, reflect: true }) disabled = false

  @property({ reflect: true }) size: BdCheckboxSize = 'md'

  @property({ reflect: true }) label = ''

  @property({ reflect: true }) description = ''

  @property({ reflect: true, attribute: 'input-id' }) inputId = ''

  private readonly _fallbackId = `bd-cb-${++_cbId}`

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
          type="checkbox"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-checked=${this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false'}
          aria-labelledby=${hasCopy ? labelId : undefined}
          aria-describedby=${hasCopy && this.description ? descId : undefined}
          aria-label=${hasCopy ? undefined : 'Checkbox'}
          @change=${this._onChange}
        />
        <span
          class="box ${this.checked || this.indeterminate ? 'on' : ''} ${this.indeterminate ? 'indeterminate' : ''}"
          part="box"
          aria-hidden="true"
        >
          <span class="icon">
            ${this.indeterminate ? minusSvg : this.checked ? checkSvg : null}
          </span>
        </span>
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

  firstUpdated() {
    this._syncIndeterminate()
  }

  protected updated(changed: Map<PropertyKey, unknown>) {
    super.updated(changed)
    if (changed.has('indeterminate')) {
      this._syncIndeterminate()
    }
  }

  private _syncIndeterminate() {
    const input = this.renderRoot.querySelector('input') as HTMLInputElement | null
    if (input) {
      input.indeterminate = this.indeterminate
    }
  }

  private _onChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.checked = input.checked
    this.indeterminate = input.indeterminate
    this.dispatchEvent(
      new CustomEvent('bd-change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked, indeterminate: this.indeterminate },
      }),
    )
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
      display: inline-flex;
      flex-shrink: 0;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-sm);
      background: var(--color-bg-primary);
      color: var(--color-base-white);
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }

    :host([size='md']) .box {
      width: 20px;
      height: 20px;
      border-radius: var(--radius-sm);
    }

    :host([size='sm']) .box {
      width: 16px;
      height: 16px;
      border-radius: var(--radius-xs);
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

    .root:not(:has(.native:disabled)):hover .box.on {
      border-color: var(--color-blue-dark-700);
      background: var(--color-blue-dark-700);
    }

    .native:disabled + .box {
      border-color: var(--color-border-primary);
      background: var(--color-gray-light-mode-50);
    }

    .native:disabled + .box.on,
    .native:disabled + .box.indeterminate {
      border-color: var(--color-border-primary);
      background: var(--color-gray-light-mode-50);
    }

    .native:disabled + .box .icon {
      color: var(--color-gray-light-mode-500);
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    .box:not(.on):not(.indeterminate) .icon {
      display: none;
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
