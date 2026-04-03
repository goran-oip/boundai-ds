import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-avatar.js'
import '../components/bd-avatar-profile-photo.js'
import '../components/bd-docs-intro.js'

const demoImg = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop'
const demoImg2 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop'
const demoCompany =
  'https://images.unsplash.com/photo-1611944215020-7290c0b4b0b8?w=64&h=64&fit=crop'

const meta = {
  title: 'Components/bd-avatar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma **Avatars**: `bd-avatar` (`19:1012`), `bd-avatar-group` (`1274:812`), `bd-avatar-label-group` (`82:2793`), `bd-avatar-profile-photo` (`1217:108477`). Verified badge uses `--color-brand-ui-600`.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

/** Figma documentation header · `1537:269683` (reuse `bd-docs-intro`). */
export const DocsIntro: Story = {
  name: 'Docs intro',
  render: () => html`
    <bd-docs-intro>
      <span slot="title">Avatars</span>
      <span slot="description">
        All images are sourced from
        <a href="https://unsplash.com/" target="_blank" rel="noreferrer">Unsplash</a>
        and
        <a href="https://pexels.com/" target="_blank" rel="noreferrer">Pexels</a>
        and can be used freely for commercial and non-commercial purposes. You can read more about Unsplash’s license
        <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">here</a>
        and Pexel’s
        <a href="https://www.pexels.com/license/" target="_blank" rel="noreferrer">here</a>.
      </span>
    </bd-docs-intro>
  `,
}

export const SizesImage: Story = {
  name: 'Avatar · image sizes',
  render: () => html`
    <div
      style="display:flex;flex-wrap:wrap;gap:var(--spacing-xl);align-items:flex-end;padding:var(--spacing-4xl);background:var(--color-surface-canvas)"
    >
      ${['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map(
        (s) => html`
          <bd-avatar
            size=${s}
            kind="image"
            src=${demoImg}
            alt="User"
            status="none"
          ></bd-avatar>
        `,
      )}
    </div>
  `,
}

export const StatusRow: Story = {
  name: 'Avatar · status (md)',
  render: () => html`
    <div
      style="display:flex;flex-wrap:wrap;gap:var(--spacing-xl);align-items:flex-end;padding:var(--spacing-4xl);background:var(--color-surface-canvas)"
    >
      <bd-avatar kind="image" size="md" src=${demoImg} alt="" status="none"></bd-avatar>
      <bd-avatar kind="image" size="md" src=${demoImg} alt="" status="online"></bd-avatar>
      <bd-avatar kind="image" size="md" src=${demoImg} alt="" status="verified"></bd-avatar>
      <bd-avatar
        kind="image"
        size="md"
        src=${demoImg}
        alt=""
        status="company"
        company-src=${demoCompany}
      ></bd-avatar>
    </div>
  `,
}

export const PlaceholderAndInitials: Story = {
  name: 'Placeholder & initials',
  render: () => html`
    <div
      style="display:flex;flex-wrap:wrap;gap:var(--spacing-xl);align-items:flex-end;padding:var(--spacing-4xl);background:var(--color-surface-canvas)"
    >
      <bd-avatar kind="placeholder" size="md" status="none"></bd-avatar>
      <bd-avatar kind="initials" size="md" initials="OR" status="verified"></bd-avatar>
      <bd-avatar kind="initials" size="xl" initials="GP" status="online"></bd-avatar>
    </div>
  `,
}

export const AvatarGroupStory: Story = {
  name: 'Avatar group',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:var(--spacing-3xl);padding:var(--spacing-4xl);background:var(--color-surface-canvas)">
      <bd-avatar-group size="xs" overflow-label="+5" add>
        ${[demoImg, demoImg2, demoImg, demoImg2, demoImg].map(
          (u) => html`<bd-avatar kind="image" size="xs" src=${u} alt=""></bd-avatar>`,
        )}
      </bd-avatar-group>
      <bd-avatar-group size="sm" overflow-label="+5" add>
        ${[demoImg, demoImg2, demoImg, demoImg2, demoImg].map(
          (u) => html`<bd-avatar kind="image" size="sm" src=${u} alt=""></bd-avatar>`,
        )}
      </bd-avatar-group>
      <bd-avatar-group size="md" overflow-label="+5" add>
        ${[demoImg, demoImg2, demoImg, demoImg2, demoImg].map(
          (u) => html`<bd-avatar kind="image" size="md" src=${u} alt=""></bd-avatar>`,
        )}
      </bd-avatar-group>
    </div>
  `,
}

export const LabelGroupStory: Story = {
  name: 'Avatar + label',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:var(--spacing-3xl);padding:var(--spacing-4xl);background:var(--color-surface-canvas)">
      <bd-avatar-label-group
        size="sm"
        name="Goran Petkovic"
        email="goranp@oipinsurtech.com"
        src=${demoImg}
        alt=""
        status="none"
      ></bd-avatar-label-group>
      <bd-avatar-label-group
        size="md"
        name="Goran Petkovic"
        email="goranp@oipinsurtech.com"
        src=${demoImg}
        alt=""
        status="verified"
      ></bd-avatar-label-group>
      <bd-avatar-label-group
        size="xl"
        name="Goran Petkovic"
        email="goranp@oipinsurtech.com"
        src=${demoImg}
        alt=""
        status="online"
      ></bd-avatar-label-group>
      <bd-avatar-label-group
        size="lg"
        name="Goran Petkovic"
        email="goranp@oipinsurtech.com"
        src=${demoImg}
        alt=""
        status="company"
        company-src=${demoCompany}
      ></bd-avatar-label-group>
    </div>
  `,
}

export const ProfilePhotoStory: Story = {
  name: 'Profile photo',
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:var(--spacing-3xl);padding:var(--spacing-4xl);background:var(--color-surface-canvas);align-items:flex-end">
      <bd-avatar-profile-photo
        size="sm"
        kind="image"
        src=${demoImg}
        alt=""
        verified
      ></bd-avatar-profile-photo>
      <bd-avatar-profile-photo
        size="md"
        kind="placeholder"
        verified
      ></bd-avatar-profile-photo>
      <bd-avatar-profile-photo
        size="lg"
        kind="initials"
        initials="GP"
        verified
      ></bd-avatar-profile-photo>
    </div>
  `,
}
