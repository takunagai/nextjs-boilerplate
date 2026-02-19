import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./tests/e2e",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Reduced retries for faster CI execution */
	retries: process.env.CI ? 1 : 0,
	/* Optimized parallel workers for CI performance */
	workers: process.env.CI
		? Math.min(4, require("node:os").cpus().length)
		: undefined,
	/* Multiple reporters for better CI integration */
	reporter: process.env.CI
		? [
				["html"],
				["junit", { outputFile: "test-results/junit.xml" }],
				["github"],
			]
		: "html",
	/* Global timeout settings */
	timeout: process.env.CI ? 45000 : 30000,
	expect: {
		timeout: 10000,
	},
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: "http://localhost:3000",

		/* Enhanced trace collection for debugging */
		trace: {
			mode: "retain-on-failure",
			snapshots: true,
			screenshots: true,
			sources: true,
		},
		video: "retain-on-failure",
		screenshot: "only-on-failure",
		/* Action timeout */
		actionTimeout: 15000,
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: process.env.CI ? "npm run build && npm start" : "npm run dev",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
		timeout: process.env.CI ? 120 * 1000 : 120 * 1000, // CI: 2分（ビルド時間考慮）, Local: 2分
		stdout: "pipe",
		stderr: "pipe",
	},
});
