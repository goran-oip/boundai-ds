/**
 * Curated Lucide icons as Lit templates — each icon is a separate module import (tree-shake friendly).
 * Requires the **`lucide`** package (peer dependency).
 */
import Check from 'lucide/dist/esm/icons/check.js'
import ChevronDown from 'lucide/dist/esm/icons/chevron-down.js'
import ChevronRight from 'lucide/dist/esm/icons/chevron-right.js'
import Menu from 'lucide/dist/esm/icons/menu.js'
import Plus from 'lucide/dist/esm/icons/plus.js'
import Search from 'lucide/dist/esm/icons/search.js'
import Settings from 'lucide/dist/esm/icons/settings.js'
import X from 'lucide/dist/esm/icons/x.js'
import type { LucideIconOptions } from './lucide.js'
import { lucideIcon } from './lucide.js'

export const lucideIconCheck = (o?: LucideIconOptions) => lucideIcon(Check, o)
export const lucideIconChevronDown = (o?: LucideIconOptions) => lucideIcon(ChevronDown, o)
export const lucideIconChevronRight = (o?: LucideIconOptions) => lucideIcon(ChevronRight, o)
export const lucideIconMenu = (o?: LucideIconOptions) => lucideIcon(Menu, o)
export const lucideIconPlus = (o?: LucideIconOptions) => lucideIcon(Plus, o)
export const lucideIconSearch = (o?: LucideIconOptions) => lucideIcon(Search, o)
export const lucideIconSettings = (o?: LucideIconOptions) => lucideIcon(Settings, o)
export const lucideIconX = (o?: LucideIconOptions) => lucideIcon(X, o)
