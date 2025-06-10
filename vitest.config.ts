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
			// E2Eテストファイルを除外（Playwrightで実行するため）
			exclude: [
				"**/node_modules/**",
				"**/dist/**",
				"**/cypress/**",
				"**/.{idea,git,cache,output,temp}/**",
				"**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
				"**/e2e/**",
				"**/*.spec.ts", // PlaywrightのE2Eテストファイル
			],
		},
	};
});
