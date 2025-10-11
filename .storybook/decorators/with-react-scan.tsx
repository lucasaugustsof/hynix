import type { Decorator } from "@storybook/react-vite";
import React from "react";

import { scan } from "react-scan";

export const withReactScan: Decorator = (Story, context) => {
	React.useEffect(() => {
		scan({
			enabled: true,
		});

		return () => {};
	}, []);

	return <Story {...context} />;
};
