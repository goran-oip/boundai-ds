import { html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import type { TemplateResult } from 'lit/html.js'
import type { IconNode } from 'lucide'

export type { IconNode } from 'lucide'

/**
 * Options for {@link lucideIcon} — matches Lucide’s SVG defaults (24×24, stroke `currentColor`).
 */
export type LucideIconOptions = {
  size?: number
  class?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

const DEFAULT_SVG_ATTRS: Record<string, string | number> = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

function serializeAttrs(attrs: Record<string, string | number | boolean | undefined>): string {
  return Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== false)
    .map(([k, v]) => {
      if (v === true) return k
      return `${k}="${escapeAttr(String(v))}"`
    })
    .join(' ')
}

function childToSvg([tag, attrs]: [string, Record<string, string | number>]): string {
  return `<${tag} ${serializeAttrs(attrs as Record<string, string | number | boolean | undefined>)} />`
}

function buildSvgString(icon: IconNode, options: LucideIconOptions): string {
  const size = options.size ?? 24
  const svgAttrs: Record<string, string | number | boolean | undefined> = {
    ...DEFAULT_SVG_ATTRS,
    width: size,
    height: size,
    class: options.class,
    'aria-hidden': options['aria-hidden'] ?? true,
  }
  const inner = icon.map((c) => childToSvg(c as [string, Record<string, string | number>])).join('')
  return `<svg ${serializeAttrs(svgAttrs)}>${inner}</svg>`
}

/**
 * Render a Lucide icon as a Lit `TemplateResult` (for use in `html\`...\``).
 *
 * Import icon **data** from deep paths so your bundler only pulls the icons you use — avoid
 * `import { X } from 'lucide'` (main entry re-exports the full set).
 *
 * @example
 * ```ts
 * import { lucideIcon } from '@boundai/ds'
 * import Settings from 'lucide/dist/esm/icons/settings.js'
 *
 * html`<bd-utility-button label="Settings">${lucideIcon(Settings, { size: 20 })}</bd-utility-button>`
 * ```
 */
export function lucideIcon(icon: IconNode, options?: LucideIconOptions): TemplateResult {
  return html`${unsafeHTML(buildSvgString(icon, options ?? {}))}`
}
