import type { Preview } from '@storybook/web-components-vite'

import '../src/styles/tokens.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: [
          'Foundations',
          [
            'Colors',
            'Typography',
            'Component utility',
            'Spacing, radius & grids',
            'Effect styles',
            'Featured icons',
            'Lucide icons',
            'Miscellaneous icons',
            'Payment method icons',
          ],
          'Base Components',
          'Application Components',
        ],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
