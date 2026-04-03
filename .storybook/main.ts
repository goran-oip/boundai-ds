import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
    '@chromatic-com/storybook',
  ],
  framework: '@storybook/web-components-vite',
  /** Storybook’s preview bundle often exceeds Vite’s default 500 kB warning. */
  async viteFinal(cfg) {
    return {
      ...cfg,
      build: {
        ...cfg.build,
        chunkSizeWarningLimit: 1600,
      },
    }
  },
}
export default config
