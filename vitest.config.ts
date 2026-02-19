import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./setupTests.ts",
		testTimeout: 10000, // 10秒に増加
		dir: "./src",
		// E2Eテストファイルを除外（Playwrightで実行するため）
		exclude: [
			"**/node_modules/**",
			"**/e2e/**",
			"**/*.spec.ts", // PlaywrightのE2Eテストファイル
		],
		coverage: {
			provider: "v8",
			include: ["src/**/*.{ts,tsx}"],
			exclude: [
				"src/**/*.test.{ts,tsx}",
				"src/**/__tests__/**",
				"src/types/**",
			],
		},
	},
});
