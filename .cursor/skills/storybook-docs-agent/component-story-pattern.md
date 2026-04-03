# Component Story Pattern

Every `bd-*` component gets a story file at `src/stories/bd-{name}.stories.ts`.

## Template

```ts
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-{name}.js'

type Bd{Name}Args = {
  // one key per reflected attribute + one for default slot text
  variant: 'primary' | 'secondary' // example enum
  size: 'sm' | 'md' | 'lg'
  disabled: boolean
  label: string  // represents default slot text
}

const meta = {
  title: 'Components/bd-{name}',
  tags: ['autodocs'],
  render: (args: Bd{Name}Args) =>
    html`<bd-{name}
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
    >
      ${args.label}
    </bd-{name}>`,
  args: {
    // sensible defaults matching component defaults
    variant: 'primary',
    size: 'md',
    disabled: false,
    label: '{Name}',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size preset',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction',
    },
    label: {
      control: 'text',
      description: 'Default slot text content',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`<bd-{name}>` — one-sentence description of what the component does and its key features.',
      },
    },
  },
} satisfies Meta<Bd{Name}Args>

export default meta
type Story = StoryObj<Bd{Name}Args>

// --- Individual variant stories ---
export const Default: Story = {}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

// --- Composite "gallery" stories ---
export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:var(--spacing-lg);flex-wrap:wrap;align-items:center;">
      <bd-{name} variant="primary">Primary</bd-{name}>
      <bd-{name} variant="secondary">Secondary</bd-{name}>
    </div>
  `,
}

export const AllSizes: Story = {
  render: () => html`
    <div style="display:flex;gap:var(--spacing-lg);align-items:center;">
      <bd-{name} size="sm">Small</bd-{name}>
      <bd-{name} size="md">Medium</bd-{name}>
      <bd-{name} size="lg">Large</bd-{name}>
    </div>
  `,
}
```

## How to Fill This In

1. **Read the component source** (`src/components/bd-{name}.ts`):
   - Find all `@property()` decorators → these become args + argTypes
   - For boolean attributes with `reflect: true`, use `?attr=${args.attr}` binding
   - For string/enum attributes with `reflect: true`, use `attr=${args.attr}` binding
   - For non-reflected properties, use `.prop=${args.prop}` binding

2. **Read `custom-elements.json`** if available:
   - `attributes[]` → argTypes with proper controls
   - `slots[]` → add a string arg per named slot
   - `events[]` → document in component description
   - `cssParts[]` → mention in component description

3. **Choose argType controls**:
   | Property type | Control |
   |---|---|
   | Union of strings | `control: 'select', options: [...]` |
   | `boolean` | `control: 'boolean'` |
   | `number` | `control: { type: 'number', min, max, step }` |
   | `string` (freeform) | `control: 'text'` |
   | Color string | `control: 'color'` |

4. **Create individual stories** for each meaningful state:
   - One per variant value
   - One for disabled
   - One for each size (if applicable)
   - One for full-width or any boolean layout toggle

5. **Create composite stories** at the end:
   - `AllVariants` — all variant values side-by-side
   - `AllSizes` — all size values side-by-side
   - Use `render: () => html\`...\`` (no args needed, hardcode values)
   - Use `display:flex;gap:var(--spacing-lg)` for the wrapper

6. **Description format**: Always backtick the tag name at the start:
   `` `<bd-button>` — primary action element. Supports `primary`, `secondary`, `ghost`, and `destructive` variants across `sm`, `md`, `lg` sizes. ``
