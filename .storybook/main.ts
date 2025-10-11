import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../packages/react/src/__stories__/*.stories.tsx"],
	addons: ["@storybook/addon-a11y"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
};
export default config;
