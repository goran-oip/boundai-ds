import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type { BdCountryIconName } from '../components/bd-country-icon.js'
import '../components/bd-country-icon.js'

type BdCountryIconArgs = {
  country: BdCountryIconName
  label: string
}

/**
 * Figma Design System v1.1 — Country icons (`1107:70094`).
 */
const meta = {
  title: 'Components/bd-country-icon',
  tags: ['autodocs'],
  render: (args: BdCountryIconArgs) =>
    html`<bd-country-icon country=${args.country} label=${args.label || ''}></bd-country-icon>`,
  args: {
    country: 'us',
    label: '',
  } satisfies BdCountryIconArgs,
  argTypes: {
    country: {
      control: 'select',
      options: [
        'earth',
        'af',
        'de',
        'fr',
        'gb',
        'gb-eng',
        'jp',
        'se',
        'us',
        'vu',
      ] satisfies BdCountryIconName[],
    },
    label: { control: 'text' },
  },
} satisfies Meta<BdCountryIconArgs>

export default meta
type Story = StoryObj<BdCountryIconArgs>

export const Playground: Story = {}
