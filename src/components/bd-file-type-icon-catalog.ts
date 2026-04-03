import type { FileTypeGlyphKey } from './bd-file-type-icon-assets.js'

/** Figma solid “Page” fills (`imgPage2`–`imgPage12`) — hex matches exports. */
export type BdFileTypeSolidPageId = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export const FILE_TYPE_SOLID_PAGE_FILL: Record<BdFileTypeSolidPageId, string> = {
  2: '#7F56D9',
  3: '#155EEF',
  4: '#DD2590',
  5: '#D92D20',
  6: '#079455',
  7: '#444CE7',
  8: '#414651',
  9: '#E62E05',
  10: '#E04F16',
  11: '#BA24D5',
  12: '#6938EF',
}

export type BdFileTypeIconInsetPct = { t: number; r: number; b: number; l: number }

export type BdFileTypeIconSpec =
  | {
      mode: 'extension'
      label: string
      solidPage: BdFileTypeSolidPageId
      /** Default appearance: pill badge background */
      defaultBadgeBg: string
      /** `Default` row page uses narrow inset (extension filenames). */
      pageNarrow: true
      badgeInset: BdFileTypeIconInsetPct
      /** `Document / DOC` uses Figma `top/bottom/left/right` instead of single inset shorthand */
      docBadge?: boolean
    }
  | {
      mode: 'glyph'
      solidPage: BdFileTypeSolidPageId
      /** `simple` = 37.5% icon wrap; `default` = 40% (Figma “Default / …” row). */
      glyphRow: 'simple' | 'default'
      glyphs: Record<'default' | 'gray' | 'solid', FileTypeGlyphKey>
    }
  | {
      mode: 'empty'
      solidPage: BdFileTypeSolidPageId
    }

const E = (
  label: string,
  solidPage: BdFileTypeSolidPageId,
  defaultBadgeBg: string,
  badgeInset: BdFileTypeIconInsetPct,
  docBadge?: boolean,
): BdFileTypeIconSpec => ({
  mode: 'extension',
  label,
  solidPage,
  defaultBadgeBg,
  pageNarrow: true,
  badgeInset,
  ...(docBadge ? { docBadge: true } : {}),
})

const G = (
  solidPage: BdFileTypeSolidPageId,
  glyphRow: 'simple' | 'default',
  glyphs: Record<'default' | 'gray' | 'solid', FileTypeGlyphKey>,
): BdFileTypeIconSpec => ({ mode: 'glyph', solidPage, glyphRow, glyphs })

const emp = (solidPage: BdFileTypeSolidPageId): BdFileTypeIconSpec => ({ mode: 'empty', solidPage })

/** Badge inset % of 40px frame — from Figma dev mode (`4916:411695`). */
const IN = {
  img: { t: 45, r: 32.5, b: 15, l: 2.5 },
  jpg: { t: 45, r: 32.5, b: 15, l: 2.5 },
  jpeg: { t: 45, r: 17.5, b: 15, l: 2.5 },
  png: { t: 45, r: 27.5, b: 15, l: 2.5 },
  webp: { t: 45, r: 7.5, b: 15, l: 2.5 },
  tiff: { t: 45, r: 27.5, b: 15, l: 2.5 },
  gif: { t: 45, r: 40, b: 15, l: 2.5 },
  svg: { t: 45, r: 27.5, b: 15, l: 2.5 },
  eps: { t: 45, r: 32.5, b: 15, l: 2.5 },
  pdf: { t: 45, r: 32.5, b: 15, l: 2.5 },
  doc: { t: 45, r: 25, b: 15, l: 2.5 },
  docx: { t: 45, r: 7.5, b: 15, l: 2.5 },
  txt: { t: 45, r: 32.5, b: 15, l: 2.5 },
  csv: { t: 45, r: 27.5, b: 15, l: 2.5 },
  xls: { t: 45, r: 32.5, b: 15, l: 2.5 },
  xlsx: { t: 45, r: 15, b: 15, l: 2.5 },
  ppt: { t: 45, r: 32.5, b: 15, l: 2.5 },
  pptx: { t: 45, r: 15, b: 15, l: 2.5 },
  fig: { t: 45, r: 40, b: 15, l: 2.5 },
  ai: { t: 45, r: 55, b: 15, l: 2.5 },
  psd: { t: 45, r: 30, b: 15, l: 2.5 },
  indd: { t: 45, r: 20, b: 15, l: 2.5 },
  aep: { t: 45, r: 30, b: 15, l: 2.5 },
  mp3: { t: 45, r: 22.5, b: 15, l: 2.5 },
  wav: { t: 45, r: 40, b: 15, l: 2.5 },
  mp4: { t: 45, r: 22.5, b: 15, l: 2.5 },
  mpeg: { t: 45, r: 40, b: 15, l: 2.5 },
  avi: { t: 45, r: 40, b: 15, l: 2.5 },
  mkv: { t: 45, r: 30, b: 15, l: 2.5 },
  html: { t: 45, r: 10, b: 15, l: 2.5 },
  css: { t: 45, r: 30, b: 15, l: 2.5 },
  rss: { t: 45, r: 32.5, b: 15, l: 2.5 },
  sql: { t: 45, r: 30, b: 15, l: 2.5 },
  js: { t: 45, r: 27.5, b: 15, l: 2.5 },
  json: { t: 45, r: 27.5, b: 15, l: 2.5 },
  java: { t: 45, r: 30, b: 15, l: 2.5 },
  xml: { t: 45, r: 22.5, b: 15, l: 2.5 },
  exe: { t: 45, r: 12.5, b: 15, l: 2.5 },
  dmg: { t: 45, r: 20, b: 15, l: 2.5 },
  zip: { t: 45, r: 42.5, b: 15, l: 2.5 },
  rar: { t: 45, r: 30, b: 15, l: 2.5 },
} as const

export const FILE_TYPE_SPECS = {
  'simple-empty': emp(2),
  'simple-folder': G(2, 'simple', {
    default: 'glyph-simple-folder-default',
    gray: 'glyph-simple-folder-gray',
    solid: 'glyph-simple-folder-solid',
  }),
  'simple-image': G(2, 'simple', {
    default: 'glyph-simple-image-default',
    gray: 'glyph-default-image-gray',
    solid: 'glyph-default-image-solid',
  }),
  'simple-video-01': G(3, 'simple', {
    default: 'glyph-simple-video01-default',
    gray: 'glyph-default-video01-gray',
    solid: 'glyph-default-video01-solid',
  }),
  'simple-video-02': G(3, 'simple', {
    default: 'glyph-simple-video02-default',
    gray: 'glyph-default-video02-gray',
    solid: 'glyph-default-video02-solid',
  }),
  'simple-audio': G(4, 'simple', {
    default: 'glyph-simple-audio-default',
    gray: 'glyph-default-audio-gray',
    solid: 'glyph-default-audio-solid',
  }),
  'simple-pdf': G(5, 'simple', {
    default: 'glyph-simple-pdf-default',
    gray: 'glyph-default-pdf-gray',
    solid: 'glyph-default-pdf-solid',
  }),
  'simple-document': G(3, 'simple', {
    default: 'glyph-doc-lines-default',
    gray: 'glyph-doc-lines-gray',
    solid: 'glyph-doc-lines-solid',
  }),
  'simple-spreadsheet': G(6, 'simple', {
    default: 'glyph-sheet-default',
    gray: 'glyph-sheet-gray',
    solid: 'glyph-sheet-solid',
  }),
  'simple-code': G(7, 'simple', {
    default: 'glyph-simple-code-default',
    gray: 'glyph-default-code-gray',
    solid: 'glyph-default-code-solid',
  }),

  'default-image': G(2, 'default', {
    default: 'glyph-simple-image-default',
    gray: 'glyph-default-image-gray',
    solid: 'glyph-default-image-solid',
  }),
  'default-video-01': G(3, 'default', {
    default: 'glyph-simple-video01-default',
    gray: 'glyph-default-video01-gray',
    solid: 'glyph-default-video01-solid',
  }),
  'default-video-02': G(3, 'default', {
    default: 'glyph-simple-video02-default',
    gray: 'glyph-default-video02-gray',
    solid: 'glyph-default-video02-solid',
  }),
  'default-audio': G(4, 'default', {
    default: 'glyph-simple-audio-default',
    gray: 'glyph-default-audio-gray',
    solid: 'glyph-default-audio-solid',
  }),
  'default-pdf': G(5, 'default', {
    default: 'glyph-simple-pdf-default',
    gray: 'glyph-default-pdf-gray',
    solid: 'glyph-default-pdf-solid',
  }),
  'default-document': G(3, 'default', {
    default: 'glyph-doc-lines-default',
    gray: 'glyph-doc-lines-gray',
    solid: 'glyph-doc-lines-solid',
  }),
  'default-spreadsheet': G(6, 'default', {
    default: 'glyph-sheet-default',
    gray: 'glyph-sheet-gray',
    solid: 'glyph-sheet-solid',
  }),
  'default-code': G(7, 'default', {
    default: 'glyph-simple-code-default',
    gray: 'glyph-default-code-gray',
    solid: 'glyph-default-code-solid',
  }),

  'image-img': E('IMG', 2, '#7F56D9', IN.img),
  'image-jpg': E('JPG', 2, '#7F56D9', IN.jpg),
  'image-jpeg': E('JPEG', 2, '#7F56D9', IN.jpeg),
  'image-png': E('PNG', 2, '#7F56D9', IN.png),
  'image-webp': E('WEBP', 2, '#7F56D9', IN.webp),
  'image-tiff': E('TIFF', 2, '#7F56D9', IN.tiff),
  'image-gif': E('GIF', 2, '#7F56D9', IN.gif),
  'image-svg': E('SVG', 2, '#7F56D9', IN.svg),
  'image-eps': E('EPS', 2, '#7F56D9', IN.eps),

  'document-pdf': E('PDF', 5, '#D92D20', IN.pdf),
  'document-doc': E('DOC', 3, '#155EEF', IN.doc, true),
  'document-docx': E('DOCX', 3, '#155EEF', IN.docx),
  'document-txt': E('TXT', 8, '#414651', IN.txt),
  'document-csv': E('CSV', 6, '#079455', IN.csv),
  'document-xls': E('XLS', 6, '#079455', IN.xls),
  'document-xlsx': E('XLSX', 6, '#079455', IN.xlsx),
  'document-ppt': E('PPT', 9, '#E62E05', IN.ppt),
  'document-pptx': E('PPTX', 9, '#E62E05', IN.pptx),

  'design-fig': E('FIG', 2, '#7F56D9', IN.fig),
  'design-ai': E('AI', 10, '#E04F16', IN.ai),
  'design-psd': E('PSD', 3, '#155EEF', IN.psd),
  'design-indd': E('INDD', 11, '#BA24D5', IN.indd),
  'design-aep': E('AEP', 12, '#6938EF', IN.aep),

  'media-mp3': E('MP3', 4, '#DD2590', IN.mp3),
  'media-wav': E('WAV', 4, '#DD2590', IN.wav),
  'media-mp4': E('MP4', 3, '#155EEF', IN.mp4),
  'media-mpeg': E('MPEG', 3, '#155EEF', IN.mpeg),
  'media-avi': E('AVI', 3, '#155EEF', IN.avi),
  'media-mkv': E('MKV', 3, '#155EEF', IN.mkv),

  'development-html': E('HTML', 7, '#444CE7', IN.html),
  'development-css': E('CSS', 7, '#444CE7', IN.css),
  'development-rss': E('RSS', 7, '#444CE7', IN.rss),
  'development-sql': E('SQL', 7, '#444CE7', IN.sql),
  'development-js': E('JS', 7, '#444CE7', IN.js),
  'development-json': E('JSON', 7, '#444CE7', IN.json),
  'development-java': E('JAVA', 7, '#444CE7', IN.java),
  'development-xml': E('XML', 7, '#444CE7', IN.xml),
  'development-exe': E('EXE', 7, '#444CE7', IN.exe),
  'development-dmg': E('DMG', 7, '#444CE7', IN.dmg),

  'archive-zip': E('ZIP', 8, '#414651', IN.zip),
  'archive-rar': E('RAR', 8, '#414651', IN.rar),
} as const satisfies Record<string, BdFileTypeIconSpec>

export type BdFileTypeIconKind = keyof typeof FILE_TYPE_SPECS
