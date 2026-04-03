import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../../components/application/bd-app-doc-page-header.js'

const logoMark = `${import.meta.env.BASE_URL}boundai-logo.svg`

type BdAppDocPageHeaderArgs = {
  sectionLabel: string
  pageLabel: string
  heading: string
  description: string
}

const meta = {
  title: 'Application Components/bd-app-doc-page-header',
  id: 'app-bd-app-doc-page-header',
  tags: ['autodocs'],
  render: (args: BdAppDocPageHeaderArgs) =>
    html`<bd-app-doc-page-header
      section-label=${args.sectionLabel}
      page-label=${args.pageLabel}
      heading=${args.heading}
      description=${args.description}
    ></bd-app-doc-page-header>`,
  args: {
    sectionLabel: 'Application components',
    pageLabel: 'Page headers',
    heading: 'Page headers',
    description: 'Page headers provide content and actions related to the current screen.',
  },
  argTypes: {
    sectionLabel: { control: 'text', description: 'First trail segment' },
    pageLabel: { control: 'text', description: 'Segment after the chevron' },
    heading: { control: 'text', description: 'Main display title' },
    description: { control: 'text', description: 'Lead paragraph' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-app-doc-page-header>` — Figma **Design system header** (`1550:264694`, `1550:264800`, `1550:264842`, `3275:373204`, `6721:120376`): logo slot, inline trail, **display-xl** title, and lead copy on **`--color-bg-secondary`**.',
      },
    },
  },
} satisfies Meta<BdAppDocPageHeaderArgs>

export default meta
type Story = StoryObj<BdAppDocPageHeaderArgs>

export const Default: Story = {}

/** Custom **`logo`** slot (default trail + hero still use props). */
/** Figma `1550:264842` — same component as Page headers intro; copy for **Card headers**. */
export const CardHeadersIntro: Story = {
  args: {
    sectionLabel: 'Application components',
    pageLabel: 'Card headers',
    heading: 'Card headers',
    description: 'Card headers provide content and actions related to the current card or table.',
  },
}

/** Figma `1550:264800` — same component as Page / Card intros; copy for **Section headers**. */
export const SectionHeadersIntro: Story = {
  args: {
    sectionLabel: 'Application components',
    pageLabel: 'Section headers',
    heading: 'Section headers',
    description:
      'Section headers provide content and actions related to the current section on a screen.',
  },
}

/** Figma `3275:373204` — doc intro for **Section footers**. */
export const SectionFootersIntro: Story = {
  args: {
    sectionLabel: 'Application components',
    pageLabel: 'Section footers',
    heading: 'Section footers',
    description:
      'Section footers provide space for actions related to the current section on a screen.',
  },
}

/** Figma `6721:120376` — intro for **Application navigation** (unpublished base components note). */
export const ApplicationNavigationIntro: Story = {
  args: {
    sectionLabel: 'Application components',
    pageLabel: 'Application navigation',
    heading: '_Unpublished base components',
    description: '',
  },
  render: () => html`
    <bd-app-doc-page-header
      section-label="Application components"
      page-label="Application navigation"
      heading="_Unpublished base components"
    >
      <div slot="description" style="font-size:var(--font-size-text-xl);line-height:var(--line-height-text-xl);color:var(--color-text-tertiary-600);">
        These are the base components that are not published. Edit these components to quickly make changes to the main
        published components to the right. Learn more about using components
        <a
          href="https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma"
          target="_blank"
          rel="noopener noreferrer"
          style="color:inherit;text-decoration:underline;"
          >here</a
        >.
      </div>
    </bd-app-doc-page-header>
  `,
}

export const CustomLogo: Story = {
  render: () => html`
    <bd-app-doc-page-header
      section-label="Application components"
      page-label="Page headers"
      heading="Page headers"
      description="Page headers provide content and actions related to the current screen."
    >
      <div slot="logo" style="display:flex;align-items:center">
        <img src=${logoMark} width="36" height="36" alt="" />
      </div>
    </bd-app-doc-page-header>
  `,
}
