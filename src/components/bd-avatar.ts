import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

export type BdAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type BdAvatarKind = 'image' | 'placeholder' | 'initials'
export type BdAvatarStatus = 'none' | 'online' | 'verified' | 'company'

const userIconSvg = html`<svg
  class="ph-icon"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
    stroke="var(--color-gray-light-mode-600)"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

const verifiedSvg = html`<svg
  class="tick"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <circle cx="12" cy="12" r="11" fill="var(--color-brand-ui-600)" />
  <path
    d="M8 12.5l2.5 2.5L16 9.5"
    stroke="var(--color-base-white)"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`

function plusSvg() {
  return html`<svg
    class="plus"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" stroke="var(--color-gray-light-mode-600)" stroke-width="2" stroke-linecap="round" />
  </svg>`
}

/**
 * User avatar (Figma **Avatar** · `19:1012`): image, placeholder icon, or initials; optional status
 * (online / verified / company). **Blue** verified badge uses `--color-brand-ui-600`.
 *
 * @slot - When `kind="image"` and no `src`, optional custom content inside the circle.
 *
 * @csspart root - Circular frame.
 * @csspart surface - Inner content area (clip).
 */
@customElement('bd-avatar')
export class BdAvatar extends LitElement {
  @property({ reflect: true }) size: BdAvatarSize = 'md'

  @property({ reflect: true }) kind: BdAvatarKind = 'image'

  @property({ reflect: true }) status: BdAvatarStatus = 'none'

  @property({ reflect: true }) src = ''

  @property({ reflect: true }) alt = ''

  /** Initials (max 2 chars shown; uppercased). Used when `kind="initials"`. */
  @property({ reflect: true }) initials = ''

  /** Small image for the company badge when `status="company"`. */
  @property({ reflect: true, attribute: 'company-src' }) companySrc = ''

  render() {
    const ini = (this.initials || '').slice(0, 2).toUpperCase().trim() || '?'

    return html`
      <div class="root" part="root">
        <div class="surface ${this.kind}" part="surface">
          ${
            this.kind === 'image' && this.src
              ? html`<img src=${this.src} alt=${this.alt || 'Avatar'} loading="lazy" />`
              : nothing
          }
          ${this.kind === 'image' && !this.src ? html`<slot></slot>` : nothing}
          ${this.kind === 'placeholder' ? userIconSvg : nothing}
          ${this.kind === 'initials' ? html`<span class="initials">${ini}</span>` : nothing}
        </div>
        ${this._badgeTpl()}
      </div>
    `
  }

  private _badgeTpl() {
    if (this.status === 'none') return nothing

    if (this.status === 'online') {
      return html`<span class="badge online" part="badge" aria-hidden="true"></span>`
    }

    if (this.status === 'verified') {
      return html`<span class="badge verified" part="badge" aria-label="Verified">${verifiedSvg}</span>`
    }

    if (this.status === 'company') {
      return html`
        <span class="badge company" part="badge" aria-hidden="true">
          ${
            this.companySrc
              ? html`<img src=${this.companySrc} alt="" />`
              : html`<slot name="company"></slot>`
          }
        </span>
      `
    }

    return nothing
  }

  static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
      line-height: 0;
    }

    .root {
      position: relative;
      display: inline-block;
      flex-shrink: 0;
      box-sizing: border-box;
      border-radius: var(--radius-full);
    }

    .surface {
      position: relative;
      display: flex;
      box-sizing: border-box;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-full);
      background: var(--color-gray-light-mode-100);
      border-color: rgba(0, 0, 0, 0.08);
      border-style: solid;
    }

    .surface.image {
      background: var(--color-bg-primary);
    }

    .surface img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ph-icon {
      width: 55%;
      height: 55%;
    }

    .initials {
      font-family: var(--font-family-body);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-quaternary-500);
      text-align: center;
    }

    :host([size='xs']) .surface {
      width: 24px;
      height: 24px;
      border-width: 0.5px;
    }

    :host([size='xs']) .initials {
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
    }

    :host([size='sm']) .surface {
      width: 32px;
      height: 32px;
      border-width: 0.75px;
    }

    :host([size='sm']) .initials {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    :host([size='md']) .surface {
      width: 40px;
      height: 40px;
      border-width: 1px;
    }

    :host([size='md']) .initials {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }

    :host([size='lg']) .surface {
      width: 48px;
      height: 48px;
      border-width: 1px;
    }

    :host([size='lg']) .initials {
      font-size: var(--font-size-text-lg);
      line-height: var(--line-height-text-lg);
    }

    :host([size='xl']) .surface {
      width: 56px;
      height: 56px;
      border-width: 1px;
    }

    :host([size='xl']) .initials {
      font-size: var(--font-size-text-xl);
      line-height: var(--line-height-text-xl);
    }

    :host([size='2xl']) .surface {
      width: 64px;
      height: 64px;
      border-width: 1px;
    }

    :host([size='2xl']) .initials {
      font-family: var(--font-family-display);
      font-size: var(--font-size-display-xs);
      line-height: var(--line-height-display-xs);
    }

    .badge {
      position: absolute;
      z-index: 1;
      box-sizing: border-box;
      flex-shrink: 0;
      border-radius: var(--radius-full);
    }

    .badge.online {
      border: 1.5px solid var(--color-bg-primary);
      background: var(--color-success-500);
    }

    .badge.verified {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    .badge.verified .tick {
      display: block;
      width: 100%;
      height: 100%;
    }

    .badge.company {
      overflow: hidden;
      padding: 0;
      border: 1.5px solid var(--color-bg-primary);
      background: var(--color-bg-primary);
    }

    .badge.company img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--radius-full);
    }

    .badge.company ::slotted(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--radius-full);
    }

    /* ----- badge positions + sizes (Figma 19:1012) ----- */
    :host([size='xs']) .badge.online {
      right: -2px;
      bottom: -2px;
      width: 6px;
      height: 6px;
    }

    :host([size='xs']) .badge.verified {
      right: -1.5px;
      bottom: -1.5px;
      width: 10px;
      height: 10px;
    }

    :host([size='xs']) .badge.company {
      right: -2.5px;
      bottom: -2.5px;
      width: 10px;
      height: 10px;
    }

    :host([size='sm']) .badge.online {
      right: -0.75px;
      bottom: -0.75px;
      width: 8px;
      height: 8px;
    }

    :host([size='sm']) .badge.verified {
      right: -0.75px;
      bottom: -0.75px;
      width: 12px;
      height: 12px;
    }

    :host([size='sm']) .badge.company {
      right: -2.75px;
      bottom: -2.75px;
      width: 12px;
      height: 12px;
    }

    :host([size='md']) .badge.online {
      right: -1px;
      bottom: -1px;
      width: 10px;
      height: 10px;
    }

    :host([size='md']) .badge.verified {
      right: -1px;
      bottom: -1px;
      width: 14px;
      height: 14px;
    }

    :host([size='md']) .badge.company {
      right: -3px;
      bottom: -3px;
      width: 14px;
      height: 14px;
    }

    :host([size='lg']) .badge.online {
      right: -1px;
      bottom: -1px;
      width: 12px;
      height: 12px;
    }

    :host([size='lg']) .badge.verified {
      right: -1px;
      bottom: -1px;
      width: 16px;
      height: 16px;
    }

    :host([size='lg']) .badge.company {
      right: -3px;
      bottom: -3px;
      width: 16px;
      height: 16px;
    }

    :host([size='xl']) .badge.online {
      right: -1px;
      bottom: -1px;
      width: 14px;
      height: 14px;
    }

    :host([size='xl']) .badge.verified {
      right: -1px;
      bottom: -1px;
      width: 18px;
      height: 18px;
    }

    :host([size='xl']) .badge.company {
      right: -3px;
      bottom: -3px;
      width: 18px;
      height: 18px;
    }

    :host([size='2xl']) .badge.online {
      right: -1px;
      bottom: -1px;
      width: 16px;
      height: 16px;
    }

    :host([size='2xl']) .badge.verified {
      right: -1px;
      bottom: -1px;
      width: 20px;
      height: 20px;
    }

    :host([size='2xl']) .badge.company {
      right: -3px;
      bottom: -3px;
      width: 20px;
      height: 20px;
    }
  `
}

export type BdAvatarGroupSize = 'xs' | 'sm' | 'md'

/**
 * Stacked avatars + overflow + add control (Figma **Avatar group** · `1274:812`).
 *
 * @slot - `bd-avatar` elements (leftmost in DOM appears on top).
 *
 * @csspart stack - Overlapping row.
 * @csspart overflow - +N pill.
 * @csspart add - Dashed add button.
 */
@customElement('bd-avatar-group')
export class BdAvatarGroup extends LitElement {
  @property({ reflect: true }) size: BdAvatarGroupSize = 'xs'

  /** When set, shows the overflow pill (e.g. `+5`). */
  @property({ reflect: true }) overflowLabel = ''

  @property({ type: Boolean, reflect: true }) add = false

  render() {
    return html`
      <div class="root">
        <div class="stack" part="stack">
          <slot></slot>
          ${
            this.overflowLabel
              ? html`<span class="overflow" part="overflow">${this.overflowLabel}</span>`
              : nothing
          }
        </div>
        ${
          this.add
            ? html`<button type="button" class="add" part="add" aria-label="Add">${plusSvg()}</button>`
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

    .root {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-md);
    }

    .stack {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      padding-right: var(--bd-stack-pr);
    }

    .stack ::slotted(bd-avatar) {
      position: relative;
      flex-shrink: 0;
      border-radius: var(--radius-full);
      box-shadow: 0 0 0 1.5px var(--color-bg-primary);
    }

    .stack ::slotted(bd-avatar:nth-child(1)) {
      z-index: 12;
    }

    .stack ::slotted(bd-avatar:nth-child(2)) {
      z-index: 11;
    }

    .stack ::slotted(bd-avatar:nth-child(3)) {
      z-index: 10;
    }

    .stack ::slotted(bd-avatar:nth-child(4)) {
      z-index: 9;
    }

    .stack ::slotted(bd-avatar:nth-child(5)) {
      z-index: 8;
    }

    .stack ::slotted(bd-avatar:nth-child(6)) {
      z-index: 7;
    }

    .stack ::slotted(bd-avatar:nth-child(7)) {
      z-index: 6;
    }

    .stack ::slotted(bd-avatar:nth-child(8)) {
      z-index: 5;
    }

    .stack ::slotted(bd-avatar:nth-child(9)) {
      z-index: 4;
    }

    .stack ::slotted(bd-avatar:nth-child(10)) {
      z-index: 3;
    }

    .stack ::slotted(bd-avatar:nth-child(11)) {
      z-index: 2;
    }

    .stack ::slotted(bd-avatar:nth-child(12)) {
      z-index: 1;
    }

    .stack ::slotted(bd-avatar:not(:first-child)) {
      margin-left: var(--bd-overlap);
    }

    .overflow {
      position: relative;
      z-index: 1;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      margin-left: var(--bd-overlap);
      border-radius: var(--radius-full);
      background: var(--color-gray-light-mode-100);
      border-color: var(--color-border-secondary);
      border-style: solid;
      font-family: var(--font-family-body);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-quaternary-500);
      box-shadow: 0 0 0 1.5px var(--color-bg-primary);
    }

    .add {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: 1px dashed var(--color-border-primary);
      border-radius: var(--radius-full);
      background: var(--color-bg-primary);
      cursor: pointer;
      line-height: 0;
      color: inherit;
    }

    .add:hover {
      border-color: var(--color-gray-light-mode-400);
      background: var(--color-gray-light-mode-50);
    }

    .add:focus-visible {
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }

    .add .plus {
      width: var(--bd-add-icon);
      height: var(--bd-add-icon);
    }

    :host([size='xs']) {
      --bd-stack-pr: 4px;
      --bd-overlap: -4px;
      --bd-add-icon: 16px;
    }

    :host([size='xs']) .overflow {
      width: 24px;
      height: 24px;
      border-width: 0.5px;
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
    }

    :host([size='xs']) .add {
      width: 24px;
      height: 24px;
    }

    :host([size='sm']) {
      --bd-stack-pr: 8px;
      --bd-overlap: -8px;
      --bd-add-icon: 16px;
    }

    :host([size='sm']) .overflow {
      width: 32px;
      height: 32px;
      border-width: 0.75px;
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    :host([size='sm']) .add {
      width: 32px;
      height: 32px;
    }

    :host([size='md']) {
      --bd-stack-pr: 12px;
      --bd-overlap: -12px;
      --bd-add-icon: 20px;
    }

    :host([size='md']) .overflow {
      width: 40px;
      height: 40px;
      border-width: 1px;
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }

    :host([size='md']) .add {
      width: 40px;
      height: 40px;
    }
  `
}

export type BdAvatarLabelGroupSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * Avatar + name + email (Figma **Avatar label group** · `82:2793`).
 *
 * @csspart row - Horizontal layout wrapper.
 */
@customElement('bd-avatar-label-group')
export class BdAvatarLabelGroup extends LitElement {
  @property({ reflect: true }) size: BdAvatarLabelGroupSize = 'sm'

  @property({ reflect: true }) name = ''

  @property({ reflect: true }) email = ''

  @property({ reflect: true }) status: BdAvatarStatus = 'none'

  @property({ reflect: true }) src = ''

  @property({ reflect: true }) alt = ''

  @property({ reflect: true, attribute: 'company-src' }) companySrc = ''

  render() {
    const avSize =
      this.size === 'sm' ? 'sm' : this.size === 'md' ? 'md' : this.size === 'lg' ? 'lg' : 'xl'

    return html`
      <div class="row" part="row">
        <bd-avatar
          size=${avSize}
          kind="image"
          src=${this.src}
          alt=${this.alt}
          status=${this.status}
          company-src=${ifDefined(this.status === 'company' ? this.companySrc || undefined : undefined)}
        ></bd-avatar>
        <div class="texts">
          <p class="name">${this.name}</p>
          <p class="email">${this.email}</p>
        </div>
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    .row {
      display: flex;
      align-items: center;
      gap: var(--bd-lg-gap);
    }

    .texts {
      display: flex;
      min-width: 0;
      flex-direction: column;
      align-items: flex-start;
      white-space: nowrap;
    }

    .name {
      margin: 0;
      font-family: var(--font-family-body);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary-900);
    }

    .email {
      margin: 0;
      font-family: var(--font-family-body);
      font-weight: var(--font-weight-regular);
      color: var(--color-text-tertiary-600);
    }

    :host([size='sm']) .row {
      --bd-lg-gap: var(--spacing-md);
    }

    :host([size='sm']) .name {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    :host([size='sm']) .email {
      font-size: var(--font-size-text-xs);
      line-height: var(--line-height-text-xs);
    }

    :host([size='md']) .row {
      --bd-lg-gap: var(--spacing-md);
    }

    :host([size='md']) .name {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }

    :host([size='md']) .email {
      font-size: var(--font-size-text-sm);
      line-height: var(--line-height-text-sm);
    }

    :host([size='lg']) .row {
      --bd-lg-gap: var(--spacing-lg);
    }

    :host([size='lg']) .name {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }

    :host([size='lg']) .email {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }

    :host([size='xl']) .row {
      --bd-lg-gap: var(--spacing-xl);
    }

    :host([size='xl']) .name {
      font-size: var(--font-size-text-lg);
      line-height: var(--line-height-text-lg);
    }

    :host([size='xl']) .email {
      font-size: var(--font-size-text-md);
      line-height: var(--line-height-text-md);
    }
  `
}
