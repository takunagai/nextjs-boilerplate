import { defineConfig } from "vitest/config";

// Use dynamic imports for plugins
const react = () => import("@vitejs/plugin-react");
const tsconfigPaths = () => import("vite-tsconfig-paths");

export default defineConfig(async () => {
	const reactPlugin = (await react()).default;
	const tsconfigPathsPlugin = (await tsconfigPaths()).default;

	return {
		plugins: [reactPlugin(), tsconfigPathsPlugin()],
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "./setupTests.ts",
			testTimeout: 10000, // 10秒に増加
		},
	};
});
