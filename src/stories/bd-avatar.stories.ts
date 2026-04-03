import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-avatar.js'
import '../components/bd-avatar-profile-photo.js'
import '../components/bd-docs-intro.js'

/** Inline SVG — loads in Storybook / CI without external hosts. */
function svgDataUrl(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

/** Two distinct placeholder “photos” for stacks / groups. */
const demoImg = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e0e7ff"/><stop offset="1" stop-color="#c7d2fe"/></linearGradient></defs><rect width="128" height="128" fill="url(#a)"/><circle cx="64" cy="46" r="26" fill="#eef2ff"/><ellipse cx="64" cy="118" rx="42" ry="34" fill="#eef2ff"/></svg>`,
)
const demoImg2 = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fce7f3"/><stop offset="1" stop-color="#fbcfe8"/></linearGradient></defs><rect width="128" height="128" fill="url(#b)"/><circle cx="64" cy="46" r="26" fill="#fdf2f8"/><ellipse cx="64" cy="118" rx="42" ry="34" fill="#fdf2f8"/></svg>`,
)

/** Product mark — `public/boundai-logo.svg` (Figma app icon · node `1083:50505`). */
const demoCompanyLogo = `${import.meta.env.BASE_URL}boundai-logo.svg`

const meta = {
  title: 'Base Components/bd-avatar',
  id: 'components-bd-avatar',
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
        Story demos use inline SVG placeholders (no network). The <strong>company</strong> badge uses
        <code>public/boundai-logo.svg</code>. Online / verified badges are drawn by the component, not raster images.
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
        company-src=${demoCompanyLogo}
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
        company-src=${demoCompanyLogo}
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
