import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'BoundAI Design System',
    brandUrl: 'https://github.com/goran-oip/boundai-ds',
  }),
})
