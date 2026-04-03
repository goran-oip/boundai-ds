import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type BdAppHeaderNavigationTier = 'single' | 'dual'

/**
 * Figma **Header navigation** (`1207:1678`) — top app bar: **brand** + **nav** (left cluster), **utilities** (end).
 * Content is constrained to **`--layout-grid-desktop-width`** (1280px) with **`--container-padding-desktop`** horizontal padding.
 * Optional second row (**`tier="dual"`**): **subnav** (tabs) + **subnav-end** (e.g. search, max **`--width-xs`**).
 *
 * @slot brand - Logo / product mark (start).
 * @slot nav - Primary nav links after the brand (`gap: 2px` between items). Hidden below **`768px`** (use menu in **`end`**).
 * @slot end - Search, settings, avatar, CTAs (`gap: 12px`).
 * @slot subnav - Second row: sub-navigation links (left, flex‑grow).
 * @slot subnav-end - Second row: optional trailing block (e.g. search field, max width 320px). Omit when unused.
 *
 * @csspart root - `<header>` wrapper.
 * @csspart bar - Main row (constrained width).
 * @csspart sub - Sub-navigation row + top divider.
 *
 * @attr nav-label - Accessible name for the **`nav`** landmark (default **Main**).
 */
@customElement('bd-app-header-navigation')
export class BdAppHeaderNavigation extends LitElement {
  /** `single` — one row. `dual` — main row + **`subnav`** / **`subnav-end`** strip with top divider. */
  @property({ reflect: true }) tier: BdAppHeaderNavigationTier = 'single'

  /** Accessible name for the **`nav`** landmark (e.g. localize **`Main`**). */
  @property({ attribute: 'nav-label' }) navLabel = 'Main'

  render() {
    return html`
      <header part="root" class="root">
        <div part="bar" class="bar">
          <div class="start">
            <div class="brand"><slot name="brand"></slot></div>
            <nav class="nav" aria-label=${this.navLabel}>
              <slot name="nav"></slot>
            </nav>
          </div>
          <div class="end"><slot name="end"></slot></div>
        </div>
        ${
          this.tier === 'dual'
            ? html`
              <div part="sub" class="sub">
                <div class="sub-inner">
                  <div class="sub-primary">
                    <slot name="subnav"></slot>
                  </div>
                  <div class="sub-secondary">
                    <slot name="subnav-end"></slot>
                  </div>
                </div>
              </div>
            `
            : nothing
        }
      </header>
    `
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: var(--font-family-body);
    }

    slot[name='brand']::slotted(*),
    slot[name='nav']::slotted(*),
    slot[name='end']::slotted(*),
    slot[name='subnav']::slotted(*),
    slot[name='subnav-end']::slotted(*) {
      font-family: var(--font-family-body);
    }

    .root {
      container-type: inline-size;
      container-name: bd-app-header-navigation;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      background: var(--color-bg-primary);
      border-bottom: 1px solid var(--color-border-secondary);
    }

    /* Figma: 72px row, 32px horizontal inset, max 1280px content */
    .bar {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-xl);
      width: 100%;
      max-width: var(--layout-grid-desktop-width);
      margin-inline: auto;
      min-height: 4.5rem;
      padding: 0 var(--container-padding-desktop);
    }

    .start {
      display: flex;
      flex: 1 1 auto;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      gap: var(--spacing-xl);
      min-width: 0;
    }

    .brand {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      min-width: 0;
    }

    /* Figma: 2px between nav pills */
    .nav {
      display: flex;
      flex: 0 1 auto;
      align-items: center;
      justify-content: flex-start;
      gap: var(--spacing-xxs);
      min-width: 0;
    }

    .nav:empty {
      display: none;
    }

    .end {
      display: flex;
      flex: 0 0 auto;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      gap: var(--spacing-lg);
      min-width: 0;
    }

    .sub {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      border-top: 1px solid var(--color-border-secondary);
      background: var(--color-bg-primary);
    }

    /* Figma: 64px row, 32px gap between sub‑nav and search (max 320px) */
    .sub-inner {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-4xl);
      width: 100%;
      max-width: var(--layout-grid-desktop-width);
      margin-inline: auto;
      min-height: var(--spacing-7xl);
      padding: 0 var(--container-padding-desktop);
    }

    .sub-primary {
      display: flex;
      flex: 1 1 auto;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-xxs);
      min-width: 0;
    }

    .sub-secondary {
      flex: 0 1 var(--width-xs);
      max-width: var(--width-xs);
      min-width: 0;
    }

    @container bd-app-header-navigation (max-width: 767.98px) {
      .bar {
        flex-wrap: nowrap;
        min-height: var(--spacing-7xl);
        padding: var(--spacing-lg) var(--spacing-md) var(--spacing-lg) var(--container-padding-mobile);
      }

      .nav {
        display: none;
      }

      .start {
        flex: 1 1 auto;
        min-width: 0;
      }

      /* Figma mobile: single 64px bar; sub‑nav moves to overlay / drawer */
      .sub {
        display: none;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-app-header-navigation': BdAppHeaderNavigation
  }
}
