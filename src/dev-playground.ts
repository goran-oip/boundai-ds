/**
 * Vite playground entry — registers the design system and wires Lucide demo markup.
 */
import './index.ts'

import { html, render } from 'lit'

import { lucideIconSettings } from './icons/lucide-preset.js'

const btn = document.querySelector('bd-utility-button[data-lucide-demo]')
if (btn) {
  render(html`${lucideIconSettings({ size: 20 })}`, btn as HTMLElement)
}
