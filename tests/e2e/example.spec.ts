import { expect, test } from "@playwright/test";

/**
 * Next.jsアプリケーションのE2Eテスト
 * シンプルな構成で基本的な機能をテストします
 */

// ホームページのテスト
test("ホームページが正しく表示される", async ({ page }) => {
	// ホームページにアクセス
	await page.goto("/");

	// ページタイトルが表示されていることを確認
	await expect(page).toHaveTitle(/Next\.js Boilerplate/);

	// ヘッダーが表示されていることを確認
	const header = await page.locator("header");
	await expect(header).toBeVisible();

	// ヘッダー内のロゴテキストが表示されていることを確認
	await expect(
		page.locator("header").getByText("Next.js Boilerplate").first(),
	).toBeVisible();

	// ナビゲーションメニューが表示されていることを確認
	// 複数のnavが存在するため、ヘッダー内のnavを特定
	await expect(page.locator("header nav")).toBeVisible();
});
