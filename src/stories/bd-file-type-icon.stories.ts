import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type { BdFileTypeIconKind } from '../components/bd-file-type-icon.js'
import '../components/bd-file-type-icon.js'
import { FILE_TYPE_SPECS } from '../components/bd-file-type-icon-catalog.js'

const FILE_TYPE_OPTIONS = Object.keys(FILE_TYPE_SPECS) as BdFileTypeIconKind[]

type BdFileTypeIconArgs = {
  appearance: 'default' | 'gray' | 'solid'
  fileType: BdFileTypeIconKind | ''
  label: string
}

const meta = {
  title: 'Base Components/bd-file-type-icon',
  id: 'components-bd-file-type-icon',
  tags: ['autodocs'],
  render: (args: BdFileTypeIconArgs) =>
    html`<bd-file-type-icon
      appearance=${args.appearance}
      file-type=${args.fileType || 'default-image'}
      label=${args.label || ''}
    ></bd-file-type-icon>`,
  args: { appearance: 'default', fileType: 'default-image', label: '' },
  argTypes: {
    appearance: { control: 'select', options: ['default', 'gray', 'solid'] },
    fileType: { control: 'select', options: FILE_TYPE_OPTIONS },
    label: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Figma **File type** icons (`4916:411695`): set **`file-type`** to a catalog slug (e.g. `image-png`, `document-pdf`, `simple-image`). Three **appearances** match Figma outline / gray / solid rows.',
      },
    },
  },
} satisfies Meta<BdFileTypeIconArgs>

export default meta
type Story = StoryObj<BdFileTypeIconArgs>

export const Playground: Story = {}

const showcaseRow = (appearance: 'default' | 'gray' | 'solid', kinds: BdFileTypeIconKind[]) =>
  html`<div style="display:flex;flex-wrap:wrap;gap:var(--spacing-md);align-items:flex-end;">
    ${kinds.map(
      (k) =>
        html`<div style="display:flex;flex-direction:column;align-items:center;gap:var(--spacing-xxs);">
          <bd-file-type-icon .appearance=${appearance} file-type=${k}></bd-file-type-icon>
          <span style="font-size:10px;color:var(--color-text-tertiary-600);max-width:72px;text-align:center;"
            >${k}</span
          >
        </div>`,
    )}
  </div>`

export const ShowcaseImageFormats: Story = {
  name: 'Image formats (×3 appearances)',
  render: () =>
    html`<div style="display:flex;flex-direction:column;gap:var(--spacing-xl);">
      <div>
        <p style="margin:0 0 var(--spacing-sm);font-weight:var(--font-weight-semibold);">Outline</p>
        ${showcaseRow('default', [
          'image-img',
          'image-jpg',
          'image-jpeg',
          'image-png',
          'image-webp',
          'image-tiff',
          'image-gif',
          'image-svg',
          'image-eps',
        ])}
      </div>
      <div>
        <p style="margin:0 0 var(--spacing-sm);font-weight:var(--font-weight-semibold);">Gray</p>
        ${showcaseRow('gray', [
          'image-img',
          'image-jpg',
          'image-jpeg',
          'image-png',
          'image-webp',
          'image-tiff',
          'image-gif',
          'image-svg',
          'image-eps',
        ])}
      </div>
      <div>
        <p style="margin:0 0 var(--spacing-sm);font-weight:var(--font-weight-semibold);">Solid</p>
        ${showcaseRow('solid', [
          'image-img',
          'image-jpg',
          'image-jpeg',
          'image-png',
          'image-webp',
          'image-tiff',
          'image-gif',
          'image-svg',
          'image-eps',
        ])}
      </div>
    </div>`,
}

export const ShowcaseSimpleAndDefault: Story = {
  name: 'Simple / Default pictograms',
  render: () =>
    html`<div style="display:flex;flex-direction:column;gap:var(--spacing-xl);">
      ${(['default', 'gray', 'solid'] as const).map(
        (a) => html`<div>
          <p style="margin:0 0 var(--spacing-sm);font-weight:var(--font-weight-semibold);">${a}</p>
          ${showcaseRow(a, [
            'simple-empty',
            'simple-folder',
            'simple-image',
            'simple-video-01',
            'simple-video-02',
            'simple-audio',
            'simple-pdf',
            'simple-document',
            'simple-spreadsheet',
            'simple-code',
          ])}
          <div style="height:var(--spacing-lg)"></div>
          ${showcaseRow(a, [
            'default-image',
            'default-video-01',
            'default-video-02',
            'default-audio',
            'default-pdf',
            'default-document',
            'default-spreadsheet',
            'default-code',
          ])}
        </div>`,
      )}
    </div>`,
}
