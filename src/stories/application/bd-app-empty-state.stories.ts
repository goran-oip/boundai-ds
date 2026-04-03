import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../../components/application/bd-app-empty-state.js'
import '../../components/bd-button.js'
import '../../components/bd-featured-icon-outline.js'

type BdAppEmptyStateArgs = {
  title: string
  description: string
  showMedia: boolean
  showActions: boolean
}

const meta = {
  title: 'Application Components/bd-app-empty-state',
  id: 'app-bd-app-empty-state',
  tags: ['autodocs'],
  render: (args: BdAppEmptyStateArgs) =>
    html`<bd-app-empty-state title=${args.title} description=${args.description}>
      ${
        args.showMedia
          ? html`<bd-featured-icon-outline slot="media" color="gray" size="xl"></bd-featured-icon-outline>`
          : html``
      }
      ${
        args.showActions
          ? html`<div slot="actions">
            <bd-button variant="primary" size="md">Create project</bd-button>
          </div>`
          : html``
      }
    </bd-app-empty-state>`,
  args: {
    title: 'No projects yet',
    description: 'Get started by creating your first project. You can invite teammates later.',
    showMedia: true,
    showActions: true,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Heading (or use `slot="heading"`)',
    },
    description: {
      control: 'text',
      description: 'Body copy (or use `slot="description"`)',
    },
    showMedia: {
      control: 'boolean',
      description: 'Show a sample **`bd-featured-icon`** in **`media`**',
    },
    showActions: {
      control: 'boolean',
      description: 'Show a sample primary action',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-app-empty-state>` — centered zero-state block with optional **`media`**, copy, and **`actions`** for CTAs.',
      },
    },
  },
} satisfies Meta<BdAppEmptyStateArgs>

export default meta
type Story = StoryObj<BdAppEmptyStateArgs>

export const Default: Story = {}

export const Minimal: Story = {
  args: {
    title: 'Nothing here',
    description: '',
    showMedia: false,
    showActions: false,
  },
}

export const WithSlots: Story = {
  args: {
    showMedia: false,
    showActions: false,
  },
  render: () => html`
    <bd-app-empty-state>
      <bd-featured-icon-outline slot="media" color="brand" size="xl"></bd-featured-icon-outline>
      <span slot="heading">Connect your account</span>
      <span slot="description">Link a provider to sync data automatically.</span>
      <div slot="actions">
        <bd-button variant="secondary" size="md">Learn more</bd-button>
        <bd-button variant="primary" size="md">Connect</bd-button>
      </div>
    </bd-app-empty-state>
  `,
}
