import "../packages/react/src/styles/globals.css";

import type { Preview } from "@storybook/react-vite";
import { withReactScan } from "./decorators/with-react-scan";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [withReactScan],
};

export default preview;
