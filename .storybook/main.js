import path from 'node:path'

const { pathname } = new URL(import.meta.url)

const STORIES_PATH = path.resolve(
  pathname,
  '../..',
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
}
export default config
