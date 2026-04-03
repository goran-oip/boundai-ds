/**
 * Figma file-type icon SVGs (`4916:411695`) — raw for `unsafeHTML` in `bd-file-type-icon`.
 */

import glyphDefaultAudioGray from './icons/file-type/glyph-default-audio-gray.svg?raw'
import glyphDefaultAudioSolid from './icons/file-type/glyph-default-audio-solid.svg?raw'
import glyphDefaultCodeGray from './icons/file-type/glyph-default-code-gray.svg?raw'
import glyphDefaultCodeSolid from './icons/file-type/glyph-default-code-solid.svg?raw'
import glyphDefaultImageGray from './icons/file-type/glyph-default-image-gray.svg?raw'
import glyphDefaultImageSolid from './icons/file-type/glyph-default-image-solid.svg?raw'
import glyphDefaultPdfGray from './icons/file-type/glyph-default-pdf-gray.svg?raw'
import glyphDefaultPdfSolid from './icons/file-type/glyph-default-pdf-solid.svg?raw'
import glyphDefaultVideo01Gray from './icons/file-type/glyph-default-video01-gray.svg?raw'
import glyphDefaultVideo01Solid from './icons/file-type/glyph-default-video01-solid.svg?raw'
import glyphDefaultVideo02Gray from './icons/file-type/glyph-default-video02-gray.svg?raw'
import glyphDefaultVideo02Solid from './icons/file-type/glyph-default-video02-solid.svg?raw'
import glyphDocLinesDefault from './icons/file-type/glyph-doc-lines-default.svg?raw'
import glyphDocLinesGray from './icons/file-type/glyph-doc-lines-gray.svg?raw'
import glyphDocLinesSolid from './icons/file-type/glyph-doc-lines-solid.svg?raw'
import glyphSheetDefault from './icons/file-type/glyph-sheet-default.svg?raw'
import glyphSheetGray from './icons/file-type/glyph-sheet-gray.svg?raw'
import glyphSheetSolid from './icons/file-type/glyph-sheet-solid.svg?raw'
import glyphSimpleAudioDefault from './icons/file-type/glyph-simple-audio-default.svg?raw'
import glyphSimpleCodeDefault from './icons/file-type/glyph-simple-code-default.svg?raw'
import glyphSimpleFolderDefault from './icons/file-type/glyph-simple-folder-default.svg?raw'
import glyphSimpleFolderGray from './icons/file-type/glyph-simple-folder-gray.svg?raw'
import glyphSimpleFolderSolid from './icons/file-type/glyph-simple-folder-solid.svg?raw'
import glyphSimpleImageDefault from './icons/file-type/glyph-simple-image-default.svg?raw'
import glyphSimplePdfDefault from './icons/file-type/glyph-simple-pdf-default.svg?raw'
import glyphSimpleVideo01Default from './icons/file-type/glyph-simple-video01-default.svg?raw'
import glyphSimpleVideo02Default from './icons/file-type/glyph-simple-video02-default.svg?raw'
import pageGray from './icons/file-type/page-gray.svg?raw'
import pageOutline from './icons/file-type/page-outline.svg?raw'

export const FILE_TYPE_PAGE_OUTLINE = pageOutline
export const FILE_TYPE_PAGE_GRAY = pageGray

export const FILE_TYPE_GLYPHS = {
  'glyph-default-audio-gray': glyphDefaultAudioGray,
  'glyph-default-audio-solid': glyphDefaultAudioSolid,
  'glyph-default-code-gray': glyphDefaultCodeGray,
  'glyph-default-code-solid': glyphDefaultCodeSolid,
  'glyph-default-image-gray': glyphDefaultImageGray,
  'glyph-default-image-solid': glyphDefaultImageSolid,
  'glyph-default-pdf-gray': glyphDefaultPdfGray,
  'glyph-default-pdf-solid': glyphDefaultPdfSolid,
  'glyph-default-video01-gray': glyphDefaultVideo01Gray,
  'glyph-default-video01-solid': glyphDefaultVideo01Solid,
  'glyph-default-video02-gray': glyphDefaultVideo02Gray,
  'glyph-default-video02-solid': glyphDefaultVideo02Solid,
  'glyph-doc-lines-default': glyphDocLinesDefault,
  'glyph-doc-lines-gray': glyphDocLinesGray,
  'glyph-doc-lines-solid': glyphDocLinesSolid,
  'glyph-sheet-default': glyphSheetDefault,
  'glyph-sheet-gray': glyphSheetGray,
  'glyph-sheet-solid': glyphSheetSolid,
  'glyph-simple-audio-default': glyphSimpleAudioDefault,
  'glyph-simple-code-default': glyphSimpleCodeDefault,
  'glyph-simple-folder-default': glyphSimpleFolderDefault,
  'glyph-simple-folder-gray': glyphSimpleFolderGray,
  'glyph-simple-folder-solid': glyphSimpleFolderSolid,
  'glyph-simple-image-default': glyphSimpleImageDefault,
  'glyph-simple-pdf-default': glyphSimplePdfDefault,
  'glyph-simple-video01-default': glyphSimpleVideo01Default,
  'glyph-simple-video02-default': glyphSimpleVideo02Default,
} as const

export type FileTypeGlyphKey = keyof typeof FILE_TYPE_GLYPHS
