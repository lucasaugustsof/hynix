import path from 'node:path'

const STORIES_PATH = path.resolve(
  'packages/react/src/__stories__/**/*.stories.tsx',
)

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [STORIES_PATH],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
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
