import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '../components/bd-tooltip.js'
import type { BdHelpIconPlacement, BdTooltipArrow } from '../components/bd-tooltip.js'

const tooltipArrows: BdTooltipArrow[] = [
  'none',
  'bottom-center',
  'bottom-left',
  'bottom-right',
  'top-center',
  'left',
  'right',
]

const helpPlacements: BdHelpIconPlacement[] = [
  'top-no-arrow',
  'top-arrow',
  'top-left',
  'top-right',
  'bottom',
  'left',
  'right',
]

const meta = {
  title: 'Components/bd-tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**`<bd-tooltip>`** — Figma **Tooltip** (`1052:489`): dark panel, text-xs, optional arrow/beak, simple (one line) or rich (title + supporting). **`<bd-help-icon>`** — Figma **Help icon** (`1054:13`): 16px trigger, hover/focus tooltip with placement mapping.',
      },
    },
  },
} satisfies Meta

export default meta

type TooltipStory = StoryObj<{
  arrow: BdTooltipArrow
  rich: boolean
  label: string
  description: string
}>

export const TooltipSimple: TooltipStory = {
  name: 'Tooltip · simple (all arrows)',
  render: () => html`
    <div
      style="display:flex;flex-wrap:wrap;gap:32px;align-items:flex-start;padding:48px 24px;background:var(--color-base-white);"
    >
      ${tooltipArrows.map(
        (arrow) => html`
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <span
              style="font-family:var(--font-family-body);font-size:var(--font-size-text-xs);line-height:var(--line-height-text-xs);color:var(--color-gray-light-mode-600);"
              >${arrow}</span
            >
            <bd-tooltip arrow=${arrow} .rich=${false} label="This is a tooltip"></bd-tooltip>
          </div>
        `,
      )}
    </div>
  `,
}

export const TooltipRich: TooltipStory = {
  name: 'Tooltip · rich (all arrows)',
  render: () => html`
    <div
      style="display:flex;flex-wrap:wrap;gap:40px;align-items:flex-start;padding:48px 24px;background:var(--color-base-white);"
    >
      ${tooltipArrows.map(
        (arrow) => html`
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;max-width:320px;">
            <span
              style="font-family:var(--font-family-body);font-size:var(--font-size-text-xs);line-height:var(--line-height-text-xs);color:var(--color-gray-light-mode-600);text-align:center;"
              >${arrow}</span
            >
            <bd-tooltip
              arrow=${arrow}
              rich
              label="This is a tooltip"
              description="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
            ></bd-tooltip>
          </div>
        `,
      )}
    </div>
  `,
}

type HelpStory = StoryObj<{
  placement: BdHelpIconPlacement
  rich: boolean
  demoCursor: boolean
}>

export const HelpIconPlacements: HelpStory = {
  name: 'Help icon · placements (hover)',
  render: () => html`
    <div
      style="display:flex;flex-wrap:wrap;gap:48px;align-items:center;justify-content:center;min-height:280px;padding:64px 24px;background:var(--color-base-white);"
    >
      ${helpPlacements.map(
        (placement) => html`
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
            <span
              style="font-family:var(--font-family-body);font-size:var(--font-size-text-xs);line-height:var(--line-height-text-xs);color:var(--color-gray-light-mode-600);"
              >${placement}</span
            >
            <bd-help-icon
              placement=${placement}
              rich
              label="This is a tooltip"
              description="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
            ></bd-help-icon>
          </div>
        `,
      )}
    </div>
  `,
}

export const HelpIconSimple: HelpStory = {
  name: 'Help icon · simple label',
  render: () => html`
    <div
      style="display:flex;flex-wrap:wrap;gap:48px;align-items:center;justify-content:center;min-height:200px;padding:64px 24px;background:var(--color-base-white);"
    >
      ${(['top-no-arrow', 'top-arrow', 'bottom'] as const).map(
        (placement) => html`
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
            <span
              style="font-family:var(--font-family-body);font-size:var(--font-size-text-xs);line-height:var(--line-height-text-xs);color:var(--color-gray-light-mode-600);"
              >${placement}</span
            >
            <bd-help-icon placement=${placement} .rich=${false} label="This is a tooltip"></bd-help-icon>
          </div>
        `,
      )}
    </div>
  `,
}

export const HelpIconDemoCursor: HelpStory = {
  name: 'Help icon · demo cursor (Figma spec)',
  render: () => html`
    <div
      style="display:flex;flex-wrap:wrap;gap:64px;align-items:flex-start;justify-content:center;min-height:320px;padding:80px 24px;background:var(--color-base-white);"
    >
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
        <span
          style="font-family:var(--font-family-body);font-size:var(--font-size-text-xs);line-height:var(--line-height-text-xs);color:var(--color-gray-light-mode-600);"
          >top + demoCursor</span
        >
        <bd-help-icon
          placement="top-arrow"
          rich
          demo-cursor
          label="This is a tooltip"
          description="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
        ></bd-help-icon>
      </div>
    </div>
  `,
}
