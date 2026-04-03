import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import type { BdEmojiName } from '../components/bd-emoji.js'
import '../components/bd-emoji.js'

const NAMES: BdEmojiName[] = [
  'heart-red',
  'heart-orange',
  'heart-yellow',
  'heart-green',
  'heart-blue',
  'heart-purple',
  'heart-brown',
  'heart-black',
  'heart-white',
  'thumbs-up',
  'thumbs-down',
  'shakas',
  'okay',
  'eyes',
  'smile',
  'slight-smile',
  'hug',
  'wink',
  'sweat-smile',
]

type BdEmojiArgs = {
  name: BdEmojiName
  src: string
  label: string
}

const meta = {
  title: 'Components/bd-emoji',
  tags: ['autodocs'],
  render: (args: BdEmojiArgs) =>
    html`<bd-emoji name=${args.name} src=${args.src || ''} label=${args.label || ''}></bd-emoji>`,
  args: {
    name: 'heart-red',
    src: '',
    label: '',
  } satisfies BdEmojiArgs,
  argTypes: {
    name: { control: 'select', options: NAMES },
    src: { control: 'text' },
    label: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '16×16 reaction emoji (Unicode by default; optional `src` image). Figma node `1244:296`.',
      },
    },
  },
} satisfies Meta<BdEmojiArgs>

export default meta
type Story = StoryObj<BdEmojiArgs>

export const Playground: Story = {}
