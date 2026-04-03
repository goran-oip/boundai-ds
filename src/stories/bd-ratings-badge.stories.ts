import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-ratings-badge.js'

type BdRatingsBadgeArgs = {
  showStars: boolean
  label: string
  title: string
  subtitle: string
}

const meta = {
  title: 'Base Components/bd-ratings-badge',
  id: 'components-bd-ratings-badge',
  tags: ['autodocs'],
  render: (args: BdRatingsBadgeArgs) =>
    html`<bd-ratings-badge
      ?show-stars=${args.showStars}
      label=${args.label || ''}
    >
      <span slot="title">${args.title}</span>
      <span slot="subtitle">${args.subtitle}</span>
    </bd-ratings-badge>`,
  args: {
    showStars: true,
    label: 'Product rating summary',
    title: 'Best InsurTech Tool',
    subtitle: '2,000+ reviews',
  } satisfies BdRatingsBadgeArgs,
  argTypes: {
    showStars: { control: 'boolean' },
    label: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Laurel frame with optional star row and title lines. Figma node `7460:158976`.',
      },
    },
  },
} satisfies Meta<BdRatingsBadgeArgs>

export default meta
type Story = StoryObj<BdRatingsBadgeArgs>

export const Playground: Story = {}
