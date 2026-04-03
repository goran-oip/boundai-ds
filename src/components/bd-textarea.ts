import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

let _textareaId = 0

export type BdTextareaVariant = 'default' | 'tags'

const helpSvg = html`<svg
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
  <path
    d="M8 11.333V8"
    stroke="currentColor"
    stroke-width="1.33"
    stroke-linecap="round"
  />
  <path
    d="M8 5.333h.007"
    stroke="currentColor"
    stroke-width="1.33"
    stroke-linecap="round"
  />
</svg>`

const resizeGripSvg = html`<svg
  width="12"
  height="12"
  viewBox="0 0 12 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M10 2L2 10M6 10h4v4"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    opacity="0.45"
  />
</svg>`

/**
 * Multiline text field (Figma **TextArea Input Field** · node `1238:278`).
 * **`variant="default"`** — native `<textarea>` with label, hint / error, resize grip.
 * **`variant="tags"`** — chip area (`slot="tags"`) + inline text input for new tags.
 * Focus ring uses blue (`--color-interactive-accent`).
 *
 * @slot label - Overrides the `label` string.
 * @slot tags - Tag chips (`bd-tag`, etc.); only for `variant="tags"`.
 * @slot footer - Overrides hint / error line.
 *
 * @csspart field - Vertical stack.
 * @csspart surface - Bordered input region.
 * @csspart textarea - Native `<textarea>` (`variant="default"` only).
 * @csspart tag-input - Inline `<input>` (`variant="tags"`).
 *
 * @fires bd-input - `detail: { value: string }` on textarea/input input.
 * @fires bd-change - `detail: { value: string }` on textarea/input change.
 */
@customElement('bd-textarea')
export class BdTextarea extends LitElement {
  @property({ reflect: true }) variant: BdTextareaVariant = 'default'

  @property({ reflect: true }) label = ''

  @property({ reflect: true }) placeholder = ''

  @property({ reflect: true }) hint = ''

  /** Shown when `invalid` is true (below the field). */
  @property({ reflect: true, attribute: 'error-text' }) errorText = ''

  @property({ type: Boolean, reflect: true }) invalid = false

  @property({ type: Boolean, reflect: true }) required = false

  @property({ type: Boolean, reflect: true }) disabled = false

  @property({ type: Boolean, reflect: true, attribute: 'show-help' })
  showHelp = false

  /** Visible resize affordance (decorative; default variant uses native vertical resize). */
  @property({ type: Boolean, reflect: true, attribute: 'show-resize-handle' })
  showResizeHandle = true

  /** Bind to the native textarea. */
  @property({ reflect: true }) value = ''

  /** Placeholder for the tags variant inline input. */
  @property({ reflect: true, attribute: 'tag-input-placeholder' })
  tagInputPlaceholder = 'Add tags...'

  /** Minimum height of the input region (e.g. `120px`). */
  @property({ reflect: true, attribute: 'min-height' }) minHeight = '120px'

  @property({ type: Number }) rows = 4

  /** `id` on the textarea / tag input for label association; auto-generated when empty. */
  @property({ reflect: true, attribute: 'input-id' }) inputId = ''

  private readonly _fallbackId = `bd-textarea-${++_textareaId}`

  render() {
    const fieldId = this.inputId || this._fallbackId
    const footerText = this.invalid ? this.errorText : this.hint

    return html`
      <div class="field" part="field">
        <label class="label-row" for=${fieldId}>
          <span class="label-slot"><slot name="label">${this.label}</slot></span>
          ${this.required ? html`<span class="required" aria-hidden="true">*</span>` : null}
          ${this.showHelp ? html`<span class="help">${helpSvg}</span>` : null}
        </label>

        ${this.variant === 'default' ? this._renderDefault(fieldId) : this._renderTags(fieldId)}

        <p class="footer ${this.invalid ? 'is-error' : 'is-hint'}" part="footer">
          <slot name="footer">${footerText}</slot>
        </p>
      </div>
    `
  }

  private _renderDefault(fieldId: string) {
    return html`
      <div
        class="surface ${this.invalid ? 'invalid' : ''} ${this.disabled ? 'disabled' : ''}"
        part="surface"
      >
        <textarea
          id=${fieldId}
          part="textarea"
          rows=${this.rows}
          style=${`min-height: ${this.minHeight}`}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          .value=${this.value}
          @input=${this._onTextareaInput}
          @change=${this._onTextareaChange}
        ></textarea>
        ${
          this.showResizeHandle
            ? html`<span class="resize-grip" aria-hidden="true">${resizeGripSvg}</span>`
            : null
        }
      </div>
    `
  }

  private _renderTags(fieldId: string) {
    return html`
      <div
        class="surface tags ${this.invalid ? 'invalid' : ''} ${this.disabled ? 'disabled' : ''}"
        part="surface"
        style=${`min-height: ${this.minHeight}`}
      >
        <div class="tags-inner">
          <slot name="tags"></slot>
          <input
            id=${fieldId}
            part="tag-input"
            type="text"
            class="tag-input"
            placeholder=${this.tagInputPlaceholder}
            ?disabled=${this.disabled}
            @input=${this._onTagInput}
            @change=${this._onTagInputChange}
          />
        </div>
        ${
          this.showResizeHandle
            ? html`<span class="resize-grip" aria-hidden="true">${resizeGripSvg}</span>`
            : null
        }
      </div>
    `
  }

  private _emitInput(val: string) {
    this.dispatchEvent(
      new CustomEvent('bd-input', {
        bubbles: true,
        composed: true,
        detail: { value: val },
      }),
    )
  }

  private _emitChange(val: string) {
    this.dispatchEvent(
      new CustomEvent('bd-change', {
        bubbles: true,
        composed: true,
        detail: { value: val },
      }),
    )
  }

  private _onTextareaInput(e: Event) {
    const t = e.target as HTMLTextAreaElement
    this.value = t.value
    this._emitInput(this.value)
  }

  private _onTextareaChange(e: Event) {
    const t = e.target as HTMLTextAreaElement
    this.value = t.value
    this._emitChange(this.value)
  }

  private _onTagInput(e: Event) {
    const t = e.target as HTMLInputElement
    this._emitInput(t.value)
  }

  private _onTagInputChange(e: Event) {
    const t = e.target as HTMLInputElement
    this._emitChange(t.value)
  }

  protected updated(changed: Map<PropertyKey, unknown>) {
    super.updated(changed)
    if (changed.has('value') && this.variant === 'default') {
      const ta = this.renderRoot.querySelector('textarea')
      if (ta && ta.value !== this.value) ta.value = this.value
    }
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 320px;
      font-family: var(--font-family-body);
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      align-items: stretch;
    }

    .label-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-xxs);
    }

    .label-slot {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary-700);
    }

    .label-slot:empty {
      display: none;
    }

    .required {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-brand-tertiary-600);
    }

    .help {
      display: inline-flex;
      color: var(--color-gray-light-mode-500);
      line-height: 0;
    }

    .surface {
      position: relative;
      box-sizing: border-box;
      display: flex;
      width: 100%;
      align-items: stretch;
      padding: var(--spacing-lg) var(--spacing-14px);
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-md);
      background: var(--color-bg-primary);
      box-shadow: var(--shadow-button-xs);
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }

    .surface:not(.disabled):focus-within {
      border: 2px solid var(--color-interactive-accent);
      padding: var(--spacing-11px) var(--spacing-13px);
      outline: none;
    }

    .surface.invalid:not(.disabled) {
      border-color: var(--color-border-error-subtle);
    }

    .surface.invalid:not(.disabled):focus-within {
      border: 2px solid var(--color-error-500);
      padding: var(--spacing-11px) var(--spacing-13px);
    }

    .surface.disabled {
      cursor: not-allowed;
      background: var(--color-gray-light-mode-50);
      border-color: var(--color-border-primary);
      opacity: 1;
    }

    textarea {
      display: block;
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: 0;
      border: none;
      background: transparent;
      resize: vertical;
      font-family: inherit;
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-default);
    }

    textarea::placeholder {
      color: var(--color-text-placeholder);
    }

    textarea:focus {
      outline: none;
    }

    textarea:disabled {
      cursor: not-allowed;
      color: var(--color-text-disabled);
      resize: none;
    }

    .surface.tags {
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-md);
    }

    .tags-inner {
      display: flex;
      flex: 1 1 auto;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-md);
      min-width: 0;
    }

    .tag-input {
      flex: 1 1 120px;
      min-width: 120px;
      margin: 0;
      padding: 0;
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-default);
    }

    .tag-input::placeholder {
      color: var(--color-text-placeholder);
    }

    .tag-input:focus {
      outline: none;
    }

    .tag-input:disabled {
      cursor: not-allowed;
      color: var(--color-text-disabled);
    }

    .resize-grip {
      position: absolute;
      right: 4px;
      bottom: 4px;
      display: flex;
      pointer-events: none;
      color: var(--color-gray-light-mode-500);
      line-height: 0;
    }

    .footer {
      margin: 0;
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
      font-weight: var(--font-weight-regular);
    }

    .footer.is-hint {
      color: var(--color-text-muted);
    }

    .footer.is-error {
      color: var(--color-text-error-primary-600);
    }

  `
}
