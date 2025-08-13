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
	await expect(page).toHaveTitle(/ナガイ商店\.com/);

	// メインヘッダーが表示されていることを確認（複数headerがあるため特定）
	const mainHeader = page.locator('header').filter({ hasText: 'ナガイ商店.com' });
	await expect(mainHeader).toBeVisible();

	// ヘッダー内のロゴテキストが表示されていることを確認
	await expect(mainHeader.getByText("ナガイ商店.com")).toBeVisible();

	// ナビゲーションメニューが表示されていることを確認
	await expect(mainHeader.locator("nav")).toBeVisible();
});
