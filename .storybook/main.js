import path from 'node:path'

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../packages/react/src/__stories__/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal(config) {
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: '@/registry',
            replacement: path.resolve('packages/react/src'), // resolve react package alias
          },
        ],
      },
    }
  },
}

export default config
