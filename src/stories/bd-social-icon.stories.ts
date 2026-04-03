import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type {
  BdSocialIconName,
  BdSocialIconState,
  BdSocialIconVariant,
} from '../components/bd-social-icon.js'
import '../components/bd-social-icon.js'

type BdSocialIconArgs = {
  platform: BdSocialIconName
  variant: BdSocialIconVariant
  state: BdSocialIconState
  label: string
}

const meta = {
  title: 'Components/bd-social-icon',
  tags: ['autodocs'],
  render: (args: BdSocialIconArgs) =>
    html`<bd-social-icon
      platform=${args.platform}
      variant=${args.variant}
      state=${args.state}
      label=${args.label || ''}
    ></bd-social-icon>`,
  args: {
    platform: 'facebook',
    variant: 'brand',
    state: 'default',
    label: '',
  } satisfies BdSocialIconArgs,
  argTypes: {
    platform: {
      control: 'select',
      options: [
        'angellist',
        'apple',
        'clubhouse',
        'dribbble',
        'discord-01',
        'discord-02',
        'facebook',
        'figma',
        'framer-01',
        'framer-02',
        'github',
        'google',
        'instagram',
        'layers',
        'linkedin',
        'notion',
        'paypal',
        'pinterest',
        'reddit',
        'signal',
        'slack',
        'snapchat',
        'spotify',
        'stripe',
        'telegram',
        'tiktok',
        'tumblr',
        'twitch',
        'twitter',
        'webflow',
        'whatsapp',
        'wise',
        'x-twitter',
        'youtube',
      ],
    },
    variant: { control: 'select', options: ['brand', 'gray'] },
    state: { control: 'select', options: ['default', 'hover'] },
    label: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '24×24 social / platform mark (brand colors or gray default/hover). Figma node `1457:244804`.',
      },
    },
  },
} satisfies Meta<BdSocialIconArgs>

export default meta
type Story = StoryObj<BdSocialIconArgs>

export const Playground: Story = {}
